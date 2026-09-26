

const $=id=>document.getElementById(id),ns='http://www.w3.org/2000/svg';
let selected=0,region='全部';
function project(lon,lat,island=false){return island?[22+(lon+18.332097)/(18.332097-13.159498)*215,668+(29.554266-lat)/(29.554266-27.399873)*90]:[(lon+9.9)/14.7*900,(44.4-lat)/9.7*772.3125]}
cities.forEach(c=>{const [x,y]=project(c.lon,c.lat,c.lat<31),b=document.createElement('button');b.type='button';b.className='pin';b.id='pin-'+c.id;b.style.left=x/9+'%';b.style.top=y/772.3125*100+'%';b.setAttribute('aria-label',c.name+'：查看景点');b.innerHTML='<span class="dot"></span><span class="label">'+c.name+'</span>';const lab=b.lastChild;lab.style.top=(c.dy+1)+'px';if(c.dx<0)lab.style.right=(11-c.dx)+'px';else lab.style.left=(11+c.dx)+'px';b.onclick=()=>select(c.id,true);$('pins').append(b)});
['全部','中部','东部','南部','西部','北部','海岛','葡萄牙'].forEach(r=>{const b=document.createElement('button');b.type='button';b.textContent=r;b.onclick=()=>{region=r;renderList()};$('filters').append(b)});
function normalize(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function renderList(){const q=normalize($('search').value.trim());const visible=cities.filter(c=>(region==='全部'||c.region===region)&&normalize(c.name+' '+c.en+' '+c.slug+' '+(c.id===11?'圣地亚哥德孔波斯特拉':'')+' '+(c.id===19?'圣克鲁斯德特内里费 Santa Cruz de Tenerife 拉古纳 La Laguna 加那利 Canary Islands':'')).includes(q));$('cityList').replaceChildren();visible.forEach(c=>{const b=document.createElement('button');b.type='button';b.className='city-item';b.setAttribute('aria-pressed',c.id===selected);b.innerHTML='<span class="index">'+String(c.id+1).padStart(2,'0')+'</span><span><strong>'+c.name+'</strong><small>'+c.en+'</small><em>查看城市地点介绍 ↗</em></span>';b.onclick=()=>{select(c.id,true)};$('cityList').append(b)});$('count').textContent=visible.length+' / '+cities.length+' 个目的地';$('empty').hidden=visible.length>0;[...$('filters').children].forEach(b=>b.setAttribute('aria-pressed',b.textContent===region));cities.forEach(c=>{const p=$('pin-'+c.id);const show=visible.includes(c);p.classList.toggle('dim',!show);p.disabled=!show;p.setAttribute('aria-pressed',c.id===selected);p.classList.toggle('selected',c.id===selected)})}

function cityActivities(id){return localActivities.filter(a=>a.city===Number(id)&&!travelNoteActivityLinks[a.id])}

function renderTravelNotes(s){
  const notes=s.travelNotes||[];
  if(!notes.length)return '';
  return '<section class="place-travel-notes"><strong>旅行笔记</strong>'+notes.map(n=>'<p>'+safe(n.note||'')+'<small>WanderWithMira · '+safe(n.ref)+'</small></p>').join('')+(s.relatedScreenshotKey?'<button type="button" class="screenshot-link" data-gallery-key="'+safe(s.relatedScreenshotKey)+'" data-gallery-index="0">'+safe(s.relatedScreenshotLabel)+'</button>':'')+'</section>';
}
function renderUnlocatedPlaces(id,filter='全部'){
  const entries=travelUnlocatedPlaces.filter(p=>p.city===Number(id)&&(filter==='全部'||filter===p.cat));
  if(!entries.length)return '';
  return '<details class="place-unlocated"><summary>'+entries.length+' 条地点线索待补全</summary><p>店名、分店或地址待确认。</p>'+entries.map(p=>'<div><strong>'+safe(p.name)+'</strong><p>'+safe(p.note)+'</p><small>WanderWithMira · '+safe(p.ref)+'</small>'+(p.galleryKey?galleryStrip(p.galleryKey):'')+'</div>').join('')+'</details>';
}

function renderCityEntry(entry){
  const p=entry.photo;
  const photo=p?'<button class="photo-btn" type="button" data-photo="'+safe(p.key)+'" aria-label="放大'+safe(entry.title)+'照片"><img src="'+safe(p.path)+'" alt="'+safe(entry.title+' · '+(p.caption||'实景参考'))+'" loading="lazy" width="800" height="500"></button>':'';
  const guide=entry.guide.filter(([,value])=>value).map(([label,value])=>'<div><dt>'+safe(label)+'</dt><dd>'+safe(value)+'</dd></div>').join('');
  return '<article class="spot" id="'+safe(entry.id)+'" data-entry-type="'+entry.type+'" data-entry-category="'+safe(entry.category)+'">'+photo+'<span class="num">'+String(entry.number).padStart(2,'0')+'</span><h4>'+safe(entry.title)+'</h4>'+(entry.tag||'')+'<p class="culture-kind">'+safe(entry.category)+(entry.subtitle?'<br>'+safe(entry.subtitle):'')+'</p><p class="spot-intro">'+safe(entry.description)+'</p><p class="visit-time"><span>'+safe(entry.durationLabel||'建议时长')+'</span>'+safe(entry.duration)+'</p><dl class="spot-guide">'+guide+'</dl>'+(entry.combo?'<p class="culture-extra"><strong>怎么顺路</strong>'+safe(entry.combo)+'</p>':'')+(entry.notes||'')+'<div class="spot-links">'+entry.links+'</div>'+(p?'<p class="photo-meta">'+safe(p.caption||'')+' <a href="图片来源与授权.html#'+(p.kind==='video-screenshot'?'screenshots-':'')+safe(p.key)+'" target="_blank" rel="noopener">照片署名与授权 ↗</a></p>':'')+'</article>';
}
function renderSpot(c,s,i){
  const key=spotKey(c,i);
  return renderCityEntry({id:'spot-'+key,type:s.placeType||'spot',category:s.cat,number:i+1,title:s.n,photo:photos.find(x=>x.key===key),tag:cultureTag(s),subtitle:[s.en,s.kind].filter(Boolean).join(' · '),description:s.d,duration:s.duration,durationLabel:s.placeType==='hotel'?'住宿安排':s.placeType==='restaurant'?'用餐预留':'建议时长',notes:renderHotelPrice(s)+renderTravelNotes(s),guide:[[s.placeType==='restaurant'?'点单参考':s.placeType==='hotel'?'住宿参考':'重点看点',s.highlights],['实用提示',s.tip],['地址',s.address]],combo:s.combo,links:'<button type="button" class="city-map-spot-link" data-city-map="'+c.id+'" data-city-map-spot="'+i+'">在城市地图上查看</button><a href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(s.q+' '+(c.country||'Spain'))+'" target="_blank" rel="noopener noreferrer">地图定位 ↗</a><a class="spot-source" href="'+safe(s.source)+'" target="_blank" rel="noopener noreferrer">官方介绍 ↗</a>'+(s.visitSource?'<a href="'+safe(s.visitSource)+'" target="_blank" rel="noopener noreferrer">参观信息 ↗</a>':'')});
}
function renderActivity(c,a,i){
  return renderCityEntry({id:'sidebar-activity-'+a.id,type:'activity',category:a.type,number:c.spots.length+i+1,title:a.title,subtitle:a.venue,description:a.description,duration:a.duration,guide:[['季节与开放',a.season],['场次与预约',a.schedule],['位置',a.address]],combo:a.fit,links:'<button type="button" class="city-map-spot-link" data-activity-map="'+safe(a.id)+'">在城市地图上查看</button><a href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(a.query)+'" target="_blank" rel="noopener noreferrer">地图定位 ↗</a><a class="spot-source" href="'+safe(a.url)+'" target="_blank" rel="noopener noreferrer">官方资料／预约 ↗</a>'});
}
function select(id,scroll=false){
  selected=id;const c=cities[id];
  $('detail').innerHTML='<div class="detail-head"><div class="kicker">DESTINATION '+String(id+1).padStart(2,'0')+' / '+c.region+'</div><h2>'+c.name+'</h2><div class="english">'+c.en+'</div><p class="tagline">'+c.tag+'</p><span class="badge">建议停留 · '+c.days+'</span></div><h3>景点、餐厅、酒店与活动</h3><p class="guide-note">时长为安排建议，不含交通与排队。旅行笔记中的账单和体验属于当次记录，开放、菜单与房价以当前信息为准。</p>'+renderHotelCoverage(c.id)+'<div class="spots">'+c.spots.map((s,i)=>renderSpot(c,s,i)).join('')+cityActivities(c.id).map((a,i)=>renderActivity(c,a,i)).join('')+'</div><div id="cityUnlocated">'+renderUnlocatedPlaces(c.id)+'</div><a class="source" href="'+safe(c.tourism||'https://www.spain.info/en/destination/'+c.slug+'/')+'" target="_blank" rel="noopener noreferrer">'+(c.country==='Portugal'?'查看当地旅游局城市指南':'查看西班牙国家旅游局城市指南')+' ↗</a>';
  enhanceCityDetail();addCityMapEntry();renderList();$('detail').scrollTop=0;
  document.querySelectorAll('[data-photo]').forEach(b=>b.onclick=()=>openPhoto(b.dataset.photo,b.getAttribute('aria-label').replace('放大','').replace('照片','')));
  if(scroll&&matchMedia('(max-width:800px)').matches)revealPageTarget($('detail')).scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});
}
$('search').addEventListener('input',renderList);select(0);
function safe(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function openPhoto(key,title){const p=photos.find(x=>x.key===key);$('largePhoto').src=p.path;$('largePhoto').alt=title;$('photoTitle').textContent=title;$('photoCredit').innerHTML=safe(p.artist)+' · '+safe(p.license)+' · <a href="'+safe(p.source)+'" target="_blank" rel="noopener">原图来源 ↗</a>';if(!$('photoDialog').open)$('photoDialog').showModal()}
$('closePhoto').onclick=()=>$('photoDialog').close();$('photoDialog').addEventListener('click',e=>{if(e.target===$('photoDialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()}});

let activeRoute=-1;
function shortDate(s){const [y,m,d]=s.split('-');return Number(m)+'/'+Number(d)}
function routeFlight(code,index){
  const f={...flightData.flights.find(f=>f.code===code)},r=routeMaps[index];
  if(r&&code===r.inbound&&r.returnDate){f.departDate=r.returnDate;f.arriveDate=r.returnArrival}
  return f;
}
function flightCard(code,label,index){
  const f=routeFlight(code,index),next=f.arriveDate!==f.departDate;
  return '<article class="flight-ticket"><div class="ticket-head"><b>'+code+'</b><span>'+label+' · '+(f.airline.includes('国际')?'国航':'东航')+'</span></div><div class="ticket-times"><div><span class="ticket-date">'+shortDate(f.departDate)+'</span><strong>'+f.depart+'</strong><small>'+f.from+'</small></div><span class="ticket-arrow">→</span><div><span class="ticket-date">'+shortDate(f.arriveDate)+(next?' · 次日':' · 当天')+'</span><strong>'+f.arrive+'</strong><small>'+f.to+'</small></div></div><div class="ticket-foot"><span>'+f.duration+'</span><a href="'+f.source+'" target="_blank" rel="noopener">计划时刻来源 ↗</a></div></article>';
}
function planFlights(index){
  const r=routeMaps[index];
  return '<div class="flight-pairs">'+r.outbound.map((code,i)=>flightCard(code,i?'去程备选':'去程',index)).join('')+flightCard(r.inbound,'回程',index)+'</div><p class="small-note">均为当地时间 · 公开计划班表，尚未核验可售座位。4/2 凌晨起飞需 4/1 晚到浦东机场。'+(r.type==='charter'?'本方案回程为 '+shortDate(r.returnDate)+'，'+shortDate(r.returnArrival)+' 抵沪。':'')+'<a href="#flights">查看全部航班、适用日期与说明 ↓</a></p><div class="plan-map-action"><button type="button" class="view-route-map">在地图查看本方案 ↑</button><span>上方地图已同步：城市顺序、交通方式与可选支线。</span></div>';
}
function routeCurve(leg){
  const a=cities[leg.from],b=cities[leg.to],p=project(a.lon,a.lat),q=project(b.lon,b.lat);
  const dx=q[0]-p[0],dy=q[1]-p[1],dist=Math.hypot(dx,dy),nx=-dy/dist,ny=dx/dist;
  const cp=[(p[0]+q[0])/2+nx*leg.bend,(p[1]+q[1])/2+ny*leg.bend];
  const trim=(v,t,n)=>{const len=Math.hypot(t[0]-v[0],t[1]-v[1]);return [v[0]+(t[0]-v[0])*n/len,v[1]+(t[1]-v[1])*n/len]};
  const start=trim(p,cp,17),end=trim(q,cp,21);
  return {d:'M '+start.join(' ')+' Q '+cp.join(' ')+' '+end.join(' '),mid:[(p[0]+2*cp[0]+q[0])/4,(p[1]+2*cp[1]+q[1])/4]};
}
function renderRoute(){
  const overview=activeRoute<0,r=overview?null:routeMaps[activeRoute];
  const optionalOn=$('optionalRoutes').checked;
  document.querySelectorAll('[data-route-map]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.routeMap)===activeRoute));
  $('optionalControl').hidden=overview||!r.optional.length;
  $('optionalText').textContent=r&&r.optionalLabel?r.optionalLabel:'显示可选一日游';
  $('map').classList.toggle('charter-active',!!r&&r.type==='charter');$('map').classList.toggle('reference-active',!!r&&r.variant==='reference');$('routeExplainer').classList.toggle('reference-route',!!r&&r.variant==='reference');
  $('routeExplainer').hidden=overview;$('mapJourney').hidden=overview;
  $('routeOverlay').toggleAttribute('hidden',overview);
  const stops=overview?[]:[...r.stops,...(optionalOn?r.optional:[])].map(s=>({...s,order:!optionalOn&&s.orderWithoutOptional?s.orderWithoutOptional:s.order}));
  if(r&&r.sortStops)stops.sort((a,b)=>a.sort-b.sort);
  cities.forEach(c=>{
    const p=$('pin-'+c.id),s=stops.find(s=>s.id===c.id),optional=r&&r.optional.some(s=>s.id===c.id);
    p.classList.toggle('route-muted',!overview&&!s);p.classList.toggle('route-stop',!!s);p.classList.toggle('route-optional',!!s&&optional);
    p.querySelector('.dot').textContent=s?s.order:'';
    p.setAttribute('aria-label',c.name+(s?'，'+s.date+'，'+s.stay:'')+'：查看景点');
    p.title=s?c.name+' · '+s.date+' · '+s.stay:c.name;
  });
  if(overview){$('routeOverlay').innerHTML='';$('routeModeName').textContent='城市总览 · 点击圆点查看景点';return}
  $('routeModeName').textContent=plans[activeRoute].name+' · 按数字顺序游览';
  const legs=r.legs.filter(l=>(!(l.mode==='optional'||l.optional)||optionalOn)&&(!l.omitWhenOptional||!optionalOn));
  let svg='<defs>'+[['rail','#246c60'],['air','#316ba0'],['optional','#9a701e'],['car',r.variant==='reference'?'#62587b':'#b26936']].map(([name,color])=>'<marker id="route-arrow-'+name+'" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="10" markerHeight="10" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M 1 1 L 9 5 L 1 9 z" fill="'+color+'"/></marker>').join('')+'</defs>';
  legs.forEach(l=>{
    const c=routeCurve(l),label=l.date+' '+cities[l.from].name+(l.mode==='optional'?' ⇄ ':' → ')+cities[l.to].name+'，'+l.label;
    svg+='<g><title>'+safe(label)+'</title><path class="route-halo" d="'+c.d+'"/><path class="route-path route-'+l.mode+(l.optional?' route-via':'')+'" data-from="'+l.from+'" data-to="'+l.to+'" d="'+c.d+'" marker-end="url(#route-arrow-'+l.mode+')"'+(l.mode==='optional'?' marker-start="url(#route-arrow-optional)"':'')+'/></g>';
    if(l.mode==='air')svg+='<g transform="translate('+c.mid.join(' ')+')"><rect x="-49" y="-15" width="98" height="28" rx="14" fill="#fffff4" stroke="#779cba"/><text text-anchor="middle" y="4" font-size="12" fill="#316ba0">'+l.date+' · 飞机</text></g>';
  });
  $('routeOverlay').innerHTML=svg;$('routeOverlay').setAttribute('aria-label',plans[activeRoute].name+'路线示意：'+legs.map(l=>cities[l.from].name+(l.mode==='optional'?'往返':'至')+cities[l.to].name).join('，'));
  const out=routeFlight(r.outbound[0],activeRoute),back=routeFlight(r.inbound,activeRoute);
  $('mapJourney').innerHTML='<span><strong>'+shortDate(out.departDate)+' 上海 → '+cities[r.stops[0].id].name+'</strong> · '+out.code+' '+out.depart+'–'+out.arrive+'</span><span><strong>'+shortDate(back.departDate)+' 马德里 → 上海</strong> · '+back.code+' '+back.depart+'–'+shortDate(back.arriveDate)+' '+back.arrive+'</span>';
  const legend=r.type==='charter'?'<span><i class="leg-car"></i>包车移动</span>'+(r.optional.length?'<span><i class="leg-via"></i>可选途中停留</span>':''):'<span><i></i>火车</span><span><i class="leg-air"></i>境内飞机</span><span><i class="leg-optional"></i>可选一日往返</span>';
  const warning=r.warning?r.warning:r.type==='charter'?'连线示意城市顺序，不是实际公路轨迹。车程为规划估计，不含游览、用餐、休息及拥堵。托莱多是途中加停，不是一日往返；主线默认关闭。':'连线只示意城市顺序，不是实际铁路或飞行轨迹。'+(activeRoute===2?'马德里标为 1/5，表示从这里入境、最后回到这里出境。':'可选一日游可取消，不增加住宿点。');
  $('routeExplainer').innerHTML='<div class="route-caption"><h3>'+plans[activeRoute].entry+'</h3><a href="#trip">查看逐日安排 ↓</a></div><div class="route-legend">'+legend+'<span>箭头表示行进方向</span><span><i class="leg-muted"></i>浅色城市也可点击查看景点</span></div><div class="route-stops">'+(r.timeline||stops).map(s=>'<button type="button" data-route-city="'+s.id+'"><b>'+s.order+'</b><span><strong>'+cities[s.id].name+'</strong><small>'+s.date+' · '+s.stay+'</small></span></button>').join('')+'</div><div class="route-transfers">'+legs.map(l=>'<span>'+l.date+' · '+cities[l.from].name+(l.mode==='optional'?' ⇄ ':' → ')+cities[l.to].name+'<small>'+l.label+'</small></span>').join('')+'</div><p class="route-warning">'+warning+' 国际航班时间为当地计划时刻；上海在图外，以地图上方的航班条表示。</p>';
  document.querySelectorAll('[data-route-city]').forEach(b=>b.onclick=()=>{select(Number(b.dataset.routeCity),true)});
}
function setMapRoute(index){
  if(index>=0&&index!==activeRoute)$('optionalRoutes').checked=routeMaps[index].optionalDefault!==false;
  activeRoute=index;region='全部';$('search').value='';
  if(index>=0)select(routeMaps[index].stops[0].id,false);else renderList();
  renderRoute();
}
document.querySelectorAll('[data-route-map]').forEach(b=>b.onclick=()=>{
  const index=Number(b.dataset.routeMap);
  if(index<0)setMapRoute(-1);else showPlan(index);
});
$('optionalRoutes').onchange=renderRoute;

function showPlan(index){$('planDateNote').innerHTML=planDateNotes[index];const p=plans[index];[...$('planTabs').children].forEach((b,i)=>{b.setAttribute('aria-selected',i===index);b.tabIndex=i===index?0:-1});$('planContent').setAttribute('aria-labelledby','plan-tab-'+index);$('planContent').innerHTML='<div class="plan-summary"><div><h3>'+p.entry+'</h3><p>'+p.subtitle+'</p><p class="route">'+p.route+'</p><span class="badge">'+p.pace+'</span><p>'+p.nights+'</p></div><div class="plan-why"><p>'+p.why+'</p><p class="small-note">'+p.tradeoff+'</p></div></div><div class="table-wrap"><table class="itinerary"><thead><tr><th>日期</th><th>当日路线</th><th>怎么玩</th><th>住宿</th></tr></thead><tbody>'+p.days.map(d=>'<tr>'+d.map(t=>'<td>'+t+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>'; $('planContent').querySelector('.plan-summary').insertAdjacentHTML('afterend',planFlights(index)); setMapRoute(index); renderPlanCulture(index); $('planContent').querySelector('.view-route-map').onclick=()=>{setMapRoute(index);revealPageTarget($('atlas')).scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'})};}
plans.forEach((p,i)=>{const b=document.createElement('button');b.id='plan-tab-'+i;b.type='button';b.textContent=String(i+1).padStart(2,'0')+' / '+p.name;b.setAttribute('role','tab');b.setAttribute('aria-controls','planContent');b.onclick=()=>showPlan(i);b.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();let next=e.key==='Home'?0:e.key==='End'?plans.length-1:(i+(e.key==='ArrowLeft'?plans.length-1:1))%plans.length;showPlan(next);$('planTabs').children[next].focus()}};$('planTabs').append(b)});showPlan(4);
document.querySelectorAll('.charter-to-days').forEach(a=>a.addEventListener('click',()=>showPlan(3)));

document.querySelectorAll('[data-reference-city]').forEach(b=>b.onclick=()=>{showPlan(4);select(Number(b.dataset.referenceCity),true);if(!matchMedia('(max-width:800px)').matches)revealPageTarget($('atlas')).scrollIntoView({behavior:'instant'});});
document.querySelectorAll('[data-reference-action]').forEach(b=>b.onclick=()=>{const a=b.dataset.referenceAction;showPlan(a==='compare'?3:4);revealPageTarget($(a==='days'?'trip':'atlas')).scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});});
function spotKey(c,i){return 'c'+String(c.id+1).padStart(2,'0')+'-s'+String(i+1).padStart(2,'0')}
function cultureTag(s){return s.priority?'<span class="culture-tag '+(s.priority==='开放待复核'?'warn':s.priority==='特别推荐'?'prime':'')+'">'+safe(s.priority)+'</span>':''}
function bindPhotos(root){root.querySelectorAll('[data-photo]').forEach(b=>b.onclick=()=>openPhoto(b.dataset.photo,b.dataset.title||b.getAttribute('aria-label').replace('放大','').replace('照片','')))}
function cityEntryCategories(id){const c=cities[id],activities=cityActivities(id);return [...new Set(['全部','景点','餐厅','酒店',...c.spots.map(s=>s.cat),...(activities.length?['特色活动',...activities.map(a=>a.type)]:[])])]}
function cityEntryMatches(category,type,filter){return filter==='全部'||category===filter||(filter==='景点'&&type!=='activity'&&!['餐厅','酒店','特色活动'].includes(category))||(filter==='特色活动'&&type==='activity')}
function filterCitySpots(cat){
  const entries=[...$('detail').querySelectorAll('.spots > .spot')];let count=0;
  entries.forEach(el=>{const visible=cityEntryMatches(el.dataset.entryCategory,el.dataset.entryType,cat);el.hidden=!visible;if(visible)count++});
  $('detail').querySelectorAll('[data-spot-cat]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.spotCat===cat)));
  $('citySpotCount').textContent='显示 '+count+' / '+entries.length+' 项';if($('cityUnlocated'))$('cityUnlocated').innerHTML=renderUnlocatedPlaces(selected,cat);
}
function enhanceCityDetail(){
  const c=cities[selected],head=$('detail').querySelector('.detail-head'),activities=cityActivities(c.id);
  const cats=cityEntryCategories(c.id);
  const total=c.spots.length+activities.length;
  head.insertAdjacentHTML('afterend','<div class="culture-city-filters" role="group" aria-label="地点类型筛选">'+cats.map(cat=>'<button type="button" data-spot-cat="'+safe(cat)+'" aria-pressed="'+(cat==='全部')+'">'+safe(cat)+'</button>').join('')+'</div><p id="citySpotCount" class="culture-kind" aria-live="polite">显示 '+total+' / '+total+' 项</p>');
  $('detail').querySelectorAll('[data-spot-cat]').forEach(b=>b.onclick=()=>filterCitySpots(b.dataset.spotCat));
  const stay=cultureStays.find(s=>s.city===c.id);
  if(stay)head.insertAdjacentHTML('beforeend','<p class="culture-extra"><strong>多留时间可这样安排</strong>'+safe(stay.nights)+'。'+safe(stay.halfday)+' <button type="button" class="culture-link" data-culture-city="'+c.id+'">查看本城文化清单 ↘</button></p>');
}
function showCultureCity(id){
  $('cultureCity').value=String(id);$('cultureCategory').value='全部';$('cultureScope').value='all';$('cultureSearch').value='';renderCulture();
  revealPageTarget($('cultureCatalogue')).scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});
}
function showCultureSpot(key){const m=key.match(/^c(\d+)-s(\d+)$/);if(!m)return;showTravelPage('cities',{scroll:false});region='全部';$('search').value='';select(Number(m[1])-1,false);const el=$('spot-'+key);revealPageTarget(el).scrollIntoView({behavior:'instant',block:'start'});el.tabIndex=-1;el.focus({preventScroll:true})}
function renderCulture(){
  const city=$('cultureCity').value,cat=$('cultureCategory').value,q=normalize($('cultureSearch').value.trim());
  const items=cities.flatMap(c=>c.spots.map((s,i)=>({c,s,i}))).filter(({c,s})=>s.culture&&($('cultureScope').value!=='new'||s.added==='2026-09-20')&&(city==='全部'||String(c.id)===city)&&(cat==='全部'||s.cat===cat)&&normalize(c.name+' '+s.n+' '+s.en+' '+s.d+' '+s.kind).includes(q));
  $('cultureCount').textContent='显示 '+items.length+' / '+cities.reduce((sum,c)=>sum+c.spots.filter(s=>s.culture).length,0)+' 处文化去处';
  $('cultureGrid').innerHTML=items.map(({c,s,i})=>{const key=spotKey(c,i),p=photos.find(p=>p.key===key);return '<article class="culture-card"><button class="photo-btn" type="button" data-photo="'+key+'" data-title="'+safe(s.n)+'" aria-label="放大'+safe(s.n)+'照片"><img src="'+p.path+'" alt="'+safe(s.n)+'实景参考" width="800" height="500" loading="lazy"></button><div class="culture-card-body"><span class="culture-tag">'+c.name+'</span>'+cultureTag(s)+'<h3>'+safe(s.n)+'</h3><div class="culture-kind">'+safe(s.en)+'<br>'+safe(s.kind)+'</div><p class="spot-intro">'+safe(s.d)+'</p><p class="visit-time">建议预留 · '+safe(s.duration)+'</p><details><summary>看点、预约与顺路组合</summary><dl class="spot-guide"><div><dt>重点看点</dt><dd>'+safe(s.highlights)+'</dd></div><div><dt>游览提示</dt><dd>'+safe(s.tip)+'</dd></div><div><dt>怎么顺路</dt><dd>'+safe(s.combo)+'</dd></div></dl><div class="spot-links"><a href="'+safe(s.source)+'" target="_blank" rel="noopener noreferrer">官方介绍 ↗</a>'+(s.visitSource?'<a href="'+safe(s.visitSource)+'" target="_blank" rel="noopener noreferrer">参观信息 ↗</a>':'')+'</div></details><button class="culture-link" type="button" data-culture-spot="'+key+'">查看此景点详情 ↗</button><p class="photo-meta"><a href="图片来源与授权.html#'+key+'" target="_blank" rel="noopener">照片署名与授权</a></p></div></article>'}).join('')||'<p class="culture-empty">没有符合条件的景点；可切换“全部”或清空搜索。</p>';
  bindPhotos($('cultureGrid'));
}
function renderPlanCulture(index){
  const ids=[...new Set(routeMaps[index].stops.map(s=>s.id))];
  const options=ids.map(id=>cities[id]).filter(c=>c.spots.some(s=>s.culture));
  const count=options.reduce((n,c)=>n+c.spots.filter(s=>s.culture&&s.priority!=='开放待复核').length,0);
  $('planContent').insertAdjacentHTML('beforeend','<div class="plan-culture"><strong>这条路线还能看什么？</strong><p>沿线共有 '+count+' 处文化去处可选，另列的闭馆备选未计入。点击城市查看艺术、考古、地方文化与风景；每半天通常选 1 处大馆，城外项目另加交通。</p>'+options.map(c=>'<button class="culture-link" type="button" data-culture-city="'+c.id+'">'+c.name+'的文化清单</button>').join('')+'<p class="culture-guide-note">如增加住宿，后续包车与航班日期需一起重排；本栏是加餐建议，上方原行程日期未据此延长。</p></div>');
}
function initCulture(){
  const ids=[...new Set(cities.filter(c=>c.spots.some(s=>s.culture)).map(c=>c.id))];
  $('cultureCity').innerHTML='<option value="全部">全部 '+ids.length+' 座城市</option>'+ids.map(id=>'<option value="'+id+'">'+cities[id].name+'</option>').join('');
  ['cultureCity','cultureCategory','cultureScope'].forEach(id=>$(id).addEventListener('change',renderCulture));$('cultureSearch').addEventListener('input',renderCulture);
  document.addEventListener('click',e=>{const b=e.target.closest('[data-culture-city],[data-culture-spot]');if(!b)return;if(b.dataset.cultureSpot)showCultureSpot(b.dataset.cultureSpot);else showCultureCity(b.dataset.cultureCity)});
  renderCulture();
}
initCulture();

let cityMap=null,cityMapLayers=[],cityMapPins=[],cityMapCity=0,cityMapSelected=-1,cityMapOrigin=null;
const cityMapNames={'c01-s06':'拉萨罗收藏馆','c01-s08':'提森博物馆','c01-s09':'索菲亚王后艺术中心','c01-s10':'索罗亚博物馆','c02-s06':'马雷斯博物馆','c02-s07':'加泰罗尼亚国立美术馆','c02-s08':'毕加索博物馆','c03-s05':'两水侯爵宫·陶瓷馆','c03-s06':'瓦伦西亚美术馆','c03-s07':'丝绸博物馆','c04-s02':'大教堂与吉拉达塔','c04-s05':'莱布里哈宫','c05-s05':'罗德里格斯艺术家宅邸','c05-s06':'洛尔迦故居','c05-s07':'格拉纳达美术馆','c06-s01':'清真寺大教堂','c06-s06':'胡里奥·罗梅罗博物馆','c15-s04':'加尔加略博物馆','c20-s03':'泰德国家公园','c21-s05':'国家罗马艺术博物馆'};
const regionalKeys=new Set(['c01-s03','c02-s02','c02-s04','c03-s01','c03-s04','c04-s04','c05-s01','c05-s02','c05-s03','c06-s03','c07-s04','c10-s01','c11-s01','c12-s03','c13-s02','c14-s01','c14-s02','c14-s03','c16-s02','c16-s03','c17-s02','c17-s03','c18-s02','c20-s02','c20-s03']);
function mapKey(id,i){return 'c'+String(id+1).padStart(2,'0')+'-s'+String(i+1).padStart(2,'0')}
function mapSpotType(s){if(s.placeType==='restaurant'||s.placeType==='hotel')return s.placeType;return s.priority==='开放待复核'?'warning':s.culture||/博物|美术|基金|音乐/.test(s.n)?'culture':''}
function mapSpotColor(s){if(s.placeType==='restaurant')return '#a74463';if(s.placeType==='hotel')return '#5964a8';return mapSpotType(s)==='warning'?'#9d7b28':mapSpotType(s)==='culture'?'#286c68':'#c46445'}
function addCityMapEntry(){const h=$('detail').querySelector('.detail-head');if(h&&!h.querySelector('[data-city-map]'))h.insertAdjacentHTML('beforeend','<div class="city-dialog-actions"><button type="button" class="city-map-open" data-city-map="'+selected+'" aria-haspopup="dialog" aria-controls="cityMapDialog" aria-label="打开'+safe(cities[selected].name)+'城市地图">⌖ 打开城市地图</button><button type="button" class="city-map-open city-intro-open" data-city-intro="'+selected+'" aria-haspopup="dialog" aria-controls="cityIntroDialog" aria-label="打开'+safe(cities[selected].name)+'城市介绍">打开城市介绍</button></div>');}
function fitCityMap(){const p=cityCoordinates.filter(p=>p.city===cityMapCity);cityMap.fitBounds(p.map(p=>[p.lat,p.lon]),{padding:[75,65],maxZoom:15,animate:false});layoutCityMapLabels();}
function openCityMap(id,spot=-1){
 id=Number(id);cityMapCity=id;cityMapSelected=Number(spot);const c=cities[id],dlg=$('cityMapDialog');
 if(!dlg.open){cityMapOrigin=document.activeElement;dlg.showModal();document.documentElement.classList.add('city-map-is-open')}
 $('cityMapTitle').textContent=c.name+' · 城市地图';$('cityMapCity').value=String(id);$('cityMapSubtitle').textContent=c.spots.length+' 处推荐地点 · 点击编号查看照片与介绍'+(id===19?' · 全岛景点，城镇之间需车程':'');
 if(!cityMap){cityMap=L.map('cityMapCanvas',{preferCanvas:true,zoomSnap:.25,zoomDelta:.5,maxZoom:20,minZoom:7,attributionControl:true}).setView([40.42,-3.70],14);cityMap.attributionControl.setPrefix(false);cityMap.attributionControl.addAttribution('© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap 贡献者</a> · ODbL');L.control.scale({imperial:false,position:'bottomleft'}).addTo(cityMap);cityMap.on('moveend zoomend resize',layoutCityMapLabels)}
 cityMapLayers.forEach(l=>cityMap.removeLayer(l));cityMapLayers=[];cityMapPins=[];cityMap.setMaxBounds(null);
 const streets=window.CITY_STREETS&&window.CITY_STREETS[id];
 if(streets){const layer=L.geoJSON(streets,{style:f=>{const p=f.properties,k=p.kind;if(k==='park')return{color:'#adc0a0',weight:.6,fillColor:'#c8d8b8',fillOpacity:.7};if(k==='water'||k==='river'||k==='coast')return{color:'#8dbabd',weight:k==='river'?3:1.2,fillColor:'#b2d3d3',fillOpacity:.85};if(k==='beach')return{color:'#d8c49b',weight:1,fillColor:'#e7d8b6',fillOpacity:.8};const major=/motorway|trunk|primary/.test(p.road);return{color:major?'#d7bb8d':p.road==='pedestrian'?'#ded4b6':'#fffef7',weight:major?3.4:p.road==='secondary'?2.8:1.9,opacity:1}},smoothFactor:1.2,interactive:false}).addTo(cityMap);cityMapLayers.push(layer);const b=streets.bounds;const allPoints=cityCoordinates.filter(p=>p.city===id);cityMap.setMaxBounds([[Math.min(b[0],...allPoints.map(p=>p.lat))-.02,Math.min(b[1],...allPoints.map(p=>p.lon))-.02],[Math.max(b[2],...allPoints.map(p=>p.lat))+.02,Math.max(b[3],...allPoints.map(p=>p.lon))+.02]]);$('cityMapDate').textContent='道路数据 '+streets.date.slice(0,10)+' · 仅含已保存范围';}
 else $('cityMapDate').textContent='道路数据暂未加载 · 景点坐标仍可查看';
 const ps=cityCoordinates.filter(p=>p.city===id);
 ps.forEach(p=>{const s=c.spots[p.index],color=mapSpotColor(s);const dot=L.circleMarker([p.lat,p.lon],{radius:4,color:'#fffdf5',weight:1.5,fillColor:color,fillOpacity:1,interactive:false}).addTo(cityMap);const line=L.polyline([],{color,weight:1,opacity:.65,interactive:false}).addTo(cityMap);const name=cityMapNames[p.key]||s.n.replace(/（.*?）/g,'');const width=Math.min(190,Math.max(76,name.length*(innerWidth<=700?11:12)+35));const icon=L.divIcon({className:'city-map-label '+mapSpotType(s),html:'<span class="label-box"><strong>'+String(p.index+1).padStart(2,'0')+'</strong><span>'+safe(name)+'</span></span>',iconSize:[width,32],iconAnchor:[0,16]});const marker=L.marker([p.lat,p.lon],{icon,title:s.n,keyboard:true,riseOnHover:true}).addTo(cityMap);marker.on('click',()=>selectCityMapSpot(p.index,true));marker.getElement().style.setProperty('--label-width',width+'px');marker.getElement().setAttribute('aria-label',(p.index+1)+' '+s.n);cityMapLayers.push(dot,line,marker);cityMapPins.push({p,s,dot,line,marker,width});});
 $('cityMapList').innerHTML=c.spots.map((s,i)=>'<li><button type="button" data-map-spot="'+i+'" aria-pressed="false"><b>'+String(i+1).padStart(2,'0')+'</b><span>'+safe(s.n)+'<small>'+safe(s.priority==='开放待复核'?'开放待复核':s.cat)+'</small></span></button></li>').join('');
 $('cityMapList').querySelectorAll('button').forEach(b=>b.onclick=()=>selectCityMapSpot(Number(b.dataset.mapSpot),true));
 $('cityMapResources').innerHTML='<h3>这座城市的中文资料</h3>'+resourceMini(id)+'<button type="button" class="culture-link" id="cityMapMore">到中文攻略与视频区 ↗</button>';
 $('cityMapMore').onclick=()=>{closeCityMap();$('resourceCity').value=chineseResources.some(r=>r.city===id)?String(id):'all';$('resourceType').value='all';renderChineseResources();revealPageTarget($('chineseResources')).scrollIntoView({behavior:'instant'})};
 dlg.querySelector('.city-map-sidebar').scrollTop=0;dlg.querySelector('.city-map-body').scrollTop=0;
 requestAnimationFrame(()=>{cityMap.invalidateSize();fitCityMap();selectCityMapSpot(spot>=0?spot:0,spot>=0);onlineCityMapOpened(id,spot)});
}
function layoutCityMapLabels(){
 if(!cityMap||!$('cityMapDialog').open||$('cityMapCanvas').hidden||!cityMapPins.length)return;
 const size=cityMap.getSize(),taken=[{x:0,y:0,w:54,h:92},{x:0,y:size.y-38,w:size.x,h:38}];
 const points=cityMapPins.map(o=>({...o,xy:cityMap.latLngToContainerPoint([o.p.lat,o.p.lon])}));
 const overlap=(a,b)=>a.x<b.x+b.w+3&&a.x+a.w+3>b.x&&a.y<b.y+b.h+3&&a.y+a.h+3>b.y;
 points.sort((a,b)=>a.xy.y-b.xy.y).forEach(o=>{
  const pt=o.xy;if(pt.x<-20||pt.y<-20||pt.x>size.x+20||pt.y>size.y+20){o.marker.getElement().style.display='none';o.line.setLatLngs([]);return}o.marker.getElement().style.display='';
  let best=null,bestCost=Infinity;
  for(let radius=12;radius<=190;radius+=24)for(let dir=0;dir<12;dir++){const angle=dir*Math.PI/6;let x=pt.x+Math.cos(angle)*radius+(Math.cos(angle)<-.1?-o.width:Math.abs(Math.cos(angle))<=.1?-o.width/2:0),y=pt.y+Math.sin(angle)*radius-16;x=Math.max(8,Math.min(size.x-o.width-8,x));y=Math.max(8,Math.min(size.y-65,y));const box={x,y,w:o.width,h:32};let cost=radius+Math.abs(y+16-pt.y)*.15+taken.filter(t=>overlap(box,t)).length*10000;points.forEach(q=>{if(q!==o&&q.xy.x>x-3&&q.xy.x<x+o.width+3&&q.xy.y>y-3&&q.xy.y<y+35)cost+=600});if(cost<bestCost){bestCost=cost;best=box}}
  taken.push(best);o.marker.setLatLng(cityMap.containerPointToLatLng([best.x,best.y+16]));const end=[Math.max(best.x,Math.min(best.x+best.w,pt.x)),Math.max(best.y+2,Math.min(best.y+30,pt.y))];o.line.setLatLngs([[o.p.lat,o.p.lon],cityMap.containerPointToLatLng(end)]);
 });
}
function selectCityMapSpot(index,focus){
 cityMapSelected=index;const c=cities[cityMapCity],s=c.spots[index],key=mapKey(c.id,index),p=cityCoordinates.find(p=>p.key===key),photo=photos.find(x=>x.key===key);if(!s||!p)return;
 cityMapPins.forEach(o=>{o.marker.getElement().classList.toggle('active',o.p.index===index);o.dot.setRadius(o.p.index===index?6:4);o.marker.setZIndexOffset(o.p.index===index?1000:0)});
 $('cityMapList').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.mapSpot)===index));
 const associated=chineseResources.filter(r=>r.city===c.id&&r.spots.includes(index));
 $('cityMapFocus').innerHTML=(photo?'<img src="'+safe(photo.path)+'" alt="'+safe(s.n+' · '+(photo.caption||'实景参考'))+'">':'')+'<h3>'+String(index+1).padStart(2,'0')+' · '+safe(s.n)+'</h3>'+(photo?'<p class="place-photo-caption">'+safe(photo.caption||'实景参考')+'</p>':'')+'<p class="sub">'+safe(s.en||s.q)+' · '+(regionalKeys.has(key)?'区域参考点':'建筑／地点参考位置')+'</p>'+cultureTag(s)+'<p>'+safe(s.d)+'</p><p><strong>'+safe(s.placeType==='hotel'?'住宿安排':s.placeType==='restaurant'?'用餐预留':'建议预留')+'</strong> '+safe(s.duration)+'</p><details><summary>详情、实用提示与顺路建议</summary><p>'+safe(s.highlights)+'</p><p>'+safe(s.tip)+'</p>'+(s.combo?'<p>'+safe(s.combo)+'</p>':'')+'</details>'+(s.address?'<p class="place-address"><strong>地址</strong> '+safe(s.address)+'</p>':'')+renderHotelPrice(s)+renderTravelNotes(s)+'<div class="spot-links"><a href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(s.q+' '+c.en+' '+(c.country||'Spain'))+'" target="_blank" rel="noopener noreferrer">在线地图／导航 ↗</a><a href="'+safe(s.source)+'" target="_blank" rel="noopener noreferrer">地点资料 ↗</a></div><p class="sub">坐标为旅行规划参考，不代表售票口或唯一入口。<a href="'+safe(p.source)+'" target="_blank" rel="noopener noreferrer">位置来源</a>'+(photo?' · <a href="图片来源与授权.html#'+key+'" target="_blank" rel="noopener">照片署名</a>':'')+'</p>'+(associated.length?'<div class="city-map-resources"><h3>相关中文攻略与视频</h3>'+associated.map(r=>'<a href="'+safe(r.local?'assets/guides/'+r.local:r.url)+'" target="_blank" rel="noopener noreferrer">'+safe(r.type)+' · '+safe(r.title)+' ↗</a>').join('')+'</div>':'');
 $('cityMapFocus').insertAdjacentHTML('afterbegin','<button type="button" class="culture-link" id="cityMapBack">↑ 回到城市地图</button>');$('cityMapBack').onclick=()=>{if(innerWidth<=700)$('cityMapDialog').querySelector('.city-map-body').scrollTop=0;else $('cityMapDialog').querySelector('.city-map-sidebar').scrollTop=0;$('cityMapCanvas').focus({preventScroll:true})};
 if(focus){const pt=cityMap.latLngToContainerPoint([p.lat,p.lon]),z=cityMap.getSize();if(pt.x<25||pt.y<25||pt.x>z.x-25||pt.y>z.y-25){cityMap.panTo([p.lat,p.lon],{animate:false});layoutCityMapLabels()};$('cityMapFocus').scrollIntoView({block:innerWidth>700?'nearest':'start',behavior:'instant'});}
}
function closeCityMap(){$('cityMapDialog').close()}
function resourceMini(id){const rows=chineseResources.filter(r=>r.city===id);return rows.length?rows.map(r=>'<a href="'+safe(r.local?'assets/guides/'+r.local:r.url)+'" target="_blank" rel="noopener noreferrer">'+safe(r.type)+' · '+safe(r.title)+' ↗</a>').join(''):'<small>这座城市暂未精选单独的中文资料，可先查看景点官网，或到下方资料区阅读跨城中文博物馆手册。</small>'}
function renderChineseResources(){const city=$('resourceCity').value,type=$('resourceType').value,rs=chineseResources.filter(r=>(city==='all'||r.city===Number(city))&&(type==='all'||r.type===type));$('resourceCount').textContent=rs.length+' / '+chineseResources.length+' 份资料';$('resourcesGrid').innerHTML=rs.map(r=>'<article class="resource-card"><span class="r-tag '+(r.type==='视频'?'video':'')+'">'+(r.city<0?'跨城阅读':cities[r.city].name)+' · '+r.type+(r.local?' · 已存本地':'')+'</span><h3>'+safe(r.title)+'</h3><div class="r-meta">'+safe(r.author)+'<br>'+safe(r.date)+'</div><p>'+safe(r.note)+'</p><div class="r-links"><a href="'+safe(r.url)+'" target="_blank" rel="noopener noreferrer">'+(r.type==='视频'?'打开视频页面':'查看原文')+' ↗</a>'+(r.local?'<a href="assets/guides/'+r.local+'" target="_blank" rel="noopener">本地中文 PDF ↗</a>':'')+'</div>'+(r.city>=0?'<div class="r-spots"><button type="button" data-city-map="'+r.city+'">在'+cities[r.city].name+'地图上查看</button>'+r.spots.map(i=>'<button type="button" data-city-map="'+r.city+'" data-city-map-spot="'+i+'">'+safe(cities[r.city].spots[i].n)+' ↗</button>').join('')+'</div>':'')+'</article>').join('')||'<p>这个筛选下没有资料，试试切换“全部类型”。</p>';}
function initCityMaps(){
 cities.forEach(c=>{const p=$('pin-'+c.id);p.onclick=()=>{select(c.id,true)};p.setAttribute('aria-label',c.name+'：查看城市景点介绍')});
 $('cityMapCity').innerHTML=cities.map(c=>'<option value="'+c.id+'">'+c.name+'</option>').join('');$('cityMapCity').onchange=e=>openCityMap(Number(e.target.value));$('cityMapFit').onclick=fitCityMap;$('cityMapClose').onclick=closeCityMap;$('cityMapDialog').addEventListener('close',()=>{document.documentElement.classList.remove('city-map-is-open');if(cityMapOrigin&&cityMapOrigin.isConnected)cityMapOrigin.focus({preventScroll:true})});
 document.addEventListener('click',e=>{const b=e.target.closest('[data-city-map]');if(b){e.preventDefault();openCityMap(Number(b.dataset.cityMap),b.dataset.cityMapSpot===undefined?-1:Number(b.dataset.cityMapSpot))}});
 $('resourceCity').innerHTML='<option value="all">全部城市</option>'+[...new Set(chineseResources.map(r=>r.city))].map(id=>'<option value="'+id+'">'+(id<0?'跨城阅读':cities[id].name)+'</option>').join('');['resourceCity','resourceType'].forEach(id=>$(id).addEventListener('change',renderChineseResources));renderChineseResources();addCityMapEntry();
}
initCityMaps();

