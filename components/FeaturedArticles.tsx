import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/db'
import { Newspaper } from 'lucide-react'

export default async function FeaturedArticles() {
  const posts = await prisma.blogPost.findMany({
    where: { featured: true },
    orderBy: { date: 'desc' },
    take: 6,
    select: {
      id: true,
      title: true,
      excerpt: true,
      date: true,
      readTime: true,
      image: true,
      category: true,
      tags: true,
      author: true,
    }
  })

  // Normalize DB shape (tags stored as string) to array for UI typing
  const normalizedPosts = posts.map((p: any) => ({
    ...p,
    tags: Array.isArray(p.tags) ? p.tags : JSON.parse(p.tags || '[]'),
  }))

  if (normalizedPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <Newspaper className="w-16 h-16 text-muted-foreground mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No Featured Articles</h3>
        <p className="text-muted-foreground">Check back soon for our latest featured content!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {normalizedPosts.map((post: { id: string; title: string; excerpt: string; date: string; readTime: string; image: string; category: string; tags: string[]; author: string | null }, index: number) => (
        <Link 
          key={post.id} 
          href={`/blog/${post.id}`}
          className="group block bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-slide-up cursor-pointer"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <article>
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={200}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                {post.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">
                      {post.author?.charAt(0) || 'A'}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">{post.author || 'Anonymous'}</span>
                </div>
                
                <span className="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors duration-200">
                  Read More →
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
} 