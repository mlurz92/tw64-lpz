"""Convert a WE 13 concept PDF into structured document blocks for the in-app concept reader.

Usage: python3 -I tools/concepts/extract_document.py <pdf> <out.json>

Block types: h1, h2, p, ul, table, swatches, kpis, figure (page rendered from the original PDF),
products (reference to the extracted product list of a room). Text is taken verbatim from the PDF;
bold runs are marked with ** **, line-break hyphenation is resolved (compound hyphens kept).
"""
import json, re, sys
import pdfplumber
from pypdf import PdfReader

GREY_HEAD = (0.419608, 0.419608, 0.419608)


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
                out.setdefault(i, []).append((min(x0, x1), H - max(y0, y1), max(x0, x1), H - min(y0, y1), str(A['/URI'])))
    return out


def bold(w):
    return 'Bold' in w['fontname'] or 'Medium' in w['fontname']


def serif(w):
    return 'Serif' in w['fontname']


def lines_of(words, tol=2.2):
    ws = sorted(words, key=lambda w: (w['top'], w['x0']))
    out = []
    for w in ws:
        if out and abs(out[-1][0]['top'] - w['top']) < tol:
            out[-1].append(w)
        else:
            out.append([w])
    return [sorted(l, key=lambda w: w['x0']) for l in out]


def line_text(ln, links=()):
    parts, cur_b, buf = [], None, []
    def flush():
        if buf:
            t = ' '.join(buf)
            parts.append(f'**{t}**' if cur_b else t)
    SUP = str.maketrans('0123456789', '⁰¹²³⁴⁵⁶⁷⁸⁹')
    prev = None
    for w in ln:
        b = bold(w)
        t = w['text']
        if prev is not None and re.fullmatch(r'\d', t) and w['size'] < prev['size'] * 0.85 and w['x0'] - prev['x1'] < 2.5 and buf:
            buf[-1] += t.translate(SUP)
            prev = w
            continue
        prev = w
        for (x0, t0, x1, t1, uri) in links:
            if x0 - 1 <= (w['x0'] + w['x1']) / 2 <= x1 + 1 and t0 - 2 <= (w['top'] + w['bottom']) / 2 <= t1 + 2:
                t = f'[{t}]({uri})'
                break
        if cur_b is not None and b != cur_b:
            flush(); buf = []
        cur_b = b
        buf.append(t)
    flush()
    s = ' '.join(parts)
    s = s.replace('** **', ' ')
    return re.sub(r'\*\* ([:;,.!?)])', r'**\1', s)


def join_lines(texts):
    out = ''
    for t in texts:
        t = t.strip()
        if not out:
            out = t
            continue
        m = re.search(r'([A-Za-zÄÖÜäöüß])-(\*\*)?$', out)
        if m:
            nxt = re.sub(r'^\*\*', '', t)
            if nxt[:1].islower():
                out = out[:m.start() + 1] + (m.group(2) or '') + t
            else:
                out = out + t
        else:
            out = out + ' ' + t
    out = re.sub(r'\]\(([^)]+)\) \[', r'](\1)[', out)
    out = out.replace('** **', ' ').replace('****', '')
    return re.sub(r'\*\* ([:;,.!?)])', r'**\1', out).strip()


def merge_links(s):
    # consecutive words carrying the same link become one link text
    pat = re.compile(r'\[([^\]]+)\]\(([^)]+)\)(\s*)\[([^\]]+)\]\(\2\)')
    while True:
        n = pat.sub(lambda m: f'[{m.group(1)}{m.group(3) or " "}{m.group(4)}]({m.group(2)})', s)
        if n == s:
            return s
        s = n


