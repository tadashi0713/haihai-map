import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ハイハイマップ - 赤ちゃんが遊べる場所を探そう',
  description: '赤ちゃんがハイハイできるスペースを簡単に検索できる地図アプリ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
