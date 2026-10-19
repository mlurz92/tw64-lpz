"""Build src/data/concepts/<id>.js from the four WE 13 concept PDFs (Möblierungskonzepte).

Usage: python3 -I tools/concepts/build.py <dir with the PDFs> <plan.json>

Inputs : assets/konzepte/*.pdf (originals, unchanged)
Outputs: src/data/concepts/<id>.js – document blocks, product list, budget, plan positions in app
         plan metres (fitted on the Rohbau contour, residual ≤ 12 mm).
plan.json is an export of src/data/plan.js (node -e "import('./src/data/plan.js').then(m=>…)").
"""
import json, math, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import extract_products as XP  # noqa: E402
import extract_document as XD  # noqa: E402
import plan_objects as PO  # noqa: E402

CONCEPTS = [
    ('travertin', 'WE13_Konzept-1_Travertin-Kupfer-Salbei.pdf'),
    ('espresso', 'WE13_Konzept-2_Espresso-Petrol-Chrom.pdf'),
    ('stone', 'WE13_Konzept-2_Stone-Petrol-Salbei.pdf'),
    ('ivory', 'WE13_Konzept-2_Ivory-Petrol-Messing.pdf'),
]

# Query points (app plan metres, from the plan sheet of concept 1) of every drawn position;
# per concept the nearest drawn object of matching size is taken from its own plan sheet.
QUERY = {
    'W1': (6.72, 12.33), 'W2': (6.90, 11.02), 'W2b': (7.353, 10.898), 'W3': (7.07, 9.81), 'W4': (8.30, 11.17), 'W5': (8.40, 10.44),
    'W6': (8.22, 11.90), 'W7': (7.615, 11.893), 'W8': (7.284, 11.493), 'W19': (5.73, 10.85), 'W20': (8.513, 10.002),
    'W21': (5.93, 13.74), 'W17': (6.43, 9.72), 'W18': (7.11, 9.563), 'TV': (7.08, 9.59),
    'E1': (8.324, 14.673), 'E9': (8.324, 14.673), 'E3': (8.324, 14.673), 'E12': (9.927, 12.642),
    'E2a': (8.939, 14.210), 'E2b': (7.861, 14.059), 'E2c': (7.710, 15.136), 'E2d': (8.787, 15.287),
    'E4': (8.105, 16.96), 'E6': (7.60, 16.90), 'E8': (8.673, 17.045), 'E7': (8.07, 17.19), 'E7a': (7.761, 17.144), 'E7b': (8.384, 17.232), 'E5': (10.094, 15.137),
    'F1': (12.024, 6.763), 'F15': (13.44, 6.29), 'F7': (9.792, 7.831), 'F8': (9.792, 7.624), 'F9': (9.42, 7.832), 'F11': (10.18, 7.832),
    'F10a': (12.915, 6.475), 'F10b': (12.915, 8.284), 'F10c': (9.552, 8.265),
    'S1': (8.379, 19.834), 'S4a': (9.411, 18.703), 'S4b': (9.061, 21.196), 'S6a': (7.767, 18.643), 'S6b': (7.460, 20.818),
    'S7': (6.050, 19.486), 'S12': (7.828, 19.756),
    'A1': (15.51, 8.126), 'A2': (16.864, 8.956), 'A3': (16.169, 8.966), 'A4': (13.832, 9.585), 'A6': (16.929, 8.576), 'A7': (15.422, 9.030),
    'B1': (4.312, 20.583), 'B2a': (3.767, 20.507), 'B2b': (4.856, 20.660), 'B3': (12.546, 10.309),
    'H1a': (3.677, 14.514), 'H1b': (5.908, 15.004), 'H2': (4.887, 14.505), 'K1': (4.568, 16.959),
}
SKIP = {(0.164706, 0.164706, 0.164706), (0.964706, 0.933333, 0.882353), (0.945098, 0.94902, 0.94902),
        (0.952941, 0.937255, 0.901961), (0.184314, 0.227451, 0.192157)}


def dims_m(s):
    """'B 238 × T 119 × H 68' → [2.38, 1.19, 0.68]; 'Ø 35 × H 50' → [0.35, 0.35, 0.5]."""
    s = re.sub(r'(?<=\d),(?=\d)', '.', s)
    if 'außen' in s:
        s = s.split('außen', 1)[1]
    m = re.search(r'Ø\s*([\d.]+)', s)
    h = re.search(r'H\s*(?:≤\s*)?([\d.]+)', s)
    nums = [float(x) for x in re.findall(r'(?<![\d.])(\d+(?:\.\d+)?)', s.split('+')[0].split(';')[0])]
    if m and not re.match(r'^\s*(B\s*)?[\d.]+\s*×', s):
        d = float(m.group(1)) / 100
        return [d, d, float(h.group(1)) / 100 if h else None]
    if len(nums) >= 2:
        w, d = nums[0] / 100, nums[1] / 100
        hh = nums[2] / 100 if len(nums) >= 3 else (float(h.group(1)) / 100 if h else None)
        return [w, d, hh]
    return None


