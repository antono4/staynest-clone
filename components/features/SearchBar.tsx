'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  variant?: 'hero' | 'header' | 'compact'
  onSearch?: (query: string) => void
  className?: string
}

export default function SearchBar({ variant = 'hero', onSearch, className }: SearchBarProps) {
  const [location, setLocation] = useState('')
  const [isExpanded, setIsExpanded] = useState(variant === 'hero')
  const router = useRouter()
  
  const handleSearch = () => {
    if (location.trim()) {
      if (onSearch) {
        onSearch(location)
      } else {
        router.push(`/search?location=${encodeURIComponent(location)}`)
      }
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  
  if (variant === 'header') {
    return (
      <div className={cn('w-full max-w-md', className)}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 w-full px-4 py-2.5 bg-surface rounded-full border border-transparent hover:border-border hover:shadow-md transition-all"
        >
          <Search className="w-4 h-4 text-text-secondary" />
          <span className="text-sm text-text-secondary">Search destinations...</span>
        </button>
      </div>
    )
  }
  
  if (variant === 'compact') {
    return (
      <div className={cn('relative', className)}>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full shadow-sm hover:shadow-md transition-all">
          <Search className="w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Where to?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button 
            onClick={handleSearch}
            className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }
  
  // Hero variant
  return (
    <div className={cn('w-full', className)}>
      <div className={cn(
        'bg-white rounded-2xl shadow-xl border border-border overflow-hidden transition-all duration-300',
        isExpanded ? 'ring-2 ring-primary' : ''
      )}>
        {/* Search Fields */}
        <div className="flex items-center">
          {/* Location */}
          <div className="flex-1 px-6 py-4 hover:bg-surface/50 transition-colors cursor-pointer">
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Where
            </label>
            <input
              type="text"
              placeholder="Search destinations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none text-text-secondary placeholder:text-text-tertiary"
            />
          </div>
          
          <div className="w-px h-12 bg-border" />
          
          {/* Check in */}
          <div className="flex-1 px-6 py-4 hover:bg-surface/50 transition-colors cursor-pointer">
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Check in
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-text-tertiary" />
              <span className="text-sm text-text-tertiary">Add dates</span>
            </div>
          </div>
          
          <div className="w-px h-12 bg-border" />
          
          {/* Check out */}
          <div className="flex-1 px-6 py-4 hover:bg-surface/50 transition-colors cursor-pointer">
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Check out
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-text-tertiary" />
              <span className="text-sm text-text-tertiary">Add dates</span>
            </div>
          </div>
          
          <div className="w-px h-12 bg-border" />
          
          {/* Guests */}
          <div className="flex-1 px-6 py-4 hover:bg-surface/50 transition-colors cursor-pointer">
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Who
            </label>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-text-tertiary" />
              <span className="text-sm text-text-tertiary">Add guests</span>
            </div>
          </div>
          
          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="m-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </div>
      </div>
      
      {/* Quick Filters */}
      <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full text-sm text-text-secondary hover:border-text-primary hover:text-text-primary transition-colors whitespace-nowrap">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Display total before taxes
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full text-sm text-text-secondary hover:border-text-primary hover:text-text-primary transition-colors whitespace-nowrap">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          Filters
        </button>
      </div>
    </div>
  )
}
