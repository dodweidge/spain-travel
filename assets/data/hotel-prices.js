// Public price references collected on 2026-09-24; these are not live booking quotes.
const hotelPriceBundle = {
  checked: '2026-09-24',
  currency: 'EUR',
  cnyBudgetRate: 8,
  method: '房价取自 KAYAK 页面标注的近两周均价，按每间每晚展示。周日–周四与周五–周六分开统计；“近两周”相对于来源页面的数据更新时间，并非入住日期。',
  conditions: '平台统计未统一房型、入住人数、早餐、取消条件及税费，不能视为同条件的可订报价。预订时请按实际人数、房型和日期比较含税总价。',
  travelDateNote: '2027 年清明房价待按入住日期核实；以下为近期统计参考。',
  hotels: {
    'mira-seventy': {
      name: 'Seventy Barcelona',
      weeknight: 298,
      weekend: 339,
      priceSource: 'https://www.kayak.es/Barcelona-Hoteles-Seventy-Barcelona.5336957.ksp',
      breakfast: 22.5,
      breakfastSourceName: 'Expedia',
      breakfastSource: 'https://www.expedia.com.sg/Barcelona-Hotels-Seventy-Barcelona.h40171731.Hotel-Information',
      note: '巴塞罗那另留意订单中的当地住宿税；不要把平台展示的起价直接当作最后应付金额。'
    },
    'mira-melia': {
      name: 'Meliá Granada',
      weeknight: 101,
      weekend: 150,
      priceSource: 'https://www.kayak.es/Granada-Hoteles-Melia-Granada.13237.ksp',
      breakfast: 20,
      breakfastSourceName: 'Expedia',
      breakfastSource: 'https://www.expedia.com/Granada-Hotels-Melia-Granada-Hotel.h8007.Hotel-Information?equalTargetTab=tab-1',
      note: '比较不同面积、景观的房型时，分别核对早餐及其他包含项目。'
    },
    'mira-eurostars': {
      name: 'Eurostars Palace',
      weeknight: 97,
      weekend: 114,
      priceSource: 'https://www.kayak.es/Cordoba-Hoteles-Eurostars-Palace.2078919.ksp',
      breakfast: 20,
      breakfastSourceName: 'Expedia',
      breakfastSource: 'https://www.expedia.com/Cordoba-Hotels-Eurostars-Palace-Hotel.h2001358.Hotel-Information',
      note: '若只住一晚，直接比较这一晚的含税总价；含停车套餐与纯房费需分开看。'
    },
    'mira-onlyyou': {
      name: 'Only YOU Hotel Sevilla',
      weeknight: 178,
      weekend: 225,
      priceSource: 'https://www.kayak.es/Sevilla-Hoteles-Only-You-Hotel-Sevilla.314397.ksp',
      breakfast: 25,
      breakfastSourceName: '酒店官网',
      breakfastSource: 'https://www.onlyyouhotels.com/en/hotels/only-you-hotel-sevilla/gastro-spaces/breakfast/',
      note: '官网早餐单买价为每人 €25。若订单已经含早，不再重复计入早餐费用。'
    }
  }
};
