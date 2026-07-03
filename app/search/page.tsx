'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ListingCard, { ListingCardSkeleton } from '@/components/features/ListingCard'
import SearchBar from '@/components/features/SearchBar'
import { listings, fetchListings } from '@/lib/data'
import { Listing, SearchFilters } from '@/lib/types'
import { Search, SlidersHorizontal, X, MapPin, Calendar, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

function SearchContent() {
  const searchParams = useSearchParams()
  const locationQuery = searchParams.get('location') || ''
  const categoryQuery = searchParams.get('category') || ''
  
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [filters, setFilters] = useState<SearchFilters>({
    location: locationQuery,
    checkIn: null,
    checkOut: null,
    guests: 1,
    minPrice: 0,
    maxPrice: 1000,
    propertyType: '',
    rooms: 0,
    beds: 0,
    amenities: [],
  })
  
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])
  
  useEffect(() => {
    const loadListings = async () => {
      setLoading(true)
      try {
        const data = await fetchListings({
          location: filters.location,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          propertyType: filters.propertyType || undefined,
          guests: filters.guests,
        })
        setListings(data)
      } catch (error) {
        console.error('Failed to load listings:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadListings()
  }, [filters])
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id)
        ? prev.filter(fId => fId !== id)
        : [...prev, id]
      
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }
  
  const clearFilters = () => {
    setFilters({
      location: '',
      checkIn: null,
      checkOut: null,
      guests: 1,
      minPrice: 0,
      maxPrice: 1000,
      propertyType: '',
      rooms: 0,
      beds: 0,
      amenities: [],
    })
  }
  
  const propertyTypes = [
    { value: '', label: 'All types' },
    { value: 'Entire apartment', label: 'Entire apartment' },
    { value: 'Entire house', label: 'Entire house' },
    { value: 'Private room', label: 'Private room' },
    { value: 'Entire loft', label: 'Entire loft' },
    { value: 'Entire cabin', label: 'Entire cabin' },
  ]
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Search Header */}
      <div className="sticky top-[72px] z-40 bg-white border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {/* Compact Search */}
            <div className="flex-1 max-w-2xl">
              <SearchBar variant="compact" />
            </div>
            
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 border rounded-full transition-colors',
                showFilters 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-border hover:border-text-primary'
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 p-6 bg-surface rounded-2xl animate-slide-up">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold mb-3">Price range</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice || ''}
                      onChange={(e) => setFilters({...filters, minPrice: Number(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                    />
                    <span className="text-text-tertiary">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice || ''}
                      onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value) || 1000})}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                    />
                  </div>
                </div>
                
                {/* Property Type */}
                <div>
                  <label className="block text-sm font-semibold mb-3">Property type</label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                  >
                    {propertyTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                {/* Guests */}
                <div>
                  <label className="block text-sm font-semibold mb-3">Guests</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFilters({...filters, guests: Math.max(1, filters.guests - 1)})}
                      className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:bg-surface"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{filters.guests}</span>
                    <button
                      onClick={() => setFilters({...filters, guests: filters.guests + 1})}
                      className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:bg-surface"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-semibold mb-3">Bedrooms</label>
                  <div className="flex items-center gap-2">
                    {[0, 1, 2, 3, 4].map(num => (
                      <button
                        key={num}
                        onClick={() => setFilters({...filters, rooms: num})}
                        className={cn(
                          'w-8 h-8 border rounded-full text-sm transition-colors',
                          filters.rooms === num
                            ? 'bg-primary text-white border-primary'
                            : 'border-border hover:bg-surface'
                        )}
                      >
                        {num === 0 ? 'Any' : num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Filter Actions */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
                >
                  Show {listings.length} results
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              {filters.location ? `Stays in ${filters.location}` : 'All Stays'}
            </h1>
            <p className="text-text-secondary">
              {loading ? 'Searching...' : `${listings.length} places to stay`}
            </p>
          </div>
        </div>
        
        {/* Active Filters */}
        {(filters.propertyType || filters.guests > 1 || filters.minPrice > 0 || filters.maxPrice < 1000) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.propertyType && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-surface rounded-full text-sm">
                {filters.propertyType}
                <button onClick={() => setFilters({...filters, propertyType: ''})} className="hover:text-primary">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.guests > 1 && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-surface rounded-full text-sm">
                {filters.guests} guests
                <button onClick={() => setFilters({...filters, guests: 1})} className="hover:text-primary">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {(filters.minPrice > 0 || filters.maxPrice < 1000) && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-surface rounded-full text-sm">
                ${filters.minPrice} - ${filters.maxPrice}
                <button onClick={() => setFilters({...filters, minPrice: 0, maxPrice: 1000})} className="hover:text-primary">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
        
        {/* Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <ListingCardSkeleton />
              </div>
            ))}
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing, index) => (
              <div
                key={listing.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ListingCard
                  listing={listing}
                  isFavorite={favorites.includes(listing.id)}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-surface rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-text-tertiary" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">No stays found</h2>
            <p className="text-text-secondary mb-6">Try adjusting your filters or search for a different location</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
