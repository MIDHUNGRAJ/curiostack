export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string // Changed from union type to string for flexibility
  image: string
  date: string
  readTime: string
  author: string
  tags: string[]
  featured: boolean
  createdAt?: Date
  updatedAt?: Date
  source?: string
  aiVersion?: string
} 