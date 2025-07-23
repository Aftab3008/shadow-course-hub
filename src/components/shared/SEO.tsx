import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  siteName?: string;
  author?: string;
}

export default function SEO({
  title = "Shadow Course Hub",
  description = "Learn programming, design, business, and more with our comprehensive online courses.",
  keywords = "online courses, programming, design, business, learning platform",
  image = "/assets/default.jpg",
  url = window.location.href,
  type = "website",
  siteName = "Shadow Course Hub",
  author = "Shadow Course Hub Team",
}: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (
      name: string,
      content: string,
      property?: boolean
    ) => {
      const attribute = property ? "property" : "name";
      let metaTag = document.querySelector(`meta[${attribute}="${name}"]`);

      if (metaTag) {
        metaTag.setAttribute("content", content);
      } else {
        metaTag = document.createElement("meta");
        metaTag.setAttribute(attribute, name);
        metaTag.setAttribute("content", content);
        document.head.appendChild(metaTag);
      }
    };

    // Update meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", author);

    // Open Graph meta tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:site_name", siteName, true);

    // Twitter Card meta tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Additional meta tags
    updateMetaTag("robots", "index, follow");
    updateMetaTag("viewport", "width=device-width, initial-scale=1.0");

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = "Shadow Course Hub";
    };
  }, [title, description, keywords, image, url, type, siteName, author]);

  // This component doesn't render anything visible
  return null;
}

// Higher-order component version for easier usage
export function withSEO<P extends object>(
  Component: React.ComponentType<P>,
  seoProps: SEOProps
) {
  return function WrappedComponent(props: P) {
    return (
      <>
        <SEO {...seoProps} />
        <Component {...props} />
      </>
    );
  };
}

// Hook version for using SEO in functional components
export function useSEO(seoProps: SEOProps) {
  useEffect(() => {
    const seoComponent = SEO(seoProps);
    return () => {
      // Cleanup when effect dependencies change
    };
  }, [seoProps]);
}
