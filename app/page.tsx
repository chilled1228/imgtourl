import { ArrowRight, Shield, Zap, Globe, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            Free Image to URL Converter
            <br />
            Upload Images Get Links Instantly
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Best free image hosting service with instant URL generation. Upload photos and get shareable links instantly.
            Drag & drop image uploader with unlimited free uploads - perfect for social media, messaging, websites, forums, and sharing with friends and family.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-4"
              onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Uploading Images
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Primary Upload Section - Positioned for Immediate Access */}
      <section id="upload-section" className="container mx-auto px-4 pb-12 md:pb-16 bg-gradient-to-b from-background to-muted/20">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Upload Your Images - Get URLs Instantly</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simply drag and drop your photos or click to browse. Works with all common image formats
            and files up to 10MB. Get shareable URLs and HTML embed codes instantly.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <UploadZone />
        </div>
      </section>



      {/* Stats Section - Quick Overview */}
      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <Stats />
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Best Free Image Upload Tool - Why Choose Our Image Hosting Service?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fast image uploader with secure image upload tool features. Simple, reliable, and the best image hosting platform for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automatic Image Optimization</h3>
              <p className="text-muted-foreground">
                Our secure image upload tool automatically compresses images up to 70%
                while maintaining high quality image sharing standards.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global CDN - Fast Image Delivery</h3>
              <p className="text-muted-foreground">
                Instant image link generator with global CDN ensures your images load
                super fast anywhere in the world through 275+ data centers.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Image Upload Tool</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security protects your uploads with automatic backups.
                Anonymous image uploader option available for privacy.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bulk Image URL Generator</h3>
              <p className="text-muted-foreground">
                Upload multiple photos at once with our bulk image URL generator.
                Watch progress as images convert to URLs instantly.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">One Click Image Sharing</h3>
              <p className="text-muted-foreground">
                Get shareable image links instantly with one-click copying.
                Perfect for social media and instant image URL sharing.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Permanent Image Links</h3>
              <p className="text-muted-foreground">
                Reliable public image hosting platform with permanent image links
                that never expire. Always available when you need them.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold">Ready to Create Image URLs for Free?</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands who use our free image hosting service to convert images to URLs instantly.
            Upload your first photo and experience the best image URL generator tool online!
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            Start Free Image Upload Now
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>
      </div>
    </>
  );
}