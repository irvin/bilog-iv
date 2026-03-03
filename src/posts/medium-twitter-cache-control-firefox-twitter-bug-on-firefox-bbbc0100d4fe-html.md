---
layout: "post.njk"
title: "Twitter 漏了設定 Cache-Control 表頭，導致傳送私訊的檔案在 Firefox 上會被快取七天"
date: "2020-04-04T04:03:04.489Z"
source: "medium"
original_url: "https://irvinfly.medium.com/twitter-bug-on-firefox-bbbc0100d4fe"
canonical_url: "https://medium.com/@irvinfly/twitter-bug-on-firefox-bbbc0100d4fe"
permalink: "/twitter-bug-on-firefox-bbbc0100d4fe.html"
tags: ["medium"]
excerpt: "如何甩鍋自己的資安 Bug 🤧 Twitter 過去漏了設定 Cache-Control 標準表頭，導致傳送私訊的檔案會被 Firefox 快取七天，登出也不會被清掉。 然後為什麼只在 Firefox 上出包？因為在 Chrome 中，如果你有設定無關的 Content-Disposition header （提示下載檔案並建議檔名），就剛好不會進行 ca"
---

![](/assets/images/miro.medium.com/a3a900fa389eec77.png)

*如何甩鍋自己的資安 Bug 🤧*

### Twitter 過去漏了設定 Cache-Control 標準表頭，導致傳送私訊的檔案會被 Firefox 快取七天，登出也不會被清掉。

然後為什麼只在 Firefox 上出包？因為在 Chrome 中，如果你有設定無關的 Content-Disposition header （提示下載檔案並建議檔名），就剛好不會進行 cache。

Mozilla 公告：[https://mzl.la/2JE6GBm](https://mzl.la/2JE6GBm?fbclid=IwAR0Wmif9vK4vFVVQtCVeung66pgJFE28bM3hx6tOGStiwJ1AlGOCaxW9tyM)

**What you need to know about Twitter on Firefox — The Mozilla Blog**
*Yesterday Twitter announced that for Firefox users data such as direct messages (DMs) might be left sitting on their…*blog.mozilla.org

技術細節：[https://mzl.la/2X7DB9i](https://mzl.la/2X7DB9i?fbclid=IwAR0JWsdCNcJATddPgPtJ69j8XQgGgxVxvkEnZFKHevgwXXmFDfYce1eHYxM)

**Twitter Direct Message Caching and Firefox - Mozilla Hacks - the Web developer blog**
*Twitter is telling its users that their personal direct messages might be stored in Firefox's web cache. This problem…*hacks.mozilla.org

Twitter 的隱私問題揭露：

**Twitter Data Cache on Mozilla Firefox**
*We recently learned that the way Mozilla Firefox stores cached data may have resulted in non-public information being…*privacy.twitter.com
