import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/app/globals.css';
import Navigation from '@/components/navigation/navigation';
import Footer from '@/components/footer/footer';

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Царь-Тудушка',
  description: 'Проект для тренировки работы со стеком TS + React + Next.js',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <Navigation />
        <div className="bg-grid"></div>
        <main className="container page">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
