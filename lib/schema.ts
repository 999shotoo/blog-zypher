interface BlogPostingSchema {
  '@context': string;
  '@type': string;
  headline: string;
  datePublished: string;
  dateModified: string;
  author: {
    '@type': string;
    name: string;
  };
  publisher: {
    '@type': string;
    name: string;
  };
  description: string;
  url: string;
}

interface WebSiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
}

export function generateBlogPostingSchema(
  title: string,
  date: string,
  description: string,
  slug: string
): BlogPostingSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Person',
      name: 'Anonymous',
    },
    publisher: {
      '@type': 'Organization',
      name: '~/blog',
    },
    description: description,
    url: `https://zypher.ooguy.com/post/${slug}`, // Replace with your actual domain
  };
}

export function generateWebSiteSchema(): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '~/blog',
    description: 'A blog about my thoughts on technology, programming, and life.',
    url: 'https://zypher.ooguy.com', // Replace with your actual domain
  };
}
