import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { Mail, Clock, Globe, MessageCircle, Linkedin, Twitter, Instagram, Youtube, Music, Phone, MapPin, Building, Users, Zap, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact - Get in Touch with CurioStack',
  description: 'Get in touch with the CurioStack team. We\'re here to help with any questions about our AI-powered content platform.',
  openGraph: {
    title: 'Contact - Get in Touch with CurioStack',
    description: 'Get in touch with the CurioStack team. We\'re here to help with any questions.',
    url: 'https://curiostack.com/contact',
  },
}

export default function ContactPage() {
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
              📞 Get in Touch
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed">
              Have questions about CurioStack? We&apos;d love to hear from you. 
              Our team is here to help with any inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="animate-slide-up">
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Contact Us
              </div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you have questions about our AI-powered content platform, 
                want to discuss partnership opportunities, or need technical support, 
                we&apos;re here to help.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">hello@curiostack.com</p>
                    <p className="text-sm text-gray-500">We respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Response Time</h3>
                    <p className="text-gray-600">We typically respond within 24 hours</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Global Support</h3>
                    <p className="text-gray-600">Available worldwide, 24/7</p>
                    <p className="text-sm text-gray-500">Multi-language support available</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Live Chat</h3>
                    <p className="text-gray-600">Available during business hours</p>
                    <p className="text-sm text-gray-500">Instant responses for urgent matters</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-bounce-in">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Ads removed */}

      {/* Office & Team Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Our Office
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
              Where to Find Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our team works remotely across the globe, bringing diverse perspectives 
              to our AI-powered content platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group animate-slide-up">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Building className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Headquarters
              </h3>
              <p className="text-gray-600 mb-2">
                San Francisco, CA
              </p>
              <p className="text-sm text-gray-500">
                AI Research & Product Development
              </p>
            </div>
            
            <div className="text-center group animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Remote Team
              </h3>
              <p className="text-gray-600 mb-2">
                Global Distribution
              </p>
              <p className="text-sm text-gray-500">
                Content Strategy & Engineering
              </p>
            </div>
            
            <div className="text-center group animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Data Centers
              </h3>
              <p className="text-gray-600 mb-2">
                Multiple Locations
              </p>
              <p className="text-sm text-gray-500">
                High-Performance AI Infrastructure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom text-center">
          <div className="animate-fade-in">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Follow Us
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
              Follow CurioStack
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Stay updated with our latest insights, product updates, and industry news 
              across our social media channels.
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            <a href="#" className="group animate-slide-up">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-200">
                <div className="mb-4">
                  <Linkedin className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">LinkedIn</h3>
                <p className="text-gray-600 text-sm">Professional insights and updates</p>
                <div className="mt-3 text-sm text-blue-600 font-medium">Follow @CurioStack</div>
              </div>
            </a>
            
            <a href="#" className="group animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-200">
                <div className="mb-4">
                  <Twitter className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Twitter</h3>
                <p className="text-gray-600 text-sm">Real-time updates and discussions</p>
                <div className="mt-3 text-sm text-blue-600 font-medium">Follow @CurioStack</div>
              </div>
            </a>
            
            <a href="#" className="group animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-200">
                <div className="mb-4">
                  <Instagram className="w-12 h-12 text-pink-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instagram</h3>
                <p className="text-gray-600 text-sm">Visual content and behind-the-scenes</p>
                <div className="mt-3 text-sm text-blue-600 font-medium">Follow @CurioStack</div>
              </div>
            </a>
            
            <a href="#" className="group animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-200">
                <div className="mb-4">
                  <Youtube className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">YouTube</h3>
                <p className="text-gray-600 text-sm">Video content and tutorials</p>
                <div className="mt-3 text-sm text-blue-600 font-medium">Subscribe to CurioStack</div>
              </div>
            </a>
            
            <a href="#" className="group animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-200">
                <div className="mb-4">
                  <Music className="w-12 h-12 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">TikTok</h3>
                <p className="text-gray-600 text-sm">Short-form tech content</p>
                <div className="mt-3 text-sm text-blue-600 font-medium">Follow @CurioStack</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              FAQ
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find quick answers to common questions about CurioStack.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6 animate-slide-up">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-soft transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How does CurioStack generate content?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We use advanced AI models combined with rigorous quality assurance processes 
                  to generate high-quality, SEO-optimized content that rivals human-written articles.
                </p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-soft transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Is the content original and plagiarism-free?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, all our content is original and generated from scratch. We use 
                  sophisticated plagiarism detection to ensure uniqueness.
                </p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-soft transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How often is new content published?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We publish new articles daily, with content automatically generated 
                  and published based on current trends and industry developments.
                </p>
              </div>
            </div>
            
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-soft transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I use CurioStack content for my business?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, our content is available for commercial use. We offer various 
                  licensing options to meet your specific needs.
                </p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-soft transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Do you offer API access?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, we provide RESTful APIs for developers to integrate our content 
                  into their applications. Contact us for early access.
                </p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-soft transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How can I stay updated with new content?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Subscribe to our newsletter, follow us on social media, or use our 
                  RSS feeds to get notified of new articles.
                </p>
              </div>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of professionals who trust CurioStack for their content needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <a href="mailto:hello@curiostack.com" className="btn btn-secondary text-slate-700 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Send Email
            </a>
            <a href="/newsletter" className="btn btn-outline text-white border-white hover:bg-white hover:text-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Subscribe Now
            </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 