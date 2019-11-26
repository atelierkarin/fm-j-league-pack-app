export interface LeagueData {
  id: number;
  name: string;
  seasons: { year: number; teams: number[] }[];
  caGuideline: number[];
}

export const Leagues: LeagueData[] = [
  {
    id: 102428,
    name: "J1リーグ",
    seasons: [
      {
        year: 2019,
        teams: [
          1195,
          1184,
          1185,
          1186,
          1188,
          1189,
          1191,
          1193,
          1194,
          1198,
          106844,
          107283,
          107285,
          107296,
          107303,
          107309,
          107313,
          786400
        ]
      }
    ],
    caGuideline: [120, 110, 100, 95]
  },
  {
    id: 115424,
    name: "J2リーグ",
    seasons: [
      {
        year: 2019,
        teams: [
          107301,
          107289,
          775187,
          107305,
          1187,
          1190,
          1196,
          788837,
          7100042,
          107314,
          107280,
          775165,
          107346,
          1192,
          786547,
          775166,
          786384,
          776288,
          1183,
          786559,
          107341,
          783801
        ]
      }
    ],
    caGuideline: [95, 90, 85, 80]
  },
  {
    id: 791180,
    name: "J3リーグ",
    seasons: [
      {
        year: 2019,
        teams: [
          775154,
          786372,
          107328,
          107330,
          780521,
          786525,
          788856,
          107339,
          107342,
          788854,
          788933,
          107354,
          775160,
          788847,
          786558
        ]
      }
    ],
    caGuideline: [80, 75, 70, 65]
  },
  {
    id: 107256,
    name: "JFL",
    seasons: [
      {
        year: 2019,
        teams: [
          107291,
          107352,
          107311,
          788904,
          792330,
          775268,
          788910,
          792290,
          788934,
          792266,
          792316,
          792295,
          781042,
          792315,
          788871,
          788966
        ]
      }
    ],
    caGuideline: [70, 65, 60, 55]
  },
  {
    id: 788824,
    name: "北海道地域リーグ",
    seasons: [
      {
        year: 2019,
        teams: [
          107326,
          786566,
          786868,
          45081215,
          45003399,
          786569,
          45028106,
          786567
        ]
      }
    ],
    caGuideline: [55, 45, 40, 35]
  },
  {
    id: 788825,
    name: "東北地域リーグ1部",
    seasons: [
      {
        year: 2019,
        teams: [
          775159,
          788918,
          107327,
          786523,
          45002957,
          45081220,
          775204,
          775161,
          45004430,
          792248
        ]
      }
    ],
    caGuideline: [60, 50, 45, 40]
  },
  {
    id: 788826,
    name: "関東地域リーグ1部",
    seasons: [
      {
        year: 2019,
        teams: [
          788907,
          792367,
          792387,
          788859,
          45052508,
          792317,
          792286,
          45004293,
          45103358,
          45025624
        ]
      }
    ],
    caGuideline: [60, 50, 45, 40]
  },
  {
    id: 788827,
    name: "北信越地域リーグ1部",
    seasons: [
      {
        year: 2019,
        teams: [
          792389,
          788846,
          786516,
          788924,
          788894,
          45002949,
          45104746,
          787808
        ]
      }
    ],
    caGuideline: [60, 50, 45, 40]
  },
  {
    id: 788828,
    name: "東海地域リーグ1部",
    seasons: [
      {
        year: 2019,
        teams: [
          775266,
          786538,
          792259,
          45095062,
          786526,
          45004000,
          45009666,
          45025615
        ]
      }
    ],
    caGuideline: [60, 50, 45, 40]
  },
  {
    id: 788829,
    name: "関西地域リーグ1部",
    seasons: [
      {
        year: 2019,
        teams: [
          786542,
          788994,
          45052510,
          792274,
          107351,
          45052739,
          45095245,
          790002
        ]
      }
    ],
    caGuideline: [60, 50, 45, 40]
  },
  {
    id: 788830,
    name: "中国地域リーグ",
    seasons: [
      {
        year: 2019,
        teams: [
          786385,
          792246,
          45094735,
          788870,
          45107390,
          45033802,
          792269,
          45015023,
          107358,
          788891
        ]
      }
    ],
    caGuideline: [60, 50, 45, 40]
  },
  {
    id: 788831,
    name: "四国地域リーグ",
    seasons: [
      {
        year: 2019,
        teams: [
          792341,
          792385,
          45098689,
          788905,
          788967,
          792253,
          45095323,
          45068761
        ]
      }
    ],
    caGuideline: [55, 45, 40, 35]
  },
  {
    id: 788832,
    name: "九州地域リーグ",
    seasons: [
      {
        year: 2019,
        teams: [
          792297,
          792332,
          45095278,
          45003175,
          45081203,
          786557,
          788872,
          45025571,
          45038013,
          45025572
        ]
      }
    ],
    caGuideline: [60, 50, 45, 40]
  },
  {
    id: 107318,
    name: "都道府県リーグ",
    seasons: [
      {
        year: 2019,
        teams: [792289]
      }
    ],
    caGuideline: []
  }
];

export const getCurrentLeague = (clubId: number, season: number): LeagueData => {
  let returnLeague = null;
  for (let index = 0; index < Leagues.length; index++) {
    const currentLeague = Leagues[index];
    const currentLeagueSeason = currentLeague.seasons.find(s => s.year === season);
    if (currentLeagueSeason && currentLeagueSeason.teams.includes(clubId)) {
      returnLeague = currentLeague;
      break;
    }    
  }
  return returnLeague;
}