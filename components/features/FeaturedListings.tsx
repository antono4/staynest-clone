'use client'

import { useEffect, useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { fetchFeaturedListings } from '@/lib/data'
import { Listing } from '@/lib/types'
import ListingCard, { ListingCardSkeleton } from './ListingCard'

interface FeaturedListingsProps {
  title?: string
  subtitle?: string
}

export default function FeaturedListings({ 
  title = 'Featured Stays', 
  subtitle = 'Handpicked accommodations with exceptional ratings' 
}: FeaturedListingsProps) {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const loadListings = async () => {
      setLoading(true)
      try {
        const data = await fetchFeaturedListings()
        setListings(data)
      } catch (error) {
        console.error('Failed to load listings:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadListings()
  }, [])
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }
  
  const canScrollLeft = scrollPosition > 0
  const canScrollRight = scrollRef.current 
    ? scrollPosition < scrollRef.current.scrollWidth - scrollRef.current.clientWidth 
    : true
  
  return (
    <section className="py-16 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
              {title}
            </h2>
            <p className="text-text-secondary">
              {subtitle}
            </p>
          </div>
          
          {/* View All Link */}
          <a 
            href="/search"
            className="hidden md:flex items-center gap-2 text-primary font-medium hover:underline"
          >
            View all
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        
        {/* Listings Carousel */}
        <div className="relative group/listings">
          {/* Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-border flex items-center justify-center opacity-0 group-hover/listings:opacity-100 transition-all hover:scale-110 hover:shadow-xl"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-text-primary" />
            </button>
          )}
          
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-border flex items-center justify-center opacity-0 group-hover/listings:opacity-100 transition-all hover:scale-110 hover:shadow-xl"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-text-primary" />
            </button>
          )}
          
          {/* Listings Grid */}
          <div
            ref={scrollRef}
            onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loading ? (
              // Loading skeletons
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-none w-[320px]">
                  <ListingCardSkeleton />
                </div>
              ))
            ) : (
              // Actual listings
              listings.map((listing, index) => (
                <div 
                  key={listing.id}
                  className="flex-none w-[320px] animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ListingCard listing={listing} />
                </div>
              ))
            )}
          </div>
          
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-surface/50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-surface/50 to-transparent pointer-events-none" />
        </div>
        
        {/* Mobile View All Link */}
        <div className="mt-6 md:hidden text-center">
          <a 
            href="/search"
            className="inline-flex items-center gap-2 text-primary font-medium"
          >
            View all listings
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
