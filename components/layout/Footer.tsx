import { Image as ImageIcon, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ImageURL - Free Image Hosting
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Best free image to URL converter. Upload images get links instantly with our secure image upload tool.
              Perfect for social media, forums, and easy photo sharing.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-4">Free Image Hosting Features</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/free-image-hosting" className="text-muted-foreground hover:text-primary transition-colors">Free Image Hosting</a></li>
              <li><a href="/image-url-generator" className="text-muted-foreground hover:text-primary transition-colors">Image URL Generator</a></li>
              <li><a href="/bulk-image-upload" className="text-muted-foreground hover:text-primary transition-colors">Bulk Image Upload</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">Image Hosting FAQ</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Image Upload Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Free Image Hosting</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Image Support</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center text-sm text-muted-foreground">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for free image hosting and instant URL generation
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 ImageURL - Free Image to URL Converter. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}