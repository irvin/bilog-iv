---
layout: "post.njk"
title: "Ubuntu 學習筆記：掛載 Freebsd UFS 分割區"
date: "2009-04-27T10:43:00.003Z"
source: "blogger"
original_url: "http://irvin.sto.tw/2009/04/ubuntu-freebsd-ufs.html"
canonical_url: ""
permalink: "/2009/04/ubuntu-freebsd-ufs.html"
tags: ["freebsd", "ubuntu", "blogger"]
excerpt: "為了這個問題困擾了一段時間，終於嘗試成功了，筆記一下怎麼在 Ubuntu 上掛載 FreeBSD 格式的硬碟。 先確定 FreeBSD 分割區的代號： irvin@irvin-desktop:~$ dmesg | grep 'bsd' [ 5.736592] sdc1: 分別掛載每個分割區： irvin@irvin-desktop:~$ sudo mount"
---

<p>為了這個問題困擾了一段時間，終於嘗試成功了，筆記一下怎麼在 Ubuntu 上掛載 FreeBSD 格式的硬碟。</p>
<p>先確定 FreeBSD 分割區的代號：</p>
<pre><code>irvin@irvin-desktop:~$ dmesg | grep 'bsd'
[    5.736592]  sdc1: <bsd: sdc5 sdc6 sdc7 sdc8 >
</code></pre>
<p>分別掛載每個分割區：</p>
<pre><code>irvin@irvin-desktop:~$ sudo mount -r -t ufs -o ufstype=ufs2 /dev/sdc5 /mnt
irvin@irvin-desktop:~$ ls /mnt
bin    compat     entropy  lib         media          patch   root  tmp
boot   COPYRIGHT  etc      libexec     mnt            proc    sbin  usr
cdrom  dev        home     lost+found  openssl.patch  rescue  sys   var
irvin@irvin-desktop:~$ 
</code></pre>
<p>很簡單的就成功了！</p>
