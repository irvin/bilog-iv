---
layout: "post.njk"
title: "EeePC 901 安裝 Easy Peasy 1.0 筆記"
date: "2009-03-06T14:33:00.006Z"
source: "blogger"
original_url: "http://irvin.sto.tw/2009/03/eeepc-901-easy-peasy-10.html"
canonical_url: ""
permalink: "/2009/03/eeepc-901-easy-peasy-10.html"
tags: ["ubuntu", "eeepc", "blogger"]
excerpt: "前幾天把 EeePC 901 拿去華碩皇家俱樂部更換上蓋，從黑色換成綠色。原先的 EeePC 901 黑色真的就是全黑一片，感覺很厚重；換成綠色的上蓋之後，顏色鮮艷多了，膜內漾印的效果也很漂亮。算是對原本買錯的顏色比較滿意了。 但是，沒想到的是，螢幕上蓋背板跟轉軸是模組化的設計，因此轉軸處變成一黑一白的熊貓風…… 我對熊貓沒什麼偏好，因此就買了深灰色的卡典西"
---

<p>前幾天把 EeePC 901 拿去華碩皇家俱樂部更換上蓋，從黑色換成綠色。原先的 EeePC 901 黑色真的就是全黑一片，感覺很厚重；換成綠色的上蓋之後，顏色鮮艷多了，膜內漾印的效果也很漂亮。算是對原本買錯的顏色比較滿意了。</p>

<a href="http://www.flickr.com/photos/irvin/3331513488/" title="Flickr 上 Irvin Chen 的 剛換殼 - 1"><img src="/assets/images/farm4.static.flickr.com/17e4f2986361e159.jpg" width="500" height="375" alt="剛換殼 - 1" /></a>

<p>但是，沒想到的是，螢幕上蓋背板跟轉軸是模組化的設計，因此轉軸處變成一黑一白的熊貓風……</p>

<div id="fullpost">

<a href="http://www.flickr.com/photos/irvin/3330684045/" title="Flickr 上 Irvin Chen 的 剛換殼 - 3"><img src="/assets/images/farm4.static.flickr.com/97119098491a429e.jpg" width="500" height="375" alt="剛換殼 - 3" /></a>

<p>我對熊貓沒什麼偏好，因此就買了深灰色的卡典西德來加工了一下……這下好多了。</p>

<a href="http://www.flickr.com/photos/irvin/3330685413/" title="Flickr 上 Irvin Chen 的 裝貼完轉軸 - 2"><img src="/assets/images/farm4.static.flickr.com/d1276315b252bfcf.jpg" width="500" height="375" alt="裝貼完轉軸 - 2" /></a>

<p>既然外觀都刷新了，剛好今天又看到 <a href="http://www.wmfield.idv.tw/646">把Ubuntu 8.10裝進Eee PC 1000 | 西瓜田裡的牛</a> 這篇文章，解開了我一大疑問：EeePC 的 SSD 到底應該怎麼分割，怎麼裝比較不會傷到 SSD。既然如此就來重裝了！</p>

<p>一樣是安裝為 EeePC 特別改造的 Ubuntu 8.10 的 <a href="http://www.geteasypeasy.com/">Easy Peasy 1.0</a>，首先先在桌機上裝 <a href="http://unetbootin.sourceforge.net/">UNetbootin</a> 製作可開機的 Easy Peasy Live USB，然後用 USB 在 901 上開機開始安裝。</p>

<p>分割硬碟時，把 SSD 的 4G SLC 切為 /，剩下的 16G MLC 切成 /home，不切 SWAP 安裝。用 USB 安裝很快，從開始分割到裝完重新開機只需要 15 分鐘。</p>

<p>剛裝完的 Easy Peasy 1.0 有幾個問題，首先是每次開機都會出現安裝程式。在偏好設定→作業階段中把 Ubiquity 拿掉，就可以解決這個問題。</p>

<p>重開機後第一步是更新語言套件，然後是 4x 個系統更新。更新語言套件時我還遇到沒有出現中文支援的問題，在系統自動更新後，用 Synaptic 再次把所有可更新的套件更新掉，再去管理→語言支援，中文就出現可以安裝了。</p>

<p>安裝完中文支援後，隨 Ubuntu 8.10 的 OpenOffice 2.4 會消失，這是另一個 Easy Peasy 1.0 的 bug，就趁機把 OenOffice 3.0 裝好。使用 Synaptic，先搜索 OpenOffice，將現有殘存的檔案移除。設定→套件庫→第三方軟體，加入 OpenOffice PPA Repository：
<blockquote>deb http://ppa.launchpad.net/openoffice-pkgs/ppa/ubuntu intrepid main</blockquote>
將 <a href="http://keyserver.ubuntu.com:11371/pks/lookup?op=get&search=0x60D11217247D1CFF">金鑰</a> 另存新檔，在軟體來源→認證中匯入金鑰，關閉後按下重新載入，搜索 openoffice.org 安裝，如此就可以把 OpenOffice 3 裝好。</p>

<p>下一步是將系統的暫存檔改到 Ramdisk 去，以降低日常使用對 SSD 的耗損。根據 <a href="http://www.ubuntu-eee.com/wiki/index.php5?title=How_to:_Reduce_Disk_Writes_to_Prolong_the_Life_of_your_Flash_Drive">How to: Reduce Disk Writes to Prolong the Life of your Flash Drive - Easy Peasy wiki</a> 的教學，在終端機中使用「sudo gedit /etc/fstab」，將以下兩行加到檔案最後。
<blockquote>tmpfs /tmp tmpfs defaults,noatime,mode=1777 0 0
tmpfs /var/tmp tmpfs defaults,noatime,mode=1777 0 0
</blockquote></p>

<p>再將 Firefox 的快取也設定到 /tmp 去：在網址列輸入「about:config」，發誓會小心後，修改「browser.cache.disk.parent_directory」值為「/tmp」即可（如無此值就直接按右鍵新增）。</p>

<p>Easy Peasy 1.0 安裝完後預設的背景非常醜，去偏好設定→外觀設定→背景，選一個比較能看的。順便幫字型調整的大一點（個人習慣至少調整到10號以上）。</p>

<p>如此系統方面即暫告完成啦，最後就用 <a href="http://lazybuntu.openfoundry.org/">Lazybuntu</a> 來把一些常用程式裝起來吧。</p>
</div>
