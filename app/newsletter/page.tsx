import { Metadata } from 'next'
import NewsletterSignup from '@/components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'Newsletter - Subscribe to CurioStack Updates',
  description: 'Subscribe to CurioStack\'s newsletter for the latest professional insights in technology and business. Stay ahead with our curated content.',
  openGraph: {
    title: 'Newsletter - Subscribe to CurioStack Updates',
    description: 'Stay ahead of the curve with CurioStack\'s weekly newsletter featuring the latest insights in technology and business.',
    url: 'https://curiostack.com/newsletter',
  },
}

export default function NewsletterPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20 lg:py-32">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
            Stay Ahead with CurioStack
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto">
            Get the latest professional insights in technology and business 
            delivered directly to your inbox.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
              Why Subscribe?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of professionals who trust CurioStack for their industry knowledge.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Latest Insights
              </h3>
              <p className="text-gray-600">
                Get fresh, professional content on the latest trends in technology, 
                business, startups, and APIs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Weekly Updates
              </h3>
              <p className="text-gray-600">
                Receive curated content every week, carefully selected to keep you 
                informed and ahead of the curve.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Professional Quality
              </h3>
              <p className="text-gray-600">
                High-quality, SEO-optimized content that rivals human-written articles 
                in depth and accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ads removed */}

      {/* Newsletter Form Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join our community of professionals and get the latest insights 
                delivered to your inbox every week.
              </p>
            </div>
            
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
              What You'll Receive
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our newsletter is packed with valuable content designed for professionals.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Featured Articles
                  </h3>
                  <p className="text-gray-600">
                    Handpicked AI-generated articles on the most relevant topics 
                    in technology and business.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Industry Insights
                  </h3>
                  <p className="text-gray-600">
                    Analysis of current trends and developments in AI, startups, 
                    APIs, and digital transformation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Expert Tips
                  </h3>
                  <p className="text-gray-600">
                    Practical advice and best practices for professionals 
                    in technology and business.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Product Updates
                  </h3>
                  <p className="text-gray-600">
                    Latest news about CurioStack features, API services, 
                    and platform improvements.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  5
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Exclusive Content
                  </h3>
                  <p className="text-gray-600">
                    Subscriber-only articles and insights not available 
                    on our public blog.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  6
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Community Highlights
                  </h3>
                  <p className="text-gray-600">
                    Showcase of how our community is using CurioStack 
                    content and APIs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
              What Our Subscribers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied professionals who rely on CurioStack for insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  JS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">John Smith</h4>
                  <p className="text-sm text-gray-600">CTO, TechCorp</p>
                </div>
              </div>
              <p className="text-gray-600">
                &quot;The quality of content in CurioStack's newsletter is outstanding. It saves me hours of research every week.&quot;
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center text-white font-semibold">
                  SJ
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Product Manager, StartupXYZ</p>
                </div>
              </div>
              <p className="text-gray-600">
                &quot;The insights I get from CurioStack help me stay ahead of industry trends 
                and make better strategic decisions.&quot;
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  MW
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Mike Wilson</h4>
                  <p className="text-sm text-gray-600">Developer, API Solutions</p>
                </div>
              </div>
              <p className="text-gray-600">
                &quot;As a developer, I appreciate the technical depth and practical insights 
                that CurioStack provides. Highly recommended!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 