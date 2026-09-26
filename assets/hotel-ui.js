// All hotel prices use the same explicit budget exchange rate.
function hotelEuro(value) {
  return "€" + Number(value).toLocaleString("en-US", {maximumFractionDigits: 2});
}
function hotelYuan(value, approximate = false) {
  return (approximate ? "约 " : "") + "¥" + Math.round(value * hotelPriceBundle.cnyBudgetRate).toLocaleString("zh-CN");
}
function renderHotelPrice(s){
  if(s.placeType!=='hotel'||typeof hotelPriceBundle==='undefined')return '';
  const rate=hotelPriceBundle.hotels[s.importId];
  if(!rate)return '';
  if(rate.quoteType==='official-public-from')return renderPublicHotelPrice(s,rate);
  if(rate.quoteType==='planning-estimate')return renderPlanningHotelPrice(s,rate);
  if(rate.budgetEstimate&&rate.quoteType==='official-from'&&rate.rooms.every(r=>!Number.isFinite(r.from)))return renderEstimatedHotelPrice(s,rate);
  const eur=hotelEuro, yuan=value=>hotelYuan(value,true);
  const official=rate.quoteType==='official-from';
  const date=rate.checkin||hotelPriceBundle.checkin, checkout=rate.checkout||hotelPriceBundle.checkout;
  const money=rate.rooms.flatMap(r=>official?(Number.isFinite(r.from)?[r.from]:[]):r.offers.map(o=>o.total));
  const cell=(r,b)=>{const offers=r.offers.filter(o=>o.breakfast===b);return '<td>'+(offers.length?offers.map(o=>'<div class="hotel-rate-option"><span>'+(o.refundable?'可退':'不可退')+'</span><b>'+eur(o.total)+'</b><small class="hotel-price-cny">'+yuan(o.total)+'</small>'+(o.refundable&&o.cancelBefore?'<small>'+safe(o.cancelBefore.slice(5).replace('-','/'))+' 前取消</small>':'')+'</div>').join(''):'<span class="hotel-rate-empty">未见该方案</span>')+'</td>';};
  const table=rooms=>'<div class="hotel-table-scroll" role="region" aria-label="'+safe(rate.name)+'双人房型价格" tabindex="0"><table class="hotel-room-table"><caption>每间每晚 · '+(official?'官网房型起价（方案条件与税费见官网）':rate.taxIncluded?'页面列出的含税费价格':'已计入页面列出的税费（估算）')+'</caption><thead><tr><th scope="col">房型</th>'+(official?'<th scope="col">官网起价</th>':'<th scope="col">不含早餐</th><th scope="col">含两人早餐</th>')+'</tr></thead><tbody>'+rooms.map(r=>'<tr><th scope="row"><strong>'+safe(r.name)+'</strong>'+(r.en?'<small>'+safe(r.en)+'</small>':'')+(r.sqm||r.bed?'<small>'+(r.sqm?'约 '+safe(r.sqm)+'㎡':'')+(r.sqm&&r.bed?' · ':'')+safe(r.bed||'')+'</small>':'')+'</th>'+(official?'<td>'+(Number.isFinite(r.from)?'<b>'+eur(r.from)+' 起</b><small class="hotel-price-cny">'+yuan(r.from)+' 起</small>':'<span class="hotel-rate-empty">该日期官网暂无报价</span>')+'</td>':cell(r,false)+cell(r,true))+'</tr>').join('')+'</tbody></table></div>';
  const roomHtml=table(rate.rooms.slice(0,4))+(rate.rooms.length>4?'<details class="hotel-more-rooms"><summary>查看其余 '+(rate.rooms.length-4)+' 个房型／套餐</summary>'+table(rate.rooms.slice(4))+'</details>':'');
  const budget=money.length?'<p class="hotel-price-budget">本次最低'+(official?'房型起价':rate.taxIncluded?'含税费报价':'含税估算')+' '+eur(Math.min(...money))+' / 间晚（'+yuan(Math.min(...money))+'）。人民币按 €1≈¥'+hotelPriceBundle.cnyBudgetRate+' 粗算，非实时汇率。</p>':'<p class="hotel-price-budget">该日期官网暂无可订报价；不代表其他日期或渠道也无房。</p>';
  const breakfast=Number.isFinite(rate.breakfast)?'<p class="hotel-price-breakfast">早餐单买：页面列 '+eur(rate.breakfast)+'（'+yuan(rate.breakfast)+'）/ 成人，两人 '+eur(rate.breakfast*2)+'（'+yuan(rate.breakfast*2)+'）；结算税费以订单为准。</p>':'';
  const method=official?'<p>官网 From 起价可能含会员／预付优惠；早餐、退改和税费以具体方案为准。</p>':'<details><summary>查询口径、原始报价与退订说明</summary><p>'+safe(hotelPriceBundle.method)+'</p><p>'+(rate.taxIncluded?'本次页面明确显示“含税费及其他费用”，这里直接采用该金额，未再次追加 VAT。可退方案的取消日期以预订条款及当地时间为准。':safe(hotelPriceBundle.conditions)+' '+safe(hotelPriceBundle.taxMethod))+'</p><p>页面原始报价（每间／每晚）：</p><ul class="hotel-source-rates">'+rate.rooms.map(r=>'<li><strong>'+safe(r.name)+'</strong>：'+r.offers.map(o=>(o.breakfast?'含双早':'不含早')+' / '+(o.refundable?'可退':'不可退')+' '+eur(o.sourcePrice)+'（'+yuan(o.sourcePrice)+'）').join('；')+'</li>').join('')+'</ul></details>';
  return '<section class="hotel-price" aria-label="'+safe(rate.name)+'房价参考"><div class="hotel-price-head"><strong>双人住宿 · '+(official?'官网房型起价':'按房型比价')+'</strong><span>2 位成人 / 1 间 / 1 晚</span></div><p class="hotel-price-date"><strong>'+safe(date)+' 入住 → '+safe(checkout)+' 退房</strong><br>核对：'+safe(rate.checked||hotelPriceBundle.checked)+' · 单日样本</p>'+(rate.note?'<p class="hotel-price-date">'+safe(rate.note)+'</p>':'')+roomHtml+budget+breakfast+method+'<div class="hotel-price-links"><a href="'+safe(rate.priceSource)+'" target="_blank" rel="noopener noreferrer">'+(official?'查看上述日期官网房型与方案':'同日期双人报价 · Booking.com')+' ↗</a><a href="'+safe(s.source)+'" target="_blank" rel="noopener noreferrer">酒店官网 ↗</a></div></section>';
}

