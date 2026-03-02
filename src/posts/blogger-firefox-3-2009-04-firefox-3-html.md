---
layout: "post.njk"
title: "Firefox 3 日漸肥大的收藏庫減肥法"
date: "2009-04-29T12:16:00.019Z"
source: "blogger"
original_url: "http://irvin.sto.tw/2009/04/firefox-3.html"
canonical_url: ""
permalink: "/2009/04/firefox-3.html"
tags: ["mozilla", "分享", "瀏覽器", "firefox", "blogger"]
excerpt: "本文已更新，請看： Bilog II: Firefox 3 日漸肥大的收藏庫減肥法：最新版！ 只要用了 Firefox 3 幾個月，你一定會感覺到反應明顯遲鈍了起來，尤其是在開啟、關閉、跟檢視歷史紀錄等跟「收藏庫」有關的功能上。今天我們要透過簡單的幾個指令，幫 Firefox 3 日漸肥大的收藏庫減肥！ Firefox 3 會把你所有上過的網站、輸入過的網址"
---

<p><span style="font-weight:bold;">本文已更新，請看：<a href="http://irvin.sto.tw/2009/08/firefox-3.html">Bilog II: Firefox 3 日漸肥大的收藏庫減肥法：最新版！</a></span></p>

<p>只要用了 Firefox 3 幾個月，你一定會感覺到反應明顯遲鈍了起來，尤其是在開啟、關閉、跟檢視歷史紀錄等跟「收藏庫」有關的功能上。今天我們要透過簡單的幾個指令，幫 Firefox 3 日漸肥大的收藏庫減肥！</p>

<p>Firefox 3 會把你所有上過的網站、輸入過的網址通通一五一十的紀錄在 Profile 目錄中的 places.sqlite 資料庫檔案裡。</p>

<p>這個檔案的位置在個人 profiles 的目錄中，目錄名稱是「亂碼.default」。<br />
XP 在 C:\Documents and Settings\<user name>\Application Data\Mozilla\Firefox\Profiles\<br />
Vista 放在 C:\Users\<user name>\AppData\Roaming\Mozilla\Firefox\Profiles\<br />
Linux 在 ~/.mozilla/firefox/<br />
Mac 在 家目錄\資源庫\Application Support\Firefox\Profiles\</p>

<a href="http://www.flickr.com/photos/irvin/3485249967/" title="Flickr 上 Irvin Chen 的 清理Firefox 3肥大的places.sqlite 01"><img src="http://farm4.static.flickr.com/3333/3485249967_c85903d21c.jpg" width="500" height="281" alt="清理Firefox 3肥大的places.sqlite 01" /></a>

<div id="fullpost"><p>看看我的 places.sqlite，已經肥大到 414MB 了，而這不過是從去年 12 月底開始使用至今呢！最簡單的清理法就是直接把 places.sqlite 刪除，開啟 Firefox 時會自動重建這個檔案，但是瀏覽紀錄就全沒了。</p>

<a href="http://www.flickr.com/photos/irvin/3485249985/" title="Flickr 上 Irvin Chen 的 清理Firefox 3肥大的places.sqlite 02"><img src="http://farm4.static.flickr.com/3356/3485249985_84f4a47b95.jpg" width="500" height="312" alt="清理Firefox 3肥大的places.sqlite 02" /></a>

<p>從收藏庫查看，可以發現已經記錄了 4 萬筆網站。Firefox 預設最多會保留四萬個網站、90 ～ 180 天的瀏覽紀錄，雖然可以調整 about:config 的 browser.history_expire_sites、browser.history_expire_days、browser.history_expire_days_min 等三個參數，控制相關設定，但是降低了 expire_days 或降低 expire_sites 的上限，又會使 Awesome Bar 的威力下降。</p>

<p>因此，我要使用簡單的 sql 命令，清除 places.sqlite 檔案中無用的紀錄，並保留實用的部份。Windows 的使用者請先前往 <a href="http://www.sqlite.org/download.html">SQLite Download Page</a>，下載 Precompiled Binaries For Windows 中的 sqlite-3_6_13.zip，解壓縮至目錄中，而 Mac OS X 已經內建了 sqlite3。</p>

<p>請事先備份你的 places.sqlite 檔案，並小心服用。進行前請先把 Firefox 關閉，如果沒關，我也不知道會發生什麼事情！</p>
<p>以下指令請在 Firefox 3 的 Profile 目錄下，以命令列逐行執行。</p>

