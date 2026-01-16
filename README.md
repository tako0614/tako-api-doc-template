# tako-api-doc-template

Markdownファイルからドキュメントサイトを自動生成するFreshベースのテンプレートです。

## 特徴

- 📝 **Markdown駆動**: markdownsフォルダーにMarkdownファイルを配置するだけでドキュメントサイトを構築
- 🗂️ **ファイルシステムルーティング**: ディレクトリ構造がそのままURLに反映
- 🎨 **モダンなUI**: TailwindCSSとGitHubスタイルのMarkdown表示
- 🌙 **ダークモード対応**: ライト/ダークテーマに対応
- 📱 **レスポンシブ**: モバイルデバイスにも対応したデザイン
- ⚡ **高速**: Deno + Freshによる高速な開発とビルド

## 必要環境

- [Deno](https://deno.land/) 1.x 以上

## インストール

```bash
# リポジトリをクローン
git clone https://github.com/takoserver/tako-api-doc-template.git
cd tako-api-doc-template
```

## 使い方

### 開発サーバーの起動

```bash
deno task start
```

開発サーバーが起動し、`http://localhost:8000` でサイトにアクセスできます。
ファイルの変更は自動的に反映されます（ホットリロード）。

### ドキュメントの追加

`markdowns/` ディレクトリにMarkdownファイル（`.md`）を配置してください。

#### ファイル配置の例

```
markdowns/
├── Welcome.md              # http://localhost:8000/Welcome
├── api/
│   ├── overview.md         # http://localhost:8000/api/overview
│   └── takos/
│       └── v2/
│           ├── client/
│           │   └── test.md # http://localhost:8000/api/takos/v2/client/test
│           └── server/
│               └── test.md # http://localhost:8000/api/takos/v2/server/test
```

#### 重要な注意点

- ✅ ファイル拡張子は必ず `.md` を使用
- ❌ 動的ルート（`/api/[id]/tako` のような機能）は非対応
- ディレクトリ構造がそのままURLパスになります

### 本番ビルド

```bash
# ビルド
deno task build

# プレビュー
deno task preview
```

## その他のコマンド

```bash
# コードフォーマットとリント
deno task check

# マニフェストの更新
deno task manifest

# Freshのアップデート
deno task update
```

## プロジェクト構造

```
.
├── markdowns/          # Markdownドキュメントファイル
├── routes/             # Freshルート定義
│   ├── [...path].tsx   # 動的ルーティングハンドラー
│   └── index.tsx       # トップページ
├── islands/            # インタラクティブコンポーネント（クライアントサイド）
├── components/         # 静的コンポーネント
├── lib/                # ユーティリティとヘルパー関数
│   ├── fileStructure.ts # ファイル構造の解析
│   ├── sidebar.tsx     # サイドバーのレンダリング
│   └── types.ts        # 型定義
├── static/             # 静的ファイル（CSS、画像など）
├── deno.json           # Denoプロジェクト設定
├── fresh.config.ts     # Fresh設定
└── tailwind.config.ts  # Tailwind設定
```

## カスタマイズ

### ヘッダーリンクの変更

[routes/[...path].tsx](routes/[...path].tsx) の `<header>` セクションを編集してください。

### スタイルのカスタマイズ

- `tailwind.config.ts`: Tailwindの設定
- `static/styles.css`: カスタムCSS

### サイドバーのカスタマイズ

[lib/sidebar.tsx](lib/sidebar.tsx) で サイドバーの表示ロジックを変更できます。

## ライセンス

MIT

## リンク

- [Fresh Documentation](https://fresh.deno.dev/)
- [Deno Documentation](https://deno.land/manual)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
