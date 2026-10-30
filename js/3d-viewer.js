/* LIFEVERSE 3D — procedural, rotatable 3D learning models (Three.js). */
(() => {
  const THREE_URL = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
  const palettes = { human:0x55e4e8, animals:0xffb45c, fish:0x57a8ff, dinosaurs:0xa9e76b, dragons:0xc28aff, micro:0xf47bbd };
  const shape = (g,m,x=0,y=0,z=0,sx=1,sy=1,sz=1) => { const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);g.userData;return o; };
  function buildModel(kind) {
    const root=new THREE.Group();
    const mat=(color,roughness=.48,metalness=.08)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
    const main=mat(palettes[kind]||0x55e4e8), light=mat(0xe7f5ff), dark=mat(0x16314b), red=mat(0xff536c), gold=mat(0xffc76a), green=mat(0x78d6a5);
    const sphere=new THREE.SphereGeometry(1,32,24), cyl=new THREE.CylinderGeometry(.12,.12,1,16), cone=new THREE.ConeGeometry(.2,.5,16);
    const add=(mesh)=>{root.add(mesh);return mesh;};
    const ell=(material,x,y,z,sx,sy,sz)=>add(shape(sphere,material,x,y,z,sx,sy,sz));
    const rod=(material,a,b,r=.09)=>{const v=new THREE.Vector3(...a),w=new THREE.Vector3(...b),d=w.clone().sub(v),o=shape(new THREE.CylinderGeometry(r*.7,r,d.length(),12),material);o.position.copy(v.add(w).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());add(o);};
    if(kind==="human"){
      ell(light,0,1.25,0,.48,.72,.25);ell(main,0,2.25,0,.31,.34,.29);ell(red,0,1.28,.23,.22,.42,.08);
      rod(light,[-.38,1.65,0],[-.72,.95,.03],.11);rod(light,[.38,1.65,0],[.72,.95,.03],.11);
      rod(light,[-.2,.72,0],[-.24,-.25,.02],.14);rod(light,[.2,.72,0],[.24,-.25,.02],.14);
      ell(gold,-.12,2.29,.25,.045,.055,.03);ell(gold,.12,2.29,.25,.045,.055,.03);
    } else if(kind==="fish"){
      ell(main,0,0,0,1.05,.56,.42);const tail=shape(cone,main,-1.2,0,0,.9,.85,.25);tail.rotation.z=Math.PI/2;add(tail);
      for(let i=0;i<3;i++){const fin=shape(cone,gold,.1-i*.28,-.46,0,.55,.55,.12);fin.rotation.z=Math.PI;add(fin);}
      ell(light,.56,.13,.36,.13,.13,.06);ell(dark,.59,.13,.415,.055,.06,.025);
    } else if(kind==="dinosaurs"||kind==="dragons"){
      ell(main,0,0,0,1.05,.5,.42);ell(main,.82,.38,0,.42,.34,.34);ell(main,1.15,.3,.04,.4,.17,.25);
      ell(gold,1.3,.35,.23,.055,.06,.04);rod(main,[-.5,-.25,0],[-.55,-.8,.05],.14);rod(main,[.45,-.25,0],[.55,-.8,.05],.14);
      rod(main,[-.8,.05,0],[-1.5,.42,0],.16);
      if(kind==="dragons"){for(let s of [-1,1]){const wing=shape(new THREE.ConeGeometry(.65,.9,3),main,-.1,.65,s*.38,.8,1,.15);wing.rotation.z=s*.45;add(wing);}}
      else {for(let i=0;i<5;i++)ell(gold,-.45+i*.25,.48,0,.12,.22,.12);}
    } else if(kind==="micro"){
      ell(main,0,0,0,.92,.8,.78);
      for(let i=0;i<9;i++){const a=i*2.399;ell(i%2?gold:light,Math.cos(a)*.58,Math.sin(a)*.48,Math.sin(a*1.7)*.48,.13,.13,.13);}
      const nucleus=ell(red,.1,.05,.1,.32,.3,.28);nucleus.material=red;
    } else if(kind==="animals"){
      ell(main,0,0,0,.85,.48,.4);ell(main,.82,.32,0,.36,.35,.32);ell(light,.98,.38,.28,.12,.12,.05);ell(dark,1,.38,.32,.05,.06,.025);
      for(const x of [-.5,.45])for(const z of [-.22,.22])rod(main,[x,-.2,z],[x-.05,-.7,z],.12);
      rod(main,[-.72,.05,0],[-1.15,.38,0],.09);
    } else {
      ell(main,0,0,0,.9,.75,.65);ell(red,.12,.08,.3,.43,.52,.3);
      for(let i=0;i<8;i++){const a=i*Math.PI/4;rod(gold,[Math.cos(a)*.52,Math.sin(a)*.5,.1],[Math.cos(a)*.85,Math.sin(a)*.82,.12],.045);}
    }
    // Small orbiting markers make the 3D depth easy to see.
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.55,.012,8,100),mat(palettes[kind]||0x55e4e8,.35,.45));
    ring.rotation.x=Math.PI/2.7;root.add(ring);
    return root;
  }
  function mount(host,kind,title){
    host.innerHTML='<div class="lv3d-panel"><div class="lv3d-heading"><strong>🧊 LIVE 3D MODEL — '+title+'</strong><span>Drag to rotate · scroll/pinch to zoom</span></div><div class="lv3d-stage"><canvas aria-label="Interactive rotatable 3D model"></canvas><div class="lv3d-load">Loading 3D scene…</div></div><div class="lv3d-controls"><button type="button" data-rotate>⟳ Auto rotate</button><button type="button" data-reset>Reset view</button><label>Model <select data-kind><option value="human">Human anatomy</option><option value="animals">Animal</option><option value="fish">Fish</option><option value="dinosaurs">Dinosaur</option><option value="dragons">Dragon</option><option value="micro">Cell</option></select></label></div><p class="lv3d-note">Interactive 3D learning model. This is a stylized educational reconstruction, not a medical-grade anatomical model.</p></div>';
    const stage=host.querySelector('.lv3d-stage'), canvas=host.querySelector('canvas'), loading=host.querySelector('.lv3d-load');
    const start=()=>{if(!window.THREE){loading.textContent='3D engine could not load. Check your internet connection.';return;}
      const T=window.THREE, scene=new T.Scene();scene.background=new T.Color(0x071321);
      const camera=new T.PerspectiveCamera(42,stage.clientWidth/stage.clientHeight,.1,100);camera.position.set(0,0,5.4);
      const renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.setSize(stage.clientWidth,stage.clientHeight,false);
      scene.add(new T.HemisphereLight(0xd9f3ff,0x20304b,2));
      const lamp=new T.DirectionalLight(0xffffff,2.2);lamp.position.set(3,4,5);scene.add(lamp);
      const fill=new T.PointLight(palettes[kind]||0x55e4e8,1.2);fill.position.set(-3,0,2);scene.add(fill);
      let current=buildModel(kind);scene.add(current);let auto=true,drag=false,px=0,py=0,rotX=0,rotY=0,zoom=5.4;
      loading.remove();
      const select=host.querySelector('[data-kind]');select.value=kind;
      select.addEventListener('change',()=>{scene.remove(current);current=buildModel(select.value);scene.add(current);});
      host.querySelector('[data-rotate]').addEventListener('click',()=>{auto=!auto;host.querySelector('[data-rotate]').textContent=auto?'⟳ Auto rotate':'▶ Rotate';});
      host.querySelector('[data-reset]').addEventListener('click',()=>{rotX=0;rotY=0;zoom=5.4;camera.position.z=zoom;});
      canvas.addEventListener('pointerdown',e=>{drag=true;px=e.clientX;py=e.clientY;canvas.setPointerCapture(e.pointerId);});
      canvas.addEventListener('pointermove',e=>{if(!drag)return;rotY+=(e.clientX-px)*.012;rotX+=(e.clientY-py)*.012;px=e.clientX;py=e.clientY;});
      canvas.addEventListener('pointerup',()=>drag=false);canvas.addEventListener('pointercancel',()=>drag=false);
      canvas.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(2.5,Math.min(9,zoom+e.deltaY*.006));camera.position.z=zoom;},{passive:false});
      let raf;const render=()=>{raf=requestAnimationFrame(render);if(!drag&&auto)rotY+=.004;current.rotation.y=rotY;current.rotation.x=rotX;renderer.render(scene,camera);};
      render();const resize=()=>{if(!stage.isConnected){cancelAnimationFrame(raf);renderer.dispose();return;}camera.aspect=stage.clientWidth/Math.max(1,stage.clientHeight);camera.updateProjectionMatrix();renderer.setSize(stage.clientWidth,stage.clientHeight,false);};window.addEventListener('resize',resize);
    };
    if(window.THREE)start();else{const s=document.querySelector('script[data-threejs]')||document.createElement('script');if(!s.src){s.src=THREE_URL;s.dataset.threejs='1';s.onload=start;s.onerror=()=>loading.textContent='Could not load 3D engine. Refresh and try again.';document.head.appendChild(s);}else s.addEventListener('load',start,{once:true});}
  }
  function addStyles(){if(document.getElementById('lv3d-style'))return;const s=document.createElement('style');s.id='lv3d-style';s.textContent=`.lv3d-panel{margin:20px 0 8px;background:#081827;border:1px solid #28516a;border-radius:18px;overflow:hidden;color:#eef8ff}.lv3d-heading{display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap;padding:14px 16px}.lv3d-heading span,.lv3d-note{color:#9cb6cb;font-size:.8rem}.lv3d-stage{height:360px;min-height:260px;position:relative;background:#071321}.lv3d-stage canvas{display:block;width:100%;height:100%;touch-action:none;cursor:grab}.lv3d-stage canvas:active{cursor:grabbing}.lv3d-load{position:absolute;inset:0;display:grid;place-items:center;color:#b7e9ff}.lv3d-controls{display:flex;align-items:center;gap:9px;flex-wrap:wrap;padding:12px 16px;border-top:1px solid #20384c}.lv3d-controls button,.lv3d-controls select{background:#102a40;color:#eff8ff;border:1px solid #32617a;border-radius:9px;padding:9px 12px}.lv3d-controls label{display:flex;gap:8px;align-items:center;font-size:.85rem}.lv3d-note{padding:0 16px 14px;margin:0}`;document.head.appendChild(s);}
  function attach(){const detail=document.getElementById('detailContent');if(!detail||detail.dataset.lv3dObserver)return;detail.dataset.lv3dObserver='1';addStyles();new MutationObserver(()=>{const title=detail.querySelector('#detailTitle');if(!title)return;const old=detail.querySelector('.lv3d-host');if(old)old.remove();const hero=detail.querySelector('.detail-hero');const host=document.createElement('div');host.className='lv3d-host';(detail.querySelector('.detail-body')||detail).prepend(host);let text=(title.textContent+' '+(hero?.textContent||'')).toLowerCase();let kind=text.match(/fish|ocean|shark|aqua/)?'fish':text.match(/dinosaur|prehistoric|tyrannosaurus|stegosaurus|triceratops/)?'dinosaurs':text.match(/dragon|fantasy/)?'dragons':text.match(/cell|micro|virus|bacteria|microscopic/)?'micro':text.match(/animal|lion|mammal|wildlife/)?'animals':'human';mount(host,kind,title.textContent.trim());}).observe(detail,{childList:true,subtree:true});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',attach);else attach();
})();