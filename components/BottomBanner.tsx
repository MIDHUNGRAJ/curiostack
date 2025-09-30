'use client'

import Link from 'next/link'
import { generateAffiliateUrl, trackAffiliateClick } from '@/lib/affiliate'

interface BottomBannerProps {
  bannerImage: string
  linkId: string
  altText?: string
}

export default function BottomBanner({ bannerImage, linkId, altText = "1xBet Bottom Banner" }: BottomBannerProps) {
  const handleClick = () => {
    trackAffiliateClick(linkId, 'bottom_banner')
  }

  return (
    <div className="w-full mt-12 mb-8">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={generateAffiliateUrl(linkId, 'bottom_banner')}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="block"
        >
          <div className="relative w-full rounded-lg overflow-hidden hover:scale-[1.01] transition-transform duration-300 shadow-lg hover:shadow-xl">
            <img
              src={bannerImage}
              alt={altText}
              className="w-full h-auto object-cover"
              style={{ maxHeight: '250px' }}
              onError={(e) => {
                console.log('Bottom banner failed to load:', bannerImage);
              }}
            />
          </div>
        </Link>
      </div>
    </div>
  )
}
