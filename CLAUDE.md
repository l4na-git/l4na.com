# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド
npm run preview  # ビルド結果のプレビュー
```

## アーキテクチャ

l4na.com のポートフォリオサイト。Astro + React + Tailwind CSS v4 で構成。

### コンポーネントの分け方

**静的コンポーネント → `.astro`**
インタラクションのないセクションは Astro コンポーネントで実装する。

**インタラクティブコンポーネント → `.tsx`（React）**
`useState` / `useEffect` が必要な場合は React コンポーネントとして実装し、使用箇所で `client:load` を指定してハイドレートする。

```astro
<TerminalUI client:load />
```

### スクリプトの分離

Astro コンポーネント内のスクリプトは `src/scripts/` に分離し、`<script>` タグ内で `import` して参照する。Astro が TypeScript ごとバンドルする。

```astro
<script>
  import '../scripts/header.ts'
</script>
```

`src` 属性で直接 TypeScript ファイルを参照する方法（`<script src="/src/...">` は本番ビルドで壊れるため使わない。

### カラーシステム

`src/styles/global.css` で CSS 変数を定義し、`@theme inline` ブロックで Tailwind のユーティリティクラスとして登録している。

カスタムカラー（`text-sky-dark`、`bg-sky-medium`、`text-navy` 等）は `--sky-light`、`--sky-medium`、`--sky-dark`、`--navy` の4変数から来ている。新しいカラーを追加する場合は `:root` に変数を追加し、`@theme inline` にも `--color-*: var(--*)` の形で登録する。

### 移行元

[v0-portfolio](https://github.com/l4na-git/v0-portfolio) が Next.js + React の元プロジェクト。コンポーネントをこのリポジトリに順次移植している。
