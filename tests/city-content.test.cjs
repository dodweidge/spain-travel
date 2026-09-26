const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),vm=require('vm');
const {root,read,loadData}=require('./project-data.cjs');
const ctx=loadData(['travel-notes','travel-screenshots','edition-hotels','only-you-hotels','hotel-prices','hotel-enrichment','premium-hotels','claridge-hotel','city-introductions']);
const content=vm.runInContext('({cities,cityIntroductions,photoAssets})',ctx);
assert.equal(Object.keys(content.cityIntroductions).length,23);
let photos=0,overviews=0;
for(const city of content.cities){
  const intro=content.cityIntroductions[city.id];
  for(const field of ['history','today','lead'])assert.ok(intro[field]?.length>20,city.name+' '+field);
  assert.ok(intro.approach.title&&intro.approach.text.length>30,city.name+' visiting approach');
  assert.ok(intro.sources.length>=1);
  if(intro.overview){overviews++;assert.ok(intro.regionMap,city.name+' regional map alongside aerial');assert.ok(intro.regionMap.width>=1000,city.name+' readable full-size map');}
  for(const photo of [intro.hero,intro.overview,intro.regionMap,...intro.sections.flatMap(s=>s.images)].filter(Boolean)){
    const asset={...content.photoAssets[photo.path],...photo};
    assert.ok(fs.existsSync(path.join(root,asset.path)),asset.path);
    assert.ok(asset.width>0&&asset.height>0&&asset.caption&&asset.artist&&asset.license&&asset.source,asset.path+' attribution');
    photos++;
  }
}
assert.equal(overviews,23);assert.equal(photos,164);
assert.ok(content.cityIntroductions[4].overview.caption.includes('1932'));
const hotels=vm.runInContext('cities.flatMap(c=>c.spots.filter(s=>s.placeType==="hotel"))',ctx);
assert.equal(hotels.length,73);assert.equal(new Set(hotels.map(h=>h.importId)).size,73);
for(const h of hotels){
  const markup=vm.runInContext('renderHotelPrice('+JSON.stringify(h)+')',ctx);
  assert.ok(markup.includes('¥')&&!/NaN|undefined|Infinity/.test(markup),h.en+' converted price');
}
// All presentation types must follow the configured budget exchange rate.
vm.runInContext('hotelPriceBundle.cnyBudgetRate=9',ctx);
assert.equal(vm.runInContext('hotelYuan(100)',ctx),'¥900');
const claridge=vm.runInContext('cities[4].spots.find(s=>s.importId===claridgeHotel.id)',ctx);
const rate=vm.runInContext('hotelPriceBundle.hotels[claridgeHotel.id].rooms[0].from',ctx);
assert.ok(vm.runInContext('renderHotelPrice('+JSON.stringify(claridge)+')',ctx).includes(Math.round(rate*9).toLocaleString('zh-CN')));
assert.equal((read('图片来源与授权.html').match(/data-gallery=/g)||[]).length,100);
assert.ok(read('图片来源与授权.html').includes('<script src="assets/photo-credits.js"></script>'));
assert.equal((read('图片来源与授权.html').match(/data-photo=/g)||[]).length,46);
console.log('PASS: 23 concise city essays, 164 attributed images, 23 aerial/map pairs, 73 unique hotels and shared currency conversion.');
