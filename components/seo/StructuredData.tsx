import Script from 'next/script';

interface StructuredDataProps {
  type?: 'website' | 'service' | 'faq';
}

export default function StructuredData({ type = 'website' }: StructuredDataProps) {
  const getWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ImageURL - Free Image to URL Converter",
    "alternateName": "Free Image Hosting Service",
    "url": process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud",
    "description": "Free image hosting service with instant URL generation. Upload photos, get shareable links instantly. Best image to URL converter tool online.",
    "keywords": "image to url converter, free image hosting, image url generator, upload image get link, convert image to url, free image uploader, image hosting service, drag drop image upload",
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
    "name": "Free Image to URL Converter",
    "description": "Professional image hosting service that converts images to shareable URLs instantly. Upload photos and get permanent links with unlimited free uploads.",
    "provider": {
      "@type": "Organization",
      "name": "ImageURL",
      "url": process.env.NEXT_PUBLIC_APP_URL || "https://imagetourl.cloud"
    },
    "serviceType": "Image Hosting Service",
    "category": "Web Service",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free image hosting with unlimited uploads"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Image Hosting Features",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Instant Image Link Generator",
            "description": "Convert images to URLs instantly with drag & drop upload"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Bulk Image URL Generator",
            "description": "Upload multiple images and generate URLs in batch"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Secure Image Upload Tool",
            "description": "Enterprise-grade security for safe image hosting"
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
        "name": "How to convert photo to url free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Converting photos to URLs is completely free with our image hosting service. Simply drag and drop your image into our upload zone, or click to browse and select your photo. Our instant image link generator will process your upload and provide you with a shareable URL within seconds. No registration required for this free image uploader."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best tool for instant image links?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our free image to URL converter is the best tool for creating instant image links. It offers unlimited free image uploads, supports all major formats (JPG, PNG, GIF, WEBP, SVG), and provides permanent image links with global CDN delivery."
        }
      },
      {
        "@type": "Question",
        "name": "How can I get a free service to upload and share images?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our platform provides a completely free image hosting service with no signup required. Upload images up to 10MB each, get shareable image links instantly, and enjoy unlimited free uploads. This anonymous image uploader is perfect for social media sharing."
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

  const renderSchema = () => {
    switch (type) {
      case 'service':
        return [getServiceSchema(), getOrganizationSchema(), getSoftwareApplicationSchema()];
      case 'faq':
        return getFAQSchema();
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
