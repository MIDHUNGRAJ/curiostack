import { NextRequest } from 'next/server'
import crypto from 'crypto'

// Admin credentials
if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
  throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD environment variables must be set')
}
const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

// Token signing secret
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable must be set')
}
const JWT_SECRET = process.env.JWT_SECRET

export interface AdminUser {
  username: string
  role: 'admin' | 'editor'
  permissions: string[]
}

type JwtHeader = {
  alg: 'HS256'
  typ: 'JWT'
}

type JwtPayload = {
  sub: string
  role: 'admin' | 'editor'
  exp: number // seconds since epoch
  iat: number // seconds since epoch
  perms: string[]
}

function base64url(input: Buffer | string): string {
  const base = Buffer.isBuffer(input) ? input.toString('base64') : Buffer.from(input).toString('base64')
  return base.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function sign(data: string, secret: string): string {
  return base64url(crypto.createHmac('sha256', secret).update(data).digest())
}

export function generateToken(username: string, ttlSeconds: number = 60 * 60 * 24): string {
  const header: JwtHeader = { alg: 'HS256', typ: 'JWT' }
  const nowSec = Math.floor(Date.now() / 1000)
  const payload: JwtPayload = {
    sub: username,
    role: 'admin',
    iat: nowSec,
    exp: nowSec + ttlSeconds,
    perms: ['read', 'write', 'delete', 'manage_ads', 'manage_users'],
  }
  const encodedHeader = base64url(JSON.stringify(header))
  const encodedPayload = base64url(JSON.stringify(payload))
  const toSign = `${encodedHeader}.${encodedPayload}`
  const signature = sign(toSign, JWT_SECRET)
  return `${toSign}.${signature}`
}

export function verifyToken(token: string): AdminUser | null {
  try {
    console.log('🔍 Token verification - input token:', token)
    const parts = token.split('.')
    if (parts.length !== 3) {
      console.log('🔍 Token verification - invalid parts count:', parts.length)
      return null
    }
    const [headerB64, payloadB64, sig] = parts
    console.log('🔍 Token verification - header:', headerB64)
    console.log('🔍 Token verification - payload:', payloadB64)
    console.log('🔍 Token verification - signature:', sig)
    
    const expectedSig = sign(`${headerB64}.${payloadB64}`, JWT_SECRET)
    console.log('🔍 Token verification - expected signature:', expectedSig)
    
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) {
      console.log('🔍 Token verification - signature mismatch')
      return null
    }

    const payloadJson = Buffer.from(payloadB64.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8')
    console.log('🔍 Token verification - decoded payload:', payloadJson)
    const payload = JSON.parse(payloadJson) as JwtPayload
    const nowSec = Math.floor(Date.now() / 1000)
    console.log('🔍 Token verification - current time:', nowSec, 'expiry:', payload.exp)
    
    if (payload.exp <= nowSec) {
      console.log('🔍 Token verification - token expired')
      return null
    }

    if (payload.sub !== ADMIN_USERNAME) {
      console.log('🔍 Token verification - username mismatch:', payload.sub, 'vs', ADMIN_USERNAME)
      return null
    }

    console.log('🔍 Token verification - success')
    return {
      username: payload.sub,
      role: payload.role,
      permissions: payload.perms,
    }
  } catch (error) {
    console.log('🔍 Token verification - error:', error)
    return null
  }
}

export async function authenticateAdmin(request: NextRequest): Promise<AdminUser | null> {
  const authHeader = request.headers.get('authorization')
  const cookieHeader = request.headers.get('cookie')

  let token: string | null = null

  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.substring(7)
  }

  if (!token && cookieHeader) {
    const parsed = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      if (key && value) {
        acc[key] = value
      }
      return acc
    }, {} as Record<string, string>)
    token = parsed['admin-token']
  }

  if (!token) {
    return null
  }
  
  const result = verifyToken(token)
  return result
}

export async function requireAuth(request: NextRequest): Promise<AdminUser> {
  const user = await authenticateAdmin(request)
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

// Helpers for validating creds in login route
export function areAdminCredsValid(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}