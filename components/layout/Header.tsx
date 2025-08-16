'use client';

import { useState } from 'react';
import { Image as ImageIcon, Menu, X, Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ImageURL - Free Image to URL Converter
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Image Hosting Features
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
              FAQ - How to Convert Images to URLs
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About Free Image Uploader
            </a>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Image Hosting Features
              </a>
              <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
                FAQ - How to Convert Images to URLs
              </a>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
                About Free Image Uploader
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}