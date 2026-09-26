(() => {
 'use strict';
 const dialog=document.createElement('dialog');
 dialog.id='cityIntroDialog';dialog.className='city-intro-dialog';dialog.setAttribute('aria-labelledby','cityIntroTitle');
 dialog.innerHTML='<header class="city-intro-head"><div><span id="cityIntroEnglish" class="city-intro-eyebrow"></span><h2 id="cityIntroTitle"></h2></div><button type="button" id="cityIntroClose" aria-label="关闭城市介绍" autofocus>关闭 ×</button></header><div class="city-intro-body" id="cityIntroBody"></div>';
 document.body.append(dialog);
 let origin=null;
 const escape=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 function renderIntroductionPhoto(photo,hero=false,label=''){
  if(!photo)return '';
  photo=resolvePhoto(photo.path,photo);
  const license=photo.licenseUrl?'<a href="'+escape(photo.licenseUrl)+'" target="_blank" rel="noopener noreferrer">'+escape(photo.license)+'</a>':escape(photo.license);
  const fullSize='<a href="'+escape(photo.path)+'" aria-label="'+escape('查看大图：'+photo.caption)+'">';
  const image='<img src="'+escape(photo.path)+'" alt="'+escape(photo.caption)+'" width="'+photo.width+'" height="'+photo.height+'" loading="'+(hero?'eager':'lazy')+'" decoding="async">';
  const credits=photo.creditLinks?'<span class="city-intro-map-credit">'+photo.creditLinks.map(([text,url])=>'<a href="'+escape(url)+'" target="_blank" rel="noopener noreferrer">'+escape(text)+'</a>').join(' · ')+' · '+license+'</span>':'';
  return '<figure class="'+(hero?'city-intro-hero':'city-intro-photo')+'">'+(label?'<div class="city-intro-image-label">'+escape(label)+'</div>':'')+fullSize+image+'</a>'+'<figcaption><span>'+escape(photo.caption)+'</span>'+(label?fullSize+'查看大图 ↗</a>':'')+credits+'<details class="city-intro-credit"><summary>图片来源与署名</summary><div>作者：'+escape(photo.artist)+'<br><a href="'+escape(photo.source)+'" target="_blank" rel="noopener noreferrer">原图与资料 ↗</a> · '+license+(photo.changes?'<br>'+escape(photo.changes):'')+'</div></details></figcaption></figure>';
 }
 function renderIntroductionImages(images,geography=false){
  if(!images?.length)return '';
  return '<div class="city-intro-images'+(images.length>1?' city-intro-images-pair':'')+(geography?' city-intro-geography':'')+'">'+images.map((photo,index)=>renderIntroductionPhoto(photo,false,geography?(index?'二维地形图':'俯瞰城市'):'')).join('')+'</div>';
 }
 function openIntroduction(id){
  const city=cities.find(c=>c.id===Number(id));if(!city)return;
  const intro=cityIntroductions[city.id],body=document.getElementById('cityIntroBody');
  document.getElementById('cityIntroTitle').textContent=city.name+' · 城市介绍';
  document.getElementById('cityIntroEnglish').textContent=city.en;
  if(!intro){body.innerHTML='<div class="city-intro-empty"><span aria-hidden="true">✧</span><h3>城市介绍待补充</h3><p>'+escape(city.name)+'的介绍暂时留空。</p></div>';}
  else{
   body.innerHTML=renderIntroductionPhoto(intro.hero,true)
    +'<div class="city-intro-copy"><div class="city-intro-tags">'+intro.tags.map(tag=>'<span>'+escape(tag)+'</span>').join('')+'</div><h3 class="city-intro-deck">'+escape(intro.title)+'</h3><p class="city-intro-lead">'+escape(intro.lead)+'</p>'
    +'<div class="city-intro-context"><p><b>来处</b>'+escape(intro.history)+'</p><p><b>今天</b>'+escape(intro.today)+'</p></div>'+renderIntroductionImages([intro.overview,intro.regionMap].filter(Boolean),true)
    +intro.sections.map(section=>'<section class="city-intro-section"><h3>'+escape(section.title)+'</h3>'+section.text.split(/\n\s*\n/).map(paragraph=>'<p>'+escape(paragraph)+'</p>').join('')+renderIntroductionImages(section.images)+'</section>').join('')
    +'<aside class="city-intro-approach"><h3>'+escape(intro.approach.title)+'</h3><p>'+escape(intro.approach.text)+'</p></aside>'
    +'<details class="city-intro-sources"><summary>参考资料 · 2026-09-26</summary>'+intro.sources.map(([label,url])=>'<a href="'+escape(url)+'" target="_blank" rel="noopener noreferrer">'+escape(label)+' ↗</a>').join('')+'</details></div>';
  }
  if(!dialog.open){origin=document.activeElement;dialog.showModal();}
  body.scrollTop=0;
 }
 document.addEventListener('click',event=>{const button=event.target.closest('[data-city-intro]');if(button){event.preventDefault();openIntroduction(button.dataset.cityIntro);}});
 document.getElementById('cityIntroClose').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{if(origin?.isConnected&&!document.querySelector('dialog[open]'))origin.focus({preventScroll:true});});
 // Require both press and release outside. Dragging a map or selecting text must not dismiss it.
 function dismissOnBackdrop(target){
  let pressedOutside=false;
  const outside=event=>{const rect=target.getBoundingClientRect();return event.target===target&&(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom);};
  target.addEventListener('pointerdown',event=>{pressedOutside=event.isPrimary&&event.button===0&&outside(event);});
  target.addEventListener('pointercancel',()=>{pressedOutside=false;});
  target.addEventListener('click',event=>{const dismiss=pressedOutside&&outside(event);pressedOutside=false;if(dismiss){event.preventDefault();event.stopPropagation();target.close();}});
  target.addEventListener('close',()=>{pressedOutside=false;});
 }
 dismissOnBackdrop(dialog);dismissOnBackdrop(document.getElementById('cityMapDialog'));
})();
