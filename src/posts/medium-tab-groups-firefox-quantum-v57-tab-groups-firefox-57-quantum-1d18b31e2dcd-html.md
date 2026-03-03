---
layout: "post.njk"
title: "Tab Groups + Firefox Quantum (v57)"
date: "2017-11-18T12:50:50.357Z"
source: "medium"
original_url: "https://irvinfly.medium.com/tab-groups-firefox-57-quantum-1d18b31e2dcd"
canonical_url: "https://medium.com/@irvinfly/tab-groups-firefox-57-quantum-1d18b31e2dcd"
permalink: "/tab-groups-firefox-57-quantum-1d18b31e2dcd.html"
tags: ["medium"]
excerpt: "Tab Groups + Firefox Quantum (v57) (Chinese below, blogger link ) Updated: This method only works on Firefox 57.0 and died after 57.0.1 Because Firefox will start removing XUL inte"
---

### Tab Groups + Firefox Quantum (v57)

(Chinese below, [blogger link](/2017/11/tab-groups-firefox-quantum-v57.html))

*Updated: This method only works on*[*Firefox 57.0*](https://ftp.mozilla.org/pub/firefox/releases/57.0/)*and died after 57.0.1*

Because Firefox will start removing XUL interface and it’s related codes, Firefox Quantum (v57) begin to disable extensions developed with legacy (non-WebExtension) API.

It’s been a significant impact on my working environment, with 400+ tabs organizing in 28 groups with [Tab Groups](https://addons.mozilla.org/firefox/addon/tab-groups-panorama/) (formally Panorama), which is a must for me.

So I will stay on Firefox 56 as long as possible…

Well… I’m NOT staying in Firefox 56. There is actually a way to keep Tab Groups working in Firefox Quantum.

*更新：本方法只適用於*[*Firefox 57.0*](https://ftp.mozilla.org/pub/firefox/releases/57.0/)*，57.0.1 就失效嘍。*

因為 Firefox Quantum (57) 開始陸續要移除 XUL 介面，因此正式把非 WebExtensions 的套件停用了。對我的整個瀏覽器環境，影響最大的是，用以組織 400 個以上分頁成為 28 個專案的 [Tab Groups](https://addons.mozilla.org/firefox/addon/tab-groups-panorama/)「分頁群組 / Panorama」即將無法使用。

所以我決定要死守 Firefox 56⋯⋯沒有啦，還是可以用啦，其實！

![](/assets/images/miro.medium.com/c9276187487193cf.png)

*(My daily environment) Tab Groups is still working on Firefox Quantum*

Here is how to make Tab Groups working in Firefox Quantum,

1. Download and install last Firefox 57 Beta
   (57.0b14) and open it.
2. Open
   about:config?filter=extensions.legacy.enabled
   In URL, double-click to set the value to
   *true*
   , restart Firefox 57 Beta.
3. Open
   Tab Groups page listed on AMO
   .
4. You’ll notice
   [+Add to Firefox]
   button is unclickable. Right-click on the button, choose
   Save Link As…
   to download .xpi file.
5. Drag & drop the .xpi file into Firefox window and install it. After installed, check for Tab Group icon shows up on top-right, to make sure it’s enabled.
6. Shutdown Firefox Beta, and open Firefox Quantum (v57).
7. You’ll notice Tab Groups working fine on Firefox Quantum!

經過這週的持續實驗，確認在 Firefox 57 釋出後，分頁群組仍然能（有條件的）運作。方法是：

1. 下載安裝 Firefox 57 最終 Beta
   (57.0b14)。
2. 打開
   about:config?filter=extensions.legacy.enabled
   ，點兩下將其值設定為
   true
   ，關閉重開 Firefox 57 Beta。
3. 打開
   Firefox 擴充套件網站的 Tab Groups 頁面
   。
4. 你會發現「
   +新增至 Firefox
   」按鈕無法點擊。在按鈕上按右鍵，選擇
   鏈結另存新檔。
5. 將下載後的 xpi 檔拖拉到 Firefox 視窗上，就能正常安裝。
6. 待安裝完成之後，關閉 Firefox Beta，再打開 Firefox Quantum (v57) 正式版
7. 你會看到持續正常運作中的分頁群組！

I assumed it’s a bug and not a Feature. The process will cease to function soon after Firefox 58 release. Thanks for it to enabling the upgrade of my working profile to Quantum anyway.

After testing for few days, I notice that sometimes Tab Group will randomly disappear (with all tabs in other groups).

Don’t panic! You just need to close Firefox, reopen Firefox 57 Beta, go to AMO Tab Group page, and click *[+Install to Firefox]*. It will resume working after reinstalling addon, and your tabs will still there.

預期這個方法到 Firefox 58 應該就會失效（如果開啟 Firefox (v58) Beta，Tab Groups 會被再次停用）。雖然這應該是個 Bug 不是 Feature，不過還是感謝它能讓我的作業環境正式升級到 Quantum。

經過幾天測試，分頁群組偶而會失效。此時只要關閉 Firefox，重新開啟 Firefox 57 Beta，再到 AMO 上點選「+新增至 Firefox」即可恢復正常。

I’ll keep using Firefox Quantum (v57) until the most critical WebExtension API “Hiding & showing tabs” ([Bug 1384515](https://bugzilla.mozilla.org/show_bug.cgi?id=1384515)) landed, and successor of Tab Groups been giving birth.

The patch and proof of concept from Dietrich and :johannh had been uploaded for three months, but I’m not able to follow the long, long thread of comments on that bug recently.

接著應該會繼續用這個方式用 57.0 頂著，直到 WebExtension API 中最關鍵的[「隱藏分頁」API](https://bugzilla.mozilla.org/show_bug.cgi?id=1384515) 完成，並有人開發出分頁群組替代品吧。

（Patch 以及驗證概念的測試套件都提出三個月了，最近吵了一長串，看不懂是什麼狀況⋯⋯）

**1384515 - Provide an API for hiding and showing individual tabs**
*Edit description*bugzilla.mozilla.org

Besides the above method, I’d also been tested [Waterfox](https://www.waterfoxproject.org) for last month. The current Waterfox is developed based on Firefox 55, and they [planned to release ESR version based on Firefox 56 soon](https://www.waterfoxproject.org/blog/waterfox-55.0-release-download), with security patch backport from latest Firefox.

It may be another good choice, if you want to have Tab Groups, and not really care about the speed of Quantum.

在還未實驗出以上 Workaround 之前，我也測試了一個月的 [Waterfox](https://www.waterfoxproject.org)。該分支目前版本是 55.2.0，[計畫近期要釋出基於 56 的長期版本，然後持續 backport 新版 Firefox 的安全性更新](https://www.waterfoxproject.org/blog/waterfox-55.0-release-download)。如果不必然堅持要享受 57 的速度差異，也是一個可考慮的穩定選擇。

**Waterfox - The free, open and private browser**
*Waterfox is a specialised browser based on the Mozilla platform. Made specifically for 64-Bit systems, Waterfox gives…*www.waterfoxproject.org
