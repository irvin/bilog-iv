---
layout: "post.njk"
title: "Firefox 3.6 中修好的兩個 Mac 雪豹字型 Bug"
date: "2010-02-02T18:03:00.006Z"
source: "blogger"
original_url: "http://irvin.sto.tw/2010/02/firefox-36-mac-bug.html"
canonical_url: ""
permalink: "/2010/02/firefox-36-mac-bug.html"
tags: ["mozilla", "mac", "firefox", "blogger"]
excerpt: "隨著 Firefox 3.6 釋出，Mozilla 修好了兩個 Firefox 3.5 在 Mac OS X 10.6 中討厭的 bug： 第一個是「眼睛」bug，如同上圖所示，雪豹中的 Firefox 3.5，只要使用蘋果儷中黑字體，在任何網頁上遇到「睛」這個字，就會前後文疊在一起。原因是雪豹的 ATSUI 遇到本來就有問題的蘋果儷中黑字體，因此就爆炸了，"
---

<p>隨著 Firefox 3.6 釋出，Mozilla 修好了兩個 Firefox 3.5 在 Mac OS X 10.6 中討厭的 bug：</p>

<a href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiRPz9ooE_KKYhwbIuiN34yyzTDOv4jEjYrut3PQEBCqfHrqqMalx7zVWNOlrpsMiQJ7udJUzQB0F39SrP1o7gttxx7qdWISZ5x7UIlzItmc_l3lh-VpoXCdPEiMIYXcGpSdGdIHQ/s1600-h/a.png"><img border="0" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiRPz9ooE_KKYhwbIuiN34yyzTDOv4jEjYrut3PQEBCqfHrqqMalx7zVWNOlrpsMiQJ7udJUzQB0F39SrP1o7gttxx7qdWISZ5x7UIlzItmc_l3lh-VpoXCdPEiMIYXcGpSdGdIHQ/s400/a.png" width="500" /></a>

<p>第一個是「眼睛」bug，如同上圖所示，雪豹中的 Firefox 3.5，只要使用蘋果儷中黑字體，在任何網頁上遇到「睛」這個字，就會前後文疊在一起。原因是雪豹的 <a href="http://en.wikipedia.org/wiki/Apple_Type_Services_for_Unicode_Imaging">ATSUI</a> 遇到本來就有問題的蘋果儷中黑字體，因此就爆炸了，在&nbsp;<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=532346">Bug 532346</a> 中有更詳細的說明，如果想知道你的 Firefox 還有沒有這個問題，可以開啟 <a href="https://bug532346.bugzilla.mozilla.org/attachment.cgi?id=415587">測試頁</a> 看看。</p>

<p>經過測試發現，目前網址列、搜索列及網頁文字框中，還是不能正常打出「睛」（<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=543782">Bug 543782</a>），Firefox 3.5.7 也還沒解決文中顯示睛的問題。</p>

<p>據我觀察，似乎還有一些中文字也會引起這種狀況，但是目前還沒有辦法鎖定有哪幾個字，如果有朋友發現，希望能夠幫忙回報一下。</p>

<p>第二個修好的 bug 是 <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=532346">Bug 532346</a>，無法指定「黑體-繁」作為預設字型，也不能透過 CSS 使用它。雖然我不知道有誰會想要這麼做。這看起來像是個天諭，冥冥之中告訴大家 <a href="http://cocoa.zonble.net/tagged/Heiti_Tc">黑體-繁是個多糟糕的字體</a>，連火狐大萌神都不爽讓他上身，但是 Mozilla 的程式設計師們還是含淚把他處理好了。</p>

<p>發生的原因是蘋果在黑體繁這個字體中用了新的 encoding ID，我不知道這是啥，總之已經修好了，但是還是饒了小狐，不要這樣用吧！同樣的，可以開啟&nbsp;<a href="https://bug532349.bugzilla.mozilla.org/attachment.cgi?id=415612">這個測試頁</a> 測試看看。</p>

<p>Firefox 目前還有個跟中文等寬字有關的 <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=530419">Bug 530419</a>，有興趣的朋友可以繼續關注相關資訊。</p>
