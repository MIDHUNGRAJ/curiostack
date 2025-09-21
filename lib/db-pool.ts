import { Pool } from 'pg'
import { PrismaClient } from '@prisma/client'

// Optimized Connection Pool for Railway
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, // reduced for free tier optimization
  idleTimeoutMillis: 60000, // increased to maintain connections longer
  connectionTimeoutMillis: 5000, // increased for potentially slower connections
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false
})

const globalForPrisma = global as unknown as { 
  prisma: PrismaClient;
  pool: typeof pool;
}

// Optimized Prisma configuration with connection pooling
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })

export const dbPool = globalForPrisma.pool || pool

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
  globalForPrisma.pool = pool
}

// Optimized query execution with pooling
export async function executeQuery(query: string, params?: any[]) {
  const client = await pool.connect()
  try {
    return await client.query(query, params)
  } finally {
    client.release()
  }
}

// Health check function
export async function checkDbConnection() {
  try {
    const client = await pool.connect()
    try {
      await client.query('SELECT 1')
      return true
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Database connection error:', error)
    return false
  }
}

// Cleanup function for graceful shutdown
export async function cleanup() {
  await Promise.all([
    prisma.$disconnect(),
    pool.end()
  ])
}