def table_blocks(p, words, links):
    """Tables: a dark rule under a grey semi-bold header row, light rules between rows."""
    rules = [l for l in p.lines if abs(l['top'] - l['bottom']) < 0.5]
    rules += [{'x0': r['x0'], 'x1': r['x1'], 'top': r['top'], 'bottom': r['top'], 'stroking_color': r['non_stroking_color']} for r in p.rects if r['height'] < 0.9 and r['width'] > 20]
    heads = {}
    for l in rules:
        c = l.get('stroking_color')
        if isinstance(c, tuple) and len(c) == 3 and c[0] < 0.8:
            heads.setdefault(round(l['top']), []).append(l)
    tables, used = [], set()
    for y, segs in sorted(heads.items()):
        x0 = min(s['x0'] for s in segs); x1 = max(s['x1'] for s in segs)
        cand = [w for w in words if y - 34 < w['top'] < y and x0 - 2 <= w['x0'] <= x1 and bold(w) and w['size'] < 7.8]
        hl = lines_of(cand)
        hdr, edge = [], y
        for ln in reversed(hl):
            if edge - ln[0]['bottom'] > 5:
                break
            hdr += ln; edge = ln[0]['top']
        if not hdr:
            continue
        htop = min(w['top'] for w in hdr) - 1
        cols = sorted(set([round(s['x0']) for s in segs]))
        if len(cols) == 1:
            # one long rule: columns from header word clusters
            hs = sorted(hdr, key=lambda w: w['x0'])
            cols = [round(hs[0]['x0']) - 4]
            for a, b in zip(hs, hs[1:]):
                if b['x0'] - a['x1'] > 9:
                    cols.append(round(b['x0']) - 4)
        cols = cols + [round(x1) + 1]
        light = sorted(set(round(l['top']) for l in rules if l['top'] > y + 2 and l['x0'] >= x0 - 3 and l['x1'] <= x1 + 3))
        nxt_head = min([k for k in heads if k > y + 2] + [10 ** 6])
        bounds, last = [y], y
        for ly in light:
            if ly - last > 160 or ly >= nxt_head - 30:
                break
            bounds.append(ly); last = ly
        # last row without closing rule: extend until the text block ends
        body_after = [w for w in words if w['top'] > last + 1 and x0 - 2 <= w['x0'] <= x1 and not serif(w)]
        body_after = [w for w in body_after if w['top'] < nxt_head - 30]
        if body_after:
            ext = last
            for ln in lines_of(body_after):
                if ln[0]['top'] - ext > 16:
                    break
                ext = ln[0]['bottom']
            if ext > last:
                bounds.append(ext + 2)
        def cell(wset):
            cells = []
            for ci in range(len(cols) - 1):
                cw = [w for w in wset if cols[ci] - 3 <= w['x0'] < cols[ci + 1] - 3]
                ls = lines_of(cw)
                lk = links
                txt = join_lines([line_text(l, lk) for l in ls])
                cells.append(merge_links(txt))
            return cells
        hw = [w for w in words if htop <= w['top'] < y and x0 - 2 <= w['x0'] <= x1]
        rows = []
        for a, b in zip(bounds, bounds[1:]):
            rw = [w for w in words if a < w['top'] + 1 < b and x0 - 2 <= w['x0'] <= x1]
            if rw:
                rows.append(cell(rw))
                used.update(id(w) for w in rw)
        used.update(id(w) for w in hw)
        tables.append({'top': htop, 'bottom': bounds[-1], 'block': {'type': 'table', 'head': cell(hw), 'rows': rows}})
    return tables, used


