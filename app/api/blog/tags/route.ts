import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/blog/tags - Get all tags with post counts
export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.blogPost.findMany({
      select: {
        tags: true
      }
    })

    // Count posts by tag
    const tagCounts: { [key: string]: number } = {}
    posts.forEach(post => {
      const tags = JSON.parse(post.tags || '[]')
      tags.forEach((tag: string) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })

    const tags = Object.entries(tagCounts)
      .map(([name, count]) => ({
        name,
        count,
        slug: name.toLowerCase().replace(/\s+/g, '-')
      }))
      .sort((a, b) => b.count - a.count) // Sort by count descending

    return NextResponse.json({
      success: true,
      data: {
        tags,
        totalTags: tags.length,
        totalPosts: posts.length
      }
    })
  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch tags',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 