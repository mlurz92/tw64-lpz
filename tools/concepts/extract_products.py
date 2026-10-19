"""Extract the product lists (Produktliste und Budget) of the WE 13 concept PDFs.

Usage: python3 -I tools/concepts/extract_products.py <pdf> <out.json>
Columns are detected from the table header ("Pos.", "Maße", "Händler", "Anz.", "Einzel",
"Summe", "Lieferung"); text styles separate product name (7.6 pt), finish (7.1 pt grey) and
planning note (6.9 pt copper). Hyperlinks of the PDF are attached to the row they overlap.
"""
import json, re, sys
import pdfplumber
from pypdf import PdfReader

POS = re.compile(r'^(?:[A-Z]{1,2}\d{1,2}[a-z]?|HWR)$')


def links_of(path):
    r = PdfReader(path)
    out = {}
    for i, pg in enumerate(r.pages):
        H = float(pg.mediabox.height)
        for a in pg.get('/Annots') or []:
            a = a.get_object()
            A = a.get('/A')
            if a.get('/Subtype') == '/Link' and A and A.get('/URI'):
                x0, y0, x1, y1 = [float(v) for v in a['/Rect']]
                out.setdefault(i, []).append({'x0': min(x0, x1), 'x1': max(x0, x1), 'top': H - max(y0, y1), 'bottom': H - min(y0, y1), 'uri': str(A['/URI'])})
    return out


def money(s):
    s = s.replace('€', '').replace('−', '-').replace(' ', '').strip()
    if not re.match(r'^-?[\d.]+,\d\d$', s):
        return None
    return float(s.replace('.', '').replace(',', '.'))


def cls(w):
    c = w['non_stroking_color']
    sz = round(w['size'], 1)
    if 'Bold' in w['fontname'] and sz >= 7.5:
        return 'pos'
    if isinstance(c, tuple) and len(c) == 3 and c[0] > 0.55 and c[2] < 0.3:
        return 'note'
    if isinstance(c, tuple) and len(c) == 3 and abs(c[0] - 0.4667) < 0.02:
        return 'finish'
    return 'name'


