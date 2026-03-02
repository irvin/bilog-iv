---
layout: "post.njk"
title: "HD DVD金鑰破解事件與AACS保護機制"
date: "2007-05-05T11:27:00Z"
source: "blogger"
original_url: "http://irvin.sto.tw/2007/05/hd-dvdaacs.html"
canonical_url: ""
permalink: "/2007/05/hd-dvdaacs.html"
tags: ["網路文化", "資訊自由", "blogger"]
excerpt: "HD DVD process key 的事件 看來還有得發展，先來複習一下 HD DVD 的 AACS 加密，正好 電腦王2007年四月號 詳細介紹了 AACS。（P.138） 簡單的筆記如下： 播放 HD DVD 片的第一步是檢查 Device Key 是否在流出的黑名單中。 HD DVD 播放裝置（硬體的播放機與軟體的 Software 都包含在內）都有"
---

<p><a href="http://worker.bluecircus.net/archives/2007/05/web20digghd_dvd.html">HD DVD process key 的事件</a> 看來還有得發展，先來複習一下 HD DVD 的 AACS 加密，正好 <a href="http://www.books.com.tw/exep/prod/magazine/mag_retail.php?item=R030009359">電腦王2007年四月號</a> 詳細介紹了 AACS。（P.138）</p>

<p>簡單的筆記如下：</p>

<p>播放 HD DVD 片的第一步是檢查 Device Key 是否在流出的黑名單中。</p>

<p>HD DVD 播放裝置（硬體的播放機與軟體的 Software 都包含在內）都有不同的 Device Key，而黑名單紀錄在 HD DVD 片裡。因此如果有特定裝置的 Device Key 被破解（例如二月底到三月初被破解的 WinDVD 8 與 PowerDVD），新上市的影片即可將流出的 Device Key 加入黑名單。如果 Device Key 沒有問題，光碟就送出 Processing Key。</p>

<p>第二步是算出 Media Key。</p>

<p>透過第一步得到的 Processing Key 與光碟上加密過的 C 值，可以算出每部電影不同的的 Media Key。</p><div id="fullpost">

<p>第三步是取得 Volume Unique Key。</p>

<p>播放裝置透過特別的機制，可以讀出光碟的 Volume ID。Volume ID 無法透過製作映像檔等方式複製，因此 HD DVD 無法直接對烤出一模一樣的片子。以 Volume ID，結合第二步的 Media Key，即可算出 Volume Unique Key。</p>
<p>第四步是取得 Title Key。</p>

<p>使用第三步的 Volume Unique Key，可以解出光碟上每個檔案的 Title Key。HD DVD 影片上每個檔案都透過不同的 Title Key 加密，而 Volume Unique Key 可以解開所有檔案的 Title Key，取得真正的影片資料。</p>

<p>這次的所流出的 Processing Key，是黑名單中沒有資料的 Key；只要新出的 HD DVD 片中黑名單隨便加入一筆資料，這次的 Processing Key 就失效了。其實這個 Key 在二月初就被 arnezami 破解了，只是透過這幾天的 Digg 事件，才引起軒然大波。</p>

<p>因此，最後跟前文完全不相關的結論是：09-f9-11-02-9d-74-e3-5b-d8-41-56-c5-63-56-88-c0。大家都來備份，真是鄉民滿世界。任何的商業媒體加密都是無意義的，抓走了一個駭客，還有千千萬萬個。Key 再多，總會有人破解出來。畢竟，你要怎麼對付成千上萬個 <a href="http://www.google.com/search?q=hd+dvd+key+t-shirt">把 Key 穿在身上</a> 的鄉民呢？</p>

<p>就像是付費音樂下載的 DRM 一樣，總有一天會被破解，不如徹底的拿掉，反而還利於消費者。在高畫質光碟這個例子中，拿掉 AACS，最直接的影響就是降低媒體業、軟體業與播放機的成本，讓使用者可以以更低的價格買到 HD DVD 與播放機，賣出去的片子不一定會比較少。</p></div>
