'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Listing } from '@/lib/types'
import { formatPrice, cn } from '@/lib/utils'
import Rating from '@/components/ui/Rating'

interface ListingCardProps {
  listing: Listing
  isFavorite?: boolean
  onToggleFavorite?: (id: string) => void
  showQuickView?: boolean
}

export default function ListingCard({ 
  listing, 
  isFavorite = false, 
  onToggleFavorite,
  showQuickView = true 
}: ListingCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleFavorite?.(listing.id)
  }

  const roomText = listing.rooms === 1 ? 'bedroom' : 'bedrooms'
  const bedText = listing.beds === 1 ? 'bed' : 'beds'
  const bathText = listing.baths === 1 ? 'bath' : 'baths'
  
  return (
    <Link href={`/listing/${listing.id}`} className="group block">
      <div 
        className="relative overflow-hidden rounded-xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-surface animate-pulse" />
          )}
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            className={cn(
              'object-cover transition-all duration-500',
              isHovered && 'scale-105',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setImageLoaded(true)}
          />
          
          <button
            onClick={handleFavoriteClick}
            className={cn(
              'absolute top-3 right-3 p-2 rounded-full transition-all z-10',
              'bg-white/90 backdrop-blur-sm hover:bg-white',
              'transform hover:scale-110 active:scale-95'
            )}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={cn(
                'w-5 h-5 transition-colors',
                isFavorite ? 'fill-primary text-primary' : 'text-text-primary'
              )}
            />
          </button>
          
          {showQuickView && isHovered && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center animate-fade-in">
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-lg">
                View Details
              </span>
            </div>
          )}
        </div>
        
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <Rating value={listing.rating} size="sm" showValue={false} />
            <span className="text-xs text-text-tertiary truncate max-w-[60%]">
              {listing.location.city}, {listing.location.country}
            </span>
          </div>
          
          <h3 className="font-medium text-text-primary truncate group-hover:text-primary transition-colors">
            {listing.title}
          </h3>
          
          <p className="text-sm text-text-secondary">
            {listing.rooms} {roomText} - {listing.beds} {bedText} - {listing.baths} {bathText}
          </p>
          
          <div className="flex items-baseline gap-1 pt-1">
            <span className="text-lg font-semibold text-text-primary">
              {formatPrice(listing.price)}
            </span>
            <span className="text-sm text-text-secondary">/ night</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function ListingCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/3] bg-surface rounded-xl" />
      <div className="p-3 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-surface rounded w-16" />
          <div className="h-4 bg-surface rounded w-20" />
        </div>
        <div className="h-4 bg-surface rounded w-3/4" />
        <div className="h-4 bg-surface rounded w-1/2" />
        <div className="h-4 bg-surface rounded w-1/4" />
      </div>
    </div>
  )
}
