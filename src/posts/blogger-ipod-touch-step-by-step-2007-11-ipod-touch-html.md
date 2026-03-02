---
layout: "post.njk"
title: "教學：圖解 iPod touch 破解 Step-by-step"
date: "2007-11-03T10:48:00Z"
source: "blogger"
original_url: "http://irvin.sto.tw/2007/11/ipod-touch.html"
canonical_url: ""
permalink: "/2007/11/ipod-touch.html"
tags: ["Apple", "教學", "ipod", "blogger"]
excerpt: "本文內容已更新，請參閱新版： 教學：圖解 iPod touch 破解 Step-by-step (1.1.3版) 接續著上一篇「分享蘋果電腦上的無線網路給 iPod touch & iPhone 使用」，這一篇要來圖解 iPod touch 破解。這個方法是目前我知道最快的方法，半小時之內就可以完工。本方法適用於 touch 版本 1.1.1，版本不同請不要"
---

<p><span style="font-weight:bold;">本文內容已更新，請參閱新版：<a href="/2008/02/ipod-touch-step-by-step-113.html">教學：圖解 iPod touch 破解 Step-by-step (1.1.3版)</a></span></p>

<p>接續著上一篇「分享蘋果電腦上的無線網路給 iPod touch & iPhone 使用」，這一篇要來圖解 iPod touch 破解。這個方法是目前我知道最快的方法，半小時之內就可以完工。本方法適用於 touch 版本 1.1.1，版本不同請不要輕舉妄動照著作喔…</p>

<p>首先還是先把 touch 恢復到出廠狀態。這是我的建議啦，以免發生什麼意外。<br /><br />
<a href="http://www.flickr.com/photos/60061298@N00/1839437908"><img src="/assets/images/live.staticflickr.com/9100906511a600a1.jpg" /></a><a href="http://www.flickr.com/photos/60061298@N00/1839438904"><img src="/assets/images/live.staticflickr.com/009332360be357f5.jpg" /></a></p>
<div id="fullpost">
<p>先連上網路嘍，打開 Safari 確定連線正常。<br /><br />
<a href="http://www.flickr.com/photos/60061298@N00/1838613479"><img src="/assets/images/live.staticflickr.com/e9dccacd72d31a97.jpg" /></a></p>

<p>輸入破解的網址：http://www.slovix.com/touchfree/jb/<br />
GO之後，safari 會自動跳出。<br /><br />
<a href="http://www.flickr.com/photos/60061298@N00/1839440978"><img src="/assets/images/live.staticflickr.com/fcd2b014bb85f2a8.jpg" /></a></p>

<p>接著就開始自動破解的動作啦。<br /><br />
<a href="http://www.flickr.com/photos/60061298@N00/1838615535"><img src="/assets/images/live.staticflickr.com/386dbd64848a4646.jpg" /></a></p>

<p>等跑完，重開機之後破解保護的步驟就完成啦！<br />
破解會自動安裝好 Installer 跟 SSH 兩個程式。<br /><br />
<a href="http://www.flickr.com/photos/60061298@N00/1839442814"><img src="/assets/images/live.staticflickr.com/be171e7d2e9e5b38.jpg" /></a></p>

<p>先執行 Installer，安裝 Sources 裡的 Community Sources。接著離開 Installer 後會自動重開，再安裝 BSD Subsystem、Term-vt100。<br /><br />
<a href="http://www.flickr.com/photos/60061298@N00/1838621181"><img src="/assets/images/live.staticflickr.com/b1991c4841bfac08.jpg" /></a></p>

<p>這是安裝完的樣子。<br /><br />
<a href="http://www.flickr.com/photos/60061298@N00/1838617727"><img src="/assets/images/live.staticflickr.com/aee66c8d51f333ba.jpg" /></a></p>

<p>開啟 Term-vt100 終端機，打入 passwd，更改 touch 的 root 密碼，才不會被人入侵。密碼需要輸入兩次，不會顯示在螢幕上，這就是以後 FTP 或 SSH 進 touch 的密碼。<br /><br />
<a href="http://www.flickr.com/photos/60061298@N00/1838619279"><img src="/assets/images/live.staticflickr.com/1c895e739d54a509.jpg" /></a></p>

<p>進 SSH，將 OpenSSH 打開。<br /><br />
<a href="http://www.flickr.com/photos/60061298@N00/1839446230"><img src="/assets/images/live.staticflickr.com/cf2604c0103044d6.jpg" /></a></p>

<p>打開 SSH 之後，就可以用 FTP 軟體連線進 touch 裝程式啦！帳號是 root，密碼是剛剛設定的密碼。<br />
（這裡以 mac 上的 Cyberduck 為例，只要支援 SFTP 的 FTP 軟體都可以用）<br /><br />
<a href="http://www.flickr.com/photos/60061298@N00/1839448466"><img src="/assets/images/live.staticflickr.com/6602c0119cf3a9c0.jpg" /></a></p>

<p>把 iPhone 軟體（Mail、Maps、Stock、Weather、Notes）丟進 touch 的 /Applications 目錄裡，Maps 的 GMM.framework 放進 /System/Library/Frameworks，跟 Mail 有關的 MobileMailSettings.bundle  放進 /System/Library/PreferenceBundles 中。<br />
（程式在驢子搜索「iPhone touch」就有得抓）<br /><br />
<a href="http://www.flickr.com/photos/60061298@N00/1839444596"><img src="/assets/images/live.staticflickr.com/fe5461c32779e6cd.jpg" /></a></p>

<p>用 FTP 軟體修改這五個程式的執行權限，改成 755。<br />
鴨子的作法是把這五個目錄選起來，按右鍵選簡介，將權限改成跟下圖一樣，勾選套用於內含所有的檔案夾與檔案。<br /><br />
<a href="http://www.flickr.com/photos/60061298@N00/1838621715"><img src="/assets/images/live.staticflickr.com/5a9124386fa8668b.jpg" /></a></p>

<p>把 touch 長按住上方睡覺鍵，關機重開後，這就是我們的成果啦！<br />
記得要把 SSH 關掉喔，免得路上的人都可以用無線網路亂搞自己的 touch。<br /><br />
<a href="http://www.flickr.com/photos/60061298@N00/1838620563"><img src="/assets/images/live.staticflickr.com/1fd1b706f9b11c3e.jpg" /></a></p>
</div>
