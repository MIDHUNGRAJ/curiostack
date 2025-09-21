'use client'

import { memo } from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import OptimizedImage from './OptimizedImage'
import { BlogPost } from '@/lib/types'

interface OptimizedBlogCardProps {
  post: BlogPost
  priority?: boolean
  className?: string
}

const OptimizedBlogCard = memo(function OptimizedBlogCard({ 
  post, 
  priority = false,
  className = '' 
}: OptimizedBlogCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return 'Invalid date'
    }
  }

  const isValidImageUrl = (url: string | null | undefined): boolean => {
    if (!url || url === 'N/A' || url.trim() === '') return false
    try {
      new URL(url)
      return true
    } catch {
      return url.startsWith('/') // Allow relative URLs
    }
  }

  return (
    <article className={`group bg-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-border/50 hover:border-border ${className}`}>
      <Link href={`/blog/${post.id}`} className="block">
        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {isValidImageUrl(post.image) ? (
            <OptimizedImage
              src={post.image}
              alt={post.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
              <div className="text-blue-400 text-4xl">📰</div>
            </div>
          )}
          
          {/* Category Badge */}
          {post.category && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
                {post.category}
              </span>
            </div>
          )}
          
          {/* Featured Badge */}
          {post.featured && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 bg-yellow-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                ⭐ Featured
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{formatDate(post.date)}</span>
              </div>
              {post.readTime && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Read More Button */}
          <div className="flex items-center justify-between">
            <span className="text-primary font-medium group-hover:text-primary/80 transition-colors">
              Read Article
            </span>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </article>
  )
})

export default OptimizedBlogCard
