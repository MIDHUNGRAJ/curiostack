'use client'

import Link from 'next/link'
import { generateAffiliateUrl, trackAffiliateClick } from '@/lib/affiliate'

interface TopBannerProps {
  bannerImage: string
  linkId: string
  altText?: string
}

export default function TopBanner({ bannerImage, linkId, altText = "1xBet Top Banner" }: TopBannerProps) {
  const handleClick = () => {
    trackAffiliateClick(linkId, 'top_banner')
  }

  return (
    <div className="w-full mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={generateAffiliateUrl(linkId, 'top_banner')}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="block"
        >
          <div className="relative w-full rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300 shadow-lg hover:shadow-xl">
            <img
              src={bannerImage}
              alt={altText}
              className="w-full h-auto object-cover"
              onError={(e) => {
                console.log('Top banner failed to load:', bannerImage);
              }}
            />
          </div>
        </Link>
      </div>
    </div>
  )
}
