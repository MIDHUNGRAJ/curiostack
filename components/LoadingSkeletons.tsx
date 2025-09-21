'use client'

import { memo } from 'react'

// Optimized skeleton components for better loading states

export const BlogCardSkeleton = memo(function BlogCardSkeleton() {
  return (
    <div className="bg-card rounded-xl shadow-soft overflow-hidden border border-border/50">
      {/* Image skeleton */}
      <div className="aspect-video bg-muted/50"></div>
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Category badge */}
        <div className="h-6 bg-muted/50 rounded-full w-20"></div>
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 bg-muted/50 rounded w-full"></div>
          <div className="h-6 bg-muted/50 rounded w-3/4"></div>
        </div>
        
        {/* Excerpt */}
        <div className="space-y-2">
          <div className="h-4 bg-muted/50 rounded w-full"></div>
          <div className="h-4 bg-muted/50 rounded w-5/6"></div>
        </div>
        
        {/* Meta info */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-muted/50 rounded-full"></div>
            <div className="space-y-1">
              <div className="h-3 bg-muted/50 rounded w-16"></div>
            </div>
          </div>
          <div className="h-6 bg-muted/50 rounded w-16"></div>
          <div className="h-4 bg-muted rounded w-24"></div>
          <div className="h-4 w-4 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  )
})

export const CategoryFilterSkeleton = memo(function CategoryFilterSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-10 bg-muted rounded-full w-20"></div>
        </div>
      ))}
    </div>
  )
})

export const SearchResultSkeleton = memo(function SearchResultSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-3 border border-border rounded-lg">
          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-muted rounded w-full mb-1"></div>
          <div className="h-3 bg-muted rounded w-2/3"></div>
        </div>
      ))}
    </div>
  )
})

export const SidebarSkeleton = memo(function SidebarSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Popular Posts Skeleton */}
      <div className="bg-card rounded-lg p-6 border border-border/50">
        <div className="h-6 bg-muted rounded w-32 mb-4"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex space-x-3">
              <div className="w-16 h-16 bg-muted rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Categories Skeleton */}
      <div className="bg-card rounded-lg p-6 border border-border/50">
        <div className="h-6 bg-muted rounded w-24 mb-4"></div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-4 bg-muted rounded w-20"></div>
              <div className="h-4 bg-muted rounded w-6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

export const HeroSkeleton = memo(function HeroSkeleton() {
  return (
    <div className="text-center max-w-4xl mx-auto animate-pulse">
      {/* Badge skeleton */}
      <div className="h-8 bg-muted rounded-full w-48 mx-auto mb-8"></div>
      
      {/* Title skeleton */}
      <div className="space-y-4 mb-6">
        <div className="h-12 bg-muted rounded w-full"></div>
        <div className="h-12 bg-muted rounded w-4/5 mx-auto"></div>
      </div>
      
      {/* Subtitle skeleton */}
      <div className="space-y-2 mb-8">
        <div className="h-6 bg-muted rounded w-full"></div>
        <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
      </div>
      
      {/* Buttons skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <div className="h-12 bg-muted rounded-lg w-40"></div>
        <div className="h-12 bg-muted rounded-lg w-36"></div>
      </div>
      
      {/* Search bar skeleton */}
      <div className="h-12 bg-muted rounded-lg w-80 mx-auto"></div>
    </div>
  )
})

// Generic loading spinner
export const LoadingSpinner = memo(function LoadingSpinner({ 
  size = 'md',
  className = ''
}: {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`${sizeClasses[size]} border-2 border-gray-300 border-t-primary rounded-full animate-spin ${className}`}></div>
  )
})

// Page loading overlay
export const PageLoadingOverlay = memo(function PageLoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
})
