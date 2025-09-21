import { prisma } from './db'
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

class ServerBlogService {
  async getAllPosts(page: number = 1, limit: number = 12): Promise<PaginatedResponse> {
    const skip = (page - 1) * limit

    const posts = await prisma.blogPost.findMany({
      orderBy: { date: 'desc' },
      skip,
      take: limit,
    })

    const totalPosts = await prisma.blogPost.count()

    const transformedPosts = posts.map(post => ({
      ...post,
      tags: JSON.parse(post.tags || '[]'),
      source: post.source || undefined,
      aiVersion: post.aiVersion || undefined,
      featured: Boolean(post.featured) // Ensure featured is always a boolean
    }))

    return {
      posts: transformedPosts,
      pagination: {
        totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
        currentPage: page,
        hasNextPage: skip + limit < totalPosts,
        hasPrevPage: page > 1
      }
    }
  }

  async getPostById(id: string): Promise<BlogPost | null> {
    const post = await prisma.blogPost.findUnique({
      where: { id }
    })

    if (!post) {
      return null
    }

    return {
      ...post,
      tags: JSON.parse(post.tags || '[]'),
      source: post.source || undefined,
      aiVersion: post.aiVersion || undefined,
      featured: Boolean(post.featured) // Ensure featured is always a boolean
    }
  }

  async getPostsByCategory(category: string, page: number = 1, limit: number = 12): Promise<PaginatedResponse> {
    const skip = (page - 1) * limit

    const posts = await prisma.blogPost.findMany({
      where: { category },
      orderBy: { date: 'desc' },
      skip,
      take: limit,
    })

    const totalPosts = await prisma.blogPost.count({
      where: { category }
    })

    const transformedPosts = posts.map(post => ({
      ...post,
      tags: JSON.parse(post.tags || '[]'),
      source: post.source || undefined,
      aiVersion: post.aiVersion || undefined,
      featured: Boolean(post.featured) // Ensure featured is always a boolean
    }))

    return {
      posts: transformedPosts,
      pagination: {
        totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
        currentPage: page,
        hasNextPage: skip + limit < totalPosts,
        hasPrevPage: page > 1
      }
    }
  }

  async getFeaturedPosts(): Promise<BlogPost[]> {
    const posts = await prisma.blogPost.findMany({
      where: { featured: true },
      orderBy: { date: 'desc' }
    })

    return posts.map(post => ({
      ...post,
      tags: JSON.parse(post.tags || '[]'),
      source: post.source || undefined,
      aiVersion: post.aiVersion || undefined,
      featured: Boolean(post.featured) // Ensure featured is always a boolean
    }))
  }

  async getRecentPosts(limit: number = 10): Promise<BlogPost[]> {
    const posts = await prisma.blogPost.findMany({
      orderBy: { date: 'desc' },
      take: limit
    })

    return posts.map(post => ({
      ...post,
      tags: JSON.parse(post.tags || '[]'),
      source: post.source || undefined,
      aiVersion: post.aiVersion || undefined,
      featured: Boolean(post.featured) // Ensure featured is always a boolean
    }))
  }
}

export const serverBlogService = new ServerBlogService()

// Export a simple function to get all blog posts for search
export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await prisma.blogPost.findMany({
    orderBy: { date: 'desc' }
  })

  return posts.map(post => ({
    ...post,
    tags: JSON.parse(post.tags || '[]'),
    source: post.source || undefined,
    aiVersion: post.aiVersion || undefined,
    featured: Boolean(post.featured)
  }))
} 