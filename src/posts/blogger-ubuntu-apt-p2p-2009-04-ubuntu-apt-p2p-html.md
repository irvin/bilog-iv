---
layout: "post.njk"
title: "Ubuntu 學習筆記：使用 apt-p2p 來更新系統"
date: "2009-04-30T06:38:00.009Z"
source: "blogger"
original_url: "http://irvin.sto.tw/2009/04/ubuntu-apt-p2p.html"
canonical_url: ""
permalink: "/2009/04/ubuntu-apt-p2p.html"
tags: ["ubuntu", "分享", "blogger"]
excerpt: "APT 是一套 Debian 所發展出來的套件管理系統，Ubuntu Linux 也使用它來處理程式跟系統上的安裝、更新的工作。平常我們在 Ubuntu 上執行更新管理員或 Synaptic 套件管理程式，背後就是透過 APT 在努力工作。 apt-p2p 能透過 p2p 的原理，從其他 apt-p2p 的使用者（peers）那邊取得需要的套件，有效減輕 U"
---

<p>APT 是一套 Debian 所發展出來的套件管理系統，Ubuntu Linux 也使用它來處理程式跟系統上的安裝、更新的工作。平常我們在 Ubuntu 上執行更新管理員或 Synaptic 套件管理程式，背後就是透過 APT 在努力工作。</p>

<p><a href="http://www.camrdale.org/apt-p2p/">apt-p2p</a> 能透過 p2p 的原理，從其他 apt-p2p 的使用者（peers）那邊取得需要的套件，有效減輕 Ubuntu 更新伺服器的負擔，理論上也會更快。如果沒有其他人有你需要的套件，apt-p2p 會自動回到原本的套件來源處下載。</p>

<p>因為學校的網路近來連接國外的速度頗慢，導致每次 Ubuntu 系統更新都要花上個幾十分鐘、甚至幾小時，因此今天來嘗試看看使用 apt-p2p 更新</p>

<div id="fullpost"><p>參考原文：<a href="http://blog.chenhow.net/os/linux/ubuntu/using-apt-p2p-for-faster-upgrades-from-intrepid-to-jaunty/">Using apt-p2p For Faster Upgrades From Intrepid to Jaunty | blog.chenhow.net</a></p>

<p>1. 首先先安裝 apt-p2p</p>
<pre><code>sudo apt-get install apt-p2p
</code></pre>

<p>2. 接著先備份軟體來源設定檔（source.list）</p>
<pre><code>sudo cp /etc/apt/sources.list /etc/apt/sources.list-apt-p2p-backup
</code></pre>

<p>3. 編輯 souece.list 檔案，將每行的「http://」替換為「http://localhost:9977/」</p>
<pre><code>sudo gedit /etc/apt/sources.list

deb http://localhost:9977/archive.ubuntu.com/ubuntu/ jaunty main universe restricted multiverse
deb http://localhost:9977/security.ubuntu.com/ubuntu/ jaunty-security universe main multiverse restricted
deb http://localhost:9977/ftp.twaren.net/ubuntu jaunty main universe restricted multiverse
……以下省略、依此類推……
</code></pre>

<p>4. 更新套件資訊</p>
<pre><code>sudo apt-get update
</code></pre>

<p>此時已大功告成。好奇的話，可以使用瀏覽器開啟 <a href="http://localhost:9977/">http://localhost:9977/</a> 頁面，看看 apt-p2p 的運作狀況。我的使用經驗是，有超過 98% 的流量會透過 apt-p2p 從其他 peers 那邊抓，只剩一點點會回到各個 Repository 那邊去下載。</p></div>
