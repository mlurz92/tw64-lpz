// Fast renderer regressions: block app boot and exercise the actual bundled renderer on a tiny fixture.
import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: process.env.CHANNEL || undefined, headless:true });
try {
  const page = await browser.newPage();
  await page.route('**/src/main.js', r=>r.fulfill({contentType:'text/javascript',body:''}));
  await page.route('https://**/*',r=>r.abort());
  await page.goto('http://127.0.0.1:8000/',{waitUntil:'domcontentloaded'});
  const result = await page.evaluate(async()=>{
    const E=await import('/vendor/pathtracer.js'), THREE=await import('three');
    const {PhotoRenderer}=await import('/src/engine/photo.js');
    const renderer=new E.WebGLRenderer({preserveDrawingBuffer:true}); renderer.setSize(2,2);
    const pt=new E.WebGLPathTracer(renderer), tracer=pt._pathTracer;
    const checks={};
    const compile=tracer.compileMaterial; let compilations=0;
    tracer.compileMaterial=async()=>{compilations++;};
    tracer._compileFunction(); tracer._compileFunction(); tracer._compileFunction();
    await tracer._compilePromise; checks.batchedCompilation=compilations===1;
    tracer.compileMaterial=async()=>{throw Error('injected compilation error');};
    tracer._compileFunction(); await tracer._compilePromise.catch(()=>{});
    try {tracer.update();checks.compileFailure=false;} catch {checks.compileFailure=true;}
    tracer.compileMaterial=compile;
    const textures=tracer.material.textures, upload=textures.setTextures; let uploads=0;
    textures.setTextures=()=>{uploads++;};
    pt.updateMaterials({uploadTextures:false}); checks.noTextureReupload=uploads===0;
    pt.updateMaterials(); checks.defaultUploadPreserved=uploads===1; textures.setTextures=upload;
    const p=Object.create(PhotoRenderer.prototype);
    Object.assign(p,{renderer,pt,scene:new THREE.Scene(),camera:new THREE.PerspectiveCamera(),samples:4,request:1,active:true,state:'tracing',emit:()=>{},budget:()=>({samples:4}),el:document.createElement('div'),denoiseCanvas:document.createElement('canvas'),timings:{}});
    const material=new THREE.MeshPhysicalMaterial({color:'#ffffff'}), mesh=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material);p.scene.add(mesh);
    const glass=new THREE.MeshPhysicalMaterial({color:'#ffffff',opacity:.12,transparent:true});glass.userData.glass=true;
    const converted=p.material({material:glass,userData:{}},new Map());checks.clearGlassPassesSun=converted.transmission===1&&converted.castShadow===false;
    const render=renderer.render, target=renderer.getRenderTarget(), bg=p.scene.background, tone=renderer.toneMapping;
    renderer.render=()=>{throw Error('injected feature render error');};
    try {p.features(2,2);}catch{}finally{renderer.render=render;}
    checks.featureStateRestored=mesh.material===material&&mesh.visible&&p.scene.background===bg&&renderer.toneMapping===tone&&renderer.getRenderTarget()===target;
    p.features=()=>{throw Error('injected denoising error');};p.denoise();checks.denoiseFallback=p.state==='done'&&!p.denoising;
    p.state='error';p.message='injected';try{await p.finished();checks.errorRejects=false;}catch{checks.errorRejects=true;}
    p.pt={pausePathTracing:false,renderSample:()=>{throw Error('injected present error');}};p.samples=1;p.present();checks.pauseRestored=p.pt.pausePathTracing===false;
    pt.dispose();renderer.dispose();material.dispose();glass.dispose();converted.dispose();mesh.geometry.dispose();p._aux?.dispose();
    return checks;
  });
  console.log(JSON.stringify(result,null,2));
  if(Object.values(result).some(v=>!v))process.exitCode=1;
} finally {await browser.close();}
