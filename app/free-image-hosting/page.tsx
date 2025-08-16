import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, Globe, Shield, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import UploadZone from '@/components/upload/UploadZone';
import StructuredData from '@/components/seo/StructuredData';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata(
  'Free Image Hosting Service - Unlimited Image Uploads | ImageURL',
  'Best free image hosting service with unlimited uploads. Secure image hosting platform with permanent links, global CDN, and no signup required. Upload images for free.',
  '/free-image-hosting',
  [
    'unlimited image uploads',
    'free image storage',
    'secure image hosting',
    'permanent image links',
    'no signup image hosting',
    'anonymous image hosting',
    'ad-free image hosting',
    'reliable image hosting',
    'public image hosting platform'
  ]
);

export default function FreeImageHostingPage() {
  return (
    <>
      <StructuredData type="service" />
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Free Image Hosting Service
              <br />
              Unlimited Uploads Forever
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Best free image hosting platform with unlimited image uploads, permanent links, and global CDN delivery. 
              No signup required - start hosting images for free instantly with our secure image hosting service.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Start Free Image Hosting
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Upload Images for Free - No Limits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the best free image hosting service with unlimited uploads, secure storage, and instant access to your images.
            </p>
          </div>
          <UploadZone />
        </section>

        {/* Features Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold">Why Choose Our Free Image Hosting Platform?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Reliable, secure, and completely free image hosting with professional features.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Unlimited Free Uploads</h3>
                <p className="text-muted-foreground">
                  Upload as many images as you want with no limits. Our free image storage service never expires.
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Global CDN Network</h3>
                <p className="text-muted-foreground">
                  Fast image delivery worldwide through 275+ data centers. Your images load instantly everywhere.
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Image Hosting</h3>
                <p className="text-muted-foreground">
                  Enterprise-grade security protects your images. Anonymous image hosting available for privacy.
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Signup Required</h3>
                <p className="text-muted-foreground">
                  Start using our free image hosting immediately. No registration, no ads, just pure image hosting.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Free Image Hosting Benefits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover why thousands choose our platform for their free image hosting needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Permanent Image Links</h3>
              <p className="text-muted-foreground">
                Get permanent image links that never expire. Perfect for forums, blogs, and social media sharing. 
                Our reliable image hosting ensures your links always work.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Ad-Free Experience</h3>
              <p className="text-muted-foreground">
                Enjoy completely ad-free image hosting. No annoying advertisements, just clean and fast image uploads 
                with professional quality service.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">High-Quality Image Storage</h3>
              <p className="text-muted-foreground">
                Upload images up to 10MB with automatic optimization. Supports JPG, PNG, GIF, WEBP, and SVG formats 
                with quality preservation.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Public Image Hosting</h3>
              <p className="text-muted-foreground">
                Share your images publicly with hotlink support. Perfect for embedding in websites, forums, 
                and social media platforms.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold">Start Your Free Image Hosting Today</h2>
              <p className="text-xl text-muted-foreground">
                Join thousands who trust our free image hosting service. Upload your first image and experience 
                the best free image storage platform available.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Upload Images Free Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
