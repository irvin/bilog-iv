---
layout: "post.njk"
title: "Firewire 外接硬碟串接速度測試"
date: "2010-01-13T12:06:00.007Z"
source: "blogger"
original_url: "http://irvin.sto.tw/2010/01/firewire.html"
canonical_url: ""
permalink: "/2010/01/firewire.html"
tags: ["Apple", "gadget", "mac", "blogger"]
excerpt: "最近趁特價，買了個 ICY DOCK 的 Firewire 800 硬碟外接盒，這系列（MB559）的外接盒，先前我早已使用一顆 Firewire 400 的外接盒近兩年，也蠻滿意的，因此跟廠商洽詢了團購活動。今天 appleseed 的 這則噗 ，提到了一個有趣的問題： 1394硬碟不是可以串接使用嗎？那如果FW800和FW400串接在一起會怎樣？各走各的"
---

<a href="http://www.flickr.com/photos/irvin/4269458466/" title="Flickr 上 Irvin Chen 的 MBP Firewire 測試 - 2"><img alt="MBP Firewire 測試 - 2" height="375" src="/assets/images/farm5.static.flickr.com/fd1a1b2fd3a3871e.jpg" width="500" /></a>

<p>最近趁特價，買了個 ICY DOCK 的 Firewire 800 硬碟外接盒，這系列（MB559）的外接盒，先前我早已使用一顆 Firewire 400 的外接盒近兩年，也蠻滿意的，因此跟廠商洽詢了團購活動。今天 appleseed 的 <a href="http://www.plurk.com/p/3c2xyo">這則噗</a>，提到了一個有趣的問題：</p>

<blockquote>
1394硬碟不是可以串接使用嗎？那如果FW800和FW400串接在一起會怎樣？各走各的速度？還是全部降速成400？
</blockquote>

<p>這個問題實在很有趣，按常理來想，理想上的狀況中，串接 FW800 及 FW400 的硬碟時，應該會各自用各自的速度運作，但是實際上是這樣的狀況嗎？</p>

<p>總歸來說，在 Mac 上使用 Firewire 介面，外接兩個以上的硬碟時，會產生以下兩個問題：<br />
<ol>
<li>MBP 同時連接 Firewire 400 及 800 外接硬碟時，會不會互相干擾？</li>
<li>Firewire 400 及 800 外接盒串接時，傳輸速度會不會受影響？</li>
</ol></p><br />

<!-- more -->

<a href="http://www.flickr.com/photos/irvin/4269457472/" title="Flickr 上 Irvin Chen 的 MBP Firewire 測試 - 1"><img src="/assets/images/farm5.static.flickr.com/a5dd11e0908d8963.jpg" width="375" height="500" alt="MBP Firewire 測試 - 1" /></a>

