const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
function loadData(bundles){
  const context=vm.createContext({});
  for(const file of ['assets/data/photo-assets.js','assets/data/catalog.js',...bundles.map(name=>'assets/data/'+name+'.js')])vm.runInContext(read(file),context,{filename:file});
  vm.runInContext(`const safe=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');`,context);
  vm.runInContext(read('assets/hotel-ui.js'),context);
  return context;
}
module.exports={root,read,loadData};
