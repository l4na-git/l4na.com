# l4na.com

ポートフォリオサイト。デザインは [v0](https://v0.app) で考え、Astro + React で構築しました。

🔗 [l4na.com](https://www.l4na.com)

## 技術スタック

- [Astro](https://astro.build)
- [React](https://react.dev)（インタラクティブなコンポーネントに使用）
- [Tailwind CSS v4](https://tailwindcss.com)
- [Cloudflare Pages](https://pages.cloudflare.com)

## ディレクトリ構成

```
.
├── public/          # 静的アセット
├── src/
│   ├── components/  # コンポーネント（.astro / .tsx）
│   ├── pages/       # ルーティング対象のページ
│   ├── scripts/     # .astroから読み込むTypeScript
│   └── styles/      # グローバルCSS
└── astro.config.mjs
```

## コマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド
npm run preview  # ビルド結果のプレビュー
```

## 工夫したこと

実装の多くはAIを活用していますが、以下のような設計・品質面の判断は自分で行いました。

- **デザインとフレームワークの分離**: v0で生成したデザイン（[v0-portfolio](https://github.com/l4na-git/v0-portfolio)）をそのまま使わず、静的コンポーネントとインタラクティブコンポーネントを分離する構成に再設計し、AIに実装を依頼する際の一貫した基準とした。
- **技術スタックの選定理由**: 静的サイトとして高速に配信でき、ビルド構成もシンプルなAstroを採用。ホスティングはコストとパフォーマンスに加え、PR単位でプレビューURLが自動発行される点が確認作業の効率化につながると考えCloudflare Pagesを選定した。
