---
layout: "post.njk"
title: "Firefox Voice intents workshop"
date: "2020-03-15T09:04:43.297Z"
source: "medium"
original_url: "https://irvinfly.medium.com/firefox-voice-workshop-85fb88d8d40b"
canonical_url: "https://medium.com/@irvinfly/firefox-voice-workshop-85fb88d8d40b"
permalink: "/firefox-voice-workshop-85fb88d8d40b.html"
tags: ["medium"]
excerpt: "Firefox Voice intents workshop Volunteer help to add new voice-control commands for Firefox People are trying to use TTS from another laptop to trigger the intent they’re making. F"
---

### Firefox Voice intents workshop

#### Volunteer help to add new voice-control commands for Firefox

<iframe src="https://embedr.flickr.com/photos/49656031302" width="700" height="394" frameborder="0" scrolling="no"></iframe>

[Firefox Voice](https://github.com/mozilla/firefox-voice) is an experimental add-on adding voice-control for Firefox. You can play with it now by installing the add-on on the desktop version of Firefox from the below page.

**Test Firefox Voice - Mozilla Community Portal**
*Firefox Voice is an experiment from Mozilla that lets you browse and get more done with your voice-faster than ever. We…*community.mozilla.org

During the Mozilla Berlin All-Hands, we had some discussion with the engineers about if a community volunteer can help to build intents (voice commands) for Firefox Voice. We were wondering if this topic will be interesting for volunteers to work on, and decided to run a pilot workshop at [Taipei Community Space.](https://moztw.org/space)

As a branch event of our regular browser add-on workshop, on Feb 29, five people joined the very first Firefox Voice intents workshop with us from 2 to 6 pm.

The combination of attendees were one experienced add-on developer and evangelism to lead the workshop, one people who come to the add-on workshop often, and two new people who is able to write JS without any add-on dev experience.

In the end, we have came up with two PRs ([1128](https://github.com/mozilla/firefox-voice/issues/1128) & [1129](https://github.com/mozilla/firefox-voice/issues/1129)), and here are the problems we had, during the workshop:

### Set-up the extension developing environment

It took us 2 hrs for everyone to fully set up their web extension developing environment (on Two Mac, one Windows and one Linux). The problems we bumped-in includes:

1. Need to install node/npm.
2. A broken git on Win laptop.
3. Need to download and install Firefox nightly.
4. Windows laptop unable to use
   npm run start
   to pack the source and run with nightly (resolved by download the pre-packed xpi file, extracted and replaced the files in the repo, and run with
   web-ext run
   .
5. npm run start
   is unable to find Nightly on Linux, because it’s named firefox-trunk instead of firefox-nightly, resolved by run
   web-ext run --firefox=firefox-trunk
   .
6. On Mac, the mic privilege requesting dialog (for iTerm) showed up pretty late, cause some privilege problem.

![](/assets/images/miro.medium.com/571324b0f9a45478.png)

### Problems people had when working on the intents

While working on intents, these are the problems we had:

1. The voice command panel is not working properly on the current master branch.
2. Intent matching is quite tricky. It’s hard to know if the command is handled by the new intent we’re working on, or get caught by the current intents. Eg., the intent (about tab) I tried to implement was always caught by
   find.find
   , whatever the different words I try to use.
3. The good-new-bugs the mentor had prepared to use as the examples had been patched before the workshop took place.
4. The biggest problem — the current STT doesn’t recognize our tones. We will need to retry like more than ten times before the STT can output the sentences we would like to say.

We eventually use another laptop’s TTS, to vocalize the sentences we like to test. After the workshop, one of us eventually found we can, in fact, typing the sentences instead of trying to say it again and again.

<iframe src="https://embedr.flickr.com/photos/49656005127" width="700" height="394" frameborder="0" scrolling="no"></iframe>

People did have lots of fun and positive feedback for the workshop. If you want to find an interesting topic to hack with the community member together, [check some good-first-bugs](https://github.com/mozilla/firefox-voice/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) for Firefox Voice now.
