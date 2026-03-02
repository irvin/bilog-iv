---
layout: "post.njk"
title: "Bloglines 的 Drop-down console 終端機介面"
date: "2009-04-02T08:29:00.008Z"
source: "blogger"
original_url: "http://irvin.sto.tw/2009/04/bloglines-drop-down-console.html"
canonical_url: ""
permalink: "/2009/04/bloglines-drop-down-console.html"
tags: ["網站", "有趣", "blogger"]
excerpt: "昨天在使用 Bloglines beta 這個 RSS Reader 看 Blog 時，忽然跳出了上面這個 Drop-down console 終端機的畫面，一時還以為 Bloglines 跟我們一樣在玩 愚人節活動 。 今天持續試了一陣子，找出了打開 Console 的方法啦！原來就是老按鍵：「`」（1 左邊那個按鍵）。 Welcome to _ _ _"
---

<a href="http://www.flickr.com/photos/irvin/3406702052/" title="Flickr 上 Irvin Chen 的 Bloglines console">
<img src="/assets/images/farm4.static.flickr.com/8600ee16c0773f1f.jpg" width="500" height="380" alt="Bloglines console" />
</a>

<p>昨天在使用 <a href="http://beta.bloglines.com/">Bloglines beta</a> 這個 RSS Reader 看 Blog 時，忽然跳出了上面這個 Drop-down console 終端機的畫面，一時還以為 Bloglines 跟我們一樣在玩 <a href="http://www.moztw.org/events/ie8/">愚人節活動</a>。</p>

<p>今天持續試了一陣子，找出了打開 Console 的方法啦！原來就是老按鍵：「`」（1 左邊那個按鍵）。</p>

<pre><code>
Welcome to 
 _     _             _ _                 
| |__ | | ___   __ _| (_)_ __   ___  ___ 
| '_ \| |/ _ \ / _` | | | '_ \ / _ \/ __|
| |_) | | (_) | (_| | | | | | |  __/\__ 
|_.__/|_|\___/ \__, |_|_|_| |_|\___||___/
               |___/    v3.0      (beta)

Proudly Made On Earth!
</pre></code>

<p>（如果使用 RSS Reader 讀本文時，看到上面的 bloglines banner 顯示有問題，請打開文章頁面來看）</p>

<div id="fullpost">

<a href="http://www.flickr.com/photos/irvin/3406702182/" title="Flickr 上 Irvin Chen 的 Bloglines console: ls"><img src="/assets/images/farm4.static.flickr.com/42a69b319c9272f4.jpg" width="500" height="380" alt="Bloglines console: ls" /></a>

<p>在 Console 下試著輸入一些指令試試。</p>

<p>ls 會顯示目前 My Library 內的 RSS 目錄，可以使用 cd 進入目錄，此時 ls 會顯示目錄內的 RSS 列表，中文也可正常顯示跟輸入喔！</p>

<pre><code>
/# cd Friends
/Friends# ls
-rwxr--r-- be pure at heart
-rwxr--r-- Blog: timdream
-rwxr--r-- Life is like a movie, write your own ending. Keep believing, keep pretending.
-rwxr--r-- Toomore Blog
-rwxr--r-- Yuren's 餅舖
-rwxr--r-- 愛麗絲の鑰
-rwxr--r-- 柏強的城市探險記
</pre></code>

<a href="http://www.flickr.com/photos/irvin/3405890623/" title="Flickr 上 Irvin Chen 的 Bloglines console: cat"><img src="/assets/images/farm4.static.flickr.com/94b9bfe0d8e871c8.jpg" width="500" height="380" alt="Bloglines console: cat" /></a>

<p>cat 後面接任何一個目錄名或 RSS 名稱，則是會一次跑出所有未讀的 RSS…… 似乎沒辦法只看某個 RSS，而且名稱中如果有空格時就找不到了（"\"也無效）。</p>

<p>顯示內容時沒有 | more 可以用，但是有捲軸可以上下拉，內容的超連結也都可以點。</p>

<p>Console 的顏色可以透過 set theme 設定，show themes 可以看到全部可用的選項：</p>

<pre><code>
/# show themes
themes are:
black
old
white
burnt_umber
/# set theme old
theme set to old.
</pre></code>

<a href="http://www.flickr.com/photos/irvin/3405890721/" title="Flickr 上 Irvin Chen 的 Bloglines console: set theme &amp; text"><img src="/assets/images/farm4.static.flickr.com/5a8f705a55d907e2.jpg" width="500" height="380" alt="Bloglines console: set theme &amp; text" /></a>

<p>改成綠色是不是比較保護眼睛？</p>

<a href="http://www.flickr.com/photos/irvin/3406702364/" title="Flickr 上 Irvin Chen 的 Bloglines console: zombie"><img src="/assets/images/farm4.static.flickr.com/c99fc5cdfe234e69.jpg" width="500" height="380" alt="Bloglines console: zombie" /></a>

<p>也可以直接使用 set text 跟 set background 來設定文字跟背景顏色，黃字黑底很醒目……</p>

<pre><code>
/# set
set usage:
set hotkey action
set theme theme_name
set text text_color
set background background_color
/# set text red
/# set background black</p>
</pre></code>

<p>zombie 命令則會顯示出很久沒更新的 RSS。</p>

<pre><code>
/# zombie
Lost on the Starmap: sub:45656299, last updated 105 days ago</p>
</pre></code>

<p>help 會列出所有可用的指令，不過有一些不知道有什麼效果，試不出來，也不知道還有什麼隱藏命令在。</p>

<pre><code>
/# help
commands:
rewind
cat
cd
clear
enable
disable
help
info
ls
login
pwd
set
show
zombie
type help command_name for specific help
</pre></code>

<p>可惜 md、mv 都不能用，也沒有 Tab 的自動完成，不然這樣整理 RSS 分類就方便啦。要離開 Console 時只要再按一下「`」，就可以關掉了。</p>

<p>繼續查了一下，原來這個 Console 從 2007 年就出現了，而且還在陸續增加新命令啊！不知道會不會有哪天，真能讓讓使用者 Telnet 或 SSH 來看 RSS Feeds 勒。</p></div>
