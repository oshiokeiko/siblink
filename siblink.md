# SIBLINK — PRD（実装仕様書）

## プロジェクト概要

- **サイト名**: SIBLINK
- **コンセプト**: 障害があるきょうだいと生きる「きょうだい」のためのwebメディア
- **目的**: 「きょうだい」が世の中に認知され、痛みを分かち合い、前に進める場所をつくる

---

## 技術スタック

| 項目 | 内容 |
|------|------|
| HTML | セマンティックHTML5（1ページ、スクロール型） |
| CSS | Tailwind CSS（CDN）+ カスタムCSS（`<style>`タグ） |
| JS | Vanilla JavaScript（フレームワークなし） |
| アニメーション | Canvas API（Blob背景）+ Intersection Observer（スクロールフェードイン） |
| フォント | Google Fonts CDN |
| バージョン管理 | Git / GitHub |
| ホスティング | Vercel（GitHubと自動連携） |

> **Phase 1**: CDN構成でHTML1ファイルとして完成させる
> **Phase 2**: Vite + Tailwind（npm）に移行
> **Phase 3**: Vercel + 独自ドメインでリリース

---

## ディレクトリ構成（Phase 1）

```
siblink/
  index.html       ← すべてここに書く
  assets/
    images/        ← 写真素材
```

---

## ページ構成

**Phase 1（今回）**: 1ページスクロール型で作る
**Phase 2（将来）**: 記事詳細・SIBLINKについて・投稿フォームなど複数ページに展開

> デザインはFigmaラフ画像あり

---

## セクション構成（1ページスクロール型）

| # | セクション | 説明 | 将来ページ化？ |
|---|-----------|------|--------------|
| 0 | Header | ナビゲーション | — |
| 1 | Hero | Blobアニメーション背景 + キャッチコピー + ロゴ | — |
| 2 | Message | ダーク背景 + 詩的なテキスト | — |
| 3 | News | 記事カードグリッド（3列） | ✅ 記事一覧・詳細ページ |
| 4 | About | ロゴ + SIBLINKの説明文 | — |
| 5 | Interview | 「あなたの気持ち、届けてみませんか？」+ ボタン | ✅ Googleフォームへのリンク |
| 6 | Footer | ナビゲーション | — |

---

## セクション詳細

### 0. Header

- Heroエリアが表示されている時はHeaderは表示しない
- Messageエリアまで来たらHeaderが表示される
- ダーク背景の時は白文字、白背景の時は黒文字となる
- PCの時はロゴとナビゲーションが表示されているが、SPの時はロゴとハンバーガーメニュー

### 1. Hero

- **背景**: Blobアニメーション（下記コード参照）
- **要素**:
  - 中央: キャッチコピー「障害があるきょうだいと、生きる」+ SIBLINKロゴ（ロゴは画像になるかも）
  - キャッチコピーとSIBLINKロゴをふわっと出したい

### 2. Message（ダーク背景テキストセクション）

- **背景色**: 濃いグレーをBlobアニメーションの上に重ねて、ダークだけど少し背景がゆらめいている感を出したい
- **テキスト**:
  ```
  障害のあるきょうだいと、生きる。
  
  愛しさと、あきらめと
  使命感に、やるせなさと
  深いつながりと、深い孤独と
  
  いりまじった感情が、なだれこむ。
  
  この感情を
  打ち明けられる場所は？
  受け止めてくれる場所は？
  
  世の中にはさまざまな支援があるけれど、
  障害があるきょうだいと生きる、わたしたちは、
  まるで、透明な存在だ。
  
  SIBLINKは、
  わたしたちの存在を透明にしない。
  
  人生のどんな場面でも、
  一人じゃないと思えるように。
  ```
- **フォント**: 細め（font-weight: 300）、行間ゆったり

### 3. News

- **背景色**: 白
- **レイアウト**: カードグリッド（PC: 3列、SP: 1列）
- **カード要素**: サムネイル画像 + タイトル
- **ダミーコンテンツ**（実装時は仮テキストでOK）:
  - 「家族だから」を壊したい
  - 「お姉さんは自分の生活を大切にしてください」の言葉に傷ついた一父親の息子との向き合い方
  - きょうだい児のつらさから考える家族支援

### 4. About

- **背景色**: 濃いグレーをBlobアニメーションの上に重ねて、ダークだけど少し背景がゆらめいている感を出したい
- **要素**: SIBLINKロゴ + 説明テキスト
  - PC：左右2カラム
  - SP：上下
