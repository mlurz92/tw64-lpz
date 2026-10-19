"""Dump the drawn plan objects of page 1 of a WE 13 concept PDF in app plan metres.

Transform: the concept plans are drawn at 1:50 on A2 from the same Rohbau contour as
src/data/plan.js; scale and offset are fitted on the living-room contour (cream fill).
"""
import json, math, re, sys
import numpy as np
import pdfplumber

APP = json.load(open(sys.argv[2]))  # plan.json (export of src/data/plan.js)
SCALE = APP['scale']


def fit(pdf_pts, app_pts):
    # similarity without rotation: app = s * pdf + t (least squares over nearest pairs)
    P = np.array(pdf_pts); A = np.array(app_pts)
    s = 1 / 1.8998; t = A[0] - s * P[0]
    for _ in range(5):
        Q = s * P + t
        pairs = [(P[i], A[np.argmin(((A - q) ** 2).sum(1))]) for i, q in enumerate(Q)]
        pairs = [(p, a) for p, a in pairs if np.hypot(*(s * p + t - a)) < 3]
        X = np.array([p for p, _ in pairs]); Y = np.array([a for _, a in pairs])
        mx, my = X.mean(0), Y.mean(0)
        s = ((X - mx) * (Y - my)).sum() / ((X - mx) ** 2).sum()
        t = my - s * mx
    res = np.array([np.hypot(*(s * p + t - a)) for p, a in pairs])
    return s, t, res


def obb(pts):
    pts = np.array(pts)
    best = None
    c = pts.mean(0)
    for a in np.radians(np.arange(0, 180, 0.5)):
        R = np.array([[math.cos(a), math.sin(a)], [-math.sin(a), math.cos(a)]])
        q = (pts - c) @ R.T
        w, h = q.max(0) - q.min(0)
        if best is None or w * h < best[0] - 1e-9:
            mid = (q.max(0) + q.min(0)) / 2
            best = (w * h, a, w, h, c + mid @ R)
    return best


def main(path):
    pdf = pdfplumber.open(path)
    p = pdf.pages[0]
    cream = (0.964706, 0.933333, 0.882353)
    living = max([o for o in p.curves if o.get('non_stroking_color') == cream], key=lambda o: len(o['pts']))
    app_living = [r for r in APP['rooms'] if r['id'] == 'living'][0]['points']
    s, t, res = fit(living['pts'], app_living)
    print('scale', s, 'offset', t, 'residual max mm', round(res.max() / SCALE * 1000, 1))
    tf = lambda xy: ((s * xy[0] + t[0]) / SCALE, (s * xy[1] + t[1]) / SCALE)
    words = p.extract_words(extra_attrs=['size', 'fontname', 'non_stroking_color'])
    labels = [w for w in words if re.match(r'^[A-Z]{1,2}\d{1,2}([–/][A-Z]{0,2}\d{1,2})*$', w['text']) and w['x0'] < p.width * 0.6]
    out = []
    for kind in ('rects', 'curves'):
        for o in getattr(p, kind):
            if o['x0'] > p.width * 0.6:
                continue
            fc = o.get('non_stroking_color'); sc = o.get('stroking_color')
            pts = o['pts'] if kind == 'curves' else [(o['x0'], o['top']), (o['x1'], o['top']), (o['x1'], o['bottom']), (o['x0'], o['bottom'])]
            a, ang, w, h, c = obb(pts)
            if w * h < 4:
                continue
            out.append({'kind': kind, 'fill': fc if o.get('fill') else None, 'stroke': sc if o.get('stroke') else None, 'n': len(pts),
                        'c': tf(c), 'w': w * s / SCALE, 'h': h * s / SCALE, 'ang': round(math.degrees(ang), 1), 'pdf': [round(c[0], 1), round(c[1], 1)],
                        'pts': [tf(q) for q in pts]})
    lab = [{'text': w['text'], 'c': tf(((w['x0'] + w['x1']) / 2, (w['top'] + w['bottom']) / 2)), 'size': round(w['size'], 1), 'pdf': [round(w['x0']), round(w['top'])]} for w in labels]
    return {'scale': s, 'offset': list(t), 'objects': out, 'labels': lab}


if __name__ == '__main__':
    d = main(sys.argv[1])
    json.dump(d, open(sys.argv[3], 'w'), indent=0)
    print(len(d['objects']), 'objects', len(d['labels']), 'labels')
