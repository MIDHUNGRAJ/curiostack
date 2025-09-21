'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/lib/types'
import { Newspaper, Calendar, User, ArrowRight } from 'lucide-react'

interface BlogListProps {
  initialPosts?: BlogPost[]
}

export default function BlogList({ initialPosts = [] }: BlogListProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [loading, setLoading] = useState<boolean>(initialPosts.length === 0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Update posts when initialPosts changes
    if (initialPosts.length > 0) {
      setPosts(initialPosts)
      setLoading(false)
      return
    }
    
    const fetchPosts = async () => {

      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/blog?page=1&limit=6&_t=${Date.now()}`, {
          next: { revalidate: 3600 } // Cache for 1 hour
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.success && data.data?.posts) {
          setPosts(data.data.posts)
        } else {
          throw new Error('Invalid response format')
        }
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch posts')
      } finally {
        setLoading(false)
      }
    }

    // If we already have posts from the server, don't block rendering
    if (initialPosts.length === 0) {
      fetchPosts()
    }
  }, [initialPosts.length])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center text-sm text-muted-foreground">Loading articles...</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-secondary rounded-xl h-48 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-secondary rounded w-3/4"></div>
                <div className="h-4 bg-secondary rounded w-1/2"></div>
                <div className="h-4 bg-secondary rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No articles found</h3>
        <p className="text-muted-foreground">Check back later for new content.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="group">
            <Link href={`/blog/${post.id}`} className="block">
              <div className="bg-card rounded-xl border border-border/20 overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                {post.image && (
                  <div className="relative h-48 overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
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
                      {new Date(post.date).toLocaleDateString()}
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
      
      {posts.length >= 6 && (
        <div className="text-center">
          <Link 
            href="/blog?page=2" 
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            View More Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      )}
    </div>
  )
}