// Server component wrapper; client islands inside

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CategoryCards from '@/components/CategoryCards'
import FeaturedArticles from '@/components/FeaturedArticles'
import { ArrowRight, TrendingUp, Users, Zap, Globe, Search, BookOpen, Code, Star, Clock, Eye, BarChart3, Shield, Zap as Lightning } from 'lucide-react'
import dynamic from 'next/dynamic'
const SearchComponent = dynamic(() => import('@/components/SearchComponent'), { ssr: false })
const BackToTopButton = dynamic(() => import('@/components/BackToTopButton'), { ssr: false })
import ErrorBoundary from '@/components/ErrorBoundary'

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        
        {/* Hero Section - Industry Standard */}
        <section className="relative bg-gradient-to-br from-slate-50 to-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8">
                <TrendingUp className="w-4 h-4 mr-2" />
                AI-Powered Content Platform
              </div>
              
              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                Stay Ahead with
                <span className="block text-blue-600">Professional News</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover the latest insights in technology and business. 
                Curated content from industry experts, delivered to you.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link 
                  href="/blog" 
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Explore Articles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="/api-services" 
                  className="inline-flex items-center px-8 py-4 bg-white text-slate-700 font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 transition-all duration-200 transform hover:scale-105 shadow-sm"
                >
                  <Code className="mr-2 h-5 w-5" />
                  API Services
                </Link>
              </div>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto">
                <SearchComponent 
                  placeholder="Search articles..."
                  showResults={true}
                />
              </div>
            </div>
          </div>
        </section>


        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">500+</div>
                <div className="text-slate-600">Articles Published</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">50K+</div>
                <div className="text-slate-600">Monthly Readers</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">2M+</div>
                <div className="text-slate-600">Page Views</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">95%</div>
                <div className="text-slate-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section - Industry Standard */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
                <Globe className="w-4 h-4 mr-2" />
                Industry-Focused Content
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Discover Professional Insights
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Access curated content across key business and technology domains. 
                Stay ahead with industry-specific insights, trends, and strategic analysis.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Real-time Updates</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Expert Curated</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">AI-Powered</span>
                </div>
              </div>
            </div>
            
            <CategoryCards />
            
            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Get Personalized Insights
                </h3>
                <p className="text-slate-600 mb-6">
                  Sign up for our newsletter and receive industry-specific content tailored to your interests.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/newsletter" 
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    Subscribe Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link 
                    href="/blog" 
                    className="inline-flex items-center px-6 py-3 bg-white text-slate-700 font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 transition-all duration-200 transform hover:scale-105"
                  >
                    Browse All Articles
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </section>



        {/* Featured Articles Section - Industry Standard */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                <Zap className="w-4 h-4 mr-2" />
                Featured Content
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Featured Articles
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Handpicked content from our editorial team, featuring the most important stories and insights.
              </p>
            </div>
            <FeaturedArticles />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Choose CurioStack?
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Professional insights delivered with cutting-edge AI technology
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">AI-Powered Content</h3>
                <p className="text-slate-600 leading-relaxed">
                  Advanced AI algorithms curate and generate high-quality, relevant content tailored to your interests.
                </p>
              </div>
              
              <div className="text-center p-8 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Trusted Sources</h3>
                <p className="text-slate-600 leading-relaxed">
                  Content from verified industry experts and reliable sources, ensuring accuracy and credibility.
                </p>
              </div>
              
              <div className="text-center p-8 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Real-time Updates</h3>
                <p className="text-slate-600 leading-relaxed">
                  Stay current with the latest trends and breaking news in technology and business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                What Our Readers Say
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Join thousands of professionals who trust CurioStack for their daily insights.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">
                  &quot;CurioStack has transformed how I stay informed about tech trends. The AI-generated content is incredibly insightful and saves me hours of research.&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    S
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Sarah Chen</div>
                    <div className="text-sm text-slate-600">Product Manager, TechCorp</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">
                  &quot;The depth of analysis in CurioStack&apos;s articles is impressive. It&apos;s clear they use advanced AI to deliver professional-grade content."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Michael Rodriguez</div>
                    <div className="text-sm text-slate-600">CTO, StartupXYZ</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">
                  &quot;Finally, a platform that delivers professional content without the noise. Highly recommended for business leaders.&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    E
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Emma Thompson</div>
                    <div className="text-sm text-slate-600">CEO, Innovation Labs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Industry Standard */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 text-slate-300 max-w-2xl mx-auto">
                Access our API, explore articles, or get in touch to learn more about our services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/api-services" 
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <Code className="mr-2 h-5 w-5" />
                  View API Documentation
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-slate-900 transition-all duration-200 transform hover:scale-105"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* Back to Top Button */}
        <BackToTopButton />

        <Footer />
      </div>
    </ErrorBoundary>
  )
} 