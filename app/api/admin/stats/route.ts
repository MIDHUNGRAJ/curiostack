import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Require authentication
    await requireAuth(request)

    // Use dynamic import to get Prisma client
    const { prisma } = await import('@/lib/db')

    // Get statistics
    const [
      totalPosts,
      featuredPosts,
      categories,
      recentPosts
    ] = await Promise.all([
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { featured: true } }),
      prisma.blogPost.groupBy({ by: ['category'], _count: true }),
      prisma.blogPost.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      })
    ])

    return NextResponse.json({
      totalPosts,
      featuredPosts,
      categories: categories.length,
      recentPosts
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
} 