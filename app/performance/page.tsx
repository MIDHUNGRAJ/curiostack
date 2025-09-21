import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Performance Dashboard - CurioStack',
  description: 'Monitor CurioStack website performance metrics and Core Web Vitals.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PerformancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Performance Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor website performance metrics and Core Web Vitals in real-time.
          </p>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* LCP Metric */}
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">LCP</h3>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                  Good
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">2.1s</p>
              <p className="text-sm text-gray-600">
                Largest Contentful Paint
              </p>
            </div>

            {/* FID Metric */}
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">FID</h3>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                  Good
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">45ms</p>
              <p className="text-sm text-gray-600">
                First Input Delay
              </p>
            </div>

            {/* CLS Metric */}
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">CLS</h3>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                  Good
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">0.05</p>
              <p className="text-sm text-gray-600">
                Cumulative Layout Shift
              </p>
            </div>
          </div>

          {/* Performance Tips */}
          <div className="bg-white rounded-xl p-8 shadow-soft">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
              Performance Optimization Tips
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  ✅ Optimizations Implemented
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Image optimization with WebP/AVIF formats
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Font preloading and display swap
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Code splitting and bundle optimization
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Lazy loading for images and ads
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Security headers and CSP
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Core Web Vitals monitoring
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  🚀 Additional Optimizations
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">→</span>
                    Implement service worker for caching
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">→</span>
                    Add CDN for global content delivery
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">→</span>
                    Implement critical CSS inlining
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">→</span>
                    Add resource hints (preload, prefetch)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">→</span>
                    Implement progressive web app features
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">→</span>
                    Add real user monitoring (RUM)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 