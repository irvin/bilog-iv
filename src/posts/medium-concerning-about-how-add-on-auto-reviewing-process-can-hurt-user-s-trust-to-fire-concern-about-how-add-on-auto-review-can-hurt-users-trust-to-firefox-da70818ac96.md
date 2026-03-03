---
layout: "post.njk"
title: "Concerning about how add-on auto-reviewing process can hurt user’s trust to Firefox"
date: "2017-10-10T12:00:22.634Z"
source: "medium"
original_url: "https://irvinfly.medium.com/concern-about-how-add-on-auto-review-can-hurt-users-trust-to-firefox-da70818ac960"
canonical_url: "https://medium.com/@irvinfly/concern-about-how-add-on-auto-review-can-hurt-users-trust-to-firefox-da70818ac960"
permalink: "/concern-about-how-add-on-auto-review-can-hurt-users-trust-to-firefox-da70818ac960.html"
tags: ["medium"]
excerpt: "Concerning about how add-on auto-reviewing process can hurt user’s trust to Firefox (Cross-post from Mozilla Discourse and blogger ) What is the price for us to eliminating the rev"
---

### Concerning about how add-on auto-reviewing process can hurt user’s trust to Firefox

(Cross-post from [Mozilla Discourse](https://discourse.mozilla.org/t/concern-about-how-add-on-auto-review-can-hurt-users-trust-to-firefox/20177) and [blogger](/2017/10/concern-about-amo-firefox-addon-auto-review.html))

![](/assets/images/miro.medium.com/023d4ee72a469409.png)

*What is the price for us to eliminating the reviewing queue with robots? (picture from [Mozilla Wiki](https://wiki.mozilla.org/File:PreliminaryReview.png))*

Most people don’t know that we’re now using an automatically-approval process on AMO for Firefox Add-on review (since mid. September), which means, our program will check for known problems and threats in new add-ons, and if not found, it will get published without any manual process.

**Extension review wait times are about to get much shorter**
*One the of the main advantages of the new WebExtensions API is that it is less likely to cause security or stability…*blog.mozilla.org

The benefit is time. Some addon author already found that the reviewing process is incredibly quick, that it will get published in just a few minutes after uploaded new version.

However, the automatically approved system (which Chrome used for many years) had been considering harmful for general user, because it can be the routes for malware to get into user’s browser, and we can only stop and fix it after someone discovered and reported back, and cannot prevent in advance with current manual reviewing process.

And this bad part had ALREADY happened just in that week after the automatically review process up. Two weeks ago, we discover several add-ons had bound with mining codes on AMO. After some research, we found 7 add-ons with the same codes in the end.

**/g/ - >bitcoin miner in firefox addons. >addons are aut - Technology - 4chan**
*bitcoin miner in firefox addons. >addons are autoapproved starting firefox 57. Firefox is finished... - "/g/ …*boards.4chan.org

Although the editor had banned them, the MALICIOUS ADD-ONs had already got into user’s computer. We didn’t know how many users were affected nor how many mal-addons left there in public.

Many people (including me) feel that AMO is not trustworthy anymore because of the potential threat. Without fully manual review, we need to assume that every add-on appears on AMO can be dangerous.

The manual review process had always been considering one of the better things Firefox’s eco-system over Chrome, that the reviewer will not only check for the malicious codes, but also help addon author to follow some best practice (eg., using the known version of libraries such as jQuery from official site).

And because of the manual reviewing process, we told general user that they need to be aware for Add-on installed from other sites, and they can trust the one listed on AMO.

With non-manual checking Add-ons (and the fact that dangerous code can be live there), we cannot trust any AMO add-ons now. Even for those been manual reviewed, because we just cannot tell which one had been check and which is not apart.

Even worst, some normal add-ons may be updated with malicious codes, been auto-approval and push into user’s browser with our auto-update mechanism anytime.

Many people are asking for purchasing the ownership of my add-ons from time to time in past, that they want to earn the profit by adding Ads to it. Guess what they want to do for now if they discover the change of reviewing process?

According to the discussion on AMO blog article, on IRC addon channel, Reddit, 4chan, Telegram and within above and below links, many contributors including volunteering reviewers, Add-on authors and users already raise the concern about safety and trust problem, before and after the change.

**Mozilla changes review process for Firefox WebExtensions - gHacks Tech News**
*Mozilla will switch the manual review process to an automated process for WebExtension submissions to the official…*www.ghacks.net

**Mozilla needs to adjust new review process for Firefox add-ons - gHacks Tech News**
*Mozilla switched to a new Firefox add-ons review system recently which reduces the time it takes before extensions are…*www.ghacks.net

They didn’t get the answers before the auto-approved enabling. And they saw the incidents happened. Besides removing those add-ons which been reported, there is still lack of any steps and strategies to prevent future incidents happening again.

My question is — How can we still convince users that Firefox eco-system is still TRUSTWORTHY? If even myself found it’s not trustful anymore.

Please join with me and represent your concern on [the Discourse thread](https://discourse.mozilla.org/t/concern-about-how-add-on-auto-review-can-hurt-users-trust-to-firefox/20177).

**Concern about how add-on auto-review can hurt user's trust to Firefox**
*Hi, Most people don't know that we're now using an automatically-approval process on AMO for Firefox Add-on review…*discourse.mozilla.org
