'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/lib/types'
import { TrendingUp, Clock, Calendar, BookOpen, Target } from 'lucide-react'

interface ArticleSidebarProps {
  currentPostId: string
  currentCategory: string
}

export default function ArticleSidebar({ currentPostId, currentCategory }: ArticleSidebarProps) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        // Fetch related posts (same category, excluding current post)
        const relatedResponse = await fetch(`/api/blog?category=${encodeURIComponent(currentCategory)}&limit=3&_t=${Date.now()}`)
        const relatedData = await relatedResponse.json()
        
        if (relatedData.success) {
          // Filter out current post from related posts
          const filteredRelated = relatedData.data.posts.filter((post: BlogPost) => post.id !== currentPostId)
          setRelatedPosts(filteredRelated.slice(0, 3))
        }
      } catch (error) {
        console.error('Error fetching sidebar data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSidebarData()
  }, [currentPostId, currentCategory])

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Related Posts Loading */}
        <div className="bg-card rounded-xl p-6 border border-border/20 shadow-soft">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Related Posts
          </h3>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-secondary rounded-lg mb-2"></div>
                <div className="h-3 bg-secondary rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-secondary rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-card rounded-xl p-6 border border-border/20 shadow-soft hover:shadow-medium transition-all duration-300">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Related Posts
          </h3>
          <div className="space-y-4">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group block"
              >
                <article className="space-y-2">
                  {post.image && (
                    <div className="relative h-20 overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={120}
                        height={80}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {post.title}
                  </h4>
                  <div className="flex items-center text-xs text-muted-foreground gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Category Navigation */}
      <div className="bg-card rounded-xl p-6 border border-border/20 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Target className="w-4 h-4" />
          More in {currentCategory}
        </h3>
        <Link
          href={`/blog?category=${encodeURIComponent(currentCategory)}`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-soft"
        >
          View All {currentCategory} Posts
        </Link>
      </div>
    </div>
  )
} 