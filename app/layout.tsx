import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://nazarenko.design'),
  title: {
    default: 'Nazarenko Architects | Архитектура и дизайн интерьеров',
    template: '%s | Nazarenko Architects',
  },
  description:
    'Евгений Назаренко — архитектор и дизайнер интерьеров. Проектирование частных домов, интерьеров и архитектурных пространств премиум-класса.',
  keywords: [
    'архитектор',
    'дизайнер интерьеров',
    'проектирование домов',
    'премиум интерьеры',
    'архитектура Москвы',
    'Nazarenko Architects',
  ],
  authors: [{ name: 'Евгений Назаренко' }],
  creator: 'Nazarenko Architects',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://nazarenko.design',
    siteName: 'Nazarenko Architects',
    title: 'Nazarenko Architects | Архитектура и дизайн интерьеров',
    description:
      'Евгений Назаренко — архитектор и дизайнер интерьеров. Проектирование частных домов, интерьеров и архитектурных пространств премиум-класса.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nazarenko Architects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nazarenko Architects | Архитектура и дизайн интерьеров',
    description:
      'Евгений Назаренко — архитектор и дизайнер интерьеров. Проектирование частных домов, интерьеров и архитектурных пространств премиум-класса.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
