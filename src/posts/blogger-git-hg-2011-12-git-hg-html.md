---
layout: "post.njk"
title: "git-hg 安裝筆記"
date: "2011-12-27T03:47:00Z"
source: "blogger"
original_url: "http://irvin.sto.tw/2011/12/git-hg.html"
canonical_url: ""
permalink: "/2011/12/git-hg.html"
tags: ["dev", "mac", "blogger"]
excerpt: "三個月來的第一篇新文章，結果只是筆記一下要怎麼用 git-hg 來抓 hg repo…… 以下都是 mac 環境： 如果沒有 homebrew 的話，就先裝起來吧！這是比 macport 更好用 n 倍的套件管理工具。 /usr/bin/ruby -e \"$(curl -fsSL https://raw.github.com/gist/323731)\" 接著"
---

<p>三個月來的第一篇新文章，結果只是筆記一下要怎麼用 <a href="https://github.com/offbytwo/git-hg">git-hg</a> 來抓 hg repo……</p><p>以下都是 mac 環境：</p><p>如果沒有 <a href="http://mxcl.github.com/homebrew/">homebrew</a> 的話，就先裝起來吧！這是比 macport 更好用 n 倍的套件管理工具。<br />
<pre>/usr/bin/ruby -e "$(curl -fsSL https://raw.github.com/gist/323731)"</pre></p><p>接著：<br />
<pre>brew install hg
brew install git-hg</pre></p><p>此外還需要 python 的一些 module：<br />
<pre>sudo easy_install mercurial</pre></p><p>最後 git-hg clone repo，再看少什麼補什麼吧。</p><div><a href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMFItkoCxmtA4sxfFd8wBrUWjDulZel0ArGdW-VnqXT71bOeSqPjy4NHWBZE-dTpWuHWWdfY67KVJJLsj4xa5iJSYmdPUS04Uf9Rc7tvjFTqStT0EOkvRncs7mlLAPO4sRSThFgw/s1600/2011-12-27+11.41.03.png"><img border="0" height="640" src="/assets/images/blogger.googleusercontent.com/169f51744832cbfc.png" width="606" /></a></div><p>完了XD</p>
