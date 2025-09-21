import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { prisma } from '@/lib/db'
import { ArrowRight, User } from 'lucide-react'

async function BlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { date: 'desc' },
      take: 6,
      select: {
        id: true,
        title: true,
        excerpt: true,
        image: true,
        date: true,
        author: true,
        category: true,
        featured: true,
        tags: true,
      },
    })

    if (!posts?.length) {
      return (
        <div className="text-center p-8">
          <p className="text-muted-foreground">No blog posts found.</p>
        </div>
      )
    }

    const transformed = posts.map((post) => ({
      ...post,
      tags: JSON.parse(post.tags || '[]') as string[],
      featured: Boolean(post.featured),
    }))

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transformed.map((post) => (
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
      </div>
    )
  } catch (error) {
    console.error('Database query failed:', error)
    throw new Error('Failed to load blog posts')
  }
}

export default function BlogListServer() {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse space-y-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-xl" />
          ))}
        </div>
      }
    >
      <BlogPosts />
    </Suspense>
  )
}


