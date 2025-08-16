import { ArrowRight, Shield, Zap, Globe, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import UploadZone from '@/components/upload/UploadZone';
import Stats from '@/components/ui/stats';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            Convert Images to
            <br />
            Shareable URLs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your images and get instant, shareable URLs. Fast, secure, and reliable image hosting 
            powered by Cloudflare R2 with automatic optimization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              Start Uploading
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg">
              View API Docs
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16">
          <Stats />
        </div>
      </section>

      {/* Upload Section */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Upload Your Images</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Drag and drop your images or click to browse. We support JPG, PNG, GIF, WEBP, and SVG formats 
            up to 10MB per file.
          </p>
        </div>
        <UploadZone />
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for professional image hosting and sharing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automatic Optimization</h3>
              <p className="text-muted-foreground">
                Images are automatically compressed and optimized without losing quality, 
                reducing file sizes by up to 70%.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global CDN</h3>
              <p className="text-muted-foreground">
                Your images are served from Cloudflare's global network of 275+ 
                data centers for lightning-fast loading times.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-muted-foreground">
                Built on Cloudflare R2 with enterprise-grade security, 99.9% uptime SLA, 
                and automatic backups.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Batch Upload</h3>
              <p className="text-muted-foreground">
                Upload multiple images at once with drag-and-drop functionality 
                and real-time progress tracking.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant URLs</h3>
              <p className="text-muted-foreground">
                Get shareable URLs immediately after upload with one-click copy 
                to clipboard functionality.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rate Limiting</h3>
              <p className="text-muted-foreground">
                Built-in rate limiting and abuse prevention to ensure fair usage 
                and maintain service quality.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of users who trust ImageURL for their image hosting needs.
            Upload your first image now and experience the difference.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            Upload Your First Image
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}