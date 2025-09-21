'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Code, Database, Zap, Shield, TrendingUp, Globe, Users, Award, Play, Download, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react'

export default function APIServicesPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'endpoints', label: 'Endpoints', icon: Code },
    { id: 'examples', label: 'Examples', icon: Play },
    { id: 'pricing', label: 'Pricing', icon: Award },
    { id: 'management', label: 'Management', icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="container-custom text-center relative z-10">
          <div className="animate-fade-in">
            <div className="inline-block bg-white/15 backdrop-blur-sm border border-white/25 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
              🔌 API Services
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent">
              News API Services
            </h1>
            <p className="text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed mb-8">
              Access to curated, up-to-date news content across various categories. 
              Perfect for developers building news applications, content aggregators, and data analysis tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="#endpoints" className="btn btn-secondary text-slate-700 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                View Endpoints
              </Link>
              <Link href="/contact" className="btn btn-outline text-white border-white hover:bg-white hover:text-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get API Key
              </Link>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold mb-1">10K+</div>
                <div className="text-sm text-white/80">Articles Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold mb-1">99.9%</div>
                <div className="text-sm text-white/80">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold mb-1">24/7</div>
                <div className="text-sm text-white/80">API Access</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold mb-1">50ms</div>
                <div className="text-sm text-white/80">Avg Response</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-slate-700 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white rounded-lg shadow p-8 border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-gray-900">API Overview</h2>
                    <p className="text-gray-600">Premium News Content API</p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Access to curated, up-to-date news content across various categories. 
                  Perfect for developers building news applications, content aggregators, and data analysis tools.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300">
                    <div className="text-3xl mb-3">📰</div>
                    <h3 className="font-semibold text-gray-900 mb-2">News Articles</h3>
                    <p className="text-sm text-gray-600">Latest news content with full metadata</p>
                  </div>
                  <div className="text-center p-6 bg-green-100 rounded-xl border border-green-200 hover:shadow-md transition-all duration-300">
                    <div className="text-3xl mb-3">📂</div>
                    <h3 className="font-semibold text-gray-900 mb-2">Categories</h3>
                    <p className="text-sm text-gray-600">News organized by category</p>
                  </div>
                  <div className="text-center p-6 bg-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300">
                    <div className="text-3xl mb-3">🏷️</div>
                    <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                    <p className="text-sm text-gray-600">Topic-based filtering</p>
                  </div>
                  <div className="text-center p-6 bg-orange-100 rounded-xl border border-orange-200 hover:shadow-md transition-all duration-300">
                    <div className="text-3xl mb-3">📊</div>
                    <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
                    <p className="text-sm text-gray-600">Content statistics and insights</p>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Zap className="w-8 h-8 text-yellow-500 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">High Performance</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Lightning-fast API responses with global CDN distribution and intelligent caching.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Shield className="w-8 h-8 text-green-500 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Secure & Reliable</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Enterprise-grade security with API key authentication and rate limiting protection.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="w-8 h-8 text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Real-time Updates</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Content is updated in real-time as new articles are published and processed.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Users className="w-8 h-8 text-purple-500 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Developer Friendly</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Comprehensive documentation, SDKs, and examples for easy integration.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Endpoints Tab */}
          {activeTab === 'endpoints' && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white rounded-lg shadow p-8 border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Code className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-gray-900">API Endpoints</h2>
                    <p className="text-gray-600">RESTful API with comprehensive endpoints</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                      News Articles
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-sm font-mono text-blue-600">GET /api/blog</code>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">List all news articles with filtering</span>
                        </div>
                        <p className="text-sm text-gray-600">Retrieve paginated list of articles with optional filters</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-sm font-mono text-blue-600">GET /api/blog/[id]</code>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Get specific news article</span>
                        </div>
                        <p className="text-sm text-gray-600">Retrieve a single article by ID with full content</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-sm font-mono text-blue-600">GET /api/blog/featured</code>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Get featured articles</span>
                        </div>
                        <p className="text-sm text-gray-600">Retrieve articles marked as featured</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-sm font-mono text-blue-600">GET /api/blog/search?q=query</code>
                          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Search articles</span>
                        </div>
                        <p className="text-sm text-gray-600">Search articles by title and content</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                      Categories & Tags
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-muted p-4 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-sm font-mono text-primary">GET /api/blog/categories</code>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">List categories with article counts</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Get all available categories and their article counts</p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-sm font-mono text-primary">GET /api/blog/tags</code>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">List tags with article counts</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Get all available tags and their article counts</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                      <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                      Statistics
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-muted p-4 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-sm font-mono text-primary">GET /api/blog/stats</code>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Get news content statistics</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Retrieve comprehensive statistics about content</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Query Parameters */}
              <div className="bg-white rounded-lg shadow p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Query Parameters</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900 flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Pagination
                    </h4>
                    <ul className="text-sm space-y-2 text-gray-600">
                      <li><code className="bg-gray-100 px-2 py-1 rounded">page</code> - Page number (default: 1)</li>
                      <li><code className="bg-gray-100 px-2 py-1 rounded">limit</code> - Articles per page (default: 12)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900 flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Filtering
                    </h4>
                    <ul className="text-sm space-y-2 text-gray-600">
                      <li><code className="bg-gray-100 px-2 py-1 rounded">category</code> - Filter by category</li>
                      <li><code className="bg-gray-100 px-2 py-1 rounded">tag</code> - Filter by tag</li>
                      <li><code className="bg-gray-100 px-2 py-1 rounded">featured</code> - Featured articles only</li>
                      <li><code className="bg-gray-100 px-2 py-1 rounded">search</code> - Search in title/content</li>
                      <li><code className="bg-gray-100 px-2 py-1 rounded">author</code> - Filter by author</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900 flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Sorting
                    </h4>
                    <ul className="text-sm space-y-2 text-gray-600">
                      <li><code className="bg-gray-100 px-2 py-1 rounded">sortBy</code> - date, title, author (default: date)</li>
                      <li><code className="bg-gray-100 px-2 py-1 rounded">sortOrder</code> - asc, desc (default: desc)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900 flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Examples
                    </h4>
                    <ul className="text-sm space-y-2 text-gray-600">
                      <li><code className="bg-gray-100 px-2 py-1 rounded">?category=AI&page=1&limit=5</code></li>
                      <li><code className="bg-gray-100 px-2 py-1 rounded">?search=machine learning&featured=true</code></li>
                      <li><code className="bg-gray-100 px-2 py-1 rounded">?sortBy=title&sortOrder=asc</code></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Examples Tab */}
          {activeTab === 'examples' && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-card rounded-lg shadow p-8 border border-border">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-4">
                    <Play className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-foreground">Usage Examples</h2>
                    <p className="text-muted-foreground">Ready-to-use code examples</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                      Get Latest News
                    </h3>
                    <div className="bg-muted p-4 rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm font-mono text-primary">curl &quot;http://localhost:3000/api/blog?limit=10&quot;</code>
                        <button className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
                          <Download className="w-3 h-3 inline mr-1" />
                          Copy
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">Retrieve the latest 10 articles</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                      Get AI News
                    </h3>
                    <div className="bg-muted p-4 rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm font-mono text-primary">curl &quot;http://localhost:3000/api/blog?category=AI&page=1&limit=5&quot;</code>
                        <button className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
                          <Download className="w-3 h-3 inline mr-1" />
                          Copy
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">Get AI-related articles with pagination</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                      <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                      Search Articles
                    </h3>
                    <div className="bg-muted p-4 rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm font-mono text-primary">curl &quot;http://localhost:3000/api/blog/search?q=AI&quot;</code>
                        <button className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
                          <Download className="w-3 h-3 inline mr-1" />
                          Copy
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">Search for articles containing &quot;AI&quot;</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                      <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                      Get Featured Articles
                    </h3>
                    <div className="bg-muted p-4 rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm font-mono text-primary">curl &quot;http://localhost:3000/api/blog/featured?limit=6&quot;</code>
                        <button className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
                          <Download className="w-3 h-3 inline mr-1" />
                          Copy
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">Get 6 featured articles</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                      <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
                      Get Categories
                    </h3>
                    <div className="bg-muted p-4 rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm font-mono text-primary">curl &quot;http://localhost:3000/api/blog/categories&quot;</code>
                        <button className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
                          <Download className="w-3 h-3 inline mr-1" />
                          Copy
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">Get all available categories with article counts</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                      <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">6</span>
                      Get Statistics
                    </h3>
                    <div className="bg-muted p-4 rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm font-mono text-primary">curl &quot;http://localhost:3000/api/blog/featured&quot;</code>
                        <button className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
                          <Download className="w-3 h-3 inline mr-1" />
                          Copy
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">Get comprehensive content statistics</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Format */}
              <div className="bg-card rounded-lg shadow p-8 border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-6">Response Format</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Success Response
                    </h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto border border-border">
{`{
  "success": true,
  "data": {
    "posts": [...],
    "pagination": {
      "totalPosts": 14,
      "totalPages": 2,
      "currentPage": 1,
      "hasNextPage": true,
      "hasPrevPage": false,
      "limit": 12
    }
  }
}`}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground flex items-center">
                      <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                      Error Response
                    </h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto border border-border">
{`{
  "success": false,
  "error": "Error message",
  "message": "Detailed error description"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-card rounded-lg shadow p-8 border border-border">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mr-4">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-foreground">API Pricing & Usage</h2>
                    <p className="text-muted-foreground">Flexible plans for every need</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center p-6 border rounded-xl hover:shadow-lg transition-all duration-300">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-foreground mb-2">Free Tier</h3>
                      <div className="text-3xl font-bold text-green-600 mb-1">$0</div>
                      <p className="text-sm text-muted-foreground">Perfect for testing</p>
                    </div>
                    <ul className="text-sm space-y-3 text-left mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        1,000 requests/month
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Basic filtering
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Standard support
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Community forum access
                      </li>
                    </ul>
                    <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                      Get Started Free
                    </button>
                  </div>
                  
                  <div className="text-center p-6 border rounded-xl bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300 relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-foreground mb-2">Pro Tier</h3>
                      <div className="text-3xl font-bold text-blue-600 mb-1">$29</div>
                      <p className="text-sm text-muted-foreground">per month</p>
                    </div>
                    <ul className="text-sm space-y-3 text-left mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                        50,000 requests/month
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                        Advanced filtering
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                        Priority support
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                        Analytics dashboard
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                        Webhook notifications
                      </li>
                    </ul>
                    <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Start Pro Plan
                    </button>
                  </div>
                  
                  <div className="text-center p-6 border rounded-xl hover:shadow-lg transition-all duration-300">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-foreground mb-2">Enterprise</h3>
                      <div className="text-3xl font-bold text-purple-600 mb-1">Custom</div>
                      <p className="text-sm text-muted-foreground">Contact sales</p>
                    </div>
                    <ul className="text-sm space-y-3 text-left mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                        Unlimited requests
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                        Custom integrations
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                        Dedicated support
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                        SLA guarantees
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                        Custom features
                      </li>
                    </ul>
                    <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Management Tab */}
          {activeTab === 'management' && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white rounded-lg shadow p-8 border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Database className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-gray-900">API Management</h2>
                    <p className="text-gray-600">Manage your API keys and usage</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Monitor your API usage, manage API keys, and track performance metrics.
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* API Keys Management */}
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                      <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                      API Keys
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Generate and manage your API keys for secure access to our content API.
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="bg-white p-3 rounded border border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Production Key</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                        </div>
                        <code className="text-xs text-gray-500 mt-1 block">ck_live_••••••••••••••••••••••••••••••••</code>
                      </div>
                      <div className="bg-white p-3 rounded border border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Test Key</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Test</span>
                        </div>
                        <code className="text-xs text-gray-500 mt-1 block">ck_test_••••••••••••••••••••••••••••••••</code>
                      </div>
                    </div>
                    
                    <button className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm shadow-md">
                      Generate New Key
                    </button>
                  </div>

                  {/* Usage Analytics */}
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                      <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                      Usage Analytics
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Track your API usage, response times, and error rates.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Requests Today</span>
                        <span className="text-sm font-semibold text-gray-900">1,247</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Monthly Usage</span>
                        <span className="text-sm font-semibold text-gray-900">23,456 / 50,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Avg Response Time</span>
                        <span className="text-sm font-semibold text-gray-900">89ms</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Success Rate</span>
                        <span className="text-sm font-semibold text-green-600">99.8%</span>
                      </div>
                    </div>
                    
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm mt-4 shadow-md">
                      View Detailed Analytics
                    </button>
                  </div>
                </div>
              </div>

              {/* Rate Limits & Quotas */}
              <div className="bg-white rounded-lg shadow p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Rate Limits & Quotas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-blue-600 mb-2">1,000</div>
                    <div className="text-sm text-gray-600">Requests/Hour</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-green-600 mb-2">50,000</div>
                    <div className="text-sm text-gray-600">Requests/Month</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-purple-600 mb-2">100ms</div>
                    <div className="text-sm text-gray-600">Max Response Time</div>
                  </div>
                </div>
              </div>

              {/* Webhook Configuration */}
              <div className="bg-white rounded-lg shadow p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Webhook Configuration</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-gray-900">Content Updates</h4>
                      <p className="text-sm text-gray-600">Receive notifications when new content is published</p>
                    </div>
                    <button className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm shadow-md">
                      Configure
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-gray-900">Usage Alerts</h4>
                      <p className="text-sm text-gray-600">Get notified when approaching rate limits</p>
                    </div>
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm shadow-md">
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  )
} 