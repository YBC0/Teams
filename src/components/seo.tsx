import { Helmet } from 'react-helmet-async';
import { generateMetaTags, generateStructuredData } from '@/lib/seo-config';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: 'website' | 'article';
  structuredData?: {
    type: 'Organization' | 'WebPage' | 'Article';
    datePublished?: string;
    dateModified?: string;
  };
}

export function SEO({
  title,
  description,
  image,
  imageAlt,
  url,
  type = 'website',
  structuredData,
}: SEOProps) {
  const metaTags = generateMetaTags({
    title,
    description,
    image,
    imageAlt,
    url,
    type,
  });

  const structuredDataJson = structuredData
    ? generateStructuredData({
        type: structuredData.type,
        title: metaTags.title,
        description: metaTags.meta.find((m) => m.name === 'description')?.content || '',
        image: metaTags.meta.find((m) => m.property === 'og:image')?.content || '',
        url: metaTags.meta.find((m) => m.property === 'og:url')?.content || '',
        datePublished: structuredData.datePublished,
        dateModified: structuredData.dateModified,
      })
    : null;

  return (
    <Helmet>
      <title>{metaTags.title}</title>
      {metaTags.meta.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}
      {structuredDataJson && (
        <script type="application/ld+json">
          {JSON.stringify(structuredDataJson)}
        </script>
      )}
    </Helmet>
  );
} 