def swatch_blocks(p, words):
    sw = [r for r in p.rects if 80 < r['width'] < 100 and 30 < r['height'] < 45]
    if len(sw) < 3:
        return [], set()
    items, used = [], set()
    for r in sorted(sw, key=lambda r: (round(r['top']), r['x0'])):
        below = [w for w in words if r['bottom'] < w['top'] < r['bottom'] + 40 and r['x0'] - 2 <= w['x0'] < r['x0'] + 92]
        ls = lines_of(below)
        name = ' '.join(w['text'] for w in ls[0]) if ls else ''
        rest = [' '.join(w['text'] for w in l) for l in ls[1:]]
        hexv = next((m.group(0) for t in rest for m in [re.search(r'#[0-9A-F]{6}', t)] if m), None)
        # use = lines without hex, role = text after the hex
        use, role = [], ''
        for t in rest:
            if '#' in t:
                role = t.split('·', 1)[1].strip() if '·' in t else ''
            elif role:
                role += ' ' + t
            else:
                use.append(t)
        c = r['non_stroking_color']
        rgb = '#%02X%02X%02X' % tuple(round(v * 255) for v in c)
        items.append({'name': name, 'use': join_lines(use), 'hex': hexv or rgb, 'role': role.strip()})
        used.update(id(w) for w in below)
    return [{'top': min(r['top'] for r in sw), 'bottom': max(r['bottom'] for r in sw) + 40, 'block': {'type': 'swatches', 'items': items}}], used


def kpi_blocks(p, words):
    big = [w for w in words if serif(w) and 14 < w['size'] < 16]
    if not big:
        return [], set()
    cols = sorted(set(round(w['x0']) for w in big if re.match(r'^[\d≥.,]+$', w['text']) or w['text'] in ('€', '%', 'm')))
    top = min(w['top'] for w in big)
    labels = [w for w in words if bold(w) and 7 < w['size'] < 8.2 and top + 10 < w['top'] < top + 24]
    starts = []
    for c in sorted(set(round(w['x0']) for w in labels)):
        if not starts or c - starts[-1] > 40:
            starts.append(c)
    zone = [w for w in words if top - 2 <= w['top'] < top + 50]
    items = []
    for i, s in enumerate(starts):
        e = starts[i + 1] if i + 1 < len(starts) else 600
        cw = [w for w in zone if s - 3 <= w['x0'] < e - 3]
        ls = lines_of(cw)
        val = ' '.join(w['text'] for w in ls[0]) if ls else ''
        label = ' '.join(w['text'] for w in ls[1]) if len(ls) > 1 else ''
        note = join_lines([' '.join(w['text'] for w in l) for l in ls[2:]])
        items.append({'value': val, 'label': label, 'note': note})
    del cols
    return [{'top': top - 2, 'bottom': top + 50, 'block': {'type': 'kpis', 'items': items}}], set(id(w) for w in zone)


def flow(placed, lk, bullet_indent=52):
    blocks = []
    para, prev = None, None
    def close():
        nonlocal para
        if para:
            if para['type'] == 'ul':
                para['items'] = [merge_links(join_lines(it)) for it in para['items']]
            else:
                para['text'] = merge_links(join_lines(para.pop('lines')))
            blocks.append(para)
        para = None
    for b in placed:
        if 'block' in b:
            close(); blocks.append(b['block']); prev = None; continue
        ln = b['line']
        txt = line_text(ln, lk)
        w0 = ln[0]
        if serif(w0) and w0['size'] > 15:
            close(); blocks.append({'type': 'h1', 'text': re.sub(r'^\d+\s+', '', txt.replace('**', '')), 'num': (re.match(r'^(\d+)\s', txt.replace('**', '')) or [None, None])[1]}); prev = None; continue
        if serif(w0) and w0['size'] > 10.5:
            close(); blocks.append({'type': 'h2', 'text': txt.replace('**', '')}); prev = None; continue
        gap = (w0['top'] - prev['bottom']) if prev else 99
        if txt.startswith('•'):
            if not para or para['type'] != 'ul' or gap > 9:
                close(); para = {'type': 'ul', 'items': []}
            para['items'].append([txt.lstrip('• ').strip()])
        elif para and para['type'] == 'ul' and gap < 6 and w0['x0'] > bullet_indent:
            para['items'][-1].append(txt)
        else:
            small = w0['size'] < 7.5
            if not para or para['type'] != 'p' or gap > w0['size'] * 0.9 or para.get('small') != small:
                close(); para = {'type': 'p', 'lines': [], 'small': small}
            para['lines'].append(txt)
        prev = w0
    close()
    return blocks


