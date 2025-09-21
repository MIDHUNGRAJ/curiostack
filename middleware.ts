import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Cache durations
const CACHE_TIMES = {
  blogList: 60 * 5, // 5 minutes
  singleBlog: 60 * 15, // 15 minutes
  staticAssets: 60 * 60 * 24 * 7, // 7 days
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add cache headers based on route
  if (request.nextUrl.pathname.startsWith('/api/blog')) {
    response.headers.set('Cache-Control', `public, s-maxage=${CACHE_TIMES.blogList}, stale-while-revalidate`)
  }
  
  if (request.nextUrl.pathname.match(/^\/blog\/[^/]+$/)) {
    response.headers.set('Cache-Control', `public, s-maxage=${CACHE_TIMES.singleBlog}, stale-while-revalidate`)
  }

  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|webp|avif|css|js)$/)) {
    response.headers.set('Cache-Control', `public, max-age=${CACHE_TIMES.staticAssets}`)
  }

  return response
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    '/api/blog/:path*',
    '/blog/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}