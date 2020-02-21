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
        year: 2020,
        teams: [
          1195,
          1184,
          1185,
          1186,
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

          7100042,
          1190
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
        year: 2020,
        teams: [
          107301,
          107289,
          775187,
          107305,
          1187,
          1196,
          788837,
          107314,
          107280,
          775165,
          1192,
          786547,
          775166,
          786384,
          776288,
          1183,
          786559,
          783801,
          786400,
          1188,
          788847,
          780521
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
        year: 2020,
        teams: [
          775154,
          786372,
          107328,
          107330,
          786525,
          788856,
          107339,
          107342,
          788854,
          788933,
          107354,
          775160,
          786558,
          107341,
          107346,
          788904
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
        year: 2020,
        teams: [
          107291,
          107352,
          107311,
          792330,
          775268,
          788910,
          792290,
          788934,
          792266,
          792316,
          792295,
          781042,
          788871,
          792398,
          792341,
          792248
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
        year: 2020,
        teams: [107326, 786566, 786868, 45081215, 45003399, 45028106]
      }
    ],
    caGuideline: [55, 45, 40, 35]
  },
  {
    id: 788825,
    name: "東北地域リーグ1部",
    seasons: [
      {
        year: 2020,
        teams: [
          775159,
          788918,
          107327,
          786523,
          45002957,
          45081220,
          775204,
          45004430,
          45004431,
          45108299
        ]
      }
    ],
    caGuideline: [60, 50, 45, 40]
  },
  {
    id: 45002926,
    name: "東北地域リーグ2部南",
    seasons: [
      {
        year: 2020,
        teams: []
      }
    ],
    caGuideline: []
  },
  {
    id: 788839,
    name: "東北地域リーグ2部北",
    seasons: [
      {
        year: 2020,
        teams: [775161]
      }
    ],
    caGuideline: []
  },
  {
    id: 788826,
    name: "関東地域リーグ1部",
    seasons: [
      {
        year: 2020,
        teams: [
          788907,
          792367,
          792387,
          788859,
          45052508,
          792317,
          792286,
          45025624,
          792315,
          792320
        ]
      }
    ],
    caGuideline: [60, 50, 45, 40]
  },
  {
    id: 788833,
    name: "関東地域リーグ2部",
    seasons: [
      {
        year: 2020,
        teams: [45103358, 45004293]
      }
    ],
    caGuideline: []
  },
  {
    id: 788827,
    name: "北信越地域リーグ1部",
    seasons: [
      {
        year: 2020,
        teams: [
          792389,
          788846,
          786516,
          788924,
          788894,
          45002949,
          45104746,
          45052511
        ]
      }
    ],
    caGuideline: [60, 50, 45, 40]
  },
  {
    id: 790071,
    name: "北信越地域リーグ2部",
    seasons: [
      {
        year: 2020,
        teams: [787808]
      }
    ],
    caGuideline: []
  },
  {
    id: 788828,
    name: "東海地域リーグ1部",
    seasons: [
      {
        year: 2020,
        teams: [
          775266,
          786538,
          792259,
          45095062,
          786526,
          45025615,
          45052518,
          45076938
        ]
      }
    ],
    caGuideline: [60, 50, 45, 40]
  },
  {
    id: 788837,
    name: "東海地域リーグ2部",
    seasons: [
      {
        year: 2020,
        teams: [45004000, 45009666]
      }
    ],
    caGuideline: []
  },
  {
    id: 788829,
    name: "関西地域リーグ1部",
    seasons: [
      {
        year: 2020,
        teams: [
          792399,
          788994,
          792274,
          107351,
          45052739,
          790002,
          786530,
          788976
        ]
      }
    ],
    caGuideline: [60, 50, 45, 40]
  },
  {
    id: 788834,
    name: "関西地域リーグ2部",
    seasons: [
      {
        year: 2020,
        teams: [45095245, 45052510]
      }
    ],
    caGuideline: []
  },
  {
    id: 788830,
    name: "中国地域リーグ",
    seasons: [
      {
        year: 2020,
        teams: [
          786385,
          792246,
          45094735,
          788870,
          45033802,
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
        year: 2020,
        teams: [
          792385,
          45098689,
          788905,
          788967,
          792253,
          45095323,
          45068761,
          792351
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
        year: 2020,
        teams: [
          792297,
          792332,
          45095278,
          45003175,
          45081203,
          786557,
          788872,
          45025571,
          45038013
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
        year: 2020,
        teams: [792289, 786569, 786567, 45107390, 792269, 45025572]
      }
    ],
    caGuideline: []
  }
];

export const getCurrentLeague = (
  clubId: number,
  season: number
): LeagueData => {
  let returnLeague = null;
  for (let index = 0; index < Leagues.length; index++) {
    const currentLeague = Leagues[index];
    const currentLeagueSeason = currentLeague.seasons.find(
      s => s.year === 2020
    );
    if (currentLeagueSeason && currentLeagueSeason.teams.includes(clubId)) {
      returnLeague = currentLeague;
      break;
    }
  }
  return returnLeague;
};
