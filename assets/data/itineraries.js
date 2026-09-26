// Planning data shared by route, activity and cultural views.
const plans = [
 {
  "name": "经典综合",
  "subtitle": "第一次去，兼顾高迪、安达卢西亚与首都",
  "entry": "巴塞罗那进 · 马德里出",
  "route": "上海 → 巴塞罗那 → 塞维利亚 → 科尔多瓦（途中游览）→ 马德里 → 上海",
  "nights": "巴塞罗那 3 晚 / 塞维利亚 2 晚 / 马德里 3 晚",
  "pace": "适中偏紧 · 3 家酒店 · 1 次西班牙境内飞行",
  "why": "优先推荐。先用三晚适应时差、看高迪，再飞往南部，最后沿铁路到马德里回国。省去返回巴塞罗那的路程，也能把最后三晚留在国际返程城市。",
  "tradeoff": "10 天内不再塞入格拉纳达、龙达或海岛。若阿尔罕布拉宫是必去项，直接选“南部古城”。巴塞罗那至塞维利亚的境内航班需另核行李额。",
  "days": [
   [
    "4月2日 周五",
    "上海 → 巴塞罗那",
    "公开计划：东航 MU249 00:40→08:05，或国航 CA839 00:40→07:55（均当地时间）。4月1日晚到浦东机场；抵达后轻松逛哥特区与海边。未核验可售座位。",
    "巴塞罗那"
   ],
   [
    "4月3日 周六",
    "巴塞罗那",
    "圣家堂＋圣保罗医院周边；把圣家堂预约放在今天，避免抵达日航班延误影响。",
    "巴塞罗那"
   ],
   [
    "4月4日 周日",
    "巴塞罗那",
    "古埃尔公园＋巴特罗之家，留出街区漫步与用餐时间。",
    "巴塞罗那"
   ],
   [
    "4月5日 周一",
    "巴塞罗那 → 塞维利亚",
    "Vueling 直飞，飞行约 1小时40分；优先选上午出发，预留半天转场。4月5日具体班号与起降时间待查；下午或傍晚逛圣十字区、西班牙广场。",
    "塞维利亚"
   ],
   [
    "4月6日 周二",
    "塞维利亚",
    "王宫＋大教堂；晚上可安排弗拉门戈。",
    "塞维利亚"
   ],
   [
    "4月7日 周三",
    "塞维利亚 → 科尔多瓦 → 马德里",
    "火车途中停留科尔多瓦，重点看清真寺大教堂和罗马桥；提前确认行李寄存，再乘车去马德里。想更轻松可跳过科尔多瓦。",
    "马德里"
   ],
   [
    "4月8日 周四",
    "马德里",
    "王宫、主广场与老城。",
    "马德里"
   ],
   [
    "4月9日 周五",
    "马德里",
    "普拉多博物馆＋丽池公园；若更爱古城，可把这天换成托莱多一日往返。",
    "马德里"
   ],
   [
    "4月10日 周六",
    "马德里 → 上海",
    "公开计划：东航 MU710 11:05 从马德里起飞，4月11日 05:50 抵达上海（均当地时间）。建议约 08:05 到机场；最终以航司通知为准。",
    "机上"
   ],
   [
    "4月11日 周日",
    "抵达上海",
    "按 MU710 公开计划，05:50 抵达浦东；当天留作休息。",
    "—"
   ]
  ]
 },
 {
  "name": "轻松双城",
  "subtitle": "少换酒店，多留时间看展、散步与吃饭",
  "entry": "巴塞罗那进 · 马德里出",
  "route": "上海 → 巴塞罗那（可往返赫罗纳）→ 马德里（可往返托莱多）→ 上海",
  "nights": "巴塞罗那 4 晚 / 马德里 4 晚",
  "pace": "轻松 · 2 家酒店 · 1 次城际高铁",
  "why": "最省心。两座大城市各住四晚，只搬一次行李；巴塞罗那至马德里乘高铁，市中心之间移动。赫罗纳、托莱多均作为可删减的一日游。",
  "tradeoff": "不去安达卢西亚，错过南部宫殿与庭院，但每个城市的体验更完整。若反向机票明显便宜，马德里进、巴塞罗那出也同样顺路。",
  "days": [
   [
    "4月2日 周五",
    "上海 → 巴塞罗那",
    "公开计划：东航 MU249 00:40→08:05，或国航 CA839 00:40→07:55（均当地时间）。4月1日晚到浦东机场；抵达后轻松逛哥特区与海边。未核验可售座位。",
    "巴塞罗那"
   ],
   [
    "4月3日 周六",
    "巴塞罗那",
    "圣家堂＋格拉西亚大道。",
    "巴塞罗那"
   ],
   [
    "4月4日 周日",
    "巴塞罗那",
    "古埃尔公园＋巴特罗之家，避免一天集中太多预约。",
    "巴塞罗那"
   ],
   [
    "4月5日 周一",
    "巴塞罗那 / 赫罗纳",
    "可选赫罗纳一日往返；也可留在巴塞罗那看博物馆、逛街。",
    "巴塞罗那"
   ],
   [
    "4月6日 周二",
    "巴塞罗那 → 马德里",
    "上午或中午乘高铁；下午入住并逛主广场、太阳门广场。",
    "马德里"
   ],
   [
    "4月7日 周三",
    "马德里",
    "王宫＋老城。",
    "马德里"
   ],
   [
    "4月8日 周四",
    "马德里 / 托莱多",
    "托莱多一日往返，大教堂与山谷观景台；不想转场可改为马德里市内活动。",
    "马德里"
   ],
   [
    "4月9日 周五",
    "马德里",
    "普拉多博物馆＋丽池公园，预留购物和整理行李时间。",
    "马德里"
   ],
   [
    "4月10日 周六",
    "马德里 → 上海",
    "公开计划：东航 MU710 11:05 从马德里起飞，4月11日 05:50 抵达上海（均当地时间）。建议约 08:05 到机场；最终以航司通知为准。",
    "机上"
   ],
   [
    "4月11日 周日",
    "抵达上海",
    "按 MU710 公开计划，05:50 抵达浦东；当天留作休息。",
    "—"
   ]
  ]
 },
 {
  "name": "南部古城",
  "subtitle": "把时间留给阿尔罕布拉与安达卢西亚",
  "entry": "马德里进 · 马德里出",
  "route": "上海 → 马德里 → 科尔多瓦 → 格拉纳达 → 塞维利亚 → 马德里 → 上海",
  "nights": "马德里首尾各 1 晚 / 科尔多瓦 1 晚 / 格拉纳达 2 晚 / 塞维利亚 3 晚",
  "pace": "适中偏紧 · 5 段住宿 · 4 次城际移动",
  "why": "以马德里作为直飞门户，可以用铁路串起南部，省去为了异地出入境而绕到巴塞罗那。两晚格拉纳达给阿尔罕布拉完整一天，返程前一晚回马德里。",
  "tradeoff": "不安排巴塞罗那；首尾两晚马德里主要承担抵达与返程缓冲。酒店更换次数较多，适合把南部古迹放在首位的人。",
  "days": [
   [
    "4月2日 周五",
    "上海 → 马德里",
    "公开计划：东航 MU709 00:45→08:40（均当地时间）。4月1日晚到浦东机场；抵达后只安排老城散步，先休息。未核验可售座位。",
    "马德里"
   ],
   [
    "4月3日 周六",
    "马德里 → 科尔多瓦",
    "上午乘高铁；下午参观清真寺大教堂、罗马桥与老城。",
    "科尔多瓦"
   ],
   [
    "4月4日 周日",
    "科尔多瓦 → 格拉纳达",
    "火车转场；下午阿尔拜辛区，傍晚圣尼古拉斯观景台。",
    "格拉纳达"
   ],
   [
    "4月5日 周一",
    "格拉纳达",
    "阿尔罕布拉宫＋赫内拉利费花园。先核对纳斯里德宫预约时段，再安排当天其他活动。",
    "格拉纳达"
   ],
   [
    "4月6日 周二",
    "格拉纳达 → 塞维利亚",
    "乘火车，预留半天转场；下午西班牙广场与公园。",
    "塞维利亚"
   ],
   [
    "4月7日 周三",
    "塞维利亚",
    "王宫＋圣十字区；晚上可看弗拉门戈。",
    "塞维利亚"
   ],
   [
    "4月8日 周四",
    "塞维利亚",
    "大教堂、吉拉达塔与特里亚纳街区，保留半天自由活动。",
    "塞维利亚"
   ],
   [
    "4月9日 周五",
    "塞维利亚 → 马德里",
    "白天乘高铁回马德里，住一晚；不把长途火车与回国航班安排在同一天。",
    "马德里"
   ],
   [
    "4月10日 周六",
    "马德里 → 上海",
    "公开计划：东航 MU710 11:05 从马德里起飞，4月11日 05:50 抵达上海（均当地时间）。建议约 08:05 到机场；最终以航司通知为准。",
    "机上"
   ],
   [
    "4月11日 周日",
    "抵达上海",
    "按 MU710 公开计划，05:50 抵达浦东；当天留作休息。",
    "—"
   ]
  ]
 },
 {
  "name": "包车环游 · 15天",
  "subtitle": "为你们新排：巴塞罗那进、马德里出，格拉纳达留完整一天",
  "entry": "东海岸南下 · 安达卢西亚 · 马德里",
  "route": "上海 → 巴塞罗那 → 瓦伦西亚 → 阿利坎特 → 格拉纳达 → 龙达（途中游览）→ 塞维利亚 → 科尔多瓦 → 马德里 → 上海",
  "nights": "巴塞罗那 3 晚 / 瓦伦西亚 2 晚 / 阿利坎特 1 晚 / 格拉纳达 2 晚 / 塞维利亚 2 晚 / 科尔多瓦 1 晚 / 马德里 2 晚",
  "pace": "建议 15 天含飞行 · 西班牙 13 晚 · 7 个住宿城市 · 城际均包车",
  "why": "推荐作为新主线。沿东海岸逐步南下，用阿利坎特把瓦伦西亚至格拉纳达的长车程拆开；格拉纳达后经龙达到塞维利亚，再经科尔多瓦北上。龙达与沿途停靠能发挥包车优势，阿尔罕布拉则安排在格拉纳达第二天，避开转场日。",
  "tradeoff": "这条路线涉及 7 个住宿城市，整体节奏中等偏紧。龙达转场日会偏长；托莱多只作可选途中停留，默认不加。若能多给 1–2 天，优先增加马德里或塞维利亚停留。具体日期以你们最终假期和机票为准。",
  "type": "charter",
  "start": "2027-04-02",
  "return": "2027-04-15",
  "arrive": "2027-04-16",
  "days": [
   [
    "D1 · 4/2 周五",
    "上海 → 巴塞罗那",
    "公开计划参考：MU249 00:40→08:05，或 CA839 00:40→07:55，均当地时间；需 4/1 晚到浦东。接机后轻松逛哥特区、海滨，不放必须准点入场的重头景点。",
    "巴塞罗那"
   ],
   [
    "D2 · 4/3 周六",
    "巴塞罗那",
    "圣家堂为主，配格拉西亚大道与巴特罗之家；预约之间留出午餐和交通时间。",
    "巴塞罗那"
   ],
   [
    "D3 · 4/4 周日",
    "巴塞罗那",
    "古埃尔公园＋老城或海边，保留自由活动。市内可按需要安排接送，不必全天让车跟着步行。",
    "巴塞罗那"
   ],
   [
    "D4 · 4/5 周一",
    "巴塞罗那 → 瓦伦西亚",
    "包车南下，纯车程约 3.5–4 小时；含休息、进出城按 4.5–5 小时留量。下午艺术科学城外观，傍晚老城，不再叠加另一座城市。",
    "瓦伦西亚"
   ],
   [
    "D5 · 4/6 周二",
    "瓦伦西亚",
    "中央市场、丝绸交易厅和老城；下午艺术科学城入馆或海边二选一。两晚让这里成为真正的游览站。",
    "瓦伦西亚"
   ],
   [
    "D6 · 4/7 周三",
    "瓦伦西亚 → 阿利坎特",
    "纯车程约 2 小时。下午圣巴巴拉城堡、滨海步道，海边住一晚；这一站的作用是休息和拆分长途，不以四月海水适合游泳为前提。",
    "阿利坎特"
   ],
   [
    "D7 · 4/8 周四",
    "阿利坎特 → 格拉纳达",
    "纯车程约 3.5–4 小时，含休息按 4.5–5 小时安排；下午入住、阿尔拜辛区散步，视体力看圣尼古拉斯观景台。阿尔罕布拉留到明天。",
    "格拉纳达"
   ],
   [
    "D8 · 4/9 周五",
    "格拉纳达",
    "阿尔罕布拉宫＋赫内拉利费，留完整一天。先锁定含纳斯里德宫的门票及指定入场时段，再安排宫堡、花园和晚餐；不在这天安排城际移动。",
    "格拉纳达"
   ],
   [
    "D9 · 4/10 周六",
    "格拉纳达 → 龙达 → 塞维利亚",
    "约 2.5 小时到龙达，留 2.5–3 小时看新桥、峡谷和老城并用午餐，再约 1.5–2 小时到塞维利亚。全天约 8–9 小时，提前与司机确认服务时长；当天不再加马拉加或白色小镇。",
    "塞维利亚"
   ],
   [
    "D10 · 4/11 周日",
    "塞维利亚",
    "王宫、圣十字区为主，大教堂按周日开放与礼拜安排选择时段。晚上可看弗拉门戈；西班牙广场可移到次日上午。",
    "塞维利亚"
   ],
   [
    "D11 · 4/12 周一",
    "塞维利亚 → 科尔多瓦",
    "早上西班牙广场；之后约 1.5–2 小时车程。下午清真寺大教堂、犹太区，傍晚罗马桥。住一晚，把游览与翌日北上长途拆开。",
    "科尔多瓦"
   ],
   [
    "D12 · 4/13 周二",
    "科尔多瓦 → 马德里",
    "主方案直接北上，预留约 4–4.5 小时纯车程及中途休息，下午入住。可选加游托莱多：当天累计约 5–5.5 小时驾驶，再加 2.5–3 小时游览和用餐，会变成约 9–10 小时的一天；默认不加。",
    "马德里"
   ],
   [
    "D13 · 4/14 周三",
    "马德里",
    "王宫与老城、普拉多与丽池公园，两组选一组为主；另一组挑重点，不把所有室内景点塞满。回国前整理行李。",
    "马德里"
   ],
   [
    "D14 · 4/15 周四",
    "马德里 → 上海",
    "MU710 公开计划参考 11:05 起飞，次日 05:50 抵沪；回程较原十天草案延后至 4/15。建议约 08:05 到机场，具体依航司要求；未核验可售库存。",
    "机上"
   ],
   [
    "D15 · 4/16 周五",
    "抵达上海",
    "按参考时刻 05:50 抵达浦东，全天留作休息。",
    "—"
   ]
  ]
 },
 {
  "name": "图中路线 · 17天",
  "subtitle": "保留图中城市，按巴塞罗那进、马德里出的航班方向整理",
  "entry": "萨拉戈萨 · 梅里达 · 南部环线",
  "route": "上海 → 巴塞罗那 → 萨拉戈萨 → 马德里（中转）→ 梅里达 → 塞维利亚 → 马拉加 → 格拉纳达 → 托莱多 → 马德里 → 上海",
  "nights": "巴塞罗那 3 晚 / 萨拉戈萨 1 晚 / 马德里先住 1 晚 / 梅里达 1 晚 / 塞维利亚 2 晚 / 马拉加 2 晚 / 格拉纳达 2 晚 / 托莱多 1 晚 / 马德里最后 2 晚",
  "pace": "建议 17 天含飞行 · 境外 15 晚 · 8 个城市 · 9 段住宿 · 城际包车",
  "why": "适合对古城、罗马遗迹和建筑感兴趣的旅行。梅里达与萨拉戈萨是这条线相较东海岸方案最鲜明的新增体验，马拉加提供海边休息。马德里第一次只作中转，最后再集中游览，保留图中南部环线及你们既定的入境、出境城市。",
  "tradeoff": "主线约 1900 公里、8 个转场日，比东海岸版多两次转场。马德里停两次，共住 3 晚；17 天仍有连续换酒店的几天。图中没有明确停靠科尔多瓦或龙达，本方案保留原图城市组合。若对罗马遗迹兴趣一般，可考虑把梅里达换成科尔多瓦，并另行重排南部顺序。",
  "type": "charter",
  "start": "2027-04-02",
  "return": "2027-04-17",
  "arrive": "2027-04-18",
  "days": [
   [
    "D1 · 4/2 周五",
    "上海 → 巴塞罗那",
    "MU249 公开计划 00:40→08:05，或 CA839 00:40→07:55；均当地时间，4/1 晚到浦东。抵达后接机、休息，轻松逛哥特区。",
    "巴塞罗那"
   ],
   [
    "D2 · 4/3 周六",
    "巴塞罗那",
    "圣家堂为当天重点，下午格拉西亚大道与巴特罗之家；两个室内预约之间留出午餐和交通时间。",
    "巴塞罗那"
   ],
   [
    "D3 · 4/4 周日",
    "巴塞罗那",
    "古埃尔公园，下午老城或海边自由活动。先休整好，再开始连续包车移动。",
    "巴塞罗那"
   ],
   [
    "D4 · 4/5 周一",
    "巴塞罗那 → 萨拉戈萨",
    "包车约 3–3.5 小时，另留休息和进城时间。下午皮拉尔圣母大教堂、广场及埃布罗河边；救世主主教座堂视时间选择，避免赶三个室内景点。",
    "萨拉戈萨"
   ],
   [
    "D5 · 4/6 周二",
    "萨拉戈萨 → 马德里",
    "上午预约参观阿尔哈费里亚宫，再约 3–3.5 小时包车去马德里。这里只中转一晚，傍晚主广场或附近散步，王宫和博物馆放在返程前。",
    "马德里（中转）"
   ],
   [
    "D6 · 4/7 周三",
    "马德里 → 梅里达",
    "包车约 3.5–4 小时；下午以罗马剧场＋圆形竞技场为主，傍晚戴安娜神庙。罗马桥可放次日上午，入住前确认遗址开放和联票内容。",
    "梅里达"
   ],
   [
    "D7 · 4/8 周四",
    "梅里达 → 塞维利亚",
    "早上罗马桥或补看前一日遗址，午前后出发；包车约 2–2.5 小时。下午西班牙广场，傍晚圣十字区。",
    "塞维利亚"
   ],
   [
    "D8 · 4/9 周五",
    "塞维利亚",
    "王宫为第一重点，大教堂与吉拉达塔根据预约和体力搭配；晚间可看弗拉门戈。",
    "塞维利亚"
   ],
   [
    "D9 · 4/10 周六",
    "塞维利亚 → 马拉加",
    "直接包车约 2.5–3 小时。下午城堡（Alcazaba）或老城，傍晚港口步道；本日不默认绕龙达。",
    "马拉加"
   ],
   [
    "D10 · 4/11 周日",
    "马拉加",
    "毕加索博物馆，希布拉尔法罗城堡与马拉格塔海滩按体力选择。把这一天作为长线中的放松日；四月海边以散步为主。",
    "马拉加"
   ],
   [
    "D11 · 4/12 周一",
    "马拉加 → 格拉纳达",
    "包车约 1.5–2 小时；下午阿尔拜辛区与圣尼古拉斯观景台。阿尔罕布拉放到次日，避免车程影响预约。",
    "格拉纳达"
   ],
   [
    "D12 · 4/13 周二",
    "格拉纳达",
    "整天留给阿尔罕布拉及赫内拉利费。先确认含纳斯里德宫的票和入场时段；花园已在建筑群参观内，不重复计算成另一个全天。",
    "格拉纳达"
   ],
   [
    "D13 · 4/14 周三",
    "格拉纳达 → 托莱多",
    "包车按 4–4.5 小时规划，含用餐休息留约 5–6 小时。抵达后先看山谷观景台和老城，托莱多大教堂放次日上午，不再赶去马德里。",
    "托莱多"
   ],
   [
    "D14 · 4/15 周四",
    "托莱多 → 马德里",
    "上午托莱多大教堂、圣多美教堂二选一或按开放顺游；午后约 1–1.5 小时包车进马德里。入住后主广场或丽池公园。",
    "马德里"
   ],
   [
    "D15 · 4/16 周五",
    "马德里",
    "王宫与老城，或普拉多与丽池公园，选一组为主；另一组挑重点，留时间购物与整理行李。",
    "马德里"
   ],
   [
    "D16 · 4/17 周六",
    "马德里 → 上海",
    "MU710 公开计划 11:05 起飞，4/18 05:50 抵沪，均当地时间。建议约 08:05 到机场，具体依航司要求；未核验可售座位。",
    "机上"
   ],
   [
    "D17 · 4/18 周日",
    "抵达上海",
    "按参考时刻 05:50 抵达上海浦东，留出休息时间。",
    "—"
   ]
  ]
 }
];
const cultureStays = [
 {
  "city": 0,
  "nights": "返程前连住 3–4 晚",
  "priority": "优先加 1–2 晚",
  "halfday": "国家考古博物馆与普拉多分开半天；另可核对皇家剧院或拉斯文塔斯场次。",
  "route": "两条包车路线"
 },
 {
  "city": 1,
  "nights": "3–4 晚，艺术兴趣强选 4 晚",
  "priority": "可加 1 晚",
  "halfday": "圣保罗医院与圣家堂分时预约；港口游船另留短时段，美术馆单独挑选。",
  "route": "两条包车路线"
 },
 {
  "city": 3,
  "nights": "建议 3 晚",
  "priority": "可加 1 晚",
  "halfday": "伊塔利卡往返留半天；另半天在美术馆、特里亚纳陶瓷与河上游船中选择。",
  "route": "两条包车路线"
 },
 {
  "city": 4,
  "nights": "2 晚基础；文化慢游选 3 晚",
  "priority": "有兴趣再加 1 晚",
  "halfday": "卡尔图哈修道院单列半天；洞穴弗拉明戈留一个晚间，阿尔罕布拉仍单独预约。",
  "route": "两条包车路线"
 },
 {
  "city": 6,
  "nights": "保留 2 晚；休整兼看馆可 3 晚",
  "priority": "不必默认加住",
  "halfday": "历史植物园或蓬皮杜中心各留半天；国王小道需含往返的大半天。",
  "route": "内陆 17 天路线"
 },
 {
  "city": 2,
  "nights": "2 晚基础；工艺与艺术慢游 3 晚",
  "priority": "东海岸路线可选",
  "halfday": "阿尔布费拉留半天；IVAM 与老城另半天。水法庭只有合适的星期四才安排。",
  "route": "东海岸 15 天路线"
 },
 {
  "city": 5,
  "nights": "1 晚通常足够；庭院深看可 2 晚",
  "priority": "保留次日上午",
  "halfday": "麦地那·阿萨哈拉留城外半天；老城庭院和马术活动按开放与场次安排。",
  "route": "东海岸 15 天路线"
 },
 {
  "city": 20,
  "nights": "1 晚基础；考古兴趣强可 2 晚",
  "priority": "遗址与馆配着看",
  "halfday": "国家罗马艺术博物馆与剧场分开半天，再留渡槽、河岸短走；戏剧节属夏季。",
  "route": "内陆 17 天路线"
 }
];
const localActivities = [
 {
  "id": "granada-cave",
  "city": 4,
  "type": "现场演出",
  "title": "萨克罗蒙特洞穴弗拉明戈",
  "venue": "Zambra María la Canastera",
  "description": "萨克罗蒙特的洞穴 Zambra 将弗拉明戈与当地吉卜赛文化、山坡洞穴空间联系起来。低矮白墙、铜器与老照片让环境很有地方性，歌者、吉他和舞者通常离观众较近；可留意舞步、掌声节奏、歌唱与彼此回应。",
  "duration": "演出约 1 小时；另留上山、入场与返程时间",
  "schedule": "官网当前通常 19:45 开演，建议提前 20 分钟到；2027 年场次待核对。",
  "fit": "适合阿尔拜辛、圣尼古拉斯观景台那天下午之后；洞穴场与 Zoraya 二选一即可。晚间接送先和包车司机约好上落客点。",
  "query": "Zambra Maria la Canastera Camino del Sacromonte 89 Granada Spain",
  "address": "Camino del Sacromonte 89, Granada",
  "url": "https://www.marialacanastera.com/en/",
  "season": "按营业与预约安排"
 },
 {
  "id": "granada-zoraya",
  "city": 4,
  "type": "现场演出",
  "title": "花园宅邸里的弗拉明戈之夜",
  "venue": "Jardines de Zoraya",
  "description": "场所在阿尔拜辛传统 carmen 宅邸内，带花园与餐厅。想把散步、晚餐和一场演出连起来，可以选择这里；演出场地和花园用餐区域以所订产品安排为准。",
  "duration": "演出约 60 分钟；含用餐建议留 2–3 小时",
  "schedule": "官网当前列 18:00、20:00、22:30；这是现行参考，非已确认的 2027 演出表。",
  "fit": "与阿尔拜辛同一天最顺路。只看一场时，在洞穴氛围与宅邸用餐便利之间选；餐食是否包含须看票种。",
  "query": "Jardines de Zoraya Calle Panaderos 32 Granada Spain",
  "address": "Calle Panaderos 32, Granada",
  "url": "https://flamencogranada.com/en/",
  "season": "按营业与预约安排"
 },
 {
  "id": "granada-class",
  "city": 4,
  "type": "动手体验",
  "title": "自己试一节弗拉明戈入门课",
  "venue": "Jardines de Zoraya · initiation class",
  "description": "比连续看两场表演更有参与感：通过入门课接触基本节奏与动作，再看舞台上的表现。适合愿意活动身体、对舞蹈好奇的人；课程语言和是否适合零基础可在预约时确认。",
  "duration": "课程约 1 小时",
  "schedule": "官网当前介绍每日 15:30 的入门课；实际日期和课程安排以预约页为准。",
  "fit": "建议放在格拉纳达加住的第三天；两晚版若阿宫已排满，就只保留晚间演出。",
  "query": "Jardines de Zoraya Calle Panaderos 32 Granada Spain",
  "address": "Calle Panaderos 32, Granada",
  "url": "https://flamencogranada.com/en/",
  "season": "按营业与预约安排"
 },
 {
  "id": "granada-hammam",
  "city": 4,
  "type": "放松体验",
  "title": "阿拉伯浴场休整",
  "venue": "Hammam Al Ándalus Granada",
  "description": "在不同水温的浴池间放慢节奏，选择单纯水疗或含按摩的项目，适合连续古城步行之后休整。这里是现代经营的浴场体验；历史浴场遗址 El Bañuelo 则是参观古建，两者要分开安排。",
  "duration": "建议留 1.5–2 小时，具体按所订套餐",
  "schedule": "按官网日期与时段预约；按摩、搓浴并非所有票种都含。",
  "fit": "阿尔罕布拉游览后的傍晚可以选这一项；与晚间演出之间留出换衣、吃饭和交通时间。",
  "query": "Hammam Al Andalus Granada Calle Santa Ana 16 Spain",
  "address": "Calle Santa Ana 16, Granada",
  "url": "https://granada.hammamalandalus.com/en/hammam-experiences/",
  "season": "按营业与预约安排"
 },
 {
  "id": "granada-tapas",
  "city": 4,
  "type": "当地饮食",
  "title": "老城 Tapas 小吃散步",
  "venue": "格拉纳达老城酒吧街区",
  "description": "在两三家小店少量点单，比赶一顿正式大餐更容易接触本地日常。格拉纳达有点饮品附带小吃的传统，具体是否附送、能否自选和份量仍看各店规则；也可以直接点喜欢的小盘菜。",
  "duration": "建议 1.5–2 小时",
  "schedule": "自由安排；不把每家店都默认成“免费小吃”。",
  "fit": "可作抵达日轻松晚餐。看演出当天先吃一点，回程不必再赶第二个预约。",
  "query": "Calle Navas Granada Spain",
  "address": "地图参考：Calle Navas 一带（街区，非指定餐厅）",
  "url": "https://turismo.granada.org/en/what-do/tapas-granada",
  "season": "按营业与预约安排"
 },
 {
  "id": "barcelona-music",
  "city": 1,
  "type": "建筑与音乐",
  "title": "音乐宫导览，或挑一场音乐会",
  "venue": "Palau de la Música Catalana",
  "description": "在彩色玻璃、马赛克与雕塑包围的音乐厅里，建筑本身就很值得慢看。想认真了解装饰细节选导览；更想感受声音与空间的关系，则按出行日期选一场自己喜欢的音乐会。",
  "duration": "导览建议留 1–1.5 小时；音乐会按节目单",
  "schedule": "导览和演出是不同产品；2027 年具体曲目、开放区域与语言以官网为准。",
  "fit": "与哥特区、博恩区同一天较方便。演出安排在抵达第二晚以后，留出适应时差的时间。",
  "query": "Palau de la Musica Catalana Barcelona Spain",
  "address": "Palau de la Música Catalana, Barcelona",
  "url": "https://www.palaumusica.cat/en/discover-the-palau_1633301",
  "season": "按营业与预约安排"
 },
 {
  "id": "madrid-opera",
  "city": 0,
  "type": "建筑与音乐",
  "title": "皇家歌剧院导览或歌剧之夜",
  "venue": "Teatro Real",
  "description": "除了王宫与收藏馆，还能看看一座歌剧院怎样运作。普通导览偏公共空间与剧院历史；后台技术、艺术导览是不同项目，语言与年龄要求要逐项核对。晚上则可按节目表选择歌剧、舞蹈或音乐会。",
  "duration": "语音导览约 50–60 分；普通导览约 75 分；演出另计",
  "schedule": "现行官网普通导览有英、西、法语安排，后台项目限制不同；2027 日期待确认。",
  "fit": "放在最后连续住马德里的阶段，与王宫一带顺路。返程前晚别默认选结束很晚的剧目。",
  "query": "Teatro Real Plaza de Isabel II Madrid Spain",
  "address": "Plaza de Isabel II, Madrid",
  "url": "https://www.teatroreal.es/en/tours",
  "season": "按营业与预约安排"
 },
 {
  "id": "seville-flamenco",
  "city": 3,
  "type": "现场演出",
  "title": "先看舞蹈博物馆，再看现场",
  "venue": "Museo del Baile Flamenco",
  "description": "白天先了解弗拉明戈的表达与舞蹈背景，晚上再看现场表演，适合第一次接触、希望看得更懂的人。官网有博物馆加演出的组合选择，参观和演出的入场安排需分别留意。",
  "duration": "组合建议留 2–2.5 小时，按实际场次调整",
  "schedule": "官网按日期售票；博物馆参观与演出时段不是同一件事。",
  "fit": "如果格拉纳达已经订洞穴演出，这里可只看博物馆，把另一个晚上留给宅邸、河边和晚餐。",
  "query": "Museo del Baile Flamenco Calle Manuel Rojas Marcos 3 Sevilla Spain",
  "address": "Calle Manuel Rojas Marcos 3, Sevilla",
  "url": "https://tickets.museodelbaileflamenco.com/eng/completa-reserva-step1.php?actividadPK=14",
  "season": "按营业与预约安排"
 },
 {
  "id": "seville-ceramics",
  "city": 3,
  "type": "传统工艺",
  "title": "特里亚纳陶瓷老厂与街区散步",
  "venue": "Centro Cerámica Triana",
  "description": "从旧陶瓷工厂的空间与生产遗存，理解塞维利亚建筑上色彩鲜明的瓷砖从哪里来，再到周边街道看陶瓷店和街区生活。这里的地方性来自传统工艺与真实生产空间。",
  "duration": "建议 2–3 小时，含陶瓷中心与街区",
  "schedule": "中心是参观项目；若另选手作课程，要向具体工作室预约，不能默认入馆票含体验。",
  "fit": "塞维利亚多住一晚时，安排半天特里亚纳，傍晚沿河吃饭；不要与王宫、大教堂挤成同一上午。",
  "query": "Centro Ceramica Triana Sevilla Spain",
  "address": "Centro Cerámica Triana, Sevilla",
  "url": "https://visitasevilla.es/en/centro-ceramica-triana/",
  "season": "按营业与预约安排"
 },
 {
  "id": "valencia-albufera",
  "city": 2,
  "type": "自然与饮食",
  "title": "阿尔布费拉乘船＋当地米饭午餐",
  "venue": "L’Albufera · El Palmar",
  "description": "到湖区和稻田边看看瓦伦西亚城市之外的生活，在 El Palmar 吃一餐米饭，再坐传统小船看潟湖景色。与艺术科学城的城市建筑形成很好的变化，也适合包车灵活接送。",
  "duration": "建议半天 4–5 小时，含往返与用餐",
  "schedule": "当地旅游局有船游加米饭餐产品；开航受天气影响。日落游与午餐产品未必是同一场次。",
  "fit": "东海岸路线在瓦伦西亚留一个完整半天；如果只住两晚，艺术馆、海边和湖区需要取舍。",
  "query": "El Palmar Valencia Spain",
  "address": "El Palmar（湖区村庄参考位置，码头以订单为准）",
  "url": "https://www.visitvalencia.com/en/what-to-see-valencia/albufera-natural-park",
  "season": "按营业与预约安排"
 },
 {
  "id": "cordoba-horse",
  "city": 5,
  "type": "现场演出",
  "title": "皇家马厩的安达卢西亚马术表演",
  "venue": "Caballerizas Reales · Pasión y Duende",
  "description": "在皇家马厩观看以安达卢西亚马为主角的骑术展示，把白天的历史建筑参观接到晚上的地方表演。适合想在弗拉明戈之外再选一种安达卢西亚体验的人。",
  "duration": "建议留 1.5–2 小时含到场；演出时长以票面为准",
  "schedule": "以 Córdoba Ecuestre 当日节目和售票为准，未确认 2027 清明场次。",
  "fit": "很适合科尔多瓦住一晚的方案；先确认有合适场次，再决定把维亚纳宫留到翌日上午。",
  "query": "Caballerizas Reales Cordoba Spain",
  "address": "Calle Caballerizas Reales 1, Córdoba",
  "url": "https://www.turismodecordoba.org/the-passion-and-spirit-of-andalusian-horse",
  "season": "按营业与预约安排"
 },
 {
  "id": "malaga-espeto",
  "city": 6,
  "type": "当地饮食",
  "title": "海边吃 Espeto 烤沙丁鱼",
  "venue": "El Palo 海滨街区",
  "description": "在海边餐馆尝试用芦苇签串起、靠炭火烤制的沙丁鱼，配上慢慢散步的午后。它更像一段当地生活体验，不需要把休整日再塞满收费景点。",
  "duration": "建议 2–3 小时，含午餐和海边散步",
  "schedule": "餐馆、当日鱼货与天气影响体验；4 月是否供应、营业和预约出发前再确认。",
  "fit": "内陆路线马拉加第二天上午看一座美术馆，午后到海边；海滨街区停车与上下客请司机现场确认。",
  "query": "Playa de El Palo Malaga Spain",
  "address": "Playa de El Palo（街区参考，非指定餐厅）",
  "url": "https://www.malagaturismo.es/en/post/sardine-skewer",
  "season": "按营业与预约安排"
 },
 {
  "id": "zaragoza-tubo",
  "city": 14,
  "type": "当地饮食",
  "title": "El Tubo 老城小吃巡游",
  "venue": "El Tubo",
  "description": "在紧凑的小巷里选几家小吃店，每家试一两样，比抵达后赶更多大型景点轻松。这里的热闹晚餐氛围，是萨拉戈萨作为一晚中途停留地的好理由。",
  "duration": "建议 1.5–2 小时",
  "schedule": "自由散步与点单；具体店铺按当日营业情况选择。",
  "fit": "巴塞罗那驾车抵达后，先看皮拉尔广场与河景，晚餐到 El Tubo；翌日再决定是否参观宫殿。",
  "query": "El Tubo Zaragoza Spain",
  "address": "El Tubo 老城街区",
  "url": "https://www.spain.info/es/lugares-interes/barrio-el-tubo/",
  "season": "按营业与预约安排"
 },
 {
  "id": "toledo-craft",
  "city": 8,
  "type": "动手体验",
  "title": "托莱多金银镶嵌／制剑工艺体验",
  "venue": "Go Craft · 当地工艺工作坊",
  "description": "托莱多的 damasquinado 把金银嵌入金属，细节与耐心比纪念品柜台更值得看。市旅游局列有参与式金银镶嵌和制剑工作坊，可以先询问适合你们人数、语言和时间的课程。",
  "duration": "建议预留 1–2 小时，按工作坊确认",
  "schedule": "须预约。具体工坊、集合地址、语言与可体验内容由组织方确认；地图仅定位托莱多老城。",
  "fit": "内陆线托莱多住一晚时更从容；东海岸可选途中停留版不宜同时安排完整工坊和大教堂深游。",
  "query": "Toledo Spain",
  "address": "预约后确认集合点；地图仅为城市参考位置",
  "url": "https://turismo.toledo.es/recursos/id32765-go-craft.html",
  "season": "按营业与预约安排"
 },
 {
  "id": "ronda-winery",
  "city": 7,
  "type": "当地饮食",
  "title": "龙达乡间酒庄参观与品鉴",
  "venue": "Bodega García Hidalgo",
  "description": "酒庄提供葡萄种植、酿造与陈酿区域参观，配合品酒，更适合愿意为乡间生活多留一点时间的人。包车可以接送，但庄园往返、参观和午餐要作为额外行程计算。",
  "duration": "建议留 2–3 小时另加接送；具体套餐时长询问酒庄",
  "schedule": "官网要求联系确认预约和价格；2027 清明可用日期未核实。",
  "fit": "原东海岸路线是格拉纳达经龙达到塞维利亚的长日子，若加酒庄，建议龙达住一晚或删减其他停留。",
  "query": "Bodega Garcia Hidalgo Ronda Spain",
  "address": "Bodega García Hidalgo, Ronda（以预约接待入口为准）",
  "url": "https://bodegasgarciahidalgo.es/en/alojamiento-casa-rural/",
  "season": "按营业与预约安排"
 },
 {
  "id": "alicante-market",
  "city": 16,
  "type": "当地饮食",
  "title": "中央市场采购日常与米饭料理",
  "venue": "Mercado Central de Alicante",
  "description": "看海鲜、蔬果与本地食材摊位，再挑一餐阿利坎特米饭料理。比只把这座城市当成拆分长途的睡觉站，更容易记住它的地中海饮食特色。",
  "duration": "建议 1.5–2 小时，含市场与周边用餐",
  "schedule": "市场和餐馆各自营业；次日要长途去格拉纳达，不把午餐预约排得太晚。",
  "fit": "适合抵达当天尚在营业时顺访，或翌日早晨短逛；先核对具体日期营业时间。",
  "query": "Mercado Central de Alicante Spain",
  "address": "Mercado Central de Alicante",
  "url": "https://alicanteturismo.com/en/gastronomy/",
  "season": "按营业与预约安排"
 },
 {
  "city": 0,
  "id": "madrid-ventas",
  "type": "传统竞技",
  "title": "拉斯文塔斯：斗牛赛或场馆参观",
  "venue": "Plaza de Toros de Las Ventas",
  "description": "马德里的斗牛文化可通过实际赛事、场馆建筑和历史展示了解。赛事与日常导览是两种不同产品；实际斗牛包含公牛受伤或死亡的场面，按对这一传统的接受程度自行选择。",
  "duration": "导览约 1–1.5 小时；赛事按当场时长",
  "season": "赛事按日期",
  "schedule": "查看正式赛历后再购票；不能把五月至六月的圣伊西德罗赛季默认安排到四月。无比赛时可核对场馆参观。2027 场次未在此确认。",
  "fit": "适合马德里加住时单独留半天，不与普拉多的大馆时段挤在一起。",
  "query": "Las Ventas Madrid",
  "address": "Calle de Alcalá 237，市中心以东。",
  "url": "https://www.esmadrid.com/en/bullfighting-madrid",
  "added": "2026-09-20"
 },
 {
  "city": 1,
  "id": "barcelona-boat",
  "type": "游船与渡轮",
  "title": "Las Golondrinas 港口游船",
  "venue": "Moll de les Drassanes",
  "description": "从水面看巴塞罗那作为港口城市的一面，包括码头、海滨建筑与港湾作业。可选短港湾航线或较长海岸航线，订票时注意它们的航程不同。",
  "duration": "船程约 40 或 60 分钟，另留候船时间",
  "season": "看船期与海况",
  "schedule": "当前 40 分钟航线网页列有周末班次，不能默认工作日都有；实际日期、停航与航线以运营方为准。",
  "fit": "哥特区或海事博物馆方向步行后接一段船程。",
  "query": "Las Golondrinas Barcelona Moll Drassanes",
  "address": "哥伦布纪念碑附近的 Drassanes 码头；以船票集合点为准。",
  "url": "https://lasgolondrinas.com/en/tour/barcelona-port-40-min/",
  "added": "2026-09-20"
 },
 {
  "city": 2,
  "id": "valencia-watercourt",
  "type": "地方传统",
  "title": "旁听瓦伦西亚水法庭",
  "venue": "Tribunal de las Aguas",
  "description": "这是灌溉水权传统延续至今的公共审理机构，与周边农业和城市历史紧密相关。到场的重点是理解制度与仪式，不是等待一场专为游客编排的演出。",
  "duration": "现场约 15–30 分钟，提前到达",
  "season": "固定星期",
  "schedule": "通常周四中午 12 点在大教堂使徒门举行；节假日、特殊安排和实际审理内容需核对。不是每天都有。",
  "fit": "与圣母广场、大教堂及老城步行安排在同一上午。",
  "query": "Tribunal de las Aguas Valencia",
  "address": "Plaza de la Virgen，大教堂 Puerta de los Apóstoles。",
  "url": "https://www.visitvalencia.com/en/what-to-do-valencia/valencian-culture/monuments-in-valencia/water-court",
  "added": "2026-09-20"
 },
 {
  "city": 3,
  "id": "seville-river",
  "type": "游船与渡轮",
  "title": "瓜达尔基维尔河城市游船",
  "venue": "Cruceros Torre del Oro",
  "description": "从河上看桥梁、两岸街区与塞维利亚的航运历史景观。它是一段城市水上游览，可以与特里亚纳岸边步行对照着看。",
  "duration": "船程约 1 小时，另留候船时间",
  "season": "看船期与水况",
  "schedule": "船票所含航线、语言和班次按当天确认；晚霞、餐饮或私人包船不等于普通观光票。",
  "fit": "黄金塔附近登船，可接特里亚纳或王宫周边的半天。",
  "query": "Cruceros Torre del Oro Sevilla",
  "address": "黄金塔旁码头；按运营方票面确认。",
  "url": "https://crucerosensevilla.com/entradas/paseo-en-barco-por-sevilla/",
  "added": "2026-09-20"
 },
 {
  "city": 5,
  "id": "cordoba-patios",
  "type": "地方传统",
  "title": "圣巴西利奥庭院街区探访",
  "venue": "Patios de San Basilio",
  "description": "以日常居住庭院和街巷理解科尔多瓦的院落文化：植物、用水、遮阴与邻里生活共同构成空间。可选择当期开放庭院路线，不必只把庭院等同于一座宫殿。",
  "duration": "1.5–2 小时",
  "season": "常设路线与五月节庆分开",
  "schedule": "著名庭院节主要在五月；四月只能按全年开放或预约路线参观，花量与可进庭院不同。Trueque Cuatro 的临时关闭信息需复核，暂不作为必去点。",
  "fit": "可在清真寺大教堂之后单独留一段慢行时间。",
  "query": "San Basilio patios Cordoba",
  "address": "San Basilio 街区；参观集合点随所选开放路线。",
  "url": "https://www.turismodecordoba.org/visitar-patios-de-cordoba-1",
  "added": "2026-09-20"
 },
 {
  "city": 6,
  "id": "malaga-caminito",
  "type": "户外与自然",
  "title": "国王小道峡谷步道（城外）",
  "venue": "Caminito del Rey",
  "description": "沿峡谷岩壁上的栈道看河谷与工业工程遗存，是马拉加腹地的代表性户外体验。它与市中心散步不同，需要按入口、单向线路和接驳安排完整半天以上。",
  "duration": "约 5–7 小时，含马拉加往返与接驳",
  "season": "预约且看天气",
  "schedule": "提前订时段；目前不接待 8 岁以下儿童。北入口步行接近、游览与终点接驳需一起核对，恶劣天气可能关闭。",
  "fit": "建议马拉加多住一天时安排，不放进当天已含长途转场的行程。",
  "query": "Caminito del Rey Acceso Norte Ardales",
  "address": "Ardales／El Chorro 一带，远离马拉加市中心。",
  "url": "https://www.caminitodelrey.info/es/tu-visita/preguntas-frecuentes",
  "added": "2026-09-20"
 },
 {
  "city": 7,
  "id": "ronda-gorge",
  "type": "户外与自然",
  "title": "塔霍峡谷步道看新桥",
  "venue": "Desfiladero del Tajo",
  "description": "从峡谷内部或开放步道的较低视角观察龙达新桥、岩壁与城市边缘，和桥面拍照形成不同体验。",
  "duration": "约 1–1.5 小时，按开放路段调整",
  "season": "开放路段需核对",
  "schedule": "该项目存在分阶段建设，不能把规划中的完整线路当作已经开放。按官网当期路线、时段与天气安排订票。",
  "fit": "适合在龙达过夜时安排；短暂中途停靠只选桥面和老城也可。",
  "query": "Desfiladero del Tajo Ronda",
  "address": "老城峡谷步道入口；以预约说明为准。",
  "url": "https://desfiladerodeltajo.info/",
  "added": "2026-09-20"
 },
 {
  "city": 8,
  "id": "toledo-puy",
  "type": "现场演出",
  "title": "Puy du Fou 西班牙历史夜间大秀",
  "venue": "El Sueño de Toledo",
  "description": "用舞台、灯光、群演与大型场景讲述西班牙历史题材。属于艺术化历史娱乐，与托莱多真实古迹参观互为补充，不能当成逐项准确的历史纪录片。",
  "duration": "晚间约 1–1.5 小时；园区日场另计",
  "season": "演出按日期",
  "schedule": "日间园区与夜秀可能是不同票种；2027 演出日历、入场和散场时间需再查。城市导览票不包含此演出。",
  "fit": "更适合托莱多过夜；若演后返回马德里，要预留夜间包车接送。",
  "query": "Puy du Fou Espana Toledo",
  "address": "托莱多西南郊，不能按老城步行抵达计算。",
  "url": "https://turismo.toledo.es/recursos/ocio/id32793-puy-du-fou--espana.html",
  "added": "2026-09-20"
 },
 {
  "city": 9,
  "id": "segovia-balloon",
  "type": "户外与自然",
  "title": "日出热气球俯瞰古城",
  "venue": "Segovia balloon flights",
  "description": "塞哥维亚的高空视角能把渡槽、老城和周边高原放在一幅画面中。飞行轨迹由风决定，不能保证从某座地标正上方经过。",
  "duration": "全程约 3–4 小时；飞行时长看产品",
  "season": "看天气、清晨集合",
  "schedule": "选择旅游局所列运营商，核对集合点、年龄及身体条件要求、取消政策。七月热气球节是另一活动，四月并不等于参加节庆。",
  "fit": "通常需要前一晚住当地或很早从马德里出发。",
  "query": "Segovia vuelo en globo",
  "address": "起飞场地会随风向调整，地图只定位塞哥维亚参考点。",
  "url": "https://www.turismodesegovia.com/es/turismo-deportivo-y-activo/vuela-en-globo",
  "added": "2026-09-20"
 },
 {
  "city": 9,
  "id": "segovia-cochinillo",
  "type": "当地饮食",
  "title": "尝一餐塞哥维亚烤乳猪",
  "venue": "Cochinillo de Segovia",
  "description": "烤乳猪是当地餐桌的代表菜，可以通过传统餐馆的一餐了解卡斯蒂利亚饮食。这里列的是自主用餐，不把餐馆的切盘演示当作每桌保证提供的节目。",
  "duration": "约 1–1.5 小时",
  "season": "自主体验",
  "schedule": "按实际餐馆预订、确认份量及营业日；不需要另买所谓城市体验票。",
  "fit": "渡槽或主广场一带游览后安排午餐。",
  "query": "cochinillo Segovia",
  "address": "地点取决于所选餐馆；地图搜索为餐馆选择参考。",
  "url": "https://www.turismodesegovia.com/es/gastronomia/la-despensa",
  "added": "2026-09-20"
 },
 {
  "city": 10,
  "id": "salamanca-towers",
  "type": "建筑与导览",
  "title": "Ieronimus 大教堂塔楼与高处通道",
  "venue": "Ieronimus",
  "description": "从高处通道、塔楼和建筑内部结构观察新旧大教堂，并俯瞰萨拉曼卡的砂岩城市。与在地面看立面相比，更能理解两座教堂相接的关系。",
  "duration": "约 1–1.5 小时",
  "season": "日场／特别夜场分开",
  "schedule": "查当期时段和台阶通行说明；夜间导览是特定日期项目，不默认每天可订。",
  "fit": "白天搭配老城；订夜场则留意晚餐与结束时间。",
  "query": "Ieronimus Salamanca",
  "address": "大教堂塔楼入口，按 Ieronimus 官方指引。",
  "url": "https://ieronimus.es/informacion/",
  "added": "2026-09-20"
 },
 {
  "city": 10,
  "id": "salamanca-hornazo",
  "type": "当地饮食",
  "title": "面包店尝 Hornazo 肉馅饼",
  "venue": "Hornazo de Salamanca",
  "description": "萨拉曼卡的烘焙传统之一，以面皮包裹肉类等馅料，适合从食物理解地方生活与节日习惯。可买一小份配咖啡，不必安排正式美食团。",
  "duration": "约 30–45 分钟",
  "season": "自主体验",
  "schedule": "这是自主购买品尝，不是已确认的烹饪课程；馅料与售卖时间按店铺确认。",
  "fit": "老城步行时穿插，或作为出发前的简便一餐。",
  "query": "hornazo Salamanca",
  "address": "选择老城营业中的面包店，地图搜索不代表固定集合点。",
  "url": "https://salamanca.es/files/folletos/gastronomia/Gastronomiade_SALAMANCA.pdf",
  "added": "2026-09-20"
 },
 {
  "city": 11,
  "id": "santiago-roof",
  "type": "建筑与导览",
  "title": "大教堂屋顶与 Carraca 塔导览",
  "venue": "Cubiertas y Torre de la Carraca",
  "description": "跟随馆方人员进入大教堂屋顶与塔楼区域，从石屋顶和高处看朝圣城市的街巷结构。与免费进入教堂礼拜空间是不同体验。",
  "duration": "约 1–1.5 小时，以票面为准",
  "season": "须预约导览",
  "schedule": "官方要求这些区域跟团导览，不能独自进入；查看台阶、天气安排与所选语言。",
  "fit": "与大教堂主空间参观放在同一天，留出分开的入场时间。",
  "query": "Museo Catedral de Santiago",
  "address": "大教堂博物馆报到点，以购票说明为准。",
  "url": "https://visitas.catedraldesantiago.es/en/cathedrals-decks-and-carracas-tower/",
  "added": "2026-09-20"
 },
 {
  "city": 11,
  "id": "santiago-market",
  "type": "当地饮食",
  "title": "阿巴斯托斯市场晨间逛吃",
  "venue": "Mercado de Abastos",
  "description": "在石造市场看加利西亚海产、奶酪和农产品，把朝圣古城与当代日常生活联系起来。可自行逛市场，再按营业摊位选择品尝。",
  "duration": "约 1–1.5 小时",
  "season": "自主体验",
  "schedule": "生鲜与餐饮摊位营业可能不同，先查当天营业，优先考虑上午；不默认所有摊位都能现场加工海鲜。",
  "fit": "与老城东侧及民族博物馆方向组合。",
  "query": "Mercado de Abastos Santiago de Compostela",
  "address": "Rúa das Ameas，老城东侧。",
  "url": "https://www.mercadodeabastosdesantiago.com/",
  "added": "2026-09-20"
 },
 {
  "city": 12,
  "id": "bilbao-river",
  "type": "游船与渡轮",
  "title": "毕尔巴鄂河道游船",
  "venue": "Bilboats",
  "description": "沿内尔维翁河看城市从工业港口转向文化都市的景观，包括桥梁、两岸建筑和河岸更新。市区短线与驶向河口的长线是不同产品。",
  "duration": "约 1–2 小时，按航线",
  "season": "按航次预约",
  "schedule": "先选择 Bilbao 市区或河口方向航线，再核对实际航程、语言和班次；不把所有地标都视为短线必经。",
  "fit": "与古根海姆外观和河岸步道分段安排。",
  "query": "Bilboats Bilbao",
  "address": "Pío Baroja 附近码头；以船票为准。",
  "url": "https://bilboats.com/en/inicio/",
  "added": "2026-09-20"
 },
 {
  "city": 12,
  "id": "bilbao-pintxos",
  "type": "当地饮食",
  "title": "老城 Pintxos 小吃巡游",
  "venue": "Casco Viejo pintxos",
  "description": "选两三家酒吧，每家少量尝试，观察吧台冷盘和现做热食的区别。重点是巴斯克城市的社交与小吃习惯，不必把所有店一次吃完。",
  "duration": "约 1.5–2 小时",
  "season": "自主体验",
  "schedule": "这是自行串店安排，不是某个收费团；逐家确认菜单、营业和结账方式。",
  "fit": "七条街或新广场一带傍晚安排。",
  "query": "Plaza Nueva pintxos Bilbao",
  "address": "Casco Viejo／Plaza Nueva 一带，自选店铺。",
  "url": "https://www.bilbaoturismo.net/BilbaoTurismo/es/rutas",
  "added": "2026-09-20"
 },
 {
  "city": 13,
  "id": "sanseb-txotx",
  "type": "地方传统",
  "title": "苹果酒屋 Txotx 开桶与套餐",
  "venue": "Sagardotegi / cider house",
  "description": "在传统苹果酒屋了解从木桶取酒和配套餐食的巴斯克习惯。许多代表性酒屋位于 Astigarraga 等近郊，空间和就餐节奏与老城酒吧不同。",
  "duration": "约 2–3 小时，另加往返",
  "season": "春季传统",
  "schedule": "传统 Txotx 季通常约一月中旬到四月底；全年营业不等于全年都有相同开桶活动。按酒屋确认 2027 日期、套餐和预约。",
  "fit": "可作为圣塞巴斯蒂安多住一晚时的一餐，包车往返近郊。",
  "query": "sagardotegi Astigarraga",
  "address": "主要在 Astigarraga 等近郊，具体酒屋预订后确定。",
  "url": "https://sansebastianturismoa.eus/en/gastronomy/cider/",
  "added": "2026-09-20"
 },
 {
  "city": 13,
  "id": "sanseb-pintxos",
  "type": "当地饮食",
  "title": "Parte Vieja 老城小吃巡游",
  "venue": "Pintxos in Parte Vieja",
  "description": "圣塞巴斯蒂安的特色在于密集酒吧之间的短距离串店，可比较传统冷小吃与现点现做的热菜。它可以是轻松的一餐，无需默认选择高价品鉴菜单。",
  "duration": "约 1.5–2 小时",
  "season": "自主体验",
  "schedule": "逐店查营业和现做菜品；不是已经预订的美食导览。",
  "fit": "贝壳湾或圣特尔莫博物馆之后安排。",
  "query": "Parte Vieja pintxos San Sebastian",
  "address": "老城酒吧街区，按当日营业选择。",
  "url": "https://sansebastianturismoa.eus/en/gastronomy/going-for-pintxos/",
  "added": "2026-09-20"
 },
 {
  "city": 14,
  "id": "zaragoza-kayak",
  "type": "户外与自然",
  "title": "埃布罗河城市皮划艇",
  "venue": "ebroNAUTAS · ebroZGZ",
  "description": "在教练带领下沿河认识城市桥梁、河岸生态与萨拉戈萨的水上视角。属于需要参与划行的活动，与坐观光船不同。",
  "duration": "约半天，按当期产品",
  "season": "预约且看水况",
  "schedule": "官网列有城市航段与近郊航段；夏季黄昏场不能直接套用到四月。查实际开放日、集合点、年龄与水况取消规则。",
  "fit": "单独留半天；当天只中转数小时的话不宜硬塞。",
  "query": "ebroNAUTAS Zaragoza",
  "address": "集合点随航段安排；地图定位为运营方搜索参考。",
  "url": "https://ebronautas.net/ebrozgz-enamorate-de-la-capital-del-ebro/",
  "added": "2026-09-20"
 },
 {
  "city": 15,
  "id": "girona-bike",
  "type": "户外与自然",
  "title": "绿道短程骑行",
  "venue": "Vies Verdes de Girona",
  "description": "利用旧铁路改造的绿道从城市边缘进入周边田野，补充赫罗纳老城之外的风景。选择适合往返距离的一小段，不必完成整条长线路。",
  "duration": "约 2–4 小时",
  "season": "自主体验／可约骑行服务",
  "schedule": "租车、路线坡度和还车点需先确认；官网整条路线里程不能当作短程用时。雨后路况另查。",
  "fit": "适合赫罗纳过夜或多半天时安排。",
  "query": "Vies Verdes Girona",
  "address": "按所选绿道起点和租车点集合；地图为城市绿道参考。",
  "url": "https://girona.cat/turisme/eng/ruta_viesverdes.php",
  "added": "2026-09-20"
 },
 {
  "city": 15,
  "id": "girona-xuixo",
  "type": "当地饮食",
  "title": "尝赫罗纳 Xuixo 奶油甜点",
  "venue": "Xuixo de Girona",
  "description": "以酥脆外皮、糖粒和奶油馅见长的地方甜点，可作为认识赫罗纳饮食传统的小停靠。不是为旅行者臆造的制作课程。",
  "duration": "约 20–40 分钟",
  "season": "自主体验",
  "schedule": "选择当天营业的糕点店；具体口味与是否现做按店铺确认。",
  "fit": "老城或电影博物馆前后安排咖啡休息。",
  "query": "xuixo Girona",
  "address": "老城与市区糕点店，自选店铺。",
  "url": "https://girona.cat/turisme/eng/gastronomia.php",
  "added": "2026-09-20"
 },
 {
  "city": 16,
  "id": "alicante-tabarca",
  "type": "游船与渡轮",
  "title": "乘船去塔巴尔卡岛",
  "venue": "Tabarca ferry / excursion",
  "description": "从港口出发到有人居住的小岛，在城墙街巷、海岸步道与餐馆之间慢行。这是带上岛停留的海岛行程，和不下船的港湾观光不同。",
  "duration": "半天至一天；阿利坎特单程约 1 小时",
  "season": "看船期与海况",
  "schedule": "阿利坎特和 Santa Pola 的船程、港口不同；订好返航班次再安排午餐。四月不以海水游泳作为保证项目。",
  "fit": "包车司机可按选定港口接送；当天不再排满老城大景点。",
  "query": "Tabarca boat Alicante port",
  "address": "从阿利坎特港或 Santa Pola 出发，以实际票为准。",
  "url": "https://alicanteturismo.com/en/tabarca-island/",
  "added": "2026-09-20"
 },
 {
  "city": 17,
  "id": "cadiz-ferry",
  "type": "游船与渡轮",
  "title": "坐海湾公共双体船去对岸",
  "venue": "Catamarán Bahía de Cádiz",
  "description": "使用连接加的斯、圣玛利亚港或罗塔的公共海运，从海面看港湾与城际生活。它是公共交通航班，没有保证的观光讲解或餐饮。",
  "duration": "海上交通加对岸散步约半天",
  "season": "看交通时刻表",
  "schedule": "按交通联盟当天航线与返程时刻规划；海况可能影响运营，替代交通不一定是同一码头发船。",
  "fit": "选一个对岸城市即可，别把全部海湾城市放在一趟短行程。",
  "query": "Terminal Maritima Cadiz",
  "address": "加的斯海运码头；目的地选 El Puerto de Santa María 或 Rota。",
  "url": "https://cmtbc.es/",
  "added": "2026-09-20"
 },
 {
  "city": 17,
  "id": "cadiz-market",
  "type": "当地饮食",
  "title": "中央市场与海港小吃",
  "venue": "Mercado Central de Cádiz",
  "description": "看海港城市的鱼类与海鲜摊位，再按食摊菜单尝炸鱼等当地食物。市场建筑、居民采购和餐饮区共同构成体验。",
  "duration": "约 1–1.5 小时",
  "season": "自主体验",
  "schedule": "生鲜市场与餐饮区营业不完全相同；是否能代加工要逐店问，不能默认所有摊位提供。",
  "fit": "老城上午散步或午餐时加入。",
  "query": "Mercado Central de Cadiz",
  "address": "Plaza de la Libertad 一带。",
  "url": "https://turismo.cadiz.es/es/zonas/mercado-central",
  "added": "2026-09-20"
 },
 {
  "city": 18,
  "id": "palma-train",
  "type": "特色交通",
  "title": "百年木制列车去索列尔",
  "venue": "Tren de Sóller",
  "description": "从帕尔马乘历史列车穿过马略卡内陆与山地，到索列尔小镇；可另外衔接前往海港的电车，感受岛屿不同于帕尔马老城的一面。",
  "duration": "约半天至一天；单程列车约 1 小时",
  "season": "按季节时刻表",
  "schedule": "列车、港口电车与联票覆盖范围分别核对；2027 班次不能直接采用当前时刻表。",
  "fit": "想继续去索列尔港或慢吃午餐时留整天。",
  "query": "Estacio de Soller Palma",
  "address": "帕尔马索列尔铁路站；港口电车属于后续衔接。",
  "url": "https://trendesoller.com/horarios",
  "added": "2026-09-20"
 },
 {
  "city": 18,
  "id": "palma-ensaimada",
  "type": "当地饮食",
  "title": "传统咖啡馆尝 Ensaimada",
  "venue": "Ensaimada de Mallorca",
  "description": "螺旋形糕点是马略卡的代表性食物之一，搭配咖啡或热饮，可在老城走累时认识岛上的烘焙传统。",
  "duration": "约 30–60 分钟",
  "season": "自主体验",
  "schedule": "不同店铺有原味和夹馅等版本，营业与供应按当天为准；这是自行到店品尝。",
  "fit": "帕尔马老城参观间隙安排即可。",
  "query": "ensaimada Palma old town",
  "address": "帕尔马老城糕点店或传统咖啡馆，自选店铺。",
  "url": "https://visitpalma.com/en/dir/ensaimadas-light-airy-and-delicate-pastry/",
  "added": "2026-09-20"
 },
 {
  "city": 19,
  "id": "tenerife-whales",
  "type": "游船与渡轮",
  "title": "特内里费岛西南海域观鲸豚",
  "venue": "Authorized whale-watching operators",
  "description": "从岛西南部港口出海观察海洋哺乳动物，是特内里费有代表性的海上活动。观察对象是野生动物，不能保证每航次的物种和出现距离。",
  "duration": "船程常见约 2–3 小时；从圣克鲁斯出发另留较长接送",
  "season": "看海况、选择授权运营商",
  "schedule": "旅游局列有规范与参与名单，按具体运营商确认航线。主要从 Puerto Colón 等西南港口出发，不是在圣克鲁斯老城码头上船。",
  "fit": "住科斯塔阿德赫或洛斯克里斯蒂亚诺斯时接送方便；从圣克鲁斯出发宜按一日出游计算。",
  "query": "Puerto Colon Tenerife whale watching",
  "address": "岛西南 Adeje／Puerto Colón 等港口，按所订船确认。",
  "url": "https://www.webtenerife.com/que-hacer/naturaleza/avistamiento-cetaceos/carta-sostenibilidad/",
  "added": "2026-09-20"
 },
 {
  "city": 19,
  "id": "tenerife-stars",
  "type": "户外与自然",
  "title": "泰德火山日落与星空活动",
  "venue": "Teide sunset and stars",
  "description": "离开城市灯光，在火山高地观察夜空，并通过导览认识星座与天文环境。日落、缆车、晚餐和望远镜观测是否包含，取决于票种。",
  "duration": "傍晚至夜间，约半天",
  "season": "看云量、风况与日期",
  "schedule": "高海拔夜间寒冷，按运营商说明准备衣物并核对参加条件；缆车运行和能见度并非保证。",
  "fit": "选择覆盖实际住宿区的接送；从北岸或南岸出发均需核对回程，不接紧迫的夜间航班。",
  "query": "Teide National Park Tenerife",
  "address": "泰德国家公园，具体观测点按所订活动。",
  "url": "https://www.volcanoteide.com/en/volcano_teide/stars/sunset_and_stars_on_teide",
  "added": "2026-09-20"
 },
 {
  "city": 20,
  "id": "merida-waterwalk",
  "type": "城市漫步",
  "title": "从渡槽到罗马桥，读古城的用水与交通",
  "venue": "Mérida Roman infrastructure walk",
  "description": "把奇迹渡槽、城市街巷与瓜迪亚纳河上的罗马桥串成一段自主步行，从工程和地形理解罗马城市，而不只围着剧场看古迹。",
  "duration": "约 1.5–2.5 小时，按绕行与休息调整",
  "season": "自主体验",
  "schedule": "这是按公开遗址组织的步行建议，没有声称存在统一售卖的导览产品；需入馆或进入收费遗址时另购票。",
  "fit": "可拆为到达日下午的渡槽和次日离开前的河岸。",
  "query": "Acueducto de los Milagros Merida",
  "address": "奇迹渡槽至罗马桥，路线依住宿和当日天气调整。",
  "url": "https://turismomerida.org/que-ver/acueducto-de-los-milagros/",
  "added": "2026-09-20"
 },
 {
  "city": 20,
  "id": "merida-festival",
  "type": "现场演出",
  "title": "罗马剧场里的古典戏剧节",
  "venue": "Festival Internacional de Teatro Clásico de Mérida",
  "description": "夏季在古罗马剧场观看戏剧，把遗址从白天的参观空间变为夜间舞台。实际剧目、语言和演出形式每届不同。",
  "duration": "一个晚间，按剧目",
  "season": "主要夏季｜清明不排",
  "schedule": "已核对的 2026 届属于夏季活动；2027 日历仍需确认。四月清明行程只能安排遗址参观，不能把夏季戏剧节列成当晚可看。",
  "fit": "仅当旅行改到夏季时考虑，演出当晚宜住梅里达。",
  "query": "Teatro Romano Merida",
  "address": "罗马剧场；以所选剧目场地为准。",
  "url": "https://www.festivaldemerida.es/archivo/edicion-72-2026/",
  "added": "2026-09-20"
 },
 {
  "city": 21,
  "id": "lisbon-fado",
  "type": "现场演出",
  "title": "里斯本 Fado 现场演唱",
  "venue": "Fado in Chiado / licensed venues",
  "description": "通过葡萄牙吉他、歌声和小型现场空间认识里斯本的 Fado 传统。可选单独演出，也可选择含晚餐的场所，两者时长与预算不同。",
  "duration": "纯演出约 1 小时；晚餐场另计",
  "season": "按场次预约",
  "schedule": "此处官方链接为 Chiado 演出介绍；若选 Alfama 餐厅场需另查票价、最低消费和演出开始时间。",
  "fit": "白天游览后安排，晚餐和演出是否合并由所选票种决定。",
  "query": "Fado in Chiado Lisbon",
  "address": "Chiado 或所选 Fado 场所，不能把所有场次定位在同一家。",
  "url": "https://www.visitlisboa.com/en/places/fado-in-chiado",
  "added": "2026-09-20"
 },
 {
  "city": 21,
  "id": "lisbon-tagus",
  "type": "游船与渡轮",
  "title": "特茹河游船看里斯本河岸",
  "venue": "Tagus / Yellow Boat",
  "description": "从宽阔河面看里斯本山坡、桥梁与贝伦方向的河岸建筑。短巡游、随上随下和日落航次各有不同停靠与时长。",
  "duration": "约 1–2 小时，按产品",
  "season": "按船期预约",
  "schedule": "先选具体航线，再确认上下船码头、停靠和末班；日落时间与航班会随季节改变。",
  "fit": "可与贝伦或商业广场周边组合，交通方式按实际停靠选择。",
  "query": "Terreiro do Paco Lisbon boat",
  "address": "常见码头在商业广场河岸等处，以所购产品为准。",
  "url": "https://yellowbustours.com/en/lisbon/products",
  "added": "2026-09-20"
 },
 {
  "city": 22,
  "id": "porto-sixbridges",
  "type": "游船与渡轮",
  "title": "杜罗河六桥短程游船",
  "venue": "Cruzeiro das Seis Pontes",
  "description": "沿波尔图与加亚之间的河道看桥梁、陡岸建筑与酒窖区，适合在岸上散步之外补充水面视角。它是市区短游，不是深入杜罗河谷的一日航程。",
  "duration": "船程约 50 分钟，另留候船",
  "season": "看船期与水况",
  "schedule": "核对从 Ribeira 还是 Gaia 岸上船；常规票是否含讲解、酒窖或品酒因产品不同。",
  "fit": "Ribeira 和路易一世大桥附近游览前后安排。",
  "query": "Douro Acima Ribeira Porto",
  "address": "波尔图 Ribeira／加亚码头，按船票确认。",
  "url": "https://www.douroacima.pt/pt/cruzeiro-no-douro-pt/",
  "added": "2026-09-20"
 },
 {
  "city": 22,
  "id": "porto-cellar",
  "type": "地方传统",
  "title": "加亚波特酒窖导览与品尝",
  "venue": "Taylor’s Port Cellars",
  "description": "过河到 Vila Nova de Gaia，了解波特酒的生产、熟成与贸易历史，再按票种参加品尝。参观重点是酒窖和工艺，与市区零售店试饮不同。",
  "duration": "约 1.5–2 小时",
  "season": "预约场次与语言",
  "schedule": "示例采用 Taylor’s 官方参观，页面列有多语言语音导览；品尝内容和中文选项需按预订确认，其他酒窖另查。",
  "fit": "可与加亚河岸或六桥游船组成半天，注意上坡步行。",
  "query": "Taylors Port Cellars Vila Nova de Gaia",
  "address": "Rua do Choupelo，加亚一侧。",
  "url": "https://www.taylor.pt/en/visit-taylors/port-cellars",
  "added": "2026-09-20"
 },
 {
  "id": "tenerife-masca",
  "city": 19,
  "type": "户外与自然",
  "title": "马斯卡峡谷徒步与海上返程",
  "venue": "Camino del Barranco de Masca",
  "description": "从山村沿峡谷下行至海岸，近看火山岩壁与谷地植被，再按预约乘船离开。这是一项独立的户外行程，需要体力、装备和成套接驳安排。",
  "duration": "建议留一整天，含到接驳点、候车、徒步和船程",
  "season": "按开放、天气和预约安排",
  "schedule": "按 2026-09-20 官网：自行前往者须在 Santiago del Teide 换乘 TITSA 355 公交（约 20 分钟），在预约下行时段前至少 1 小时到公交集合点，提前 30 分钟到游客中心检查。另购离谷船票及洛斯吉甘特斯回接驳点的交通；出发前复核。",
  "fit": "住岛西南部接送较直接；当天不再安排泰德或阿纳加。",
  "query": "Centro de Visitantes de Masca Tenerife",
  "address": "Masca 游客中心；自驾停在 Santiago del Teide 官方指定停车点后按预约换乘。",
  "url": "https://www.caminobarrancodemasca.com/en/masca/getting-here/",
  "added": "2026-09-20"
 },
 {
  "id": "tenerife-food",
  "city": 19,
  "type": "当地饮食",
  "title": "北岸小馆尝加那利风味",
  "venue": "Guachinche · 北部传统餐馆",
  "description": "在北岸行程中留一餐，尝试 papas arrugadas 盐煮小土豆配 mojo 酱、当地鱼类或炖菜，认识海岛饮食。Guachinche 是当地餐饮传统，具体菜单和供应随餐馆变化。",
  "duration": "1–1.5 小时，交通另计",
  "season": "按餐馆营业与当日菜单",
  "schedule": "这是自主用餐建议，没有指定统一售卖产品；预约、营业日、过敏原和菜单向所选餐馆确认。",
  "fit": "适合拉奥罗塔瓦与克鲁斯港之间午餐；品酒者安排司机。",
  "query": "Guachinche La Orotava Tenerife",
  "address": "拉奥罗塔瓦、克鲁斯港及北岸周边，地图为区域查询。",
  "url": "https://www.spain.info/en/destination/puerto-la-cruz/",
  "added": "2026-09-20"
 }
];
const flightData = {
 "checked": "2026-09-18",
 "status": "第三方公开计划班表覆盖所选日期；未核验航司当日可售库存，未出票。",
 "timezone": "均为机场当地时间。2027 年 4 月西班牙本土为 CEST（UTC+2），上海为 UTC+8，相差 6 小时；+1 为次日抵达。",
 "flights": [
  {
   "code": "MU249",
   "airline": "中国东方航空",
   "from": "上海浦东 PVG",
   "to": "巴塞罗那 BCN",
   "departDate": "2027-04-02",
   "depart": "00:40",
   "arriveDate": "2027-04-02",
   "arrive": "08:05",
   "duration": "13 小时 25 分",
   "minutes": 805,
   "terminal": "浦东 T1 → 巴塞罗那 T1",
   "valid": "2027-03-28—09-07，所选周五列班",
   "use": "包车环游 / 经典综合 / 轻松双城去程",
   "source": "https://www.flight.info/MU249"
  },
  {
   "code": "CA839",
   "airline": "中国国际航空",
   "from": "上海浦东 PVG",
   "to": "巴塞罗那 BCN",
   "departDate": "2027-04-02",
   "depart": "00:40",
   "arriveDate": "2027-04-02",
   "arrive": "07:55",
   "duration": "13 小时 15 分",
   "minutes": 795,
   "terminal": "浦东 T2 → 巴塞罗那 T1",
   "valid": "2027-04-02—08-17，所选周五列班",
   "use": "包车环游 / 经典综合 / 轻松双城去程备选",
   "source": "https://www.flight.info/CA839"
  },
  {
   "code": "MU709",
   "airline": "中国东方航空",
   "from": "上海浦东 PVG",
   "to": "马德里 MAD",
   "departDate": "2027-04-02",
   "depart": "00:45",
   "arriveDate": "2027-04-02",
   "arrive": "08:40",
   "duration": "13 小时 55 分",
   "minutes": 835,
   "terminal": "浦东 T1 → 马德里 T1",
   "valid": "2027-03-28—09-07，按每日列班",
   "use": "南部古城去程 / 反向行程",
   "source": "https://www.flight.info/MU709"
  },
  {
   "code": "MU710",
   "airline": "中国东方航空",
   "from": "马德里 MAD",
   "to": "上海浦东 PVG",
   "departDate": "2027-04-10",
   "depart": "11:05",
   "arriveDate": "2027-04-11",
   "arrive": "05:50",
   "duration": "12 小时 45 分",
   "minutes": 765,
   "terminal": "马德里 T1 → 浦东 T1",
   "valid": "2027-03-28—08-17，按每日列班",
   "use": "三套现有方案的回程",
   "source": "https://www.flight.info/MU710"
  },
  {
   "code": "MU250",
   "airline": "中国东方航空",
   "from": "巴塞罗那 BCN",
   "to": "上海浦东 PVG",
   "departDate": "2027-04-10",
   "depart": "10:55",
   "arriveDate": "2027-04-11",
   "arrive": "05:25",
   "duration": "12 小时 30 分",
   "minutes": 750,
   "terminal": "巴塞罗那 → 浦东 T1；出发航站楼订票时复核",
   "valid": "2027-03-29—09-14，所选周六列班",
   "use": "反向行程从巴塞罗那出境",
   "source": "https://www.flight.info/MU250"
  },
  {
   "code": "CA840",
   "airline": "中国国际航空",
   "from": "巴塞罗那 BCN",
   "to": "上海浦东 PVG",
   "departDate": "2027-04-10",
   "depart": "12:10",
   "arriveDate": "2027-04-11",
   "arrive": "06:45",
   "duration": "12 小时 35 分",
   "minutes": 755,
   "terminal": "巴塞罗那 T1 → 浦东 T2",
   "valid": "2027-03-28—09-07，按每日列班",
   "use": "反向行程回程备选",
   "source": "https://www.flight.info/CA840"
  }
 ],
 "domestic": {
  "date": "2027-04-05",
  "route": "巴塞罗那 BCN → 塞维利亚 SVQ",
  "airline": "Vueling",
  "duration": "约 1 小时 40 分",
  "status": "未取得 2027-04-05 可核实的具体班号与起降时间。建议优先挑上午出发、下午前抵达的航班；这是选班偏好，不是已确认班次。",
  "source": "https://www.vueling.com/en/flights-from-barcelona-to-seville"
 }
};
const routeMaps = [
 {
  "stops": [
   {
    "id": 1,
    "order": "1",
    "date": "4/2–5",
    "stay": "3 晚"
   },
   {
    "id": 3,
    "order": "2",
    "date": "4/5–7",
    "stay": "2 晚"
   },
   {
    "id": 5,
    "order": "3",
    "date": "4/7",
    "stay": "途中游览"
   },
   {
    "id": 0,
    "order": "4",
    "date": "4/7–10",
    "stay": "3 晚"
   }
  ],
  "optional": [
   {
    "id": 8,
    "order": "选",
    "date": "4/9",
    "stay": "托莱多可选往返"
   }
  ],
  "legs": [
   {
    "from": 1,
    "to": 3,
    "mode": "air",
    "date": "4/5",
    "label": "境内直飞 · 约 1小时40分",
    "bend": -85
   },
   {
    "from": 3,
    "to": 5,
    "mode": "rail",
    "date": "4/7",
    "label": "火车 · 科尔多瓦停留",
    "bend": 0
   },
   {
    "from": 5,
    "to": 0,
    "mode": "rail",
    "date": "4/7",
    "label": "火车 · 抵达马德里",
    "bend": 20
   },
   {
    "from": 0,
    "to": 8,
    "mode": "optional",
    "date": "4/9 可选",
    "label": "一日往返 · 替换当天市内活动",
    "bend": -18
   }
  ],
  "outbound": [
   "MU249",
   "CA839"
  ],
  "inbound": "MU710"
 },
 {
  "stops": [
   {
    "id": 1,
    "order": "1",
    "date": "4/2–6",
    "stay": "4 晚"
   },
   {
    "id": 0,
    "order": "2",
    "date": "4/6–10",
    "stay": "4 晚"
   }
  ],
  "optional": [
   {
    "id": 15,
    "order": "选",
    "date": "4/5",
    "stay": "赫罗纳一日往返"
   },
   {
    "id": 8,
    "order": "选",
    "date": "4/8",
    "stay": "托莱多一日往返"
   }
  ],
  "legs": [
   {
    "from": 1,
    "to": 0,
    "mode": "rail",
    "date": "4/6",
    "label": "高铁 · 两座市中心之间移动",
    "bend": 12
   },
   {
    "from": 1,
    "to": 15,
    "mode": "optional",
    "date": "4/5 可选",
    "label": "火车 · 赫罗纳一日往返",
    "bend": 18
   },
   {
    "from": 0,
    "to": 8,
    "mode": "optional",
    "date": "4/8 可选",
    "label": "火车 · 托莱多一日往返",
    "bend": -18
   }
  ],
  "outbound": [
   "MU249",
   "CA839"
  ],
  "inbound": "MU710"
 },
 {
  "stops": [
   {
    "id": 0,
    "order": "1/5",
    "date": "4/2 与 4/9",
    "stay": "首尾各 1 晚"
   },
   {
    "id": 5,
    "order": "2",
    "date": "4/3–4",
    "stay": "1 晚"
   },
   {
    "id": 4,
    "order": "3",
    "date": "4/4–6",
    "stay": "2 晚"
   },
   {
    "id": 3,
    "order": "4",
    "date": "4/6–9",
    "stay": "3 晚"
   }
  ],
  "optional": [],
  "legs": [
   {
    "from": 0,
    "to": 5,
    "mode": "rail",
    "date": "4/3",
    "label": "高铁 · 马德里至科尔多瓦",
    "bend": -10
   },
   {
    "from": 5,
    "to": 4,
    "mode": "rail",
    "date": "4/4",
    "label": "火车 · 科尔多瓦至格拉纳达",
    "bend": -8
   },
   {
    "from": 4,
    "to": 3,
    "mode": "rail",
    "date": "4/6",
    "label": "火车 · 格拉纳达至塞维利亚",
    "bend": -25
   },
   {
    "from": 3,
    "to": 0,
    "mode": "rail",
    "date": "4/9",
    "label": "高铁 · 回马德里住一晚",
    "bend": -40
   }
  ],
  "outbound": [
   "MU709"
  ],
  "inbound": "MU710"
 },
 {
  "type": "charter",
  "sortStops": true,
  "optionalDefault": false,
  "optionalLabel": "途中加游托莱多",
  "returnDate": "2027-04-15",
  "returnArrival": "2027-04-16",
  "stops": [
   {
    "id": 1,
    "order": "1",
    "sort": 1,
    "date": "4/2–5",
    "stay": "3 晚"
   },
   {
    "id": 2,
    "order": "2",
    "sort": 2,
    "date": "4/5–7",
    "stay": "2 晚"
   },
   {
    "id": 16,
    "order": "3",
    "sort": 3,
    "date": "4/7–8",
    "stay": "1 晚 · 拆分长途"
   },
   {
    "id": 4,
    "order": "4",
    "sort": 4,
    "date": "4/8–10",
    "stay": "2 晚 · 阿宫完整一天"
   },
   {
    "id": 7,
    "order": "5",
    "sort": 5,
    "date": "4/10",
    "stay": "途中游览 · 不住"
   },
   {
    "id": 3,
    "order": "6",
    "sort": 6,
    "date": "4/10–12",
    "stay": "2 晚"
   },
   {
    "id": 5,
    "order": "7",
    "sort": 7,
    "date": "4/12–13",
    "stay": "1 晚"
   },
   {
    "id": 0,
    "order": "9",
    "orderWithoutOptional": "8",
    "sort": 9,
    "date": "4/13–15",
    "stay": "2 晚 · 返程缓冲"
   }
  ],
  "optional": [
   {
    "id": 8,
    "order": "8",
    "sort": 8,
    "date": "4/13 可选",
    "stay": "途中停留 · 当天较长"
   }
  ],
  "legs": [
   {
    "from": 1,
    "to": 2,
    "mode": "car",
    "date": "4/5",
    "label": "包车 · 约 3.5–4 小时",
    "bend": -4
   },
   {
    "from": 2,
    "to": 16,
    "mode": "car",
    "date": "4/7",
    "label": "包车 · 约 2 小时",
    "bend": -5
   },
   {
    "from": 16,
    "to": 4,
    "mode": "car",
    "date": "4/8",
    "label": "包车 · 约 3.5–4 小时",
    "bend": -22
   },
   {
    "from": 4,
    "to": 7,
    "mode": "car",
    "date": "4/10 上午",
    "label": "包车 · 约 2.5 小时；龙达停留",
    "bend": -20
   },
   {
    "from": 7,
    "to": 3,
    "mode": "car",
    "date": "4/10 下午",
    "label": "包车 · 约 1.5–2 小时",
    "bend": -8
   },
   {
    "from": 3,
    "to": 5,
    "mode": "car",
    "date": "4/12",
    "label": "包车 · 约 1.5–2 小时",
    "bend": -5
   },
   {
    "from": 5,
    "to": 0,
    "mode": "car",
    "date": "4/13",
    "label": "包车 · 约 4–4.5 小时",
    "bend": -12,
    "omitWhenOptional": true
   },
   {
    "from": 5,
    "to": 8,
    "mode": "car",
    "date": "4/13 可选",
    "label": "包车 · 约 4–4.5 小时；游览另计",
    "bend": -10,
    "optional": true
   },
   {
    "from": 8,
    "to": 0,
    "mode": "car",
    "date": "4/13 可选",
    "label": "包车 · 约 1 小时；抵达马德里",
    "bend": -17,
    "optional": true
   }
  ],
  "outbound": [
   "MU249",
   "CA839"
  ],
  "inbound": "MU710"
 },
 {
  "type": "charter",
  "variant": "reference",
  "sortStops": true,
  "optionalDefault": false,
  "returnDate": "2027-04-17",
  "returnArrival": "2027-04-18",
  "optional": [],
  "warning": "连线示意城市顺序，不是实际道路导航。马德里标为 3/9：第 3 站中转一晚，第 9 站回来住两晚并出境。按你们的航班方向整理图中蓝色路线；原图公里数、耗时未作为本方案依据。车程不含停留、休息和拥堵。",
  "stops": [
   {
    "id": 1,
    "order": "1",
    "sort": 1,
    "date": "4/2–5",
    "stay": "3 晚"
   },
   {
    "id": 14,
    "order": "2",
    "sort": 2,
    "date": "4/5–6",
    "stay": "1 晚"
   },
   {
    "id": 0,
    "order": "3/9",
    "sort": 3,
    "date": "4/6 与 4/15–17",
    "stay": "中转 1 晚＋最后 2 晚"
   },
   {
    "id": 20,
    "order": "4",
    "sort": 4,
    "date": "4/7–8",
    "stay": "1 晚 · 罗马遗迹"
   },
   {
    "id": 3,
    "order": "5",
    "sort": 5,
    "date": "4/8–10",
    "stay": "2 晚"
   },
   {
    "id": 6,
    "order": "6",
    "sort": 6,
    "date": "4/10–12",
    "stay": "2 晚 · 海边休整"
   },
   {
    "id": 4,
    "order": "7",
    "sort": 7,
    "date": "4/12–14",
    "stay": "2 晚 · 阿宫完整一天"
   },
   {
    "id": 8,
    "order": "8",
    "sort": 8,
    "date": "4/14–15",
    "stay": "1 晚 · 次日上午继续游览"
   }
  ],
  "timeline": [
   {
    "id": 1,
    "order": "1",
    "date": "4/2–5",
    "stay": "3 晚"
   },
   {
    "id": 14,
    "order": "2",
    "date": "4/5–6",
    "stay": "1 晚"
   },
   {
    "id": 0,
    "order": "3",
    "date": "4/6–7",
    "stay": "中转 1 晚"
   },
   {
    "id": 20,
    "order": "4",
    "date": "4/7–8",
    "stay": "1 晚"
   },
   {
    "id": 3,
    "order": "5",
    "date": "4/8–10",
    "stay": "2 晚"
   },
   {
    "id": 6,
    "order": "6",
    "date": "4/10–12",
    "stay": "2 晚"
   },
   {
    "id": 4,
    "order": "7",
    "date": "4/12–14",
    "stay": "2 晚"
   },
   {
    "id": 8,
    "order": "8",
    "date": "4/14–15",
    "stay": "1 晚"
   },
   {
    "id": 0,
    "order": "9",
    "date": "4/15–17",
    "stay": "最后 2 晚 · 出境"
   }
  ],
  "legs": [
   {
    "from": 1,
    "to": 14,
    "mode": "car",
    "date": "4/5",
    "label": "约 3–3.5 小时",
    "bend": -4
   },
   {
    "from": 14,
    "to": 0,
    "mode": "car",
    "date": "4/6",
    "label": "约 3–3.5 小时",
    "bend": -8
   },
   {
    "from": 0,
    "to": 20,
    "mode": "car",
    "date": "4/7",
    "label": "约 3.5–4 小时",
    "bend": 18
   },
   {
    "from": 20,
    "to": 3,
    "mode": "car",
    "date": "4/8",
    "label": "约 2–2.5 小时",
    "bend": 14
   },
   {
    "from": 3,
    "to": 6,
    "mode": "car",
    "date": "4/10",
    "label": "约 2.5–3 小时 · 直接前往",
    "bend": -16
   },
   {
    "from": 6,
    "to": 4,
    "mode": "car",
    "date": "4/12",
    "label": "约 1.5–2 小时",
    "bend": -6
   },
   {
    "from": 4,
    "to": 8,
    "mode": "car",
    "date": "4/14",
    "label": "约 4–4.5 小时",
    "bend": 22
   },
   {
    "from": 8,
    "to": 0,
    "mode": "car",
    "date": "4/15",
    "label": "约 1–1.5 小时 · 回马德里",
    "bend": -15
   }
  ],
  "outbound": [
   "MU249",
   "CA839"
  ],
  "inbound": "MU710"
 }
];
const planDateNotes = [
 "<strong>日期草案：2027 年 4 月 2 日（周五）出发，4 月 11 日（周日）抵沪</strong><p>共 10 个日历日，含往返飞行；境外 8 晚，约 7 个完整游览日，加上抵达日。清明为 <a href=\"https://www.timeanddate.com/holidays/china/qing-ming-jie\" target=\"_blank\" rel=\"noopener\">4 月 5 日（周一）</a>。按通常周末休息估算，请假 4 月 2 日及 6–9 日共 5 个工作日；2027 年官方放假调休安排本次尚未查到，需发布后复核。</p><p>2027 年复活节为 <a href=\"https://www.timeanddate.com/holidays/spain/2027\" target=\"_blank\" rel=\"noopener\">3 月 28 日</a>，上述日期位于圣周之后。行程是规划草案，尚未核实对应日期可售座位、票价或酒店库存。</p>",
 "<strong>日期草案：2027 年 4 月 2 日（周五）出发，4 月 11 日（周日）抵沪</strong><p>共 10 个日历日，含往返飞行；境外 8 晚，约 7 个完整游览日，加上抵达日。清明为 <a href=\"https://www.timeanddate.com/holidays/china/qing-ming-jie\" target=\"_blank\" rel=\"noopener\">4 月 5 日（周一）</a>。按通常周末休息估算，请假 4 月 2 日及 6–9 日共 5 个工作日；2027 年官方放假调休安排本次尚未查到，需发布后复核。</p><p>2027 年复活节为 <a href=\"https://www.timeanddate.com/holidays/spain/2027\" target=\"_blank\" rel=\"noopener\">3 月 28 日</a>，上述日期位于圣周之后。行程是规划草案，尚未核实对应日期可售座位、票价或酒店库存。</p>",
 "<strong>日期草案：2027 年 4 月 2 日（周五）出发，4 月 11 日（周日）抵沪</strong><p>共 10 个日历日，含往返飞行；境外 8 晚，约 7 个完整游览日，加上抵达日。清明为 <a href=\"https://www.timeanddate.com/holidays/china/qing-ming-jie\" target=\"_blank\" rel=\"noopener\">4 月 5 日（周一）</a>。按通常周末休息估算，请假 4 月 2 日及 6–9 日共 5 个工作日；2027 年官方放假调休安排本次尚未查到，需发布后复核。</p><p>2027 年复活节为 <a href=\"https://www.timeanddate.com/holidays/spain/2027\" target=\"_blank\" rel=\"noopener\">3 月 28 日</a>，上述日期位于圣周之后。行程是规划草案，尚未核实对应日期可售座位、票价或酒店库存。</p>",
 "<strong>新推荐：2027 年 4 月 2 日出发，4 月 15 日从马德里回国，4 月 16 日抵沪</strong><p>暂按 15 个日历日、境外 13 晚安排；巴塞罗那进、马德里出，必去格拉纳达，城际全部包车。4/2 凌晨起飞，需 4/1 晚到浦东。日期仍可按假期与机票调整，2027 官方调休安排需发布后复核。</p><p>与原十天草案相比，回程延后到 4/15。阿尔罕布拉放在 4/9，需确认纳斯里德宫的入场时段；机票、门票与包车均未预订。原三套十天方案保留供比较。</p>",
 "<strong>图中路线草案：2027 年 4 月 2 日出发，4 月 17 日马德里回国，4 月 18 日抵沪</strong><p>17 个日历日含往返飞行，西班牙住 15 晚。8 个不同城市、9 段住宿：马德里先中转 1 晚，环游南部后再住 2 晚。4/2 凌晨起飞，需 4/1 晚到浦东。</p><p>按你们“巴塞罗那进、马德里出”整理原图城市与连接关系；地图显示马德里 3/9 表示两次停留。阿尔罕布拉安排 4/13，需确认纳斯里德宫入场时段。日期可调整，航班、门票与车辆尚未预订。</p>"
];
const drivingData = {
 "checked": "2026-09-19T15:45:15.726939+00:00",
 "provider": "OSRM / OpenStreetMap",
 "traffic": false,
 "url": "https://router.project-osrm.org/table/v1/driving/-3.704,40.417;2.173,41.385;-0.376,39.47;-5.984,37.389;-3.599,37.177;-4.779,37.889;-4.421,36.721;-5.161,36.742;-4.024,39.863;-4.118,40.943;-5.664,40.97;-8.545,42.88;-2.935,43.263;-1.982,43.318;-0.887,41.649;2.821,41.98;-0.481,38.345;-6.289,36.527;-6.343,38.917;-9.1393,38.7223;-8.6291,41.1579?annotations=duration,distance",
 "cities": [
  {
   "id": 0,
   "name": "马德里",
   "en": "Madrid",
   "lat": 40.417,
   "lon": -3.704,
   "slug": "madrid"
  },
  {
   "id": 1,
   "name": "巴塞罗那",
   "en": "Barcelona",
   "lat": 41.385,
   "lon": 2.173,
   "slug": "barcelona"
  },
  {
   "id": 2,
   "name": "瓦伦西亚",
   "en": "Valencia",
   "lat": 39.47,
   "lon": -0.376,
   "slug": "valencia"
  },
  {
   "id": 3,
   "name": "塞维利亚",
   "en": "Sevilla",
   "lat": 37.389,
   "lon": -5.984,
   "slug": "seville"
  },
  {
   "id": 4,
   "name": "格拉纳达",
   "en": "Granada",
   "lat": 37.177,
   "lon": -3.599,
   "slug": "granada"
  },
  {
   "id": 5,
   "name": "科尔多瓦",
   "en": "Córdoba",
   "lat": 37.889,
   "lon": -4.779,
   "slug": "cordoba"
  },
  {
   "id": 6,
   "name": "马拉加",
   "en": "Málaga",
   "lat": 36.721,
   "lon": -4.421,
   "slug": "malaga"
  },
  {
   "id": 7,
   "name": "龙达",
   "en": "Ronda",
   "lat": 36.742,
   "lon": -5.161,
   "slug": "ronda"
  },
  {
   "id": 8,
   "name": "托莱多",
   "en": "Toledo",
   "lat": 39.863,
   "lon": -4.024,
   "slug": "toledo"
  },
  {
   "id": 9,
   "name": "塞哥维亚",
   "en": "Segovia",
   "lat": 40.943,
   "lon": -4.118,
   "slug": "segovia"
  },
  {
   "id": 10,
   "name": "萨拉曼卡",
   "en": "Salamanca",
   "lat": 40.97,
   "lon": -5.664,
   "slug": "salamanca"
  },
  {
   "id": 11,
   "name": "圣地亚哥",
   "en": "Santiago de Compostela",
   "lat": 42.88,
   "lon": -8.545,
   "slug": "santiago-compostela"
  },
  {
   "id": 12,
   "name": "毕尔巴鄂",
   "en": "Bilbao",
   "lat": 43.263,
   "lon": -2.935,
   "slug": "bilbao"
  },
  {
   "id": 13,
   "name": "圣塞巴斯蒂安",
   "en": "San Sebastián",
   "lat": 43.318,
   "lon": -1.982,
   "slug": "san-sebastian"
  },
  {
   "id": 14,
   "name": "萨拉戈萨",
   "en": "Zaragoza",
   "lat": 41.649,
   "lon": -0.887,
   "slug": "zaragoza"
  },
  {
   "id": 15,
   "name": "赫罗纳",
   "en": "Girona",
   "lat": 41.98,
   "lon": 2.821,
   "slug": "girona"
  },
  {
   "id": 16,
   "name": "阿利坎特",
   "en": "Alicante",
   "lat": 38.345,
   "lon": -0.481,
   "slug": "alicante-alacant"
  },
  {
   "id": 17,
   "name": "加的斯",
   "en": "Cádiz",
   "lat": 36.527,
   "lon": -6.289,
   "slug": "cadiz"
  },
  {
   "id": 20,
   "name": "梅里达",
   "en": "Mérida",
   "lat": 38.917,
   "lon": -6.343,
   "slug": "merida"
  },
  {
   "id": 21,
   "name": "里斯本",
   "en": "Lisbon",
   "slug": "lisbon",
   "lat": 38.7223,
   "lon": -9.1393
  },
  {
   "id": 22,
   "name": "波尔图",
   "en": "Porto",
   "slug": "porto",
   "lat": 41.1579,
   "lon": -8.6291
  }
 ],
 "durations": [
  [
   0,
   24730.6,
   14585.9,
   21018,
   17133.6,
   16155,
   22107.3,
   24826.5,
   3569.3,
   4298.9,
   9181.3,
   23934.9,
   16183.7,
   18529.3,
   12916.4,
   27412.5,
   16669,
   25643.9,
   13892.1,
   24575.9,
   22682.1
  ],
  [
   24706.3,
   0,
   14607.1,
   39531,
   33841.8,
   34259.3,
   39005.8,
   42276.2,
   27248.6,
   28351.5,
   33128.6,
   43077.5,
   23812.5,
   22677.7,
   12614.8,
   4684.2,
   21683.8,
   44026.4,
   37784.1,
   48467.9,
   44512.8
  ],
  [
   14385.8,
   14332.3,
   0,
   25870.7,
   19509.6,
   20599,
   24673.6,
   27944,
   15300.7,
   18386,
   23268.4,
   38022,
   24177.8,
   23116.8,
   12690.2,
   17545,
   7351.6,
   30366.1,
   25384.3,
   36068.1,
   36769.2
  ],
  [
   21148,
   39359.7,
   26114.8,
   0,
   10684,
   5885.1,
   9280.5,
   6835.9,
   19132,
   23811.6,
   18367.7,
   35304.8,
   33467.8,
   35813.4,
   33049.9,
   42572.4,
   24249.9,
   5132.1,
   7852.3,
   18187.8,
   25792.8
  ],
  [
   17412.2,
   33767.1,
   19923,
   10824.1,
   0,
   7794.6,
   6375.9,
   9646.3,
   14949.4,
   20777.3,
   25547.8,
   40413.3,
   32632.6,
   34978.2,
   29106.7,
   36979.8,
   14700.1,
   14471.1,
   18418,
   28993.1,
   36358.5
  ],
  [
   16209.9,
   33974.8,
   20729.9,
   5786.5,
   7913.9,
   0,
   7286,
   9770.3,
   13747.1,
   19575,
   21695.7,
   38632.8,
   31430.3,
   33775.9,
   27904.4,
   37187.5,
   20948.6,
   10281.9,
   11180.3,
   21842.1,
   29120.8
  ],
  [
   22167.9,
   38700,
   24855.9,
   9159.3,
   6067.1,
   7049.2,
   0,
   6194.9,
   19705.1,
   25533,
   27268.6,
   44205.7,
   37388.3,
   39733.9,
   33862.4,
   41912.7,
   19633,
   10282.4,
   16753.2,
   27328.3,
   34693.7
  ],
  [
   24951.5,
   42060.4,
   28216.3,
   6737.4,
   9427.5,
   9670.9,
   6251.1,
   0,
   22488.7,
   28316.6,
   24925.9,
   41863,
   40026,
   42371.6,
   36646,
   45273.1,
   22993.4,
   7300.8,
   14410.5,
   24746,
   32351
  ],
  [
   3629.4,
   27264.2,
   15375.8,
   18894.4,
   14601.3,
   13622.7,
   19575,
   22294.2,
   0,
   6789.3,
   11041.7,
   26425.3,
   19025,
   21370.6,
   15450,
   29946.1,
   16372.3,
   23389.8,
   12260.4,
   22944.2,
   24642.4
  ],
  [
   4552.6,
   28576.6,
   18609.8,
   23657.8,
   20463,
   19484.4,
   25436.7,
   28155.9,
   6720.1,
   0,
   7589.5,
   21987.3,
   15122.9,
   17468.5,
   16762.4,
   31258.5,
   20692.9,
   28283.7,
   16531.9,
   25456.2,
   20734.5
  ],
  [
   9415.8,
   33172.1,
   23473,
   18311,
   25326.2,
   21695.9,
   27368.5,
   24970.8,
   11109.7,
   7630.6,
   0,
   18369.6,
   15741.6,
   18087.2,
   21293,
   35854,
   25556.1,
   22936.9,
   11175.7,
   18531,
   14405.5
  ],
  [
   24010.8,
   43042.4,
   38068,
   34969.7,
   39921.2,
   38354.6,
   44027.2,
   41629.5,
   26178.3,
   21896,
   18053.9,
   0,
   23633,
   27656.6,
   31163.3,
   45724.3,
   40151.1,
   39595.6,
   27899.6,
   21569.9,
   9746
  ],
  [
   16022.2,
   23745.9,
   24060.7,
   33353.6,
   32294.4,
   31315.8,
   37268.1,
   39987.3,
   18936.4,
   15104.5,
   15642.1,
   23858,
   0,
   4530.5,
   11866.8,
   26427.8,
   30757.5,
   37979.5,
   26218.3,
   33375.6,
   27026.3
  ],
  [
   18453.4,
   22751.8,
   23113.7,
   35784.8,
   34725.6,
   33747,
   39699.3,
   42418.5,
   21367.6,
   17535.7,
   18073.3,
   27921.4,
   4553.9,
   0,
   10919.8,
   23561.2,
   29810.5,
   40410.7,
   28649.5,
   35806.8,
   29457.5
  ],
  [
   12948.3,
   12578.8,
   12729.6,
   33152,
   28898.7,
   27920.1,
   33872.4,
   36591.6,
   15490.6,
   16593.5,
   21278.1,
   31227,
   11962,
   10901,
   0,
   15260.7,
   19426.4,
   37687.2,
   26026.1,
   36709.9,
   32662.3
  ],
  [
   27343.3,
   4850.5,
   17899.2,
   42823.1,
   37133.9,
   37551.4,
   42297.9,
   45568.3,
   29885.6,
   30988.5,
   35765.6,
   45714.5,
   26449.5,
   23737.9,
   15251.8,
   0,
   24975.9,
   47318.5,
   40421.1,
   51104.9,
   47149.8
  ],
  [
   16644.2,
   21405.1,
   7561,
   24237.6,
   14625.4,
   21034,
   19789.4,
   23059.8,
   16449.2,
   20644.4,
   25526.8,
   40280.4,
   31035.6,
   29974.6,
   19548,
   24617.8,
   0,
   27884.6,
   26494.2,
   37178,
   39027.6
  ],
  [
   25861.2,
   43819.8,
   30574.9,
   5179.2,
   14263.5,
   10345.2,
   10212.9,
   7282.3,
   23592.1,
   28524.8,
   23080.9,
   40018,
   38181,
   40526.6,
   37749.4,
   47032.5,
   27829.4,
   0,
   12565.5,
   22948,
   30506
  ],
  [
   13977.7,
   37693.8,
   25475.5,
   7849.6,
   18310.6,
   11234.5,
   16907.1,
   14509.4,
   12230.3,
   16641.3,
   11165.7,
   28242.8,
   26265.8,
   28611.4,
   25879.6,
   40375.7,
   26344.1,
   12475.5,
   0,
   11452.1,
   18730.8
  ],
  [
   24633.1,
   48349.2,
   36130.9,
   18161.1,
   28776.5,
   21826.9,
   27373,
   24792.1,
   22885.7,
   25366.8,
   18542.7,
   21890.6,
   33450,
   35795.6,
   36535,
   51031.1,
   36999.5,
   22784.6,
   11371.9,
   0,
   12378.6
  ],
  [
   22752.1,
   44450,
   36809.3,
   25804,
   36265,
   29188.9,
   34861.5,
   32463.8,
   24297.2,
   20637.3,
   14165.6,
   10006,
   27019.5,
   29365.1,
   32570.9,
   47131.9,
   38892.4,
   30429.9,
   18733.9,
   12404.2,
   0
  ]
 ],
 "distances": [
  [
   0,
   617801.5,
   357579.3,
   533931.1,
   419617.7,
   393735.3,
   536508.7,
   548767.7,
   73558.7,
   90023.7,
   213389.9,
   591420.1,
   397638.2,
   452470.9,
   312816.8,
   685725.3,
   421275.8,
   650964.5,
   348656.2,
   628536.7,
   554926
  ],
  [
   617119,
   0,
   349329.6,
   995090.4,
   835530.1,
   859817.4,
   965433.1,
   1012574.3,
   688664,
   710267.4,
   841487.8,
   1080647.8,
   606519.5,
   512757.7,
   308788.1,
   100986.7,
   535798.6,
   1107583.3,
   963143.1,
   1243023.6,
   1123939.3
  ],
  [
   356203,
   348823.1,
   0,
   655424.8,
   477760.5,
   520151.8,
   607663.6,
   654804.7,
   372532.7,
   448617.3,
   571983.5,
   950013.8,
   612090.1,
   572827.2,
   308868.1,
   442100.3,
   178029.1,
   767917.6,
   606612.1,
   886492.6,
   913519.6
  ],
  [
   534830.3,
   994962.9,
   655532.3,
   0,
   249687.5,
   140064.7,
   212310.9,
   127289.6,
   476991.8,
   604412.1,
   462162.8,
   827989.6,
   861676.5,
   916509.2,
   843407.9,
   1088240.1,
   596933.4,
   121240.4,
   191280,
   463201.2,
   600319.9
  ],
  [
   416653.9,
   836559.3,
   479924.8,
   248411,
   0,
   161898.1,
   131715.1,
   178856.2,
   364814.2,
   506296.2,
   598511.5,
   1007692.6,
   809697.9,
   864530.6,
   720219.9,
   929836.5,
   350693.9,
   292500.1,
   437078.1,
   711884.7,
   846117.9
  ],
  [
   394314.3,
   860445.8,
   521015.2,
   141290.6,
   165215.9,
   0,
   166271.8,
   193451.2,
   342474.6,
   483956.5,
   515205.3,
   881032.1,
   787358.3,
   842191,
   697880.3,
   953723,
   514683.4,
   253783.5,
   244322.5,
   524187.1,
   653362.4
  ],
  [
   530965.3,
   960669.8,
   604035.3,
   207371.6,
   127558.5,
   159420.5,
   0,
   103451,
   479125.6,
   620607.6,
   666921.4,
   1032748.3,
   924009.3,
   978842,
   834531.3,
   1053947,
   474804.3,
   235339.1,
   396038.7,
   670845.3,
   805078.6
  ],
  [
   548928.6,
   1012261.6,
   655627.3,
   126598.4,
   179150.5,
   191789.9,
   103554,
   0,
   497088.9,
   638570.9,
   587028.3,
   952855.1,
   986542.1,
   1041374.8,
   852494.6,
   1105538.9,
   526396.3,
   145227.1,
   316145.6,
   588066.8,
   725185.4
  ],
  [
   73251.2,
   687570.6,
   373022.9,
   475953.8,
   366563.3,
   340680.9,
   483454.3,
   495713.3,
   0,
   158255.4,
   236461,
   659651.8,
   470591.5,
   525424.3,
   382586,
   755494.4,
   417591.6,
   588446.7,
   310216.4,
   590097,
   572129.9
  ],
  [
   91706.6,
   704555.3,
   450051.3,
   604161.1,
   509123.9,
   483241.4,
   626014.9,
   638273.9,
   158619.9,
   0,
   152669.3,
   526818.7,
   354497.1,
   409329.8,
   399570.7,
   772479.1,
   513747.8,
   721194.6,
   418886.2,
   618410.1,
   490324.6
  ],
  [
   215152.2,
   842250.1,
   573496.8,
   461560.5,
   632569.4,
   515122.7,
   672138,
   589624,
   237040.6,
   153736.8,
   0,
   426803.7,
   397679,
   452511.7,
   538814.2,
   910173.9,
   637193.4,
   578594,
   274447,
   468139.5,
   349926.8
  ],
  [
   591572.9,
   1085342.6,
   949917.5,
   827646.3,
   1008990.1,
   881208.4,
   1038223.7,
   955709.8,
   658486.1,
   526350.1,
   426108.4,
   0,
   580154.9,
   678000.3,
   781906.8,
   1153266.5,
   1013614,
   944679.7,
   644980.3,
   539208.9,
   232625.8
  ],
  [
   394955.2,
   606170.1,
   611014.4,
   861052.5,
   810310.8,
   784428.4,
   927201.8,
   939460.8,
   469027.2,
   353940.5,
   396930.1,
   581809,
   0,
   98822.7,
   302734.1,
   674093.9,
   772401.3,
   978085.9,
   673939,
   862247.1,
   679381.7
  ],
  [
   450587.2,
   512927.2,
   572261.1,
   916684.5,
   865942.8,
   840060.4,
   982833.8,
   995092.8,
   524659.2,
   409572.5,
   452562.2,
   680249,
   101834.9,
   0,
   263980.7,
   635670.1,
   733648,
   1033718,
   729571,
   917879.1,
   735013.8
  ],
  [
   313920.3,
   308292.6,
   308202.5,
   845219.3,
   725254.3,
   699371.9,
   842145.3,
   854404.3,
   385465.3,
   407068.6,
   538043.4,
   777203.4,
   303075.1,
   263812.1,
   0,
   376216.3,
   469589.4,
   947137.6,
   659944.4,
   939824.9,
   820494.9
  ],
  [
   687445.3,
   102846.5,
   442281.1,
   1088042,
   928481.6,
   952768.9,
   1058384.8,
   1105525.8,
   758990.3,
   780593.8,
   911814.1,
   1150974.1,
   676845.8,
   638467.8,
   379114.4,
   0,
   628750.1,
   1200534.8,
   1033469.4,
   1313350,
   1194265.6
  ],
  [
   420292.1,
   534641.5,
   178007.1,
   596589.1,
   349990.1,
   510458.2,
   479893.2,
   527034.3,
   418314.1,
   512706.4,
   636072.6,
   1014102.8,
   773994.7,
   734731.8,
   470772.6,
   627918.8,
   0,
   640678.3,
   633991.4,
   913871.9,
   977608.7
  ],
  [
   651831.5,
   1106414.3,
   766983.6,
   121096.4,
   292607.9,
   251516,
   235086.7,
   144511.2,
   588443.1,
   721413.3,
   579163.9,
   944990.8,
   978677.8,
   1033510.4,
   943848.8,
   1199691.5,
   639853.8,
   0,
   308281.2,
   580230.3,
   717321.1
  ],
  [
   345371.7,
   958933.9,
   603206.3,
   190700.2,
   438654.2,
   244262.3,
   401277.6,
   318763.7,
   305435.2,
   414953.5,
   272604.6,
   645241.1,
   672118.3,
   726951,
   653949.3,
   1026857.7,
   629453.2,
   307733.6,
   0,
   288396.1,
   417571.4
  ],
  [
   629377.6,
   1242939.9,
   887212.1,
   463272.1,
   712669.9,
   524236.5,
   675293.4,
   588180.2,
   589441.2,
   619834.6,
   469734.8,
   541885.6,
   864670.8,
   919503.5,
   937955.3,
   1310863.6,
   913459.1,
   578376,
   288008.3,
   0,
   314216
  ],
  [
   555348.3,
   1124280,
   913692.9,
   601358.5,
   849312.5,
   654920.6,
   811935.9,
   729422,
   571918.4,
   490125.5,
   350785.3,
   232917.8,
   679708.9,
   734541.6,
   820844,
   1192203.8,
   977389.4,
   718391.9,
   418692.5,
   312921.2,
   0
  ]
 ],
 "waypoints": [
  {
   "hint": "bWoLgPOkaooXAAAAAAAAAGIBAAAAAAAAD1_PQAAAAACWZsRCAAAAABcAAAAAAAAAYgEAAAAAAACzJgEAnnzH_0C5aAJAe8f_6LZoAggAHw8AAAAA",
   "location": [
    -3.70365,
    40.4176
   ],
   "name": "Calle de Tetuán",
   "distance": 72.9463844
  },
  {
   "hint": "pMcbgP___38gAAAAIAAAAK8AAAAAAAAAMYXmQAAAAAAppRtCAAAAACAAAAAgAAAArwAAAAAAAACzJgEAiy8hAJV-dwJIKCEAKHx3AgIArwoAAAAApccbgP___38AAAAADQAAAAAAAAAUAAAAAAAAAPQiDUEAAAAAwx5SQQAAAAANAAAAAAAAABQAAACzJgEAiy8hAJV-dwJIKCEAKHx3AgAA7wcAAAAA",
   "location": [
    2.174859,
    41.385621
   ],
   "name": "Carrer de les Magdalenes / Carrer de Ripoll",
   "distance": 170.124679
  },
  {
   "hint": "MCJBgP___38FAAAABQAAAEAAAAAHAAAAMbtJQAAAAAB2OStCYAKUQAUAAAAFAAAAQAAAAAcAAACzJgEAIUX6_z5FWgJAQ_r_sENaAgYAbwgAAAAA",
   "location": [
    -0.375519,
    39.470398
   ],
   "name": "Carrer de Moratín",
   "distance": 60.54309033
  },
  {
   "hint": "pWMGgv___38XAAAAKQAAAAAAAAAMAAAAvwEOQp__3EEAAAAAcwuVQRcAAAApAAAAAAAAAAwAAACzJgEAALGk_8iCOgIAsaT_yII6AgAAfxIAAAAA",
   "location": [
    -5.984,
    37.389
   ],
   "name": "Calle Luis Montoto",
   "distance": 0
  },
  {
   "hint": "u2CQgP___38FAAAAJAAAAFAAAAAAAAAAENdvQNelokFdMFRCAAAAAAUAAAAkAAAAUAAAAAAAAACzJgEANhXJ_95GNwJoFcn_qEY3AgIAXwMAAAAA",
   "location": [
    -3.59905,
    37.177054
   ],
   "name": "Calle Cárcel Baja",
   "distance": 7.458720655
  },
  {
   "hint": "yxxrgP___38UAAAAZgAAABAAAAAPAAAAqe9cQSW-WUJm1yZBGAAbQRQAAABmAAAAEAAAAA8AAACzJgEARxS3_-MkQgIIFLf_6CNCAgIAXwYAAAAA",
   "location": [
    -4.778937,
    37.889251
   ],
   "name": "Plaza de Colón",
   "distance": 28.40556074
  },
  {
   "hint": "4jJagaur2Y4JAAAAAAAAAHQAAAAGAAAA3z92QAAAAABYbkJCzfEkQAkAAAAAAAAAdAAAAAYAAACzJgEAJZK8_2tMMAJ4irz_aFEwAgwArxAAAAAA",
   "location": [
    -4.419035,
    36.719723
   ],
   "name": "",
   "distance": 225.599373
  },
  {
   "hint": "U0hphFlIaYQPAAAAFAAAAAAAAAAAAAAAXUgpQa-4XkEAAAAAAAAAAA8AAAAUAAAAAAAAAAAAAACzJgEAhT-x_2qjMALYP7H_cKMwAgAAPxYAAAAA",
   "location": [
    -5.161083,
    36.741994
   ],
   "name": "Calle Peñas",
   "distance": 7.444326315
  },
  {
   "hint": "JoXtgymF7YM9AAAAQwAAAAAAAAAAAAAAmdOHQca3lEEAAAAAAAAAAD0AAABDAAAAAAAAAAAAAACzJgEA0JnC__pCYAJAmcL_2EJgAgAAbxUAAAAA",
   "location": [
    -4.023856,
    39.863034
   ],
   "name": "Travesía del Potro",
   "distance": 12.88455558
  },
  {
   "hint": "C_mGgP___38BAAAAYAAAAAcAAAABAAAAqYUDQGUD0kL83fNAUtamPwEAAABgAAAABwAAAAEAAACzJgEANSrB_129cAIQKsH_mL1wAgQADwQAAAAA",
   "location": [
    -4.117963,
    40.942941
   ],
   "name": "Calle Ramón y Cajal",
   "distance": 7.255528623
  },
  {
   "hint": "2Y5zgP___38XAAAASwAAAC4AAAAxAAAAv-l7QU1pCEJl14dBC8mbQRcAAABLAAAALgAAADEAAACzJgEADJOp_9EmcQIAk6n_ECdxAgYAXxAAAAAA",
   "location": [
    -5.663988,
    40.969937
   ],
   "name": "Paseo de Carmelitas",
   "distance": 7.068892491
  },
  {
   "hint": "v01JgLwtUY0XAAAAAAAAAOUBAAAAAAAAJcomQQAAAABg8FdDAAAAABcAAAAAAAAA5QEAAAAAAACzJgEArpt9_7BPjgIYnX3_AEyOAgoAzwoAAAAA",
   "location": [
    -8.545362,
    42.880944
   ],
   "name": "Rúa de San Francisco",
   "distance": 108.9605093
  },
  {
   "hint": "WKbNkf___38GAAAADwAAAGEAAAAAAAAA90CGQJ5ys0CH3HtCAAAAAAYAAAAPAAAAYQAAAAAAAACzJgEAZjbT_7wilAIoN9P_GCSUAhoA_wYAAAAA",
   "location": [
    -2.935194,
    43.262652
   ],
   "name": "Plaza Eliptikoa",
   "distance": 41.74646356
  },
  {
   "hint": "J4d-gP___38_AAAARQAAAA8AAAD3AAAAoK4pQh6Nb0BwpCVBZS4XQz8AAABFAAAADwAAAPcAAACzJgEAP8Ph_3j7lALQweH_8PqUAgQAzxQAAAAA",
   "location": [
    -1.981633,
    43.318136
   ],
   "name": "Hondarribia kalea",
   "distance": 33.38248105
  },
  {
   "hint": "kt0FhWSDP40EAAAACQAAAAAAAAAAAAAArFufQITaEUEAAAAAAAAAAAQAAAAJAAAAAAAAAAAAAACzJgEA0nby_0eDewIod_L_aIN7AgAAzxQAAAAA",
   "location": [
    -0.887086,
    41.648967
   ],
   "name": "Paseo de Pamplona",
   "distance": 8.049671277
  },
  {
   "hint": "9NsfiPXbH4g1AAAAAAAAAA8AAAAAAAAA926wQQAAAADlaMFAAAAAADUAAAAAAAAADwAAAAAAAACzJgEAAQwrAHKPgAKICysAYJCAAgIALwIAAAAA",
   "location": [
    2.821121,
    41.979762
   ],
   "name": "",
   "distance": 28.27374391
  },
  {
   "hint": "aV08gf___38NAAAAUAAAAA4AAAAAAAAASPnEQFEl7EH2OMlAAAAAAA0AAABQAAAADgAAAAAAAACzJgEApqj4_7gZSQIYqfj_KBlJAgIA7w4AAAAA",
   "location": [
    -0.481114,
    38.345144
   ],
   "name": "Plaça de l'Ajuntament",
   "distance": 18.83805657
  },
  {
   "hint": "BQCFgCT8zIQAAAAADQAAAAQAAAA8AAAAAAAAAHZUD0FzFTJA1qgiQgAAAAANAAAABAAAADwAAACzJgEAxgmg_5FbLQKYCaD_mFstAgIAXwEAAAAA",
   "location": [
    -6.288954,
    36.526993
   ],
   "name": "Avenida Cuesta de las Calesas",
   "distance": 4.192455143
  },
  {
   "hint": "kCBxgf___38CAAAAKwAAACgAAAAAAAAAqhDPPz6x5EHDX99BAAAAAAIAAAArAAAAKAAAAAAAAACzJgEAMzif_9rQUQKoNp__iNNRAgIAXw8AAAAA",
   "location": [
    -6.342605,
    38.916314
   ],
   "name": "Travesía Parejos",
   "distance": 83.5044021
  },
  {
   "hint": "-JqwgkgQv4IBAAAACQAAAAIAAAAAAAAAWamyP3BEG0E-8BZAAAAAAAEAAAAJAAAAAgAAAAAAAACzJgEAm4t0_wLbTgKci3T__NpOAgIAjxAAAAAA",
   "location": [
    -9.139301,
    38.722306
   ],
   "name": "",
   "distance": 0.6717142282
  },
  {
   "hint": "iqVQgP___38IAAAACQAAAAAAAAAeAAAAeUp5QXLCkT8AAAAA2DGRQQgAAAAJAAAAAAAAAB4AAACzJgEA6Vh8_1QEdAKUVHz_DAV0AgAAzwAAAAAA",
   "location": [
    -8.627991,
    41.157716
   ],
   "name": "Praça de Mouzinho de Alburquerque",
   "distance": 95.2758695
  }
 ]
};
