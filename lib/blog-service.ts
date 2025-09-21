import { BlogPost } from '@/lib/types'

export interface PaginatedResponse {
  posts: BlogPost[]
  pagination: {
    totalPosts: number
    totalPages: number
    currentPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

class BlogService {
  private baseUrl = '/api/blog'

  private getFullUrl(path: string): string {
    if (typeof window === 'undefined') {
      const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      return `${base}${path}`
    }
    return path
  }

  async getAllPosts(page: number = 1, limit: number = 12, cacheBust?: number): Promise<PaginatedResponse> {
    const url = `${this.baseUrl}?page=${page}&limit=${limit}${cacheBust ? `&_t=${cacheBust}` : ''}`
    const response = await fetch(this.getFullUrl(url))
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    const data = await response.json()
    return {
      posts: data.data?.posts || data.posts || [],
      pagination: data.data?.pagination || data.pagination || {
        totalPosts: 0,
        totalPages: 0,
        currentPage: page,
        hasNextPage: false,
        hasPrevPage: false
      }
    }
  }

  async getPostById(id: string): Promise<BlogPost | null> {
    const response = await fetch(this.getFullUrl(`${this.baseUrl}/${id}`))
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch post')
    }
    return response.json()
  }

  async getPostsByCategory(category: string, page: number = 1, limit: number = 12): Promise<PaginatedResponse> {
    const response = await fetch(this.getFullUrl(`${this.baseUrl}?category=${category}&page=${page}&limit=${limit}`))
    if (!response.ok) {
      throw new Error('Failed to fetch posts by category')
    }
    return response.json()
  }

  async getFeaturedPosts(): Promise<BlogPost[]> {
    const response = await fetch(this.getFullUrl(`${this.baseUrl}?featured=true`))
    if (!response.ok) {
      throw new Error('Failed to fetch featured posts')
    }
    const data = await response.json()
    return data.data?.posts || data.posts || []
  }

  async getRecentPosts(limit: number = 10): Promise<BlogPost[]> {
    const response = await fetch(this.getFullUrl(`${this.baseUrl}?limit=${limit}`))
    if (!response.ok) {
      throw new Error('Failed to fetch recent posts')
    }
    const data = await response.json()
    return data.data?.posts || data.posts || []
  }

  async searchPosts(query: string, page: number = 1, limit: number = 12): Promise<PaginatedResponse> {
    const response = await fetch(this.getFullUrl(`${this.baseUrl}?search=${encodeURIComponent(query)}&page=${page}&limit=${limit}`))
    if (!response.ok) {
      throw new Error('Failed to search posts')
    }
    return response.json()
  }

  async getPostsByTag(tag: string, page: number = 1, limit: number = 12): Promise<PaginatedResponse> {
    const response = await fetch(this.getFullUrl(`${this.baseUrl}?tag=${encodeURIComponent(tag)}&page=${page}&limit=${limit}`))
    if (!response.ok) {
      throw new Error('Failed to fetch posts by tag')
    }
    return response.json()
  }

  async getCategories(): Promise<string[]> {
    const response = await fetch(this.getFullUrl(`${this.baseUrl}`))
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    const data = await response.json()
    const categories = data.posts.map((post: BlogPost) => post.category)
    return Array.from(new Set(categories))
  }

  async getAllTags(): Promise<string[]> {
    const response = await fetch(this.getFullUrl(`${this.baseUrl}`))
    if (!response.ok) {
      throw new Error('Failed to fetch tags')
    }
    const data = await response.json()
    const allTags = data.posts.flatMap((post: BlogPost) => post.tags)
    return Array.from(new Set(allTags))
  }
}

export const blogService = new BlogService() 