function renderEstimatedHotelPrice(s,rate){
  const e=rate.budgetEstimate;
  const eur=hotelEuro, yuan=hotelYuan;
  const sources=e.sources.map(p=>'<li><a href="'+safe(p.url)+'" target="_blank" rel="noopener noreferrer">'+safe(p.label)+' ↗</a><p>'+safe(p.note)+'</p></li>').join('');
  return '<section class="hotel-price hotel-estimate" aria-label="'+safe(rate.name)+'估算房价">'
    +'<div class="hotel-price-head"><strong>预算估算 · 非实时可订报价</strong><span>2 位成人 / 1 间或套 / 1 晚</span></div>'
    +'<p class="hotel-price-date">用于 '+safe(rate.checkin||hotelPriceBundle.checkin)+' → '+safe(rate.checkout||hotelPriceBundle.checkout)+' 的预算规划 · 整理于 '+safe(e.checked)+'</p>'
    +'<div class="hotel-table-scroll" role="region" aria-label="'+safe(rate.name)+'基础房预算估算" tabindex="0"><table class="hotel-room-table"><caption>每间／套每晚 · 人工估算</caption><thead><tr><th scope="col">估算范围</th><th scope="col">预算区间</th></tr></thead><tbody><tr><th scope="row">'+safe(e.roomScope)+'</th><td><strong>'+eur(e.low)+'–'+eur(e.high)+'</strong><small>约 '+yuan(e.low)+'–'+yuan(e.high)+'</small></td></tr></tbody></table></div>'
    +'<p class="hotel-price-budget">建议先预留 '+eur(e.planning)+' / 间晚（约 '+yuan(e.planning)+'；€1≈¥'+hotelPriceBundle.cnyBudgetRate+' 为预算换算，非实时汇率）。</p>'
    +'<p>'+safe(e.basis)+'</p><p class="hotel-price-date">该日期官网暂无可订报价；此预算据其他日期估算，不代表有房。早餐、退改与税费待确认，实际价格可能超出区间。</p>'
    +'<details><summary>查看网上参考价格与估算依据</summary><ul class="hotel-source-rates">'+sources+'</ul></details>'
    +'<details class="hotel-more-rooms"><summary>查看原有 '+rate.rooms.length+' 个房型（目标日期报价仍待确认）</summary><ul>'+rate.rooms.map(r=>'<li>'+safe(r.name)+'</li>').join('')+'</ul><p>估算仅适用于表中基础住宿，不适用于升级房型。</p></details>'
    +'<div class="hotel-price-links"><a href="'+safe(rate.priceSource)+'" target="_blank" rel="noopener noreferrer">查目标日期实时房价 ↗</a><a href="'+safe(s.source)+'" target="_blank" rel="noopener noreferrer">酒店官网 ↗</a></div></section>';
}

