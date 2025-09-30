'use client'

import Link from 'next/link'
import { generateAffiliateUrl, trackAffiliateClick } from '@/lib/affiliate'

interface InContentBannerProps {
  bannerImage: string
  linkId: string
  altText?: string
  size?: 'small' | 'medium' | 'large'
}

export default function InContentBanner({ 
  bannerImage, 
  linkId, 
  altText = "1xBet In-Content Banner",
  size = 'medium'
}: InContentBannerProps) {
  const handleClick = () => {
    trackAffiliateClick(linkId, 'in_content_banner')
  }

  const sizeClasses = {
    small: 'max-w-sm mx-auto',
    medium: 'max-w-md mx-auto', 
    large: 'max-w-2xl mx-auto'
  }

  return (
    <div className={`w-full my-8 ${sizeClasses[size]}`}>
      <Link
        href={generateAffiliateUrl(linkId, 'in_content_banner')}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className="block"
      >
        <div className="relative w-full rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg border border-border/20">
          <img
            src={bannerImage}
            alt={altText}
            className="w-full h-auto object-cover"
            onError={(e) => {
              console.log('In-content banner failed to load:', bannerImage);
            }}
          />
        </div>
      </Link>
    </div>
  )
}
