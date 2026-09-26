(() => {
 'use strict';
 const dialog=document.createElement('dialog');
 dialog.id='imageViewer';dialog.setAttribute('aria-label','查看大图');
 dialog.innerHTML='<button type="button" class="image-viewer-close" autofocus aria-label="关闭大图">关闭 ×</button><figure><img alt=""><figcaption></figcaption></figure>';
 document.body.append(dialog);
 const large=dialog.querySelector('img'),caption=dialog.querySelector('figcaption');
 const excluded='#imageViewer,#photoDialog,.leaflet-pane,.leaflet-control,.gm-style,button[data-photo],[data-gallery-key]';
 function addZoom(host,img){
  const viewport=document.createElement('div');viewport.className='image-zoom-viewport';
  viewport.setAttribute('role','region');viewport.setAttribute('aria-label','图片缩放区域');
  img.replaceWith(viewport);viewport.append(img);img.draggable=false;
  const controls=document.createElement('div');controls.className='image-zoom-controls';
  controls.setAttribute('role','group');controls.setAttribute('aria-label','图片缩放控制');
  controls.innerHTML='<button type="button" data-zoom="out" aria-label="缩小图片">−</button><input type="range" min="25" max="600" step="5" value="100" aria-label="图片缩放比例"><button type="button" data-zoom="in" aria-label="放大图片">＋</button><output>100%</output><button type="button" data-zoom="reset">适应窗口</button>';
  const stage=viewport.closest('.album-stage')||viewport;stage.after(controls);
  const slider=controls.querySelector('input'),value=controls.querySelector('output');
  let scale=1,x=0,y=0,width=0,height=0,drag=null;
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  function render(){
   const maxX=Math.max(0,(width*scale-viewport.clientWidth)/2),maxY=Math.max(0,(height*scale-viewport.clientHeight)/2);
   x=clamp(x,-maxX,maxX);y=clamp(y,-maxY,maxY);
   img.style.transform=`translate(-50%,-50%) translate(${x}px,${y}px) scale(${scale})`;
   viewport.classList.toggle('can-pan',maxX>0||maxY>0);img.dataset.zoom=String(scale);
   const percent=Math.round(scale*100);slider.value=String(percent);slider.setAttribute('aria-valuetext',percent+'%，100% 为适应窗口');value.textContent=percent+'%';
   controls.querySelector('[data-zoom="out"]').disabled=scale<=.25;
   controls.querySelector('[data-zoom="in"]').disabled=scale>=6;
  }
  function reset(){
   if(!host.open||!img.naturalWidth||!viewport.clientWidth)return;
   const fit=Math.min(viewport.clientWidth/img.naturalWidth,viewport.clientHeight/img.naturalHeight,1);
   width=img.naturalWidth*fit;height=img.naturalHeight*fit;
   img.style.width=width+'px';img.style.height=height+'px';scale=1;x=y=0;render();
  }
  function zoom(next,px=0,py=0){
   next=clamp(next,.25,6);const ratio=next/scale;
   x=px-(px-x)*ratio;y=py-(py-y)*ratio;scale=next;render();
  }
  viewport.addEventListener('wheel',event=>{
   event.preventDefault();
   if(!width)return;
   const r=viewport.getBoundingClientRect(),delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?viewport.clientHeight:1);
   zoom(scale*Math.exp(-clamp(delta,-250,250)*.002),event.clientX-r.left-r.width/2,event.clientY-r.top-r.height/2);
  },{passive:false});
  slider.addEventListener('input',()=>zoom(Number(slider.value)/100));
  controls.addEventListener('click',event=>{
   const action=event.target.closest('[data-zoom]')?.dataset.zoom;
   if(action==='reset')reset();else if(action)zoom(scale*(action==='in'?1.25:.8));
  });
  viewport.addEventListener('pointerdown',event=>{
   if(event.button!==0||!event.isPrimary||!viewport.classList.contains('can-pan'))return;
   drag={id:event.pointerId,x:event.clientX,y:event.clientY,tx:x,ty:y};viewport.setPointerCapture(event.pointerId);viewport.classList.add('is-panning');
  });
  viewport.addEventListener('pointermove',event=>{
   if(!drag||drag.id!==event.pointerId)return;
   x=drag.tx+event.clientX-drag.x;y=drag.ty+event.clientY-drag.y;render();
  });
  const stop=()=>{drag=null;viewport.classList.remove('is-panning');};
  viewport.addEventListener('pointerup',stop);viewport.addEventListener('pointercancel',stop);viewport.addEventListener('lostpointercapture',stop);
  img.addEventListener('load',reset);
  new MutationObserver(()=>{stop();scale=1;x=y=0;img.dataset.zoom='1';requestAnimationFrame(reset);}).observe(img,{attributes:true,attributeFilter:['src']});
  new MutationObserver(()=>{if(host.open)requestAnimationFrame(reset);else stop();}).observe(host,{attributes:true,attributeFilter:['open']});
  new ResizeObserver(reset).observe(viewport);
  return reset;
 }
 const resetZoom=addZoom(dialog,large);
 const albumDialog=document.getElementById('photoDialog'),albumImage=document.getElementById('largePhoto');
 if(albumDialog&&albumImage)addZoom(albumDialog,albumImage);
 let origin=null,pressedOutside=false;
 function eligible(img){return img instanceof HTMLImageElement&&!img.closest(excluded);}
 function imageLink(link){
  if(!link)return false;
  const url=new URL(link.href,location.href);
  return url.origin===location.origin&&/\.(?:jpe?g|png|webp|gif|avif|svg)$/i.test(url.pathname);
 }
 function open(src,label,trigger){
  origin=trigger;large.src=src;large.alt=label;caption.textContent=label;
  if(!dialog.open)dialog.showModal();
  resetZoom();
 }
 document.addEventListener('click',event=>{
  const img=event.target.closest('img'),link=event.target.closest('a[href]');
  if(event.target.closest(excluded))return;
  if(img&&eligible(img)){
   event.preventDefault();event.stopPropagation();
   open(imageLink(link)?link.href:img.currentSrc||img.src,img.alt||'图片',link||img);
  }else if(imageLink(link)){
   event.preventDefault();event.stopPropagation();
   const nearby=link.closest('figure')?.querySelector('img');
   open(link.href,nearby?.alt||link.getAttribute('aria-label')||link.textContent.trim(),link);
  }
 },true);
 document.addEventListener('keydown',event=>{
  if((event.key==='Enter'||event.key===' ')&&eligible(event.target)&&!event.target.closest('a,button')){
   event.preventDefault();open(event.target.currentSrc||event.target.src,event.target.alt||'图片',event.target);
  }
 });
 function prepare(root){
  const images=root.matches?.('img')?[root]:root.querySelectorAll?.('img')||[];
  for(const img of images){
   if(!eligible(img))continue;
   img.classList.add('image-viewer-trigger');
   if(!img.closest('a,button')){
    img.tabIndex=0;img.setAttribute('role','button');
    img.setAttribute('aria-label','查看大图：'+(img.alt||'图片'));
   }
  }
 }
 prepare(document);
 new MutationObserver(records=>{
  for(const record of records)for(const node of record.addedNodes)if(node.nodeType===1)prepare(node);
 }).observe(document.body,{childList:true,subtree:true});
 const outside=event=>{
  const r=dialog.getBoundingClientRect();
  return event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom);
 };
 dialog.addEventListener('pointerdown',event=>{pressedOutside=event.isPrimary&&event.button===0&&outside(event);});
 dialog.addEventListener('pointercancel',()=>{pressedOutside=false;});
 dialog.addEventListener('click',event=>{if(pressedOutside&&outside(event))dialog.close();pressedOutside=false;});
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{pressedOutside=false;large.removeAttribute('src');if(origin?.isConnected)origin.focus({preventScroll:true});});
})();
