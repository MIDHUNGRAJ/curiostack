import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/blog/stats - Get blog statistics
export async function GET(request: NextRequest) {
  try {
    // Get total posts
    const totalPosts = await prisma.blogPost.count()
    
    // Get featured posts count
    const featuredPosts = await prisma.blogPost.count({
      where: { featured: true }
    })
    
    // Get posts by category
    const postsByCategory = await prisma.blogPost.groupBy({
      by: ['category'],
      _count: {
        category: true
      }
    })
    
    // Get posts by author
    const postsByAuthor = await prisma.blogPost.groupBy({
      by: ['author'],
      _count: {
        author: true
      }
    })
    
    // Get latest post
    const latestPost = await prisma.blogPost.findFirst({
      orderBy: { date: 'desc' },
      select: {
        id: true,
        title: true,
        date: true,
        author: true
      }
    })
    
    // Get oldest post
    const oldestPost = await prisma.blogPost.findFirst({
      orderBy: { date: 'asc' },
      select: {
        id: true,
        title: true,
        date: true,
        author: true
      }
    })

    // Calculate average read time
    const posts = await prisma.blogPost.findMany({
      select: { readTime: true }
    })
    
    const readTimes = posts.map(post => {
      const match = post.readTime.match(/(\d+)/)
      return match ? parseInt(match[1]) : 5
    })
    
    const avgReadTime = readTimes.length > 0 
      ? Math.round(readTimes.reduce((a, b) => a + b, 0) / readTimes.length)
      : 5

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalPosts,
          featuredPosts,
          totalCategories: postsByCategory.length,
          totalAuthors: postsByAuthor.length,
          averageReadTime: `${avgReadTime} min`
        },
        latestPost,
        oldestPost,
        categories: postsByCategory.map(cat => ({
          name: cat.category,
          count: cat._count.category
        })),
        authors: postsByAuthor.map(auth => ({
          name: auth.author,
          count: auth._count.author
        }))
      }
    })
  } catch (error) {
    console.error('Error fetching blog stats:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch blog stats',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 