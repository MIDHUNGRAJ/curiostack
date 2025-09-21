import { NextRequest, NextResponse } from 'next/server'
import { generateToken, areAdminCredsValid } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate credentials
    if (areAdminCredsValid(username, password)) {
      const token = generateToken(username)
      
      // Set HTTP-only cookie
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        user: { username }
      })

      // Set secure cookie
      response.cookies.set('admin-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return response
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Logout successful'
  })

  // Clear the auth cookie
  response.cookies.delete('admin-token')

  return response
} 