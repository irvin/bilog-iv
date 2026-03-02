---
layout: "post.njk"
title: "從 Firefox 近來發現的有害套件談起"
date: "2010-02-08T22:08:00.005Z"
source: "blogger"
original_url: "http://irvin.sto.tw/2010/02/firefox.html"
canonical_url: ""
permalink: "/2010/02/firefox.html"
tags: ["mozilla", "moztw", "firefox", "blogger"]
excerpt: "（2/10 更新： Sothink Web Video Downloader 已確認是假警報 ，未含木馬並重新上架） 稍早不久前（2/2 日），Mozilla 從 Firefox 附加元件網站中，移除了內含 Windows 木馬的擴充套件「Master Filer」。從此事件中，或許有些人會覺得疑慮，Mozilla Firefox 是不是已經不再安全了？我們"
---

<p>（2/10 更新：<a href="http://blog.mozilla.com/addons/2010/02/09/update-on-the-amo-security-issue/">Sothink Web Video Downloader 已確認是假警報</a>，未含木馬並重新上架）</p>

<p>稍早不久前（2/2 日），Mozilla 從 Firefox 附加元件網站中，移除了內含 Windows 木馬的擴充套件「Master Filer」。從此事件中，或許有些人會覺得疑慮，Mozilla Firefox 是不是已經不再安全了？我們以較為安全的理由來推廣 Firefox，是不是已經失去其說服力？更甚之：Firefox 的安全神話是否已經破滅？</p>

<b>Firefox 本身的安全性</b>

<p>對我而言，答案是否定的。相較於市面上最普遍的 IE 而言，Firefox 的安全性仍然遠遠超出其之外，也不輸給其餘網路瀏覽器。我的兩點理由如下：</p>
<!-- more -->
<p>一、較高的漏洞修補率：上個月駭客透過 IE 漏洞入侵 Google 及其餘公司，導致&nbsp;<a href="http://mozlinks-zh.blogspot.com/2010/01/ie.html">多國政府呼籲改用它種瀏覽器</a> 的事件至今仍未落幕；而 Firefox 在 Secunia 公司弱點資料庫的修補率，包含 <a href="http://secunia.com/advisories/product/19089/">Firefox 3.0</a>、<a href="http://secunia.com/advisories/product/25800/">3.5</a>、<a href="http://secunia.com/advisories/product/28698/">3.6</a> 皆為 100%（<a href="http://secunia.com/advisories/product/26745/">Opera 10</a> 與 <a href="http://secunia.com/advisories/product/28713/">Google Chrome 4</a> 亦同 ）在此同時，<a href="http://secunia.com/advisories/product/11/">IE6</a>、<a href="http://secunia.com/advisories/product/12366/">IE7</a>、<a href="http://secunia.com/advisories/product/21625/">IE8</a> 則為 83%、74%、56%。微軟已承認，此次事件中被使用的 IE 漏洞早在去年九月已發現，修補時程卻排到今年二月，此等疏忽令人無法相信。</p>

<p>二、原始碼受大眾檢視：Firefox 的開放原始碼開發模式，使得程式中每一行指令都能公開在陽光底下讓人檢視，漏洞與弱點更容易被發現，沒有一絲容許作惡指令的空間存在。相較於封閉原始碼的 IE 及 Opera 而言，我更相信其安全性。</p>

<b>套件的安全性 </b>

<p>Firefox 最大的特色是透過擴充套件，提供各式各樣五花八門的新功能，如此的自由同時也伴隨著極大的風險而來。如果套件作者心存惡意，不但有能力把 Firefox 搞壞、偷得瀏覽器中你的私人資訊、甚至還能直接破壞電腦中的其餘檔案。</p>

<p>這同時也是使用其餘瀏覽器時，最令人擔憂的地方。試想，要是你用 IE 上網（KKman、PCMan 等使用 IE 核心的瀏覽器亦同），到某個你常去的網站，此時跳出「你必須更新瀏覽器元件，才能繼續瀏覽本網站：確定」，你會直接按下確定安裝嗎？這個訊息是真的嗎？其中被偽造的風險有多大？</p>