- **テキスト**:
  ```
  SIBLINKは、障害があるきょうだいと生きる「きょうだい」をテーマにしています。
  「きょうだい」は、子どもの頃から大人になるまで、人生のさまざまな場面で、
  きょうだいならではの葛藤を抱えるシーンがあります。
  近年、少しずつ認知が広まってきました。
  障害のある子と生きる「きょうだい」への支援はまだまだ整っていないのが現状です。
  SIBLINKは、「きょうだい」が健康に生きながらも、自分から前に進める場所をつくりたいと考えています。
  ```

### 5. Interview

- **背景色**: 白
- **テキスト**: 「あなたの気持ち、届けてみませんか？」
- **サブテキスト**: きょうだいとして過ごしてきたこと。ほかの「きょうだい」に向けてのメッセージを聞かせてください。あなたの言葉が、同じ気持ちを抱えながらいるどこかの人の助けになります。
- **ボタン**: 「気持ちを投稿する」（黒背景 + 白文字）

### 6. Footer

- **要素**: ロゴ + ナビ（記事 / SIBLINKについて / 声を投稿する / お問い合わせ）

---

## Blobアニメーション仕様

HeroセクションのCanvas背景。**以下のコードをそのまま使う**。
MessageセクションとAboutセクションはこのBlobを共有し、上に半透明の`--bg-dark`を重ねて暗く見せる。

```javascript
const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
const grain  = document.getElementById('grain');
const gctx   = grain.getContext('2d');

const SPEED = 0.6;

function resize() {
  canvas.width  = window.innerWidth  * Math.min(devicePixelRatio, 2);
  canvas.height = window.innerHeight * Math.min(devicePixelRatio, 2);
}

function buildGrain() {
  const scale = 0.7;
  const W = Math.floor(window.innerWidth  * Math.min(devicePixelRatio, 2) * scale);
  const H = Math.floor(window.innerHeight * Math.min(devicePixelRatio, 2) * scale);
  grain.width  = W;
  grain.height = H;
  grain.style.imageRendering = 'pixelated';
  const imageData = gctx.createImageData(W, H);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const v = Math.random() > 0.5 ? (180 + (Math.random() * 75) | 0) : 0;
    data[i] = data[i+1] = data[i+2] = v;
    data[i+3] = 255;
  }
  gctx.putImageData(imageData, 0, 0);
}

resize();
buildGrain();
window.addEventListener('resize', () => { resize(); buildGrain(); });

const blobs = [
  { color: [255,  50, 140], cx: 0.30, cy: 0.42, rx: 0.55, ry: 0.30, ax: 0.18, ay: 0.14, px: 0.0, py: 0.5, a: 0.82 },
  { color: [255, 140,   0], cx: 0.12, cy: 0.68, rx: 0.44, ry: 0.24, ax: 0.16, ay: 0.20, px: 1.1, py: 1.8, a: 0.88 },
  { color: [255, 210,   0], cx: 0.78, cy: 0.18, rx: 0.38, ry: 0.20, ax: 0.14, ay: 0.12, px: 3.5, py: 2.2, a: 0.82 },
  { color: [255, 110,   0], cx: 0.06, cy: 0.16, rx: 0.34, ry: 0.28, ax: 0.12, ay: 0.16, px: 0.5, py: 4.0, a: 0.85 },
  { color: [ 20, 180, 255], cx: 0.85, cy: 0.72, rx: 0.58, ry: 0.34, ax: 0.16, ay: 0.18, px: 0.8, py: 3.1, a: 0.92 },
  { color: [  0, 230, 210], cx: 0.50, cy: 0.08, rx: 0.62, ry: 0.24, ax: 0.22, ay: 0.14, px: 1.7, py: 0.3, a: 0.88 },
  { color: [  0, 220, 190], cx: 0.92, cy: 0.32, rx: 0.34, ry: 0.30, ax: 0.10, ay: 0.20, px: 4.2, py: 2.7, a: 0.85 },
  { color: [ 30, 160, 255], cx: 0.64, cy: 0.35, rx: 0.36, ry: 0.50, ax: 0.14, ay: 0.22, px: 1.9, py: 3.5, a: 0.88 },
  { color: [160,  60, 255], cx: 0.18, cy: 0.84, rx: 0.38, ry: 0.28, ax: 0.18, ay: 0.16, px: 2.9, py: 1.4, a: 0.70 },
  { color: [220,   0, 170], cx: 0.44, cy: 0.90, rx: 0.44, ry: 0.20, ax: 0.20, ay: 0.12, px: 3.3, py: 0.7, a: 0.65 },
  { color: [ 20, 190, 255], cx: 0.50, cy: 0.50, rx: 0.92, ry: 0.80, ax: 0.05, ay: 0.05, px: 0.2, py: 0.8, a: 0.52 },
  { color: [255,  60, 150], cx: 0.50, cy: 0.50, rx: 0.88, ry: 0.72, ax: 0.06, ay: 0.04, px: 1.3, py: 2.1, a: 0.38 },
];

function drawBlob(x, y, rx, ry, color, alpha) {
  ctx.save();
  ctx.translate(x, y);
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
  const [r, g, b] = color;
  grad.addColorStop(0,    `rgba(${r},${g},${b},${alpha})`);
  grad.addColorStop(0.45, `rgba(${r},${g},${b},${alpha * 0.6})`);
  grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);
  ctx.scale(rx, ry);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, 1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function draw(t) {
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const base = ctx.createLinearGradient(0, 0, W, H);
  base.addColorStop(0,    '#ff4090');
  base.addColorStop(0.35, '#ff9800');
  base.addColorStop(0.65, '#00b4ff');
  base.addColorStop(1,    '#00dcc0');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);
  for (const b of blobs) {
    const x = (b.cx + Math.sin(t * SPEED + b.px) * b.ax) * W;
    const y = (b.cy + Math.cos(t * SPEED + b.py) * b.ay) * H;
    drawBlob(x, y, b.rx * W, b.ry * H, b.color, b.a);
  }
}

const start = performance.now();
function loop() {
  requestAnimationFrame(loop);
  draw((performance.now() - start) / 1000);
}
loop();
```

