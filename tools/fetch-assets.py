#!/usr/bin/env python3
"""Downloads the CC0 assets (Poly Haven) used by the renderer into ../assets/lib.

All assets are CC0 (https://polyhaven.com/license). Run once; results are committed.
"""
import json, os, urllib.request, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent / 'assets' / 'lib'
API = 'https://api.polyhaven.com/files/'

TEXTURES = {  # id: (resolution, [maps])
    'oak_veneer_01': ('2k', ['Diffuse', 'nor_gl', 'Rough']),
    'black_oak_veneer': ('1k', ['Diffuse', 'nor_gl', 'Rough']),
    'european_walnut_veneer_04': ('1k', ['Diffuse', 'nor_gl', 'Rough']),
    'white_oak_veneer': ('1k', ['Diffuse', 'nor_gl', 'Rough']),
    'washed_grey_oak_veneer': ('1k', ['Diffuse', 'nor_gl']),
    'plastered_wall_04': ('1k', ['Diffuse', 'nor_gl', 'Rough']),
    'curly_teddy_natural': ('1k', ['Diffuse', 'nor_gl']),
    'rough_linen': ('1k', ['nor_gl']),
    'poly_wool_herringbone': ('1k', ['nor_gl']),
    'velour_velvet': ('1k', ['nor_gl']),
    # surroundings (park 9.28 m below the flat)
    'leafy_grass': ('1k', ['Diffuse', 'nor_gl']),
    'gravel_floor': ('1k', ['Diffuse']),
}
# Pure skies (no ground scenery): the park and the lower floors are real geometry, so the
# view from the 3rd floor has the correct height and parallax.
HDRIS = {'kloofendal_48d_partly_cloudy_puresky': '2k', 'qwantani_late_afternoon_puresky': '2k', 'qwantani_dusk_2_puresky': '1k'}
MODELS = ['potted_plant_02', 'potted_plant_04', 'pachira_aquatica_01', 'calathea_orbifolia_01',
          'ceramic_vase_01', 'ceramic_vase_02', 'ceramic_vase_04', 'dry_branches_medium_01', 'fern_02']
UA = {'User-Agent': 'we13-raumatelier-asset-fetch/1.0'}
SHORT = {'Diffuse': 'diff', 'nor_gl': 'nor', 'Rough': 'rough'}


def get(url, dest):
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        return
    print('↓', dest.relative_to(ROOT))
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA)) as r:
        dest.write_bytes(r.read())


def files(asset_id):
    with urllib.request.urlopen(urllib.request.Request(API + asset_id, headers=UA)) as r:
        return json.load(r)


for tid, (res, maps) in TEXTURES.items():
    f = files(tid)
    for m in maps:
        get(f[m][res]['jpg']['url'], ROOT / 'textures' / f'{tid}_{SHORT[m]}.jpg')

for hid, res in HDRIS.items():
    get(files(hid)['hdri'][res]['hdr']['url'], ROOT / 'hdri' / f'{hid}.hdr')

for mid in MODELS:
    g = files(mid)['gltf']['1k']['gltf']
    base = ROOT / 'models' / mid
    get(g['url'], base / f'{mid}.gltf')
    for rel, inc in g['include'].items():
        get(inc['url'], base / rel)
print('done')
