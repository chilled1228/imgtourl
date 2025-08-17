import Script from 'next/script';

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  slug: string;
  category: string;
  tags: string[];
}

interface StructuredDataProps {
  type?: 'website' | 'service' | 'faq' | 'blog' | 'article';
  data?: BlogPost;
}

export default function StructuredData({ type = 'website', data }: StructuredDataProps) {
  const getWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ImageURL - Image to URL Converter",
    "alternateName": "Free Image to URL Tool",
    "url": process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud",
    "description": "Free image to URL converter tool. Upload any photo and get a web link instantly. Simple, fast, and works everywhere. Turn photos into shareable links in seconds.",
    "keywords": "image to url, image to url converter, convert image to url, photo to url, turn image into link, free image to url, photo link generator",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ImageURL",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}/logo.png`
      }
    }
  });

  const getServiceSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Image to URL Converter",
    "description": "Easy image to URL converter tool. Upload any photo and get a web link instantly. Free, simple, and works everywhere. Turn your pictures into shareable links in seconds.",
    "provider": {
      "@type": "Organization",
      "name": "ImageURL",
      "url": process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"
    },
    "serviceType": "Image to URL Converter",
    "category": "Web Tool",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free image to URL conversion with unlimited uploads"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Image Hosting Features",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Image to URL Converter",
            "description": "Turn photos into web links instantly with easy upload"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Multiple Photo to URL",
            "description": "Upload many photos at once and get web links for all"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Safe Photo Upload",
            "description": "Keep your photos safe and secure when creating web links"
          }
        }
      ]
    },
    "areaServed": "Worldwide",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud",
      "serviceSmsNumber": null,
      "servicePhone": null
    }
  });

  const getFAQSchema = () => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I turn my photo into a URL for free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Turning photos into URLs is completely free and easy! Just drag your picture into our upload area or click to choose a file from your computer. Our image to URL converter will give you a web link in seconds. No need to sign up or create an account."
        }
      },
      {
        "@type": "Question",
        "name": "What's the best way to get a link for my image?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our free image to URL tool is the easiest way to get links for your pictures. You can upload any photo type (JPG, PNG, GIF, etc.) and get a permanent web link that works everywhere. Just upload and copy your link - it's that simple!"
        }
      },
      {
        "@type": "Question",
        "name": "Can I share my photos online without creating an account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can upload and share photos without any account. Just upload your picture (up to 10MB), get your web link instantly, and share it anywhere you want. Perfect for social media, messaging, or showing photos to friends and family."
        }
      },
      {
        "@type": "Question",
        "name": "How to host images for blog with no registration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Host images for your blog without any registration using our no signup image upload service. Simply upload your photos, get permanent image links, and embed them directly in your blog posts."
        }
      },
      {
        "@type": "Question",
        "name": "How to convert JPG to URL online instantly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Convert JPG to URL online instantly using our JPG to URL converter. Simply upload your JPG file, and our system will generate a shareable URL within seconds with automatic optimization."
        }
      }
    ]
  });

  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ImageURL",
    "alternateName": "Free Image Hosting Service",
    "url": process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud",
    "logo": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}/logo.png`,
    "description": "Leading free image hosting service providing instant URL generation for images. Best image to URL converter with unlimited free uploads.",
    "foundingDate": "2025",
    "sameAs": [
      "https://twitter.com/imageurl",
      "https://github.com/imageurl"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English"
    }
  });

  const getSoftwareApplicationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ImageURL - Free Image to URL Converter",
    "operatingSystem": "Web Browser",
    "applicationCategory": "UtilitiesApplication",
    "description": "Free online image hosting tool that converts images to shareable URLs instantly. Upload photos and get permanent links with drag & drop interface.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Instant image link generator",
      "Drag & drop image upload",
      "Bulk image URL generator",
      "Secure image upload tool",
      "Anonymous image uploader",
      "Unlimited free image uploads",
      "Global CDN delivery",
      "Automatic image optimization"
    ],
    "screenshot": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}/screenshot.png`,
    "url": process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"
  });

  const getBlogSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "ImageURL Blog - Image Hosting Tips & Tutorials",
    "description": "Expert tips, tutorials, and best practices for image hosting, optimization, and sharing. Stay updated with the latest trends in digital asset management.",
    "url": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "ImageURL",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}/logo.png`
      }
    },
    "inLanguage": "en-US",
    "keywords": "image hosting, image optimization, url generation, web performance, digital asset management"
  });

  const getArticleSchema = () => {
    if (!data) return null;

    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": data.title,
      "description": data.excerpt,
      "author": {
        "@type": "Organization",
        "name": data.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "ImageURL",
        "logo": {
          "@type": "ImageObject",
          "url": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}/logo.png`
        }
      },
      "datePublished": data.publishedAt,
      "dateModified": data.publishedAt,
      "url": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}/blog/${data.slug}`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"}/blog/${data.slug}`
      },
      "articleSection": data.category,
      "keywords": data.tags.join(", "),
      "inLanguage": "en-US"
    };
  };

  const renderSchema = () => {
    switch (type) {
      case 'service':
        return [getServiceSchema(), getOrganizationSchema(), getSoftwareApplicationSchema()];
      case 'faq':
        return getFAQSchema();
      case 'blog':
        return [getBlogSchema(), getOrganizationSchema()];
      case 'article':
        const articleSchema = getArticleSchema();
        return articleSchema ? [articleSchema, getOrganizationSchema()] : [getOrganizationSchema()];
      default:
        return [getWebsiteSchema(), getOrganizationSchema(), getSoftwareApplicationSchema()];
    }
  };

  const schemas = renderSchema();
  const schemaArray = Array.isArray(schemas) ? schemas : [schemas];

  return (
    <>
      {schemaArray.map((schema, index) => (
        <Script
          key={index}
          id={`structured-data-${type}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}
