'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, User, Calendar, Clock, Tag, Star, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'

// Helper function to validate image URLs
const isValidImageUrl = (url: string | null | undefined): boolean => {
  if (!url || url === 'N/A' || url.trim() === '') return false
  try {
    new URL(url)
    return true
  } catch {
    return url.startsWith('/') // Allow relative URLs starting with /
  }
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  category: string
  featured: boolean
  tags: string[]
}

interface FilteredBlogPostsProps {
  posts: BlogPost[]
  searchParams: { category?: string; search?: string }
}

export default function FilteredBlogPosts({ posts, searchParams }: FilteredBlogPostsProps) {
  const [displayedPosts, setDisplayedPosts] = useState(posts)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(posts.length >= 12)
  const [isClient, setIsClient] = useState(false)

  // Ensure hydration consistency
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Reset posts when search parameters change and fetch fresh data
  useEffect(() => {
    const abortController = new AbortController()
    
    const fetchFilteredPosts = async () => {
      if (!isClient) return
      
      setLoading(true)
      try {
        // Build query parameters for the API call
        const params = new URLSearchParams()
        params.set('page', '1')
        params.set('limit', '12')
        
        if (searchParams.category) {
          params.set('category', searchParams.category)
        }
        
        if (searchParams.search) {
          params.set('search', searchParams.search)
        }

        const response = await fetch(`/api/blog?${params.toString()}&_t=${Date.now()}`, {
          signal: abortController.signal
        })
        
        if (response.ok) {
          const result = await response.json()
          
          if (result.success && result.data?.posts) {
            setDisplayedPosts(result.data.posts)
            setHasMore(result.data.pagination.hasNextPage)
          } else {
            setDisplayedPosts(posts) // Fallback to initial posts
            setHasMore(posts.length >= 12)
          }
        } else {
          setDisplayedPosts(posts) // Fallback to initial posts
          setHasMore(posts.length >= 12)
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching filtered posts:', error)
          setDisplayedPosts(posts) // Fallback to initial posts
          setHasMore(posts.length >= 12)
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false)
        }
      }
    }

    // Only fetch if search params changed and we're on client side
    if (isClient) {
      fetchFilteredPosts()
    } else {
      // Initial server-side render
      setDisplayedPosts(posts)
      setHasMore(posts.length >= 12)
    }
    
    setCurrentPage(1)
    
    // Cleanup function to abort ongoing requests
    return () => {
      abortController.abort()
    }
  }, [posts, searchParams.category, searchParams.search, isClient])

  const loadMorePosts = async () => {
    if (loading) return
    
    setLoading(true)
    try {
      const nextPage = currentPage + 1
      
      // Build query parameters for the API call
      const params = new URLSearchParams()
      params.set('page', nextPage.toString())
      params.set('limit', '12')
      
      if (searchParams.category) {
        params.set('category', searchParams.category)
      }
      
      if (searchParams.search) {
        params.set('search', searchParams.search)
      }

      const response = await fetch(`/api/blog?${params.toString()}&_t=${Date.now()}`)
      if (response.ok) {
        const result = await response.json()
        
        if (result.success && result.data?.posts?.length > 0) {
          setDisplayedPosts(prev => [...prev, ...result.data.posts])
          setCurrentPage(nextPage)
          setHasMore(result.data.pagination.hasNextPage)
        } else {
          setHasMore(false)
        }
      }
    } catch (error) {
      console.error('Error loading more posts:', error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }
  // Show loading state when filtering
  if (loading && displayedPosts.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-card rounded-xl border border-border/50 p-4">
            <div className="bg-muted/30 rounded-lg h-32 mb-3"></div>
            <div className="h-4 bg-muted/30 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-muted/30 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!displayedPosts?.length && !loading) {
    return (
      <div className="text-center p-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No posts found</h3>
        <p className="text-muted-foreground mb-6">
          {searchParams.category 
            ? `No posts found in the "${searchParams.category}" category.`
            : searchParams.search 
            ? `No posts found matching "${searchParams.search}".`
            : "No blog posts available at the moment."
          }
        </p>
        <Link 
          href="/blog" 
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          View All Posts
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {searchParams.category && (
            <span>
              Showing <strong>{posts.length}</strong> posts in <strong>{searchParams.category}</strong>
            </span>
          )}
          {searchParams.search && (
            <span>
              Found <strong>{posts.length}</strong> posts for <strong>&quot;{searchParams.search}&quot;</strong>
            </span>
          )}
          {!searchParams.category && !searchParams.search && (
            <span>
              Showing <strong>{posts.length}</strong> posts
            </span>
          )}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPosts.map((post) => (
          <article key={post.id} className="group">
            <Link href={`/blog/${post.id}`} className="block">
              <div className="bg-card rounded-xl border border-border/20 overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                {isValidImageUrl(post.image) && (
                  <div className="relative h-48 overflow-hidden rounded-t-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Image
                      src={post.image!}
                      alt={post.title}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {post.featured && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {post.category && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {post.category}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        timeZone: 'UTC'
                      })}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>{post.author || 'CurioStack'}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Load More Button - Only show after client hydration */}
      {isClient && hasMore && (
        <div className="text-center pt-8">
          <button 
            onClick={loadMorePosts}
            disabled={loading}
            className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                Loading...
              </>
            ) : (
              <>
                Load More Posts
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
