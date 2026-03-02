---
layout: "post.njk"
title: "Concerning about how add-on auto-reviewing process can hurt user’s trust to Firefox"
date: "2017-10-12T16:43:00Z"
source: "blogger"
original_url: "http://irvin.sto.tw/2017/10/concern-about-amo-firefox-addon-auto-review.html"
canonical_url: ""
permalink: "/2017/10/concern-about-amo-firefox-addon-auto-review.html"
tags: ["mozilla", "extension", "firefox", "blogger"]
excerpt: "(Cross-post from Mozilla Discourse and Medium ) What is the price for us to eliminating the reviewing queue with robots? (picture from Mozilla Wiki ) Most people don’t know that we"
---

<p>(Cross-post from <a href="https://discourse.mozilla.org/t/concern-about-how-add-on-auto-review-can-hurt-users-trust-to-firefox/20177" target="_blank">Mozilla Discourse</a> and <a href="/concern-about-how-add-on-auto-review-can-hurt-users-trust-to-firefox-da70818ac960.html">Medium</a>)</p>

<p><img border="0" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhI672z86dnACTE95eVb4YAs3MgbE6ajbMYSE_X3PeXp7nY__w1rbVLFJ0u-7o93Y_zJvlwDaWSZuMzNTWp89sriIGiPxv8mEdtA1rwMCOlaMvUXLNR1eqCydkS0YzLr965b2Lnkg/s1600/1*9V3TfXKfXoGoNKGYdwTPpA.png" data-original-width="603" data-original-height="360" /><br>
What is the price for us to eliminating the reviewing queue with robots? (picture from <a href="https://wiki.mozilla.org/File:PreliminaryReview.png">Mozilla Wiki</a>)</p>


<p>Most people don’t know that we’re now using an automatically-approval process on AMO for Firefox Add-on review (since mid. September)*, which means, our program will check for known problems and threats in new add-ons, and if not found, it will get published without any manual process.</p>

<p>* <a href="https://blog.mozilla.org/addons/2017/09/21/review-wait-times-get-shorter/">Extension review wait times are about to get much shorter (blog.mozilla.org)</a></p>

<p>The benefit is time. Some addon author already found that the reviewing process is incredibly quick, that it will get published in just a few minutes after uploaded new version.</p>

<p>However, the automatically approved system (which Chrome used for many years) had been considering harmful for general user, because it can be the routes for malware to get into user’s browser, and we can only stop and fix it after someone discovered and reported back, and cannot prevent in advance with current manual reviewing process.</p>

<p>And this bad part had ALREADY happened just in that week after the automatically review process up. Two weeks ago, we discover several add-ons had bound with mining codes on AMO. After some research, we found 7 add-ons with the same codes in the end.</p>

<ul>
<li><p><a href="https://www.reddit.com/r/firefox/comments/737kze/mining_codes_been_discovered_in_two_reviewed/">Mining codes been discovered in two reviewed add-ons from &quot;Add-ons for Firefox&quot; site. (r/firefox)</a></p></li>
<li><p><a href="http://boards.4chan.org/g/thread/62674567/bitcoin-miner-in-firefox-addons6">/g/ - &gt;bitcoin miner in firefox addons. &gt;addons are aut - Technology - 4chan (boards.4chan.org)</a></p></li>
</ul>

<p>Although the editor had banned them, the MALICIOUS ADD-ONs had already got into user’s computer. We didn’t know how many users were affected nor how many mal-addons left there in public.</p>

<p>Many people (including me) feel that AMO is not trustworthy anymore because of the potential threat. Without fully manual review, we need to assume that every add-on appears on AMO can be dangerous.</p>

<p>The manual review process had always been considering one of the better things Firefox’s eco-system over Chrome, that the reviewer will not only check for the malicious codes, but also help addon author to follow some best practice (eg., using the known version of libraries such as jQuery from official site).</p>

<p>And because of the manual reviewing process, we told general user that they need to be aware for Add-on installed from other sites, and they can trust the one listed on AMO.</p>

<p>With non-manual checking Add-ons (and the fact that dangerous code can be live there), we cannot trust any AMO add-ons now. Even for those been manual reviewed, because we just cannot tell which one had been check and which is not apart.</p>

<p>Even worst, some normal add-ons may be updated with malicious codes, been auto-approval and push into user’s browser with our auto-update mechanism anytime.</p>

<p>Many people are asking for purchasing the ownership of my add-ons from time to time in past, that they want to earn the profit by adding Ads to it. Guess what they want to do for now if they discover the change of reviewing process?</p>

<p>According to the discussion on AMO blog article, on IRC addon channel, Reddit, 4chan, Telegram and within above and below links, many contributors including volunteering reviewers, Add-on authors and users already raise the concern about safety and trust problem, before and after the change.</p>

<ul>
<li><p><a href="https://www.ghacks.net/2017/10/03/mozilla-changes-review-process-for-firefox-webextensions/">Mozilla changes review process for Firefox WebExtensions - gHacks Tech News (www.ghacks.net)</a></p></li>
<li><p><a href="https://www.ghacks.net/2017/10/03/mozilla-needs-to-adjust-firefoxs-new-review-process/">Mozilla needs to adjust new review process for Firefox add-ons - gHacks Tech News (www.ghacks.net)</a></p></li>
</ul>

<p>They didn’t get the answers before the auto-approved enabling. And they saw the incidents happened. Besides removing those add-ons which been reported, there is still lack of any steps and strategies to prevent future incidents happening again.</p>

<p>My question is — How can we still convince users that Firefox eco-system is still TRUSTWORTHY? If even myself found it’s not trustful anymore.</p>

<h2 id="toc_0"></h2>

<p>Please join with me and represent your concern on <a href="https://discourse.mozilla.org/t/concern-about-how-add-on-auto-review-can-hurt-users-trust-to-firefox/20177">the Discourse thread</a>.</p>