def pick(objs, q, exp=None, r=0.3):
    best, bs = None, 9
    for o in objs:
        d = math.dist(o['c'], q)
        if d > r:
            continue
        sc = d
        if exp:
            w, h = o['w'], o['h']
            sc += min(abs(w - exp[0]) + abs(h - exp[1]), abs(w - exp[1]) + abs(h - exp[0])) * 0.8
        if sc < bs:
            best, bs = o, sc
    return best


def hexc(c):
    return '#%02x%02x%02x' % tuple(round(v * 255) for v in c) if isinstance(c, (list, tuple)) and len(c) == 3 else None


def main(src, plan_json):
    import tempfile
    out_dir = os.path.join(HERE, '..', '..', 'src', 'data', 'concepts')
    os.makedirs(out_dir, exist_ok=True)
    tmp = tempfile.mkdtemp()
    for cid, fname in CONCEPTS:
        pdf = os.path.join(src, fname)
        XP.main(pdf, os.path.join(tmp, 'p.json'))
        XD.main(pdf, os.path.join(tmp, 'd.json'))
        sys.argv = ['', pdf, plan_json]
        pl = PO.main(pdf)
        prods = json.load(open(os.path.join(tmp, 'p.json')))
        doc = json.load(open(os.path.join(tmp, 'd.json')))
        objs = [o for o in pl['objects'] if (tuple(o['fill']) if o['fill'] else None) not in SKIP and max(o['w'], o['h']) >= 0.1 and o['c'][0] < 18.5]
        bypos = {}
        for it in prods['items']:
            it['size'] = dims_m(it['dims']) if it['dims'] else None
            bypos.setdefault(it['pos'], it)
        plan = {}
        for code, q in QUERY.items():
            base = re.sub(r'[a-d]$', '', code)
            if code in ('W2b', 'E7a', 'E7b') and cid != 'travertin':
                continue
            exp = bypos.get(base, {}).get('size')
            if base in ('W8', 'E9', 'S12'):
                cand = [o for o in objs if o['w'] * o['h'] > 2]
            elif base == 'S1':
                cand = [o for o in objs if 3 < o['w'] * o['h'] < 5]
            elif base in ('W18', 'TV', 'F8', 'E7', 'W19'):
                cand = [o for o in objs if min(o['w'], o['h']) < 0.06]
            else:
                cand = [o for o in objs if o['w'] * o['h'] < 3]
            if code == 'W2' and cid == 'travertin':
                exp = [0.8, 0.7]
            if code == 'W2b':
                exp = [0.7, 0.53]
            if code in ('E7a', 'E7b'):
                exp = [0.53, 0.02]
            o = pick(cand, q, exp[:2] if exp and exp[1] else None, 0.45 if base in ('W1', 'S1', 'W8', 'E9', 'S12', 'S7') else 0.3)
            if o:
                plan[code] = {'x': round(o['c'][0], 4), 'y': round(o['c'][1], 4), 'w': round(o['w'], 3), 'h': round(o['h'], 3), 'a': o['ang'], 'fill': hexc(o['fill']), 'stroke': hexc(o['stroke'])}
        # product tables are rendered from the product list: replace generic copies by references
        for p in doc['pages']:
            nb = []
            for b in p['blocks']:
                if b['type'] == 'products':
                    continue
                if b['type'] == 'table' and '**Pos.**' in b['head'] and '**Maße**' in b['head']:
                    codes = [re.sub(r'\*', '', r[0]) for r in b['rows']]
                    nb.append({'type': 'products', 'pos': codes})
                    continue
                nb.append(b)
            p['blocks'] = nb
        data = {'id': cid, 'file': f'assets/konzepte/{fname}', 'title': doc['title'], 'pages': doc['pages'], 'rooms': prods['rooms'],
                'items': prods['items'], 'plan': plan, 'total': round(sum(i['sum'] or 0 for i in prods['items']), 2)}
        with open(os.path.join(out_dir, f'{cid}.js'), 'w') as f:
            f.write(f'// {doc["title"]}\n// Erzeugt mit tools/concepts/build.py aus {fname} – nicht manuell editieren.\n')
            f.write('export default ' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n')
        missing = [c for c in QUERY if c not in plan]
        print(cid, 'items', len(prods['items']), 'total', data['total'], 'plan', len(plan), 'missing', missing)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
