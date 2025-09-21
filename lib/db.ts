import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Optimized Prisma configuration
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    ...(process.env.DATABASE_URL && {
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    }),
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Optimized connection handling with retry logic
let isConnected = false
let connectionPromise: Promise<void> | null = null

const connectWithRetry = async (retries = 3): Promise<void> => {
  if (isConnected) return
  
  if (connectionPromise) return connectionPromise
  
  connectionPromise = (async () => {
    for (let i = 0; i < retries; i++) {
      try {
        await prisma.$connect()
        isConnected = true
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Prisma client connected successfully')
        }
        return
      } catch (error) {
        if (i === retries - 1) {
          console.error('❌ Prisma client connection failed after retries:', error)
          throw error
        }
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000))
      }
    }
  })()
  
  return connectionPromise
}

// Initialize connection
connectWithRetry().catch(() => {
  // Connection will be retried on first use
})

// Graceful shutdown
process.on('beforeExit', async () => {
  if (isConnected) {
    await prisma.$disconnect()
    isConnected = false
  }
})