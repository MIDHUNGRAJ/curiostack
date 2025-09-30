'use client'

import Link from 'next/link'
import { generateAffiliateUrl, trackAffiliateClick } from '@/lib/affiliate'

interface SkyscraperBannerProps {
  bannerImage: string
  linkId: string
  altText?: string
}

export default function SkyscraperBanner({ 
  bannerImage, 
  linkId, 
  altText = "1xBet Skyscraper Banner"
}: SkyscraperBannerProps) {
  const handleClick = () => {
    trackAffiliateClick(linkId, 'skyscraper_banner')
  }

  return (
    <div className="w-full my-6">
      <Link
        href={generateAffiliateUrl(linkId, 'skyscraper_banner')}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className="block"
      >
        <div className="relative w-full max-w-[100px] mx-auto rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg border border-border/20">
          <img
            src={bannerImage}
            alt={altText}
            className="w-full h-auto object-cover"
            style={{ width: '100px', height: '600px' }}
            onError={(e) => {
              console.log('Skyscraper banner failed to load:', bannerImage);
            }}
          />
        </div>
      </Link>
    </div>
  )
}
