(() => {
  const escape=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
  function render(photo) {
    const p=resolvePhoto(photo.path,photo);
    const license=p.licenseUrl?'<a href="'+escape(p.licenseUrl)+'">'+escape(p.license)+'</a>':escape(p.license);
    return '<div><a href="'+escape(p.path)+'"><img src="'+escape(p.path)+'" alt="'+escape(p.caption)+'" loading="lazy"></a><p>'+escape(p.caption)+'</p><p>作者：'+escape(p.artist)+'<br>许可：'+license+'<br><a href="'+escape(p.source)+'">原图来源</a> · <a href="'+escape(p.path)+'">本地图片</a>'+(p.changes?'<br>'+escape(p.changes):'')+'</p></div>';
  }
  document.querySelectorAll('[data-gallery]').forEach(element=>{
    element.innerHTML=photoGalleries[element.dataset.gallery].slice(0,Number(element.dataset.count)).map(render).join('');
  });
  document.querySelectorAll('[data-photo]').forEach(element=>{
    element.innerHTML=render({path:element.dataset.photo,caption:element.dataset.caption});
  });
  if(location.hash)document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
})();
