import { Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/db'

export default async function LatestPostsSection({ currentPostId }: { currentPostId: string }) {
  const rawPosts = await prisma.blogPost.findMany({
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
    }
  })
  const posts = rawPosts.filter((p: { id: string }) => p.id !== currentPostId).slice(0, 3)

  return (
    <div className="mt-20 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Latest Posts</h2>
        <p className="text-lg text-muted-foreground">Discover our most recent articles</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post: { id: string; title: string; excerpt: string; date: string; readTime: string; image: string; category: string }) => {
            const hasValidImage = Boolean(post.image && post.image.trim() !== '' && post.image !== 'null' && post.image !== 'undefined')
            return (
              <div key={post.id} className="bg-card rounded-2xl p-6 border border-border/20 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <Link href={`/blog/${post.id}`}>
                  <div className="space-y-4 cursor-pointer">
                    {hasValidImage && (
                      <div className="relative h-48 overflow-hidden rounded-xl">
                        <Image 
                          src={post.image} 
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground mb-3">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No posts available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