<p>在套件所帶來的這個問題上，Mozilla 透過了附加元件網站的驗證與人工的審核，來替大家把關。</p>

<p>當套件作者上傳新的套件或者新版本時，Firefox 附加元件網站會自動進行 12 項測試，包含了一般驗證、在地化測試與兩組安全性測試，包含：不安全 JavaScript 測試、不安全設定測試、遠端 JavaScript 測試、常見函式庫 Checksum 測試、標記程式碼片段、Geolocation 檢查、Conduit 工具列檢查等安全性方面的測試。如果套件中夾帶了已知的有害程式碼、或者因為作者的疏忽導致程式有一些已知的不安全問題，在這一步就會被阻擋下來。（測試過程如下圖，<a href="https://addons.mozilla.org/zh-TW/firefox/pages/validation">詳細的說明在此</a>）</p>

<a href="http://www.flickr.com/photos/irvin/4341645466/" title="Flickr 上 Irvin Chen 的 Firefox 附加元件網站：上傳自動測試"><img alt="Firefox 附加元件網站：上傳自動測試" height="500" src="/assets/images/farm5.static.flickr.com/c217f76e3addad83.jpg" width="456" /></a>

<p>當上傳的檔案通過這些自動測試後，才能完成上傳動作，成為元件網站的「實驗中套件」。您在安裝這些實驗中套件時，都需要先勾選「讓我安裝這個實驗中的套件」，意義即表示：雖然這個套件已經通過自動測試，但是仍未經過人工檢查程式碼；你最好確定套件作者足以信任。</p>

<p>此次被抓到的兩個惡意套件，從 Google 頁面存檔看來（<a href="http://www.flickr.com/photos/irvin/4340781071/">一</a>、<a href="http://www.flickr.com/photos/irvin/4340780927/">二</a>），就都還是實驗中套件。雖然它們躲過了自動檢查程式，而上到 Firefox 元件網站，但這個檢查程序的弱點，附加元件網站已經完成修正，提昇掃描的能力，也針對網站上的所有套件重新進行了完整測試。</p>

<p>在 Firefox 3.5 新增的附加元件管理員中，可以直接搜索套件並安裝，但無法搜索到實驗中套件，理由也一樣，能避免使用者不慎安裝到可能有問題的套件。</p>

<a href="http://www.flickr.com/photos/irvin/4341037657/" title="Flickr 上 Irvin Chen 的 Firefox 附加元件網站：套件送交核准"><img alt="Firefox 附加元件網站：套件送交核准" height="470" src="/assets/images/farm3.static.flickr.com/1527448348003af2.jpg" width="500" /></a>

<p>當「實驗中套件」要提昇為正式套件時，套件作者必需先提出申請，接著會有審核者人工檢查其程式碼，確認是否符合公開的條件，包含：已經實驗一段時間、有得到使用者的意見回應、程式碼中無惡意或間諜程式、套件功能不違法、不涉及色情……等（<a href="https://addons.mozilla.org/zh-TW/developers/docs/policies/reviews">詳細審核項目說明</a>），當審核者確定套件的確是無害且安全無虞的，才會批准其申請，而這個過程每次上傳新版時，都要重新進行一遍。</p>

<p>我個人寫的套件 <a href="https://addons.mozilla.org/zh-TW/firefox/addon/13860">PlacesCleaner 收藏庫清潔工</a>，第一版從申請到成為正式套件大概花了兩個月，最近幾個更新也都需時一兩個禮拜，每次的審核者都有所不同，也同時確保了審核的品質。</p>

<p>因此，我敢如此說明：如果你從 <a href="https://addons.mozilla.org/zh-TW/">Firefox 附加元件網站</a> 或附加元件管理員中安裝（非實驗中）套件，都是安全無虞的，也不會有遇到此次這種惡意套件的機會。除非你是從其他網站（論壇、套件作者個人網站）手動下載並安裝套件，才會有危險性。我認為這種從非官方網站安裝套件的動作，能免則免！</p>

