import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: 'Force logout successful'
  })

  // Clear all possible auth cookies
  response.cookies.delete('admin-token')
  response.cookies.set('admin-token', '', { maxAge: 0 })
  response.cookies.set('admin-token', '', { expires: new Date(0) })
  
  return response
} 