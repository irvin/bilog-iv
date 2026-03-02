---
layout: "post.njk"
title: "Firefox 3 日漸肥大的收藏庫減肥法：最新版！"
date: "2009-08-22T11:23:00.007Z"
source: "blogger"
original_url: "http://irvin.sto.tw/2009/08/firefox-3.html"
canonical_url: ""
permalink: "/2009/08/firefox-3.html"
tags: ["mozilla", "分享", "瀏覽器", "firefox", "blogger"]
excerpt: "更新：經由 littlebtc 的協助，我們已經將減肥程序寫成套件，各位朋友可以測試看看： PlacesCleaner 收藏庫清潔工 很多人在使用 Firefox 3 幾個月後，都覺到反應明顯遲鈍了起來，尤其是在開啟、關閉、搜索、檢視歷史紀錄等跟「收藏庫」有關的功能上。Firefox 3 會把所有上過的網站、輸入過的網址通通一五一十的紀錄在 Profile"
---

<p>更新：經由 littlebtc 的協助，我們已經將減肥程序寫成套件，各位朋友可以測試看看：   <a href="/2009/08/firefox-placescleaner.html">PlacesCleaner 收藏庫清潔工</a></p>

<p>很多人在使用 Firefox 3 幾個月後，都覺到反應明顯遲鈍了起來，尤其是在開啟、關閉、搜索、檢視歷史紀錄等跟「收藏庫」有關的功能上。Firefox 3 會把所有上過的網站、輸入過的網址通通一五一十的紀錄在 Profile 目錄中的 places.sqlite 資料庫檔案裡，在此我們要透過簡單的幾個步驟，幫 Firefox 3 日漸肥大的收藏庫減肥！</p>

<p>本文是 <a href="http://mozlinks-zh.blogspot.com/2009/05/firefox-3.html">Mozilla Links 正體中文版: Firefox 3 日漸肥大的收藏庫：減肥法</a> 的更新。因為從 <a href="http://mozillalinks.org/wp/2009/08/vacuum-firefox-databases-for-better-performance-now-with-no-restart/">Vacuum Firefox databases for better performance, now with no restart - Mozilla Links</a> 中得知新的技巧，因此現在可以更簡單的進行收藏庫減肥啦！</p>

<div id="fullpost"><a href="http://www.flickr.com/photos/irvin/3845267524/" title="Flickr 上 Irvin Chen 的 places.sqlite 減肥 - 1"><img src="/assets/images/farm4.static.flickr.com/cb709f125976ba32.jpg" width="500" height="388" alt="places.sqlite 減肥 - 1" /></a>

<p>我再度把半年前肥大的 places.sqlite 檔案找出來，看看檔案大小居然有 414MB！由於有的網友 places.sqlite 很小，有的卻很大，收藏庫檔案增大的狀況每人不一，非常奇怪，<a href="http://mozlinks-zh.blogspot.com/2009/05/firefox-3.html">上次</a> 發現，某個版本的 Google Toolbar 5 會把螢幕抓圖儲存在 places.sqlite 中，目前這個 bug 已經解決。但是我還是使用先前肥大的收藏庫檔案來測試以下的三步驟減肥新方法。</p>

<p>以下是減肥三步驟：</p>

<a href="http://www.flickr.com/photos/irvin/3845267526/" title="Flickr 上 Irvin Chen 的 places.sqlite 減肥 - 2"><img src="/assets/images/farm4.static.flickr.com/fad56583b8805754.jpg" width="500" height="364" alt="places.sqlite 減肥 - 2" /></a>

<p>一、首先選取工具→錯誤主控台</p>

<a href="http://www.flickr.com/photos/irvin/3845267528/" title="Flickr 上 Irvin Chen 的 places.sqlite 減肥 - 3"><img src="/assets/images/farm3.static.flickr.com/691e1be01f6e659d.png" width="483" height="384" alt="places.sqlite 減肥 - 3" /></a>

<p>二、將錯誤主控台打開之後，會看到一個「程式碼」的文字框。將以下的命令一行一次、依序複製貼上到「程式碼」中，然後按下「執行」。</p>

<pre><code>Components.classes["@mozilla.org/browser/nav-history-service;1"].getService(Components.interfaces.nsPIPlacesDatabase).DBConnection.executeSimpleSQL("DELETE FROM moz_historyvisits WHERE place_id IN (SELECT id FROM moz_places WHERE visit_count <=2 );");
Components.classes["@mozilla.org/browser/nav-history-service;1"].getService(Components.interfaces.nsPIPlacesDatabase).DBConnection.executeSimpleSQL("DELETE FROM moz_places WHERE (visit_count <=2 AND hidden <> 1 AND id NOT IN (SELECT place_id FROM moz_annos UNION SELECT fk FROM moz_bookmarks));");
Components.classes["@mozilla.org/browser/nav-history-service;1"].getService(Components.interfaces.nsPIPlacesDatabase).DBConnection.executeSimpleSQL("DELETE FROM moz_inputhistory WHERE place_id NOT IN (SELECT id FROM moz_places);");
Components.classes["@mozilla.org/browser/nav-history-service;1"].getService(Components.interfaces.nsPIPlacesDatabase).DBConnection.executeSimpleSQL("DELETE FROM moz_favicons WHERE id NOT IN (SELECT favicon_id FROM moz_places);");
Components.classes["@mozilla.org/browser/nav-history-service;1"].getService(Components.interfaces.nsPIPlacesDatabase).DBConnection.executeSimpleSQL("DELETE FROM moz_annos WHERE anno_attribute_id IN (SELECT id FROM moz_anno_attributes WHERE name = 'google-toolbar/thumbnail-score' OR name = 'google-toolbar/thumbnail');");
Components.classes["@mozilla.org/browser/nav-history-service;1"].getService(Components.interfaces.nsPIPlacesDatabase).DBConnection.executeSimpleSQL("VACUUM");
</code></pre>

<a href="http://www.flickr.com/photos/irvin/3845267536/" title="Flickr 上 Irvin Chen 的 places.sqlite 減肥 - 4"><img src="/assets/images/farm4.static.flickr.com/f3c5bf8b94f1361f.png" width="483" height="384" alt="places.sqlite 減肥 - 4" /></a>

<p>三、將六行命令都依序貼上、執行之後，就完成了！</p>

<p>上述指令的作用是，將 places.sqlite 內瀏覽次數小於 2 次的紀錄刪除，但保留常去的網站（瀏覽三次以上），使 Awesome Bar 的威力不至於打折。此外也鎖定了 Google Toolbar 的記錄來刪除。</p>

<a href="http://www.flickr.com/photos/irvin/3845267542/" title="Flickr 上 Irvin Chen 的 places.sqlite 減肥 - 5"><img src="/assets/images/farm4.static.flickr.com/514a667d2117877a.jpg" width="500" height="388" alt="places.sqlite 減肥 - 5" /></a>

<p>經過減肥之後，我的收藏庫居然從 414MB 降到只剩 1.8MB！透過這簡單五步驟，刪去了佔 9 成的那些不到兩次的瀏覽紀錄，成功的使 Firefox 3 回復該有的速度。</p>

<p>很多朋友問到，這樣作跟使用 Firefox 內建的「清除隱私資料…」有什麼不同？最主要的差別是：清除隱私資料，會把所有的瀏覽紀錄清光光，我卻只想清除無用的那些紀錄，保留有用的部份。</p></div>
