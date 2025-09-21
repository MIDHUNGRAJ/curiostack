'use client'

import { memo } from 'react'

// Minimal, fast loading component
export const FastLoader = memo(function FastLoader({ 
  size = 'md',
  className = '' 
}: { 
  size?: 'sm' | 'md' | 'lg'
  className?: string 
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  }

  return (
    <div className={`${sizeClasses[size]} border-2 border-primary/30 border-t-primary rounded-full animate-spin ${className}`} />
  )
})

// Simple text loader
export const TextLoader = memo(function TextLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <FastLoader size="sm" />
      <span>{text}</span>
    </div>
  )
})
