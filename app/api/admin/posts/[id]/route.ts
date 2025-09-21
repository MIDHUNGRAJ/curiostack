import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth(request)
    const body = await request.json()

    
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (body.date && !dateRegex.test(body.date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD format' },
        { status: 400 }
      )
    }
    
    // Update post
    const post = await prisma.blogPost.update({
      where: { id: params.id },
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
        featured: Boolean(body.featured),
        source: body.source,
        aiVersion: body.aiVersion
      }
    })


    return NextResponse.json({
      message: 'Post updated successfully',
      post: {
        ...post,
        tags: JSON.parse(post.tags || '[]'),
        featured: Boolean(post.featured) // Ensure featured is always a boolean
      }
    })
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth(request)
    await prisma.blogPost.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'Post deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
} 