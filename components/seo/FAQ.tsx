'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FAQItem {
  question: string;
  answer: string;
  keywords: string[];
}

const faqData: FAQItem[] = [
  {
    question: "How to convert photo to url free?",
    answer: "Converting photos to URLs is completely free with our image hosting service. Simply drag and drop your image into our upload zone, or click to browse and select your photo. Our instant image link generator will process your upload and provide you with a shareable URL within seconds. No registration required for this free image uploader.",
    keywords: ["convert photo to url free", "image hosting service", "instant image link generator", "free image uploader"]
  },
  {
    question: "What is the best tool for instant image links?",
    answer: "Our free image to URL converter is the best tool for creating instant image links. It offers unlimited free image uploads, supports all major formats (JPG, PNG, GIF, WEBP, SVG), and provides permanent image links with global CDN delivery. The drag & drop image upload interface makes it the easiest online image converter available.",
    keywords: ["best tool for instant image links", "free image to URL converter", "unlimited free image uploads", "drag & drop image upload"]
  },
  {
    question: "How can I get a free service to upload and share images?",
    answer: "Our platform provides a completely free image hosting service with no signup required. Upload images up to 10MB each, get shareable image links instantly, and enjoy unlimited free uploads. This anonymous image uploader is perfect for social media sharing, forum posts, and creating embed image URLs for websites.",
    keywords: ["free service to upload and share image", "free image hosting service", "shareable image links", "anonymous image uploader"]
  },
  {
    question: "How to host images for blog with no registration?",
    answer: "Host images for your blog without any registration using our no signup image upload service. Simply upload your photos, get permanent image links, and embed them directly in your blog posts. Our public image hosting platform provides reliable hotlink image hosting with high quality image sharing capabilities.",
    keywords: ["host image for blog no registration", "no signup image upload", "permanent image links", "public image hosting platform"]
  },
  {
    question: "How to upload art/photo and get a shareable link?",
    answer: "Upload your art or photos using our fast image uploader and get shareable links instantly. Our secure image upload tool preserves image quality while providing you with multiple sharing options including direct URLs, HTML embed codes, and social media sharing links. Perfect for artists and photographers who need quick image hosting.",
    keywords: ["upload art/photo and get a shareable link", "fast image uploader", "secure image upload tool", "quick image hosting"]
  },
  {
    question: "Is there free hosting for large image files?",
    answer: "Yes! Our free image storage service supports files up to 10MB each with unlimited uploads. We provide free hosting for large image files with automatic compression to optimize loading times while maintaining quality. This makes us the best image upload tool for high-resolution photos and detailed artwork.",
    keywords: ["free hosting for large image files", "free image storage", "best image upload tool", "unlimited uploads"]
  },
  {
    question: "How to get free public image URLs for forum users?",
    answer: "Forum users can easily get free public image URLs by using our image link creator. Upload your images, receive instant URLs that work perfectly in forum posts, and enjoy ad-free image hosting. Our service provides reliable image hosting for forums with permanent links that won't expire.",
    keywords: ["free public image url for forum users", "image link creator", "ad-free image hosting", "permanent links"]
  },
  {
    question: "What's the best drag and drop image uploader for web developers?",
    answer: "Our drag and drop image uploader is designed specifically for web developers who need reliable image hosting. It provides clean URLs, supports hotlinking, offers bulk image URL generation, and includes API-friendly features. The service delivers images through a global CDN for optimal performance.",
    keywords: ["drag and drop image uploader for web developers", "bulk image URL generation", "hotlinking", "global CDN"]
  },
  {
    question: "How to convert JPG to URL online instantly?",
    answer: "Convert JPG to URL online instantly using our JPG to URL converter. Simply upload your JPG file, and our system will generate a shareable URL within seconds. The process includes automatic optimization to reduce file size while maintaining image quality, making it perfect for web use.",
    keywords: ["jpg to url converter", "convert JPG to URL online", "automatic optimization", "web use"]
  },
  {
    question: "How to convert PNG to URL online for free?",
    answer: "Converting PNG to URL online is completely free with our PNG to URL converter. Upload your PNG files and get instant shareable links. Our service preserves PNG transparency and provides high-quality image sharing with permanent URLs that work across all platforms and devices.",
    keywords: ["png to url online", "PNG to URL converter", "preserve transparency", "high-quality image sharing"]
  },
  {
    question: "What is the best photo URL generator tool?",
    answer: "Our photo URL generator tool is the best choice for creating shareable photo links. It offers one-click image sharing, supports all image formats, provides instant image URL sharing, and includes features like QR code generation and social media integration for easy photo sharing.",
    keywords: ["photo url generator tool", "one-click image sharing", "instant image URL sharing", "QR code generation"]
  },
  {
    question: "How to find easy online image hosting with no ads?",
    answer: "Our platform provides easy online image hosting with completely ad-free experience. Enjoy clean, fast image uploads without any advertisements cluttering your experience. This ad-free image uploader focuses purely on providing the best image hosting service without distractions.",
    keywords: ["easy online image hosting", "ad-free experience", "ad-free image uploader", "clean interface"]
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Frequently Asked Questions - Free Image Hosting & URL Generator</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Common questions about our free image to URL converter, image hosting service, and how to upload images get links instantly.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="text-lg font-semibold pr-4">{item.question}</h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t">
                    <p className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Still have questions about our free image hosting service? 
            <a href="#contact" className="text-primary hover:underline ml-1">Contact us</a> for help with image URL generation.
          </p>
        </div>
      </div>
    </section>
  );
}
