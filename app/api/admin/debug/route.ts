import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    await requireAuth(request)
    
    // Use dynamic import to get Prisma client
    const { prisma } = await import('@/lib/db')
    
    // Get all posts
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    })

    const totalPosts = await prisma.blogPost.count()

    // Transform posts to include parsed tags
    const transformedPosts = posts.map(post => ({
      ...post,
      tags: JSON.parse(post.tags || '[]'),
      featured: Boolean(post.featured)
    }))

    return NextResponse.json({
      success: true,
      totalPosts,
      posts: transformedPosts,
      message: `Found ${totalPosts} posts in database`
    })
  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch posts',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 