---
layout: "post.njk"
title: "Booking.com 如何預定兩間四人房？「日本最爛飯店」 事件說明"
date: "2023-12-16T07:19:57.774Z"
source: "medium"
original_url: "https://irvinfly.medium.com/booking-com-japan-hotel-issue-c3afb17fc6a1"
canonical_url: "https://medium.com/@irvinfly/booking-com-japan-hotel-issue-c3afb17fc6a1"
permalink: "/booking-com-japan-hotel-issue-c3afb17fc6a1.html"
tags: ["medium"]
excerpt: "Booking.com 如何預定兩間四人房？「日本最爛飯店」 事件說明 近日「日本最爛飯店」的 YouTuber 事件，姑且不論飯店的態度差，其實飯店沒有錯，booking 也沒有錯，根本是他自己的操作問題。 12/19 更新：文末加入測試訂房過程錄影的 Youtube 直播連結 事件簡述 該 YouTuber 在日本的溫泉飯店訂了兩間房，共有八人要入住，c"
---

## Booking.com 如何預定兩間四人房？「日本最爛飯店」 事件說明

> 近日「日本最爛飯店」的 YouTuber 事件，姑且不論飯店的態度差，其實飯店沒有錯，booking 也沒有錯，根本是他自己的操作問題。

![](/assets/images/miro.medium.com/e368bc4fb96e5f69.png)

12/19 更新：文末加入測試訂房過程錄影的 Youtube 直播連結

### 事件簡述

該 YouTuber 在日本的溫泉飯店訂了兩間房，共有八人要入住，checkin 時飯店發現訂單是「一間四人房入住三人、一間四人房入住ㄧ人」，總人數只有四個人。Youtuber 認為「四人房入住三人與入住一人，價格怎麼會一樣，是 booking 提供給飯店的訂單有誤。」

### Booking 訂房的操作邏輯

當你搜索「四人 x 兩間房」時，Booking 的邏輯是「我有**四個人**，我要**分住兩間房**」，所以訂單就會幫你拆成 2+2 或 3+1。就算在下一步選四人房兩間，訂單上的入住總人數還是只有四個人。

正確的做法是搜索「八人 x 兩間房」，系統就會提供兩間四人房，總共八人的訂單。

所以這純粹是系統 UX 上容易誤解，飯店跟 Booking 的訂單都沒有錯，真的只有錯在飯店的態度很差而已。

#### 重現流程

1. 搜索「2 間房 x 4 個人」
2. 隨便找任何一間溫泉飯店點進去
3. 選任何四人房 x 2個住宿單位
4. 最後會拿到 3+1 人的兩個房間

![](/assets/images/miro.medium.com/78c8e69211a8f0a4.jpeg)

![](/assets/images/miro.medium.com/63bbeb65f504a387.jpeg)

![](/assets/images/miro.medium.com/ea12adb0089b1765.jpeg)

#### 正確的操作方式

同一間飯店，一開始搜索「兩間房 x 8個人」，最後訂單上才會是兩間各四人的四人房共八人。

![](/assets/images/miro.medium.com/902252197ad51253.png)

![](/assets/images/miro.medium.com/ac4fd5101e6cf7dd.jpeg)

### 四人房與一人房價格一樣的問題

這一個事件中，Booking 在這邊的 bug (feature?) 是「四人入住四人房，跟四人房只入住一人的價格一樣」，因而容易造成誤解。

我猜應該是因為他在某些特價期間定的關係，此時 booking 常會把高房（高級房、多人房）降價促銷。

### Booking VIP

BTW，Booking 的 Genius 3 根本沒有什麼門檻，兩年住滿 15 筆就是 VVIP了，而且不用保級。

![](/assets/images/miro.medium.com/704f3fba0dc6f1e8.png)

#### Youtube 直播重現 Booking 訂房問題（12/19 更新）

[https://youtube.com/live/XO9pxFQqOsc](https://youtube.com/live/XO9pxFQqOsc)

**Booking.com 上如何不踩雷 -「日本最爛飯店 youtuber」分析與 booking 平台訂房經驗分享**
*全家出遊如何訂房，才能正確訂到兩間以上正確人數的房間？blog 版事件解析： https://irvinfly.medium.com/booking-com-japan-hotel-issue-c3afb17fc6a100:00:37…*www.youtube.com
