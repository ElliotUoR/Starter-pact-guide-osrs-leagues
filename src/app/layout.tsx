import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OSRS Leagues 6 — Demonic Pacts Guide',
  description:
    'A step-by-step guide for the Demonic Pacts build in OSRS Leagues 6. Track all 40 pacts across Kandarin, Kourend, and Prifddinas.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-osrs-bg">
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
