// Performance monitoring and optimization utilities

export interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  interactionTime: number
  memoryUsage?: number
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetrics> = new Map()
  private observers: PerformanceObserver[] = []

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers()
    }
  }

  private initializeObservers() {
    // Observe Core Web Vitals
    if ('PerformanceObserver' in window) {
      // LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          this.recordMetric('LCP', { 
            loadTime: lastEntry.startTime,
            renderTime: lastEntry.startTime,
            interactionTime: 0
          })
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      this.observers.push(lcpObserver)

      // FID (First Input Delay)
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach((entry: any) => {
          this.recordMetric('FID', {
            loadTime: 0,
            renderTime: 0,
            interactionTime: entry.processingStart - entry.startTime
          })
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
      this.observers.push(fidObserver)

      // CLS (Cumulative Layout Shift)
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0
        const entries = entryList.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        this.recordMetric('CLS', {
          loadTime: clsValue,
          renderTime: 0,
          interactionTime: 0
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
      this.observers.push(clsObserver)
    }
  }

  recordMetric(name: string, metrics: PerformanceMetrics) {
    this.metrics.set(name, metrics)
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metric [${name}]:`, metrics)
    }
  }

  getMetric(name: string): PerformanceMetrics | undefined {
    return this.metrics.get(name)
  }

  getAllMetrics(): Record<string, PerformanceMetrics> {
    return Object.fromEntries(this.metrics)
  }

  measureComponentRender<T extends (...args: any[]) => any>(
    componentName: string,
    renderFunction: T
  ): T {
    return ((...args: any[]) => {
      const startTime = performance.now()
      const result = renderFunction(...args)
      const endTime = performance.now()
      
      this.recordMetric(`Component_${componentName}`, {
        loadTime: 0,
        renderTime: endTime - startTime,
        interactionTime: 0
      })
      
      return result
    }) as T
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
    this.metrics.clear()
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor()

// React hook for performance monitoring
export function usePerformanceMonitor(componentName: string) {
  if (typeof window !== 'undefined') {
    const startTime = performance.now()
    
    return {
      recordRender: () => {
        const endTime = performance.now()
        performanceMonitor.recordMetric(`Hook_${componentName}`, {
          loadTime: 0,
          renderTime: endTime - startTime,
          interactionTime: 0
        })
      },
      getMetrics: () => performanceMonitor.getAllMetrics()
    }
  }
  
  return {
    recordRender: () => {},
    getMetrics: () => ({})
  }
}

// Debounce utility for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility for performance optimization
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Memory usage monitoring
export function getMemoryUsage(): number | undefined {
  if (typeof window !== 'undefined' && 'memory' in performance) {
    return (performance as any).memory.usedJSHeapSize
  }
  return undefined
}

// Bundle size analyzer
export function analyzeBundleSize() {
  if (typeof window !== 'undefined' && 'getEntriesByType' in performance) {
    const resources = performance.getEntriesByType('resource')
    const jsResources = resources.filter(resource => 
      resource.name.includes('.js') || resource.name.includes('/_next/')
    )
    
    const totalSize = jsResources.reduce((total, resource: any) => {
      return total + (resource.transferSize || 0)
    }, 0)
    
    console.log('Bundle Analysis:', {
      totalJSSize: `${(totalSize / 1024).toFixed(2)} KB`,
      resourceCount: jsResources.length,
      resources: jsResources.map((r: any) => ({
        name: r.name,
        size: `${((r.transferSize || 0) / 1024).toFixed(2)} KB`
      }))
    })
    
    return { totalSize, resources: jsResources }
  }
  
  return null
}
