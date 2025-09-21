export const CATEGORIES = [
  'Technology',
  'AI', 
  'Business',
  'Science',
  'Cybersecurity',
  'Data Science'
] as const

export type Category = typeof CATEGORIES[number]

export const CATEGORY_CONFIG = {
  Technology: {
    name: 'Technology',
    slug: 'technology',
    description: 'Latest technology trends and innovations',
    color: 'bg-blue-500'
  },
  AI: {
    name: 'AI',
    slug: 'ai',
    description: 'Artificial Intelligence and machine learning',
    color: 'bg-purple-500'
  },
  Business: {
    name: 'Business',
    slug: 'business',
    description: 'Business insights and strategies',
    color: 'bg-green-500'
  },
  Science: {
    name: 'Science',
    slug: 'science',
    description: 'Scientific discoveries and research',
    color: 'bg-orange-500'
  },
  Cybersecurity: {
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Cybersecurity and digital security',
    color: 'bg-red-500'
  },
  'Data Science': {
    name: 'Data Science',
    slug: 'data-science',
    description: 'Analytics, big data, and data-driven decision making',
    color: 'bg-indigo-500'
  }
} as const

export function isValidCategory(category: string): category is Category {
  return CATEGORIES.includes(category as Category)
}

export function getCategoryConfig(category: string) {
  return CATEGORY_CONFIG[category as Category] || null
} 