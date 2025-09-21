import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isValidCategory } from '@/lib/categories'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

// GET /api/blog - Get all blog posts with advanced filtering (READ-ONLY)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const author = searchParams.get('author')
    const sortBy = searchParams.get('sortBy') || 'date'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (category) {
      // Only filter by category if it's a valid category
      if (isValidCategory(category)) {
        where.category = category
      } else {
        // If invalid category, return empty results
        return NextResponse.json({
          success: true,
          data: {
            posts: [],
            pagination: {
              totalPosts: 0,
              totalPages: 0,
              currentPage: page,
              hasNextPage: false,
              hasPrevPage: false,
              limit
            },
            filters: {
              category,
              tag,
              featured: featured === 'true',
              search,
              author,
              sortBy,
              sortOrder
            }
          }
        })
      }
    }
    
    if (featured === 'true') {
      where.featured = true
    }

    if (author) {
      where.author = {
        contains: author
      }
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { content: { contains: search } },
        { tags: { contains: search } }
      ]
    }

    // Get posts with pagination
    let posts = await prisma.blogPost.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    })

    // Get total count for pagination
    let totalPosts = await prisma.blogPost.count({ where })

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
          tag,
          featured: featured === 'true',
          search,
          author,
          sortBy,
          sortOrder
        }
      }
    }, {
      headers: {
        // Disable caching to ensure fresh data
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block'
      }
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch blog posts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// POST method removed - This is a read-only news API
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed',
      message: 'This is a read-only news API. Content creation is not allowed.'
    },
    { status: 405 }
  )
} 