// Alternative SEO component using React Helmet (install with: npm install react-helmet-async)
// This is a more robust solution for complex applications

import { Helmet } from "react-helmet-async";

interface HelmetSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  siteName?: string;
  author?: string;
  canonical?: string;
  noIndex?: boolean;
  structuredData?: object;
}

export function HelmetSEO({
  title = "Shadow Course Hub",
  description = "Learn programming, design, business, and more with our comprehensive online courses.",
  keywords = "online courses, programming, design, business, learning platform",
  image = "/assets/default.jpg",
  url = typeof window !== "undefined" ? window.location.href : "",
  type = "website",
  siteName = "Shadow Course Hub",
  author = "Shadow Course Hub Team",
  canonical,
  noIndex = false,
  structuredData,
}: HelmetSEOProps) {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Robots */}
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

// Example usage with structured data for courses
export function CoursePageSEO({
  courseTitle,
  courseDescription,
  courseImage,
  coursePrice,
  instructor,
}: {
  courseTitle: string;
  courseDescription: string;
  courseImage: string;
  coursePrice: number;
  instructor: string;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: courseTitle,
    description: courseDescription,
    image: courseImage,
    provider: {
      "@type": "Organization",
      name: "Shadow Course Hub",
    },
    instructor: {
      "@type": "Person",
      name: instructor,
    },
    offers: {
      "@type": "Offer",
      price: coursePrice,
      priceCurrency: "USD",
    },
  };

  return (
    <HelmetSEO
      title={courseTitle}
      description={courseDescription}
      image={courseImage}
      type="article"
      structuredData={structuredData}
    />
  );
}