let currentAlbum=null,albumIndex=0,albumReturnFocus=null,albumTouchX=null;
function albumFor(key){return photoGalleries[key]||[photos.find(p=>p.key===key)].filter(Boolean)}
function albumName(key){const m=key.match(/^c(\d+)-s(\d+)/);return m?cities[Number(m[1])-1].spots[Number(m[2])-1].n:(travelScreenshotBundle.albums.find(a=>a.key===key)?.title||'旅行截图')}
function openPhoto(key,title,index=0){
 const album=albumFor(key);if(!album.length)return;currentAlbum=key;albumIndex=Math.max(0,Math.min(Number(index)||0,album.length-1));
 $('photoTitle').textContent=albumName(key)||title;if(!$('photoDialog').open){albumReturnFocus=document.activeElement;$('photoDialog').showModal()}
 renderAlbum();
}
function renderAlbum(){
 const album=albumFor(currentAlbum),p=album[albumIndex],name=albumName(currentAlbum),restoreThumb=$('albumThumbs').contains(document.activeElement);
 $('largePhoto').src=p.path;$('largePhoto').alt=(p.caption||name)+' · 第 '+(albumIndex+1)+' 张';
 $('albumPosition').textContent=(albumIndex+1)+' / '+album.length;$('albumCaption').textContent=p.caption||name+' · 实景参考';
 $('photoCredit').innerHTML=p.kind==='video-screenshot'
  ? safe(p.artist)+' · '+safe(p.license)+' · <a href="'+safe(p.source)+'" target="_blank" rel="noopener noreferrer">查看原始截图 ↗</a> · <a href="图片来源与授权.html#screenshots-'+safe(currentAlbum)+'" target="_blank" rel="noopener">截图来源说明</a>'
  : safe(p.artist||'作者详见来源页')+' · '+safe(p.license)+' · <a href="'+safe(p.source)+'" target="_blank" rel="noopener noreferrer">原图来源 ↗</a> · <a href="图片来源与授权.html#'+safe(p.attributionAnchor||'album-'+currentAlbum)+'" target="_blank" rel="noopener">本景点全部照片署名</a>';
 $('albumThumbs').innerHTML=album.map((f,i)=>'<button type="button" data-album-index="'+i+'" aria-label="第 '+(i+1)+' 张：'+safe(f.caption||name)+'" aria-pressed="'+(i===albumIndex)+'"><img src="'+safe(f.path)+'" alt="" loading="lazy"></button>').join('');
 $('albumThumbs').querySelectorAll('button').forEach(b=>b.onclick=()=>{albumIndex=Number(b.dataset.albumIndex);renderAlbum()});
 const active=$('albumThumbs').children[albumIndex];if(active){const strip=$('albumThumbs');if(active.offsetLeft<strip.scrollLeft||active.offsetLeft+active.offsetWidth>strip.scrollLeft+strip.clientWidth)strip.scrollLeft=active.offsetLeft-strip.clientWidth/2+active.offsetWidth/2;}
 if(restoreThumb&&active)active.focus({preventScroll:true});
 $('albumPrev').disabled=$('albumNext').disabled=album.length<2;
 // Fetch only the next local image into the browser cache, without preloading all albums.
 if(album.length>1){const preload=new Image();preload.src=album[(albumIndex+1)%album.length].path;}
}
function stepAlbum(delta){const album=albumFor(currentAlbum);if(album.length){albumIndex=(albumIndex+delta+album.length)%album.length;renderAlbum()}}
function galleryStrip(key){const album=albumFor(key),title=albumName(key);return '<div class="gallery-strip" aria-label="'+safe(title)+'相册缩略图">'+album.map((p,i)=>'<button type="button" data-gallery-key="'+key+'" data-gallery-index="'+i+'" aria-label="查看'+safe(title)+'第 '+(i+1)+' 张照片"><img src="'+safe(p.path)+'" alt="'+safe(p.caption||title+'实景')+'" loading="lazy" width="120" height="80"></button>').join('')+'</div>';}
function enhanceGalleries(root=document){
 root.querySelectorAll('.photo-btn[data-photo]:not([data-gallery-ready])').forEach(b=>{const key=b.dataset.photo,album=albumFor(key);if(!album.length)return;b.dataset.galleryReady='true';b.classList.add('gallery-hero');b.setAttribute('aria-label','打开'+albumName(key)+'相册，共 '+album.length+' 张照片');b.insertAdjacentHTML('beforeend','<span class="gallery-badge">▧ '+album.length+' 张图片 · 查看相册</span>');b.insertAdjacentHTML('afterend',galleryStrip(key));});
 const focus=$('cityMapFocus');if(focus&&!focus.querySelector('.gallery-strip')){const img=focus.querySelector(':scope > img');if(img){const key=mapKey(cityMapCity,cityMapSelected),album=albumFor(key);if(!album.length)return;const b=document.createElement('button');b.type='button';b.className='gallery-hero city-map-gallery';b.dataset.galleryKey=key;b.dataset.galleryIndex='0';b.setAttribute('aria-label','打开'+albumName(key)+'相册，共 '+album.length+' 张照片');img.replaceWith(b);b.append(img);b.insertAdjacentHTML('beforeend','<span class="gallery-badge">▧ '+album.length+' 张图片 · 查看相册</span>');b.insertAdjacentHTML('afterend',galleryStrip(key));}}
}
function initGalleries(){
 $('albumPrev').onclick=()=>stepAlbum(-1);$('albumNext').onclick=()=>stepAlbum(1);
 $('photoDialog').addEventListener('keydown',e=>{if(!e.target.matches('input[type=range]')&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){e.preventDefault();stepAlbum(e.key==='ArrowLeft'?-1:1)}});
 $('largePhoto').addEventListener('touchstart',e=>{albumTouchX=e.touches.length===1&&Number($('largePhoto').dataset.zoom||1)<=1?e.touches[0].clientX:null},{passive:true});
 $('largePhoto').addEventListener('touchend',e=>{if(albumTouchX!==null&&e.changedTouches.length){const dx=e.changedTouches[0].clientX-albumTouchX;if(Math.abs(dx)>50)stepAlbum(dx<0?1:-1)}albumTouchX=null},{passive:true});
 $('photoDialog').addEventListener('close',()=>{if(albumReturnFocus&&albumReturnFocus.isConnected)albumReturnFocus.focus({preventScroll:true})});
 document.addEventListener('click',e=>{const b=e.target.closest('[data-gallery-key]');if(b){e.preventDefault();openPhoto(b.dataset.galleryKey,albumName(b.dataset.galleryKey),Number(b.dataset.galleryIndex||0))}});
 const observer=new MutationObserver(records=>{if(records.some(r=>r.type==='childList'&&r.addedNodes.length))enhanceGalleries()});
 ['detail','cultureGrid','cityMapFocus'].forEach(id=>observer.observe($(id),{childList:true,subtree:true}));enhanceGalleries();
}
initGalleries();

