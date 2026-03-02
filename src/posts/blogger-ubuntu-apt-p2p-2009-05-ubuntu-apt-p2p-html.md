---
layout: "post.njk"
title: "Ubuntu 學習筆記：使用 apt-p2p 來更新系統（續）"
date: "2009-04-30T18:36:00.007Z"
source: "blogger"
original_url: "http://irvin.sto.tw/2009/05/ubuntu-apt-p2p.html"
canonical_url: ""
permalink: "/2009/05/ubuntu-apt-p2p.html"
tags: ["ubuntu", "分享", "blogger"]
excerpt: "剛剛發現 apt-p2p 除了在安裝套件之外，還是會不斷的上傳檔案給其他 peers，因此來翻看看設定檔，調校一下。 apt-p2p 的設定檔在 /etc/apt-p2p/apt-p2p.conf，以下是部份重要設定： # 預設的 Port PORT = 9977 UPLOAD_LIMIT = 10 #設定上傳速度限制，單位是KB，預設是 0 無限制 MIN"
---

<p>剛剛發現 apt-p2p 除了在安裝套件之外，還是會不斷的上傳檔案給其他 peers，因此來翻看看設定檔，調校一下。</p>

<p>apt-p2p 的設定檔在 /etc/apt-p2p/apt-p2p.conf，以下是部份重要設定：</p>

<pre><code># 預設的 Port
PORT = 9977
UPLOAD_LIMIT = 10  #設定上傳速度限制，單位是KB，預設是 0 無限制
MIN_DOWNLOAD_PEERS = 3  #如果某個檔案的擁有者少於 3 人，就會同時從伺服器下載以增加速度
REMOTE_STATS = no  #開不開放遠端使用者看到你的統計資訊頁面，預設是 yes，網址在 http://你的ip:9977
</code></pre>

<p>接著重新啟動 apt-p2p 服務：</p>

<pre><code>sudo /etc/init.d/apt-p2p restart
</code></pre>

<p>如果要把 apt-p2p 移除的話，請按照下述步驟進行。</p>

<p>1. 移除 apt-p2p 套件：</p>
<pre><code>sudo apt-get remove apt-p2p
sudo apt-get autoremove
</code></pre>

<p>2. 把 souece.list 還原：</p>
<pre><code>sudo gedit /etc/apt/sources.list

# 將每行的 localhost:9977/ 刪除
# deb http://localhost:9977/archive.ubuntu.com/ubuntu/ jaunty main universe restricted multiverse
deb http://larchive.ubuntu.com/ubuntu/ jaunty main universe restricted multiverse
# deb http://localhost:9977/security.ubuntu.com/ubuntu/ jaunty-security universe main multiverse restricted
deb http://security.ubuntu.com/ubuntu/ jaunty-security universe main multiverse restricted
……以下省略、依此類推……
</code></pre>

<p>3. 最後刪除佔著硬碟空間的相關快取：</p>
<pre><code>sudo rm -r /var/cache/apt-p2p/cache/
sudo apt-get update</code></pre>
