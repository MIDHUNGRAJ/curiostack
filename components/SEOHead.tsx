import { Metadata } from 'next'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function generateMetadata({
  title = 'CurioStack - AI-Powered Technology & Business Insights',
  description = 'CurioStack publishes high-quality, AI-generated, SEO-optimized content in technology and business. Stay informed with our professional insights and analysis.',
  keywords = ['technology', 'business', 'AI', 'startups', 'APIs'],
  image = '/images/og-image.jpg',
  url = 'https://curiostack.com',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'CurioStack',
  section,
  tags = [],
}: SEOHeadProps): Metadata {
  const fullTitle = title.includes('CurioStack') ? title : `${title} | CurioStack`
  const fullUrl = url.startsWith('http') ? url : `https://curiostack.com${url}`

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: author }],
    robots: 'index, follow',
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      type,
      url: fullUrl,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
      siteName: 'CurioStack',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@curiostack',
      site: '@curiostack',
    },
    ...(type === 'article' && {
      other: {
        ...(publishedTime && { 'article:published_time': publishedTime }),
        ...(modifiedTime && { 'article:modified_time': modifiedTime }),
        ...(section && { 'article:section': section }),
        ...tags.reduce((acc, tag, index) => {
          acc[`article:tag:${index}`] = tag
          return acc
        }, {} as Record<string, string>),
      },
    }),
  }
}

// Legacy component for backward compatibility
export default function SEOHead(props: SEOHeadProps) {
  // This component is deprecated in favor of generateMetadata
  // Use generateMetadata in your page components instead
  console.warn('SEOHead component is deprecated. Use generateMetadata instead.')
  return null
} 