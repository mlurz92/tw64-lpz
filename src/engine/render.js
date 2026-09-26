// Render pipelines of the WebGPU engine (three.js r186, TSL post-processing). WebGPU where the
// browser offers it, otherwise the renderer's built-in WebGL 2 backend – same nodes, same image.
//
//  fast       Standard view while the camera moves: one scene pass + bloom + SMAA.
//  refined    Standard view at rest: normal pre-pass → SSAO (denoised, half resolution) fed into
//             the ambient term only (builtinAOContext: direct sun/lamp light is not darkened),
//             4× MSAA scene pass, bloom, SMAA. One frame, then the GPU idles.
//  realistic  "Realistisch": screen-space global illumination (SSGI, visibility-bitmask GI incl.
//             AO and colour bleeding), screen-space reflections on glossy/metal surfaces (SSR),
//             bloom and temporal reprojection anti-aliasing (TRAA). Converges over ≈ 40 frames
//             when the camera rests, stays interactive while moving.
import * as THREE from 'three/webgpu';
import {
  pass, mrt, output, normalView, diffuseColor, velocity, metalness, roughness, vec4, screenUV, sample,
  packNormalToRGB, unpackRGBToNormal, builtinAOContext, uniform,
} from 'three/tsl';
import { ssao, ssgi, ssr, traa, smaa, bloom } from '../../vendor/three-addons.js';

/** Bloom: only true highlights (lamp diffusers, LED lines, sun glints) bleed. */
const BLOOM = { strength: 0.12, radius: 0.5, threshold: 1.25 };

const normalFrom = (texNode) => sample((uv) => unpackRGBToNormal(texNode.sample(uv)));

export function createPipelines(renderer, scene, camera) {
  // ------------------------------------------------------------------ standard (moving)
  const fast = new THREE.RenderPipeline(renderer);
  const fastPass = pass(scene, camera);
  const fastColor = fastPass.getTextureNode();
  fast.outputNode = smaa(fastColor.add(bloom(fastColor, BLOOM.strength, BLOOM.radius, BLOOM.threshold)));

  // ------------------------------------------------------------------ standard (at rest)
  const refined = new THREE.RenderPipeline(renderer);
  const pre = pass(scene, camera);
  pre.name = 'normal pre-pass';
  pre.transparent = false;
  pre.setMRT(mrt({ output: packNormalToRGB(normalView) }));
  pre.getTexture('output').type = THREE.UnsignedByteType;
  const aoNode = ssao(pre.getTextureNode('depth'), normalFrom(pre.getTextureNode()), camera);
  aoNode.resolutionScale = 0.5;
  aoNode.radius.value = 0.32;
  aoNode.intensity.value = 1.35;
  aoNode.samples.value = 16;
  const refPass = pass(scene, camera, { samples: 4 }); // MSAA: fine slats and edges without moiré
  refPass.contextNode = builtinAOContext(aoNode.getTextureNode().sample(screenUV).r);
  const refColor = refPass.getTextureNode();
  refined.outputNode = smaa(refColor.add(bloom(refColor, BLOOM.strength, BLOOM.radius, BLOOM.threshold)));

  // ------------------------------------------------------------------ realistic
  const realistic = new THREE.RenderPipeline(renderer);
  const rp = pass(scene, camera);
  rp.setMRT(mrt({
    output,
    // Four attachments fit the WebGPU baseline of 32 colour-attachment bytes/sample.
    // Reuse alpha channels for the SSR material parameters; the scene output retains alpha.
    diffuseMetal: vec4(diffuseColor.rgb, metalness),
    normalRough: vec4(packNormalToRGB(normalView).rgb, roughness),
    velocity,
  }));
  for (const k of ['diffuseMetal', 'normalRough']) rp.getTexture(k).type = THREE.UnsignedByteType;
  const color = rp.getTextureNode('output'), diffuse = rp.getTextureNode('diffuseMetal'), depth = rp.getTextureNode('depth');
  const vel = rp.getTextureNode('velocity'), normalPacked = rp.getTextureNode('normalRough');
  const normal = normalFrom(normalPacked);

  const gi = ssgi(color, depth, normal, camera);
  gi.sliceCount.value = 2;
  gi.stepCount.value = 10;
  gi.radius.value = 2.4;          // metres: room scale
  gi.thickness.value = 0.35;
  gi.expFactor.value = 1.6;
  gi.aoIntensity.value = 1.0;
  gi.giIntensity.value = 2.2;
  gi.backfaceLighting.value = 0.15;

  const refl = ssr(color, depth, normal, { metalnessNode: diffuse.a, roughnessNode: normalPacked.a });
  refl.resolutionScale = 0.5;
  refl.maxDistance.value = 4;
  refl.thickness.value = 0.04;
  refl.quality.value = 0.6;
  const reflStrength = uniform(0.75);

  const lit = color.rgb.mul(gi.getAONode()).add(diffuse.rgb.mul(gi.getGINode().rgb)).add(refl.rgb.mul(reflStrength));
  const composite = vec4(lit, color.a);
  const glow = bloom(composite, BLOOM.strength, BLOOM.radius, BLOOM.threshold);
  const aa = traa(composite.add(glow), depth, vel, camera);
  realistic.outputNode = aa;

  return {
    fast, refined, realistic,
    nodes: { ao: aoNode, gi, refl, reflStrength, traa: aa },
    /** Quality presets: sample counts only (resolution is handled by the pixel ratio). */
    setQuality(q) {
      aoNode.samples.value = q === 'low' ? 8 : 16;
      gi.sliceCount.value = q === 'high' ? 2 : 1;
      gi.stepCount.value = q === 'high' ? 10 : q === 'medium' ? 10 : 8;
      refl.quality.value = q === 'high' ? 0.6 : 0.35;
    },
    dispose() { fast.dispose(); refined.dispose(); realistic.dispose(); },
  };
}
