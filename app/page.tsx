import { ArrowRight, Shield, Zap, Globe, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ScrollButton from '@/components/ui/scroll-button';
import UploadZone from '@/components/upload/UploadZone';
import Stats from '@/components/ui/stats';
import FAQ from '@/components/seo/FAQ';
import StructuredData from '@/components/seo/StructuredData';
import PerformanceOptimizer from '@/components/performance/PerformanceOptimizer';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <PerformanceOptimizer />
      <StructuredData type="service" />
      <StructuredData type="faq" />
      <div className="space-y-16">
      {/* Hero Section with Upload Zone - Simplified and Above Fold */}
      <section className="container mx-auto px-4 py-8 md:py-12 min-h-[80vh] flex flex-col justify-center">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Simplified Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Turn Your Images Into
              <span className="block text-brand-orange">
                Shareable Links
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Upload any image and get a link to share instantly
            </p>
          </div>

          {/* Key Benefits - Simplified */}
          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
              <span className="text-brand-blue-gray font-medium">100% Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-brand-blue-gray rounded-full"></div>
              <span className="text-brand-blue-gray font-medium">No Sign-up</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
              <span className="text-brand-blue-gray font-medium">Instant Results</span>
            </div>
          </div>

          {/* Upload Zone - Now Above Fold */}
          <div id="upload-section" className="max-w-3xl mx-auto">
            <UploadZone />
          </div>

          {/* File Format Info */}
          <p className="text-sm text-muted-foreground">
            Supports: JPG, PNG, GIF, WEBP, SVG • Max size: 10MB • Unlimited uploads
          </p>
        </div>
      </section>



      {/* Stats Section - Quick Overview */}
      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <Stats />
      </section>

      {/* Features Section - Flat design with solid background */}
      <section id="features" className="bg-brand-beige/30 dark:bg-brand-blue-gray/10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Our Image Hosting?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and reliable. Everything you need to share images online.
            </p>
          </div>

          {/* Main Features - Simplified Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 text-center transition-colors duration-200 border border-brand-beige/50 dark:border-brand-blue-gray/20 bg-white dark:bg-brand-blue-gray/5 hover:bg-brand-beige/20 dark:hover:bg-brand-blue-gray/10">
              <div className="mx-auto w-16 h-16 bg-brand-orange rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Lightning Fast</h3>
              <p className="text-brand-blue-gray leading-relaxed">
                Upload images and get shareable links in seconds. Automatic optimization
                makes your images load faster everywhere.
              </p>
            </Card>

            <Card className="p-8 text-center transition-colors duration-200 border border-brand-beige/50 dark:border-brand-blue-gray/20 bg-white dark:bg-brand-blue-gray/5 hover:bg-brand-beige/20 dark:hover:bg-brand-blue-gray/10">
              <div className="mx-auto w-16 h-16 bg-brand-blue-gray rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Works Everywhere</h3>
              <p className="text-brand-blue-gray leading-relaxed">
                Global delivery network ensures your images load quickly worldwide.
                Perfect for social media, websites, and forums.
              </p>
            </Card>

            <Card className="p-8 text-center transition-colors duration-200 border border-brand-beige/50 dark:border-brand-blue-gray/20 bg-white dark:bg-brand-blue-gray/5 hover:bg-brand-beige/20 dark:hover:bg-brand-blue-gray/10">
              <div className="mx-auto w-16 h-16 bg-brand-orange rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Safe & Secure</h3>
              <p className="text-brand-blue-gray leading-relaxed">
                Your images are protected with enterprise-grade security.
                Upload anonymously if you prefer complete privacy.
              </p>
            </Card>
          </div>

          {/* Additional Benefits - Compact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-foreground">Multiple Images</h4>
              <p className="text-sm text-brand-blue-gray">Upload several photos at once and get all your links together.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-brand-blue-gray rounded-lg flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-foreground">One-Click Sharing</h4>
              <p className="text-sm text-brand-blue-gray">Copy links instantly and share them anywhere you want.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-foreground">Links Never Expire</h4>
              <p className="text-sm text-brand-blue-gray">Your image links work forever - no worries about broken links.</p>
            </div>
          </div>

          {/* SEO Content - Preserved but less prominent */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Best free image upload tool with secure image upload features. Fast image uploader with
              instant image link generator, bulk image URL generator, and reliable public image hosting platform.
              Perfect for anonymous image uploader needs with high quality image sharing and permanent image links.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Learn More About Image Hosting</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover expert tips, tutorials, and best practices for image optimization, hosting, and sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-3 text-foreground">
              <Link href="/blog/image-optimization-guide-2024" className="hover:text-brand-orange transition-colors">
                Complete Guide to Image Optimization for Web in 2024
              </Link>
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Learn the latest techniques for optimizing images for web performance, including format selection and compression.
            </p>
            <Link href="/blog/image-optimization-guide-2024" className="text-brand-orange hover:text-brand-orange/80 text-sm font-medium">
              Read More →
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-3 text-foreground">
              <Link href="/blog/best-image-hosting-practices" className="hover:text-brand-orange transition-colors">
                Best Practices for Free Image Hosting
              </Link>
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Discover essential practices for reliable image hosting, including security, performance, and service selection.
            </p>
            <Link href="/blog/best-image-hosting-practices" className="text-brand-orange hover:text-brand-orange/80 text-sm font-medium">
              Read More →
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-3 text-foreground">
              <Link href="/blog/url-shortening-benefits" className="hover:text-brand-orange transition-colors">
                Why URL Shortening Matters for Image Sharing
              </Link>
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Understand the benefits of URL shortening for image links and improved user experience.
            </p>
            <Link href="/blog/url-shortening-benefits" className="text-brand-orange hover:text-brand-orange/80 text-sm font-medium">
              Read More →
            </Link>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/blog">
            <Button variant="outline" className="border-brand-orange/30 hover:border-brand-orange hover:bg-brand-orange/10">
              View All Articles
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section - Flat design with brand colors */}
      <section className="bg-brand-beige/40 dark:bg-brand-blue-gray/10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ready to Share Your Images?</h2>
            <p className="text-xl text-brand-blue-gray leading-relaxed">
              Join thousands who trust our free image hosting service.
              Upload your first photo and get a shareable link in seconds!
            </p>
            <ScrollButton
              targetId="upload-section"
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg px-12 py-6 h-auto transition-colors duration-200 border-0"
            >
              <Upload className="mr-3 w-6 h-6" />
              Start Uploading Now
            </ScrollButton>

            {/* SEO content preserved but less prominent */}
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Best image URL generator tool online for converting images to URLs instantly with our
              free image hosting service and unlimited uploads.
            </p>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}