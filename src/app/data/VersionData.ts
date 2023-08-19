export interface VersionData {
  fmVersion: string,
  fmBlogUrl?: string,
  content: {
    home: {
      latest: {
        url: string,
        version: string,
        updateDate: string
      },
      otherVersion?: {
        url: string
      },
      engVersion?: {
        url: string
      },
      betaVersion?: {
        url: string
      }
    }
  }
}

export const fmVersionList: string[] = [
  "FM2023",
  "FM2022",
  "FM2021",
  "FM2020",
  "FM2019",
  "FM2018",
  "FM2017"
];

export const fmVersionDataList: VersionData[] = [
  {
    fmVersion: "FM2023",
    content: {
      home: {
        latest: {
          url: "https://drive.google.com/file/d/1Ba1EkOk3SJ9PkqAs6UvKXarjfEm0yYyy/view?usp=sharing",
          version: "v2.1.0",
          updateDate: "2023/08/19",
        },
        engVersion: {
          url: "https://drive.google.com/file/d/1BaadG7gM6nVH-88XuNgAGb76nkJrMoe5/view?usp=sharing"
        },
        otherVersion: {
          url: "https://drive.google.com/drive/folders/1DRLRYcQvBRwvTAXufYyTXVavkRP1KSTI?usp=sharing"
        }
      }
    }
  },
  {
    fmVersion: "FM2022",
    content: {
      home: {
        latest: {
          url: "https://drive.google.com/file/d/1DG0YIVcaCXPMBI7hxnyVOS0c_frc_WtL/view?usp=sharing",
          version: "v2.1.0",
          updateDate: "2022/08/27",
        },
        engVersion: {
          url: "https://drive.google.com/file/d/1DDjbEtamzqmNtQYZcsQSTsahGRv2KT_R/view?usp=sharing"
        },
        otherVersion: {
          url: "https://drive.google.com/drive/folders/13KOgMOWKWILdKHCuWNZ3dy63wB7AFHAi?usp=sharing"
        }
      }
    }
  },
  {
    fmVersion: "FM2021",
    content: {
      home: {
        latest: {
          url: "https://drive.google.com/file/d/1EtfJwXjwKB1w1PCsFrSSKQ8C_l-z8fFo/view?usp=sharing",
          version: "v2.1.0",
          updateDate: "2021/08/14",
        },
        otherVersion: {
          url: "https://drive.google.com/open?id=1HhBR-47aUW7fXfkmLz5Wkgh5gWNZUj-L"
        }
      }
    }
  },
  {
    fmVersion: "FM2020",
    content: {
      home: {
        latest: {
          url: "https://drive.google.com/open?id=19oeIh5B4V_RtRxT0FCbmktNTWVFsB3mW",
          version: "v2.0.5",
          updateDate: "2020/09/05",
        },
        otherVersion: {
          url: "https://drive.google.com/open?id=1le3vQy7HNwH-77Y4lIrGgyy7FafQEfGI"
        },
        betaVersion: {
          url: "https://drive.google.com/open?id=15ziJadXm9eCJFUM5mEQnArA0vU3eQwBr"
        }
      }
    }
  },
  {
    fmVersion: "FM2019",
    fmBlogUrl: "https://atelierkarin.hatenablog.jp/entry/2018/11/04/143955",
    content: {
      home: {
        latest: {
          url: "https://firebasestorage.googleapis.com/v0/b/fm-j-league-pack.appspot.com/o/v2.1.0.zip?alt=media&token=0c858636-27cf-4086-91d3-287b4bbdcebb",
          version: "v2.1.0",
          updateDate: "2019/08/18",
        },
        otherVersion: {
          url: "https://drive.google.com/drive/folders/1EIeEQ6tQwImdCxVUCk8iIcqc8q4ruvXf/"
        },
        betaVersion: {
          url: "https://drive.google.com/drive/folders/1Cu3yGFKQh4G2pMpMIL1Je_TuRD-nbBnG/"
        }
      }
    }
  },
  {
    fmVersion: "FM2018",
    fmBlogUrl: "https://atelierkarin.hatenablog.jp/entry/2018/01/02/012536",
    content: {
      home: {
        latest: {
          url: "https://drive.google.com/file/d/18KSwxePee74JDOr9ao-hCho68OZpcsQc/view",
          version: "v1.0.14",
          updateDate: "2018/09/15",
        }
      }
    }
  },
  {
    fmVersion: "FM2017",
    fmBlogUrl: "https://atelierkarin.hatenablog.jp/entry/2016/11/19/165712",
    content: {
      home: {
        latest: {
          url: "https://drive.google.com/file/d/0B19ZHUrJcoYNXzFmTzVOVVY2LWM/view",
          version: "v2.0.11",
          updateDate: "2017/08/20",
        },
        otherVersion: {
          url: "https://drive.google.com/file/d/0B19ZHUrJcoYNVDFLZmdqSm16QkU/view"
        }
      }
    }
  },
];