def segments(words, gap=22):
    """Lines split at wide gaps (multi-column pages); each segment is a list of words."""
    out = []
    for ln in lines_of(words):
        cur = [ln[0]]
        for a, b in zip(ln, ln[1:]):
            if b['x0'] - a['x1'] > gap:
                out.append(cur); cur = []
            cur.append(b)
        out.append(cur)
    return out


def figure_notes(words, lk):
    """Text of plan/figure pages: headings and body copy (≥ 6.6 pt), column by column."""
    body = [w for w in words if 50 < w['top'] and (w['size'] >= 6.6 or serif(w))]
    segs = segments(body)
    cols = []
    for sg in sorted(segs, key=lambda sg: sg[0]['x0']):
        x = sg[0]['x0'] + (3 if sg[0]['text'] == '•' else 0)
        for c in cols:
            if abs(c['x'] - x) < 14:
                c['segs'].append(sg); break
        else:
            cols.append({'x': x, 'segs': [sg]})
    out = []
    for c in sorted(cols, key=lambda c: (min(sg[0]['top'] for sg in c['segs']) > 120, c['x'])):
        placed = [{'top': sg[0]['top'], 'bottom': sg[0]['bottom'], 'line': sg} for sg in sorted(c['segs'], key=lambda sg: sg[0]['top'])]
        out += flow(placed, lk, bullet_indent=c['x'] - 6)
    return [b for b in out if not (b['type'] == 'p' and len(b['text']) < 3)]


def main(path, out):
    pdf = pdfplumber.open(path)
    links = links_of(path)
    pages = []
    for pi, p in enumerate(pdf.pages):
        words = p.extract_words(extra_attrs=['fontname', 'size', 'non_stroking_color'], x_tolerance=1.5, keep_blank_chars=False)
        lk = links.get(pi, [])
        big_page = p.width > 1000
        # figure pages: plan sheets, room concepts with plan excerpts, wall elevations, moodboards
        n_curves = len(p.curves) + len(p.rects)
        hdr = [w for w in words if w['top'] < 50]
        section = ' '.join(w['text'] for w in hdr if w['x0'] > 300).strip()
        figure = big_page or n_curves > 120 or bool(p.images) and len(p.images) > 2
        blocks = []
        if figure:
            # keep the headings and prose bullets as text alongside the rendered page
            heads = [l for l in lines_of([w for w in words if serif(w) and w['size'] > 10.5 and w['top'] > 50])]
            title = ' '.join(' '.join(w['text'] for w in l) for l in heads[:2])
            blocks.append({'type': 'figure', 'page': pi + 1, 'title': title})
            pages.append({'page': pi + 1, 'section': section, 'figure': True, 'blocks': blocks, 'notes': [] if big_page else figure_notes(words, lk)})
            continue
        body = [w for w in words if 50 < w['top'] < p.height - 40]
        placed = []
        tb, used = table_blocks(p, body, lk)
        placed += tb
        sb, u2 = swatch_blocks(p, body); placed += sb; used |= u2
        kb, u3 = kpi_blocks(p, body); placed += kb; used |= u3
        # product list tables are extracted separately
        prod = [w for w in body if w['text'] == 'Pos.' and bold(w)]
        rest = [w for w in body if id(w) not in used and not any(t['top'] - 1 <= w['top'] <= t['bottom'] for t in placed)]
        for ln in lines_of(rest):
            placed.append({'top': ln[0]['top'], 'bottom': ln[0]['bottom'], 'line': ln})
        placed.sort(key=lambda b: b['top'])
        blocks += flow(placed, lk)
        if prod:
            blocks.append({'type': 'products', 'page': pi + 1})
        pages.append({'page': pi + 1, 'section': section, 'figure': False, 'blocks': blocks})
    meta = PdfReader(path).metadata
    json.dump({'title': str(meta.get('/Title', '')), 'pages': pages}, open(out, 'w'), ensure_ascii=False, indent=1)
    print(path, len(pages), 'pages', sum(len(p['blocks']) for p in pages), 'blocks')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
