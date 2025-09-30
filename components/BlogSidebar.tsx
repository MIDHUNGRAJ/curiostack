// Server component: renders popular posts without client fetches
import { prisma } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { TrendingUp, Clock, Calendar, BookOpen } from 'lucide-react'
import AffiliateLinks from './AffiliateLinks'

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

export default async function BlogSidebar() {
  const popularPosts = await prisma.blogPost.findMany({
    orderBy: { date: 'desc' },
    take: 5,
  })

  return (
    <div className="space-y-6">

      {/* Affiliate Links - Moved to top for better visibility */}
      <AffiliateLinks />

      {/* Popular Posts */}
      <div className="bg-card rounded-xl p-6 border border-border/20 shadow-soft hover:shadow-medium transition-all duration-300">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Popular Posts
        </h3>
        <div className="space-y-4">
          {popularPosts.map((post: any, index: number) => (
            <div key={post.id}>
              <Link
                href={`/blog/${post.id}`}
                className="group block"
              >
                <article className="space-y-3">
                  {isValidImageUrl(post.image) && (
                    <div className="relative w-full h-24 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                      <Image
                        src={post.image!}
                        alt={post.title}
                        width={280}
                        height={96}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
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
                  <p className="text-xs text-muted-foreground">We&apos;re building the future of content, one article at a time.</p>
                </article>
              </Link>
              
              {/* Ads removed */}
            </div>
          ))}
        </div>
      </div>

      {/* Affiliate Links - Middle position */}
      <AffiliateLinks />

      {/* Newsletter Signup - Enhanced */}
      <div className="bg-card rounded-xl p-6 border border-border/20 shadow-soft hover:shadow-medium transition-all duration-300">
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Stay Updated</h3>
          <p className="text-sm text-muted-foreground">Stay informed with CurioStack's premium insights. delivered to your inbox.</p>
        </div>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
          />
          <button
            type="submit"
            className="w-full px-4 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-soft"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
} 