<p>就讓我們來實際測試一下吧！本次測試所使用的配備如下：<br />
<ul>
<li>MacBook Pro 2.4GHz (15" Early 2008，MacBookPro4,1）<br />
Mac OS X 10.6.2 with 64-bit Kernel, WDC WD5000BEVT 500GB</li>
<li>AJA system test 6.0.1, File size: 2.0GB, Video Frame Size: 720x480 8-bit </li>
<li>ICY DOCK MB559UEB-1SB Firewire 800 外接盒（黑）</li>
<li>ICY DOCK MB559UEA-1S Firewire 400 外接盒（白）</li>
<li>Seagate Barracuda 7200.10 500GB 硬碟</li>
<li>Hitachi HDT721010SLA360 1IB 硬碟</li>
<li>Macally PHR-250CC Firewire 400 2.5" 外接盒 + 忘了牌子的 60G IDE HD</li>
</ul></p>

<a href="http://www.flickr.com/photos/irvin/4269462458/" title="Flickr 上 Irvin Chen 的 MBP Firewire 測試 - 6"><img src="/assets/images/farm5.static.flickr.com/37cb8577a3afd984.jpg" width="500" height="375" alt="MBP Firewire 測試 - 6" /></a><br />

<p>以下測試皆採單硬碟不連續測試兩次，採計平均值。首先先測試各硬碟的速度：</p>

<p><ul>
<li>Firewire 400: 兩顆硬碟在 FW 400 外接盒的表現差不多，讀寫平均為 W: 33.2 MB/s R: 39.0 MB/s</li>
<li>Firewire 800: FW800 外接盒上，讀寫各別為 W: 56.8 MB/s R: 77.3 MB/s (Seagate) 及 W: 58.0 MB/s R: 81.6 MB/s (Hitachi)，後者在讀取的速度上平均多了 4MB/s</li>
<li>MacBook Pro: MBP 內接的 WD 500GB 硬碟速度為 W: 62.5 R: 63.3</li>
<li>FW400 2.5" Macally IDE 外接盒: 速度為 W: 22.7 R: 29.8</li>
</ul></p>

<p>在此可發現，透過 Firewire 800 外接 3.5" 硬碟，在讀取的表現上，已經比 MBP 內接的 2.5" 硬碟高出約 15MB/s 至 20MB/s 的速度；寫入的部份則僅差了約 5MB/s 左右。</p>

<br /><p><b>實驗一：MBP 同時連接 FW400 及 FW800 兩顆外接盒</b></p>

<p>Firewire 400 外接硬碟的速度表現，當同時連接在 FW800 的硬碟電源開啟，有掛載、怠工（硬碟讀寫燈恆亮，無閃爍）的狀態下，讀寫速度為 W: 32.9 R: 38.3，較 FW800 的硬碟電源關閉時無明顯差別。</p>

<p>當 Firewire 800 外接硬碟忙碌時（自 MBP 內接硬碟複製一個 15.65GB 12293 個檔案的資料夾），FW400 的外接硬碟速度分別降為 W: 18.9 R: 22.4，大約各較原本低 15MB/s。</p>

<p>Firewire 800 外接硬碟的速度測試上，當同時連接在 FW400 的硬碟電源開啟，有掛載、怠工的狀態下，讀寫速度為 W: 67.0 R: 70.2，較 FW400 外接硬碟電源關閉時，讀取低了約 10 MB/s，寫入反倒也快了 10MB/s，這是比較奇怪的狀況。</p>

<p>兩顆硬碟個別的表現上，Seagate 這顆硬碟受到的影響較大，當 FW400 外接硬碟開啟時，讀取的速度降低了約 13MB/s、寫入增加了約 7MB/s。Hitachi 硬碟讀取速度僅降低了 5MB/s，寫入則增加了約 12MB/s。（此部份個人推測應該是受到 MBP 內接硬碟的速度影響，真正的原因可能要了解 AJA 這套軟體的設計才能了解。）</p>

<p>當連接在 FW400 的硬碟忙碌時，Firewire 800 外接硬碟寫入與讀取的速度為 W: 44.3 R: 47.7，分別各掉了約 30MB/s 左右，但還是較 FW400 外接硬碟平均速度快約 10MB/s。</p>

<br /><p><b>實驗二：MBP 透過 FW400 連接 2.5" 外接硬碟，再串接 FW400 3.5" 外接硬碟</b></p>

<a href="http://www.flickr.com/photos/irvin/4269463380/" title="Flickr 上 Irvin Chen 的 MBP Firewire 測試 - 7"><img src="/assets/images/farm5.static.flickr.com/04c5304236007572.jpg" width="375" height="500" alt="MBP Firewire 測試 - 7" /></a>

<p>在 Firewire 400 串接兩顆硬碟時，外接硬碟的速度是否會互相影響，也是本次測試的主要問題之一。</p>

<p>測試結果顯示，當 2.5" 外接硬碟怠工時（有掛載、無動作的狀況），末多的 3.5" 的外接硬碟速度為 W: 32.6 R: 38.1，些微各降低了不到 1MB/s，可說是在誤差範圍內。當 2.5" 外接硬碟忙碌時，速度降低成 W: 26.9 R: 25.6，讀取受到的影響約 15MB/s、寫入的速度降低約 6~7MB/s。</p>

<br /><p><b>實驗三：MBP 透過 FW800 連接 3.5" 外接硬碟，再串接 FW400 3.5" 外接硬碟</b></p>

<a href="http://www.flickr.com/photos/irvin/4268723117/" title="Flickr 上 Irvin Chen 的 MBP Firewire 測試 - 9"><img src="/assets/images/farm5.static.flickr.com/62a6ebe9a5c03749.jpg" width="500" height="375" alt="MBP Firewire 測試 - 9" /></a>

<p>第三個測試中，我們將兩個不同速度的外接硬碟串接在一起。為了進行這個測試，連台南最多線材的南一電子，也沒有任何 FW800 的產品，找遍七八家店，終於在 Studio A 買到一條 moshi 的 FW800-FW400 轉接線。</p>

<a href="http://www.flickr.com/photos/irvin/4268722167/" title="Flickr 上 Irvin Chen 的 MBP Firewire 測試 - 8"><img src="/assets/images/farm3.static.flickr.com/eedca5a0768c105c.jpg" width="375" height="500" alt="MBP Firewire 測試 - 8" /></a>

<p>測試結果顯示，當末端的 FW400 外接硬碟掛載怠工時，中間的 FW800 硬碟速度為 W: 70.8 MB/s R: 77.3 MB/s，表現不受 FW400 硬碟影響。當 Firewire 400 外接硬碟忙碌時，FW800 外接硬碟速度為 W: 46.0 R: 50.0，寫入速度降低約 25MB/s、讀取速度降低約 30MB/s，但整體速度仍然超出 FW400 外接硬碟的表現，也與 FW400 外接硬碟直接連接在 MBP 上並忙碌時差不多。</p>

<p>當中間的 FW800 外接硬碟怠工時，末端的 FW400 硬碟速度為 W: 32.5 R: 38.1 MB/s，與單獨使用差不多。當 Firewire 800 外接硬碟忙碌時，FW400 硬碟速度為 W: 17.8 R: 21.0，讀寫速度降低約 15MB/s，表現與非串接、FW800 硬碟忙碌時沒有很大的差別。</p><br />

<a href="http://picasaweb.google.com/lh/photo/nTdnCnFg-LgUw0-D0G6n6A?feat=embedwebsite"><img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgIpOUNmH_ycU0VlITPWXQKUSN_7KfjsQjU_U9j5HnV3rzNg2SVJYMnb3-A3ErOI-I5DeCL5_cO82mS4iOlTTgA_jYZIQdC7xwDEqjdsFM-mWwxWk-tlALQRf5uZUQmOxfzGPWdmQ/" /></a>
<a href="http://picasaweb.google.com/lh/photo/xExFCJuXbQZnw-eGdPekMA?feat=embedwebsite"><img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3dqQr8pT1mDJYN_bliSDE6AH8ym1LbBzB-mTIOorMjvORe7SSFNXMu0rJp0GafGBDeaNIaWYww_FgBzy0VJq36kZQw8ZN50jHeORU8d32fzRBSSCYHpWPYSM_W-Uyc8BNFZOJXw/" /></a>

<p>另外，從以上兩張傳輸速度圖中可以得知，當 FW800-FW400 外接硬碟串接使用，FW400 硬碟忙碌時，FW800 硬碟的速度的確會受到影響。但當 FW400 硬碟工作結束後，FW800 硬碟的速度就會恢復正常速度。</p>

<br /><p><b>實驗四：MBP 透過 FW400 連接 FW400 3.5" 外接硬碟，再串接 FW800 3.5" 外接硬碟</b></p>

<p>當我們把速度最快的 FW800 外接硬碟串接在怠工的 FW400 外接硬碟後方，並透過 FW400 連接 MBP 時，FW 800 外接硬碟的讀寫速度為 W: 35.8 R: 38.5，降到與 FW400 外接硬碟相同的水準。而當 FW400 工作時，速度更降到 W: 20.8 R: 22.4 MB/s。</p>

<br /><p><b>結論：</b></p>

<p>經過以上的測試，我們可以這麼說：Firewire 這個傳輸介面的確很穩定。在 MBP 上同時連接 FW800 及 FW400 外接硬碟時，當兩顆硬碟同時忙碌時，速度會互相干擾，但 FW800 還是具備較 FW400 高的性能，不會降為一致的速度；而當其中一顆硬碟怠工時，另一顆硬碟的速度是不受影響的。</p>

<p>至於串接與並聯兩種連接方法，此次測試結果中顯示，兩種表現都一樣。FW800 及 FW400 兩種速度的外接硬碟同時使用時，串連或並聯兩種狀態下，當 FW400 硬碟忙碌時，FW800 所表現出的傳輸速度也相同。</p>

<p>appleseed 的 <a href="http://www.plurk.com/p/3c2xyo">問題</a> 的解答是，FW800 和 FW400 串接在一起，當同時傳輸時，的確會互相影響，各有各的速度，不會全部降速成相同的速度。如果不是同時傳輸時，速度則不受影響。</p><br />

<a href="http://www.flickr.com/photos/irvin/4268717361/" title="Flickr 上 Irvin Chen 的 MBP Firewire 測試 - 3"><img src="/assets/images/farm5.static.flickr.com/efd6fbab0d0c4883.jpg" width="500" height="375" alt="MBP Firewire 測試 - 3" /></a>

<p>因此結論就是，串接、並聯，隨便你要怎麼接，Firewire 外接硬碟的確能有其穩定的表現。如果你使用的是蘋果電腦，有 Firewire 連接埠的機種，也有外接硬碟需求，趁近來這波 FW 介面的硬碟外接盒降價出清潮，買個外接盒來用用，應該能有超值的感受。<p>

<p>此次測試過程的 AJA 軟體抓圖 <a href="http://picasaweb.google.com/irvinfly/MBPFirewire#">都在此</a>，所得到的數值製表則 <a href="http://spreadsheets.google.com/ccc?key=0AtBU22m9p7kqdFlvZTdYZDB6OEpWOEx5N2FiQWdpMlE&hl=en">放在這邊</a> 提供參考。</p>
