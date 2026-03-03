# Irvin Blog（11ty + GitHub Pages）

此專案將 Blogger 與 Medium 匯出資料轉成 Markdown，再由 [11ty](https://www.11ty.dev/) 產生完全靜態網站，部署到 GitHub Pages。

## 目標與目前已實作功能

- 完全靜態頁面輸出（無後端）
- 提供 RSS 訂閱（`/feed.xml`）
- 保留舊站 URL 結構
- 匯入時自動改寫文內舊站連結為本站連結
- Medium 回應型短文自動篩除
- 特定 Medium 文章 ID 黑名單篩除
- `女人迷精選` 文章保留 md，但不編譯成頁面
- Medium/Flickr/Blogger 圖片下載到本地
- 圖片補抓流程（pending/retry/recover）
- 圖片原始網址與最終本地網址對照表輸出
- Flickr 外連格式正規化：`<a href="flickr 頁"> <img src="本地圖">`

## 專案結構

- `backups/blogger-takeout/.../feed.atom`：Blogger 匯出來源
- `backups/medium-export/posts/*.html`：Medium 匯出來源
- `scripts/import-content.js`：匯入與連結改寫主流程（會重建 `src/posts`）
- `scripts/localize-images.js`：圖片本地化主流程
- `scripts/recover-flickr-pending.js`：從 Flickr 頁面補抓 pending 圖片
- `scripts/repair-tiny-images.js`：針對過小圖片嘗試換大圖
- `scripts/normalize-flickr-links.js`：把 Flickr 圖片直連外部連結改成 Flickr 作品頁
- `scripts/build-image-src-map.js`：更新圖片對照表 CSV
- `scripts/filter-medium-responses.js`：用規則找出/刪除 Medium 回應文
- `src/posts/*.md`：匯入後文章（`import` 會重建）
- `src/assets/images/`：本地圖片
- `src/assets/image-manifest.json`：圖片處理結果（成功/失敗/重用）
- `src/assets/image-pending.txt`：尚未抓到的圖片清單
- `src/assets/image-src-map-complete.csv`：圖片原始與最終對照表
- `src/assets/medium-response-filter-report.json`：回應文篩除報告
- `src/import-report.json`：匯入統計
- `.eleventyignore`：保留 md 但不參與編譯的檔案
- `_site/`：11ty 輸出（部署內容）

## 環境需求

- Node.js 22（建議）
- npm

## 安裝與基本流程

```bash
npm install
npm run refresh-content
npm run build
```

常用指令：

- `npm run import`：重新匯入（清空並重建 `src/posts`）
- `npm run localize-images`：圖片本地化
- `npm run images:pending`：只產生/檢視 pending 圖片清單
- `npm run images:retry`：只重試 pending 圖片
- `npm run images:recover-flickr`：針對 Flickr pending 補抓，再更新 pending
- `npm run images:map`：更新 `image-src-map-complete.csv`
- `npm run medium:filter-responses`：執行回應文篩除（`--apply` 模式已寫在 script）
- `npm run medium:to-markdown`：將 Medium 文章內文由 HTML 轉成 Markdown
- `npm run refresh-content`：`import` + `localize-images`
- `npm run build`：建置 `_site`
- `npm run serve`：本機預覽
- `npm run deploy:gh-pages`：本機 build 後，將 `_site` 推送到 `gh-pages` 分支

## URL 與連結策略

### 1. 文章 permalink 保留

- Blogger：使用 `blogger:filename`，維持 `/YYYY/MM/slug.html`
- Medium：由 canonical URL 推導 slug，輸出 `/{slug}.html`
- Medium slug 過長時，自動縮短並保留文章 ID 尾碼，避免檔名/URL 長度問題

### 2. 文內舊連結改寫為本站連結

`scripts/import-content.js` 會改寫 `href` 與 `data-href`：

- Blogger 舊網域：`irvin.sto.tw`、`www.irvin.sto.tw`
- 本機測試網域：`localhost:8080`
- Medium 網域：`medium.com`、`www.medium.com`、`irvinfly.medium.com`

Medium 連結會再用 post ID 對應，盡量避免因標題 slug 變形而失配。

## Medium 文章篩除策略

### 1. 匯入時先篩掉

`scripts/import-content.js` 內建兩層：

- `SKIP_MEDIUM_POST_IDS`：已知不需要的文章 ID 黑名單
- `isLikelyMediumResponsePost(...)`：以內容長度與結構（段落/標題/圖片數）判斷回應文

匯入統計會寫入 `src/import-report.json`：

- `counts.mediumSkippedResponses`
- `counts.mediumSkippedById`

### 2. 匯入後再清一次（可選）

`scripts/filter-medium-responses.js` 可再掃描一次 `src/posts` 中 Medium 文章：

- 產生 `src/assets/medium-response-filter-report.json`
- 以 `--apply` 模式刪除判定為回應文的 md（`npm run medium:filter-responses` 已帶 `--apply`）

### 3. 女人迷精選：保留 md，不編譯

已將指定女人迷文章加到 `.eleventyignore`：

- md 檔案會保留在 `src/posts`
- 11ty build 不會輸出對應 HTML

## 圖片處理流程（Medium + Flickr + Blogger）

### 1. 本地化主流程

`scripts/localize-images.js` 會：

- 掃描 `src/posts` 所有 `<img src="">`
- 挑出 Medium/Flickr/Blogger 圖源
- 依來源產生「優先抓大圖」候選 URL（例如 Medium `v2`、Flickr `_o/_k/_h/_b`、Blogger `s0`）
- 下載成功後存到 `src/assets/images/<host>/<hash>.<ext>`
- 改寫文章中的 `img src` 為本站本地路徑
- 輸出 `image-manifest.json` 與 `image-pending.txt`

### 2. 增量與重試

- `npm run images:pending`：列出目前待抓清單
- `npm run images:retry`：只重試 pending，不重跑全部

### 3. Flickr pending 補抓

`npm run images:recover-flickr` 會：

- 從文章內 Flickr 頁面線索找 photo page
- 解析 `live.staticflickr.com` 變體
- 優先嘗試大尺寸後綴
- 成功後寫回 md 並更新報告 `flickr-recover-report.json`

### 4. 過小圖片修復

`scripts/repair-tiny-images.js` 會找長邊過小圖片，嘗試用替代來源下載更大版本，結果寫到 `repair-tiny-report.json`。

### 5. 圖片對照表

`npm run images:map` 會更新 `src/assets/image-src-map-complete.csv`：

- `original_src`：原始圖片網址
- `current_src`：目前文章內圖片網址（通常是本地路徑）
- 可逐筆追蹤每張圖轉換結果

## Flickr 連結格式正規化

需求是：

- `<a href="flickr 作品頁">`
- `<img src="本地圖片">`

`scripts/normalize-flickr-links.js` 可把「包住 `<img>` 的 `<a>` 且 `href` 仍是 Flickr 直連圖片」改成 Flickr 作品頁（`flic.kr/p/...`）。

## 新增手動文章建議

`npm run import` 會清空 `src/posts`，所以手動文章不要放在 `src/posts`。

建議放在 `src/manual/*.md`，範例 front matter：

```md
---
layout: "post.njk"
title: "我的新文章"
date: "2026-03-02T10:00:00+08:00"
source: "manual"
permalink: "/2026/03/my-new-post.html"
tags: ["manual"]
excerpt: "這是一篇手動新增的文章"
---
```

## 更新 Medium 內容的建議 SOP

1. 放入最新匯出檔到 `backups/medium-export/posts/`
2. 執行 `npm run import`
3. 執行 `npm run localize-images`
4. 需要時執行 `npm run images:retry`、`npm run images:recover-flickr`
5. 執行 `npm run images:map`
6. 執行 `npm run build`
7. 檢查：
- `src/import-report.json`
- `src/assets/image-manifest.json`
- `src/assets/image-pending.txt`
- `src/assets/image-src-map-complete.csv`

## GitHub Pages 部署（本地 build，不走雲端）

此專案已移除 GitHub Actions 雲端建置，改為本地建置後部署。

### 1. 本地部署指令

```bash
npm run deploy:gh-pages
```

會執行：

1. `npm run build`
2. 將 `_site` 內容推送到遠端 `gh-pages` 分支（force push）

### 2. Repository Pages 設定

- `Settings` -> `Pages`
- `Build and deployment` -> `Deploy from a branch`
- Branch 選 `gh-pages`，Folder 選 `/ (root)`

若你的 remote 不是 `origin`，或要改分支名稱，可用環境變數：

```bash
DEPLOY_REMOTE=origin DEPLOY_BRANCH=gh-pages npm run deploy:gh-pages
```
