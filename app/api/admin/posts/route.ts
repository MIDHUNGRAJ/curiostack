import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

// Force dynamic rendering for admin routes
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Require authentication
    await requireAuth(request)
    
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['title', 'excerpt', 'content', 'category', 'image', 'date', 'readTime', 'author', 'tags']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(body.date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD format' },
        { status: 400 }
      )
    }

    // Create new post
    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        category: body.category,
        image: body.image,
        date: body.date,
        readTime: body.readTime,
        author: body.author,
        tags: JSON.stringify(body.tags),
        featured: Boolean(body.featured || false),
        source: body.source,
        aiVersion: body.aiVersion
      }
    })

    return NextResponse.json({
      message: 'Post created successfully',
      post: {
        ...post,
        tags: JSON.parse(post.tags || '[]'),
        featured: Boolean(post.featured) // Ensure featured is always a boolean
      }
    })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await requireAuth(request)
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    })

    const totalPosts = await prisma.blogPost.count()

    // Transform posts to include parsed tags
    const transformedPosts = posts.map(post => ({
      ...post,
      tags: JSON.parse(post.tags || '[]'),
      featured: Boolean(post.featured) // Ensure featured is always a boolean
    }))



    return NextResponse.json({
      posts: transformedPosts,
      pagination: {
        totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
        currentPage: page,
        hasNextPage: skip + limit < totalPosts,
        hasPrevPage: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
} 