import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo-utils';

export const metadata: Metadata = generateMetadata({
  title: 'Media Management - File Manager & Asset Library | ImageURL',
  description: 'Manage your uploaded files and images with our advanced media manager. Organize, search, and track all your digital assets in one place.',
  keywords: ['media management', 'file manager', 'asset library', 'digital asset management', 'file organizer', 'media library'],
  canonical: '/media',
  ogType: 'website',
  ogImage: '/og-image-media-management.jpg'
});

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}