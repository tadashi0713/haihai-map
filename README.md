# ハイハイマップ

赤ちゃんがハイハイできるスペースを簡単に検索できる地図アプリです。

## 特徴

- 🗺️ インタラクティブな地図表示（Leaflet使用）
- 🔍 場所名、住所、説明による検索機能
- 🏷️ カテゴリーと設備によるフィルタリング
- 📍 施設の詳細情報表示
- 📱 レスポンシブデザイン（PC・スマホ対応）
- 🚀 Vercelへのデプロイ対応

## 施設カテゴリー

- 子育て支援センター
- 児童館・コミュニティセンター
- 公園
- ショッピングモール
- カフェ
- 図書館

## 設備・特徴フィルター

- ハイハイスペース
- 授乳室
- おむつ替え台
- 駐車場
- ベビーカーOK
- おもちゃあり
- 屋内/屋外
- 無料
- 冷暖房完備

## 開発環境のセットアップ

### 必要な環境

- Node.js 18以上
- npm

### インストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### ビルド

```bash
npm run build
npm start
```

## Vercelへのデプロイ

### 方法1: Vercel CLIを使用

```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ
vercel
```

### 方法2: GitHubリポジトリとの連携

1. GitHubにリポジトリをプッシュ
2. [Vercel](https://vercel.com)にログイン
3. 「New Project」をクリック
4. GitHubリポジトリを選択
5. 「Deploy」をクリック

Vercelが自動的にNext.jsプロジェクトを検出し、適切な設定でデプロイします。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **地図**: Leaflet + React Leaflet
- **デプロイ**: Vercel

## プロジェクト構造

```
haihai-map/
├── app/                  # Next.js App Router
│   ├── layout.tsx       # ルートレイアウト
│   ├── page.tsx         # メインページ
│   └── globals.css      # グローバルスタイル
├── components/          # Reactコンポーネント
│   ├── Map.tsx          # 地図コンポーネント
│   ├── SpaceCard.tsx    # 施設カード
│   ├── SpaceDetail.tsx  # 施設詳細モーダル
│   └── FilterPanel.tsx  # フィルターパネル
├── data/                # データ
│   └── spaces.ts        # 施設データ
├── types/               # TypeScript型定義
│   └── space.ts         # 施設型定義
└── public/              # 静的ファイル
```

## データの追加方法

`data/spaces.ts` ファイルに新しい施設を追加できます：

```typescript
{
  id: '9',
  name: '施設名',
  description: '施設の説明',
  latitude: 35.6762,
  longitude: 139.6503,
  address: '住所',
  category: 'child_center',
  features: ['crawling_space', 'nursing_room'],
  openingHours: '9:00-17:00',
  phone: '03-1234-5678',
  rating: 4.5,
}
```

## ライセンス

ISC

## 貢献

プルリクエストを歓迎します。大きな変更の場合は、まずissueを開いて変更内容を議論してください。
