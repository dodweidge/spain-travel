// Only YOU properties in the site's existing destinations. Checked 2026-09-25.
const onlyYouHotelBundle = {
  checked: '2026-09-25',
  directory: 'https://www.onlyyouhotels.com/en/hotels/',
  coverage: '现有目的地对应马德里两家，以及瓦伦西亚、马拉加、塞维利亚各一家。伊维萨岛不在当前目的地列表中。',
  hotels: [
    {
      city: 0, cityName: 'Madrid', id: 'only-you-boutique-madrid',
      name: 'Only YOU 马德里精品酒店', en: 'Only YOU Boutique Hotel Madrid',
      address: 'Calle Barquillo 21, 28004 Madrid, Spain',
      description: '位于 Salesas／Chueca 一带，由十九世纪宅邸改造，适合步行探索马德里市中心、街区商店与餐饮。',
      highlights: '历史宅邸与现代室内设计；可体验 YOUNIQUE Arts Club、Padrino 鸡尾酒吧和 Celicioso 餐饮空间。',
      tip: '这是 Barquillo 街的 Boutique 门店，与 Atocha 火车站旁的另一家 Only YOU 不同，预订和导航时请核对门店名称。',
      slug: 'only-you-boutique-hotel-madrid',
      lat: 40.4222558, lon: -3.6957491,
      coordinateSource: 'https://maps.app.goo.gl/tKnnnEuHtxfVinrr6'
    },
    {
      city: 0, cityName: 'Madrid', id: 'only-you-atocha',
      name: 'Only YOU 阿托查酒店', en: 'Only YOU Hotel Atocha',
      address: 'Paseo de la Infanta Isabel 13, 28014 Madrid, Spain',
      description: '位于 Atocha 火车站对面，靠近丽池公园和艺术博物馆区，适合将马德里看展与高铁跨城行程结合。',
      highlights: '历史建筑外立面、中央庭院和都市风格客房；顶层 Sép7ima 餐厅可欣赏城市景色。',
      tip: '火车出发前仍需为步行进站、安检和找站台留足时间；这是 Atocha 门店，与 Chueca 的 Boutique 门店不同。',
      slug: 'only-you-hotel-atocha',
      lat: 40.4072946, lon: -3.688325,
      coordinateSource: 'https://maps.app.goo.gl/npM9FC868SwJD2Q46'
    },
    {
      city: 2, cityName: 'Valencia', id: 'only-you-valencia',
      name: 'Only YOU 瓦伦西亚酒店', en: 'Only YOU Hotel Valencia',
      address: 'Plaza Rodrigo Botet 5, 46002 Valencia, Spain',
      description: '位于瓦伦西亚老城中心、靠近市政厅广场，适合步行游览中央市场、丝绸交易厅和主教座堂一带。',
      highlights: 'Lázaro Rosa-Violán 设计的室内空间；顶层 El Mirador 餐厅提供城市景观和米饭料理。',
      tip: '可比较内向客房与带城市景观的房型；餐厅预订、早餐及具体房型设施以酒店确认信息为准。',
      slug: 'only-you-hotel-valencia',
      lat: 39.471574012298596, lon: -0.3751075316588692,
      coordinateSource: 'https://www.palladiumhotelgroup.com/en/hotels/espana/valencia'
    },
    {
      city: 3, cityName: 'Sevilla', id: 'only-you-sevilla',
      name: 'Only YOU 塞维利亚酒店', en: 'Only YOU Hotel Sevilla',
      address: 'Avenida de Kansas City 7, 41018 Sevilla, Spain',
      description: '位于 Santa Justa 火车站对面的 Pórtico 大楼，适合需要乘高铁抵达或离开塞维利亚的行程。',
      highlights: '融合安达卢西亚元素与现代设计；设有 Trotamundos 餐饮空间、Breakery 和 Limbo 泳池休闲区。',
      tip: '酒店靠近车站；前往王宫、主教座堂等老城景点仍需安排步行或接驳时间。泳池开放情况入住前确认。',
      slug: 'only-you-hotel-sevilla',
      lat: 37.38948933640486, lon: -5.9748127722861675,
      coordinateSource: 'https://www.onlyyouhotels.com/en/hotels/only-you-hotel-sevilla/location/'
    },
    {
      city: 6, cityName: 'Málaga', id: 'only-you-malaga',
      name: 'Only YOU 马拉加酒店', en: 'Only YOU Hotel Málaga',
      address: 'Alameda Principal 1, 29001 Málaga, Spain',
      description: '位于市中心 La Equitativa 大楼，面对港口、邻近 Larios 步行街，适合将老城游览与海港散步结合。',
      highlights: '装饰艺术与地中海风格结合；设有 Carmen 餐厅、Sonora 屋顶餐饮空间和 Lolita 景观泳池休闲区。',
      tip: '可比较 Soho、海景、Larios 景观与露台房型；屋顶泳池及餐饮空间的使用条件入住前确认。',
      slug: 'only-you-hotel-malaga',
      lat: 36.71772, lon: -4.4210658,
      coordinateSource: 'https://maps.app.goo.gl/zgSEamkpHkBX9yYA7'
    }
  ]
};

(() => {
  for (const hotel of onlyYouHotelBundle.hotels) {
    const city = cities[hotel.city];
    if (!city || city.en !== hotel.cityName) throw new Error('Unexpected Only YOU destination: ' + hotel.id);
    const identity = value => String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
    const existingIndex = city.spots.findIndex(spot => spot.importId === hotel.id || (spot.placeType === 'hotel' && identity(spot.en) === identity(hotel.en)));
    if (existingIndex >= 0) {
      const existing = city.spots[existingIndex];
      existing.address = hotel.address;
      existing.q = hotel.en + ' ' + hotel.address;
      const point = cityCoordinates.find(p => p.city === city.id && p.index === existingIndex);
      if (point) Object.assign(point, {lat:hotel.lat,lon:hotel.lon,source:hotel.coordinateSource});
      continue; // Keep the original import ID, prices, photographs and travel notes.
    }
    // Append after earlier hotel bundles so existing place keys stay unchanged.
    const index = city.spots.length;
    const key = 'c' + String(city.id + 1).padStart(2, '0') + '-s' + String(index + 1).padStart(2, '0');
    city.spots.push({
      n: hotel.name, en: hotel.en, address: hotel.address,
      d: hotel.description, highlights: hotel.highlights, tip: hotel.tip,
      duration: '按行程安排住宿', cat: '酒店', placeType: 'hotel',
      importId: hotel.id, q: hotel.en + ' ' + hotel.address,
      source: 'https://www.onlyyouhotels.com/en/hotels/' + hotel.slug + '/',
      added: onlyYouHotelBundle.checked
    });
    cityCoordinates.push({
      key, city: city.id, index, name: hotel.name, title: hotel.en, lang: 'en',
      lat: hotel.lat, lon: hotel.lon, source: hotel.coordinateSource
    });
  }
})();
