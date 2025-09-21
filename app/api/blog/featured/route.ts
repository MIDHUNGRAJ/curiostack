import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

// GET /api/blog/featured - Get featured articles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '6')
    const category = searchParams.get('category')

    const where: any = { featured: true }
    
    if (category) {
      // Case-insensitive category filtering
    }

    // Get featured posts
    let posts = await prisma.blogPost.findMany({
      where,
      orderBy: { date: 'desc' },
      take: category ? undefined : limit,
    })

    // Apply case-insensitive category filtering in application layer
    if (category) {
      posts = posts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      )
      // Apply limit after filtering
      posts = posts.slice(0, limit)
    }

    // Transform posts to include parsed tags
    const transformedPosts = posts.map(post => ({
      ...post,
      tags: JSON.parse(post.tags || '[]'),
      featured: Boolean(post.featured) // Ensure featured is always a boolean
    }))

    return NextResponse.json({
      success: true,
      data: {
        posts: transformedPosts,
        total: transformedPosts.length,
        limit
      }
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Last-Modified': new Date().toUTCString()
      }
    })
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch featured posts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 