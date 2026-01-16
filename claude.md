# アプリ構想

## 作りたいアプリ
簡単なToDoアプリ

## アプリの種類
Webアプリ

## 技術スタック

### Webサーバー側（Next.js アプリケーション）
- Next.js (App Router)：フレームワーク（画面表示 ＋ サーバー処理）
- TypeScript：コードの型定義（バグを減らし、開発を効率化）
- Tailwind CSS：デザイン・UIのスタイリング
- Lucide React：ToDoの「ゴミ箱」や「チェック」などのアイコン
- Zod：フォーム入力（ToDoの内容が空でないか等）のバリデーション

### DBサーバー側 (Docker コンテナ)
- PostgreSQL：データベース本体（ToDoのデータを保存）
- Docker：PC環境を汚さずにDBサーバーを起動・管理するツール

### WebとDBの連携ツール
- Prisma (ORM)：JavaScript/TypeScriptの書き方でDB操作を可能にするライブラリ
- .env.local (環境変数)：WebサーバーからDBサーバーに接続するための住所（URL）を管理


## ディレクトリ構造

```
.
├── src/                          # アプリケーションのソースコード
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # APIルート
│   │   │   └── todos/            # ToDo関連のAPIエンドポイント
│   │   ├── globals.css           # グローバルスタイル
│   │   ├── layout.tsx            # ルートレイアウト
│   │   └── page.tsx              # トップページ
│   ├── components/               # Reactコンポーネント
│   │   ├── TodoForm.tsx          # ToDoフォームコンポーネント
│   │   └── TodoItem.tsx          # ToDoアイテムコンポーネント
│   ├── lib/                      # ユーティリティライブラリ
│   │   ├── prisma.ts             # Prismaクライアント設定
│   │   └── validations.ts        # バリデーションスキーマ (Zod)
│   └── types/                    # TypeScript型定義
│       └── todo.ts               # ToDo関連の型定義
├── prisma/                       # Prisma関連ファイル
│   ├── migrations/               # データベースマイグレーション
│   │   └── 20260115135352_init/  # 初期マイグレーション
│   │       └── migration.sql
│   └── schema.prisma             # Prismaスキーマ定義
├── docs/                         # ドキュメント
│   ├── memo.md
│   ├── アプリ構想.md
│   ├── 改良案.md
│   ├── 実装計画.md
│   └── 初期指示.md
├── docker-compose.yml            # Docker Compose設定 (PostgreSQL)
├── .env.local                    # 環境変数 (DB接続情報等)
├── package.json                  # npm依存関係
├── tsconfig.json                 # TypeScript設定
├── tailwind.config.ts            # Tailwind CSS設定
├── next.config.ts                # Next.js設定
└── claude.md                     # このファイル
```


## 良く使うコマンド
- Dockerコンテナの管理
docker compose up -d    # 起動
docker compose down     # 停止
docker compose ps       # 状態確認

- ビルド
npm run build
npm start

- 開発サーバー起動
npm run dev

- Prisma Studio (データベースGUI)
npx prisma studio

