const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const {root,read,loadData}=require('./project-data.cjs');
const html=read('index.html'),ctx=loadData(['travel-notes','travel-screenshots','edition-hotels','only-you-hotels','hotel-prices','hotel-enrichment']);
const data=vm.runInContext('({cities,cityCoordinates,photos,photoGalleries,hotelPriceBundle,hotelEnrichmentBundle})',ctx);
const hotels=data.cities.flatMap(c=>c.spots.flatMap((s,i)=>s.placeType==='hotel'?[{c:c.id,i,s,key:`c${String(c.id+1).padStart(2,'0')}-s${String(i+1).padStart(2,'0')}`}]:[]));
const only=hotels.filter(h=>/only.?you/i.test(h.s.en));assert.equal(only.length,5);
assert.equal(hotels.filter(h=>h.s.importId.startsWith('hilton-')).length,35);
assert.equal(only.find(h=>h.c===3).s.importId,'mira-onlyyou');assert.equal(only.find(h=>h.c===3).key,'c04-s19');
assert.ok(only.find(h=>h.c===3).s.travelNotes);assert.ok(data.photoGalleries['c04-s19'].length>0);
assert.equal(new Set(data.cityCoordinates.map(p=>p.key)).size,data.cityCoordinates.length);
const ids=hotels.map(h=>h.s.importId);assert.equal(new Set(ids).size,ids.length);
for(const h of hotels){
 assert.ok(data.hotelPriceBundle.hotels[h.s.importId].name,h.s.en+' rate label');
 assert.equal(data.cityCoordinates.filter(p=>p.key===h.key&&Number.isFinite(p.lat)&&Number.isFinite(p.lon)).length,1,h.s.en);
 assert.ok(data.photos.some(p=>p.key===h.key),h.s.en+' cover');
 assert.ok(data.photoGalleries[h.key]?.length,h.s.en+' gallery');
 for(const p of data.photoGalleries[h.key])assert.ok(fs.existsSync(path.join(root,p.path)),p.path);
 const markup=vm.runInContext(`renderHotelPrice(cities[${h.c}].spots[${h.i}])`,ctx);assert.ok(markup.includes('hotel-room-table'),h.s.en);assert.ok(!/NaN|Infinity|undefined/.test(markup),h.s.en);
 if(h.s.importId==='hilton-vlcchqq'){assert.ok(markup.includes('2027-04-15'));assert.ok(markup.includes('其他日期参考'));}
 if(h.s.importId==='hilton-bcndmhi')assert.ok(markup.includes('该日期官网暂无可订报价'));
 if(h.s.importId==='only-you-atocha')assert.ok(markup.includes('未再次追加 VAT'));
}
assert.ok(html.indexOf('hotel-prices.js')<html.indexOf('hotel-enrichment.js'));
assert.ok(html.indexOf('hotel-enrichment.js')<html.indexOf('assets/maps/google-map.js'));
assert.ok(read('assets/app.js').includes('+renderHotelCoverage(c.id)+'));
{const credits=fs.readFileSync(path.join(root,'图片来源与授权.html'),'utf8');for(const h of hotels.filter(h=>h.s.importId.startsWith('hilton-')||h.s.importId.startsWith('only-you-')))assert.ok(credits.includes('id="'+h.key+'"'),h.s.en+' photo attribution anchor');}
console.log('PASS:',hotels.length,'unique hotels;',only.length,'Only YOU; 35 Hilton; coordinates, preserved Sevilla notes, galleries, rate rendering and date exceptions.');


// Repeated registration must preserve hotel identities and all map keys.
const before=vm.runInContext('JSON.stringify([cities.map(c=>c.spots.length),cityCoordinates.length,photos.length])',ctx);
for(const name of ['only-you-hotels','hotel-enrichment']){const source=fs.readFileSync(path.join(root,'assets/data',name+'.js'),'utf8');vm.runInContext(source.slice(source.indexOf('(() => {')),ctx);}
assert.equal(vm.runInContext('JSON.stringify([cities.map(c=>c.spots.length),cityCoordinates.length,photos.length])',ctx),before);

// Estimates must remain distinct from real quotes and never imply room availability.
const estimated=Object.entries(data.hotelPriceBundle.hotels).filter(([,r])=>r.budgetEstimate);
assert.equal(estimated.length,4);
for(const [id,r]of estimated){
 const e=r.budgetEstimate;assert.ok(e.low>0&&e.low<=e.planning&&e.planning<=e.high);assert.ok(e.sources.length);
 assert.ok(r.rooms.every(room=>room.from===null),'do not replace missing official quotes with invented quotes');
 const h=hotels.find(h=>h.s.importId===id);const markup=vm.runInContext('renderHotelPrice(cities['+h.c+'].spots['+h.i+'])',ctx);
 for(const text of ['预算估算','非实时可订报价','人工估算','该日期官网暂无可订报价',String(e.low),String(e.high),String(e.planning)])assert.ok(markup.includes(text),id+' '+text);
 assert.ok(!markup.includes('本次最低房型起价'));
}
// A later observed quote must take precedence over a stored estimate.
vm.runInContext("hotelPriceBundle.hotels['hilton-bcngvhx'].rooms[0].from=199",ctx);
const target=hotels.find(h=>h.s.importId==='hilton-bcngvhx');
const refreshed=vm.runInContext('renderHotelPrice(cities['+target.c+'].spots['+target.i+'])',ctx);
assert.ok(refreshed.includes('€199'));assert.ok(!refreshed.includes('预算估算'));
