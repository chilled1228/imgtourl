import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ImageURL - Convert Images to Shareable URLs',
  description: 'Upload images and get shareable URLs instantly. Fast, secure, and reliable image hosting with Cloudflare R2.',
  keywords: ['image upload', 'image hosting', 'url converter', 'cloudflare r2', 'image sharing'],
  authors: [{ name: 'ImageURL Team' }],
  creator: 'ImageURL',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'ImageURL',
    title: 'ImageURL - Convert Images to Shareable URLs',
    description: 'Upload images and get shareable URLs instantly. Fast, secure, and reliable image hosting.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImageURL - Convert Images to Shareable URLs',
    description: 'Upload images and get shareable URLs instantly. Fast, secure, and reliable image hosting.',
    creator: '@imageurl',
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}