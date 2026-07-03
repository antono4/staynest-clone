'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Listing, Booking } from '@/lib/types'
import { formatPrice, calculateTotalPrice, getTodayString, getDateFromNow, generateId } from '@/lib/utils'
import { Calendar, Users, ChevronDown, Check, Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useToast, ToastProvider } from '@/components/ui/Toast'

interface BookingWidgetProps {
  listing: Listing
}

function BookingWidgetContent({ listing }: BookingWidgetProps) {
  const router = useRouter()
  const { showToast } = useToast()
  
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [showGuestPicker, setShowGuestPicker] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [booking, setBooking] = useState<{ id: string; nights: number; total: number } | null>(null)
  
  const priceCalculation = checkIn && checkOut 
    ? calculateTotalPrice(listing.price, checkIn, checkOut)
    : null
  
  const minCheckIn = getTodayString()
  const minCheckOut = checkIn ? getDateFromNow(1) : getTodayString()
  
  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      showToast('Please select check-in and check-out dates', 'error')
      return
    }
    
    if (new Date(checkOut) <= new Date(checkIn)) {
      showToast('Check-out date must be after check-in date', 'error')
      return
    }
    
    if (guests > listing.guests) {
      showToast(`Maximum ${listing.guests} guests allowed`, 'error')
      return
    }
    
    setIsBooking(true)
    
    // Simulate booking
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const bookingId = generateId()
    const newBooking: Booking = {
      id: bookingId,
      listingId: listing.id,
      userId: 'user1',
      checkIn,
      checkOut,
      guests,
      totalPrice: priceCalculation?.total || 0,
      status: 'upcoming',
      createdAt: new Date().toISOString(),
    }
    
    // Save to localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    bookings.push(newBooking)
    localStorage.setItem('bookings', JSON.stringify(bookings))
    
    setBooking({ id: bookingId, nights: priceCalculation?.nights || 0, total: priceCalculation?.total || 0 })
    setShowSuccessModal(true)
    setIsBooking(false)
    
    showToast('Booking confirmed!', 'success')
  }
  
  return (
    <div className="bg-white border border-border rounded-2xl shadow-xl p-6">
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-2xl font-bold text-text-primary">
          {formatPrice(listing.price)}
        </span>
        <span className="text-text-secondary">/ night</span>
      </div>
      
      {/* Date Pickers */}
      <div className="grid grid-cols-2 border border-border rounded-lg overflow-hidden mb-4">
        <div className="p-3">
          <label className="block text-xs font-semibold text-text-primary mb-1">CHECK-IN</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value)
              if (checkOut && e.target.value >= checkOut) {
                setCheckOut('')
              }
            }}
            min={minCheckIn}
            className="w-full bg-transparent text-sm outline-none cursor-pointer"
          />
        </div>
        <div className="p-3 border-l border-border">
          <label className="block text-xs font-semibold text-text-primary mb-1">CHECKOUT</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={minCheckOut}
            className="w-full bg-transparent text-sm outline-none cursor-pointer"
          />
        </div>
      </div>
      
      {/* Guest Selector */}
      <div className="relative border border-border rounded-lg p-4 mb-6 cursor-pointer" onClick={() => setShowGuestPicker(!showGuestPicker)}>
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-xs font-semibold text-text-primary">GUESTS</label>
            <p className="text-sm text-text-secondary mt-1">{guests} guest{guests > 1 ? 's' : ''}</p>
          </div>
          <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform ${showGuestPicker ? 'rotate-180' : ''}`} />
        </div>
        
        {showGuestPicker && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-xl z-10 p-4 animate-scale-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">Guests</p>
                <p className="text-sm text-text-secondary">Maximum {listing.guests} guests</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setGuests(Math.max(1, guests - 1))
                  }}
                  className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:bg-surface disabled:opacity-50"
                  disabled={guests <= 1}
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{guests}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setGuests(Math.min(listing.guests, guests + 1))
                  }}
                  className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:bg-surface disabled:opacity-50"
                  disabled={guests >= listing.guests}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Price Breakdown */}
      {priceCalculation && (
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-text-secondary">
            <span className="underline">{formatPrice(listing.price)} x {priceCalculation.nights} nights</span>
            <span>{formatPrice(listing.price * priceCalculation.nights)}</span>
          </div>
          <div className="flex justify-between text-text-secondary">
            <span className="underline">Cleaning fee</span>
            <span>{formatPrice(priceCalculation.cleaningFee)}</span>
          </div>
          <div className="flex justify-between text-text-secondary">
            <span className="underline">Service fee</span>
            <span>{formatPrice(priceCalculation.serviceFee)}</span>
          </div>
          <div className="border-t border-border pt-4">
            <div className="flex justify-between font-semibold text-text-primary">
              <span>Total</span>
              <span>{formatPrice(priceCalculation.total)}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Book Button */}
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleBooking}
        isLoading={isBooking}
      >
        {checkIn && checkOut ? 'Reserve' : 'Check availability'}
      </Button>
      
      {checkIn && checkOut && (
        <p className="text-center text-sm text-text-secondary mt-4">
          You won't be charged yet
        </p>
      )}
      
      {/* Rating */}
      <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-border">
        <Star className="w-4 h-4 fill-primary text-primary" />
        <span className="text-sm text-text-primary font-medium">
          {listing.rating.toFixed(2)}
        </span>
        <span className="text-sm text-text-secondary">
          · {listing.reviewCount} reviews
        </span>
      </div>
      
      {/* Success Modal */}
      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Booking Confirmed!</h2>
          <p className="text-text-secondary mb-4">
            Your reservation has been successfully confirmed.
          </p>
          <div className="bg-surface rounded-xl p-4 mb-6">
            <p className="text-sm text-text-secondary mb-1">Confirmation #</p>
            <p className="font-mono font-semibold text-text-primary">{booking?.id}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setShowSuccessModal(false)}>
              Close
            </Button>
            <Button variant="primary" className="flex-1" onClick={() => router.push('/dashboard')}>
              View Trips
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default function BookingWidget({ listing }: BookingWidgetProps) {
  return (
    <ToastProvider>
      <BookingWidgetContent listing={listing} />
    </ToastProvider>
  )
}
