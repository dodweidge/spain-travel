// Room quotes observed on Booking.com for 2 adults / 1 room; never substitute for a live reservation quote.
const hotelPriceBundle = {
  "checked": "2026-09-24",
  "currency": "EUR",
  "cnyBudgetRate": 8,
  "checkin": "2027-04-06",
  "checkout": "2027-04-07",
  "adults": 2,
  "rooms": 1,
  "nights": 1,
  "method": "统一查询 2027 年 4 月 6 日入住、4 月 7 日退房，2 位成人、0 儿童、1 间房、1 晚。下表是查询时可见的房型报价样本，用于比较住宿预算；单日样本不代表全年均价，也不是各路线实际入住日期的报价。",
  "conditions": "每种房型分别保留所见最低的不可退／可退、不含早／含双早方案。未见报价的格子不表示该房型不存在。可退方案仅在截止时间前免费取消，具体当地时间及预付条款以订单为准。房量、价格、税费可能变化。",
  "taxMethod": "订房页此次将 10% VAT 列为未含；巴塞罗那另列按人按晚的城市税。下表按页面房价 × 1.10 ＋ 两人城市税计算并四舍五入至整数欧元，是含已列税费的估算；原始房价为页面显示的整数欧元，因此最终结算可能有尾差。",
  "hotels": {
    "mira-seventy": {
      "name": "Seventy Barcelona",
      "priceSource": "https://www.booking.com/hotel/es/seventy-barcelona.html?checkin=2027-04-06&checkout=2027-04-07&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR&chal_t=1790270485357&force_referer=",
      "breakfast": 22.5,
      "vatExcluded": 0.1,
      "cityTaxPerAdult": 9,
      "rooms": [
        {
          "name": "基础双人房 · 水疗区使用",
          "en": "Basic Double Room with Spa Access",
          "sqm": 20,
          "bed": "大床或双床，依房态确认",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 271,
              "total": 316,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 286,
              "total": 333,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 308,
              "total": 357,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 327,
              "total": 378,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "标准大床／双床房 · 水疗区使用",
          "en": "Standard Double or Twin Room with Spa Access",
          "sqm": 28,
          "bed": "大床或双床，依房态确认",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 289,
              "total": 336,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 305,
              "total": 354,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 326,
              "total": 377,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 345,
              "total": 398,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "高级大床／双床房 · 水疗区使用",
          "en": "Superior Double or Twin Room with Spa Access",
          "sqm": 28,
          "bed": "大床或双床，依房态确认",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 309,
              "total": 358,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 324,
              "total": 374,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 346,
              "total": 399,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 365,
              "total": 420,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "Privilege 双人房 · 水疗区使用",
          "en": "Privilege Double Room with Spa Access",
          "sqm": 28,
          "bed": "大床或双床，依房态确认",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 325,
              "total": 376,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 341,
              "total": 393,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 362,
              "total": 416,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 382,
              "total": 438,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "豪华露台双人房",
          "en": "Deluxe Double Room with Terrace",
          "sqm": 28,
          "bed": "大床或双床，依房态确认",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 335,
              "total": 387,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 350,
              "total": 403,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 371,
              "total": 426,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 391,
              "total": 448,
              "cancelBefore": "2027-04-05"
            }
          ]
        }
      ],
      "note": "页面另列城市税 €9／成人／晚，两位成人共 €18，已计入下表。"
    },
    "edition-madrid": {
      "name": "The Madrid EDITION",
      "priceSource": "https://www.booking.com/hotel/es/the-madrid-edition.html?checkin=2027-04-06&checkout=2027-04-07&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR",
      "breakfast": 50,
      "vatExcluded": 0.1,
      "cityTaxPerAdult": 0,
      "rooms": [
        {
          "name": "高级大床房",
          "en": "Superior King Room",
          "sqm": 29,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 446,
              "total": 491,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 525,
              "total": 578,
              "cancelBefore": "2027-04-06"
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 605,
              "total": 666,
              "cancelBefore": "2027-04-06"
            }
          ]
        },
        {
          "name": "街景豪华大床房",
          "en": "Deluxe King Room with Street View",
          "sqm": 32,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 489,
              "total": 538,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 575,
              "total": 633,
              "cancelBefore": "2027-04-06"
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 655,
              "total": 721,
              "cancelBefore": "2027-04-06"
            }
          ]
        },
        {
          "name": "高级阳台大床房",
          "en": "Superior King Room with Balcony",
          "sqm": 34,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 497,
              "total": 547,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 585,
              "total": 644,
              "cancelBefore": "2027-04-06"
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 665,
              "total": 732,
              "cancelBefore": "2027-04-06"
            }
          ]
        },
        {
          "name": "高级露台大床房",
          "en": "Superior King Room with Terrace",
          "sqm": 34,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 510,
              "total": 561,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 600,
              "total": 660,
              "cancelBefore": "2027-04-06"
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 680,
              "total": 748,
              "cancelBefore": "2027-04-06"
            }
          ]
        },
        {
          "name": "城景豪华大床房",
          "en": "Deluxe King Room with City View",
          "sqm": 29,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 510,
              "total": 561,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 600,
              "total": 660,
              "cancelBefore": "2027-04-06"
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 680,
              "total": 748,
              "cancelBefore": "2027-04-06"
            }
          ]
        },
        {
          "name": "高级阳台双大床房",
          "en": "Superior Queen Room with Two Queen Beds, Balcony",
          "sqm": 34,
          "bed": "2 张 Queen 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 540,
              "total": 594,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 635,
              "total": 699,
              "cancelBefore": "2027-04-06"
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 715,
              "total": 787,
              "cancelBefore": "2027-04-06"
            }
          ]
        },
        {
          "name": "高级露台双大床房",
          "en": "Superior Queen Room with Two Queen Beds, Terrace",
          "sqm": 34,
          "bed": "2 张 Queen 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 553,
              "total": 608,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 650,
              "total": 715,
              "cancelBefore": "2027-04-06"
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 730,
              "total": 803,
              "cancelBefore": "2027-04-06"
            }
          ]
        },
        {
          "name": "Premier 大床房",
          "en": "Premier King Room",
          "sqm": 32,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 574,
              "total": 631,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 675,
              "total": 743,
              "cancelBefore": "2027-04-06"
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 755,
              "total": 831,
              "cancelBefore": "2027-04-06"
            }
          ]
        },
        {
          "name": "Loft 大床房（35㎡）",
          "en": "King Loft",
          "sqm": 35,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 595,
              "total": 655,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 700,
              "total": 770,
              "cancelBefore": "2027-04-06"
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 780,
              "total": 858,
              "cancelBefore": "2027-04-06"
            }
          ]
        },
        {
          "name": "Premier 双大床房",
          "en": "Premier Queen Room with Two Queen Beds",
          "sqm": 32,
          "bed": "2 张 Queen 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 616,
              "total": 678,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 725,
              "total": 798,
              "cancelBefore": "2027-04-06"
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 805,
              "total": 886,
              "cancelBefore": "2027-04-06"
            }
          ]
        },
        {
          "name": "Loft 大床房（40㎡）",
          "en": "King Loft",
          "sqm": 40,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 659,
              "total": 725,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 775,
              "total": 853,
              "cancelBefore": "2027-04-06"
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 855,
              "total": 941,
              "cancelBefore": "2027-04-06"
            }
          ]
        },
        {
          "name": "Loft 双大床房",
          "en": "Loft with Two Queen Beds",
          "sqm": 40,
          "bed": "2 张 Queen 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 701,
              "total": 771,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 825,
              "total": 908,
              "cancelBefore": "2027-04-06"
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 905,
              "total": 996,
              "cancelBefore": "2027-04-06"
            }
          ]
        },
        {
          "name": "城景转角 Loft 一卧套房",
          "en": "One-Bedroom Corner Loft Suite with City View",
          "sqm": 50,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 829,
              "total": 912,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 975,
              "total": 1073,
              "cancelBefore": "2027-04-06"
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 1055,
              "total": 1161,
              "cancelBefore": "2027-04-06"
            }
          ]
        },
        {
          "name": "城景转角一卧套房",
          "en": "One-Bedroom Corner Suite with City View",
          "sqm": 61,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 1041,
              "total": 1145,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 1225,
              "total": 1348,
              "cancelBefore": "2027-04-06"
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 1305,
              "total": 1436,
              "cancelBefore": "2027-04-06"
            }
          ]
        },
        {
          "name": "高级一卧大床套房",
          "en": "One-Bedroom Superior King Suite",
          "sqm": 75,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 1126,
              "total": 1239,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 1325,
              "total": 1458,
              "cancelBefore": "2027-04-06"
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 1405,
              "total": 1546,
              "cancelBefore": "2027-04-06"
            }
          ]
        },
        {
          "name": "Premier 一卧大床套房",
          "en": "One-Bedroom Premier King Suite",
          "sqm": 81,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 1211,
              "total": 1332,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 1425,
              "total": 1568,
              "cancelBefore": "2027-04-06"
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 1505,
              "total": 1656,
              "cancelBefore": "2027-04-06"
            }
          ]
        }
      ],
      "note": "本次报价页仅另列 10% VAT，已计入下表。"
    },
    "edition-barcelona": {
      "name": "The Barcelona EDITION",
      "priceSource": "https://www.booking.com/hotel/es/the-barcelona-edition.html?checkin=2027-04-06&checkout=2027-04-07&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR",
      "breakfast": 35,
      "vatExcluded": 0.1,
      "cityTaxPerAdult": 13,
      "rooms": [
        {
          "name": "Guest Room 大床房",
          "en": "Guest Room, 1 King",
          "sqm": 23,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 360,
              "total": 422,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 450,
              "total": 521,
              "cancelBefore": "2027-04-04"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 400,
              "total": 466,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 490,
              "total": 565,
              "cancelBefore": "2027-04-04"
            }
          ]
        },
        {
          "name": "高级大床房",
          "en": "Superior, 1 King",
          "sqm": 25,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 420,
              "total": 488,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 525,
              "total": 604,
              "cancelBefore": "2027-04-04"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 460,
              "total": 532,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 565,
              "total": 648,
              "cancelBefore": "2027-04-04"
            }
          ]
        },
        {
          "name": "豪华大床房",
          "en": "Deluxe Room, 1 King",
          "sqm": 28,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 440,
              "total": 510,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 550,
              "total": 631,
              "cancelBefore": "2027-04-04"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 480,
              "total": 554,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 590,
              "total": 675,
              "cancelBefore": "2027-04-04"
            }
          ]
        },
        {
          "name": "Santa Caterina 豪华大床房",
          "en": "Deluxe Santa Caterina Room, 1 King",
          "sqm": 27,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 520,
              "total": 598,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 650,
              "total": 741,
              "cancelBefore": "2027-04-04"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 560,
              "total": 642,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 690,
              "total": 785,
              "cancelBefore": "2027-04-04"
            }
          ]
        },
        {
          "name": "Loft 转角大床套房",
          "en": "Loft Corner Suite, 1 King",
          "sqm": 43,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 1000,
              "total": 1126,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 1250,
              "total": 1401,
              "cancelBefore": "2027-03-30"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 1040,
              "total": 1170,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 1290,
              "total": 1445,
              "cancelBefore": "2027-03-30"
            }
          ]
        }
      ],
      "note": "页面另列城市税 €13／成人／晚，两位成人共 €26，已计入下表。 本次未见 Loft、Studio Terrace、一卧套房及顶层套房的双人可订报价，未据其他房型推算价格。"
    },
    "mira-melia": {
      "name": "Meliá Granada",
      "priceSource": "https://www.booking.com/hotel/es/meliagranada.html?checkin=2027-04-06&checkout=2027-04-07&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR",
      "breakfast": 19.8,
      "vatExcluded": 0.1,
      "cityTaxPerAdult": 0,
      "rooms": [
        {
          "name": "Meliá 标准房",
          "en": "Meliá Room",
          "sqm": 19,
          "bed": "大床或双床，依房态确认",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 139,
              "total": 153,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 164,
              "total": 180,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 167,
              "total": 184,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 196,
              "total": 216,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "豪华房",
          "en": "Deluxe Room",
          "sqm": 19,
          "bed": "大床或双床，依房态确认",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 155,
              "total": 171,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 182,
              "total": 200,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 182,
              "total": 200,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 215,
              "total": 237,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "Premium 优选房",
          "en": "Premium Room",
          "sqm": 25,
          "bed": "大床或双床，依房态确认",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 166,
              "total": 183,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 195,
              "total": 215,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 194,
              "total": 213,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 228,
              "total": 251,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "The Level 客房",
          "en": "The Level Room",
          "sqm": 19,
          "bed": "大床或双床，依房态确认",
          "offers": [
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 232,
              "total": 255,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 273,
              "total": 300,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "The Level Premium 客房",
          "en": "The Level Premium Room",
          "sqm": 29,
          "bed": "大床或双床，依房态确认",
          "offers": [
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 247,
              "total": 272,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 291,
              "total": 320,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "The Level 阿尔罕布拉景观房",
          "en": "The Level Alhambra Views",
          "sqm": 20,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 251,
              "total": 276,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 295,
              "total": 325,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "The Level Premium 露台房",
          "en": "The Level Premium Room with Terrace",
          "sqm": 40,
          "bed": "大床或双床，依房态确认",
          "offers": [
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 270,
              "total": 297,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 318,
              "total": 350,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "The Level 小型套房",
          "en": "The Level Junior Suite",
          "sqm": 36,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 286,
              "total": 315,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 336,
              "total": 370,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "The Level 套房",
          "en": "Suite The Level",
          "sqm": 38,
          "bed": "大床或双床，依房态确认",
          "offers": [
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 313,
              "total": 344,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 368,
              "total": 405,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "The Level 露台套房",
          "en": "Suite The Level With Terrace",
          "sqm": 53,
          "bed": "大床或双床，依房态确认",
          "offers": [
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 344,
              "total": 378,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 405,
              "total": 446,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "The Level 主套房",
          "en": "Master Suite The Level",
          "sqm": 54,
          "bed": "1 张双人床",
          "offers": [
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 622,
              "total": 684,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 732,
              "total": 805,
              "cancelBefore": "2027-04-05"
            }
          ]
        }
      ],
      "note": "本次报价页仅另列 10% VAT，已计入下表。 The Level 系列本次仅见含早方案，不能把含早价当作纯房价。"
    },
    "mira-eurostars": {
      "name": "Eurostars Palace",
      "priceSource": "https://www.booking.com/hotel/es/eurostars-palace.html?checkin=2027-04-06&checkout=2027-04-07&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR",
      "breakfast": 20,
      "vatExcluded": 0.1,
      "cityTaxPerAdult": 0,
      "rooms": [
        {
          "name": "标准双人房（27㎡）",
          "en": "Double Room",
          "sqm": 27,
          "bed": "大床或双床，依房态确认",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 102,
              "total": 112,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 114,
              "total": 125,
              "cancelBefore": "2027-04-04"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 132,
              "total": 145,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 146,
              "total": 161,
              "cancelBefore": "2027-04-04"
            }
          ]
        },
        {
          "name": "标准双人房 · 含停车套餐",
          "en": "Double Room with Parking",
          "sqm": 27,
          "bed": "大床或双床，依房态确认",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 102,
              "total": 112,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 114,
              "total": 125,
              "cancelBefore": "2027-04-04"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 132,
              "total": 145,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 146,
              "total": 161,
              "cancelBefore": "2027-04-04"
            }
          ]
        },
        {
          "name": "双人房（35㎡）",
          "en": "Double Room",
          "sqm": 35,
          "bed": "大床或双床，依房态确认",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 135,
              "total": 149,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 151,
              "total": 166,
              "cancelBefore": "2027-04-04"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 165,
              "total": 182,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 183,
              "total": 201,
              "cancelBefore": "2027-04-04"
            }
          ]
        },
        {
          "name": "Premium 家庭房 · 双人入住",
          "en": "Premium Family Room",
          "sqm": 35,
          "bed": "大床及沙发床，报价按 2 人",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 150,
              "total": 165,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 167,
              "total": 184,
              "cancelBefore": "2027-04-04"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 180,
              "total": 198,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 200,
              "total": 220,
              "cancelBefore": "2027-04-04"
            }
          ]
        },
        {
          "name": "小型套房",
          "en": "Junior Suite",
          "sqm": 53,
          "bed": "1 张双人床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 158,
              "total": 174,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 175,
              "total": 193,
              "cancelBefore": "2027-04-04"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 187,
              "total": 206,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 208,
              "total": 229,
              "cancelBefore": "2027-04-04"
            }
          ]
        },
        {
          "name": "豪华加床房 · 双人入住",
          "en": "Deluxe Room with Extra Bed",
          "sqm": 27,
          "bed": "大床及加床，报价按 2 人",
          "offers": [
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 169,
              "total": 186,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 187,
              "total": 206,
              "cancelBefore": "2027-04-04"
            }
          ]
        },
        {
          "name": "套房",
          "en": "Suite",
          "sqm": 73,
          "bed": "大床及加床，报价按 2 人",
          "offers": [
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 423,
              "total": 465,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 470,
              "total": 517,
              "cancelBefore": "2027-04-04"
            }
          ]
        }
      ],
      "note": "本次报价页仅另列 10% VAT，已计入下表。 “含停车”是同一标准房的套餐；家庭房和加床房仍按此次两位成人搜索结果列价。"
    },
    "mira-onlyyou": {
      "name": "Only YOU Hotel Sevilla",
      "priceSource": "https://www.booking.com/hotel/es/avenida-kansas-sevilla.html?checkin=2027-04-06&checkout=2027-04-07&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR",
      "breakfast": 25,
      "vatExcluded": 0.1,
      "cityTaxPerAdult": 0,
      "rooms": [
        {
          "name": "豪华双人房",
          "en": "Deluxe Double Room",
          "sqm": 25,
          "bed": "大床／双床配置向酒店确认",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 234,
              "total": 257,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 259,
              "total": 285,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 275,
              "total": 303,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 305,
              "total": 336,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "Premium 双人房",
          "en": "Premium Double Room",
          "sqm": 25,
          "bed": "大床／双床配置向酒店确认",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 245,
              "total": 270,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 273,
              "total": 300,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 286,
              "total": 315,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 318,
              "total": 350,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "Premium 无障碍双人房",
          "en": "Premium Double Room - Disability access",
          "sqm": 25,
          "bed": "大床／双床配置向酒店确认",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 245,
              "total": 270,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 273,
              "total": 300,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 286,
              "total": 315,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 318,
              "total": 350,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "Premium 浴缸双人房",
          "en": "Premium Double Room with Bath",
          "sqm": 28,
          "bed": "大床／双床配置向酒店确认",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 258,
              "total": 284,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 286,
              "total": 315,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 299,
              "total": 329,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 332,
              "total": 365,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "Premium 露台房",
          "en": "Premium Room with Terrace",
          "sqm": 35,
          "bed": "大床／双床配置向酒店确认",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 270,
              "total": 297,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 300,
              "total": 330,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 311,
              "total": 342,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 345,
              "total": 380,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "小型套房",
          "en": "Junior Suite",
          "sqm": 38,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 307,
              "total": 338,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 341,
              "total": 375,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 348,
              "total": 383,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 386,
              "total": 425,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "豪华小型套房",
          "en": "Deluxe Junior Suite",
          "sqm": 38,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 319,
              "total": 351,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 355,
              "total": 391,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 360,
              "total": 396,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 400,
              "total": 440,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "行政小型套房",
          "en": "Junior Suite Executive",
          "sqm": 38,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 332,
              "total": 365,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 368,
              "total": 405,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 373,
              "total": 410,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 414,
              "total": 455,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "Premium 小型套房",
          "en": "Junior Suite Premium",
          "sqm": 38,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 344,
              "total": 378,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 382,
              "total": 420,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 385,
              "total": 424,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 427,
              "total": 470,
              "cancelBefore": "2027-04-05"
            }
          ]
        },
        {
          "name": "行政套房",
          "en": "Executive Suite",
          "sqm": 50,
          "bed": "1 张 King 大床",
          "offers": [
            {
              "breakfast": false,
              "refundable": false,
              "sourcePrice": 417,
              "total": 459,
              "cancelBefore": null
            },
            {
              "breakfast": false,
              "refundable": true,
              "sourcePrice": 464,
              "total": 510,
              "cancelBefore": "2027-04-05"
            },
            {
              "breakfast": true,
              "refundable": false,
              "sourcePrice": 458,
              "total": 504,
              "cancelBefore": null
            },
            {
              "breakfast": true,
              "refundable": true,
              "sourcePrice": 509,
              "total": 560,
              "cancelBefore": "2027-04-05"
            }
          ]
        }
      ],
      "note": "本次报价页仅另列 10% VAT，已计入下表。"
    }
  }
};
