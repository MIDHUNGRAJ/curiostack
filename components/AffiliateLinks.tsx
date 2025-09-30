'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Star, Gift } from 'lucide-react'
import { getAffiliateLinks, trackAffiliateClick, generateAffiliateUrl } from '@/lib/affiliate'

export default function AffiliateLinks() {
  const affiliateLinks = getAffiliateLinks()

  const handleAffiliateClick = (linkId: string) => {
    trackAffiliateClick(linkId, 'blog_sidebar')
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border/20 shadow-soft hover:shadow-medium transition-all duration-300">
      <div className="space-y-4">
        {affiliateLinks.map((link) => (
          <div key={link.id} className="group">
            <div className="block p-4 rounded-lg border border-border/20 bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
              <div className="space-y-3">
                {/* Your 1xBet Banner Image */}
                <Link
                  href={generateAffiliateUrl(link.id, 'blog_sidebar')}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={() => handleAffiliateClick(link.id)}
                  className="block"
                >
                  <div className="relative w-full rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                    <img
                      src={link.icon}
                      alt="1xBet Affiliate Banner"
                      width="300"
                      height="250"
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        console.log('Local GIF failed to load:', link.icon);
                      }}
                    />
                  </div>
                </Link>
                
                {/* Exclusive Offer Badge */}
                {link.badge && (
                  <div className="text-center mt-2">
                    <span className={`inline-block px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r ${link.color}`}>
                      {link.badge}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
