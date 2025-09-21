'use client'

import React from 'react'
import Link from 'next/link'
import { TrendingUp, ArrowRight } from 'lucide-react'

interface RelatedTopicsProps {
  category: string
  relatedPosts?: Array<{
    id: string
    title: string
    excerpt: string
    date: string
    readTime: string
    category: string
  }>
  className?: string
}

export default function RelatedTopics({ 
  category, 
  relatedPosts = [],
  className = '' 
}: RelatedTopicsProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Related Articles */}
      <div className="bg-card rounded-xl p-6 border border-border/20 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Related Articles
        </h3>
        <div className="space-y-4">
          {relatedPosts && relatedPosts.length > 0 ? (
            relatedPosts.map((post) => (
              <Link 
                key={post.id}
                href={`/blog/${post.id}`}
                className="block group"
              >
                <article className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.readTime}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                No related articles found in {category}
              </p>
            </div>
          )}
        </div>
        <Link 
          href={`/blog?category=${category}`}
          className="inline-flex items-center justify-center w-full mt-4 px-4 py-2 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
        >
          View All in {category}
        </Link>
      </div>

      {/* Ads removed */}
    </div>
  )
} 