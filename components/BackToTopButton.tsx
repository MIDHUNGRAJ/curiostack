'use client'

import { ArrowRight } from 'lucide-react'

export default function BackToTopButton() {
  return (
    <button
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }}
      className="fixed bottom-8 right-8 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      aria-label="Back to top"
    >
      <ArrowRight className="w-5 h-5 rotate-[-90deg]" />
    </button>
  )
}


