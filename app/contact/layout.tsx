import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Image to URL Converter',
  description: 'Get in touch with our team for support, questions, or feedback. We\'re here to help you with our free image hosting service.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
