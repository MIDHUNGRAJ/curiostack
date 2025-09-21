// Simple local storage implementation
import path from 'path'

export const getUploadUrl = (filename: string): string => {
  // Always return local path
  return `/uploads/${filename}`
}

export const getStoragePath = (filename: string): string => {
  // Return the absolute path for local file storage
  return path.join(process.cwd(), 'public', 'uploads', filename)
}

// Helper function to ensure upload directory exists
export const ensureUploadDir = (): void => {
  const fs = require('fs')
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }
}