'use client'

import Link from 'next/link'
import { ExternalLink, Zap } from 'lucide-react'
import { generateAffiliateUrl, trackAffiliateClick } from '@/lib/affiliate'

interface InlineAffiliateLinkProps {
  linkId: string
  text?: string
  className?: string
  showIcon?: boolean
}

export default function InlineAffiliateLink({ 
  linkId, 
  text, 
  className = '',
  showIcon = true 
}: InlineAffiliateLinkProps) {
  const handleClick = () => {
    trackAffiliateClick(linkId, 'blog_content')
  }

  const defaultText = linkId === '1xbet' ? '1xBet' : linkId

  return (
    <Link
      href={generateAffiliateUrl(linkId, 'blog_content')}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={`inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium underline decoration-primary/30 hover:decoration-primary/60 transition-all duration-200 ${className}`}
    >
      <Zap className="w-3 h-3" />
      {text || defaultText}
      {showIcon && <ExternalLink className="w-3 h-3" />}
    </Link>
  )
}
