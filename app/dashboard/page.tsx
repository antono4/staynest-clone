'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ListingCard from '@/components/features/ListingCard'
import { listings } from '@/lib/data'
import { Booking, Listing } from '@/lib/types'
import { formatPrice, formatDateRange, cn } from '@/lib/utils'
import { Heart, Calendar, MapPin, Users, CreditCard, Settings, LogOut } from 'lucide-react'
import Button from '@/components/ui/Button'

type TabType = 'trips' | 'favorites' | 'settings'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('trips')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const loadData = () => {
      setIsLoading(true)
      
      // Load bookings
      const savedBookings = localStorage.getItem('bookings')
      if (savedBookings) {
        const parsedBookings: Booking[] = JSON.parse(savedBookings)
        // Attach listing data to bookings
        const bookingsWithListings = parsedBookings.map(booking => ({
          ...booking,
          listing: listings.find(l => l.id === booking.listingId)
        }))
        setBookings(bookingsWithListings)
      }
      
      // Load favorites
      const savedFavorites = localStorage.getItem('favorites')
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
      
      setIsLoading(false)
    }
    
    loadData()
  }, [])
  
  const removeFavorite = (id: string) => {
    const newFavorites = favorites.filter(fId => fId !== id)
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }
  
  const cancelBooking = (id: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      const updatedBookings = bookings.map(b => 
        b.id === id ? { ...b, status: 'cancelled' as const } : b
      )
      setBookings(updatedBookings)
      localStorage.setItem('bookings', JSON.stringify(updatedBookings))
    }
  }
  
  const favoriteListings = listings.filter(l => favorites.includes(l.id))
  
  const tabs = [
    { id: 'trips' as const, label: 'Trips', icon: Calendar },
    { id: 'favorites' as const, label: 'Saved', icon: Heart },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ]
  
  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-100 text-green-700'
      case 'completed':
        return 'bg-gray-100 text-gray-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
    }
  }
  
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome back!</h1>
          <p className="text-text-secondary">
            Manage your trips and favorites all in one place
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-text-primary text-white'
                  : 'bg-white text-text-secondary hover:bg-surface'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.id === 'favorites' && favorites.length > 0 && (
                <span className={cn(
                  'px-2 py-0.5 text-xs rounded-full',
                  activeTab === tab.id ? 'bg-white/20' : 'bg-surface'
                )}>
                  {favorites.length}
                </span>
              )}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <>
            {/* Trips Tab */}
            {activeTab === 'trips' && (
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-6">Your Trips</h2>
                
                {bookings.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl">
                    <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-10 h-10 text-text-tertiary" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">No trips yet</h3>
                    <p className="text-text-secondary mb-6">
                      Start exploring and book your first adventure!
                    </p>
                    <Button variant="primary" onClick={() => window.location.href = '/search'}>
                      Explore Stays
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div 
                        key={booking.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row">
                          {/* Image */}
                          <div className="relative w-full md:w-64 h-48 md:h-auto">
                            <img
                              src={booking.listing?.images[0] || ''}
                              alt={booking.listing?.title || 'Listing'}
                              className="w-full h-full object-cover"
                            />
                            <span className={cn(
                              'absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium',
                              getStatusColor(booking.status)
                            )}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold text-text-primary mb-1">
                                  {booking.listing?.title || 'Unknown Listing'}
                                </h3>
                                <p className="text-sm text-text-secondary flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {booking.listing?.location.city}, {booking.listing?.location.country}
                                </p>
                              </div>
                              <span className="text-lg font-semibold text-text-primary">
                                {formatPrice(booking.totalPrice)}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDateRange(booking.checkIn, booking.checkOut)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-text-tertiary">
                                Booking ID: {booking.id}
                              </p>
                              {booking.status === 'upcoming' && (
                                <button
                                  onClick={() => cancelBooking(booking.id)}
                                  className="text-sm text-red-500 hover:text-red-600"
                                >
                                  Cancel booking
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-6">
                  Your Saved Places
                </h2>
                
                {favoriteListings.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl">
                    <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-10 h-10 text-text-tertiary" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">No saved places</h3>
                    <p className="text-text-secondary mb-6">
                      Start saving places you love by clicking the heart icon
                    </p>
                    <Button variant="primary" onClick={() => window.location.href = '/search'}>
                      Explore Stays
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteListings.map((listing) => (
                      <div key={listing.id} className="relative">
                        <ListingCard
                          listing={listing}
                          isFavorite={true}
                          onToggleFavorite={removeFavorite}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  {/* Profile Section */}
                  <div className="flex items-center gap-4 p-4 bg-surface rounded-xl">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary">Alex Johnson</h3>
                      <p className="text-sm text-text-secondary">alex@example.com</p>
                    </div>
                    <Button variant="secondary" size="sm">Edit Profile</Button>
                  </div>
                  
                  {/* Settings Options */}
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-4 hover:bg-surface rounded-xl transition-colors">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-text-secondary" />
                        <span className="font-medium text-text-primary">Payment Methods</span>
                      </div>
                      <span className="text-text-tertiary">Add</span>
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-4 hover:bg-surface rounded-xl transition-colors">
                      <div className="flex items-center gap-3">
                        <Settings className="w-5 h-5 text-text-secondary" />
                        <span className="font-medium text-text-primary">Preferences</span>
                      </div>
                      <span className="text-text-tertiary">Manage</span>
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 rounded-xl transition-colors text-red-500">
                      <div className="flex items-center gap-3">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  )
}
