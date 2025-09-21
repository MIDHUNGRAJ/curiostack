import Link from 'next/link'
import { prisma } from '@/lib/db'
import { CATEGORIES, CATEGORY_CONFIG } from '@/lib/categories'

type Category = {
  name: string
  count: number
  slug: string
  description: string
}

export default async function CategoryFilter({ currentCategory }: { currentCategory?: string | null }) {
  const posts = await prisma.blogPost.findMany({ select: { category: true } })
  const counts: Record<string, number> = {}
  posts.forEach((p: { category: string }) => {
    if ((CATEGORIES as readonly string[]).includes(p.category)) {
      counts[p.category] = (counts[p.category] || 0) + 1
    }
  })

  const categories: Category[] = (CATEGORIES as readonly string[]).map((c) => {
    const cfg = CATEGORY_CONFIG[c as keyof typeof CATEGORY_CONFIG]
    return {
      name: c,
      count: counts[c] || 0,
      slug: cfg.slug,
      description: cfg.description
    }
  })

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={`/blog`}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          !currentCategory ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.name}
          href={`/blog?category=${encodeURIComponent(category.name)}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            currentCategory === category.name ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}