---
layout: "post.njk"
title: "再探NuWeb"
date: "2006-12-28T18:01:00Z"
source: "blogger"
original_url: "http://irvin.sto.tw/2006/12/nuweb.html"
canonical_url: ""
permalink: "/2006/12/nuweb.html"
tags: ["網站", "網路", "blogger"]
excerpt: "我承認NuWeb（打死我也不叫他Web 3.0）看起來是有一點有趣，所以繼續花了點時間 Google相關資訊 。 原來NUWeb的開發者（中正大學吳昇老師）是 GAIS 的開發者，（在我第一次接觸網路時—1995左右，就使用過GAIS）。NuWeb在11月中舉辦過座談會。 根據〈 吳昇老師的 web3.0 〉與〈 NuWeb 現況 〉所述，NuWeb分成Se"
---

我承認NuWeb（打死我也不叫他Web 3.0）看起來是有一點有趣，所以繼續花了點時間<a href="http://www.google.com.tw/search?q=NUWeb&amp;hl=zh-TW">Google相關資訊</a>。<br />
<br />
原來NUWeb的開發者（中正大學吳昇老師）是<a href="http://gais.cs.ccu.edu.tw/">GAIS</a>的開發者，（在我第一次接觸網路時—1995左右，就使用過GAIS）。NuWeb在11月中舉辦過座談會。<br />
<br />
根據〈<a href="http://wp.tenz.net/archives/231">吳昇老師的 web3.0</a>〉與〈<a href="http://blog.roodo.com/smallpigchang/archives/2480495.html">NuWeb 現況</a>〉所述，NuWeb分成Server端跟用戶端軟體，用戶端包含結合檔案管理與分享功能的瀏覽器NuBraim、網頁伺服器NuServer，使用者可以簡單的安裝起來，即可簡單的在電腦上建立部落格與網頁，與他人分享電腦中的檔案。（似乎是Direct Link，不是P2P模式）
<div id="fullpost">NuWeb以IE為核心，可以直接使用名字去瀏覽好友的網站與分享目錄檔案、批次抓網頁圖、管理搜尋引擎的結果（這項看不太懂）。而透過NuServer設定目錄與檔案分享之後，NuServer會套用template，直接產生美觀的檔案分享網頁或網路相簿，另外還包含一套Blog在內。<br />
<br />
姑且不論使用者分享的檔案是不是合法，整個NuWeb的核心似乎目前是放在以使用者為中心的分享上。包含個人Blog、個人分享的檔案都是放在用戶端，就像是把<a href="http://www.apache.org/">Apache</a>、<a href="http://wordpress.org/">WordPress</a>包在一起，幫IE增加MSN傳檔功能，外加架站用的<a href="http://www.dyndns.com/">DynDNS</a>服務。<br />
<br />
NuWeb的一大特色是不需要Domain Name即可架站，使用者間只要用帳號就可以連到對方的網站或查看對方的分享檔案。但是這種功能需要Server端支援，因此整個系統包含了<a href="http://nuweb.cc/">Nuweb.cc</a>，作為NuWeb用戶的DNS與NuWeb的入口網站之用。<br />
<br />
如果可以不用網址，只用名稱就通往全天下的網站，當然好，但是立刻就想到一個問題。NuWeb用戶互相可以使用帳號連接，但是一般Browser呢？一般用戶要連接到NuWeb用戶的網站，必定還是需要網址，因此NuWeb.cc還是需要提供用戶個人網址，以便外界連入。用戶上非NuWeb的普通網站，也需要鍵入網址，當然NuWeb.cc可以將常用網站都建立帳號-網址對應資料，但是需要鍵入網址的狀況一定還是多的多。這個機制，說穿了就是「Google 好手氣＋0rz轉址＋DDNS」的組合罷了。<br />
<br />
NuWeb的特色在於簡單架站，人人都可以安裝程式在自己電腦上，然後簡單設定就有網站。這也是一個講起來很棒的功能，但是實作上有他的問題。當用戶端不在線上的時候怎麼辦？NuWeb提供了cache服務，但是能cache多少東西？網站中使用的圖片、音樂、影片、其他檔案，cache機制要保留多少東西？另外就是使用者的頻寬問題。在台灣我相信大多數家庭都還是透過ADSL上網，不用說上傳速率一定不足以應付一個網站所需。透過緩慢的家用迴路架站分享檔案絕對會面臨速度的問題，有誰想要別人來看自己的相簿時，顯示一張照片要等數十秒？<br />
<br />
NuWeb有多少吸引力？如何說服使用者拋棄網路上各個Service Provider來選用？NuWeb的相片分享要幹掉flickr、部落格要幹掉無名或Blogger、檔案分享要幹掉眾多的檔案Host如RapidShare，做得到嗎？NuWeb需要告訴我們，無名有什麼不好、Blogger有什麼不好、把相片傳到相簿網站上有什麼不好。去集中化、去壟斷化是個高尚的理想，但是不足以說服大眾放棄相對簡單的BSP與相簿網站，且會支持去集中化這種理想的User，大部分都具有較深的技術背景，也非NuWeb所訴求之使用者。<br />
<br />
NuWeb標榜去集中化，但是我看不出來沒有了NuWeb.cc整個機制還要怎麼運作。如果使用者上網時都要透過NuWeb.cc轉譯網址，很明顯成了另一種集中化。雖然把資訊打散了，但是Geteway還是在一點上。NuWeb所強打的另一個優點，分享檔案，也有所問題。除了照片外，使用者最需要分享的檔案是什麼？音樂與影片！在Google都還在為YouTube的侵權問題傷腦筋時，NuWeb要如何避免非法檔案交換？NuWeb要如何與眾多P2P軟體競爭？又要如何與佔有率超高的Windows Live Messenger共用資料夾功能競爭？<br />
<br />
NuWeb是一個充滿理想與願景的計畫，但是只要其使用者還是WWW上的少數，我就看不出優勢之處。何況，這些NuWeb所提供的功能，既然可以用Flock or Firefox＋Blogger＋Flickr＋Google好手氣來做，並且做的更好，為什麼要Switch？<br />
<br />
最後，不要再消費Web x.0了！NuWeb與Web 2.0不同的地方僅在於資訊host在用戶端，我實在看不出來這有哪一點足夠比擬Web及2.0之間使用者與服務商角色互換的概念上如此巨大的轉變。就像柏強在<a href="http://www.hemidemi.com/bookmark/info/397195">這兒</a>的討論所述：『看到「Web n」中的 n 超過 2 且為非自然數的我都會下意識地討厭…』如果沒能讓整個網路世界為之天翻地覆，自稱Web n.0都只是募款噱頭罷了！<br />
<br />
延伸閱讀：<br />
<a href="http://charlesc.ilovemeow.net/2006/12/28/internet/707/">NBN - Nothing But Net » NuWeb - Web 3.0?</a><br />
<a href="http://blog.roodo.com/smallpigchang/archives/2480495.html">張小P 過生活:NuWeb 現況 - 樂多日誌</a><br />
<a href="http://worker.bluecircus.net/archives/2006/11/_20_30_nuweb.html">工頭堅部落‧ 部落格臥客: 吳昇老師「把握 2.0 開創 3.0 , NuWeb」座談會</a><br />
<a href="http://wp.tenz.net/archives/231">吳昇老師的 web3.0 at 西瓜的滋味：Tenz’s blog</a>
<a href="http://www.kudo.idv.tw/blog/archives/2006/11/22/48/">無形部落 » 吳昇老師的 NuWeb 座談會心得</a><br />
<a href="http://www.kudo.idv.tw/blog/archives/2006/11/22/48/">無形部落 » 再談 NuWeb</a><br />
<a href="http://www.nuweb.cc/">NUWeb.cc</a>
</div>
