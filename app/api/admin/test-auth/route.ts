import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateAdmin(request)
    
    if (user) {
      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
        user: user
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Authentication failed'
      }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Authentication error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 