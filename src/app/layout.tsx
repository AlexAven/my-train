import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/app/globals.css';
import Navigation from '@components/navigation/navigation';

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Моё первое приложение',
  description: 'Учебный проект на Next.js, TypeScript и CSS Modules',
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
        <main className="container page">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
