---
layout: "post.njk"
title: "SurveyCake 的網頁親和力找不到"
date: "2022-02-07T05:20:26.741Z"
source: "medium"
original_url: "https://irvinfly.medium.com/surveycake-no-accessibility-351779005ed"
canonical_url: "https://medium.com/@irvinfly/surveycake-no-accessibility-351779005ed"
permalink: "/surveycake-no-accessibility-351779005ed.html"
tags: ["medium"]
excerpt: "SurveyCake 找不到網頁親和力 There is no Accessibility in SurveyCake 直接用 surveycake 的範本建立一份測試問卷： https://surveycake.com/s/RNOZ8 實際測試，幾乎沒辦法用鍵盤操控 tab 的順序不按照題目亂跳 有些問題跳不進去 有些介面鍵盤控制不了 使用的都不是正常的"
---

### SurveyCake 找不到網頁親和力

#### There is no Accessibility in SurveyCake

![SurveyCake 的文件庫中找不到 Accessibility 這個詞](/assets/images/miro.medium.com/a1ef523901ff1ad3.png)

直接用 surveycake 的範本建立一份測試問卷： [https://surveycake.com/s/RNOZ8](https://t.co/zVN1RwXX9P)

![surveycake 透過範本建立問卷的介面，選擇「電影滿意度調查」範本](/assets/images/miro.medium.com/e9785a0407616e77.png)

實際測試，幾乎沒辦法用鍵盤操控

- tab 的順序不按照題目亂跳
- 有些問題跳不進去
- 有些介面鍵盤控制不了

使用的都不是正常的 HTML 表單元素，更別說要提供完整的語意

![](/assets/images/miro.medium.com/421c63ea6b3ba6cf.png)

結論：建議大家避開。

參考看看 SurveyMonkey 的 A11y 文件：
[https://help.surveymonkey.com/articles/en_US/kb/Accessibility-at-SurveyMonkey](https://help.surveymonkey.com/articles/en_US/kb/Accessibility-at-SurveyMonkey#Checklist)

大部分的問卷服務，都可以直接搜索 `a11y` `accessibility` `section 508` 關鍵字找到相關資訊：
[https://www.questionpro.com/security/section-508.html](https://www.questionpro.com/security/section-508.html)
[https://www.snapsurveys.com/web-surveys-web-accessibility-standards/](https://www.snapsurveys.com/web-surveys-web-accessibility-standards/)
[https://static.googleusercontent.com/media/www.google.com/zh-TW//accessibility/static/pdf/google-forms-vpat.pdf](https://static.googleusercontent.com/media/www.google.com/zh-TW//accessibility/static/pdf/google-forms-vpat.pdf)

有提供相關文件的話，至少就能確認該服務有意識到最基本的無障礙要求。
