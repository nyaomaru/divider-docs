import '@/ui/global.css';

import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import { Header } from '@/ui/components/header';
import { Footer } from '@/ui/components/footer';
import { ScrollToTopButton } from '@/ui/components/scroll-to-top-button';

export const metadata: Metadata = {
  title: 'Divider',
  description: 'The documentation for the Divider library',
  keywords: 'Divider, Docs, OSS',
  openGraph: {
    title: 'Divider',
    description: 'The documentation for the Divider library',
    type: 'website',
    url: 'https://divider.vercel.app',
    images: [
      {
        url: 'https://divider.vercel.app/divider_logo_image.svg',
        width: 256,
        height: 256,
        alt: 'Divider Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divider',
    description: 'The documentation for the Divider library',
    images: ['https://divider.vercel.app/divider_logo_image.svg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <div className='min-h-screen'>
          <Header />
          {children}
          <ScrollToTopButton />
          <Footer />
        </div>
      </body>
    </html>
  );
}
