export const defaultSEO = {
  title: 'Team SEA - Building Water Wells for Communities in Need',
  description: 'Team SEA is dedicated to providing clean water access through water well construction in developing countries. Join us in our mission to bring sustainable water solutions to communities in need.',
  siteUrl: 'https://sea.org',
  twitterHandle: '@teamsea',
  defaultImage: '/images/og-image.jpg',
  defaultImageAlt: 'Team SEA - Water Well Construction',
};

export const generateMetaTags = ({
  title,
  description,
  image,
  imageAlt,
  url,
  type = 'website',
}: {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: 'website' | 'article';
}) => {
  const metaTitle = title ? `${title} | Team SEA` : defaultSEO.title;
  const metaDescription = description || defaultSEO.description;
  const metaImage = image || defaultSEO.defaultImage;
  const metaImageAlt = imageAlt || defaultSEO.defaultImageAlt;
  const metaUrl = url || defaultSEO.siteUrl;

  return {
    title: metaTitle,
    meta: [
      // Basic meta tags
      { name: 'description', content: metaDescription },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Team SEA' },

      // Open Graph meta tags
      { property: 'og:title', content: metaTitle },
      { property: 'og:description', content: metaDescription },
      { property: 'og:type', content: type },
      { property: 'og:url', content: metaUrl },
      { property: 'og:image', content: metaImage },
      { property: 'og:image:alt', content: metaImageAlt },
      { property: 'og:site_name', content: 'Team SEA' },

      // Twitter Card meta tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: defaultSEO.twitterHandle },
      { name: 'twitter:title', content: metaTitle },
      { name: 'twitter:description', content: metaDescription },
      { name: 'twitter:image', content: metaImage },
      { name: 'twitter:image:alt', content: metaImageAlt },

      // Canonical URL
      { rel: 'canonical', href: metaUrl },
    ],
  };
};

export const generateStructuredData = ({
  type,
  title,
  description,
  image,
  url,
  datePublished,
  dateModified,
}: {
  type: 'Organization' | 'WebPage' | 'Article';
  title: string;
  description: string;
  image: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description,
    image,
    url,
  };

  if (type === 'Organization') {
    return {
      ...baseData,
      logo: `${defaultSEO.siteUrl}/logo.png`,
      sameAs: [
        'https://twitter.com/teamsea',
        'https://facebook.com/teamsea',
        'https://instagram.com/teamsea',
      ],
      description: 'A humanitarian organization dedicated to providing clean water access through water well construction in developing countries.',
      areaServed: 'Global',
      serviceType: 'Water Well Construction',
      foundingDate: '2020',
    };
  }

  if (type === 'Article') {
    return {
      ...baseData,
      datePublished,
      dateModified,
      author: {
        '@type': 'Organization',
        name: 'Team SEA',
        description: 'A humanitarian organization dedicated to providing clean water access through water well construction in developing countries.',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Team SEA',
        logo: {
          '@type': 'ImageObject',
          url: `${defaultSEO.siteUrl}/logo.png`,
        },
      },
    };
  }

  return baseData;
}; 