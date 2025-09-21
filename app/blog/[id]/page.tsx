import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import RelatedTopics from '@/components/RelatedTopics'
import LatestPostsSection from '@/components/LatestPostsSection'

import { TrendingUp, Flame, Newspaper, Target, BookOpen, Clock, Calendar, ArrowLeft, Share2, User, Tag } from 'lucide-react'

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id }
  })

  if (!post) {
    notFound()
  }

  const tags = post.tags ? JSON.parse(post.tags) : []

  // Fetch related posts from the same category
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      category: post.category,
      id: { not: post.id } // Exclude current post
    },
    orderBy: { date: 'desc' },
    take: 3,
    select: {
      id: true,
      title: true,
      excerpt: true,
      date: true,
      readTime: true,
      category: true
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Ads removed */}

        {/* Main Article Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Related Topics Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <RelatedTopics 
                category={post.category}
                relatedPosts={relatedPosts}
                className="sticky top-24"
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <article>
                {/* Article Header */}
                <header className="mb-12">
                  {/* Category Badge */}
                  <div className="mb-6">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
                    {post.title}
                  </h1>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary-foreground">
                          {post.author?.charAt(0) || 'A'}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">{post.author || 'Anonymous'}</span>
                        <div className="flex items-center gap-2 text-xs">
                          <time dateTime={post.date} className="hover:text-foreground transition-colors">
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                          <span>•</span>
                          <span className="bg-secondary px-2 py-1 rounded-full text-xs font-medium">
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    {post.source && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {post.source}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                      {post.excerpt}
                    </p>
                  )}
                </header>

                {/* Featured Image */}
                {post.image && post.image !== 'N/A' && post.image.trim() !== '' && (
                  <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8 bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                )}

                {/* Article Content */}
                <div className="max-w-4xl">
                  <MarkdownRenderer 
                    content={post.content}
                    className="text-slate-700 dark:text-slate-300 leading-relaxed"
                  />
                </div>

                {/* Article Footer */}
                <footer className="mt-16 pt-8 border-t border-border/20">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Published {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href="/blog"
                        className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-200"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                      </Link>
                      <Link
                        href={`/blog?category=${post.category}`}
                        className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                      >
                        More in {post.category}
                      </Link>
                    </div>
                  </div>
                </footer>
              </article>
            </div>
          </div>
        </div>

        {/* Ads removed */}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Stay Updated</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get the latest articles and insights delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 text-base border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              />
              <button
                type="submit"
                className="px-8 py-3 text-base font-medium text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-soft"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Latest Posts Section */}
        <LatestPostsSection currentPostId={post.id} />
      </div>

      <Footer />
    </div>
  )
} 

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { prisma } = await import('@/lib/db')
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } })
  if (!post) return {}
  const tags = post.tags ? JSON.parse(post.tags) : []
  const url = `https://curiostack.com/blog/${post.id}`
  return {
    title: `${post.title} | CurioStack`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url,
      images: post.image ? [{ url: post.image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
    other: {
      'article:published_time': post.date,
      ...(tags?.length ? { 'article:tag': tags.join(',') } : {}),
    },
  }
}