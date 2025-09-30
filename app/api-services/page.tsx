import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Code, Mail, MessageCircle, Key, Shield, Globe } from 'lucide-react'

export default function APIServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block bg-white/15 backdrop-blur-sm border border-white/25 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
              🔌 API Services
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent">
              API Access Available
            </h1>
            <p className="text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed mb-8">
              Interested in accessing our content via API? Contact us to discuss your requirements and get your API key.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-slate-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <Mail className="mr-2 h-5 w-5" />
                Contact for API Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-200">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Key className="w-10 h-10 text-blue-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              API Access Available on Request
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We provide API access to our curated content for developers and businesses. 
              Contact us to discuss your requirements and receive your API key.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Code className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">RESTful API</h3>
                <p className="text-gray-600">Clean, well-documented endpoints for easy integration</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Access</h3>
                <p className="text-gray-600">API key authentication with rate limiting protection</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact for API Access
              </Link>
              
              <Link 
                href="/blog" 
                className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
              >
                <Globe className="mr-2 h-5 w-5" />
                Browse Our Content
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
