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
  title: 'Image to URL Converter - Turn Photos Into Web Links Free',
  description: 'Free image to URL converter tool. Upload any photo and get a web link instantly. Simple, fast, and works everywhere. No account needed - convert images to URLs in seconds.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#FF7A30' },
    ],
  },
  manifest: '/site.webmanifest',
  keywords: [
    'image to url',
    'image to url converter',
    'convert image to url',
    'photo to url',
    'picture to link',
    'free image to url',
    'turn image into link',
    'image link generator',
    'photo link creator',
    'upload image get url',
    'image to web link',
    'convert photo to url',
    'free image converter',
    'image url maker',
    'picture url generator',
    'photo to web link',
    'image hosting',
    'free image hosting',
    'upload photos online',
    'share images online',
    'image sharing tool',
    'photo sharing service',
    'web image links',
    'online image converter',
    'instant image links',
    'permanent image links',
    'shareable photo links',
    'easy image sharing',
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
    siteName: 'ImageURL - Image to URL Converter',
    title: 'Image to URL Converter - Turn Photos Into Web Links Free',
    description: 'Free image to URL converter tool. Upload any photo and get a web link instantly. Simple, fast, and works everywhere. No account needed.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Image to URL Converter - Turn Photos Into Web Links Free',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image to URL Converter - Turn Photos Into Web Links Free',
    description: 'Free image to URL converter tool. Upload any photo and get a web link instantly. Simple, fast, and works everywhere.',
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
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EWZ02BR7J5"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EWZ02BR7J5');
            `,
          }}
        />
        <meta name="google-site-verification" content="xquwz1jK5sqIiFN7vc0o5sYsBLBLyAa-1VwUBXV4wDo" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//imagetourl.cloud" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#FF7A30" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={inter.className}>
        {/* Skip Links for Screen Readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-orange focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        <a
          href="#upload-section"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-40 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-orange focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to upload
        </a>

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