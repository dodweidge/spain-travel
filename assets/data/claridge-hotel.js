// Official property information, checked 2026-09-26. Public From rates are not date-specific quotes.
const claridgeHotel={
  "id": "gran-hotel-claridge-granada",
  "city": 4,
  "n": "格拉纳达 Gran Hotel Claridge 酒店",
  "en": "Gran Hotel Claridge Granada",
  "kind": "5 星 · 大教堂旁高端酒店",
  "address": "Plaza de Villamena 1, 18001 Granada, Spain",
  "source": "https://www.granhotelclaridge.com/en/",
  "lat": 37.177325,
  "lon": -3.59913,
  "coordinateSource": "https://maps.app.goo.gl/M95TFJnCWaknLw5w7",
  "d": "位于格拉纳达历史中心、大教堂旁的五星酒店。纳斯里风格装饰、庭院与景观露台结合，适合重视老城位置、设计和完整酒店服务的旅客。",
  "highlights": "大教堂景观房；屋顶餐饮露台；INIZIO 餐厅；Wellness & SPA；24 小时健身房；私人停车",
  "tip": "庭院房和 Villamena 街景房不等于大教堂景观房；看大教堂请明确选择 Catedral Views 或 Terrace。包车上下客及停车入口提前与酒店确认。",
  "checked": "2026-09-26",
  "rooms": [
    {
      "name": "庭院豪华房",
      "en": "Deluxe Gran Patio",
      "sqm": 25,
      "from": 219
    },
    {
      "name": "Villamena 街景豪华房",
      "en": "Deluxe Villamena",
      "sqm": 25,
      "from": 241
    },
    {
      "name": "大教堂景观尊享房",
      "en": "Premium Cathedral Views",
      "sqm": 25,
      "from": 262
    },
    {
      "name": "大教堂景观露台房",
      "en": "Premium Cathedral Terrace",
      "sqm": 25,
      "from": 295
    },
    {
      "name": "Mercader 小套房",
      "en": "Junior Suite Mercader",
      "sqm": 38,
      "from": 306
    },
    {
      "name": "庭院小套房",
      "en": "Junior Suite Gran Patio",
      "sqm": 50,
      "from": 317
    },
    {
      "name": "Marco Polo 双卧套房",
      "en": "Suite Marco Polo",
      "sqm": 80,
      "from": 459
    },
    {
      "name": "大教堂双卧套房",
      "en": "Suite Catedral",
      "sqm": 80,
      "from": 569
    },
    {
      "name": "Gran Claridge 大教堂套房",
      "en": "Gran Claridge Catedral Suite",
      "sqm": 116,
      "from": 1203
    }
  ],
  "photos": [
    {
      "path": "assets/hotels/gran-hotel-claridge-granada/1.jpg",
      "original": "https://images.mirai.com/INFOROOMS/100380540/Q4ENZDZFJt8cDml2rkmM/Q4ENZDZFJt8cDml2rkmM_large.jpg",
      "caption": "庭院豪华房 · 酒店官方图片",
      "source": "https://www.granhotelclaridge.com/alojamientos/",
      "artist": "Gran Hotel Claridge Granada／酒店官方",
      "license": "版权归原权利人；未声明开放许可"
    },
    {
      "path": "assets/hotels/gran-hotel-claridge-granada/2.jpg",
      "original": "https://images.mirai.com/INFOROOMS/100380540/qnFWWLLlCUhRaDgc7f6T/qnFWWLLlCUhRaDgc7f6T_large.jpg",
      "caption": "大教堂景观尊享房 · 酒店官方图片",
      "source": "https://www.granhotelclaridge.com/alojamientos/",
      "artist": "Gran Hotel Claridge Granada／酒店官方",
      "license": "版权归原权利人；未声明开放许可"
    },
    {
      "path": "assets/hotels/gran-hotel-claridge-granada/3.jpg",
      "original": "https://images.mirai.com/INFOROOMS/100380540/GDR1ZM12QeSidPVNU5JT/GDR1ZM12QeSidPVNU5JT_large.jpg",
      "caption": "大教堂景观露台房 · 酒店官方图片",
      "source": "https://www.granhotelclaridge.com/alojamientos/",
      "artist": "Gran Hotel Claridge Granada／酒店官方",
      "license": "版权归原权利人；未声明开放许可"
    },
    {
      "path": "assets/hotels/gran-hotel-claridge-granada/4.jpg",
      "original": "https://images.mirai.com/INFOROOMS/100380540/M4x2vxJlrrTKxcJZ7ZLc/M4x2vxJlrrTKxcJZ7ZLc_large.jpg",
      "caption": "Mercader 小套房 · 酒店官方图片",
      "source": "https://www.granhotelclaridge.com/alojamientos/",
      "artist": "Gran Hotel Claridge Granada／酒店官方",
      "license": "版权归原权利人；未声明开放许可"
    },
    {
      "path": "assets/hotels/gran-hotel-claridge-granada/pool-cathedral-user.png",
      "original": "assets/hotels/gran-hotel-claridge-granada/pool-cathedral-user.png",
      "caption": "屋顶泳池与大教堂景观 · 用户提供的视频截图",
      "source": "图片来源与授权.html#claridge-user-screenshot",
      "artist": "画面水印：Fafa_yasmina／bilibili；用户提供截图",
      "license": "版权归原权利人；原视频链接未提供，保留原图水印"
    }
  ]
};
(() => {
 const h=claridgeHotel,c=cities[h.city];let index=c.spots.findIndex(s=>s.importId===h.id||s.en===h.en);
 if(index<0){index=c.spots.length;c.spots.push({n:h.n,en:h.en,kind:h.kind,address:h.address,source:h.source,d:h.d,highlights:h.highlights,tip:h.tip,duration:'按行程安排住宿',cat:'酒店',placeType:'hotel',importId:h.id,q:h.en+' '+h.address,added:h.checked});}
 const key='c'+String(c.id+1).padStart(2,'0')+'-s'+String(index+1).padStart(2,'0');
 if(!cityCoordinates.some(p=>p.key===key))cityCoordinates.push({key,city:c.id,index,name:h.n,title:h.en,lang:'en',lat:h.lat,lon:h.lon,source:h.coordinateSource});
 const gallery=photoGalleries[key]||[];for(const p of h.photos)if(!gallery.some(x=>x.path===p.path))gallery.push({...p,key,licenseUrl:p.source,attributionAnchor:key});photoGalleries[key]=gallery;
 if(!photos.some(p=>p.key===key))photos.push(gallery[0]);
 hotelPriceBundle.hotels[h.id]={name:h.en,quoteType:'official-public-from',checked:h.checked,rooms:h.rooms,priceSource:'https://www.granhotelclaridge.com/alojamientos/'};
})();