function renderPlanningHotelPrice(s,rate){
 const eur=hotelEuro, yuan=hotelYuan;
 return '<section class="hotel-price hotel-estimate"><h4>房型与住宿预算</h4><p><strong>人工预算 · 非实时可订报价</strong></p><p>2027 年春季 · 未定日期 · 2 人／间／晚</p>'
 +'<div class="hotel-table-scroll" role="region" aria-label="'+safe(rate.name)+'房型预算" tabindex="0"><table class="hotel-room-table"><thead><tr><th scope="col">房型</th><th scope="col">估算预算／晚</th></tr></thead><tbody>'+rate.rooms.map(r=>'<tr><th scope="row"><strong>'+safe(r.name)+'</strong>'+(r.size?'<small>'+safe(r.size)+'</small>':'')+'</th><td><strong>'+eur(r.low)+'–'+eur(r.high)+'</strong><br><small>约 '+yuan(r.low)+'–'+yuan(r.high)+'</small></td></tr>').join('')+'</tbody></table></div>'
 +'<p>'+safe(rate.sample)+'</p><p>升级房型按档次估算。早餐、税费、退改和房态待核实，节庆可能超出区间。人民币按 €1≈¥'+hotelPriceBundle.cnyBudgetRate+' 换算。</p>'
 +'<p><a href="'+safe(rate.source)+'" target="_blank" rel="noopener">酒店官方资料 ↗</a> · <a href="'+safe(rate.priceSource)+'" target="_blank" rel="noopener">价格参考来源 ↗</a><br>资料核对：'+safe(premiumHotelBundle.checked)+'</p></section>';
}
function renderPublicHotelPrice(s,rate){
 const row=r=>'<tr><th scope="row"><strong>'+safe(r.name)+'</strong><small>'+safe(r.en)+' · '+r.sqm+'㎡</small></th><td><b>'+hotelEuro(r.from)+' 起</b><br><small>'+hotelYuan(r.from,true)+' 起</small></td></tr>';
 const table=rooms=>'<div class="hotel-table-scroll" role="region" aria-label="'+safe(rate.name)+'官网公开起价" tabindex="0"><table class="hotel-room-table"><caption>每间每晚 · 官网未选日期的公开 From 起价</caption><thead><tr><th scope="col">房型</th><th scope="col">官网参考起价</th></tr></thead><tbody>'+rooms.map(row).join('')+'</tbody></table></div>';
 return '<section class="hotel-price"><div class="hotel-price-head"><strong>房型与官网参考起价</strong></div><p class="hotel-price-date">核对于 '+safe(rate.checked)+' · 未锁定入住日期与人数，非本次行程的可订报价。</p>'+table(rate.rooms.slice(0,4))+'<details class="hotel-more-rooms"><summary>查看其余 '+(rate.rooms.length-4)+' 个套房房型</summary>'+table(rate.rooms.slice(4))+'</details><p>早餐、税费、退改与房态以所选日期及人数为准。人民币按 €1≈¥'+hotelPriceBundle.cnyBudgetRate+' 换算。多人套房价格也按每间每晚列示。</p><div class="hotel-price-links"><a href="'+safe(rate.priceSource)+'" target="_blank" rel="noopener noreferrer">查看官网房型与最新价格 ↗</a><a href="'+safe(s.source)+'" target="_blank" rel="noopener noreferrer">酒店官网 ↗</a></div></section>';
}

function renderHotelCoverage(id) {
  const hilton=hotelEnrichmentBundle.hotels.filter(h=>h.city===id);
  const premium=typeof premiumHotelBundle==='undefined'?[]:premiumHotelBundle.hotels.filter(h=>h.city===id);
  const status=hilton.length?'希尔顿旗下 '+hilton.length+' 家（含标注的市郊、机场与待开业门店）':'未查到希尔顿旗下酒店';
  return '<details class="guide-note"><summary>酒店品牌核查 · '+status+'</summary><p>'+safe(hotelEnrichmentBundle.scope)+' 核对：'+safe(hotelEnrichmentBundle.checked)+'</p><a href="酒店整理与核查.html#city-'+id+'" target="_blank" rel="noopener">品牌与位置说明 ↗</a>'+(premium.length?' · <a href="各城精选酒店.html#city-'+id+'" target="_blank" rel="noopener">精选住宿与预算依据 ↗</a>':'')+'</details>';
}
