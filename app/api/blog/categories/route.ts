import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { CATEGORIES, CATEGORY_CONFIG, isValidCategory } from '@/lib/categories'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

// GET /api/blog/categories - Get all categories with post counts
export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.blogPost.findMany({
      select: {
        category: true
      }
    })

    // Count posts by category, only including valid categories
    const categoryCounts: { [key: string]: number } = {}
    posts.forEach(post => {
      if (isValidCategory(post.category)) {
        categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1
      }
    })

    // Create categories array with predefined categories, including those with 0 posts
    const categories = CATEGORIES.map(category => ({
      name: category,
      count: categoryCounts[category] || 0,
      slug: CATEGORY_CONFIG[category].slug,
      description: CATEGORY_CONFIG[category].description
    }))

    return NextResponse.json({
      success: true,
      data: {
        categories,
        totalCategories: categories.length,
        totalPosts: posts.length
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
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch categories',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 