// Affiliate link management and tracking utilities

export interface AffiliateLink {
  id: string
  name: string
  description: string
  url: string
  icon: string
  badge?: string
  color: string
  category: 'betting' | 'finance' | 'tech' | 'education' | 'other'
  isActive: boolean
}

// Centralized affiliate links configuration
export const affiliateLinks: AffiliateLink[] = [
  {
    id: '1xbet',
    name: '1xBet',
    description: 'Leading sports betting platform with competitive odds and live betting options',
    url: 'https://refpa58144.com/L?tag=d_4794947m_1599c_&site=4794947&ad=1599',
    icon: '/Media62363__300х250-new.gif', // 300x250 for sidebar banners
    badge: 'Exclusive Offer',
    color: 'from-blue-500 to-purple-600',
    category: 'betting',
    isActive: true
  }
]

// Track affiliate link clicks (for analytics)
export const trackAffiliateClick = (linkId: string, source: string = 'blog') => {
  if (typeof window !== 'undefined') {
    // Client-side tracking
    try {
      // You can integrate with Google Analytics, Mixpanel, or other analytics services
      if (window.gtag) {
        window.gtag('event', 'affiliate_click', {
          affiliate_id: linkId,
          source: source,
          timestamp: new Date().toISOString()
        })
      }
      
      // Store in localStorage for internal tracking
      const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]')
      clicks.push({
        linkId,
        source,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      })
      localStorage.setItem('affiliate_clicks', JSON.stringify(clicks.slice(-100))) // Keep last 100 clicks
    } catch (error) {
      console.warn('Failed to track affiliate click:', error)
    }
  }
}

// Get active affiliate links by category
export const getAffiliateLinks = (category?: string): AffiliateLink[] => {
  return affiliateLinks.filter(link => {
    if (!link.isActive) return false
    if (category && link.category !== category) return false
    return true
  })
}

// Generate affiliate URL with additional tracking parameters
export const generateAffiliateUrl = (linkId: string, source: string = 'blog'): string => {
  const link = affiliateLinks.find(l => l.id === linkId)
  if (!link) return '#'
  
  const url = new URL(link.url)
  url.searchParams.set('utm_source', 'curiostack')
  url.searchParams.set('utm_medium', source)
  url.searchParams.set('utm_campaign', linkId)
  
  return url.toString()
}

// Validate affiliate links (for health checks)
export const validateAffiliateLinks = async (): Promise<{ id: string, status: 'ok' | 'error', message?: string }[]> => {
  const results: { id: string, status: 'ok' | 'error', message?: string }[] = []
  
  for (const link of affiliateLinks) {
    try {
      const response = await fetch(link.url, { method: 'HEAD', mode: 'no-cors' })
      results.push({ id: link.id, status: 'ok' as const })
    } catch (error) {
      results.push({ 
        id: link.id, 
        status: 'error' as const, 
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }
  
  return results
}

// Declare global gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}