def main(path, out):
    pdf = pdfplumber.open(path)
    links = links_of(path)
    rows, room, rooms = [], None, []
    for pi, p in enumerate(pdf.pages):
        ws = p.extract_words(extra_attrs=['fontname', 'size', 'non_stroking_color'], keep_blank_chars=False, x_tolerance=1.5)
        heads = [w for w in ws if w['text'] == 'Pos.' and 'Bold' in w['fontname']]
        if not heads:
            continue
        # every table on the page: header line → columns
        tables = []
        for h in heads:
            line = [w for w in ws if abs(w['top'] - h['top']) < 2 and w['x0'] >= h['x0'] - 2]
            col = {w['text']: w['x0'] for w in line}
            if all(k in col for k in ('Maße', 'Händler', 'Anz.', 'Einzel', 'Summe', 'Lieferung')):
                tables.append((h, col))
        # room headings (serif, followed by a sum)
        for w in ws:
            if 'Serif' in w['fontname'] and w['size'] > 10.5:
                line = [x for x in ws if abs(x['top'] - w['top']) < 3]
                txt = ' '.join(x['text'] for x in sorted(line, key=lambda x: x['x0']))
                m = re.match(r'^(.*?)\s+([\d.]+,\d\d)\s*€$', txt)
                if m and m.group(1) not in [r['room'] for r in rooms if r['page'] == pi]:
                    rooms.append({'page': pi, 'top': w['top'], 'x0': w['x0'], 'room': m.group(1), 'sum': money(m.group(2))})
        for h, col in tables:
            x_pos, x_name = h['x0'], col.get('Produkt', h['x0'] + 29)
            x_dim, x_ret, x_qty, x_unit, x_sum, x_del = col['Maße'], col['Händler'], col['Anz.'], col['Einzel'], col['Summe'], col['Lieferung']
            right = x_del + 80
            # table body ends at the next table header below or the page bottom
            below = [t[0]['top'] for t in tables if t[0]['top'] > h['top'] + 5]
            end = min(below) - 25 if below else p.height - 45
            body = [w for w in ws if h['top'] + 6 < w['top'] < end and x_pos - 4 <= w['x0'] < right]
            starts = sorted([w for w in body if POS.match(w['text']) and abs(w['x0'] - x_pos) < 6 and cls(w) == 'pos'], key=lambda w: w['top'])
            heads_below = sorted([r['top'] for r in rooms if r['page'] == pi and r['top'] > h['top']])
            for k, s in enumerate(starts):
                top = s['top'] - 1
                nxt = starts[k + 1]['top'] - 1 if k + 1 < len(starts) else end
                hb = [t for t in heads_below if t > top]
                if hb:
                    nxt = min(nxt, hb[0] - 3)
                cell = [w for w in body if top <= w['top'] < nxt and w is not s]
                def col_text(x0, x1, kind=None):
                    sel = sorted([w for w in cell if x0 - 2 <= w['x0'] < x1 - 2 and (kind is None or cls(w) == kind)], key=lambda w: (round(w['top']), w['x0']))
                    lines, cur, ct = [], [], None
                    for w in sel:
                        if ct is not None and abs(w['top'] - ct) > 2:
                            lines.append(' '.join(cur)); cur = []
                        cur.append(w['text']); ct = w['top']
                    if cur:
                        lines.append(' '.join(cur))
                    return lines
                name = col_text(x_name, x_dim, 'name')
                finish = col_text(x_name, x_dim, 'finish')
                note = col_text(x_name, x_dim, 'note')
                # room heading that precedes this row (same page or carried over)
                prev = [r for r in rooms if (r['page'] < pi) or (r['page'] == pi and r['top'] < top)]
                room = prev[-1]['room'] if prev else None
                lk = [l['uri'] for l in links.get(pi, []) if l['top'] - 3 <= s['top'] + 6 and l['bottom'] + 3 >= s['top'] and l['x0'] < x_dim and l['x1'] > x_name]
                nm = ' '.join(name)
                flags = [f for f in ['neu', 'geändert', 'Richtwert'] if re.search(r'(^|\s)' + f + r'($|\s)', nm)]
                for f in flags:
                    nm = re.sub(r'\s*\b' + f + r'\b', '', nm)
                nm = nm.replace(' ,', ',').strip()
                # numbers are right-aligned: take the money tokens of the first line, left to right
                first = sorted([w for w in cell if abs(w['top'] - s['top']) < 3 and w['x0'] >= x_qty - 25], key=lambda w: w['x0'])
                nums = [w for w in first if re.match(r'^-?[\d.]+,\d\d$', w['text'])]
                ints = [w for w in first if w['text'].isdigit() and (not nums or w['x0'] < nums[0]['x0'])]
                qty = ints[-1]['text'] if ints else ' '.join(col_text(x_qty, x_unit))
                unit_v = money(nums[0]['text']) if len(nums) >= 2 else None
                sum_v = money(nums[-1]['text']) if nums else None
                deliv_x = nums[-1]['x1'] + 8 if nums else x_del
                rows.append({
                    'pos': s['text'], 'room': room, 'name': nm, 'flags': flags,
                    'finish': ' '.join(finish), 'note': ' '.join(note),
                    'dims': ' '.join(col_text(x_dim, x_ret)), 'retailer': ' '.join(t for t in col_text(x_ret, x_qty - 25) if t),
                    'qty': int(qty) if qty.isdigit() else qty,
                    'unit': unit_v, 'sum': sum_v,
                    'delivery': ' '.join(w['text'] for w in sorted([w for w in cell if w['x0'] >= deliv_x and w['text'] != '€'], key=lambda w: (round(w['top']), w['x0']))), 'url': lk[0] if lk else None, 'page': pi + 1,
                })
    json.dump({'rooms': [{k: r[k] for k in ('room', 'sum', 'page')} for r in rooms], 'items': rows}, open(out, 'w'), ensure_ascii=False, indent=1)
    tot = sum(r['sum'] or 0 for r in rows)
    print(path, len(rows), 'rows, sum', round(tot, 2), 'links', sum(1 for r in rows if r['url']))
    for r in rooms:
        s = sum(x['sum'] or 0 for x in rows if x['room'] == r['room'])
        print('  ', r['room'], r['sum'], round(s, 2), 'OK' if abs(s - r['sum']) < 0.02 else 'MISMATCH')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
