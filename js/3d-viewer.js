/* LifeVerse Anatomy Explorer
 * Human mesh: Écorché, CC BY-SA 4.0; based on BodyParts3D and Z-Anatomy.
 * Source: https://github.com/Charleeh/ecorche
 */
(() => {
  const THREE_BASE = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128";
  const HUMAN_MODEL = "https://raw.githubusercontent.com/Charleeh/ecorche/main/model/ecorche.glb";
  const HEART_MODEL = "https://cdn.jsdelivr.net/gh/organui/heart-3d@c72ce6654ff8e282942f97750d3104f55ef4fc3d/public/models/heart.glb";
  const palettes = { human:0x55e4e8, animals:0xffb45c, fish:0x57a8ff, dinosaurs:0xa9e76b, dragons:0xc28aff, micro:0xf47bbd };
  let loadPromise;

  function addStyles() {
    if (document.getElementById("lv3d-style")) return;
    const s = document.createElement("style");
    s.id = "lv3d-style";
    s.textContent = `
      .lv3d-panel{margin:22px 0 8px;background:#071421;border:1px solid #27465e;border-radius:18px;overflow:hidden;color:#edf7ff;box-shadow:0 18px 55px #0005}
      .lv3d-heading{display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap;padding:15px 17px;background:linear-gradient(110deg,#102b41,#0b1a2a)}
      .lv3d-title{font-size:1rem;font-weight:800;letter-spacing:.02em}.lv3d-status{font-size:.78rem;color:#86d9d7}
      .lv3d-workspace{display:grid;grid-template-columns:minmax(0,1fr) 235px;min-height:470px}
      .lv3d-stage{height:500px;min-height:340px;position:relative;background:radial-gradient(ellipse at 50% 40%,#18364b 0%,#091725 58%,#050d16 100%);overflow:hidden}
      .lv3d-stage canvas{display:block;width:100%;height:100%;touch-action:none;cursor:grab;outline:none}.lv3d-stage canvas:active{cursor:grabbing}
      .lv3d-stage:after{content:"";pointer-events:none;position:absolute;inset:0;background:linear-gradient(0deg,#06111bb0,transparent 24%,transparent 80%,#06111b40)}
      .lv3d-load{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;text-align:center;padding:25px;color:#d7efff}
      .lv3d-spinner{width:34px;height:34px;border:3px solid #2b5266;border-top-color:#6ce9df;border-radius:50%;animation:lvspin 1s linear infinite}@keyframes lvspin{to{transform:rotate(360deg)}}
      .lv3d-axes{position:absolute;z-index:1;left:15px;bottom:14px;font-size:.72rem;color:#8ca9bf;pointer-events:none}
      .lv3d-side{background:#0a1826;border-left:1px solid #20374b;padding:14px;min-width:0}
      .lv3d-side h4{font-size:.72rem;color:#81a4bb;letter-spacing:.12em;margin:3px 0 10px}
      .lv3d-layers{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:17px}
      .lv3d-btn,.lv3d-layers button{font:inherit;font-size:.78rem;color:#dbeaf6;background:#10273a;border:1px solid #2c4b62;border-radius:9px;padding:9px 10px;cursor:pointer}
      .lv3d-layers button.active,.lv3d-btn.active{border-color:#54ded6;background:#123b46;color:#8ff8eb}
      .lv3d-search{width:100%;box-sizing:border-box;background:#06111d;color:#eaf6ff;border:1px solid #29475e;border-radius:9px;padding:10px;font:inherit;font-size:.82rem;margin-bottom:8px}
      .lv3d-parts{height:150px;overflow:auto;display:flex;flex-direction:column;gap:4px;margin-bottom:14px}
      .lv3d-part{font:inherit;text-align:left;font-size:.76rem;color:#c5d8e7;background:transparent;border:1px solid transparent;border-radius:7px;padding:7px 8px;cursor:pointer;overflow-wrap:anywhere}
      .lv3d-part:hover,.lv3d-part.active{background:#143044;border-color:#37637b;color:#fff}
      .lv3d-info{border-top:1px solid #243b4f;padding-top:12px}.lv3d-info strong{display:block;font-size:.95rem;color:#78e8df;margin-bottom:6px;overflow-wrap:anywhere}.lv3d-info p{font-size:.78rem;line-height:1.5;color:#9db4c7;margin:0 0 10px}
      .lv3d-actions{display:flex;flex-wrap:wrap;gap:7px}.lv3d-actions button{font:inherit;font-size:.75rem;background:#10273a;color:#e7f6ff;border:1px solid #2c4b62;border-radius:8px;padding:8px;cursor:pointer}
      .lv3d-toolbar{display:flex;gap:7px;flex-wrap:wrap;padding:11px 14px;border-top:1px solid #20374b;background:#091725}
      .lv3d-toolbar button{font:inherit;font-size:.78rem;background:#10273a;color:#e7f6ff;border:1px solid #2c4b62;border-radius:9px;padding:9px 12px;cursor:pointer}
      .lv3d-toolbar button:hover,.lv3d-actions button:hover{border-color:#5be2d7}
      .lv3d-note{padding:0 15px 14px;margin:0;font-size:.72rem;color:#7994a9;line-height:1.5}
      .lv3d-note a{color:#87e7df}
      @media(max-width:720px){.lv3d-workspace{grid-template-columns:1fr}.lv3d-stage{height:390px;min-height:320px}.lv3d-side{border-left:0;border-top:1px solid #20374b}.lv3d-parts{height:130px;display:grid;grid-template-columns:1fr 1fr;align-content:start}.lv3d-info{margin-top:8px}.lv3d-layers{grid-template-columns:repeat(3,1fr)}}
    `;
    document.head.appendChild(s);
  }

  function loadThree() {
    if (window.THREE && window.THREE.GLTFLoader) return Promise.resolve(window.THREE);
    if (loadPromise) return loadPromise;
    loadPromise = new Promise((resolve, reject) => {
      const addScript = (src, done) => { const el=document.createElement("script");el.src=src;el.onload=done;el.onerror=()=>reject(new Error("3D engine failed to load"));document.head.appendChild(el); };
      const startLoader = () => addScript(THREE_BASE + "/examples/js/loaders/GLTFLoader.js", () => resolve(window.THREE));
      if (window.THREE) startLoader(); else addScript(THREE_BASE + "/three.min.js", startLoader);
    });
    return loadPromise;
  }

  const prettyName = (mesh) => (mesh.userData.name || mesh.userData.displayName || mesh.name || "Anatomical structure")
    .replace(/[_\.]+/g," ").replace(/\b([lr])\b/gi,m=>m.toUpperCase()).replace(/\s+/g," ").trim();
  const layerOf = (mesh) => {
    const n=(mesh.name+" "+(mesh.parent?.name||"")).toLowerCase();
    if(/muscle|muscular|fascia|tendon/.test(n)) return "muscles";
    if(/bone|skelet|cartilage|tooth|teeth|vertebra|rib|skull|mandible|maxilla/.test(n)) return "skeleton";
    return "other";
  };

  function makeHumanViewer(host,title) {
    const isHeart = /heart|cardiac|dil/i.test(title);
    const modelUrl = isHeart ? HEART_MODEL : HUMAN_MODEL;
    host.innerHTML = `
      <section class="lv3d-panel" aria-label="Realistic interactive human anatomy explorer">
        <div class="lv3d-heading"><span class="lv3d-title">✦ HUMAN ANATOMY LAB <span style="color:#7896ab;font-weight:400">/ ${title}</span></span><span class="lv3d-status" data-status>PREPARING 3D MODEL</span></div>
        <div class="lv3d-workspace">
          <div class="lv3d-stage"><canvas aria-label="3D human anatomy. Drag to rotate, scroll or pinch to zoom." tabindex="0"></canvas><div class="lv3d-load"><div class="lv3d-spinner"></div><strong>Loading realistic anatomical model</strong><span>First load may take a little longer.</span></div><div class="lv3d-axes">3D VIEW · DRAG ROTATE · PINCH ZOOM</div></div>
          <aside class="lv3d-side">
            <h4>ANATOMY LAYERS</h4>
            <div class="lv3d-layers"><button class="active" data-layer="all">All parts</button><button data-layer="skeleton">Skeleton</button><button data-layer="muscles">Muscles</button></div>
            <h4>FIND A STRUCTURE</h4><input class="lv3d-search" type="search" placeholder="Search bone or muscle…" aria-label="Search anatomy structures"><div class="lv3d-parts"><span style="font-size:.8rem;color:#7896ab">Model loading…</span></div>
            <div class="lv3d-info"><h4>SELECTED STRUCTURE</h4><strong data-part-name>Tap a body part</strong><p data-part-desc>Tap a visible bone or muscle in the 3D model or choose a name from the list to learn about it.</p><div class="lv3d-actions"><button data-isolate>Isolate part</button><button data-hide>Hide part</button><button data-restore>Show all</button></div></div>
          </aside>
        </div>
        <div class="lv3d-toolbar"><button data-view="front">Front view</button><button data-view="back">Back view</button><button data-view="side">Side view</button><button data-rotate>⟳ Auto rotate</button><button data-reset>Reset</button></div>
        <p class="lv3d-note">${isHeart ? "Heart model: BodyParts3D, © The Database Center for Life Science, CC BY 4.0. <a href=\"https://github.com/organui/heart-3d\" target=\"_blank\" rel=\"noopener\">Source & attribution</a>." : "Model: Écorché — separately named bone and muscle structures, CC BY-SA 4.0. <a href=\"https://github.com/Charleeh/ecorche\" target=\"_blank\" rel=\"noopener\">Source & attribution</a>. Skin and internal organs are not part of this model yet."} Educational visualization only; not for diagnosis.</p>
      </section>`;
    const stage=host.querySelector(".lv3d-stage"),canvas=host.querySelector("canvas"),loading=host.querySelector(".lv3d-load"),status=host.querySelector("[data-status]");
    const list=host.querySelector(".lv3d-parts"),search=host.querySelector(".lv3d-search"),partName=host.querySelector("[data-part-name]"),partDesc=host.querySelector("[data-part-desc]");
    loadThree().then(T=>{
      const scene=new T.Scene();scene.background=new T.Color(0x081421);
      const camera=new T.PerspectiveCamera(35,Math.max(1,stage.clientWidth)/Math.max(1,stage.clientHeight),.01,1000);
      const renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));renderer.setSize(stage.clientWidth,stage.clientHeight,false);renderer.outputEncoding=T.sRGBEncoding;
      scene.add(new T.HemisphereLight(0xe6f6ff,0x1a2937,2.15));
      const key=new T.DirectionalLight(0xffe8cf,2.5);key.position.set(4,6,5);scene.add(key);
      const fill=new T.DirectionalLight(0x6fc9e8,1.8);fill.position.set(-4,2,-4);scene.add(fill);
      const rim=new T.DirectionalLight(0xffffff,1.1);rim.position.set(0,3,-5);scene.add(rim);
      const floor=new T.Mesh(new T.CircleGeometry(1.45,64),new T.MeshBasicMaterial({color:0x102b3c,transparent:true,opacity:.48}));floor.rotation.x=-Math.PI/2;floor.position.y=-.02;scene.add(floor);
      let model=null,meshes=[],selected=null,autoRotate=false,dragging=false,px=0,py=0,rotX=0,rotY=0,zoom=4.3,initialZoom=4.3,layer="all",hidden=new Set(),originalMaterials=new Map(),raf=0;
      const raycaster=new T.Raycaster(),pointer=new T.Vector2();
      function selectMesh(mesh){if(!mesh)return;selected=mesh;partName.textContent=prettyName(mesh);partDesc.textContent=describe(mesh);meshes.forEach(m=>{if(!originalMaterials.has(m))originalMaterials.set(m,m.material);});list.querySelectorAll(".lv3d-part").forEach(b=>b.classList.toggle("active",b.dataset.mesh===mesh.uuid));}
      function describe(mesh){const n=prettyName(mesh),l=layerOf(mesh);const side=/\b(left|_l| l)\b/i.test(mesh.name)?" Often paired with a matching structure on the opposite side.":"";if(l==="skeleton")return n+" is part of the skeletal system. Bones support the body, protect organs, and provide attachment points for muscles."+side;if(l==="muscles")return n+" is part of the muscular system. Muscles generate force and help control posture and movement."+side;return n+" is an individually selectable anatomical structure in this educational model.";}
      function applyLayers(){meshes.forEach(m=>{const l=layerOf(m);m.visible=!hidden.has(m.uuid)&&(layer==="all"||l===layer||l==="other");if(m.userData.lvOriginalMaterial){m.material=m.userData.lvOriginalMaterial;} });if(selected&&!selected.visible){selected=null;partName.textContent="Layer changed";partDesc.textContent="Choose a visible structure to inspect it.";}}
      function renderList(){const q=search.value.trim().toLowerCase();const filtered=meshes.filter(m=>m.visible&&prettyName(m).toLowerCase().includes(q)).slice(0,160);list.innerHTML=filtered.map(m=>'<button class="lv3d-part'+(selected===m?' active':'')+'" data-mesh="'+m.uuid+'">'+prettyName(m)+'</button>').join("")||'<span style="font-size:.8rem;color:#7896ab">No matching visible parts.</span>';list.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{const m=meshes.find(x=>x.uuid===b.dataset.mesh);if(m){selectMesh(m);focusOn(m);}}));}
      function focusOn(obj){const box=new T.Box3().setFromObject(obj),center=box.getCenter(new T.Vector3());target.copy(center);}
      const target=new T.Vector3(0,0,0);
      function updateCamera(){const dist=zoom;const offset=new T.Vector3(Math.sin(rotY)*Math.cos(rotX),Math.sin(rotX),Math.cos(rotY)*Math.cos(rotX)).multiplyScalar(dist);camera.position.copy(target).add(offset);camera.lookAt(target);}
      function resetCamera(){target.set(0,0,0);rotX=0;rotY=0;zoom=initialZoom;updateCamera();}
      function applyLayer(next){layer=next;host.querySelectorAll("[data-layer]").forEach(b=>b.classList.toggle("active",b.dataset.layer===next));applyLayers();renderList();}
      host.querySelectorAll("[data-layer]").forEach(b=>b.addEventListener("click",()=>applyLayer(b.dataset.layer)));
      search.addEventListener("input",renderList);
      host.querySelector("[data-isolate]").addEventListener("click",()=>{if(!selected)return;meshes.forEach(m=>{m.visible=m===selected;});renderList();});
      host.querySelector("[data-hide]").addEventListener("click",()=>{if(!selected)return;hidden.add(selected.uuid);selected.visible=false;selected=null;partName.textContent="Part hidden";partDesc.textContent="Press Show all to restore hidden structures.";applyLayers();renderList();});
      host.querySelector("[data-restore]").addEventListener("click",()=>{hidden.clear();applyLayers();renderList();});
      host.querySelector("[data-reset]").addEventListener("click",()=>{hidden.clear();applyLayer("all");resetCamera();});
      host.querySelector("[data-rotate]").addEventListener("click",e=>{autoRotate=!autoRotate;e.currentTarget.classList.toggle("active",autoRotate);e.currentTarget.textContent=autoRotate?"Ⅱ Pause rotation":"⟳ Auto rotate";});
      host.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>{rotX=0;rotY=b.dataset.view==="back"?Math.PI:b.dataset.view==="side"?Math.PI/2:0;updateCamera();}));
      canvas.addEventListener("pointerdown",e=>{dragging=true;px=e.clientX;py=e.clientY;canvas.setPointerCapture(e.pointerId);});
      canvas.addEventListener("pointermove",e=>{if(!dragging)return;rotY+=(e.clientX-px)*.009;rotX=Math.max(-1.2,Math.min(1.2,rotX+(e.clientY-py)*.009));px=e.clientX;py=e.clientY;updateCamera();});
      canvas.addEventListener("pointerup",()=>dragging=false);canvas.addEventListener("pointercancel",()=>dragging=false);
      canvas.addEventListener("wheel",e=>{e.preventDefault();zoom=Math.max(initialZoom*.45,Math.min(initialZoom*2.2,zoom+e.deltaY*.006));updateCamera();},{passive:false});
      canvas.addEventListener("click",e=>{const r=canvas.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width)*2-1;pointer.y=-((e.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(meshes.filter(m=>m.visible),true)[0];if(hit){let m=hit.object;while(m&&!meshes.includes(m))m=m.parent;if(m){selectMesh(m);renderList();}}});
      const loader=new T.GLTFLoader();
      status.textContent=isHeart?"DOWNLOADING HEART MODEL":"DOWNLOADING ANATOMY";
      loader.load(modelUrl,gltf=>{
        model=gltf.scene;scene.add(model);
        const box=new T.Box3().setFromObject(model),size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3());
        model.position.sub(center);
        const scale=2.8/Math.max(size.x,size.y,size.z);model.scale.setScalar(scale);
        model.traverse(o=>{if(o.isMesh){o.userData.lvOriginalMaterial=o.material;o.material=o.material.clone();o.material.side=T.DoubleSide;o.material.roughness=.72;o.material.metalness=.02;meshes.push(o);}});
        meshes.sort((a,b)=>prettyName(a).localeCompare(prettyName(b)));
        initialZoom=4.3;zoom=initialZoom;resetCamera();loading.remove();status.textContent=meshes.length+" SELECTABLE STRUCTURES";
        applyLayers();renderList();
        if(meshes.length){const first=meshes.find(m=>layerOf(m)==="skeleton")||meshes[0];selectMesh(first);}
      },xhr=>{if(xhr.total)status.textContent="LOADING "+Math.round(xhr.loaded/xhr.total*100)+"%";},err=>{loading.innerHTML='<strong>3D model could not load</strong><span>Check your internet connection and refresh. The model is hosted from the open-source project.</span>';status.textContent="MODEL LOAD FAILED";});
      const resize=()=>{if(!stage.isConnected){cancelAnimationFrame(raf);renderer.dispose();return;}camera.aspect=Math.max(1,stage.clientWidth)/Math.max(1,stage.clientHeight);camera.updateProjectionMatrix();renderer.setSize(stage.clientWidth,stage.clientHeight,false);};
      window.addEventListener("resize",resize);
      const draw=()=>{raf=requestAnimationFrame(draw);if(autoRotate&&!dragging){rotY+=.002;updateCamera();}renderer.render(scene,camera);};draw();
    }).catch(()=>{loading.innerHTML="<strong>3D engine failed to load</strong><span>Refresh the page or check your internet connection.</span>";status.textContent="3D UNAVAILABLE";});
  }

  function mountStylizedViewer(host,kind,title) {
    host.innerHTML='<section class="lv3d-panel"><div class="lv3d-heading"><span class="lv3d-title">✦ INTERACTIVE 3D EXPLORER / '+title+'</span><span class="lv3d-status">ROTATE · ZOOM</span></div><div class="lv3d-stage" style="height:390px"><canvas aria-label="Interactive 3D educational model"></canvas><div class="lv3d-load"><div class="lv3d-spinner"></div><strong>Loading 3D scene…</strong></div></div><div class="lv3d-toolbar"><button data-rotate>⟳ Auto rotate</button><button data-reset>Reset view</button><label style="color:#a6c0d2;font-size:.8rem">Model: '+kind+'</label></div><p class="lv3d-note">Stylized educational reconstruction. Realistic named-part selection is currently available in Human Anatomy.</p></section>';
    loadThree().then(T=>{const stage=host.querySelector(".lv3d-stage"),canvas=host.querySelector("canvas"),loading=host.querySelector(".lv3d-load"),scene=new T.Scene();scene.background=new T.Color(0x081421);const camera=new T.PerspectiveCamera(40,stage.clientWidth/stage.clientHeight,.1,100);camera.position.z=4.5;const renderer=new T.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.setSize(stage.clientWidth,stage.clientHeight,false);scene.add(new T.HemisphereLight(0xffffff,0x223344,2));const l=new T.DirectionalLight(0xffffff,2);l.position.set(3,4,5);scene.add(l);const group=new T.Group(),color=palettes[kind]||0x55e4e8,material=new T.MeshStandardMaterial({color,roughness:.58});const sphere=new T.SphereGeometry(1,32,24);const ell=(x,y,z,sx,sy,sz,c=material)=>{const m=new T.Mesh(sphere,c);m.position.set(x,y,z);m.scale.set(sx,sy,sz);group.add(m);};if(kind==="fish"){ell(0,0,0,1,.5,.4);ell(-1.1,0,0,.4,.6,.1);}else if(kind==="dinosaurs"||kind==="dragons"){ell(0,0,0,1,.5,.4);ell(.8,.35,0,.35,.3,.3);ell(-.8,.1,0,.7,.15,.15);ell(-.45,-.55,.15,.14,.5,.14);ell(.45,-.55,.15,.14,.5,.14);if(kind==="dragons"){ell(-.2,.7,.2,.75,.12,.55);ell(-.2,.7,-.2,.75,.12,.55);}}else if(kind==="micro"){ell(0,0,0,.9,.8,.7);for(let i=0;i<12;i++){let a=i*2.4;ell(Math.cos(a)*.6,Math.sin(a)*.5,Math.sin(a*1.7)*.5,.13,.13,.13,new T.MeshStandardMaterial({color:0xffc76a}));}}else{ell(0,0,0,.8,.45,.4);ell(.75,.3,0,.35,.3,.3);for(let x of [-.5,.5])for(let z of [-.2,.2])ell(x,-.5,z,.13,.45,.13);}scene.add(group);loading.remove();let drag=false,px=0,py=0,auto=true;canvas.addEventListener("pointerdown",e=>{drag=true;px=e.clientX;py=e.clientY;canvas.setPointerCapture(e.pointerId);});canvas.addEventListener("pointermove",e=>{if(drag){group.rotation.y+=(e.clientX-px)*.01;group.rotation.x+=(e.clientY-py)*.01;px=e.clientX;py=e.clientY;}});canvas.addEventListener("pointerup",()=>drag=false);canvas.addEventListener("wheel",e=>{e.preventDefault();camera.position.z=Math.max(2.5,Math.min(8,camera.position.z+e.deltaY*.006));},{passive:false});host.querySelector("[data-rotate]").addEventListener("click",()=>auto=!auto);host.querySelector("[data-reset]").addEventListener("click",()=>{group.rotation.set(0,0,0);camera.position.z=4.5;});const draw=()=>{if(!host.isConnected){renderer.dispose();return;}requestAnimationFrame(draw);if(auto&&!drag)group.rotation.y+=.004;renderer.render(scene,camera);};draw();window.addEventListener("resize",()=>{camera.aspect=stage.clientWidth/stage.clientHeight;camera.updateProjectionMatrix();renderer.setSize(stage.clientWidth,stage.clientHeight,false);});}).catch(()=>{});
  }

  function attach() {
    const detail=document.getElementById("detailContent");if(!detail||detail.dataset.lv3dObserver)return;detail.dataset.lv3dObserver="1";addStyles();
    new MutationObserver(()=>{const title=detail.querySelector("#detailTitle");if(!title)return;const old=detail.querySelector(".lv3d-host");if(old&&old.dataset.forTitle===title.textContent.trim())return;if(old)old.remove();const hero=detail.querySelector(".detail-hero");const text=(title.textContent+" "+(hero?.textContent||"")).toLowerCase();const kind=/fish|ocean|shark|aqua/.test(text)?"fish":/dinosaur|prehistoric|tyrannosaurus|stegosaurus|triceratops/.test(text)?"dinosaurs":/dragon|fantasy/.test(text)?"dragons":/cell|micro|virus|bacteria|microscopic/.test(text)?"micro":/animal|lion|mammal|wildlife/.test(text)?"animals":"human";const host=document.createElement("div");host.className="lv3d-host";host.dataset.forTitle=title.textContent.trim();(detail.querySelector(".detail-body")||detail).prepend(host);if(kind==="human")makeHumanViewer(host,title.textContent.trim());else mountStylizedViewer(host,kind,title.textContent.trim());}).observe(detail,{childList:true,subtree:true});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",attach);else attach();
})();