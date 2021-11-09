export interface GuideContent {
  title: string,
  content: string
}

export interface Guide {
  fmVersion: string,
  guideContent: GuideContent[]
}

export const fmGuide: Guide[] = [
  {
    fmVersion: "FM2022",
    guideContent: [
      {
        title: "注意点",
        content: `<div class="alert alert-danger">（MODなので最低限のWindows知識が必要です。でないとご自己責任を…）</div>
        <p>FMではライセンスのせいで日本に関してはかなりの制限が設定されています。ゆえにこのパックを導入しても、クラブプロフィールなどは見れません、注意してください。</p>`
      },
      {
        title: "適用する前に",
        content: `<p>まずはFM 2022をインストールすることですが、インストールが終わったら、まずはFM公式が用意した偽データを削除する必要があります。これを削除しないと、クラブの名前は変な名前のままです。</p>
        <p>インストールの場所によるが、デフォルトは<code>C:\\Program Files\\Steam\\steamapps\\common\\Football Manager 2022\\data\\db\\</code>を探してください。<br />または、ライブラリからFootball Manager 2022で右クリックし、プロパティを選択、「ローカルファイル」を選択、そして「ローカルファイルを閲覧」をクリックしてください。するとインストールフォルダが表示されますので、dataフォルダ→dbフォルダを探してください。</p>
        <p><img class="hatena-fotolife" title="f:id:karinchan:20180113120833p:plain" src="https://cdn-ak.f.st-hatena.com/images/fotolife/k/karinchan/20180113/20180113120833.png" alt="f:id:karinchan:20180113120833p:plain" /></p>
        <p><img class="hatena-fotolife" title="f:id:karinchan:20180113121413p:plain" src="https://cdn-ak.f.st-hatena.com/images/fotolife/k/karinchan/20180113/20180113121413.png" alt="f:id:karinchan:20180113121413p:plain" /></p>
        <p>そこでは2100や2110などのフォルダがありますが、バージョン別のデータですが、念のために以下のものを全部削除してください：</p>
        <div class="alert alert-info">
          <p><code>21**\\lnc\\greek\\</code>のすべてファイル（そのlncが偽データです）</p>
          <p><code>21**\\lnc\\all\\</code>のすべてファイル（そのlncが偽データです）</p>
        </div>
        <p>これで下準備は終わりました。（リーグの名前はデフォルトではおかしいなので、Underdogs氏のおまけファイルセットを導入するほうがいいだろう。もしRealname fixを導入しなかったら、ここでRealname fixのファイルを入れるのをおすすめします。日本だけではなく、ドイツやブラジルなど、ライセンスの問題で偽データのが多いからです。どのRealname fixが良いか、それは別のことなのでここでは解説しません。）</p>`
      },
      {
        title: "インストール",
        content: `<p>次はこのデータパックを適用することです。このデータパックはエディターファイルなので、エディターファイルをエディターフォルダに移動すると使えます。</p>
        <p>エディターフォルダの場所もインストールの場所によるが、デフォルトでは<code>C:\\Documents\\Sports Interactive\\Football Manager 2022\\editor data</code>、ゆえにZipのfmfファイルを全部ここにコピーすれば適用します。インストールはこれで完了です。</p>
        <p>するとゲームを起動し、普段通りにゲームをスタートし、リーグ選択のところでは日本が表示される（ちなみにリーグ構成がなかったら表示されてない。その場合Jリーグをプレイできませんが、Jリーグ選手はそのまま反映される、ほかのリーグでもJリーグの選手を購入できます。ただし、選択したデータベースサイズ次第）。</p>
        <hr />
        <p>エディターファイルが反映されたどうかは、以下キャリアゲームの設定で確認できます。データベースのドロップダウンリストをクリックし、エディターデータに「Jリーグデータベース」などがリストアップされたらインストール成功とのことです。</p>
        <p><img class="full-image" src="https://firebasestorage.googleapis.com/v0/b/fm-j-league-pack.appspot.com/o/Image%20010.png?alt=media&token=06d7494f-9a6a-415f-b609-d022325ead78" /></p>
        <hr />
        <p>検証用だけであれば、推奨は以下の設定でゲームを開始すること。</p>
        <p><img class="full-image" src="https://firebasestorage.googleapis.com/v0/b/fm-j-league-pack.appspot.com/o/Image%20011.png?alt=media&token=4ad85a9a-9732-439a-b0f0-30a0a38bbd0a" /></p>`
      },
    ]
  },
  {
    fmVersion: "FM2021",
    guideContent: [
      {
        title: "注意点",
        content: `<div class="alert alert-danger">（MODなので最低限のWindows知識が必要です。でないとご自己責任を…）</div>
        <p>FMではライセンスのせいで日本に関してはかなりの制限が設定されています。ゆえにこのパックを導入しても、クラブプロフィールなどは見れません、注意してください。</p>`
      },
      {
        title: "適用する前に",
        content: `<p>まずはFM 2021をインストールすることですが、インストールが終わったら、まずはFM公式が用意した偽データを削除する必要があります。これを削除しないと、クラブの名前は変な名前のままです。</p>
        <p>インストールの場所によるが、デフォルトは<code>C:\\Program Files\\Steam\\steamapps\\common\\Football Manager 2021\\data\\db\\</code>を探してください。<br />または、ライブラリからFootball Manager 2021で右クリックし、プロパティを選択、「ローカルファイル」を選択、そして「ローカルファイルを閲覧」をクリックしてください。するとインストールフォルダが表示されますので、dataフォルダ→dbフォルダを探してください。</p>
        <p><img class="hatena-fotolife" title="f:id:karinchan:20180113120833p:plain" src="https://cdn-ak.f.st-hatena.com/images/fotolife/k/karinchan/20180113/20180113120833.png" alt="f:id:karinchan:20180113120833p:plain" /></p>
        <p><img class="hatena-fotolife" title="f:id:karinchan:20180113121413p:plain" src="https://cdn-ak.f.st-hatena.com/images/fotolife/k/karinchan/20180113/20180113121413.png" alt="f:id:karinchan:20180113121413p:plain" /></p>
        <p>そこでは2100や2110などのフォルダがありますが、バージョン別のデータですが、念のために以下のものを全部削除してください：</p>
        <div class="alert alert-info">
          <p><code>21**\\lnc\\greek\\</code>のすべてファイル（そのlncが偽データです）</p>
          <p><code>21**\\lnc\\all\\</code>のすべてファイル（そのlncが偽データです）</p>
        </div>
        <p>これで下準備は終わりました。（リーグの名前はデフォルトではおかしいなので、Underdogs氏のおまけファイルセットを導入するほうがいいだろう。もしRealname fixを導入しなかったら、ここでRealname fixのファイルを入れるのをおすすめします。日本だけではなく、ドイツやブラジルなど、ライセンスの問題で偽データのが多いからです。どのRealname fixが良いか、それは別のことなのでここでは解説しません。）</p>`
      },
      {
        title: "インストール",
        content: `<p>次はこのデータパックを適用することです。このデータパックはエディターファイルなので、エディターファイルをエディターフォルダに移動すると使えます。</p>
        <p>エディターフォルダの場所もインストールの場所によるが、デフォルトでは<code>C:\\Documents\\Sports Interactive\\Football Manager 2021\\editor data</code>、ゆえにZipのfmfファイルを全部ここにコピーすれば適用します。インストールはこれで完了です。</p>
        <p>するとゲームを起動し、普段通りにゲームをスタートし、リーグ選択のところでは日本が表示される（ちなみにリーグ構成がなかったら表示されてない。その場合Jリーグをプレイできませんが、Jリーグ選手はそのまま反映される、ほかのリーグでもJリーグの選手を購入できます。ただし、選択したデータベースサイズ次第）。</p>
        <hr />
        <p>エディターファイルが反映されたどうかは、以下キャリアゲームの設定で確認できます。データベースのドロップダウンリストをクリックし、エディターデータに「Jリーグデータベース」などがリストアップされたらインストール成功とのことです。</p>
        <p><img class="full-image" src="https://firebasestorage.googleapis.com/v0/b/fm-j-league-pack.appspot.com/o/Image%20010.png?alt=media&token=06d7494f-9a6a-415f-b609-d022325ead78" /></p>
        <hr />
        <p>検証用だけであれば、推奨は以下の設定でゲームを開始すること。</p>
        <p><img class="full-image" src="https://firebasestorage.googleapis.com/v0/b/fm-j-league-pack.appspot.com/o/Image%20011.png?alt=media&token=4ad85a9a-9732-439a-b0f0-30a0a38bbd0a" /></p>`
      },
    ]
  },
  {
    fmVersion: "FM2020",
    guideContent: [
      {
        title: "注意点",
        content: `<div class="alert alert-danger">（MODなので最低限のWindows知識が必要です。でないとご自己責任を…）</div>
        <p>FMではライセンスのせいで日本に関してはかなりの制限が設定されています。ゆえにこのパックを導入しても、クラブプロフィールなどは見れません、注意してください。</p>`
      },
      {
        title: "適用する前に",
        content: `<p>まずはFM 2020をインストールすることですが、インストールが終わったら、まずはFM公式が用意した偽データを削除する必要があります。これを削除しないと、クラブの名前は変な名前のままです。</p>
        <p>インストールの場所によるが、デフォルトは<code>C:\\Program Files\\Steam\\steamapps\\common\\Football Manager 2020\\data\\db\\</code>を探してください。<br />または、ライブラリからFootball Manager 2020で右クリックし、プロパティを選択、「ローカルファイル」を選択、そして「ローカルファイルを閲覧」をクリックしてください。するとインストールフォルダが表示されますので、dataフォルダ→dbフォルダを探してください。</p>
        <p><img class="hatena-fotolife" title="f:id:karinchan:20180113120833p:plain" src="https://cdn-ak.f.st-hatena.com/images/fotolife/k/karinchan/20180113/20180113120833.png" alt="f:id:karinchan:20180113120833p:plain" /></p>
        <p><img class="hatena-fotolife" title="f:id:karinchan:20180113121413p:plain" src="https://cdn-ak.f.st-hatena.com/images/fotolife/k/karinchan/20180113/20180113121413.png" alt="f:id:karinchan:20180113121413p:plain" /></p>
        <p>そこでは2000や2010などのフォルダがありますが、バージョン別のデータですが、念のために以下のものを全部削除してください：</p>
        <div class="alert alert-info">
          <p><code>20**\\lnc\\greek\\</code>のすべてファイル（そのlncが偽データです）</p>
          <p><code>20**\\lnc\\all\\</code>のすべてファイル（そのlncが偽データです）</p>
        </div>
        <p>これで下準備は終わりました。（リーグの名前はデフォルトではおかしいなので、Underdogs氏のおまけファイルセットを導入するほうがいいだろう。もしRealname fixを導入しなかったら、ここでRealname fixのファイルを入れるのをおすすめします。日本だけではなく、ドイツやブラジルなど、ライセンスの問題で偽データのが多いからです。どのRealname fixが良いか、それは別のことなのでここでは解説しません。）</p>`
      },
      {
        title: "インストール",
        content: `<p>次はこのデータパックを適用することです。このデータパックはエディターファイルなので、エディターファイルをエディターフォルダに移動すると使えます。</p>
        <p>エディターフォルダの場所もインストールの場所によるが、デフォルトでは<code>C:\\Documents\\Sports Interactive\\Football Manager 2020\\editor data</code>、ゆえにZipのfmfファイルを全部ここにコピーすれば適用します。インストールはこれで完了です。</p>
        <p>するとゲームを起動し、普段通りにゲームをスタートし、リーグ選択のところでは日本が表示される（ちなみにリーグ構成がなかったら表示されてない。その場合Jリーグをプレイできませんが、Jリーグ選手はそのまま反映される、ほかのリーグでもJリーグの選手を購入できます。ただし、選択したデータベースサイズ次第）。</p>
        <hr />
        <p>エディターファイルが反映されたどうかは、以下キャリアゲームの設定で確認できます。データベースのドロップダウンリストをクリックし、エディターデータに「Jリーグデータベース」などがリストアップされたらインストール成功とのことです。</p>
        <p><img class="full-image" src="https://firebasestorage.googleapis.com/v0/b/fm-j-league-pack.appspot.com/o/Image%20010.png?alt=media&token=06d7494f-9a6a-415f-b609-d022325ead78" /></p>
        <hr />
        <p>検証用だけであれば、推奨は以下の設定でゲームを開始すること。</p>
        <p><img class="full-image" src="https://firebasestorage.googleapis.com/v0/b/fm-j-league-pack.appspot.com/o/Image%20011.png?alt=media&token=4ad85a9a-9732-439a-b0f0-30a0a38bbd0a" /></p>`
      },
    ]
  },
  {
    fmVersion: "FM2019",
    guideContent: [
      {
        title: "注意点",
        content: `<div class="alert alert-danger">（MODなので最低限のWindows知識が必要です。でないとご自己責任を…）</div>
        <p>FMではライセンスのせいで日本に関してはかなりの制限が設定されています。ゆえにこのパックを導入しても、クラブプロフィールなどは見れません、注意してください。</p>
        <div class="alert alert-info">本ガイドのスクリーンショット画像はFM2018のものですが、FM2019でも同じです。</div>`
      },
      {
        title: "適用する前に",
        content: `<p>まずはFM 2019をインストールすることですが、インストールが終わったら、まずはFM公式が用意した偽データを削除する必要があります。これを削除しないと、クラブの名前は変な名前のままです。</p>
        <p>インストールの場所によるが、デフォルトは<code>C:\\Program Files\\Steam\\steamapps\\common\\Football Manager 2019\\data\\db\\</code>を探してください。<br />または、ライブラリからFootball Manager 2019で右クリックし、プロパティを選択、「ローカルファイル」を選択、そして「ローカルファイルを閲覧」をクリックしてください。するとインストールフォルダが表示されますので、dataフォルダ→dbフォルダを探してください。</p>
        <p><img class="hatena-fotolife" title="f:id:karinchan:20180113120833p:plain" src="https://cdn-ak.f.st-hatena.com/images/fotolife/k/karinchan/20180113/20180113120833.png" alt="f:id:karinchan:20180113120833p:plain" /></p>
        <p><img class="hatena-fotolife" title="f:id:karinchan:20180113121413p:plain" src="https://cdn-ak.f.st-hatena.com/images/fotolife/k/karinchan/20180113/20180113121413.png" alt="f:id:karinchan:20180113121413p:plain" /></p>
        <p>そこでは1900や1901などのフォルダがありますが、バージョン別のデータですが、念のために以下のものを全部削除してください：</p>
        <div class="alert alert-info">
          <p><code>19**\\lnc\\greek\\</code>のすべてファイル（そのlncが偽データです）</p>
          <p><code>19**\\lnc\\all\\</code>のすべてファイル（そのlncが偽データです）</p>
        </div>
        <p>これで下準備は終わりました。（もしRealname fixを導入しなかったら、ここでRealname fixのファイルを入れるのをおすすめします。日本だけではなく、ドイツやブラジルなど、ライセンスの問題で偽データのが多いからです。どのRealname fixが良いか、それは別のことなのでここでは解説しません。）</p>`
      },
      {
        title: "インストール",
        content: `<p>次はこのデータパックを適用することです。このデータパックはエディターファイルなので、エディターファイルをエディターフォルダに移動すると使えます。</p>
        <p>エディターフォルダの場所もインストールの場所によるが、デフォルトでは<code>C:\\Documents\\Sports Interactive\\Football Manager 2019\\editor data</code>、ゆえにZipのfmfファイルを全部ここにコピーすれば適用します。インストールはこれで完了です。</p>
        <p>するとゲームを起動し、普段通りにゲームをスタートし、リーグ選択のところでは日本が表示される（ちなみにリーグ構成がなかったら表示されてない。その場合Jリーグをプレイできませんが、Jリーグ選手はそのまま反映される、ほかのリーグでもJリーグの選手を購入できます。ただし、選択したデータベースサイズ次第）。</p>
        <hr />
        <p>エディターファイルが反映されたどうかは、以下キャリアゲームの設定で確認できます。データベースのドロップダウンリストをクリックし、エディターデータに「Jリーグデータベース」などがリストアップされたらインストール成功とのことです。</p>
        <p><img class="full-image" src="https://firebasestorage.googleapis.com/v0/b/fm-j-league-pack.appspot.com/o/Image%20089.png?alt=media&token=69aa99e6-159f-4c92-bba2-bf0a25b2fb40" /></p>
        <hr />
        <p>検証用だけであれば、推奨は以下の設定でゲームを開始すること。</p>
        <p><img class="full-image" src="https://firebasestorage.googleapis.com/v0/b/fm-j-league-pack.appspot.com/o/Image%20088.png?alt=media&token=b5503d17-3224-4ffe-9b75-2df11ed479b3" /></p>`
      },
    ]
  },
  {
    fmVersion: "FM2018",
    guideContent: [
      {
        title: "ガイド",
        content: `<p><span style="color: #d32f2f;"><strong>（MODなので最低限のWindows知識が必要です。でないとご自己責任を…）</strong></span></p>
        <p>FMではライセンスのせいで日本に関してはかなりの制限が設定されています。ゆえにこのパックを導入しても、クラブプロフィールなどは見れません、注意してください。</p>
        <p>まずはFM 2018をインストールすることですが、インストールが終わったら、まずはFM公式が用意した偽データを削除する必要があります。これを削除しないと、クラブの名前は変な名前のままです。</p>
        <p>インストールの場所によるが、デフォルトは<code>C:\\Program Files\\Steam\\steamapps\\common\\Football Manager 2018\\data\\db\\</code>を探してください。<br />または、ライブラリからFootball Manager 2018で右クリックし、プロパティを選択、「ローカルファイル」を選択、そして「ローカルファイルを閲覧」をクリックしてください。するとインストールフォルダが表示されますので、dataフォルダ→dbフォルダを探してください。</p>
        <p><img class="hatena-fotolife" title="f:id:karinchan:20180113120833p:plain" src="https://cdn-ak.f.st-hatena.com/images/fotolife/k/karinchan/20180113/20180113120833.png" alt="f:id:karinchan:20180113120833p:plain" /></p>
        <p><img class="hatena-fotolife" title="f:id:karinchan:20180113121413p:plain" src="https://cdn-ak.f.st-hatena.com/images/fotolife/k/karinchan/20180113/20180113121413.png" alt="f:id:karinchan:20180113121413p:plain" /></p>
        <p>そこでは1800や1801などのフォルダがありますが、バージョン別のデータですが、念のために以下のものを全部削除してください：</p>
        <div class="alert alert-info">
        <p>18**\\lnc\\greek\\のすべてファイル（そのlncが偽データです）</p>
        <p>18**\\lnc\\all\\のすべてファイル（そのlncが偽データです）</p>
        </div>
        <p>これで下準備は終わりました。（もしRealname fixを導入しなかったら、ここでRealname fixのファイルを入れるのをおすすめします。日本だけではなく、ドイツやブラジルなど、ライセンスの問題で偽データのが多いからです。どのRealname fixが良いか、それは別のことなのでここでは解説しません。）</p>
        <p>次はこのデータパックを適用することです。このデータパックはエディターデータなので、簡単に言えばエディターデータをエディターフォルダに移動すれば使えます。<br />エディターフォルダの場所もインストールの場所によるが、デフォルトは<code>C:\\Documents\\Sports Interactive\\Football Manager 2018\\editor data</code>の中だと思います。ゆえにfmfファイルをここに移動すれば使えます。</p>
        <p>するとゲームを起動し、そのままリーグ選択に移行すれば日本が表示される（リーグ構成がない場合は日本が表示さない、Jリーグをプレイできませんが、Jリーグ選手はそのまま反映される、ほかのリーグでもでJリーグ選手を買えます。まあ、選択したデータベースサイズ次第だが）。</p>
        <div class="alert alert-danger">
        <p><strong>Betaから1.0.0に移行について</strong></p>
        <p>1.0.0以降では、同梱されたリーグ構成ファイルの名前は変更されたため、「J League Ad2」を外してください。</p>
        </div>
        <p><img class="hatena-fotolife" title="f:id:karinchan:20180113122353p:plain" src="https://cdn-ak.f.st-hatena.com/images/fotolife/k/karinchan/20180113/20180113122353.png" alt="f:id:karinchan:20180113122353p:plain" /></p>
        <p><img class="hatena-fotolife" title="f:id:karinchan:20180113122344p:plain" src="https://cdn-ak.f.st-hatena.com/images/fotolife/k/karinchan/20180113/20180113122344.png" alt="f:id:karinchan:20180113122344p:plain" /></p>
        <p>そのままゲーム開始すると、Jリーグを確認すれば、おめでとう、導入は成功ですよ！</p>`
      }
    ]
  }
]