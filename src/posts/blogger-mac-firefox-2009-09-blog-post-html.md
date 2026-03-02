---
layout: "post.njk"
title: "如何改善 Mac 版 Firefox 的安裝機制"
date: "2009-09-29T16:29:00.015Z"
source: "blogger"
original_url: "http://irvin.sto.tw/2009/09/blog-post.html"
canonical_url: ""
permalink: "/2009/09/blog-post.html"
tags: ["mozilla", "mac", "firefox", "blogger"]
excerpt: "八月時，Mozilla 的 Metrics team 曾針對 Windows 使用者在安裝 Firefox 時的困難進行了相關研究，並且改善了 詢問使用者設定預設瀏覽器 的機制。因而本文作者 Alexander Limi 也針對 Mac 上 Firefox 安裝的使用者經驗提出了一些意見，成為兩篇文章： Improving the Mac installer"
---

<p>八月時，Mozilla 的 <a href="http://blog.mozilla.com/metrics/" title="Blog of Metrics">Metrics team</a> 曾針對 Windows 使用者在安裝 Firefox 時的困難進行了相關研究，並且改善了 <a href="http://blog.mozilla.com/metrics/2009/08/03/more-changes-coming-to-the-firefox-installer/" title="More Changes Coming to the Firefox Installer">詢問使用者設定預設瀏覽器</a> 的機制。因而本文作者 Alexander Limi 也針對 Mac 上 Firefox 安裝的使用者經驗提出了一些意見，成為兩篇文章：<a href="http://limi.net/articles/improving-the-mac-installer-for-firefox/" id="ol0l" title="Improving the Mac installer for Firefox">Improving the Mac installer for Firefox</a>、<a href="http://limi.net/articles/firefox-mac-installation-experience-revisited/" id="jjnl" title="Firefox Mac installation experience, revisited">Firefox Mac installation experience, revisited</a>。</p>
<p>在此我（Irvin）取得作者授權後，將其內容結合並省略部份內容，簡單翻譯。</p>
<!-- more -->
<h4>蘋果錯了嗎？</h4>
<p>Mac OS X 作業系統有很多特點可談，其中一項是應用程式的安裝。為了讓事情更簡單明瞭，Mac 使用了以下的安裝程式機制，而不使用特別的安裝程式，反而對於剛轉換到 Mac 平台的新手造成困擾。Mac 上典型的應用程式安裝程序是這樣進行的：</p>
<ol>
<li>下載應用程式的磁碟映像檔（dmg 檔）</li>
<li>雙點開啟磁碟映像檔（類似掛載虛擬光碟）</li>
<li>將應用程式從磁碟映像中拖放到 OS X 的應用程式資料夾，部份磁碟映像檔內會提供應用程式資料夾的捷徑</li>
<li>選擇性動作：將程式從應用程式資料夾拖拉到 Dock 以加入其中（Dock 是 Mac 的程式快速啟動列）</li>
</ol>
<p>有經驗的 Mac 使用者都很熟悉這種安裝的方式，還有移除程式時不需要移除程式的優點（直接將程式從應用程式資料夾丟到垃圾桶即完成移除動作），但是很少第一次接觸 Mac 的使用者會知道該怎麼作。Firefox 的下載頁採取了大部分 Mac 應用程式的解決方式：下載磁碟映像檔動作開始的同時，透過網頁向使用者說明該怎麼作。</p>
<img height="241" src="http://limi.net/media/firefox-three-steps.png/image_large" width="420" />
<p>問題是，在檔案下載完成後，很多人都已經把這個頁面關掉了；此外很多使用者不看此類說明。更糟的是，因為想要使用熟悉的瀏覽器，Firefox 常常是 Mac 的新使用者所下載安裝的第一個程式。</p>
<p>以下是作者從親友處發現到的常見問題：</p>
<h5><i>直接</i>把應用程式拖曳到 Dock 上</h5>
<p>這樣做會在 Dock 上建立磁碟映像檔內應用程式的捷徑，因此每次他們啟動 Firefox 時，都會自動掛載磁碟映像檔，導致 Firefox 的啟動變得非常慢，成為糟糕的使用者經驗。</p>
<h5><i>每次都開啟磁碟映像檔來使用 Firefox</i></h5>
<p>他們誤以為啟動 Firefox 需要每次打開磁碟映像檔，這是一個合理的誤解，因為初次下載執行時就需要這麼做，因此啟動 Firefox 成為一種瑣碎、需要許多步驟的事情。</p>
<p>有趣的是，蘋果的確<b>有</b>注意到這個問題，並且在你試著開啟磁碟映像中的應用程式時，跳出了一個警告視窗：</p>
<img src="http://docs.google.com/File?id=dhm4tqmm_9fc7hpcgp_b" style="height: 250px; width: 468px;" />
<p>問題在於，訊息中並沒有真正告訴你<b>為什麼</b>直接開啟磁碟映像檔中的程式是有問題的，也沒有說明要怎麼解決問題，而只是告訴你「你就要這樣做了喔，這還是從危險的網路上下載的程式」呢。</p>
<h4>該如何改善 Mac 上的安裝經驗？</h4>
<p>我們想要找出簡單的解決方案，同時保留 OS X 可以將應用程式存在任何地方的特色。有哪些問題是需要解決的？</p>
<ul>
<li>提供協助給不懂 Mac 標準安裝程序的使用者</li>
<li>同時保留使用者喜愛的拖—拉安裝法</li>
<li>在安裝過程中提供設定為預設瀏覽器的選項</li>
</ul>
<p>在「<a href="http://limi.net/articles/improving-the-mac-installer-for-firefox/" id="ww37" title="Improving the Mac installer for Firefox">Improving the Mac installer for Firefox</a>」一文最後，作者建議使用 Mac 標準的安裝程式（如下圖），在 Safari 下載 Firefox 完後，自動掛載磁碟映像檔並啟動安裝程式；至於有經驗的 Mac 使用者，他們應該能夠取消安裝程式，並且手動拖曳 Firefox 執行檔到他們想要儲存的地方。</p>
<a href="http://limi.net/media/plone-installer.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="312" src="http://limi.net/media/plone-installer.png" width="420" /></a>
<h4>再度提昇 Mac 版 Firefox 的安裝體驗</h4>
<p>在上文發表十天後，作者接收到很多的回應。許多讀者建議作者參考 <a href="http://delicious-monster.com/">Delicious Library</a> 這套軟體的作法：在使用者首次啟動下載好的應用程式時，提供「移動程式到應用程式資料夾」的功能。<a class="name" href="http://www.potionfactory.com/thehitlist/">The Hit List</a> 的作者 Andy Kim 在其撰寫的「<a href="http://www.potionfactory.com/node/251" id="j658" title="Move to Applications Folder? | Potion Factory">Move to Applications Folder? | Potion Factory</a>」文中對同樣的作法有更詳細說明。更讚的是，他甚至把移動應用程式的原始碼 <a href="http://github.com/potionfactory/LetsMove/" id="z:al" title="公開">公開</a> 至公共領域，提供所有 Mac 的開發者使用。</p>
<p>簡單的說，這段程式會偵測使用者是否是從磁碟映像檔中或下載資料夾中啟動程式，如果是的話就提供移動應用程式至正確位置的選項：</p>
<img height="196" src="http://limi.net/media/applications-move.png" width="420" />
<p>身為 Mac 的老用戶，作者強烈同意，除非必要時不使用安裝程式。同時作者也認同提供移動應用程式的功能能夠在不使用安裝程式的同時，達到我們希望能便利 Mac 新手的目的。</p>
<h4>我們的心聲是，把安裝程式丟了吧！</h4>
<p>提供一個具有下載完成後自動啟動功能的磁碟映像檔（internet-enabled DMG），比起提供 zip 壓縮檔來講有兩個好處：在使用者使用 Safari 下載後，磁碟映像檔會自動掛載、留下應用程式、並且將映像檔自身丟入垃圾桶。且 zip 檔在解壓縮時， CRC 錯誤檢查機制比起使用磁碟映像檔來說有點討厭。</p>
<h4>全新的 Firefox 安裝體驗</h4>
<p>經過以上的考量之後，我們相信 OS X 版 Firefox 的安裝經驗應該如同以下敘述：</p>
<ol>
<li>開始下載 Firefox</li>
<li>當下載完成，Safari 會將磁碟映像檔（DMG 檔）自動解開，並丟掉映像檔，留下 Firefox 圖示在下載資料夾。</li>
<li>當你雙點 Firefox 啟動時，它提供你以下選項，理所當然都應該是選擇性的動作：</li>
<ul>
<li>將 Firefox 移動至應用程式資料夾</li>
<li>在 Dock 中新增 Firefox 圖示</li>
<li>設定 Firefox 為預設瀏覽器</li>
</ul>
</ol>
<p>我們相信這是最好的作法，對於進階使用者來說極具彈性、也能簡單協助初次接觸 Mac 的新人。Firefox 開發團隊正忙於努力讓 3.6 如期釋出，所以如果你是有經驗的 Mac 的開發者，也認同本文的觀點，可以 <a href="http://groups.google.com/group/mozilla.dev.apps.firefox/topics">在此協助</a> 實現這個點子，<a href="http://github.com/potionfactory/LetsMove/">必要的程式碼</a> 甚至已經在您手邊了！</p>