let driveRequest=0,driveAbort=null;
const driveIndex=new Map(drivingData.cities.map((c,i)=>[c.id,i]));
const tenerifeDriveIndex=new Map(tenerifeDrivingData.points.map((p,i)=>[p.id,i]));
function islandDriveKey(id){return String(id)==='19'?'tf:santa-cruz':String(id)}
function isIslandDrive(id){return tenerifeDriveIndex.has(islandDriveKey(id))}
function drivePoint(id){return isIslandDrive(id)?tenerifeDrivingData.points[tenerifeDriveIndex.get(islandDriveKey(id))]:cities[Number(id)]}
function driveEntry(from,to){
 const island=isIslandDrive(from)||isIslandDrive(to);
 if(island&&!(isIslandDrive(from)&&isIslandDrive(to)))return null;
 const data=island?tenerifeDrivingData:drivingData,a=island?tenerifeDriveIndex.get(islandDriveKey(from)):driveIndex.get(Number(from)),b=island?tenerifeDriveIndex.get(islandDriveKey(to)):driveIndex.get(Number(to));
 if(a===undefined||b===undefined)return null;
 const seconds=data.durations[a][b],meters=data.distances[a][b];return Number.isFinite(seconds)&&Number.isFinite(meters)?{seconds,meters,checked:data.checked,island}:null;
}
function driveTime(seconds){const m=Math.max(0,Math.round(seconds/300)*5),h=Math.floor(m/60),r=m%60;return(h?h+' 小时':'')+(r?(h?' ':'')+r+' 分钟':h?'':'0 分钟')}
function driveKm(meters){return Math.round(meters/1000).toLocaleString('zh-CN')+' 公里'}
function googleSearch(query){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(query)}
function driveGoogleUrl(from,to){const a=drivePoint(from),b=drivePoint(to);return 'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(a.lat+','+a.lon)+'&destination='+encodeURIComponent(b.lat+','+b.lon)+'&travelmode=driving'}
function renderDriveMetric(from,to,entry,note){const a=drivePoint(from),b=drivePoint(to);$('driveResult').innerHTML='<div class="drive-pair"><h3>'+safe(a.name)+' → '+safe(b.name)+'</h3><p>'+safe(note)+'</p></div>'+(entry?'<div class="drive-metric"><strong>'+driveTime(entry.seconds)+'</strong><span>道路行驶估算 · 无实时路况</span></div><div class="drive-metric"><strong>'+driveKm(entry.meters)+'</strong><span>'+(entry.island?'岛内指定参考点之间':'市中心参考点之间')+'</span></div>':'');}
function renderDriveOthers(from){
 const island=isIslandDrive(from),origin=drivePoint(from),destinations=island?tenerifeDrivingData.points.map(p=>({...p,id:p.id==='tf:santa-cruz'?19:p.id})):cities;
 $('driveOthersTitle').textContent='从'+origin.name+'出发，比较'+(island?'岛内地点':'其他目的地')+'（按车程排序）';
 const rows=destinations.filter(c=>islandDriveKey(c.id)!==islandDriveKey(from)).map(c=>({c,d:driveEntry(from,c.id)})).sort((a,b)=>(a.d?a.d.seconds:Infinity)-(b.d?b.d.seconds:Infinity));
 $('driveOthers').innerHTML=rows.map(({c,d})=>'<tr><td>'+safe(c.name)+'</td><td>'+(d?driveKm(d.meters):'跨海')+'</td><td>'+(d?driveTime(d.seconds):'需飞机或轮渡衔接')+'</td><td><button type="button" data-drive-pair="'+from+','+c.id+'">查询此路段</button></td></tr>').join('');
}
function driveSavedNote(entry){return '已保存的'+(entry.island?'特内里费岛内':'城际')+'道路估算 · '+entry.checked.slice(0,10)}
function driveRouteNote(from,to){return isIslandDrive(from)&&isIslandDrive(to)?[drivePoint(from).note,drivePoint(to).note,'山路、进出停车场和旺季拥堵另留余量；不含缆车、候车、游览或实时路况。'].filter(Boolean).join('；'):'点击“联网更新”只重新估算当前路段；拥堵与出发时刻请到谷歌核对。'}
function renderDrivePair(){
 driveRequest++;if(driveAbort){driveAbort.abort();driveAbort=null}
 const from=$('driveFrom').value,to=$('driveTo').value,d=driveEntry(from,to),same=islandDriveKey(from)===islandDriveKey(to),usable=!!d&&!same;
 renderDriveMetric(from,to,usable?d:null,same?'起点与终点相同，请选择另一个地点。':d?driveSavedNote(d):'此段需要飞机／轮渡衔接，不按连续驾车时间估算。');
 $('driveRefresh').disabled=!usable;$('driveRefresh').textContent='联网更新道路估算';$('driveGoogle').hidden=!usable;$('driveGoogle').href=driveGoogleUrl(from,to);
 $('driveStatus').textContent=usable?driveRouteNote(from,to):same?'可选择岛内景点、机场或另一座城市。':'跨海航班／轮渡的航程、候船及接驳需另查；抵达特内里费后可在同一查询中选择岛内地点。';renderDriveOthers(from);
}
async function refreshDrive(){
 const from=$('driveFrom').value,to=$('driveTo').value,saved=driveEntry(from,to);if(islandDriveKey(from)===islandDriveKey(to)||!saved)return;
 const token=++driveRequest,controller=new AbortController();driveAbort=controller;const a=drivePoint(from),b=drivePoint(to);
 $('driveRefresh').disabled=true;$('driveRefresh').textContent='正在查询…';$('driveStatus').textContent='正在联网获取这段道路的最新估算（仍不含实时交通）…';
 const timer=setTimeout(()=>controller.abort(),18000);
 try{const response=await fetch('https://router.project-osrm.org/route/v1/driving/'+a.lon+','+a.lat+';'+b.lon+','+b.lat+'?overview=false&steps=false',{signal:controller.signal});if(!response.ok)throw Error('network');const result=await response.json(),r=result.routes&&result.routes[0];if(result.code!=='Ok'||!r||!Number.isFinite(r.duration)||!Number.isFinite(r.distance))throw Error('route');if(token!==driveRequest)return;renderDriveMetric(from,to,{seconds:r.duration,meters:r.distance,island:saved.island},'本次联网估算 · '+new Date().toLocaleString('zh-CN',{hour12:false}));$('driveStatus').textContent='已更新当前路段，其他组合和路线统计继续使用已保存数据。'+driveRouteNote(from,to);}
 catch(e){if(token!==driveRequest)return;renderDriveMetric(from,to,saved,driveSavedNote(saved));$('driveStatus').textContent='联网查询暂不可用，已保留本地车程。可在谷歌核对实际路线。'+driveRouteNote(from,to);}
 finally{clearTimeout(timer);if(token===driveRequest){driveAbort=null;$('driveRefresh').disabled=false;$('driveRefresh').textContent='联网更新道路估算';}}
}
function chooseDrivePair(from,to,scroll=true){$('driveFrom').value=String(from);$('driveTo').value=String(to);$('driveAdvanced').open=true;renderDrivePair();if(scroll)revealPageTarget($('driving')).scrollIntoView({behavior:'instant',block:'start'})}
function renderTenerifeDriveRoutes(){
 const routes=[{name:'东北部 · 古城与云雾林',ids:['19','tf:laguna','tf:anaga','19'],note:'拉古纳步行参观与阿纳加短步道留一整天；道路终点为 Cruz del Carmen。'},
 {name:'北岸 · 庭园与旧港镇',ids:['tf:puerto-cruz','tf:orotava','tf:icod','tf:garachico','tf:puerto-cruz'],note:'从克鲁斯港出发，按兴趣删减一站；游览、午餐和停车另外计时。'},
 {name:'中部 · 泰德火山一日',ids:['tf:adeje','tf:teide','tf:adeje'],note:'往返道路估算到缆车下站；缆车、登顶、日落观星需另外安排与预约。'},
 {name:'西部 · 山村接驳与悬崖',ids:['tf:adeje','tf:santiago','tf:gigantes','tf:adeje'],note:'这里计算道路部分；若下马斯卡峡谷，355 公交、徒步、船与返程接驳单列，不套用普通环线时长。'}];
 $('tenerifeDriveRoutes').innerHTML=routes.map(route=>{const legs=route.ids.slice(1).map((to,i)=>({from:route.ids[i],to,data:driveEntry(route.ids[i],to)}));return '<article class="drive-route-card"><h4>'+route.name+'</h4><div class="drive-route-total"><span>'+driveTime(legs.reduce((n,l)=>n+l.data.seconds,0))+'</span><span>'+driveKm(legs.reduce((n,l)=>n+l.data.meters,0))+'</span></div><p class="online-note">仅道路行驶合计 · 不含游览</p><div class="drive-table-wrap"><table class="drive-table"><thead><tr><th>路段</th><th>车程</th><th>里程</th></tr></thead><tbody>'+legs.map(l=>'<tr><td><button type="button" data-drive-pair="'+l.from+','+l.to+'">'+safe(drivePoint(l.from).name)+' → '+safe(drivePoint(l.to).name)+'</button></td><td>'+driveTime(l.data.seconds)+'</td><td>'+driveKm(l.data.meters)+'</td></tr>').join('')+'</tbody></table></div><p class="drive-route-warning">'+route.note+'</p></article>'}).join('');
}
function drivingLegs(index){const optional=$('driveToledo').checked;return routeMaps[index].legs.filter(l=>l.mode==='car'&&(!l.optional||optional)&&(!l.omitWhenOptional||!optional));}
function renderDrivingRoutes(){$('driveRoutes').innerHTML=[4,3].map(index=>{const legs=drivingLegs(index);let seconds=0,meters=0;legs.forEach(l=>{const d=driveEntry(l.from,l.to);seconds+=d.seconds;meters+=d.meters});const title=index===4?'图中路线 · 内陆 17 天':'东海岸路线 · 15 天'+($('driveToledo').checked?' / 加游托莱多':'');let warn=index===4?'格拉纳达 → 托莱多约 '+driveTime(driveEntry(4,8).seconds)+'，建议当天以转场为主，托莱多深游放次日上午。马德里中段与末段分别计算。':'格拉纳达经龙达到塞维利亚，两段合计约 '+driveTime(driveEntry(4,7).seconds+driveEntry(7,3).seconds)+'，还要加龙达游览、午餐和停车；当天不建议再加酒庄。';if(index===3&&$('driveToledo').checked)warn+=' 科尔多瓦经托莱多到马德里合计约 '+driveTime(driveEntry(5,8).seconds+driveEntry(8,0).seconds)+'，托莱多游览另计。';return '<article class="drive-route-card"><h4>'+title+'</h4><div class="drive-route-total"><span>'+driveTime(seconds)+'</span><span>'+driveKm(meters)+'</span></div><p class="online-note">'+legs.length+' 段跨城驾车 · 保存的估算合计</p><button type="button" data-drive-route="'+index+'">在西班牙地图上看这条路线 ↑</button><div class="drive-table-wrap"><table class="drive-table"><thead><tr><th>原计划日期 / 路段</th><th>里程</th><th>车程</th><th>联网</th></tr></thead><tbody>'+legs.map(l=>{const d=driveEntry(l.from,l.to);return '<tr><td><button type="button" data-drive-pair="'+l.from+','+l.to+'">'+'<span class="drive-city">'+cities[l.from].name+'</span> → <span class="drive-city">'+cities[l.to].name+'</span>'+'</button><small>'+l.date+'</small></td><td>'+driveKm(d.meters)+'</td><td>'+driveTime(d.seconds)+'</td><td><a href="'+safe(driveGoogleUrl(l.from,l.to))+'" target="_blank" rel="noopener noreferrer">谷歌 ↗</a></td></tr>'}).join('')+'</tbody></table></div><p class="drive-route-warning">'+warn+'</p></article>'}).join('');}
function renderActivities(){const city=$('activityCity').value,type=$('activityType').value,rows=localActivities.filter(a=>($('activityScope').value!=='new'||a.added==='2026-09-20')&&(city==='all'||a.city===Number(city))&&(type==='all'||a.type===type));$('activityCount').textContent=rows.length+' / '+localActivities.length+' 项体验';$('activityGrid').innerHTML=rows.map(a=>'<article class="activity-card" id="activity-'+a.id+'"><span class="activity-tag">'+cities[a.city].name+' · '+a.type+'</span><h3>'+safe(a.title)+'</h3><span class="activity-venue">'+safe(a.venue)+'</span><p class="activity-season">'+safe(a.season)+'</p><p>'+safe(a.description)+'</p><div class="activity-duration"><strong>预留时间</strong> · '+safe(a.duration)+'</div><details><summary>场次、预约与位置</summary><p>'+safe(a.schedule)+'</p><p>'+safe(a.address)+'</p></details><p class="activity-fit"><strong>怎么顺路：</strong>'+safe(a.fit)+'</p><div class="activity-links"><button type="button" data-activity-map="'+a.id+'">在谷歌城市地图中查看</button><a href="'+safe(a.url)+'" target="_blank" rel="noopener noreferrer">官方资料／预约 ↗</a></div></article>').join('')||'<p class="activity-empty">这个组合暂无活动，可切换“全部活动”。</p>';}
function showCityActivities(id,activityId){$('activityCity').value=String(id);$('activityType').value='all';$('activityScope').value='all';renderActivities();revealPageTarget(activityId?$('activity-'+activityId):$('localActivities')).scrollIntoView({behavior:'instant',block:'start'})}
function focusCitySidebarActivities(){
  const panel=$('detail'),filters=panel.querySelector('.culture-city-filters'),button=panel.querySelector('[data-spot-cat="特色活动"]');
  if(!button)return;
  filterCitySpots('特色活动');
  if(activeTravelPage==='map')panel.scrollTop+=filters.getBoundingClientRect().top-panel.getBoundingClientRect().top-12;
  else filters.scrollIntoView({behavior:'instant',block:'start'});
  button.focus({preventScroll:true});
}

function addCityExtras(){const h=$('detail').querySelector('.detail-head');if(!h)return;if(Number(selected)===19&&!h.querySelector('.tenerife-city-guide'))h.insertAdjacentHTML('beforeend','<p class="culture-extra tenerife-city-guide"><strong>按全岛安排 4–6 天</strong>北部古城与云雾林、中央火山、西部悬崖和南部海岸分区游览。<a href="#tenerife">查看住宿与分区组合 →</a></p>');const list=localActivities.filter(a=>a.city===Number(selected));if(!h.querySelector('.city-extra-links'))h.insertAdjacentHTML('beforeend','<div class="city-extra-links"><button type="button" data-drive-from="'+selected+'">从这里出发的车程</button>'+(list.length?'<button type="button" data-city-activities>'+list.length+' 项当地特色活动 ↓</button>':'')+'</div>');}
let onlineMapMode='local',onlineMapQuery='',onlineMapLabel='',onlineMapZoom=14,onlineOpening=false,pendingActivity=null;
function onlineCityQuery(){return cities[cityMapCity].en+' '+(cities[cityMapCity].country||'Spain')}
function setOnlinePlace(query,label,zoom=16,force=false){onlineMapQuery=query;onlineMapLabel=label;onlineMapZoom=zoom;updateGoogleMap(force);}
function updateGoogleMap(force=false){const c=cities[cityMapCity];$('googlePlaceTitle').textContent=onlineMapLabel||c.name+'全城';$('googleFullMap').href=googleSearch(onlineMapQuery||onlineCityQuery());$('googleRestaurants').href=googleSearch('restaurants near '+(onlineMapQuery||onlineCityQuery()));$('googleCafes').href=googleSearch('cafes near '+(onlineMapQuery||onlineCityQuery()));if(onlineMapMode!=='google'||!$('cityMapDialog').open)return;const frame=$('cityGoogleFrame'),url='https://www.google.com/maps?q='+encodeURIComponent(onlineMapQuery||onlineCityQuery())+'&hl=zh-CN&z='+onlineMapZoom+'&output=embed';if(force||frame.getAttribute('src')!==url)frame.src=url;frame.title='谷歌在线地图：'+(onlineMapLabel||c.name)+'及周边地点';}
function setOnlineMode(mode){onlineMapMode=mode;const online=mode==='google';$('cityMapDialog').classList.toggle('google-mode',online);$('cityMapCanvas').hidden=online;document.querySelector('.city-map-foot').hidden=online;$('cityGooglePane').hidden=!online;$('googleOptions').hidden=!online;$('googleMapSearch').hidden=!online;$('localMapMode').setAttribute('aria-pressed',String(!online));$('googleMapMode').setAttribute('aria-pressed',String(online));$('cityMapFit').textContent=online?'查看全城':'显示全部景点';$('cityOnlineHint').textContent=online?'拖动、缩放查看谷歌提供的周边地点；点击景点清单可切换定位。本页一次定位一处，全部推荐编号请切回本地景点图。':'本地可定位推荐景点；城外新增地点可能超出已保存街道范围。切到谷歌可查看周边道路与地点。';if(online)updateGoogleMap();else if(cityMap)requestAnimationFrame(()=>{cityMap.invalidateSize();fitCityMap()})}
function syncOnlineSpot(index){if(onlineOpening)return;const c=cities[cityMapCity],s=c.spots[index];if(s)setOnlinePlace((s.q||s.en||s.n)+' '+c.en+' '+(c.country||'Spain'),s.n,16)}
function onlineCityMapOpened(id,spot){onlineOpening=false;if(id!==cityMapCity)return;const list=cityActivities(id);$('cityMapActivities').innerHTML='<h3>当地特色活动</h3>'+(list.length?list.map(a=>'<button type="button" data-activity-map="'+a.id+'">'+safe(a.title)+'<small>谷歌位置 · '+safe(a.venue)+'</small></button>').join('')+'<button type="button" data-activities-from-map="'+id+'">查看这些活动的完整介绍 ↗</button>':'<p class="online-note">这座城市暂未增补活动；可先探索上方推荐景点。</p>');$('googleMapTerm').value='';if(pendingActivity){const a=pendingActivity;pendingActivity=null;if(window.TravelGoogleMap){onlineMapMode='interactive';window.TravelGoogleMap.opened(id,spot,a.query)}else{setOnlinePlace(a.query,a.title,16);setOnlineMode('google')}}else if(onlineMapMode==='interactive'&&window.TravelGoogleMap){window.TravelGoogleMap.opened(id,spot)}else{if(spot>=0)syncOnlineSpot(spot);else setOnlinePlace(onlineCityQuery(),cities[id].name+'全城',id===19?13:14);setOnlineMode(onlineMapMode)}}
function initOnlineTravel(){
 const options='<optgroup label="西班牙与葡萄牙目的地">'+cities.map(c=>'<option value="'+c.id+'">'+c.name+(c.id===19?'（圣克鲁斯起点）':'')+'</option>').join('')+'</optgroup><optgroup label="特内里费岛内 · 机场与景点">'+tenerifeDrivingData.points.filter(p=>p.id!=='tf:santa-cruz').map(p=>'<option value="'+p.id+'">'+safe(p.name)+'</option>').join('')+'</optgroup>';$('driveFrom').innerHTML=options;$('driveTo').innerHTML=options;$('driveFrom').value='1';$('driveTo').value='14';$('driveFrom').onchange=renderDrivePair;$('driveTo').onchange=renderDrivePair;$('driveSwap').onclick=()=>chooseDrivePair($('driveTo').value,$('driveFrom').value,false);$('driveRefresh').onclick=refreshDrive;$('driveToledo').onchange=renderDrivingRoutes;renderDrivePair();renderDrivingRoutes();renderTenerifeDriveRoutes();
 $('activityCity').innerHTML='<option value="all">全部城市</option>'+[...new Set(localActivities.map(a=>a.city))].map(id=>'<option value="'+id+'">'+cities[id].name+'</option>').join('');document.addEventListener('click',e=>{if(e.target.closest('[data-city-activities]'))focusCitySidebarActivities()});$('activityCity').onchange=renderActivities;$('activityType').onchange=renderActivities;$('activityScope').onchange=renderActivities;renderActivities();
 document.querySelector('.city-map-main').insertAdjacentHTML('afterbegin','<div class="city-online-bar"><div class="city-online-tabs" role="group" aria-label="城市地图类型"><button type="button" id="localMapMode" aria-pressed="true">本地景点图</button><button type="button" id="googleMapMode" aria-pressed="false">谷歌在线地图</button></div><p class="city-online-hint" id="cityOnlineHint">本地可定位推荐景点；城外新增地点可能超出已保存街道范围。切到谷歌可查看周边道路与地点。</p><div class="city-online-options" id="googleOptions" hidden><strong id="googlePlaceTitle"></strong><a id="googleFullMap" target="_blank" rel="noopener noreferrer">打开完整版 ↗</a><a id="googleRestaurants" target="_blank" rel="noopener noreferrer">附近餐厅 ↗</a><a id="googleCafes" target="_blank" rel="noopener noreferrer">附近咖啡 ↗</a></div><form class="city-online-search" id="googleMapSearch" hidden><input id="googleMapTerm" placeholder="在当前城市查找：咖啡馆、商店或地点" aria-label="在谷歌地图搜索当前城市的地点" maxlength="180"><button type="submit">查找</button></form></div>');
 $('cityMapCanvas').insertAdjacentHTML('afterend','<div class="city-google-pane" id="cityGooglePane" hidden><iframe id="cityGoogleFrame" title="谷歌在线城市地图" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe><p class="city-online-status">在线地图需当前网络能访问 Google；若空白，可打开完整版或切回本地图。周边地点和营业信息由 Google 提供。</p></div>');
 $('cityMapResources').insertAdjacentHTML('beforebegin','<div class="city-activity-mini" id="cityMapActivities"></div>');
 $('localMapMode').onclick=()=>setOnlineMode('local');$('googleMapMode').onclick=()=>setOnlineMode('google');$('cityMapFit').onclick=()=>{if(onlineMapMode==='google'){$('googleMapTerm').value='';setOnlinePlace(onlineCityQuery(),cities[cityMapCity].name+'全城',14)}else fitCityMap()};
 $('googleMapSearch').onsubmit=e=>{e.preventDefault();const term=$('googleMapTerm').value.trim();setOnlinePlace(term?term+' '+onlineCityQuery():onlineCityQuery(),term?cities[cityMapCity].name+' · '+term:cities[cityMapCity].name+'全城',term?15:14)};
 const originalSelect=select;select=function(...args){originalSelect(...args);addCityExtras()};addCityExtras();
 const originalOpen=openCityMap;openCityMap=function(...args){onlineOpening=true;$('cityMapCanvas').hidden=false;$('cityGooglePane').hidden=true;originalOpen(...args)};
 // Reading another attraction must not reload an embedded map: its current viewport is owned by Google.
 const originalSpot=selectCityMapSpot;selectCityMapSpot=function(index,focus){const online=onlineMapMode!=='local';originalSpot(index,online?false:focus);syncOnlineSpot(index,{focusMap:false});window.TravelGoogleMap?.select(index);if(online&&focus&&!onlineOpening)$('cityMapFocus').scrollIntoView({block:innerWidth>700?'nearest':'start',behavior:'instant'})};
 document.addEventListener('click',e=>{const pair=e.target.closest('[data-drive-pair]'),from=e.target.closest('[data-drive-from]'),route=e.target.closest('[data-drive-route]'),filter=e.target.closest('[data-activity-filter]'),activity=e.target.closest('[data-activity-map]'),fromMap=e.target.closest('[data-activities-from-map]');if(pair){const ids=pair.dataset.drivePair.split(',');chooseDrivePair(...ids)}else if(from){const id=Number(from.dataset.driveFrom);chooseDrivePair(id,id===19?'tf:teide':id===0?1:0)}else if(route){setMapRoute(Number(route.dataset.driveRoute));if(Number(route.dataset.driveRoute)===3){$('optionalRoutes').checked=$('driveToledo').checked;renderRoute()}revealPageTarget($('atlas')).scrollIntoView({behavior:'instant'})}else if(filter){showCityActivities(filter.dataset.activityFilter)}else if(activity){const a=localActivities.find(a=>a.id===activity.dataset.activityMap);if(a){const linked=travelNoteActivityLinks[a.id];if(linked){pendingActivity=null;openCityMap(a.city,linked.index)}else{pendingActivity=a;openCityMap(a.city)}requestAnimationFrame(()=>{if(innerWidth<=700)$('cityMapDialog').querySelector('.city-map-body').scrollTop=0})}}else if(fromMap){const id=Number(fromMap.dataset.activitiesFromMap);closeCityMap();showCityActivities(id)}});
}
initOnlineTravel();

let pickedDriveCities=[],mapDrivePicking=false,pickLayoutFrame=0;
const originalPinLabels=new Map(cities.map(c=>[c.id,$('pin-'+c.id).querySelector('.label').getAttribute('style')]));
function pickLegs(){return pickedDriveCities.slice(1).map((to,i)=>({from:pickedDriveCities[i],to,data:driveEntry(pickedDriveCities[i],to)}))}
function shortDriveTime(seconds){return driveTime(seconds).replaceAll(' ','').replace('分钟','分')}
function decorateDrivePins(){
 if(!mapDrivePicking)return;
 cities.forEach(c=>{const p=$('pin-'+c.id),i=pickedDriveCities.indexOf(c.id);p.classList.remove('route-muted','route-stop','route-optional','dim');p.disabled=false;p.classList.toggle('drive-picked',i>=0);p.setAttribute('aria-pressed',String(i>=0));p.setAttribute('aria-label',c.name+(i>=0?'，第 '+(i+1)+' 站；右键取消车程，左键查看景点':'，点击加入车程路线'));p.querySelector('.dot').textContent=i>=0?i+1:'';});
 document.querySelectorAll('#cityList .city-item').forEach(b=>{const id=Number(b.dataset.pickCity),i=pickedDriveCities.indexOf(id);b.classList.toggle('drive-picked',i>=0);b.setAttribute('aria-pressed',String(Number(b.dataset.pickCity)===selected));b.querySelector('em').textContent=i>=0?'已选第 '+(i+1)+' 站 · 再点取消':'点击加入车程路线';});
}
function updatePickControls(){
 const legs=pickLegs(),total=legs.reduce((s,l)=>{if(l.data){s.seconds+=l.data.seconds;s.meters+=l.data.meters}else s.sea++;return s},{seconds:0,meters:0,sea:0});
 $('drivePickMode').setAttribute('aria-pressed',String(mapDrivePicking));$('driveMapBuilder').hidden=!mapDrivePicking;$('driveMapRestore').hidden=mapDrivePicking;$('driveMapSummary').hidden=!mapDrivePicking;$('drivePickOverlay').toggleAttribute('hidden',!mapDrivePicking);$('drivePickLabels').hidden=!mapDrivePicking;$('map').classList.toggle('drive-pick-mode',mapDrivePicking);
 if(!mapDrivePicking){cities.forEach(c=>{const p=$('pin-'+c.id);p.classList.remove('drive-picked');p.querySelector('.label').setAttribute('style',originalPinLabels.get(c.id)||'')});return}
 document.querySelectorAll('[data-route-map]').forEach(b=>b.setAttribute('aria-pressed','false'));
 $('routeModeName').textContent='自选路线 · 按右键点选顺序连线';$('drivePickClear').disabled=!pickedDriveCities.length;$('drivePickReverse').disabled=pickedDriveCities.length<2;
 $('drivePickTotal').innerHTML=pickedDriveCities.length<2?(pickedDriveCities.length?'已选 1 座城市':''): '已选 '+pickedDriveCities.length+' 座城市 · '+legs.length+' 段'+(total.seconds?' · '+(total.sea?'陆路部分':'合计')+' <strong>'+driveTime(total.seconds)+'</strong> / '+driveKm(total.meters):'')+(total.sea?' · '+total.sea+' 段需跨海':'');
 $('drivePickTotal').hidden=!pickedDriveCities.length;
 $('drivePickSelected').innerHTML=pickedDriveCities.map((id,i)=>'<button type="button" class="map-drive-chip" data-pick-remove="'+id+'" aria-label="取消第 '+(i+1)+' 站 '+cities[id].name+'"><b>'+(i+1)+'</b>'+cities[id].name+'<small aria-hidden="true">×</small></button>').join('');
 $('drivePickSegments').innerHTML=legs.length?legs.map((l,i)=>'<div class="map-drive-segment"><span class="pick-leg-name"><span class="pick-leg-number">'+(i+1)+' → '+(i+2)+'</span>'+cities[l.from].name+' → '+cities[l.to].name+'</span>'+(l.data?'<strong>'+driveTime(l.data.seconds)+'</strong><small>'+driveKm(l.data.meters)+'</small><a href="'+safe(driveGoogleUrl(l.from,l.to))+'" target="_blank" rel="noopener noreferrer">谷歌路线 ↗</a><button type="button" data-pick-refresh="'+l.from+','+l.to+'">联网核对估算</button>':'<strong>需飞机／轮渡衔接</strong><small>不计入纯驾车合计</small>')+'</div>').join(''):'<p class="pick-empty">'+(pickedDriveCities.length?'继续右键点击下一座城市；已选城市再次右键即可取消。':'左键查看景点，右键加入车程；圆点和城市名称都支持。')+'</p>';
 decorateDrivePins();schedulePickLayout();
}
const oldPickSetRoute=setMapRoute,oldPickRenderRoute=renderRoute,oldPickRenderList=renderList;
function startMapDrive(scroll=false){mapDrivePicking=true;oldPickSetRoute(-1);updatePickControls();if(scroll)revealPageTarget($('driveMapTools')).scrollIntoView({behavior:'instant',block:'start'})}
function toggleDriveCity(id){id=Number(id);if(!cities[id])return;if(!mapDrivePicking)startMapDrive();const i=pickedDriveCities.indexOf(id);if(i>=0)pickedDriveCities.splice(i,1);else pickedDriveCities.push(id);updatePickControls();}
function bindDriveDirectory(){document.querySelectorAll('#cityList .city-item').forEach(b=>{const name=b.querySelector('strong').textContent,c=cities.find(c=>c.name===name);if(!c)return;b.dataset.pickCity=c.id;bindCityMouseActions(b,c.id)});decorateDrivePins();}
renderList=function(){oldPickRenderList();bindDriveDirectory();if(mapDrivePicking)schedulePickLayout()};
renderRoute=function(){oldPickRenderRoute();if(mapDrivePicking)updatePickControls();else document.querySelectorAll('[data-route-city]').forEach(b=>bindCityMouseActions(b,b.dataset.routeCity))};
setMapRoute=function(index){mapDrivePicking=false;updatePickControls();oldPickSetRoute(index);bindDriveDirectory();};
function schedulePickLayout(){cancelAnimationFrame(pickLayoutFrame);pickLayoutFrame=requestAnimationFrame(layoutPickedDriveMap)}
function layoutPickedDriveMap(){
 if(!mapDrivePicking)return;const map=$('map'),w=map.clientWidth,h=map.clientHeight;if(!w||!h)return;
 const overlap=(a,b,pad=2)=>a.x<b.x+b.w+pad&&a.x+a.w+pad>b.x&&a.y<b.y+b.h+pad&&a.y+a.h+pad>b.y;
 const points=cities.map(c=>{const [x,y]=project(c.lon,c.lat,c.lat<31);return{c,x:x/900*w,y:y/772.3125*h}}),byId=new Map(points.map(p=>[p.c.id,p]));
 const taken=[],cityPointSize=w<600?22:26,cityPointBoxes=points.map(p=>({x:p.x-cityPointSize/2,y:p.y-cityPointSize/2,w:cityPointSize,h:cityPointSize})),pointBoxes=points.map(p=>{const size=pickedDriveCities.includes(p.c.id)?cityPointSize:14;return{x:p.x-size/2,y:p.y-size/2,w:size,h:size}});let leaders='';
 const ordered=[...points].sort((a,b)=>a.y-b.y);
 for(const p of ordered){const lab=$('pin-'+p.c.id).querySelector('.label'),lw=lab.offsetWidth,lh=lab.offsetHeight;let best=null,cost=Infinity;
  for(const gap of [14,23,35,50,70,95,120])for(const [dx,dy] of [[1,0],[-1,0],[1,-1],[-1,-1],[1,1],[-1,1],[0,-1],[0,1]]){let x=p.x+dx*gap-(dx<0?lw:dx===0?lw/2:0),y=p.y+dy*gap-(dy<0?lh:dy===0?lh/2:0);x=Math.max(3,Math.min(w-lw-3,x));y=Math.max(3,Math.min(h-lh-3,y));const r={x,y,w:lw,h:lh},v=taken.filter(b=>overlap(r,b)).length*1000000+cityPointBoxes.filter(b=>overlap(r,b,0)).length*100000000+Math.hypot(x+lw/2-p.x,y+lh/2-p.y)+(dx<0?1:0);if(v<cost){cost=v;best=r}}
  taken.push(best);lab.style.setProperty('left',(best.x-p.x+12)+'px','important');lab.style.setProperty('right','auto','important');lab.style.setProperty('top',(best.y-p.y+12)+'px','important');
  const ex=Math.max(best.x,Math.min(best.x+lw,p.x)),ey=Math.max(best.y,Math.min(best.y+lh,p.y));if(Math.hypot(ex-p.x,ey-p.y)>18)leaders+='<line class="pick-city-leader" x1="'+p.x+'" y1="'+p.y+'" x2="'+ex+'" y2="'+ey+'"/>';
 }
 const legs=pickLegs();$('drivePickLabels').innerHTML=legs.map((l,i)=>l.data?'<a class="pick-time" data-pick-leg="'+i+'" href="'+safe(driveGoogleUrl(l.from,l.to))+'" target="_blank" rel="noopener noreferrer" title="'+cities[l.from].name+' → '+cities[l.to].name+' · '+driveKm(l.data.meters)+' · 打开谷歌路线"><small>'+(i+1)+'→'+(i+2)+'</small>'+shortDriveTime(l.data.seconds)+'</a>':'<span class="pick-time sea-leg" data-pick-leg="'+i+'"><small>'+(i+1)+'→'+(i+2)+'</small>需跨海</span>').join('');
 let paths='',callouts='';for(let i=0;i<legs.length;i++){const l=legs[i],a=byId.get(l.from),b=byId.get(l.to),dist=Math.hypot(b.x-a.x,b.y-a.y),nx=-(b.y-a.y)/dist,ny=(b.x-a.x)/dist,bend=Math.min(32,dist*.22)*(i%2?-1:1),cx=(a.x+b.x)/2+nx*bend,cy=(a.y+b.y)/2+ny*bend,path='M '+a.x+' '+a.y+' Q '+cx+' '+cy+' '+b.x+' '+b.y;
  paths+='<path class="pick-road-halo" d="'+path+'"/><path class="pick-road'+(l.data?'':' sea-leg')+'" data-leg="'+i+'" d="'+path+'" marker-end="url(#pickArrow'+(l.data?'':'Sea')+')"/>';
  const badge=$('drivePickLabels').querySelector('[data-pick-leg="'+i+'"]'),bw=badge.offsetWidth,bh=badge.offsetHeight;let best=null,bestCost=Infinity;
  for(const t of [.5,.4,.6,.3,.7,.2,.8])for(const off of [0,18,-18,34,-34,54,-54,78,-78,110,-110,150,-150]){const px=(1-t)*(1-t)*a.x+2*(1-t)*t*cx+t*t*b.x,py=(1-t)*(1-t)*a.y+2*(1-t)*t*cy+t*t*b.y;let x=Math.max(3,Math.min(w-bw-3,px+nx*off-bw/2)),y=Math.max(3,Math.min(h-bh-3,py+ny*off-bh/2));const r={x,y,w:bw,h:bh},cost=taken.filter(o=>overlap(r,o,3)).length*1000000+pointBoxes.filter(o=>overlap(r,o,3)).length*100000000+Math.abs(off)+Math.abs(t-.5)*80;if(cost<bestCost){bestCost=cost;best={...r,px,py}}}
  if(bestCost>=1000000)for(let y=3;y<h-bh-3;y+=9)for(let x=3;x<w-bw-3;x+=9){const r={x,y,w:bw,h:bh};if(taken.some(o=>overlap(r,o,3))||pointBoxes.some(o=>overlap(r,o,3)))continue;const mx=x+bw/2,my=y+bh/2,t=Math.max(.15,Math.min(.85,((mx-a.x)*(b.x-a.x)+(my-a.y)*(b.y-a.y))/(dist*dist))),px=(1-t)*(1-t)*a.x+2*(1-t)*t*cx+t*t*b.x,py=(1-t)*(1-t)*a.y+2*(1-t)*t*cy+t*t*b.y,cost=Math.hypot(mx-px,my-py)+Math.abs(t-.5)*80;if(cost<bestCost){bestCost=cost;best={...r,px,py}}}
  taken.push(best);badge.style.left=best.x+bw/2+'px';badge.style.top=best.y+bh/2+'px';const ex=Math.max(best.x,Math.min(best.x+bw,best.px)),ey=Math.max(best.y,Math.min(best.y+bh,best.py));if(Math.hypot(ex-best.px,ey-best.py)>3)callouts+='<line class="pick-label-leader" x1="'+best.px+'" y1="'+best.py+'" x2="'+ex+'" y2="'+ey+'"/>';
 }
 $('drivePickOverlay').setAttribute('viewBox','0 0 '+w+' '+h);$('drivePickOverlay').innerHTML='<defs><marker id="pickArrow" viewBox="0 0 10 10" refX="11" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="#a6673e" stroke-width="1.8"/></marker><marker id="pickArrowSea" viewBox="0 0 10 10" refX="11" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="#747e89" stroke-width="1.8"/></marker></defs>'+leaders+paths+callouts;
 $('drivePickOverlay').setAttribute('aria-label',legs.length?'自选车程：'+legs.map(l=>cities[l.from].name+'至'+cities[l.to].name+'，'+(l.data?driveTime(l.data.seconds):'需跨海')).join('；'):'点选至少两座城市后显示车程虚线');
}
function initMapDrivePicker(){
 document.querySelector('.route-mode-buttons').insertAdjacentHTML('afterbegin','<button type="button" id="drivePickMode" aria-pressed="false">点选城市查车程</button>');
 $('mapJourney').insertAdjacentHTML('beforebegin','<div class="map-drive-tools" id="driveMapTools"><div id="driveMapBuilder"><div class="map-drive-top"><strong>右键点城市，串起车程路线</strong><div class="map-drive-actions"><button type="button" id="drivePickReverse">反向</button><button type="button" id="drivePickClear">清空</button></div></div><div class="map-drive-total" id="drivePickTotal" role="status" aria-live="polite"></div></div><div id="driveMapRestore" class="map-drive-recommend-hint" hidden>正在查看推荐路线；<button type="button" data-start-pick>回到自选车程</button>，或直接点击地图城市开始点选。</div></div>');
 $('pins').insertAdjacentHTML('beforebegin','<svg id="drivePickOverlay" role="img" aria-label="自选城市车程示意" hidden></svg><div id="drivePickLabels" hidden></div>');
 $('routeExplainer').insertAdjacentHTML('afterend','<div class="map-drive-summary" id="driveMapSummary"><div class="map-drive-selected" id="drivePickSelected" aria-label="已选城市，点击取消"></div><div class="map-drive-segments" id="drivePickSegments"></div><p class="pick-method">虚线示意选城顺序，不是实际公路轨迹；时间按道路估算，不含拥堵、休息和游览。数据保存于 2026-09-19；点击线上的车程可打开谷歌路线。海岛跨海段不计入驾车合计，加那利群岛为移置插图。</p></div>');
 cities.forEach(c=>bindCityMouseActions($('pin-'+c.id),c.id));bindDriveDirectory();$('drivePickMode').onclick=()=>startMapDrive();$('drivePickClear').onclick=()=>{pickedDriveCities=[];updatePickControls()};$('drivePickReverse').onclick=()=>{pickedDriveCities.reverse();updatePickControls()};
 document.addEventListener('click',e=>{const remove=e.target.closest('[data-pick-remove]'),start=e.target.closest('[data-start-pick]'),refresh=e.target.closest('[data-pick-refresh]');if(remove)toggleDriveCity(remove.dataset.pickRemove);else if(start){e.preventDefault();startMapDrive(true)}else if(refresh){const [a,b]=refresh.dataset.pickRefresh.split(',').map(Number);$('driveAdvanced').open=true;chooseDrivePair(a,b);refreshDrive();}});
 const existingChoose=chooseDrivePair;chooseDrivePair=function(...args){$('driveAdvanced').open=true;existingChoose(...args)};
 $('search').addEventListener('input',()=>{bindDriveDirectory();schedulePickLayout()});new ResizeObserver(schedulePickLayout).observe($('map'));startMapDrive();
}
initMapDrivePicker();

const travelPages=[{key:'map',label:'地图选城'},{key:'cities',label:'城市景点'},{key:'routes',label:'路线方案'},{key:'charter',label:'包车方案'},{key:'driving',label:'车程明细'},{key:'activities',label:'特色活动'},{key:'culture',label:'文化与风景'},{key:'guides',label:'中文攻略'},{key:'flights',label:'航班与准备'}];
let activeTravelPage='map';const travelPagers=new Map();
function showTravelPage(key,options={}){const page=document.getElementById('page-'+key);if(!page)return;activeTravelPage=key;document.querySelectorAll('[data-travel-panel]').forEach(p=>p.hidden=p.dataset.travelPanel!==key);document.querySelectorAll('[data-travel-tab]').forEach(b=>{const on=b.dataset.travelTab===key;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1});if(key==='map')requestAnimationFrame(schedulePickLayout);if(options.hash!==false&&location.hash!=='#page-'+key)history.replaceState(null,'','#page-'+key);if(options.scroll!==false){const header=document.querySelector('body > header');window.scrollTo({top:header.offsetTop+header.offsetHeight,behavior:'instant'})}}
function showTravelSubtab(group,key){document.querySelectorAll('[data-subgroup="'+group+'"][data-subpanel]').forEach(p=>p.hidden=p.dataset.subpanel!==key);document.querySelectorAll('[data-subtab-group="'+group+'"]').forEach(b=>{const on=b.dataset.subtab===key;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1});}
function revealPageTarget(el){if(!el)return el;const page=el.closest('[data-travel-panel]');if(page)showTravelPage(page.dataset.travelPanel,{scroll:false});const sub=el.closest('[data-subgroup][data-subpanel]');if(sub)showTravelSubtab(sub.dataset.subgroup,sub.dataset.subpanel);if(typeof travelPagers!=='undefined')for(const pager of travelPagers.values())if(pager.container.contains(el)){mountTravelPager(pager.key,pager.container,pager.selector,pager.unit,false);const item=pager.items.find(i=>i===el||i.contains(el));if(item){pager.page=Math.floor(pager.items.indexOf(item)/pager.size);paintTravelPager(pager)}}return el;}
function travelPagerSize(key){return key==='city'?(innerWidth<=540?2:4):(innerWidth<=540?3:6)}
function paintTravelPager(pager){pager.size=travelPagerSize(pager.key);const total=Math.max(1,Math.ceil(pager.items.length/pager.size));pager.page=Math.max(0,Math.min(pager.page,total-1));pager.items.forEach((item,i)=>item.classList.toggle('travel-paged-out',i<pager.page*pager.size||i>=(pager.page+1)*pager.size));for(const bar of pager.bars){bar.classList.toggle('pager-single',total<=1);bar.innerHTML='<span class="pager-note">'+(pager.items.length?'第 '+(pager.page*pager.size+1)+'–'+Math.min((pager.page+1)*pager.size,pager.items.length)+' / '+pager.items.length+' '+pager.unit:'暂无内容')+'</span><div class="pager-controls"><button type="button" data-pager-step="-1"'+(pager.page===0?' disabled':'')+'>上一页</button>'+Array.from({length:total},(_,i)=>'<button type="button" data-pager-page="'+i+'"'+(i===pager.page?' aria-current="page"':'')+' aria-label="第 '+(i+1)+' 页">'+(i+1)+'</button>').join('')+'<button type="button" data-pager-step="1"'+(pager.page===total-1?' disabled':'')+'>下一页</button></div>';bar.onclick=e=>{const b=e.target.closest('button');if(!b||b.disabled)return;pager.page=b.dataset.pagerPage===undefined?pager.page+Number(b.dataset.pagerStep):Number(b.dataset.pagerPage);paintTravelPager(pager);revealPageTarget(pager.bars[0]).scrollIntoView({behavior:'instant',block:'start'});pager.bars[0].focus({preventScroll:true})}}}
function mountTravelPager(key,container,selector,unit,reset=true){if(!container)return;let pager=travelPagers.get(key);if(!pager||pager.container!==container){if(pager)pager.bars.forEach(b=>b.remove());const bars=[document.createElement('div'),document.createElement('div')];bars.forEach(b=>{b.className='travel-pagination';b.tabIndex=-1;b.setAttribute('aria-label','内容分页')});container.before(bars[0]);container.after(bars[1]);pager={key,container,selector,unit,bars,page:0,size:travelPagerSize(key),items:[]};travelPagers.set(key,pager)}const all=[...container.querySelectorAll(':scope > '+selector)];all.forEach(e=>e.classList.remove('travel-paged-out'));pager.items=all.filter(e=>!e.hidden);if(reset)pager.page=0;paintTravelPager(pager);}
function refreshCityPager(){mountTravelPager('city',$('detail').querySelector('.spots'),'.spot','项景点与活动');}
function renderMapCityPreview(){if($('cityDirectorySummary'))$('cityDirectorySummary').textContent='选择城市 · 当前 '+cities[selected].name}
function makeTravelSubtabs(group,entries,parent){const nav=document.createElement('div');nav.className='travel-subtabs';nav.setAttribute('role','tablist');nav.setAttribute('aria-label',group==='routes'?'路线内容':group==='flight-gateways'?'航班地区':'收藏内容');nav.innerHTML=entries.map((e,i)=>'<button type="button" role="tab" id="subtab-'+group+'-'+e.key+'" aria-controls="subpanel-'+group+'-'+e.key+'" data-subtab-group="'+group+'" data-subtab="'+e.key+'" aria-selected="'+(i===0)+'" tabindex="'+(i===0?'0':'-1')+'">'+e.label+'</button>').join('');parent.append(nav);entries.forEach((e,i)=>{const p=document.createElement('div');p.className='travel-subpanel';p.id='subpanel-'+group+'-'+e.key;p.dataset.subgroup=group;p.dataset.subpanel=e.key;p.setAttribute('role','tabpanel');p.setAttribute('aria-labelledby','subtab-'+group+'-'+e.key);p.hidden=i!==0;e.nodes.forEach(n=>p.append(n));parent.append(p)});return nav}
function clearEveryDriveLine(){pickedDriveCities=[];startMapDrive(false);$('routeOverlay').innerHTML='';$('routeOverlay').setAttribute('hidden','');$('drivePickLabels').replaceChildren();$('drivePickOverlay').innerHTML='';$('clearAllFeedback').textContent='已清除全部连线和车程城市。';requestAnimationFrame(schedulePickLayout);}
function initTravelTabs(){
 const oldNav=document.querySelector('.quick-nav'),nav=document.createElement('nav');nav.className='travel-page-tabs';nav.setAttribute('aria-label','旅行内容标签');nav.innerHTML='<div class="travel-page-tablist" role="tablist" aria-label="旅行内容">'+travelPages.map((p,i)=>'<button type="button" role="tab" id="tab-'+p.key+'" data-travel-tab="'+p.key+'" aria-controls="page-'+p.key+'" aria-selected="'+(i===0)+'" tabindex="'+(i===0?'0':'-1')+'">'+p.label+'</button>').join('')+'</div>';oldNav.replaceWith(nav);
 const pages={};travelPages.forEach(p=>{const el=document.createElement('div');el.id='page-'+p.key;el.dataset.travelPanel=p.key;el.className='travel-page-panel';el.setAttribute('role','tabpanel');el.setAttribute('aria-labelledby','tab-'+p.key);el.hidden=p.key!=='map';pages[p.key]=el});let position=nav;travelPages.forEach(p=>{position.after(pages[p.key]);position=pages[p.key]});
 const atlas=$('atlas'),detail=$('detail'),directory=document.querySelector('.directory'),preview=document.createElement('aside');preview.id='mapCityPreview';preview.className='tab-map-preview';detail.replaceWith(preview);pages.map.append(atlas);
 const cityLayout=document.createElement('div');cityLayout.className='tab-city-layout';const drawer=document.createElement('details');drawer.className='city-directory-drawer';drawer.id='cityDirectoryDrawer';drawer.open=innerWidth>900;drawer.innerHTML='<summary id="cityDirectorySummary">选择城市</summary>';drawer.append(directory);cityLayout.append(drawer,detail);pages.cities.append(cityLayout);
 makeTravelSubtabs('routes',[{key:'days',label:'五套逐日行程',nodes:[$('trip')]},{key:'inland',label:'图中路线 · 内陆 17 天',nodes:[$('reference-route')]},{key:'coast',label:'东海岸 · 包车 15 天',nodes:[$('charter')]},{key:'tenerife',label:'特内里费岛 · 4–6 天',nodes:[$('tenerife')]}],pages.routes);
 pages.charter.append($('charterResearch'));pages.driving.append($('driving'));pages.activities.append($('localActivities'));pages.guides.append($('chineseResources'));makeTravelSubtabs('flight-gateways',[{key:'portugal',label:'葡萄牙回程 · 本次新增',nodes:[$('portugalFlights')]},{key:'spain',label:'西班牙直飞',nodes:[$('flights')]}],pages.flights);pages.flights.append(document.querySelector('.logistics'),$('tenerifeAccess'));
 const culture=$('culture'),catalogue=$('cultureCatalogue'),head=culture.querySelector('.section-top');pages.culture.append(culture);const children=[...culture.children],headIndex=children.indexOf(head),catIndex=children.indexOf(catalogue);makeTravelSubtabs('culture',[{key:'catalogue',label:'文化、艺术与风景清单',nodes:children.slice(catIndex)},{key:'stays',label:'停留组合与原有收藏',nodes:children.slice(headIndex+1,catIndex)}],culture);
 const footer=document.querySelector('body > footer'),note=document.createElement('details');note.className='travel-footer-note';note.innerHTML='<summary>使用说明、照片授权与资料来源</summary>';footer.before(note);note.append(footer);footer.insertAdjacentHTML('beforeend','<p><a href="图片来源与授权.html" target="_blank" rel="noopener">图片来源与授权 ↗</a> · <a href="地图数据与中文资料来源.html" target="_blank" rel="noopener">地图与中文资料来源 ↗</a></p>');
 const top=document.querySelector('.map-top');top.innerHTML='<div class="map-top-caption"><b>左键看城市，右键查车程</b></div><button type="button" class="clear-all-drive" id="clearAllDriveLines">一键清除所有车程连线</button><span class="clear-all-feedback" id="clearAllFeedback" role="status" aria-live="polite"></span>';$('clearAllDriveLines').onclick=clearEveryDriveLine;
 const previousSelect=select;select=function(id,scroll=false){previousSelect(id,false);renderMapCityPreview();refreshCityPager();if(activeTravelPage==='cities'){if(innerWidth<=900)drawer.open=false;revealPageTarget(detail).scrollIntoView({behavior:'instant',block:'start'})}else if(scroll){showTravelPage('cities');}};
 const previousFilter=filterCitySpots;filterCitySpots=function(cat){previousFilter(cat);refreshCityPager()};
 const previousToggle=toggleDriveCity;toggleDriveCity=function(id){previousToggle(id);$('clearAllFeedback').textContent=''};const previousSetRoute=setMapRoute;setMapRoute=function(...args){$('clearAllFeedback').textContent='';return previousSetRoute(...args)};
 for(const [key,id,selector,unit] of [['activities','activityGrid','.activity-card','项活动'],['culture','cultureGrid','.culture-card','处景点'],['guides','resourcesGrid','.resource-card','份资料']]){const grid=$(id);mountTravelPager(key,grid,selector,unit);new MutationObserver(records=>{if(records.some(r=>r.target===grid)){const current=[...grid.querySelectorAll(':scope > '+selector)].filter(e=>!e.hidden),previous=travelPagers.get(key).items;if(current.length!==previous.length||current.some((e,i)=>e!==previous[i]))mountTravelPager(key,grid,selector,unit)}}).observe(grid,{childList:true});}
 document.addEventListener('click',e=>{const tab=e.target.closest('[data-travel-tab]'),sub=e.target.closest('[data-subtab]'),city=e.target.closest('[data-open-city-page]');if(tab)showTravelPage(tab.dataset.travelTab);else if(sub)showTravelSubtab(sub.dataset.subtabGroup,sub.dataset.subtab);else if(city)showTravelPage('cities');});
 document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const target=document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));if(!target)return;e.preventDefault();revealPageTarget(target);requestAnimationFrame(()=>target.scrollIntoView({behavior:'instant',block:'start'}));},true);
 nav.addEventListener('keydown',e=>{const b=e.target.closest('[data-travel-tab]');if(!b||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const list=[...nav.querySelectorAll('[data-travel-tab]')],i=list.indexOf(b),next=e.key==='Home'?0:e.key==='End'?list.length-1:(i+(e.key==='ArrowLeft'?list.length-1:1))%list.length;showTravelPage(list[next].dataset.travelTab);list[next].focus({preventScroll:true});list[next].scrollIntoView({inline:'nearest',block:'nearest',behavior:'instant'})});
 document.querySelectorAll('.travel-subtabs').forEach(n=>n.addEventListener('keydown',e=>{const b=e.target.closest('[data-subtab]');if(!b||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const list=[...n.querySelectorAll('button')],i=list.indexOf(b),next=e.key==='Home'?0:e.key==='End'?list.length-1:(i+(e.key==='ArrowLeft'?list.length-1:1))%list.length;showTravelSubtab(list[next].dataset.subtabGroup,list[next].dataset.subtab);list[next].focus()}));
 let sizeTimer;addEventListener('resize',()=>{clearTimeout(sizeTimer);sizeTimer=setTimeout(()=>{for(const p of travelPagers.values()){const index=p.page*p.size;p.size=travelPagerSize(p.key);p.page=Math.floor(index/p.size);paintTravelPager(p)}if(innerWidth>900)drawer.open=true},100)});
 addEventListener('hashchange',()=>{const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(target)revealPageTarget(target)});
 renderMapCityPreview();refreshCityPager();const initial=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(initial)revealPageTarget(initial);else showTravelPage('map',{scroll:false,hash:false});
}
initTravelTabs();

// The detail panel follows its viewing context; it stays next to the national map.
const cityDetailHome=$('detail').parentElement;
const mapDetailHome=$('mapCityPreview').parentElement;
$('mapCityPreview').remove();
function placeCityDetail(page){
 if(page==='map')mapDetailHome.append($('detail'));
 else if(page==='cities')cityDetailHome.append($('detail'));
 if(page==='map'||page==='cities'){
  const pager=travelPagers.get('city');if(pager)paintTravelPager(pager);
 }
}
const tabPageBeforeSidebar=showTravelPage;
showTravelPage=function(key,options={}){placeCityDetail(key);tabPageBeforeSidebar(key,options);if(key==='map'||key==='cities'){const p=travelPagers.get('city');if(p)paintTravelPager(p)}};
const sizeBeforeSidebar=travelPagerSize;
travelPagerSize=function(key){return key==='city'&&activeTravelPage==='map'?100:sizeBeforeSidebar(key)};
const selectBeforeSidebar=select;
select=function(id,scroll=false){selectBeforeSidebar(id,false);$('detail').scrollTop=0;if(scroll&&activeTravelPage!=='map')showTravelPage('cities');};
placeCityDetail(activeTravelPage);
refreshCityPager();

// Recommended itinerary and custom driving estimates are independent map layers.
function currentRecommendedStops(){return activeRoute<0?[]:[...routeMaps[activeRoute].stops,...($('optionalRoutes').checked?routeMaps[activeRoute].optional:[])]}
decorateDrivePins=function(){
 const stops=currentRecommendedStops();
 cities.forEach(c=>{
  const pin=$('pin-'+c.id),i=pickedDriveCities.indexOf(c.id),stop=stops.find(s=>s.id===c.id);
  pin.classList.toggle('route-muted',activeRoute>=0&&!stop);pin.classList.toggle('route-stop',!!stop);pin.classList.toggle('drive-picked',i>=0);pin.classList.remove('dim');pin.disabled=false;
  pin.setAttribute('aria-pressed',String(c.id===selected));pin.setAttribute('aria-label',c.name+(stop?'，推荐路线第 '+stop.order+' 站':'')+(i>=0?'，车程第 '+(i+1)+' 站；右键取消车程，左键查看景点':'，左键查看景点，右键加入车程'));
  pin.querySelector('.dot').textContent=stop?stop.order:activeRoute<0&&i>=0?i+1:'';
  let badge=pin.querySelector('.drive-order');if(!badge){badge=document.createElement('span');badge.className='drive-order';badge.setAttribute('aria-hidden','true');pin.append(badge)}badge.hidden=activeRoute<0||i<0;badge.textContent=i+1;
 });
 document.querySelectorAll('#cityList .city-item').forEach(b=>{const i=pickedDriveCities.indexOf(Number(b.dataset.pickCity));b.classList.toggle('drive-picked',i>=0);b.setAttribute('aria-pressed',String(Number(b.dataset.pickCity)===selected));b.querySelector('em').textContent=i>=0?'车程第 '+(i+1)+' 站 · 右键取消':'左键看景点 · 右键查车程';});
};
const pickControlsBeforeOverlay=updatePickControls;
updatePickControls=function(){
 mapDrivePicking=true;pickControlsBeforeOverlay();
 document.querySelectorAll('[data-route-map]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.routeMap)===activeRoute)));
 $('drivePickMode').setAttribute('aria-pressed',String(activeRoute<0));$('drivePickMode').textContent='只看自选车程';
 $('routeModeName').textContent=activeRoute<0?'自选车程 · 按右键点选顺序连线':plans[activeRoute].name+' · 已叠加自选车程';
 $('map').classList.toggle('has-recommended-route',activeRoute>=0);
 $('driveMapBuilder').querySelector('.map-drive-top strong').textContent=activeRoute<0?'右键点城市，串起车程路线':'在推荐路线上，叠加查看城市间车程';

};
startMapDrive=function(scroll=false){mapDrivePicking=true;updatePickControls();if(scroll)revealPageTarget($('driveMapTools')).scrollIntoView({behavior:'instant',block:'start'})};
toggleDriveCity=function(id){id=Number(id);if(!cities[id])return;const i=pickedDriveCities.indexOf(id);if(i>=0)pickedDriveCities.splice(i,1);else pickedDriveCities.push(id);updatePickControls();$('clearAllFeedback').textContent='';};
renderRoute=function(){oldPickRenderRoute();updatePickControls();document.querySelectorAll('[data-route-city]').forEach(b=>bindCityMouseActions(b,b.dataset.routeCity));};
setMapRoute=function(index){mapDrivePicking=true;oldPickSetRoute(index);bindDriveDirectory();updatePickControls();$('clearAllFeedback').textContent='';};
clearEveryDriveLine=function(){pickedDriveCities=[];setMapRoute(-1);$('clearAllFeedback').textContent='已清除全部连线和车程城市。';};
$('clearAllDriveLines').onclick=clearEveryDriveLine;
$('drivePickMode').onclick=()=>setMapRoute(-1);
$('map').setAttribute('aria-label','西班牙与葡萄牙城市地图，左键查看景点，右键叠加或取消车程');
renderRoute();

// My Maps supplies a real Google base map with all imported attraction markers.
const configuredMyMapsId='1F4LcfAIPdO3uWMdexX6MpM026lFwMZM';
let connectedMyMapsId=configuredMyMapsId;
try{connectedMyMapsId=connectedMyMapsId||localStorage.getItem('spain-mymaps-id')||''}catch(e){}
if(!/^[A-Za-z0-9_-]{10,160}$/.test(connectedMyMapsId))connectedMyMapsId='';
function parseMyMapsLink(value){try{const u=new URL(value);if(u.protocol!=='https:'||!['www.google.com','google.com','mymaps.google.com'].includes(u.hostname)||!u.pathname.startsWith('/maps/d/'))return '';const id=u.searchParams.get('mid')||'';return /^[A-Za-z0-9_-]{10,160}$/.test(id)?id:''}catch(e){return ''}}
function myMapsCityView(index=-1){
 const ps=cityCoordinates.filter(p=>p.city===cityMapCity&&cities[p.city].spots[p.index].googleImported),point=ps.find(p=>p.index===index);
 if(point)return{lat:point.lat,lon:point.lon,zoom:16};
 const ys=ps.map(p=>Math.log(Math.tan(Math.PI/4+p.lat*Math.PI/360))),xs=ps.map(p=>p.lon),minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
 const area=$('cityMyMapsFrame').getBoundingClientRect(),w=Math.max(240,area.width-150),h=Math.max(250,area.height-150);
 const zx=Math.log2(w*360/(256*Math.max(maxX-minX,.002))),zy=Math.log2(h*2*Math.PI/(256*Math.max(maxY-minY,.00003)));
 return{lat:(Math.atan(Math.exp((minY+maxY)/2))-Math.PI/4)*360/Math.PI,lon:(minX+maxX)/2,zoom:Math.max(7,Math.min(16,Math.floor(Math.min(zx,zy))))};
}
function updateMyMapsFrame(index=-1,force=false){
 const connected=!!connectedMyMapsId;$('myMapsConnect').hidden=connected;$('cityMyMapsFrame').hidden=!connected;$('myMapsManage').hidden=!connected;
 $('myMapsConnectStatus').textContent=connected?'地图标记显示 Google 介绍；右侧清单显示本站介绍，切换时保留地图视野。需联网访问 Google。':'尚未连接 My Maps；景点文件已准备好，导入后连接分享链接。';
 $('myMapsCityFile').href='assets/mymaps/'+cities[cityMapCity].name+'-景点.kml';$('myMapsCityFile').textContent='下载'+cities[cityMapCity].name+'景点';
 if(!connected||onlineMapMode!=='mymaps'||!$('cityMapDialog').open)return;
 const v=myMapsCityView(index),url='https://www.google.com/maps/d/embed?mid='+encodeURIComponent(connectedMyMapsId)+'&ehbc=2E312F&ll='+v.lat.toFixed(6)+','+v.lon.toFixed(6)+'&z='+v.zoom;
 if(force||$('cityMyMapsFrame').getAttribute('src')!==url)$('cityMyMapsFrame').src=url;
 $('cityMyMapsFrame').title=cities[cityMapCity].name+' · 已导入景点的谷歌地图';
 $('myMapsFull').href='https://www.google.com/maps/d/viewer?mid='+encodeURIComponent(connectedMyMapsId)+'&ll='+v.lat.toFixed(6)+','+v.lon.toFixed(6)+'&z='+v.zoom;
 $('myMapsCurrent').textContent=index<0?cities[cityMapCity].name+' · '+cities[cityMapCity].spots.filter(s=>s.googleImported).length+' 处已导入景点':cities[cityMapCity].name+' · '+cities[cityMapCity].spots[index].n;
}
const onlineModeBeforeMyMaps=setOnlineMode;
setOnlineMode=function(mode){
 onlineModeBeforeMyMaps(mode==='mymaps'?'local':mode);onlineMapMode=mode;
 const my=mode==='mymaps';$('cityMyMapsPane').hidden=!my;$('myMapsMode').setAttribute('aria-pressed',String(my));
 if(my){$('localMapMode').setAttribute('aria-pressed','false');$('cityMapCanvas').hidden=true;document.querySelector('.city-map-foot').hidden=true;$('cityMapDialog').classList.add('google-mode');$('cityMapFit').textContent='显示本城全部景点';$('cityOnlineHint').textContent=connectedMyMapsId?'23 个目的地的 146 处景点已同步到 My Maps。右侧切换介绍时，地图保持原位置和缩放；需要移动地图时，点击“定位所选景点”。':'首次使用需要导入准备好的景点文件，并连接你的 My Maps 分享链接。';updateMyMapsFrame();}
 else if(mode==='google'){$('cityMapFit').textContent='定位当前景点';$('cityOnlineHint').textContent='点击地图中的地点可查看 Google 信息。右侧切换介绍时保留地图视野；点击“定位当前景点”再移动地图。';}
};
const syncBeforeMyMaps=syncOnlineSpot;
syncOnlineSpot=function(index,{focusMap=true,force=false}={}){if(onlineOpening||!focusMap)return;const p=cityCoordinates.find(p=>p.city===cityMapCity&&p.index===index),s=cities[cityMapCity].spots[index];if(p&&s)setOnlinePlace(p.lat+','+p.lon,s.n,16,force);else syncBeforeMyMaps(index);if(onlineMapMode==='mymaps')updateMyMapsFrame(index,force)};
const openDoneBeforeMyMaps=onlineCityMapOpened;
onlineCityMapOpened=function(id,spot){openDoneBeforeMyMaps(id,spot);if(id===cityMapCity){if(onlineMapMode==='mymaps')updateMyMapsFrame(spot);else if(onlineMapMode==='google'&&onlineMapQuery===onlineCityQuery())syncOnlineSpot(cityMapSelected>=0?cityMapSelected:0)}};

function initMyMaps(){
 $('googleMapMode').textContent='谷歌查周边';
 $('googleMapMode').insertAdjacentHTML('beforebegin','<button type="button" id="myMapsMode" aria-pressed="false">谷歌城市地图</button>');
 $('cityGooglePane').insertAdjacentHTML('afterend','<div class="city-mymaps-pane" id="cityMyMapsPane" hidden><div class="mymaps-manage" id="myMapsManage" hidden><strong id="myMapsCurrent"></strong><a id="myMapsFull" target="_blank" rel="noopener noreferrer">谷歌中打开 ↗</a><button type="button" id="myMapsSettings">连接设置</button></div><div class="mymaps-connect" id="myMapsConnect"><h3>把全部景点标在谷歌地图上</h3><p>导入文件包含 23 个目的地的 146 处基础景点；可用于备份或另建地图。</p><ol><li><a href="assets/mymaps/西班牙与葡萄牙全部景点.kml" download>下载全部 146 处景点文件</a>，或<a id="myMapsCityFile" download>只下载当前城市</a>。</li><li><a href="https://www.google.com/maps/d/" target="_blank" rel="noopener noreferrer">打开 Google My Maps ↗</a>，创建地图并点击图层“导入”，选择下载的文件。</li><li>将地图设为公开可查看，复制分享链接，粘贴到下方。文件只含公共景点资料。</li></ol><form id="myMapsLinkForm"><label for="myMapsLink">你的 My Maps 分享链接</label><div><input id="myMapsLink" type="url" placeholder="https://www.google.com/maps/d/…?mid=…" required><button type="submit">连接城市地图</button></div></form><p id="myMapsLinkError" role="alert"></p><a href="assets/mymaps/导入说明.md" target="_blank">完整导入说明 ↗</a></div><iframe id="cityMyMapsFrame" title="谷歌城市地图" referrerpolicy="no-referrer-when-downgrade" allowfullscreen hidden></iframe><p class="city-online-status" id="myMapsConnectStatus" role="status"></p></div>');
 $('myMapsMode').onclick=()=>setOnlineMode('mymaps');
 $('googleMapMode').onclick=()=>{setOnlineMode('google');syncOnlineSpot(cityMapSelected>=0?cityMapSelected:0)};
 $('myMapsCurrent').insertAdjacentHTML('afterend','<button type="button" id="myMapsLocate">定位所选景点</button>');
 $('myMapsLocate').onclick=()=>syncOnlineSpot(cityMapSelected>=0?cityMapSelected:0,{force:true});
 $('cityMapFit').onclick=()=>{if(onlineMapMode==='mymaps')updateMyMapsFrame(-1,true);else if(onlineMapMode==='google')syncOnlineSpot(cityMapSelected>=0?cityMapSelected:0,{force:true});else fitCityMap()};
 $('myMapsSettings').onclick=()=>{$('myMapsConnect').hidden=!$('myMapsConnect').hidden;if(!$('myMapsConnect').hidden){$('myMapsLink').value=connectedMyMapsId?'https://www.google.com/maps/d/viewer?mid='+connectedMyMapsId:'';updateMyMapsCityFile();}};
 $('myMapsLinkForm').onsubmit=e=>{e.preventDefault();const id=parseMyMapsLink($('myMapsLink').value.trim());if(!id){$('myMapsLinkError').textContent='请粘贴 Google My Maps 的完整分享链接（需包含 mid）。';return}connectedMyMapsId=id;try{localStorage.setItem('spain-mymaps-id',id)}catch(e){}$('myMapsLinkError').textContent='';setOnlineMode('mymaps')};
 if(connectedMyMapsId)onlineMapMode='mymaps';
}
function updateMyMapsCityFile(){$('myMapsCityFile').href='assets/mymaps/'+cities[cityMapCity].name+'-景点.kml';$('myMapsCityFile').textContent='下载'+cities[cityMapCity].name+'景点';}
initMyMaps();

// Portugal shares the imported My Maps layer; its offline street maps are not yet available.
function isPortugalCity(id){return cities[id]?.country==='Portugal'}
regionalKeys.add('c22-s03');regionalKeys.add('c23-s01');
const openBeforePortugal=openCityMap;
openCityMap=function(id,spot=-1){
 const portugal=isPortugalCity(id);
 if(portugal&&onlineMapMode==='local')onlineMapMode=connectedMyMapsId?'mymaps':'google';
 if($('myMapsMode')){$('myMapsMode').disabled=false;$('myMapsMode').title=''}
 if($('localMapMode')){$('localMapMode').disabled=portugal;$('localMapMode').title=portugal?'这两座城市暂未保存离线街道底图':''}
 openBeforePortugal(id,spot);
};
const modeBeforePortugal=setOnlineMode;
setOnlineMode=function(mode){
 if(window.TravelGoogleMap){onlineMapMode='interactive';window.TravelGoogleMap.activate();return}
 modeBeforePortugal(isPortugalCity(cityMapCity)&&mode==='local'?(connectedMyMapsId?'mymaps':'google'):mode);
};

// Restrict the custom context-menu behavior to city controls; the rest of the page retains its normal menu.
function bindCityMouseActions(button,id){
 id=Number(id);
 button.onclick=e=>{if(e.button===undefined||e.button===0)select(id,false)};
 button.oncontextmenu=e=>{e.preventDefault();e.stopPropagation();toggleDriveCity(id)};
 button.title=cities[id].name+' · 左键查看景点；右键加入或取消车程';
}

// Only points actually imported into My Maps use the combined layer.
const syncBeforeCharacter=syncOnlineSpot;
syncOnlineSpot=function(index,options={}){
 if(onlineOpening||options.focusMap===false)return;
 if(onlineMapMode==='interactive'){window.TravelGoogleMap?.focus(index);return}
 const s=cities[cityMapCity]?.spots[index];
 if(s&&s.googleImported===false&&onlineMapMode==='mymaps')setOnlineMode('google');
 syncBeforeCharacter(index,options);
 if(s&&s.googleImported===false&&onlineMapMode==='google')$('cityOnlineHint').textContent='此景点尚未导入 Google My Maps 整层，现已按参考坐标单独定位；可拖动、缩放查看周边信息。';
};
const openedBeforeCharacter=onlineCityMapOpened;
onlineCityMapOpened=function(id,spot){
 openedBeforeCharacter(id,spot);
 if(spot>=0&&cities[id]?.spots[spot]?.googleImported===false)syncOnlineSpot(spot);
};
for(const c of cities)for(const [i,s] of c.spots.entries())if(s.added&&/自然与风景/.test(s.cat))regionalKeys.add(mapKey(c.id,i));
const characterHeading=$('cultureHeading').closest('.section-top');
characterHeading.insertAdjacentHTML('afterend','<p class="character-intro">按城市与类型，寻找艺术、历史、地方文化和自然风景。</p>');

// Prices above are public examples; these editable values are planning assumptions.
const charterBudgetPresets={
 coast:{days:9,planIndex:3,label:'东海岸 15 天行程',period:'2027-04-05 至 2027-04-13',transfers:'4/5、4/7、4/8、4/10、4/12、4/13',airport:'4/2 巴塞罗那接机、4/15 马德里送机',special:'4/10 经龙达游览，全天约 8–9 小时；4/13 默认科尔多瓦直达马德里，不加托莱多。'},
 inland:{days:11,planIndex:4,label:'内陆 17 天行程',period:'2027-04-05 至 2027-04-15',transfers:'4/5–8、4/10、4/12、4/14、4/15',airport:'4/2 巴塞罗那接机、4/17 马德里送机',special:'4/14 格拉纳达至托莱多，含休息按 5–6 小时转场；4/15 含上午游览等待后送马德里。'}
};
function charterEuro(value){return new Intl.NumberFormat('zh-CN',{style:'currency',currency:'EUR',minimumFractionDigits:0,maximumFractionDigits:2}).format(value)}
function charterQuoteText(){
 const preset=charterBudgetPresets[$('charterBudgetRoute').value],people=$('charterBudgetPeople'),days=$('charterBudgetDays');
 const group=people.checkValidity()?people.value:'待定',duration=days.checkValidity()?days.value:'待定';
 const route=preset?plans[preset.planIndex].route.replace(/^上海 → /,'').replace(/ → 上海$/,''):'待补充每日起终点和途中停靠';
 return ['您好，想咨询西班牙带司机包车，请提供含税明细报价。',
  '行程：'+(preset?preset.label:'自定义行程')+'；同行 '+group+' 人（成人 / 儿童人数待补充）。',
  '用车日期：'+(preset?preset.period:'待补充')+'，共 '+duration+' 个计费日。',
  '路线：'+route+'。',
  ...(preset?['请分别报连续包车与仅以下转场日接送的总价：'+preset.transfers+'。','接送机单列：'+preset.airport+'。','途中安排：'+preset.special]:[]),
  '酒店地址、每日出发时间、大 / 小行李数量及尺寸、儿童座椅：待补充。',
  '请分别说明中文 / 英语司机是否可提供；景点内部讲解若另聘导游，请单列。',
  '请写明实际车型、可载乘客和行李数、每日服务时长与里程、计时起终点、超时 / 超公里单价。',
  '请逐项说明 IVA、燃油、路桥、停车、司机食宿、空驶 / 调车、接送机等待是否已含。',
  '请说明订金、尾款、取消 / 改期条件，以及门票、讲解和小费是否另付。'].join('\n');
}
function updateCharterBudget(){
 const fields=['Days','People','Rate','Extras','Reserve'].map(key=>$('charterBudget'+key));
 let valid=true;for(const field of fields){const ok=field.checkValidity();field.setAttribute('aria-invalid',String(!ok));valid=valid&&ok}
 const outputs=['Total','PerPerson','Base','ExtraTotal','Buffer'];
 if(!valid){outputs.forEach(key=>$('charterBudget'+key).textContent='—');$('charterBudgetMessage').textContent='请填写有效数字：天数 1–60、人数 1–50（均为整数）；日价 €1–20,000，附加费 €0–100,000，预留为 0–100% 的整数。';return}
 const [days,people,rate,extras,reserve]=fields.map(field=>Number(field.value));
 const base=days*rate,buffer=(base+extras)*reserve/100,total=base+extras+buffer;
 $('charterBudgetTotal').textContent=charterEuro(total);
 $('charterBudgetPerPerson').textContent=charterEuro(total/people);
 $('charterBudgetBase').textContent=charterEuro(rate)+' × '+days+' = '+charterEuro(base);
 $('charterBudgetExtraTotal').textContent=charterEuro(extras);
 $('charterBudgetBuffer').textContent=reserve+'% = '+charterEuro(buffer);
 $('charterBudgetMessage').textContent='按 '+days+' 天、'+people+' 人均摊；预留按日价合计与附加费之和计算。'+(people>7?'超过 7 人，请按实际车型或多车合计日价填写；此处不会自动升级车型。':'人数用于平均分摊，车型、行李和儿童座椅仍需确认。');
}
let charterQuoteEdited=false;
function refreshCharterQuote(force=false){
 if(charterQuoteEdited&&!force){$('charterCopyStatus').textContent='用车参数已更新；已保留手动修改的草稿，可按当前参数重新生成。';return}
 $('charterQuoteDraft').value=charterQuoteText();$('charterCopyStatus').textContent='';charterQuoteEdited=false;
}
function initCharterResearch(){
 const form=$('charterBudgetForm');
 $('charterQuoteDraft').addEventListener('input',()=>{charterQuoteEdited=true;$('charterCopyStatus').textContent=''});
 $('charterRegenerateQuote').addEventListener('click',()=>refreshCharterQuote(true));
 form.addEventListener('submit',e=>e.preventDefault());
 form.addEventListener('input',e=>{
  if(e.target.id==='charterBudgetDays')$('charterBudgetRoute').value='custom';
  updateCharterBudget();
  if(['charterBudgetDays','charterBudgetPeople'].includes(e.target.id))refreshCharterQuote();
 });
 $('charterBudgetRoute').addEventListener('change',()=>{
  const preset=charterBudgetPresets[$('charterBudgetRoute').value];if(preset)$('charterBudgetDays').value=preset.days;
  updateCharterBudget();refreshCharterQuote();
 });
 document.querySelectorAll('[data-charter-preset]').forEach(button=>button.addEventListener('click',()=>{
  $('charterBudgetRoute').value=button.dataset.charterPreset;
  $('charterBudgetRoute').dispatchEvent(new Event('change'));
  revealPageTarget($('charterBudget')).scrollIntoView({behavior:'instant',block:'start'});$('charterBudgetRate').focus({preventScroll:true});
 }));
 $('charterCopyQuote').addEventListener('click',async()=>{
  const button=$('charterCopyQuote'),draft=$('charterQuoteDraft'),status=$('charterCopyStatus');button.disabled=true;
  try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(draft.value);status.textContent='已复制，可粘贴给车行。'}
  catch{draft.focus();draft.select();status.textContent='已选中草稿，请长按复制或按 Ctrl/Cmd+C。'}
  finally{button.disabled=false}
 });
 updateCharterBudget();refreshCharterQuote();
}
initCharterResearch();
$('charterResearch').insertAdjacentHTML('beforeend','<div class="charter-note"><h3>特内里费岛内包车</h3><p>询价写明 TFN 或 TFS、南北住宿区、每日路线与行李数；岛内车辆单独报价。泰德山路、夜间观星、马斯卡公交与船只接驳应逐项写清，不能把车程合计当全天包车工时。</p><a href="#tenerife">查看全岛分区行程 →</a> · <a href="#driving">查看岛内车程 →</a></div>');

$('cultureStays').innerHTML=cultureStays.map(stay=>'<article class="stay-card"><small>'+safe(stay.route)+'</small><h3>'+safe(cities[stay.city].name)+'<span>'+safe(stay.priority)+'</span></h3><p class="stay-nights">'+safe(stay.nights)+'</p><p><b>多出的半天：</b>'+safe(stay.halfday)+'</p><button class="culture-link" type="button" data-culture-city="'+stay.city+'">查看本城文化与风景 ↘</button></article>').join('');
