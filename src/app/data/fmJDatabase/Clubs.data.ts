export interface ClubData {
  id: number;
  name: string;
  shortname?: string;
  color?: string[];
}

export const getClubByAlias = (alias: number | string) => {
  const aliasString = alias + '';
  return Clubs.find(club => club.id === parseInt(aliasString) || club.name === aliasString);
}

export const Clubs: ClubData[] = [
  {
    id: 1195,
    name: "浦和レッドダイヤモンズ",
    shortname: "浦和",
    color: ["#FAFAFA", "#9E2530"]
  },
  {
    id: 1184,
    name: "湘南ベルマーレ",
    shortname: "湘南",
    color: ["#2D68B5", "#ADDF7A"]
  },
  {
    id: 1185,
    name: "セレッソ大阪",
    shortname: "C大阪",
    color: ["#26488B", "#B3246B"]
  },
  {
    id: 1186,
    name: "ガンバ大阪",
    shortname: "G大阪",
    color: ["#FAFAFA", "#2F55B5"]
  },
  {
    id: 1188,
    name: "ジュビロ磐田",
    shortname: "磐田",
    color: ["#26488B", "#4A99E8"]
  },
  {
    id: 1189,
    name: "鹿島アントラーズ",
    shortname: "鹿島",
    color: ["#26488B", "#9E2530"]
  },
  {
    id: 1191,
    name: "名古屋グランパス",
    shortname: "名古屋",
    color: ["#F19128", "#9E2530"]
  },
  {
    id: 1193,
    name: "サンフレッチェ広島",
    shortname: "広島",
    color: ["#FAFAFA", "#8E27C2"]
  },
  {
    id: 1194,
    name: "清水エスパルス",
    shortname: "清水",
    color: ["#1E2021", "#F26549"]
  },
  {
    id: 1198,
    name: "横浜F・マリノス",
    shortname: "横浜FM",
    color: ["#FAFAFA", "#2D68B5"]
  },
  {
    id: 106844,
    name: "ヴィッセル神戸",
    shortname: "神戸",
    color: ["#FAFAFA", "#9E2530"]
  },
  {
    id: 107283,
    name: "ベガルタ仙台",
    shortname: "仙台",
    color: ["#2D6CB5", "#FFE252"]
  },
  {
    id: 107285,
    name: "コンサドーレ札幌",
    shortname: "札幌",
    color: ["#1E2021", "#9E2530"]
  },
  {
    id: 107296,
    name: "川崎フロンターレ",
    shortname: "川崎",
    color: ["#1E2021", "#4A99E8"]
  },
  {
    id: 107303,
    name: "大分トリニータ",
    shortname: "大分",
    color: ["#FAFAFA", "#3D7BB8"]
  },
  {
    id: 107309,
    name: "サガン鳥栖",
    shortname: "鳥栖",
    color: ["#FAFAFA", "#4A99E8"]
  },
  {
    id: 107313,
    name: "FC東京",
    shortname: "東京",
    color: ["#CF1C2C", "#2F55B5"]
  },
  {
    id: 786400,
    name: "松本山雅",
    shortname: "松本",
    color: ["#FAFAFA", "#52B561"]
  },
  {
    id: 107301,
    name: "モンテディオ山形",
    shortname: "山形",
    color: ["#FAFAFA", "#2D68B5"]
  },
  {
    id: 107289,
    name: "水戸ホーリーホック",
    shortname: "水戸",
    color: ["#1E2021", "#2F55B5"]
  },
  {
    id: 775187,
    name: "栃木SC",
    shortname: "栃木",
    color: ["#2F55B5", "#FFE252"]
  },
  {
    id: 107305,
    name: "大宮アルディージャ",
    shortname: "大宮",
    color: ["#26488B", "#F26549"]
  },
  {
    id: 1187,
    name: "ジェフユナイテッド千葉",
    shortname: "千葉",
    color: ["#1E2021", "#FFE252"]
  },
  {
    id: 1190,
    name: "柏レイソル",
    shortname: "柏",
    color: ["#1E2021", "#FFE252"]
  },
  {
    id: 1196,
    name: "東京ヴェルディ",
    shortname: "東京V",
    color: ["#FAFAFA", "#52B561"]
  },
  {
    id: 788837,
    name: "FC町田ゼルビア",
    shortname: "町田",
    color: ["#FAFAFA", "#26488B"]
  },
  {
    id: 7100042,
    name: "横浜FC",
    shortname: "横浜FC",
    color: ["#2F55B5", "#4A99E8"]
  },
  {
    id: 107314,
    name: "ヴァンフォーレ甲府",
    shortname: "甲府",
    color: ["#9E2530", "#2D68B5"]
  },
  {
    id: 107280,
    name: "アルビレックス新潟",
    shortname: "新潟",
    color: ["#2D68B5", "#F27641"]
  },
  {
    id: 775165,
    name: "ツエーゲン金沢",
    shortname: "金沢",
    color: ["#FAFAFA", "#CF1C2C"]
  },
  {
    id: 107346,
    name: "FC岐阜",
    shortname: "岐阜",
    color: ["#FFE252", "#4FB591"]
  },
  {
    id: 1192,
    name: "京都サンガF.C.",
    shortname: "京都",
    color: ["#FAFAFA", "#BF26BF"]
  },
  {
    id: 786547,
    name: "ファジアーノ岡山",
    shortname: "岡山",
    color: ["#FAFAFA", "#9E2530"]
  },
  {
    id: 775166,
    name: "レノファ山口FC",
    shortname: "山口",
    color: ["#1E2021", "#F27641"]
  },
  {
    id: 786384,
    name: "徳島ヴォルティス",
    shortname: "徳島",
    color: ["#FAFAFA", "#2F55B5"]
  },
  {
    id: 776288,
    name: "愛媛FC",
    shortname: "愛媛",
    color: ["#26488B", "#F27641"]
  },
  {
    id: 1183,
    name: "アビスパ福岡",
    shortname: "福岡",
    color: ["#FAFAFA", "#26488B"]
  },
  {
    id: 786559,
    name: "V・ファーレン長崎",
    shortname: "長崎",
    color: ["#2D68B5", "#F19128"]
  },
  {
    id: 107341,
    name: "鹿児島ユナイテッドFC",
    shortname: "鹿児島",
    color: ["#26488B", "#FAFAFA"]
  },
  {
    id: 783801,
    name: "FC琉球",
    shortname: "琉球",
    color: ["#FAFAFA", "#8B2435"]
  },
  {
    id: 775154,
    name: "ヴァンラーレ八戸",
    shortname: "八戸",
    color: ["#F26549", "#4FB591"]
  },
  {
    id: 786372,
    name: "いわてグルージャ盛岡",
    shortname: "盛岡",
    color: ["#CF1C2C", "#FAFAFA"]
  },
  {
    id: 107328,
    name: "ブラウブリッツ秋田",
    shortname: "秋田",
    color: ["#FAFAFA", "#53BAED"]
  },
  {
    id: 107330,
    name: "福島ユナイテッドFC",
    shortname: "福島",
    color: ["#1E2021", "#9E2530"]
  },
  {
    id: 780521,
    name: "ザスパクサツ群馬",
    shortname: "群馬",
    color: ["#FAFAFA", "#26488B"]
  },
  {
    id: 786525,
    name: "Y.S.C.C.横浜",
    shortname: "YSCC",
    color: ["#FAFAFA", "#53BAED"]
  },
  {
    id: 788856,
    name: "SC相模原",
    shortname: "相模原",
    color: ["#FAFAFA", "#52B561"]
  },
  {
    id: 107339,
    name: "AC長野パルセイロ",
    shortname: "長野",
    color: ["#26488B", "#F26549"]
  },
  {
    id: 107342,
    name: "カターレ富山",
    shortname: "富山",
    color: ["#FAFAFA", "#2D68B5"]
  },
  {
    id: 788854,
    name: "藤枝MYFC",
    shortname: "藤枝"
  },
  {
    id: 788933,
    name: "アスルクラロ沼津",
    shortname: "沼津"
  },
  {
    id: 107354,
    name: "ガイナーレ鳥取",
    shortname: "鳥取",
    color: ["#2F55B5", "#C7EA80"]
  },
  {
    id: 775160,
    name: "カマタマーレ讃岐",
    shortname: "讃岐"
  },
  {
    id: 788847,
    name: "ギラヴァンツ北九州",
    shortname: "北九州"
  },
  {
    id: 786558,
    name: "ロアッソ熊本",
    shortname: "熊本"
  },
  {
    id: 107291,
    name: "Honda FC",
    shortname: "ホンダ"
  },
  {
    id: 107352,
    name: "FC大阪",
    shortname: "FC大阪"
  },
  {
    id: 107311,
    name: "ソニー仙台FC",
    shortname: "S仙台"
  },
  {
    id: 788904,
    name: "FC今治",
    shortname: "今治"
  },
  {
    id: 792330,
    name: "東京武蔵野シティFC",
    shortname: "武蔵野"
  },
  {
    id: 775268,
    name: "MIOびわこ滋賀",
    shortname: "B滋賀"
  },
  {
    id: 788910,
    name: "奈良クラブ",
    shortname: "奈良"
  },
  {
    id: 792290,
    name: "ヴェルスパ大分",
    shortname: "V大分"
  },
  {
    id: 788934,
    name: "ラインメール青森",
    shortname: "青森"
  },
  {
    id: 792266,
    name: "ヴィアティン三重",
    shortname: "三重"
  },
  {
    id: 792316,
    name: "テゲバジャーロ宮崎",
    shortname: "T宮崎"
  },
  {
    id: 792295,
    name: "FCマルヤス岡崎",
    shortname: "岡崎"
  },
  {
    id: 781042,
    name: "ホンダロックSC",
    shortname: "ホンダロック"
  },
  {
    id: 792315,
    name: "流経大ドラゴンズ龍ケ崎",
    shortname: "龍ケ崎"
  },
  {
    id: 788871,
    name: "松江シティFC",
    shortname: "松江"
  },
  {
    id: 788966,
    name: "鈴鹿アンリミテッドFC",
    shortname: "鈴鹿"
  },
  {
    id: 107326,
    name: "北海道十勝スカイアース",
    shortname: "十勝"
  },
  {
    id: 786566,
    name: "ノルブリッツ北海道",
    shortname: "N北海道"
  },
  {
    id: 786868,
    name: "札幌蹴球団",
    shortname: "札蹴"
  },
  {
    id: 45081215,
    name: "新日鐵住金室蘭サッカー部",
    shortname: "住金室蘭"
  },
  {
    id: 45003399,
    name: "岩見沢FC北蹴会",
    shortname: "北蹴会"
  },
  {
    id: 786569,
    name: "トヨタ自動車北海道",
    shortname: "トヨタ北海道"
  },
  {
    id: 45028106,
    name: "日本通運FC",
    shortname: "日本通運"
  },
  {
    id: 786567,
    name: "R・シュペルブ釧路",
    shortname: "釧路"
  },
  {
    id: 775159,
    name: "コバルトーレ女川",
    shortname: "女川"
  },
  {
    id: 788918,
    name: "ブランデュー弘前FC",
    shortname: "弘前"
  },
  {
    id: 107327,
    name: "FCガンジュ岩手",
    shortname: "G岩手"
  },
  {
    id: 786523,
    name: "盛岡ゼブラ",
    shortname: "盛岡Z"
  },
  {
    id: 45002957,
    name: "富士クラブ2003",
    shortname: "富士2003"
  },
  {
    id: 45081220,
    name: "新日鐵住金釜石",
    shortname: "住金釜石"
  },
  {
    id: 775204,
    name: "FCプリメーロ",
    shortname: "プリメーロ"
  },
  {
    id: 775161,
    name: "秋田FCカンビアーレ",
    shortname: "秋田C"
  },
  {
    id: 45004430,
    name: "猿田興業",
    shortname: "猿田"
  },
  {
    id: 792248,
    name: "いわきFC",
    shortname: "いわき"
  },
  {
    id: 792387,
    name: "栃木シティ",
    shortname: "栃木シティ"
  },
  {
    id: 788907,
    name: "VONDS市原FC",
    shortname: "市原"
  },
  {
    id: 792367,
    name: "東京ユナイテッドFC",
    shortname: "東京U"
  },
  {
    id: 788859,
    name: "東京23フットボールクラブ",
    shortname: "東京23"
  },
  {
    id: 45052508,
    name: "流通経済大学FC",
    shortname: "流経大FC"
  },
  {
    id: 792317,
    name: "ブリオベッカ浦安",
    shortname: "浦安"
  },
  {
    id: 792286,
    name: "ジョイフル本田つくばFC",
    shortname: "つくば"
  },
  {
    id: 45004293,
    name: "横浜猛蹴",
    shortname: "横蹴"
  },
  {
    id: 45103358,
    name: "TUY",
    shortname: "TUY"
  },
  {
    id: 45025624,
    name: "日立ビルシステムサッカー部",
    shortname: "日立"
  },
  {
    id: 788935,
    name: "ヴェルフェたかはら那須",
    shortname: "那須"
  },
  {
    id: 786531,
    name: "さいたまSC"
  },
  {
    id: 780523,
    name: "tonan前橋",
    shortname: "前橋"
  },
  {
    id: 792389,
    name: "福井ユナイテッド",
    shortname: "福井"
  },
  {
    id: 788846,
    name: "アルティスタ浅間",
    shortname: "浅間"
  },
  {
    id: 786516,
    name: "JAPANサッカーカレッジ",
    shortname: "JSC"
  },
  {
    id: 788924,
    name: "坂井フェニックス",
    shortname: "坂井"
  },
  {
    id: 788894,
    name: "FC北陸",
    shortname: "FC北陸"
  },
  {
    id: 45002949,
    name: "富山新庄クラブ",
    shortname: "富山新庄"
  },
  {
    id: 45052515,
    name: "09経大FC",
    shortname: "09経大"
  },
  {
    id: 787808,
    name: "FC上田ジェンシャン",
    shortname: "上田"
  },
  {
    id: 45104746,
    name: "05加茂FC",
    shortname: "05加茂"
  },
  {
    id: 775266,
    name: "FC刈谷",
    shortname: "刈谷"
  },
  {
    id: 786538,
    name: "矢崎バレンテ",
    shortname: "矢崎"
  },
  {
    id: 792259,
    name: "FC.ISE-SHIMA",
    shortname: "伊勢志摩"
  },
  {
    id: 45095062,
    name: "東海学園FC",
    shortname: "東海学園"
  },
  {
    id: 786526,
    name: "藤枝市役所",
    shortname: "藤枝市役"
  },
  {
    id: 45004000,
    name: "トヨタ蹴球団",
    shortname: "ト蹴"
  },
  {
    id: 45009666,
    name: "FC岐阜SECOND",
    shortname: "岐阜2"
  },
  {
    id: 45025615,
    name: "中京大学FC",
    shortname: "中京大FC"
  },
  {
    id: 786542,
    name: "バンディオンセ加古川",
    shortname: "加古川"
  },
  {
    id: 788994,
    name: "おこしやす京都AC",
    shortname: "O京都"
  },
  {
    id: 45052510,
    name: "阪南大クラブ",
    shortname: "阪南大"
  },
  {
    id: 792274,
    name: "FC TIAMO枚方",
    shortname: "枚方"
  },
  {
    id: 107351,
    name: "アルテリーヴォ和歌山",
    shortname: "和歌山"
  },
  {
    id: 45052739,
    name: "関大FC2008",
    shortname: "関大2008"
  },
  {
    id: 45095245,
    name: "St.Andrew's FC",
    shortname: "アンドリュー"
  },
  {
    id: 790002,
    name: "レイジェンド滋賀FC",
    shortname: "L滋賀"
  },
  {
    id: 788949,
    name: "高砂ミネイロFC",
    shortname: "高砂"
  },
  {
    id: 786530,
    name: "AS.Laranja Kyoto",
    shortname: "Laranja"
  },
  {
    id: 788976,
    name: "ポルベニル飛鳥",
    shortname: "飛鳥"
  },
  {
    id: 787756,
    name: "京都紫光クラブ",
    shortname: "京都紫光"
  },
  {
    id: 45104772,
    name: "関大クラブ2010",
    shortname: "関大2010"
  },
  {
    id: 45104760,
    name: "FC EASY 02明石"
  },
  {
    id: 787762,
    name: "ルネス学園甲賀"
  },
  {
    id: 45016113,
    name: "びわこ成蹊HIRA"
  },
  {
    id: 786385,
    name: "三菱水島FC",
    shortname: "三菱水島"
  },
  {
    id: 792246,
    name: "SRC広島",
    shortname: "SRC広島"
  },
  {
    id: 45094735,
    name: "環太平洋大学FC",
    shortname: "環太大FC"
  },
  {
    id: 788870,
    name: "JXTGエネルギー水島サッカー部",
    shortname: "JXTG"
  },
  {
    id: 45107390,
    name: "原田鋼業FC",
    shortname: "原田鋼業"
  },
  {
    id: 45033802,
    name: "富士ゼロックス広島",
    shortname: "ゼロックス"
  },
  {
    id: 792269,
    name: "廿日市FC",
    shortname: "廿日市"
  },
  {
    id: 45015023,
    name: "NTN岡山サッカー部",
    shortname: "NTN岡山"
  },
  {
    id: 107358,
    name: "FCバレイン下関",
    shortname: "下関"
  },
  {
    id: 788891,
    name: "浜田FCコスモス",
    shortname: "浜田"
  },
  {
    id: 792341,
    name: "高知ユナイテッドSC",
    shortname: "高知"
  },
  {
    id: 792385,
    name: "FC徳島",
    shortname: "FC徳島"
  },
  {
    id: 45098689,
    name: "KUFC南国",
    shortname: "KUFC南国"
  },
  {
    id: 788905,
    name: "多度津FC",
    shortname: "多度津"
  },
  {
    id: 788967,
    name: "アルヴェリオ高松",
    shortname: "R高松"
  },
  {
    id: 792253,
    name: "llamas高知FC",
    shortname: "L高知"
  },
  {
    id: 45095323,
    name: "新商クラブ",
    shortname: "新商"
  },
  {
    id: 45068761,
    name: "光洋シーリングテクノ",
    shortname: "光洋ST"
  },
  {
    id: 792297,
    name: "J.FC MIYAZAKI",
    shortname: "J宮崎"
  },
  {
    id: 792332,
    name: "沖縄SV",
    shortname: "沖縄SV"
  },
  {
    id: 45095278,
    name: "NIFS KANOYA FC",
    shortname: "NIFS"
  },
  {
    id: 45003175,
    name: "熊本教員蹴友団",
    shortname: "熊本教員"
  },
  {
    id: 45081203,
    name: "新日鐵住金大分サッカー部",
    shortname: "住金大分"
  },
  {
    id: 786557,
    name: "沖縄海邦銀行SC",
    shortname: "沖縄海邦銀行"
  },
  {
    id: 788872,
    name: "佐賀LIXIL FC",
    shortname: "佐賀LIXIL"
  },
  {
    id: 45025571,
    name: "川副クラブ",
    shortname: "川副"
  },
  {
    id: 45038013,
    name: "九州三菱自動車",
    shortname: "九州三菱"
  },
  {
    id: 45025572,
    name: "九州総合スポーツカレッジ",
    shortname: "KSSC"
  },
  {
    id: 792289,
    name: "南葛SC",
    shortname: "南葛"
  },
  {
    id: 45007239,
    name: "日本大学",
    shortname: "日本大"
  },
  {
    id: 775197,
    name: "筑波大学",
    shortname: "筑波大"
  },
  {
    id: 783737,
    name: "大阪体育大学",
    shortname: "大阪体育大"
  },
  {
    id: 45005147,
    name: "仙台大学",
    shortname: "仙台大"
  }
];
