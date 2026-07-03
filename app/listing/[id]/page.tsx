'use client'

import { useState, useEffect, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BookingWidget from '@/components/features/BookingWidget'
import { fetchListingById, fetchReviewsByListingId, listings } from '@/lib/data'
import { Listing, Review } from '@/lib/types'
import { 
  Star, Heart, Share2, Shield, MapPin, Clock, 
  Wifi, Wind, Flame, Coffee, Tv, Car, Dumbbell,
  ChevronLeft, ChevronRight, X, Check
} from 'lucide-react'
import { formatPrice, cn } from '@/lib/utils'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ListingPage({ params }: PageProps) {
  const { id } = use(params)
  const [listing, setListing] = useState<Listing | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [listingData, reviewsData] = await Promise.all([
          fetchListingById(id),
          fetchReviewsByListingId(id)
        ])
        
        if (!listingData) {
          setListing(null)
        } else {
          setListing(listingData)
          setReviews(reviewsData)
          
          // Check favorites
          const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
          setIsFavorite(favorites.includes(id))
        }
      } catch (error) {
        console.error('Failed to load listing:', error)
        setListing(null)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [id])
  
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    let newFavorites: string[]
    
    if (isFavorite) {
      newFavorites = favorites.filter((f: string) => f !== id)
    } else {
      newFavorites = [...favorites, id]
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }
  
  const openGallery = (index: number) => {
    setGalleryIndex(index)
    setShowGallery(true)
  }
  
  const navigateGallery = (direction: 'prev' | 'next') => {
    if (!listing) return
    if (direction === 'prev') {
      setGalleryIndex((galleryIndex - 1 + listing.images.length) % listing.images.length)
    } else {
      setGalleryIndex((galleryIndex + 1) % listing.images.length)
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }
  
  if (!listing) {
    notFound()
  }
  
  const amenityIcons: Record<string, React.ReactNode> = {
    'WiFi': <Wifi className="w-6 h-6" />,
    'Air conditioning': <Wind className="w-6 h-6" />,
    'Kitchen': <Coffee className="w-6 h-6" />,
    'TV': <Tv className="w-6 h-6" />,
    'Parking': <Car className="w-6 h-6" />,
    'Gym': <Dumbbell className="w-6 h-6" />,
    'Fireplace': <Flame className="w-6 h-6" />,
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden">
            <div 
              className="col-span-2 row-span-2 relative aspect-square cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => openGallery(0)}
            >
              <Image
                src={listing.images[0]}
                alt={listing.title}
                fill
                className="object-cover"
              />
            </div>
            {listing.images.slice(1, 5).map((image, index) => (
              <div 
                key={index}
                className="relative aspect-square cursor-pointer hover:opacity-95 transition-opacity hidden md:block"
                onClick={() => openGallery(index + 1)}
              >
                <Image
                  src={image}
                  alt={`${listing.title} ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            <button 
              className="md:hidden absolute bottom-4 right-4 px-4 py-2 bg-white rounded-lg text-sm font-medium shadow-lg"
              onClick={() => openGallery(0)}
            >
              Show all photos
            </button>
          </div>
          
          {/* Gallery Modal */}
          {showGallery && (
            <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
              <button 
                className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full"
                onClick={() => setShowGallery(false)}
              >
                <X className="w-8 h-8" />
              </button>
              
              <button 
                className="absolute left-4 p-3 text-white hover:bg-white/10 rounded-full"
                onClick={() => navigateGallery('prev')}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <div className="relative w-full h-full max-w-5xl max-h-[80vh] m-4">
                <Image
                  src={listing.images[galleryIndex]}
                  alt={`${listing.title} ${galleryIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
              
              <button 
                className="absolute right-4 p-3 text-white hover:bg-white/10 rounded-full"
                onClick={() => navigateGallery('next')}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
              
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
                {galleryIndex + 1} / {listing.images.length}
              </p>
            </div>
          )}
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* Title Section */}
              <div className="border-b border-border pb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                      {listing.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        {listing.rating.toFixed(2)} · {listing.reviewCount} reviews
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {listing.location.city}, {listing.location.country}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigator.clipboard.writeText(window.location.href)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-surface rounded-lg transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="hidden sm:inline text-sm font-medium">Share</span>
                    </button>
                    <button 
                      onClick={toggleFavorite}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                        isFavorite ? 'text-primary' : 'hover:bg-surface'
                      )}
                    >
                      <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
                      <span className="hidden sm:inline text-sm font-medium">Save</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Host Info */}
              <div className="border-b border-border py-6">
                <div className="flex items-center gap-4">
                  <img 
                    src={listing.host.avatar} 
                    alt={listing.host.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-text-primary">
                        Hosted by {listing.host.name}
                      </h3>
                      {listing.host.isSuperhost && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                          Superhost
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary">
                      {(() => {
                        const r = listing.rooms === 1 ? 'bedroom' : 'bedrooms'
                        const b = listing.beds === 1 ? 'bed' : 'beds'
                        const bt = listing.baths === 1 ? 'bath' : 'baths'
                        return `${listing.rooms} ${r} - ${listing.beds} ${b} - ${listing.baths} ${bt}`
                      })()}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Quick Info */}
              <div className="border-b border-border py-6 space-y-6">
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-text-secondary mt-1" />
                  <div>
                    <h3 className="font-semibold text-text-primary">Peace of mind</h3>
                    <p className="text-sm text-text-secondary">
                      Get full refund if place is canceled within 24 hours of booking
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-text-secondary mt-1" />
                  <div>
                    <h3 className="font-semibold text-text-primary">Fast response</h3>
                    <p className="text-sm text-text-secondary">
                      {listing.host.name} responds within {listing.host.responseTime}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="border-b border-border py-6">
                <h2 className="text-xl font-semibold text-text-primary mb-4">About this place</h2>
                <p className="text-text-secondary leading-relaxed">
                  {listing.description}
                </p>
              </div>
              
              {/* Amenities */}
              <div className="border-b border-border py-6">
                <h2 className="text-xl font-semibold text-text-primary mb-4">What this place offers</h2>
                <div className="grid grid-cols-2 gap-4">
                  {listing.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3 text-text-secondary">
                      {amenityIcons[amenity] || <Check className="w-6 h-6" />}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Location */}
              <div className="py-6">
                <h2 className="text-xl font-semibold text-text-primary mb-4">Location</h2>
                <div className="aspect-video bg-surface rounded-xl overflow-hidden relative">
                  <iframe
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${listing.location.lng - 0.01}%2C${listing.location.lat - 0.01}%2C${listing.location.lng + 0.01}%2C${listing.location.lat + 0.01}&layer=mapnik&marker=${listing.location.lat}%2C${listing.location.lng}`}
                    className="w-full h-full border-0"
                    title="Location map"
                  />
                </div>
                <p className="mt-3 text-sm text-text-secondary">{listing.location.address}</p>
              </div>
              
              {/* Reviews */}
              <div className="py-6 border-t border-border">
                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <h2 className="text-xl font-semibold text-text-primary">
                    {listing.rating.toFixed(2)} · {listing.reviewCount} reviews
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-surface rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src={review.user.avatar}
                          alt={review.user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-text-primary">{review.user.name}</h4>
                          <p className="text-sm text-text-secondary">{review.user.date}</p>
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Booking Widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BookingWidget listing={listing} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
