import { ArrowRight, Shield, Zap, Globe, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ScrollButton from '@/components/ui/scroll-button';
import UploadZone from '@/components/upload/UploadZone';
import Stats from '@/components/ui/stats';
import FAQ from '@/components/seo/FAQ';
import StructuredData from '@/components/seo/StructuredData';
import PerformanceOptimizer from '@/components/performance/PerformanceOptimizer';

export default function Home() {
  return (
    <>
      <PerformanceOptimizer />
      <StructuredData type="service" />
      <StructuredData type="faq" />
      <div className="space-y-16">
      {/* Hero Section - Redesigned for clarity */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Main Headline - Simplified and scannable */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Turn Your Images Into
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Shareable Links
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Upload any image and get a link to share instantly
            </p>
          </div>

          {/* Value Proposition - Clear and simple */}
          <div className="bg-muted/30 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm md:text-base">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">100% Free</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">No Sign-up Required</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-muted-foreground">Instant Results</span>
              </div>
            </div>
          </div>

          {/* Primary CTA - More prominent */}
          <div className="space-y-4">
            <ScrollButton
              targetId="upload-section"
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-12 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Upload className="mr-3 w-6 h-6" />
              Upload Your Images Now
            </ScrollButton>
            <p className="text-sm text-muted-foreground">
              Drag & drop or click to browse • JPG, PNG, GIF, WEBP • Up to 10MB
            </p>
          </div>

          {/* SEO Content - Moved to less prominent position but preserved */}
          <div className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <p>
              Free image hosting service with instant URL generation. Best free image to URL converter for
              social media, messaging, websites, forums, and sharing with friends and family.
              Drag & drop image uploader with unlimited free uploads.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Upload Section - Improved spacing and clarity */}
      <section id="upload-section" className="container mx-auto px-4 py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Start Uploading</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose your images and we'll create shareable links instantly.
            No account needed - just upload and share.
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <UploadZone />
        </div>
      </section>



      {/* Stats Section - Quick Overview */}
      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <Stats />
      </section>

      {/* Features Section - Simplified for better UX */}
      <section id="features" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Our Image Hosting?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and reliable. Everything you need to share images online.
            </p>
          </div>

          {/* Main Features - Simplified Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload images and get shareable links in seconds. Automatic optimization
                makes your images load faster everywhere.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Works Everywhere</h3>
              <p className="text-muted-foreground leading-relaxed">
                Global delivery network ensures your images load quickly worldwide.
                Perfect for social media, websites, and forums.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Safe & Secure</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your images are protected with enterprise-grade security.
                Upload anonymously if you prefer complete privacy.
              </p>
            </Card>
          </div>

          {/* Additional Benefits - Compact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold">Multiple Images</h4>
              <p className="text-sm text-muted-foreground">Upload several photos at once and get all your links together.</p>
            </div>

            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold">One-Click Sharing</h4>
              <p className="text-sm text-muted-foreground">Copy links instantly and share them anywhere you want.</p>
            </div>

            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold">Links Never Expire</h4>
              <p className="text-sm text-muted-foreground">Your image links work forever - no worries about broken links.</p>
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

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section - Simplified and more engaging */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Share Your Images?</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join thousands who trust our free image hosting service.
              Upload your first photo and get a shareable link in seconds!
            </p>
            <ScrollButton
              targetId="upload-section"
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-12 py-6 h-auto shadow-lg hover:shadow-xl button-hover"
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