import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

// GET /api/blog/[id] - Get a specific blog post (READ-ONLY)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id }
    })

    if (!post) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Blog post not found' 
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        post: {
          ...post,
          tags: JSON.parse(post.tags || '[]'),
          featured: Boolean(post.featured) // Ensure featured is always a boolean
        }
      }
    })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch blog post',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// PUT method removed - This is a read-only news API
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed',
      message: 'This is a read-only news API. Content modification is not allowed.'
    },
    { status: 405 }
  )
}

// DELETE method removed - This is a read-only news API
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed',
      message: 'This is a read-only news API. Content deletion is not allowed.'
    },
    { status: 405 }
  )
} 