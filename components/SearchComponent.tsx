'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BlogPost } from '@/lib/types'
import { SecurityValidator } from '@/lib/security'
import { debounce } from '@/lib/performance'

interface SearchComponentProps {
  placeholder?: string
  className?: string
  onSearch?: (query: string) => void
  showResults?: boolean
}

export default function SearchComponent({ 
  placeholder = "Search articles...", 
  className = "",
  onSearch,
  showResults = true
}: SearchComponentProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const searchPosts = async () => {
      if (!query.trim()) {
        setResults([])
        setShowDropdown(false)
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`)
        const data = await response.json()
        
        if (data.success) {
          setResults(data.data.posts)
          setShowDropdown(true)
        }
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchPosts, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch?.(query)
      // Navigate to search results page using Next.js router
      router.push(`/blog?search=${encodeURIComponent(query)}`)
    }
  }

  const handleResultClick = (post: BlogPost) => {
    setQuery('')
    setShowDropdown(false)
    router.push(`/blog/${post.id}`)
  }

  return (
    <div className={`search-bar relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <Search className="search-icon w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="search-input"
          autoFocus
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {showResults && showDropdown && (results.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
              Searching...
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="p-3 border-b border-border">
                <div className="text-sm text-muted-foreground">
                  Found {results.length} result{results.length !== 1 ? 's' : ''}
                </div>
              </div>
              {results.map((post) => (
                <button
                  key={post.id}
                  onClick={() => handleResultClick(post)}
                  className="w-full p-4 text-left hover:bg-secondary transition-colors border-b border-border/50 last:border-b-0"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {post.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </button>
              ))}
              <div className="p-3 border-t border-border">
                <Link
                  href={`/blog?search=${encodeURIComponent(query)}`}
                  className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center justify-center"
                >
                  View all results
                </Link>
              </div>
            </>
          ) : query.trim() && (
            <div className="p-4 text-center text-muted-foreground">
              No results found for &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  )
} 