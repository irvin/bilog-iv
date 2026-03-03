---
layout: "post.njk"
title: "How many data do we need to train machine hearing Mandarin Chinese?"
date: "2019-02-24T08:37:34.153Z"
source: "medium"
original_url: "https://irvinfly.medium.com/how-many-data-do-we-need-to-train-machine-hearing-mandarin-chinese-4ad628b55066"
canonical_url: "https://medium.com/@irvinfly/how-many-data-do-we-need-to-train-machine-hearing-mandarin-chinese-4ad628b55066"
permalink: "/how-many-data-do-we-need-to-train-machine-hearing-mandarin-chinese-4ad628b55066.html"
tags: ["medium"]
excerpt: "How many data do we need to train machine hearing Mandarin Chinese? Report from my discussion with western engineer about how many sentences and voices data we need to train a NN m"
---

### How many data do we need to train machine hearing Mandarin Chinese?

> Report from my discussion with western engineer about how many sentences and voices data we need to train a NN model to convert Mandarin voice into Chinese sentence, explain why I don’t thinnk we need our sample contains a million different sentences.

(update: re-write for clearly explain on 26 Feb 3:40 UTC)

The amounts of voice “unit” we need in Mandarin and in English may not be that big that you think. Let me try to explain why there is that big difference in my imagination.

### Tl;dr, The final Deep Speech model we need is actually a Voice-Phonetics model, rather than a Voice-Chinese model.

When machine hears the voice, its output should not be “Chinese characters”, but “romanized phonetics” (either in Zhuyin or Pinyin).

We feed the model with _best_browser_in_the_world.mp3_,
and the output should be,

> - “g4 ru,4 g;4 yjo4 cl3 2k7 xu.6 x03 fu4” (in Zhuyin)
> 
> - “Shì jiè shàng zuì hǎo de liú lǎn qì” (or in Pinyin)

but not,

> 世界上最好的瀏覽器 (in Chinese characters)

The phonetic-based input method (which all of us use them) is a classic and popular open source topic been researched for 20 years,

Once people got the above output, we can easily convert it back to “世界上最好的瀏覽器”, with Zhuyin or Pinyin dictionary table*, which contains all phonetics combination of phrases/chars and it’s frequency.

*[Zhuyin table](https://sites.google.com/site/ianho7979/InputMethodTables) for example

### Why we want the model to output pronunciation but not Chinese characters?

Because we have too many characters.

Consider 5k common characters (which most people only learn and use this amount, ideally, if we can have samples on all the sentences that people would speak, so it can learn to identify every sentence with their voice combination. with 20 chars length sentences, that’s 5k²⁰ combination, so that’s not gonna work.

So, in practice, we break the sentences into the phrase (2~3 syllables) and single char (one syllable). Many database recording voice in phrase but not sentences, and the model just needs to find the phases/chars for everyone, two, or three syllables. In Chinese, we only have 5k³+5k*2+5k combination, that’s 125000M, much realistic.

#### A voice-phonetics model

Actually, we don’t need that much sample too. Because those 5k chars only share the same 1500 pronunciation. if we ask our model not to identify different chars, but different phrase pronunciations, we can easily reduce the combination of samples down to 1.5k³+1.5k*2+1.5k = 3375M.

How can we further reduce the samples we need? We break the sentences into character, each character only had one syllable, that’s our advantage on Mandarin have — the model should be easily split clip by looking at the pause and level of the input voice. So I believe the minimum we only need 1.5k samples, in fact.

### Example

Take this sentence as an example:

> 世界上最好的瀏覽器 (The best browser in the world)

If we want Our machine to listent to the whole sentences, and find it’s identity characters, that is -

> 世 界 上 最 好 的 瀏 覽 器

We need the machine to learn all the combination of all the characters, that’s when we need 5k²⁰ samples. Not gonna work.

How can we reduce it?

#### Phrase based voice-phonetics model

We train machines to identify the pronunciation of phrases, but not Chinese characters. We already know Mandarin had around 1500 different pronunciation. so if we consider only 2 char length phrases, our model only need to output this result,

> - Shìjiè shàng zuì hǎo de liúlǎn qì (Hanyu Pinyin, you can get this by copy-paste the whole sentences into Google Translate)
> 
> - ㄕˋㄐㄧㄝˋ / ㄕㄤˋ / ㄗㄨㄟˋㄏㄠˇ / ㄉㄜ˙ / ㄌㄧㄡˊㄌㄢˇ / ㄑㄧˋ (Zhuyin)
> 
> - g4ur,4 / g;4 / yjo4cl3 / 2k7 / xu.6x03 / fu4 (Zhuyin rep. by keyboard char)

People who had this output can use pronunciation-chars dictionary table, another model, or other methodology to figure out which words are using in the sentences, and have the final result,

> 世界 / 上 / 最 / 好 / 的 / 瀏覽 / 器

The problem now looks much much similar to English and other roman-character based languages. We only need 1.5k*1.5k samples, that’s 225M samples.

#### Character based voice-phonetics model

We can even reduce the data we need, because we actually only need our model to identity chars, but not phrases. The output we really need is,

> -Shì jiè shàng zuì hǎo de liú lǎn qì (Hanyu Pinyin)
> 
> -ㄕˋ / ㄐㄧㄝˋ / ㄕㄤˋ / ㄗㄨㄟˋ / ㄏㄠˇ / ㄉㄜ˙ / ㄌㄧㄡˊ / ㄌㄢˇ / ㄑㄧˋ (Zhuyin)
> 
> - g4 / ru,4 / g;4 / yjo4 / cl3 / 2k7 / xu.6 / x03 / fu4 (Zhuyin keyboard char)

And the same, people can easily convert the output back to the final sentences,

> 世 界 上 最 好 的 瀏 覽 器

Although we have 5k chars, we only have 1500 sounds, that can represent by 26 characters, each with 4 tones* (if we based on Pinyin), or 37 chars with 4 tones* (base on Zhuyin) to learn. That’s much more similar to English, right?

* some researchers told me that we don’t even need tones in this scenario.

That is also why we can still use 36-key English keyboard to type Chinese, but not a keyboard with a few hundred keys — which really exist in our computer history.

### How do we train our model?

In practice, how can we train the model with this pronunciation-based strategy?

We don’t feed the model with the original Chinese sentences. We should convert the sentence into Pinyin / Zhuyin and feed it.

> You feed best_browser_in_the_world.mp3
> 
> with
> 
> - “g4 ru,4 g;4 yjo4 cl3 2k7 xu.6 x03 fu4” (convert by Zhuyin table)
> 
> - “Shì jiè shàng zuì hǎo de liú lǎn qì” (convert by Pinyin table)

I find that this discuss may be useful for others, so I re-published it from [Mozilla Discourse](https://discourse.mozilla.org/t/number-of-sentences-needed/36182).

<iframe src="https://button.like.co/in/embed/irvinchen/button/" width="485" height="212" frameborder="0" scrolling="no"></iframe>
