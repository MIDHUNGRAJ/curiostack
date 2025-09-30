import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BlogList from '@/components/BlogList'
import FilteredBlogPosts from '@/components/FilteredBlogPosts'
import { prisma } from '@/lib/db'
import CategoryFilter from '@/components/CategoryFilter'
import BlogSidebar from '@/components/BlogSidebar'
import { TrendingUp, Flame, Newspaper, Target, Search } from 'lucide-react'
import SearchComponent from '@/components/SearchComponent'
import TopBanner from '@/components/TopBanner'
import BottomBanner from '@/components/BottomBanner'
import { Suspense } from 'react'

// Make the page dynamic for filtering
export const dynamic = 'force-dynamic' // Enable dynamic rendering for filtering

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string }
}) {
  // Build filter conditions based on search parameters
  const whereConditions: any = {}
  
  if (searchParams.category) {
    whereConditions.category = {
      equals: searchParams.category,
      mode: 'default' // Case-sensitive comparison
    }
  }
  
  if (searchParams.search) {
    whereConditions.OR = [
      { title: { contains: searchParams.search, mode: 'insensitive' } },
      { excerpt: { contains: searchParams.search, mode: 'insensitive' } },
      { content: { contains: searchParams.search, mode: 'insensitive' } },
    ]
  }

  // Get posts directly from the database
  const initialPosts = await prisma.blogPost.findMany({
    where: Object.keys(whereConditions).length > 0 ? whereConditions : undefined,
    orderBy: { date: 'desc' },
    take: 12, // Increased limit for better UX
  })
  
  const transformed = (initialPosts || []).map((post: any) => ({
    ...post,
    tags: JSON.parse(post.tags || '[]'),
    featured: Boolean(post.featured),
  }))

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Latest Articles
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover insights, trends, and analysis from our professional content platform.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-lg mx-auto">
            <SearchComponent 
              placeholder="Search articles, categories, or topics..."
              showResults={true}
            />
          </div>
        </div>

        {/* Top Banner Ad */}
        <TopBanner 
          bannerImage="/Media62365__1400х250-new.gif" 
          linkId="1xbet"
          altText="1xBet Top Banner Advertisement"
        />

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          
          {/* Main Content */}
          <div className="lg:col-span-3 order-1">
            {/* Category Filter */}
            <div className="mb-8">
              <Suspense
                fallback={(
                  <div className="flex flex-wrap gap-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-8 bg-secondary rounded-full w-24 animate-pulse" />
                    ))}
                  </div>
                )}
              >
                <CategoryFilter currentCategory={searchParams.category || null} />
              </Suspense>
            </div>

            {/* Filtered Blog Posts */}
            <FilteredBlogPosts posts={transformed} searchParams={searchParams} />

            {/* Ads removed */}

            {/* Popular Tags - Optimized */}
            <div className="mt-12">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">Popular Tags</h3>
                <p className="text-muted-foreground">Discover content by topics that interest you</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {['Technology', 'Business', 'Startups', 'AI', 'Cybersecurity', 'Data Science', 'Web Development', 'Cloud'].map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 transform hover:scale-105"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 order-2">
            <BlogSidebar />
          </div>
        </div>
        
        {/* Bottom Banner Ad */}
        <BottomBanner 
          bannerImage="/Media62367__1920x250-new.gif" 
          linkId="1xbet"
          altText="1xBet Bottom Banner Advertisement"
        />
      </div>

      <Footer />
    </div>
  )
} 