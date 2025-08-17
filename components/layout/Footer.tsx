import { Image as ImageIcon, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand - Simplified */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">ImageURL</span>
                <p className="text-sm text-brand-blue-gray">Free Image Hosting</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              The easiest way to turn your images into shareable links.
              Upload photos and get links instantly - completely free, no signup required.
            </p>
          </div>

          {/* Quick Links - Simplified */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/free-image-hosting" className="text-brand-blue-gray hover:text-brand-orange transition-colors">Free Hosting</a></li>
              <li><a href="/image-url-generator" className="text-brand-blue-gray hover:text-brand-orange transition-colors">URL Generator</a></li>
              <li><a href="/bulk-image-upload" className="text-brand-blue-gray hover:text-brand-orange transition-colors">Bulk Upload</a></li>
              <li><a href="#faq" className="text-brand-blue-gray hover:text-brand-orange transition-colors">Help & FAQ</a></li>
            </ul>
          </div>

          {/* Support & Legal - Combined */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-brand-blue-gray hover:text-brand-orange transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-brand-blue-gray hover:text-brand-orange transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-brand-blue-gray hover:text-brand-orange transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-brand-blue-gray hover:text-brand-orange transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center text-sm text-muted-foreground">
            Made with <Heart className="w-4 h-4 mx-1 text-brand-orange" /> for easy image sharing
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 ImageURL. All rights reserved.
          </div>
        </div>

        {/* SEO content preserved but less prominent */}
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-xs text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Best free image to URL converter with secure image upload tool features. Perfect for social media,
            forums, and easy photo sharing with instant URL generation and free image hosting service.
          </p>
        </div>
      </div>
    </footer>
  );
}