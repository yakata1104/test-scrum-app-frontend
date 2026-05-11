# scrum-frontend

スクラム開発支援アプリのフロントエンドアプリケーション。(自己学習用)

---

# 使用技術

- React
- TypeScript
- Vite
- Chakra UI

---

# フォルダ構成

````text
scrum-frontend/
├── public/                     # 静的ファイル
├── src/
│   ├── api/                    # API通信設定
│   ├── assets/                 # 画像・アイコンなど静的リソース
│   ├── components/
│   │   ├── atoms/              # 最小単位のUIコンポーネント
│   │   ├── molecules/          # atomsを組み合わせた小規模UI
│   │   ├── organisms/          # 機能単位のUIブロック
│   │   ├── templates/          # レイアウトテンプレート
│   │   └── pages/              # ページ単位のコンポーネント
│   ├── hooks/                  # カスタムhooks
│   ├── layouts/                # 共通レイアウト
│   ├── providers/              # Context Provider
│   ├── routes/                 # React Router定義
│   ├── services/               # API呼び出し処理
│   ├── styles/                 # themeやグローバルスタイル
│   ├── types/                  # TypeScript型定義
│   ├── utils/                  # 共通関数
│   ├── App.tsx                 # アプリケーションルート
│   └── main.tsx                # エントリポイント
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

---

# セットアップ

## 1. パッケージインストール

### 初回構築
```bash
npm ci
````

### 依存追加時

```bash
npm install <package>
```

## 2. 開発サーバ起動

```bash
npm run dev
```

## 2. build

```bash
npm run build
```
