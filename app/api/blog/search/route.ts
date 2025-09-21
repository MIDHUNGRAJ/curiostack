import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

// GET /api/blog/search - Search articles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')

    if (!query) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Search query is required' 
        },
        { status: 400 }
      )
    }

    const skip = (page - 1) * limit

    // Build search query
    const where: any = {
      OR: [
        { title: { contains: query } },
        { excerpt: { contains: query } },
        { content: { contains: query } },
        { tags: { contains: query } }
      ]
    }

    // Add category filter if specified
    if (category) {
      // Will be handled in application layer for case-insensitive matching
    }

    // Get posts with search
    let posts = await prisma.blogPost.findMany({
      where,
      orderBy: { date: 'desc' },
      skip: category ? 0 : skip,
      take: category ? undefined : limit,
    })

    // Apply case-insensitive category filtering in application layer
    if (category) {
      posts = posts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      )
      // Apply pagination after filtering
      posts = posts.slice(skip, skip + limit)
    }

    // Get total count for pagination
    let totalPosts = await prisma.blogPost.count({ where: category ? {} : where })
    
    // If filtering by category, count the filtered results
    if (category) {
      const allPosts = await prisma.blogPost.findMany({
        where,
        orderBy: { date: 'desc' },
      })
      totalPosts = allPosts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      ).length
    }

    // Transform posts to include parsed tags
    const transformedPosts = posts.map(post => ({
      ...post,
      tags: JSON.parse(post.tags || '[]'),
      featured: Boolean(post.featured) // Ensure featured is always a boolean
    }))

    // Filter by tag if specified
    const filteredPosts = tag 
      ? transformedPosts.filter(post => 
          Array.isArray(post.tags) && post.tags.includes(tag)
        )
      : transformedPosts

    return NextResponse.json({
      success: true,
      data: {
        query,
        posts: filteredPosts,
        pagination: {
          totalPosts,
          totalPages: Math.ceil(totalPosts / limit),
          currentPage: page,
          hasNextPage: skip + limit < totalPosts,
          hasPrevPage: page > 1,
          limit
        },
        filters: {
          category,
          tag
        }
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
    console.error('Error searching posts:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to search posts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 