import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import StructuredData from '@/components/seo/StructuredData';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Free Image to URL Converter - Upload Images Get Links Instantly',
  description: 'Free image hosting service with instant URL generation. Upload photos, get shareable links instantly. Drag & drop image uploader with unlimited free uploads. Best image URL generator tool online.',
  keywords: [
    'image to url converter',
    'free image hosting',
    'image url generator',
    'upload image get link',
    'convert image to url',
    'free image uploader',
    'image hosting service',
    'drag drop image upload',
    'generate image url',
    'free photo hosting',
    'image link creator',
    'online image converter',
    'url from image',
    'image to link converter',
    'free image storage',
    'instant image link generator',
    'shareable image link',
    'hotlink image hosting',
    'unlimited free image uploads',
    'secure image upload tool',
    'create image url online',
    'upload photo get url',
    'webp to url instantly',
    'bulk image url generator',
    'fast image uploader',
    'public image hosting platform',
    'permanent image links',
    'best image upload tool',
    'embed image url free',
    'high quality image sharing',
    'anonymous image uploader',
    'quick image hosting free',
    'jpg to url converter',
    'png to url online',
    'photo url generator tool',
    'easy online image hosting',
    'no signup image upload',
    'instant image url sharing',
    'ad-free image uploader',
    'one click image sharing'
  ],
  authors: [{ name: 'ImageURL Team' }],
  creator: 'ImageURL',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'ImageURL - Free Image to URL Converter',
    title: 'Free Image to URL Converter - Upload Images Get Links Instantly',
    description: 'Free image hosting service with instant URL generation. Upload photos, get shareable links instantly. Drag & drop image uploader with unlimited free uploads.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Image to URL Converter - Upload Images Get Links Instantly',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image to URL Converter - Upload Images Get Links Instantly',
    description: 'Free image hosting service with instant URL generation. Upload photos, get shareable links instantly. Best image URL generator tool online.',
    creator: '@imageurl',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'xquwz1jK5sqIiFN7vc0o5sYsBLBLyAa-1VwUBXV4wDo',
  },
  other: {
    'theme-color': '#3b82f6',
    'color-scheme': 'light dark',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="xquwz1jK5sqIiFN7vc0o5sYsBLBLyAa-1VwUBXV4wDo" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//imagetourl.cloud" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={inter.className}>
        <StructuredData type="website" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1" id="main-content">
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