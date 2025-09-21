import { Metadata } from 'next'
import Link from 'next/link'
import { Users, Award, TrendingUp, Globe, Zap, Shield, Target, Rocket } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About - CurioStack AI-Powered Publishing Platform',
  description: 'Learn about CurioStack&apos;s mission to deliver high-quality, AI-generated content across technology and business domains. Cover our innovative approach to automated publishing.',
  openGraph: {
    title: 'About - CurioStack AI-Powered Publishing Platform',
    description: 'Learn about CurioStack\'s mission to deliver high-quality, AI-generated content in technology and business.',
    url: 'https://curiostack.com/about',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="container-custom text-center relative z-10">
          <div className="animate-fade-in">
            <div className="inline-block bg-white/15 backdrop-blur-sm border border-white/25 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
              🤖 AI-Powered Content Platform
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent">
              About CurioStack
            </h1>
            <p className="text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed mb-8">
              We&apos;re revolutionizing content publishing with AI-powered insights that keep professionals ahead of the curve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/blog" className="btn btn-secondary text-slate-700 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Explore Articles
              </Link>
              <Link href="/newsletter" className="btn btn-outline text-white border-white hover:bg-white hover:text-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Subscribe Now
              </Link>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold mb-1">10K+</div>
                <div className="text-sm text-white/80">Articles Published</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold mb-1">50K+</div>
                <div className="text-sm text-white/80">Active Readers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold mb-1">99.9%</div>
                <div className="text-sm text-white/80">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold mb-1">24/7</div>
                <div className="text-sm text-white/80">Content Generation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Our Story
              </div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                CurioStack was founded with a simple yet powerful mission: to democratize access to high-quality, 
                professional insights in technology and business through AI-powered content generation.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe that staying informed about industry trends and developments shouldn&apos;t be a luxury. 
                Our AI-driven platform ensures that professionals across all levels have access to timely, 
                accurate, and actionable insights.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                By combining cutting-edge AI technology with rigorous editorial standards, we&apos;re creating a new 
                paradigm for content publishing that prioritizes quality, relevance, and accessibility.
              </p>
            </div>
            <div className="relative animate-bounce-in">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  AI-Powered Publishing
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our advanced AI systems generate high-quality content that rivals human-written articles 
                  in depth, accuracy, and engagement.
                </p>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Ads removed */}

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Our Values
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our core values shape everything we do, from content creation to user experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group animate-slide-up">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Quality First
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every piece of content undergoes rigorous quality checks to ensure accuracy, 
                relevance, and professional standards.
              </p>
            </div>
            
            <div className="text-center group animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Innovation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We continuously push the boundaries of AI technology to deliver cutting-edge 
                content solutions.
              </p>
            </div>
            
            <div className="text-center group animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Accessibility
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Making professional insights accessible to professionals worldwide, 
                regardless of their location or background.
              </p>
            </div>
            
            <div className="text-center group animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Trust & Security
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We prioritize data security and user privacy while maintaining the highest 
                standards of content integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative animate-bounce-in">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-6xl mb-4">🔬</div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  Advanced AI Technology
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Our platform leverages state-of-the-art natural language processing and 
                  machine learning algorithms to generate content that&apos;s both informative and engaging.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    GPT-4 powered content generation
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Real-time fact-checking systems
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    SEO optimization algorithms
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Quality assurance automation
                  </li>
                </ul>
              </div>
            </div>
            <div className="animate-slide-up">
              <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                How It Works
              </div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
                Our Process
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Content Generation
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our AI analyzes current trends and generates high-quality articles 
                      on relevant topics in technology and business.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Quality Assurance
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Each article undergoes automated quality checks and human review 
                      to ensure accuracy and professional standards.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      SEO Optimization
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Content is optimized for search engines to ensure maximum visibility 
                      and reach for our readers.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform duration-300">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Automated Publishing
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Articles are automatically published to our platform and distributed 
                      through our newsletter and social channels.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Our Team
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
              Meet the Minds Behind CurioStack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A diverse team of AI researchers, content strategists, and technology enthusiasts 
              CurioStack&apos;s AI-powered platform represents the future of content publishing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group animate-slide-up">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                AI Research Team
              </h3>
              <p className="text-gray-600 mb-3">
                Experts in natural language processing and machine learning
              </p>
              <div className="text-sm text-gray-500">
                PhDs in Computer Science, ML Engineers, NLP Specialists
              </div>
            </div>
            
            <div className="text-center group animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                Content Strategy
              </h3>
              <p className="text-gray-600 mb-3">
                Editorial experts ensuring quality and relevance
              </p>
              <div className="text-sm text-gray-500">
                Former Journalists, Content Strategists, SEO Experts
              </div>
            </div>
            
            <div className="text-center group animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Rocket className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                Product & Engineering
              </h3>
              <p className="text-gray-600 mb-3">
                Building the platform that powers our content
              </p>
              <div className="text-sm text-gray-500">
                Full-Stack Developers, DevOps Engineers, UX Designers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Testimonials
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
              What Our Readers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how CurioStack is helping professionals stay informed and ahead of the curve.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-soft transition-all duration-300 animate-slide-up">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Chen</h4>
                  <p className="text-sm text-gray-600">Tech Lead, Google</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                &ldquo;CurioStack has become my go-to source for AI and tech insights. The quality of content 
                is consistently high, and the AI-generated articles are indistinguishable from human-written ones.&rdquo;
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-soft transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Michael Rodriguez</h4>
                  <p className="text-sm text-gray-600">Startup Founder</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                &ldquo;As a busy entrepreneur, I need quick, reliable insights. CurioStack delivers exactly that - 
                timely, relevant content that helps me make informed decisions for my business.&rdquo;
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-soft transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  E
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Emily Watson</h4>
                  <p className="text-sm text-gray-600">Content Strategist</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                &ldquo;The depth and accuracy of CurioStack&apos;s content is impressive. It&apos;s clear that their AI 
                systems are trained on high-quality data and undergo rigorous quality checks.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="container-custom text-center relative z-10">
          <div className="animate-bounce-in">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              We&apos;re building the future of content, one article at a time.
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the power of AI-generated insights that keep you ahead of the curve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog" className="btn btn-secondary text-slate-700 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Explore Articles
              </Link>
              <Link href="/newsletter" className="btn btn-outline text-white border-white hover:bg-white hover:text-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Subscribe Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 