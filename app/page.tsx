'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/features/Hero'
import Categories from '@/components/features/Categories'
import FeaturedListings from '@/components/features/FeaturedListings'
import ListingCard, { ListingCardSkeleton } from '@/components/features/ListingCard'
import { listings } from '@/lib/data'
import { Listing } from '@/lib/types'

export default function HomePage() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 800)
  }, [])
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id)
        ? prev.filter(fId => fId !== id)
        : [...prev, id]
      
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }
  
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Categories Section */}
      <Categories />
      
      {/* All Listings Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
              Explore Our Stays
            </h2>
            <p className="text-text-secondary">
              Find the perfect place for your next adventure
            </p>
          </div>
          
          {/* Listings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <ListingCardSkeleton />
                </div>
              ))
            ) : (
              // Actual listings with staggered animation
              listings.map((listing, index) => (
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
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Featured Section */}
      <FeaturedListings />
      
      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
           Ready to Become a Host?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of hosts earning extra income by sharing their space
          </p>
          <button className="px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-surface transition-colors">
            Start Hosting
          </button>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