<pre><code>sqlite3 places.sqlite "DELETE FROM moz_historyvisits WHERE place_id IN (SELECT id FROM moz_places WHERE visit_count <=2 );"
sqlite3 places.sqlite "DELETE FROM moz_places WHERE (visit_count <=2 AND hidden <> 1 AND id NOT IN (SELECT place_id FROM moz_annos UNION SELECT fk FROM moz_bookmarks));"
sqlite3 places.sqlite "DELETE FROM moz_inputhistory WHERE place_id NOT IN (SELECT id FROM moz_places);"
sqlite3 places.sqlite "DELETE FROM moz_favicons WHERE id NOT IN (SELECT favicon_id FROM moz_places);"
</code></pre>

<p>上述指令的主要意義是，將 places.sqlite 內瀏覽次數小於 2 次的瀏覽紀錄刪除，保留常去（瀏覽 3 次以上）的網站，使 Awesome Bar 的威力不至於打折。</p>

<p>此時需要先打開 Firefox，再關閉 Firefox。確認完全關閉後再繼續進行下一步。</p>

<pre><code>sqlite3 places.sqlite "VACUUM;"
</code></pre>

<p><big>（2009/5/5 更新：請看本文的 <a href="http://irvin.sto.tw/2009/05/firefox-3-google-toolbar.html">續篇</a>，提供了更新的刪除指令）</big></p>

<p>完成之後，你的收藏庫就減肥完成啦。經過減肥之後，我的收藏庫居然從 414MB 降到只剩 40.2MB！</p>

<a href="http://www.flickr.com/photos/irvin/3485249999/" title="Flickr 上 Irvin Chen 的 清理Firefox 3肥大的places.sqlite 03"><img src="http://farm4.static.flickr.com/3647/3485249999_f16c65cfd4.jpg" width="500" height="270" alt="清理Firefox 3肥大的places.sqlite 03" /></a>

<p>再打開收藏庫看看，只剩下 2643 個項目。刪去了佔 9 成的那些不到兩次的瀏覽紀錄，成功的使 Firefox 3 回復該有的速度。</p>

<a href="http://www.flickr.com/photos/irvin/3486113338/" title="Flickr 上 Irvin Chen 的 清理Firefox 3肥大的places.sqlite 04"><img src="http://farm4.static.flickr.com/3540/3486113338_984d6b311c.jpg" width="500" height="342" alt="清理Firefox 3肥大的places.sqlite 04" /></a>

<p>感謝 <a href="http://twitter.com/yllan">@yllan</a> 及 <a href="http://twitter.com/softcup">@softcup</a> 的 <a href="http://www.plurk.com/p/qjs2k">分享</a>，這是今天研究一個下午的成果。</p>

<p>補充：很多朋友在問，這樣作跟使用 Firefox 內建的「清除隱私資料…」清除瀏覽紀錄有什麼不同？基本上的差別就是，清除隱私資料，會把所有的瀏覽紀錄清光光，我卻只想清除無用的那些紀錄，保留有用的部份。此外，清除隱私資料→清除瀏覽紀錄後，如果沒有做 sqlite vacuum 空間是不會釋出的（我也不知道會不會定期自動釋放）。</p>

<a href="http://www.flickr.com/photos/irvin/3488508127/" title="Flickr 上 Irvin Chen 的 places.sqlite大測試"><img src="http://farm4.static.flickr.com/3614/3488508127_423b17b0d6.jpg" width="500" height="240" alt="places.sqlite大測試" /></a>

<p>經過小小的測試（見上圖），上面的四個 places.sqlite 分別是以下操作所得：（原檔案大小是 372.2 MB）<br />
places.sqlite 1 Firefox 3 開啟→關閉→VACUUM  366.3MB<br />
places.sqlite 2 Firefox 3 開啟→清除隱私資料→VACUUM 428KB<br />
places.sqlite 3 Firefox 3.5b4 開啟→關閉→VACUUM 366.2MB<br />
places.sqlite 4 Firefox 3.5b4 開啟→關閉→清除隱私資料→VACUUM 168kb<br />
看來 Firefox 3.5 beta 4 對於 places.sqlite 的處理，似乎有比較乾淨一點。</p>

<p>除了瀏覽歷史外，places.sqlite 還存有各網站的 favicon 快取，Google Toolbar 或 Fastdial 之類擴充套件的資料等很多紀錄，所以沒辦法完全不要這個檔案。但是可以調整以下參數來控制 Firefox 3 對瀏覽歷史的保留動作。</p>

<pre><code>about:config
browser.history_expire_sites 瀏覽歷史中保留的網站數目，預設是 40000 個
browser.history_expire_days 瀏覽歷史的最長保留天數，預設是 180 天
browser.history_expire_days_min 瀏覽歷史的最短保留天數，預設是 90 天</code></pre>

<p>然後把 places.sqlite 刪掉（記得先備份）讓 Firefox 3 自動重建資料庫。</p></div>
