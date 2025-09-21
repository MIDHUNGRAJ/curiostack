// Security utilities for input validation and sanitization

// Input validation patterns
export const ValidationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  safeText: /^[a-zA-Z0-9\s\-_.,!?]+$/
}

// Rate limiting store (in-memory for development, use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export class SecurityValidator {
  // Sanitize HTML content
  static sanitizeHtml(html: string): string {
    // Basic HTML sanitization without external dependencies
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/javascript:/gi, '')
              .replace(/on\w+="[^"]*"/gi, '')
              .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
              .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
              .replace(/<embed\b[^>]*>/gi, '')
  }

  // Validate and sanitize user input
  static validateInput(input: string, type: keyof typeof ValidationPatterns): boolean {
    if (!input || typeof input !== 'string') return false
    return ValidationPatterns[type].test(input.trim())
  }

  // Escape special characters for SQL-like queries
  static escapeString(str: string): string {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case '\0': return '\\0'
        case '\x08': return '\\b'
        case '\x09': return '\\t'
        case '\x1a': return '\\z'
        case '\n': return '\\n'
        case '\r': return '\\r'
        case '"':
        case "'":
        case '\\':
        case '%': return '\\' + char
        default: return char
      }
    })
  }

  // Rate limiting check
  static checkRateLimit(identifier: string, maxRequests: number = 100, windowMs: number = 60000): boolean {
    const now = Date.now()
    const record = rateLimitStore.get(identifier)

    if (!record || now > record.resetTime) {
      rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs })
      return true
    }

    if (record.count >= maxRequests) {
      return false
    }

    record.count++
    return true
  }

  // Clean rate limit store periodically
  static cleanupRateLimit(): void {
    const now = Date.now()
    const entries = Array.from(rateLimitStore.entries())
    for (const [key, record] of entries) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key)
      }
    }
  }

  // Validate file upload
  static validateFileUpload(file: File, allowedTypes: string[], maxSize: number): { valid: boolean; error?: string } {
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Invalid file type' }
    }

    if (file.size > maxSize) {
      return { valid: false, error: 'File too large' }
    }

    return { valid: true }
  }

  // Generate secure random token
  static generateSecureToken(length: number = 32): string {
    if (typeof window !== 'undefined' && window.crypto) {
      const array = new Uint8Array(length)
      window.crypto.getRandomValues(array)
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
    }
    
    // Fallback for server-side
    const crypto = require('crypto')
    return crypto.randomBytes(length).toString('hex')
  }

  // Validate search query for potential injection
  static validateSearchQuery(query: string): { valid: boolean; sanitized: string } {
    if (!query || typeof query !== 'string') {
      return { valid: false, sanitized: '' }
    }

    // Remove potentially dangerous characters
    const sanitized = query
      .replace(/[<>'"]/g, '') // Remove HTML/script injection chars
      .replace(/[;\\]/g, '') // Remove SQL injection chars
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()
      .substring(0, 100) // Limit length

    const valid = sanitized.length > 0 && sanitized.length <= 100

    return { valid, sanitized }
  }

  // Content Security Policy headers
  static getCSPHeaders(): Record<string, string> {
    return {
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https: http:",
        "connect-src 'self' https://www.google-analytics.com",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'"
      ].join('; '),
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  }
}

// Periodic cleanup of rate limit store
if (typeof window === 'undefined') {
  setInterval(() => {
    SecurityValidator.cleanupRateLimit()
  }, 60000) // Clean every minute
}

export default SecurityValidator
