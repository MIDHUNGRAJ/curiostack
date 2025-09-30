'use client'

import Link from 'next/link'
import { 
  Monitor, 
  Briefcase, 
  Shield, 
  Cpu, 
  ArrowRight,
  BarChart3,
  TrendingUp,
  Atom,
  Database
} from 'lucide-react'

const categories = [
  {
    name: 'Technology',
    description: 'Latest developments in software, hardware, and digital innovation',
    icon: Monitor,
    href: '/blog?category=Technology',
    color: 'from-blue-500 to-cyan-600',
    stats: '1.8K articles',
    trending: true
  },
  {
    name: 'AI',
    description: 'Artificial intelligence breakthroughs, machine learning, and automation',
    icon: Cpu,
    href: '/blog?category=AI',
    color: 'from-purple-500 to-indigo-600',
    stats: '2.3K articles',
    trending: true
  },
  {
    name: 'Business',
    description: 'Business insights, strategies, and market analysis',
    icon: Briefcase,
    href: '/blog?category=Business',
    color: 'from-emerald-500 to-teal-600',
    stats: '1.5K articles',
    trending: true
  },
  {
    name: 'Cybersecurity',
    description: 'Security threats, compliance, and protection strategies',
    icon: Shield,
    href: '/blog?category=Cybersecurity',
    color: 'from-red-500 to-pink-600',
    stats: '1.2K articles'
  },
  {
    name: 'Data Science',
    description: 'Analytics, big data, and data-driven decision making',
    icon: Database,
    href: '/blog?category=Data-Science',
    color: 'from-indigo-500 to-purple-600',
    stats: '1.1K articles',
    trending: true
  }
]

export default function CategoryCards() {
  return (
    <div className="space-y-8">
      {/* Featured Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => {
          const IconComponent = category.icon
          return (
            <Link
              key={category.name}
              href={category.href}
              className="group block"
            >
              <div 
                className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${category.color} p-6 text-white card-hover animate-slide-up hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Trending Badge */}
                {category.trending && (
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    Trending
                  </div>
                )}
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-200" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-white/90 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-xs font-medium">
                      {category.stats}
                    </span>
                    <div className="flex items-center text-white/70 text-xs">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Active
                    </div>
                  </div>
                </div>
                
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          )
        })}
      </div>
      
      {/* Articles Count */}
      <div className="text-center">
        <p className="text-gray-500 text-sm">Showing 5 categories</p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-slate-900">5</div>
          <div className="text-sm text-slate-600">Categories</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-slate-900">9.6K+</div>
          <div className="text-sm text-slate-600">Articles</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-slate-900">50K+</div>
          <div className="text-sm text-slate-600">Readers</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-slate-900">24/7</div>
          <div className="text-sm text-slate-600">Updates</div>
        </div>
      </div>
    </div>
  )
} 