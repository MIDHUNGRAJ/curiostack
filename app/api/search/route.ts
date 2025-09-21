import { NextRequest, NextResponse } from 'next/server'
import { getBlogPosts } from '@/lib/server-blog-service'

// Force dynamic rendering for search functionality
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const limit = parseInt(searchParams.get('limit') || '10')
    
    if (!query.trim()) {
      return NextResponse.json({
        success: true,
        data: {
          posts: [],
          total: 0,
          query: ''
        }
      })
    }

    // Get all posts and filter them
    const allPosts = await getBlogPosts()
    
    // Simple search implementation - can be enhanced with full-text search
    const searchResults = allPosts.filter(post => {
      const searchTerm = query.toLowerCase()
      const title = post.title.toLowerCase()
      const content = post.content.toLowerCase()
      const excerpt = post.excerpt.toLowerCase()
      const category = post.category.toLowerCase()
      const tags = post.tags?.join(' ').toLowerCase() || ''
      
      return (
        title.includes(searchTerm) ||
        content.includes(searchTerm) ||
        excerpt.includes(searchTerm) ||
        category.includes(searchTerm) ||
        tags.includes(searchTerm)
      )
    })

    // Sort by relevance (title matches first, then content)
    const sortedResults = searchResults.sort((a, b) => {
      const searchTerm = query.toLowerCase()
      const aTitle = a.title.toLowerCase()
      const bTitle = b.title.toLowerCase()
      
      // Title matches get priority
      const aTitleMatch = aTitle.includes(searchTerm)
      const bTitleMatch = bTitle.includes(searchTerm)
      
      if (aTitleMatch && !bTitleMatch) return -1
      if (!aTitleMatch && bTitleMatch) return 1
      
      // Then sort by date (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    const limitedResults = sortedResults.slice(0, limit)

    return NextResponse.json({
      success: true,
      data: {
        posts: limitedResults,
        total: searchResults.length,
        query: query
      }
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to perform search' },
      { status: 500 }
    )
  }
} 