<b>瀏覽器元件安全性</b>

<p>Firefox 3.6 中新增了一項功能，在更新時會檢查常見的瀏覽器元件（Plugin）版本，包含了 Flash、QuickTime、Silverlight、Java……等常見元件。如果所使用的版本過舊，檢查頁會顯示出來，建議你下載更新。這些 Plugin 為非 Mozilla 的其他廠商所寫，雖能增添 Firefox 的影音支援等功能，但也常常包含了不少安全性漏洞與錯誤，有時也會造成 Firefox 的當機等問題。例如 <a href="http://secunia.com/advisories/product/11901/?task=advisories">Flash 9</a> 釋出至今三年多，也已修正了數十個漏洞，因此隨時保持 Plugin 更新，也是維持上網安全重要的一環。（<a href="http://www.mozilla.com/plugincheck/">前往 Firefox Plugin Check 頁面</a>）</p>

<b>結論</b>

<p>針對此次 Firefox 有害套件事件，我所提出的建議是：使用 Firefox 本身的附加元件管理員，或者在 <a href="https://addons.mozilla.org/">Firefox 附加元件網站</a> 安裝套件；除非您信任該作者，否則請不要輕易安裝實驗中套件；除了 Firefox 附加元件網站及管理員外，不要透過任何其餘網站手動下載並安裝套件（包含 MozTW 的論壇），如此即可享受各式各樣 Firefox&nbsp;套件的功能，同時將擴充套件伴隨的風險降到最低。</p>

<p>下載與安裝 Firefox 時，請認明 <a href="http://www.mozilla.com/zh-TW/">Mozilla 官方網站</a>、<a href="http://moztw.org/">MozTW</a> 或 <a href="http://gfx.tw/">抓火狐網站</a>。除非確認安全，請避免使用各式非官方版的 Firefox。雖然我們推薦大家升級到最新的 <a href="http://moztw.org/firefox/">Firefox 3.6</a>，Mozilla 仍會持續提供 Firefox 3.5 及 3.0 的安全性更新。Firefox 3.0 以下版本已經進入停止支援狀態，請儘速升級到 3.0 以上版本。</p>

<p>使用者上網瀏覽時的安全性，是 Mozilla 最重視的一環（另一環是開放標準）。每次 Firefox 的更新都會針對安全性進行提昇：Firefox 2.0 的詐騙網站偵測、3.0 的「海關男」網站識別資訊、3.5 的隱私瀏覽模式、3.6 的過期 Plugin 偵測等，在在都強化了安全性並提昇隱私保護。</p>

<p>針對 Firefox 本身的漏洞與弱點，Mozilla 公司與全球的程式設計師，都會在發現的第一時間儘速修補、並釋出安全性更新。因此我敢以 Mozilla 全球社群的一份子、<a href="http://moztw.org/">MozTW</a> (Mozilla Taiwan) 成員、Firefox 擁護者及開源軟體愛好者的身份向您保證：使用 Firefox 上網的安全性，仍是毋庸置疑的！</p>

<p>請安心使用，並祝瀏覽愉快。</p>

<b>延伸閱讀：</b>

<p><a href="http://blog.mozilla.com/addons/2010/02/04/please-read-security-issue-on-amo/">Security Issue on AMO « Mozilla Add-ons Blog</a> <br />
<a href="http://www.zdnet.com.tw/news/web/0,2000085679,20144186,00.htm">ZDNet Taiwan - Mozilla 示警 移除有毒外掛</a><br />
<a href="http://www.ithome.com.tw/itadm/article.php?c=59517">iThome online : 不肖人士利用 Firefox 散播廣告程式及木馬</a><br />
<a href="http://mozlinks-zh.blogspot.com/2010/01/ie.html">Mozilla Links 正體中文版: 世界各國相繼建議別用危險的 IE，你換了嗎？！</a> <br />
<a href="http://www.techbang.com.tw/?p=35500">T客邦 | </a> <a href="http://www.techbang.com.tw/?p=35500">IE有漏洞事件讓 Firefox 和 Opera 下載量大增</a> </p>