---

## アニメーション・インタラクション一覧

| 場所 | 効果 | 実装方法 |
|------|------|---------|
| Hero背景 | Blobうにゃうにゃ | Canvas API（上記コード） |
| Hero | キャッチコピー・ロゴがふわっと出る | CSS animation（fade-in） |
| Header | スクロールで出現 | Intersection Observer |
| Header | 背景によって文字色切り替え | JS（セクション検知） |
| Newsカード | ホバーで浮く | CSS `transform` + `transition` |
| Interviewボタン | ホバーで色変化 | CSS `transition` |
| 全セクション | スクロールで下からフェードイン | Intersection Observer |

---

## カラートークン

```css
:root {
  /* Brand */
  --color-primary:      #1e2939;   /* メインのネイビー */
  --color-primary-dark: #0f172a;   /* 濃いネイビー */

  /* Background */
  --bg-base:   #ffffff;   /* 通常の背景 */
  --bg-dark:   #1e2939;   /* 暗い背景（Message・AboutセクションのBlobオーバーレイ用） */

  /* Text */
  --text-primary:   #030712;               /* 通常テキスト */
  --text-inverse:   #f9fafb;               /* 暗い背景の上のテキスト */
  --text-muted:     rgba(255,255,255,0.7); /* 暗い背景の上の控えめテキスト */
  --text-secondary: rgba(0,0,0,0.6);       /* 明るい背景の上のサブテキスト */
}
```

> ⚠️ Blobアニメーションの色（シアン・ピンク・オレンジ）はカラートークンとは別管理。
> Message・AboutセクションはBlobの上に `--bg-dark` を半透明で重ねて暗くする。

---

## フォント方針

- **ロゴ・見出し**: `Noto Sans JP`（weight: 900）
- **本文・コピー**: `Noto Sans JP`（weight: 300）

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&display=swap" rel="stylesheet">
```

---

## レスポンシブ方針

| ブレークポイント | 対応 |
|----------------|------|
| SP（〜767px） | 1カラム、フォントサイズ縮小 |
| PC（768px〜） | デザイン通り |

Tailwindの `md:` プレフィックスを基本的に使う。

---

## Claude Codeへの指示方針

### 進め方（セクションごとに分けて依頼する）

```
Step 1: HTML骨格 + Tailwind CDN読み込み + フォント設定
Step 2: Heroセクション（Blobアニメーション実装）
Step 3: Messageセクション（スクロールフェードイン）
Step 4: Newsセクション（カードグリッド）
Step 5: Aboutセクション
Step 6: Interviewセクション
Step 7: Headerスクロール挙動 + レスポンシブ調整
Step 8: 細部のアニメーション・微調整
```

### Claude Codeに渡すときの注意

- 一度に全部頼まない。Step単位で依頼する
- 各Stepの最後に「ブラウザで確認してから次へ」
- Blobのコードは「このコードをそのまま使って」と明示する

---

## GitHub / デプロイ構成

```
リポジトリ名: siblink
ブランチ: main（本番）
デプロイ: Vercel（mainへのpushで自動デプロイ）
ドメイン: 別途取得後にVercelで紐付け
```
