export interface VersionData {
  fmVersion: string,
  fmBlogUrl?: string,
  content: {
    home: {
      title: string,
      subtitle: string,
      latest: {
        url: string,
        version: string,
        updateDate: string
      },
      otherVersion?: {
        url: string
      },
      betaVersion?: {
        url: string
      },
      playerUpdateHistory?: {
        url: string
      },
      mainContent: string,
      note: string
    }
  }
}

export const fmVersionList: string[] = [
  "FM2021",
  "FM2020",
  "FM2019",
  "FM2018",
  "FM2017"
];

export const fmVersionDataList: VersionData[] = [
  {
    fmVersion: "FM2021",
    content: {
      home: {
        title: "Football Manager 2021 Jリーグデータパック",
        subtitle: "Football Manager 2021向け、J1から地域リーグまでのデータパック",
        latest: {
          url: "https://drive.google.com/file/d/1Tan4RlxKdiq4-EiIlwJeJz7UMhbEo4pg/view?usp=sharing",
          version: "v2.0.4",
          updateDate: "2021/07/17",
        },
        otherVersion: {
          url: "https://drive.google.com/open?id=1HhBR-47aUW7fXfkmLz5Wkgh5gWNZUj-L"
        },
        mainContent: `<p>FM2021向け、Jリーグパックです。J1から地域リーグまでのデータを収録しています。</p>
        <p>これまで通り、v2はFM21.3向けで、v1はFM21.0向けです。</p>
        <p><span style="color: #ff0000;"><strong>同梱されたJリーグ構成は一応地域リーグ１部まではプレイ可能ですが、自分はアドバンスドルールが不得意なので、調整があまり良くない場合もあります。（特にシーズン2021に関しては、まだいい案を見つかりませんので、今のリーグ構成はあくまで「動く」だけのものです）</strong></span>もし他のところに良いJリーグ構成があったら、本パックのデータだけを利用し、他の構成を使うのも構いません。</p>`,
        note: `<p>ダウンロードはZipファイルをダウンロードするだけでオーケーです。フォルダ内と同一内容です。</p>
        <p>製作中フォルダは文字通り製作中のものですが、今どこまで出来たのか気になる方はどうぞチェックしてください。こちらは基本不定期更新です。</p>
        <p>本パックは商業利用ではない限り、使用は基本自由です。</p>
        <hr />
        <p>FM関連リンク</p>
        <p>ajopya氏：<a target="_blank" href="http://fmjp12.blogspot.com/">週末ジレンマ</a></p>
        <p>osaru1597氏：<a target="_blank" href="http://hw001.spaaqs.ne.jp/osaru1597/">Underdogs</a></p>
        <p>dosukoi氏：<a target="_blank" href="https://dosukoi.bulog.jp/">Dosukoi Press</a></p>
        <p>あまーり氏：<a target="_blank" href="https://www.amari-fm.com/">あまーりのゲーム日記</a></p>
        <p>EST Touiro氏：<a target="_blank" href="http://estouiro.wp.xdomain.jp/2019/12/25/j-league-facepack-footballmanager-2020/">EST Games （フェイスパック）</a></p>`,
      }
    }
  },
  {
    fmVersion: "FM2020",
    content: {
      home: {
        title: "Football Manager 2020 Jリーグデータパック",
        subtitle: "Football Manager 2020向け、J1から地域リーグまでのデータパック",
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
        },
        mainContent: `<p>FM2020向け、Jリーグパックです。J1から地域リーグまでのデータを収録しています。</p>
        <p>v2.0.xはFM20.4向けの最新バージョンです。</p>
        <p>使用するデータベースによってバージョンを利用してください、FM20.4はv2.0.x（シーズン2020）、FM20.0は<a target="_blank" href="https://firebasestorage.googleapis.com/v0/b/fm-j-league-pack.appspot.com/o/v1.0.3.zip?alt=media&token=965da9dd-0401-4b13-8bf1-362c9b2b4cea">v1.0.3</a>（シーズン2019）を利用してください。なお、FM20.3はベータのみサポートです。</p>
        <p>v2.0.0からでは選手のデータは一つファイルにまとめることにした。もし分割バージョンが必要だとしたら、ほかのバージョンでダウンロードしてください。</p>
        <p>ちなみに能力修正などのアップデートはv2.0.xのみで、v1.0.xは不具合やバグ修正だけのことです。</p>
        <p><span style="color: #ff0000;"><strong>同梱されたJリーグ構成は一応地域リーグ１部まではプレイ可能ですが、自分はアドバンスドルールが不得意なので、調整があまり良くない場合もあります。</strong></span>もし他のところに良いJリーグ構成があったら、本パックのデータだけを利用し、他の構成を使うのも構いません。</p>`,
        note: `<p>ダウンロードはZipファイルをダウンロードするだけでオーケーです。フォルダ内と同一内容です。</p>
        <p>製作中フォルダは文字通り製作中のものですが、今どこまで出来たのか気になる方はどうぞチェックしてください。こちらは基本不定期更新です。</p>
        <p>本パックは商業利用ではない限り、使用は基本自由です。</p>
        <hr />
        <p>FM関連リンク</p>
        <p>ajopya氏：<a target="_blank" href="http://fmjp12.blogspot.com/">週末ジレンマ</a></p>
        <p>osaru1597氏：<a target="_blank" href="http://hw001.spaaqs.ne.jp/osaru1597/">Underdogs</a></p>
        <p>dosukoi氏：<a target="_blank" href="https://dosukoi.bulog.jp/">Dosukoi Press</a></p>
        <p>あまーり氏：<a target="_blank" href="https://www.amari-fm.com/">あまーりのゲーム日記</a></p>
        <p>EST Touiro氏：<a target="_blank" href="http://estouiro.wp.xdomain.jp/2019/12/25/j-league-facepack-footballmanager-2020/">EST Games （フェイスパック）</a></p>`,
      }
    }
  },
  {
    fmVersion: "FM2019",
    fmBlogUrl: "https://atelierkarin.hatenablog.jp/entry/2018/11/04/143955",
    content: {
      home: {
        title: "Football Manager 2019 Jリーグデータパック",
        subtitle: "Football Manager 2019向け、J1から地域リーグまでのデータパック",
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
        },
        playerUpdateHistory: {
          url: "https://drive.google.com/open?id=1UZG2QprBr4UUPPsho1prL_yh2XyNlIsVUz24a35YOss"
        },
        mainContent: `<p>相変わらずJリーグのデータメインのパックです。ベースは去年のものだから基本はFM2018と同じ仕様となっています。</p>
        <p><strong>いくつバージョンを用意したが、基本はプレイするデータベースバージョンに合わせてダウンロードしてください。よくわからない場合、最新バージョンだけを利用してください。v2.1.xはシーズン2019夏の移籍市場を反映したアップデートで、v2.0.xは2019のシーズンスタート、FM19.3（FMのデータベースバージョン、冬の移籍市場を反映した大規模アップデート）向けに制作されたもの。これからの更新もv2.0.xだけなので、基本はこっちを利用してください。ちなみにv2.0.xはシーズン2019のデータです。</strong></p>
        <p>なお、v1.0.1はFM2018のJリーグパックそのまま転用されたもの、シーズン2018のデータです。またv1.9.0は、FM19.3リリースされる前に、シーズン2019向けに制作したデータ（更新は3/1まで）です。両方もFM19.0（ロンチのデータベースバージョン）のみ適用可能。</p>
        <p><span style="color: #ff0000;"><strong>同梱されたJリーグ構成でもプレイ可能ですが、自分はアドバンスドルールが不得意なので、調整が良くない部分もあるかもしれない。</strong></span>ゆえにほかのJリーグ構成があればそっちを利用してください。</p>
        <p>本格的なJリーグ構成は<a target="_blank" href="https://dosukoi.bulog.jp/2018/12/12/fm2019-%e4%ba%ba%e7%89%a9%e5%90%8d%e3%82%92%e6%97%a5%e6%9c%ac%e8%aa%9e%e3%81%a7%e9%81%8a%e3%81%b3%e3%81%9f%e3%81%84%e6%96%b9%e3%81%af%ef%bd%a5%ef%bd%a5%ef%bd%a5/">こちら</a>を参考してください（ただし現時点FM19.0だけのようです）、選手のデータは下記からダウンロードすれば利用できます。（ただしこちらは他の人が作ったものなので、整合性とかはこちらではわかりません。あと、たぶん製作中には対応してないので製作中データを利用する際注意してください。ちなみに上記のBlogではローマ字表記バージョンが制作されてますので、ローマ字がほしい方は上記のリンクから探してください。）</p>`,
        note: `<p>ダウンロードはZipファイルをダウンロードするだけでオーケーです。フォルダ内と同一内容です。</p>
        <p>製作中フォルダは文字通り製作中のものですが、今どこまで出来たのか気になる方はどうぞチェックしてください。こちらは基本不定期更新です。</p>
        <p><span style="color: #ff0000;"><strong>大学クラブについて：</strong></span>去年までは大学クラブのデータまでは補完をしたが、どうもFMのAIでは大学クラブのBチームやCチームのことまともに扱えない、エディタの指定チームも機能してないため、データを補完しても結局BチームやCチームは誰も居ないことで、今年から大学クラブは更新しないことにした。もっとも、FMでは大学のことをアマチュアクラブとして扱ってたり、いつでも自由移籍が可能の上、日本の大学クラブを再現するのことはやはりシステム上では無理かと思います、ゆえにスルーすることに。</p>`
      }
    }
  },
  {
    fmVersion: "FM2018",
    fmBlogUrl: "https://atelierkarin.hatenablog.jp/entry/2018/01/02/012536",
    content: {
      home: {
        title: "Football Manager 2018 Jリーグデータパック",
        subtitle: "Football Manager 2018向け、J1から地域リーグまでのデータパック",
        latest: {
          url: "https://drive.google.com/file/d/18KSwxePee74JDOr9ao-hCho68OZpcsQc/view",
          version: "v1.0.14",
          updateDate: "2018/09/15",
        },
        mainContent: `<p>Jリーグパックです。去年と同じですが。</p>
        <p>今度は完全に18.3向けに作ったのでシーズン2018のデータのみです。ゆえに2018年からJリーグから居なくなった選手は補完しない。</p>
        <p>1.0.0からは18.3向けとなります。</p>
        <p><span style="color: #ff0000;"><strong>なお、地域リーグ以降データ量があまりにも多く、ニューゲームのロードでは20分～30分かかる場合もございます。地域リーグ（JFLも）のデータ別に需要がなかったら、対応するデータファイルを外してもいいと思います（ロードは少し早くなるかも）</strong></span></p>
        <p><span style="color: #673ab7;"><strong>地域リーグデータ（北海道と中国リーグ）とスタッフデータ（特に強化部）絶賛募集中です！！！！</strong></span></p>
        <p>現状：1.0.14（大型アップデートは1.0.5にて終了。<span style="color: #ff0000;"><strong>最終移籍更新は1.0.12にて終了。</strong></span></p>`,
        note: `<p><strong>18.2→18.3について</strong></p>
        <p>確認された削除された選手・スタッフのユニークID（Jリーグ関連）：<br />129295、320307、775004、775507、783646、784094、788523、788633、962836、8826161、15004041、15016767、15064133、19225868、19265373、19274612、45025845、45035237、45035329、45052606、45104921、55061607、62046578、78048433、88006719、91154542</p>
        <p>リーグのチーム：<br />今年ではどうやら2018シーズンに更新されてないようで、同梱されたJリーグシーズン2018.fmfは引き続き利用することが必要です。地域リーグに関しては地域リーグデータがほとんど補完されたら更新します。また、チームは更新されてないゆえ、リーグ構成はそのまま利用できると思います。</p>`
      }
    }
  },
  {
    fmVersion: "FM2017",
    fmBlogUrl: "https://atelierkarin.hatenablog.jp/entry/2016/11/19/165712",
    content: {
      home: {
        title: "Football Manager 2017 Jリーグデータパック",
        subtitle: "Football Manager 2017向け、J1から地域リーグまでのデータパック",
        latest: {
          url: "https://drive.google.com/file/d/0B19ZHUrJcoYNXzFmTzVOVVY2LWM/view",
          version: "v2.0.11",
          updateDate: "2017/08/20",
        },
        otherVersion: {
          url: "https://drive.google.com/file/d/0B19ZHUrJcoYNVDFLZmdqSm16QkU/view"
        },
        mainContent: `<p>Jリーグデータパックです。このデータパックはあくまでJリーグ選手の補完がメインなので、ほかのデータに関してはあまり弄ってません。クラブ名などのことは、ほかのLTCファイルを探してください（Underdogsさんの日本語化セットがおすすめです、うちもUnderdogsさんのLTCや日本語化を導入した環境で作業しています）。</p>
        <p><span style="color: #ff0000;"><strong>注意：v2.0.11で更新は完了しました。</strong></span></p>
        <p><strong>＝＝＝最新バージョン＝＝＝</strong></p>
        <p>v1：現在は<span style="text-decoration: underline;"><strong>v1.3.9</strong></span>です（<span style="text-decoration: underline;"><strong>2017/02/18</strong></span>）</p>
        <p>v2：現在は<span style="text-decoration: underline;"><strong>v</strong></span><span style="text-decoration: underline;"><strong>2.0.11</strong></span>です（<span style="text-decoration: underline;"><strong>2017/08/20</strong></span>）</p>
        <p> </p>
        <p><strong>＝＝＝Ver 2.0.0 について＝＝＝</strong></p>
        <p>Ver 2.0.0 は17.3.0ベースです。オリジナルデータベースを利用する場合は、オリジナルVer 1.x.x を利用してください。Ver 2.0.0 のデータは全部シーズン2017なので2017年からプレイするのを推奨します。</p>
        <p> </p>
        <p><strong>＝＝＝おまけのリーグ構成について＝＝＝</strong></p>
        <p>地域リーグ(1部)までの、上記Google Driveダウンロードで統合されました。</p>
        <p>地域リーグに関しては、全社はありません、地域CL簡略化（リアル再現は個人的に無理と感じたので…）。改めていうとリアルではないので（本来公開するつもりもないので）、本当にただのおまけです。</p>
        <p>自分はアドバンスドルールについて得意ではないので、ゆえにこの構成はデバッグ、あるいは参考用です。ご了承してください。</p>
        <p> </p>
        <p><strong>＝＝＝インストール方法＝＝＝</strong></p>
        <p>同梱されたFMFファイルを以下のフォルダにコピーしてください。</p>
        <p><code>マイドキュメント\\Sports Interactive\\Football Manager 2017\\editor data</code></p>
        <p>そして新規キャリアを選択すると、日本を選択できます</p>
        <p> </p>
        <p><strong>＝＝＝Faceパック＝＝＝</strong></p>
        <p>本パックを対応するFaceパックはこちら</p>
        <p><a href="http://fmwithamane.blog.fc2.com/">雨音のFootballManager放浪記</a></p>
        <p>（注意：17.3ではIDズレが確認されてます、修正方法はこちらを参考してください： <a href="https://twitter.com/ajopya/status/840273464372031490">https://twitter.com/ajopya/status/840273464372031490</a>）</p>
        <p><br /><strong>＝＝＝使用する前に注意＝＝＝</strong></p>
        <p>J1からJFLまでの選手は全部、スタッフもかなり揃います（新規選手・スタッフは6000ほど）。ベースは「Jリーグデータパック」だがシーズン2017向けに調整されています。地域リーグに関してはこれから調整します。また選手の能力査定、とくにルーキーに関してはこれから調整します。</p>
        <p>CAとPAとポジション（と一部選手の能力）に関しては、以前FM2015にあったJリーグMODデータと、2016シーズンのJリーグデータ、特にfootball-labやsoccer-dbのデータを参考して作ってます。データを見て独自に判断したこともあって、もしご意見や提案があれば、いつでもどうぞ（例えばこの選手は今はこうですよ！など）。JFL以下のCAは基本、出場記録から判断すること。</p>
        <p>ちなみに付属のリーグ構成はデバッグ用だけで、本当のJリーグ構成ではありません。あくまで参考のみで、Jリーグのルール間違ってるとか、そのへんはどうかご了承を。ただし基本のことは遊べます。また、リーグ構成は2017年を対応していますが、スタート年は調整してないので（まだリーグ構成を見直す余裕はないのでご勘弁を）、韓国やほかのアジアリーグをオンにし、2017/1/28からスタートで利用してください。</p>
        <p> </p>
        <p><strong>＝＝＝参考CA＝＝＝</strong></p>
        <p>J1：100-130　（代表クラス選手・反則外人のみ120-130）</p>
        <p>J2：80-110　（スター選手のみ100-110）</p>
        <p>J3：60-90　（大分と栃木は別格なので80-90はちょっと多め）</p>
        <p>JFL：55-75　（今年の鹿児島を見るとJ3との差はそれほど大きくない）</p>
        <p>地域リーグ：0-70　（一応実力があるクラブはJFL中位以上いけると思うので）</p>`,
        note: `<p><strong>＝＝＝Q&amp;A＝＝＝</strong></p>
        <p>興味があれば。</p>
        <blockquote>
        <p>Q. なぜこんなことするの？<br />A. 地域リーグからのサカつくがやりたかったからです。もう普通のサカつくは出ないから、FMは一番近い存在で、そしてある程度実現できるもの。なにせエディターとデータさえあれば、どんなリーグでも作れるからね。<br />JリーグMODはFM2015以降存在しないから、FM2016はFM2015のやつそのまま利用しても大丈夫だったけど、2017はさすがに移籍を含めてデータの変更点が多いからそのまま利用するのは面倒だった。結局やはり自分で作るしか！ということで作りました。<br />最初は自分用だけで公開するつもりはなかったが、要望があったので公開しました。<br />大変で辛いですが、まあそもそも自分のためでもあるので、決してただの阿呆ではないのです。<br /><br />Q. CAどう判断するの？<br />A. J3以上は以前にあったJリーグMOD、そしてFootball-labなどを参考して修正する。2016年で活躍すれば高く評価する。活躍しない選手はたとえ以前ではCAが高くても低めに調整する、特に反則外人。まあ、カイケはいい例かな、FM2016では結構高い能力持ちだが、そのままだとマリノスが優勝するほど強いので（最初は10回テストプレイして、そのうち8～9回もマリノスが1位独走してた）、かなり低めに調整された（Jで活躍しない反則外人は実に一番困る存在）。<br />JFLとそれ以下はデータが非常的に不足ですので、ほとんどはチームの上限CA（リーグ成績から判断）を決めて、そして出場記録のデータで評価する。よく出る選手はまあ強いだろう、という判断です。<br />J1のが高い！というコメントを見たけど、FIFAでもJリーグは60-70この辺だから、J1が100-120が適正と思う。あまり弱すぎると東南アジアのクラブすら勝てないから（現状ではACL、よくベスト8辺りまで出るから、現実的かなと思う）。<br /><br />Q. ポジションはどう判断するの？<br />A. J3まではFootball-labさん頼りです。JFL以下は…、正直詰みました…。DF=CB、MF=CM、FW=STだけではどうも…。というけどほとんどのサイトではそこまでの情報しかなかった。<br />そんでググる最中、速報くんレポートというものを見つけました。フォーメーション画像まであったので大喜びでした。ゆえにポジションデータがある選手はほとんどそこからです。ほかは…すまん、DF=CB、MF=CM、FW=STです。<br /><br />Q. リーグ構成に地域リーグがないだが？<br />A. 改めて強調すると、あれはデバッグ用なので。実は地域リーグまでのリーグ構成は作ったけど、リーグ選択にバグがあるっぽいから公開はやめました（問題なく遊べるが…）。そもそもFMで地域CLまで完全再現はどうやら無理っぽい、文句言われそうなのでJFLまでにした（JFL→J3もクラブライセンスについては再現できないが、それだとJFLはいつまでも昇格できないから、少し変更した。もしHonda FC辺りをブロックできたら最高と思うけどね、FM2017では昇格ブロックがあるけどなぜか機能しない）。<br /><br />Q. 地域リーグ2部は？<br />A. 地域リーグ1部すらデータ集めに苦労してるので、2部はさすがにもう無理です。確かに都道府県リーグからのサカつくはぼくがやりたかったことだが、データがないからどうあがいても無理…ゆえに地域リーグ1部まで。<br />とはいえ、データ提供すればぼくはやりますよ（他力本願<br /><br />Q. この選手のデータに間違いが…<br />A. ぜひブログのコメントで提出してください（メールアドレスはスパムが怖いので公開はしませんごめんなさい、Twitterでも歓迎です）。どんな意見でも歓迎です。<br /><br />Q. 契約満了は反映しないの？<br />A. 契約満了を設定しても、CPUチームは勝手に更新するから、結局意味は無いかなというこで移籍するまで反映しない。<br /><br />Q. 小倉嫌いなの？<br />A. ああしないと2016年のグランパス再現できないから。それでも運が良ければ（ある程度乱数かかるので）上位に入れるけど。<br /><br />Q. 久保建英のPAがたかっ<br />A. PAは将来性だから、2016年ではバルセロナとかも期待してると、-8と決めた。FMではそこまで伸びるか、結局は育成次第なので。<br /><br />Q. どこのサポ？<br />A. 特に好きなチームはないけど、あえていうと、最近は札幌？<br /><br />Q. FM2018（以降）も作るの？<br />A. 未来のことは誰もわからないが、作る必要ない（公式Jリーグ収録）ことだけを祈る。</p>
        <p> </p>
        <p>Q. このパックを入れて選手が実名になったが、チームのほうは架空のままよ！！<br />A. このパックは選手データのみですから。チーム名などはUnderdogsさんのLTCを導入してどうぞ（日本語化）：hw001.spaaqs.ne.jp/osaru1597/<br />手続きは<br />1. FM2017のダミーデータを削除<br />2. UnderdogsさんのLTCファイルを導入（ほかの実名LTCファイルでも良いが、日本語化はこちらが全部できるので）<br />3. このパックを導入<br />です！</p>
        <p> </p>
        <p>Q. 地域リーグの名前間違ってるよ<br />A. 地域リーグは多くのチームでは名前の読み方が公式サイトでも載ってません、その場合はよくある読み方から推測するのみです。正しい情報はぜひ提供してください＞＜</p>
        <p> </p>
        <p>Q. なぜ日本のクラブだけプロフィールとか表示されないのだ？<br />A. FMにJのデータがないのは、ライセンスの問題が原因で、日本関連はかなりの制限があるようです。選手・スタッフのデータはこのパックで補完できるが、プロフィールなどはゲーム内の制限のようで、こちらではどうしようもないです。<br />これまでのJリーグのMODでも同じ現象がなので、別にこのMODが原因というわけではない。<br />この制限はゲームエンジンからのことで、日本のクラブだけで無条件引っかかるのようで（試しに新しいクラブ＠日本を作っても表示されない）、諦めるしかないのです。<br />解決策はあるが、日本のデータそのものを最初から作る必要なので（例えば、Ireland 1922をアクティブにし、それを日本に変える、現存の日本をノンアクティブ、つまり”新しい国”を作る）、検証・デバッグが大変になるからさすがに余裕がありません。</p>
        <p> </p>
        <p>Q. スタッフの履歴おかしい、バイオグラフィーの説明が間違ってる。<br />A. 公式すでにあった監督の履歴データを参考して、同じようにスタッフの履歴を埋めたが、何かの理由でゲーム内で新規スタッフのノンプレイ履歴は選手以外うまく反映されない。バイオグラフィーの説明はおかしいだが、実績だけ忠実に反映されるから、まだ何か足りないか（まだどこかをエディットしないといけないとか）、実はぼくにもよくわからない。もしご存知であればぜひ教えてください。<br />ちなみに引退の日を指定しても無駄のようです。選手以外の役割は認識してない。</p>
        <p> </p>
        <p>Q. そちらのリーグ構成を導入するとJシーズン表示が欧州みたいに秋春制になってるが、2016じゃないの？<br />A. あれはデバッグ（ｒｙ。と、天皇杯が1/1のせいです。</p>
        <p> </p>
        <p>Q. 重複選手・スタッフはどう修正するのか<br />A. FMの仕様を考えると削除はなるべくやらないほうがいいのです。特に選手・スタッフの削除に関しては、バグの原因でもなるので（過去の経験）、基本的に他の人に変える。地域2部の選手・ユースなど、候補はいくらでもあるから問題ないのです。</p>
        <p> </p>
        <p>Q. サポートの予定は？<br />A. 公式の冬の移籍データアップデートまではゆっくりと移籍反映、そして履歴を補完する。1.3.xのマイナーアップデートのみ。<br />公式の冬の移籍データは、おそらく海外に移籍した日本人が公式でも反映されるなど、一部のデータは改変されると考えると（重複とかはあるかと思います、逆に2017年Jに移籍する海外の日本人は消えるかどうかも）、2017シーズンのデータに切り替え、バージョンも2.xとなる。2.xでは2017移籍は最初から反映される予定なので、2016年から遊びたい方は、1.xを利用する方がいいでしょう（2.xの配信リンクは別となります）。<br />ちなみに来シーズンの登録チームはテスト済み、2.xでは一緒に反映されます。リーグ構成さえあれば2017年から遊べます。<br />なお、僕一人では両方を更新する余裕が無いので、2.xになった途端、1.xの更新はできなくなる（現状未完成のは移籍と履歴のみだから、1.xは問題なく遊べると思います）。<br />そして夏移籍期間までv2.xをサポートする。</p>
        <p> </p>
        <p>Q. <strong>（v1.3.6から）</strong>長期プランに「サウジアラビアではプレイしたくないと思っている」選手とかいるけどこれなに？<br />A. 今のMODで少しプレイしてみると、なぜか数人が中東に移籍しちゃう。でもリアルではありえないよね？他の国はともかく、中東だけはプレイする日本人はほとんどないはず。おそらくデフォルトのリーグ順位ではサウジ、UAEなど＞Jリーグだから、このことが起きるだろう。でもリアルではないので、防止策として付けておきました。全部の選手ではない、基本的にJリーグだけでプレイ、CAが95以上、18から32歳までの日本人選手のみ。中東クラブは基本そこそこの選手のみ狙うから<br />さすがにこのパックを利用して、中東リーグをプレイする人はいないだろう…？（居るなら教えてください</p>
        <p> </p>
        <p>Q. 清武がセレッソに戻りました、FM公式データのPAでは130以上だけど…<br />A. とりあえずPAを-10にしました。カイケのこともあって、PA130以上はバランスブレイカーになりそうで、Jに戻るということで能力を抑えた。まあJで無双すれば元に戻ることもないが…</p>`
      }
    }
  },
];