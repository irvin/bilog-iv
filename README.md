# Irvin Blog (11ty + GitHub Pages)

此專案會把你手動匯出的 Blogger 與 Medium 備份，轉成 Markdown 後交給 [11ty](https://www.11ty.dev/) 產生完全靜態網站，並由 GitHub Pages 自動部署。

## 專案結構

- `backups/blogger-takeout/.../feed.atom`：Blogger 匯出來源
- `backups/medium-export/posts/*.html`：Medium 匯出來源
- `scripts/import-content.js`：匯入轉換腳本（會重建 `src/posts`）
- `src/posts/*.md`：由匯入腳本自動產生的文章
- `src/_includes/`：11ty 版型
- `src/import-report.json`：每次匯入後的統計結果
- `_site/`：11ty 輸出（部署內容）

## 環境需求

- Node.js 22（建議）
- npm

## 本機使用流程

```bash
npm install
npm run refresh-content
npm run build
```

常用指令：

- `npm run import`：只做匯入（重建 `src/posts`）
- `npm run localize-images`：下載 Medium/Flickr 圖片到本地並改寫文章內圖片連結
- `npm run refresh-content`：匯入 + 圖片在地化
- `npm run build`：靜態建置到 `_site`
- `npm run serve`：本機預覽（不重跑匯入）

## URL 保留策略

- Blogger：使用 `blogger:filename`，保留原本 `/YYYY/MM/slug.html`
- Medium：根據 canonical URL 解析 slug，輸出 `/{slug}.html`
- 若 Medium slug 過長（檔案系統限制），會自動改為較短 fallback（附上文章 ID），避免建置失敗
- 文章內若連到舊站（如 `irvin.sto.tw`、`localhost:8080`）或舊 Medium 文章，匯入時會盡量自動改寫成本站內部連結

## 如何新增文章（新的手動文章）

重要：`npm run import` 會先清空 `src/posts` 再重建，所以**不要**把手寫文章放在 `src/posts/`。

建議做法：

1. 建立資料夾 `src/manual/`
2. 把手寫文章放在 `src/manual/*.md`
3. 每篇文章都加上 frontmatter（至少含 `layout`、`title`、`date`、`permalink`）

範例：

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

這裡是文章內容（Markdown 或 HTML 都可以）。
```

## 如何更新新的 Medium 文章

1. 手動從 Medium 匯出最新備份
2. 把匯出後的 HTML 檔放到 `backups/medium-export/posts/`
3. 執行：

```bash
npm run refresh-content
npm run build
```

4. 檢查 `src/import-report.json`：
   - `counts.medium` 是否符合預期
   - `samples.mediumPermalinks` 是否合理
5. 本機預覽確認內容後 commit / push

## GitHub Pages 部署

已配置 workflow：[`/Users/Irvin/Sites/blog/.github/workflows/pages.yml`](/Users/Irvin/Sites/blog/.github/workflows/pages.yml)

- push 到 `main` 時會自動：
  1. `npm ci`
  2. `npm run build`
  3. 部署 `_site` 到 GitHub Pages

首次使用請確認 GitHub Repository 設定：

1. `Settings` -> `Pages`
2. `Build and deployment` 選 `GitHub Actions`
