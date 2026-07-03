export interface User {
  id: string
  name: string
  email: string
  avatar: string
  favorites: string[]
  bookings: Booking[]
}

export interface Host {
  id: string
  name: string
  avatar: string
  isSuperhost: boolean
  responseTime: string
  createdAt: string
}

export interface Listing {
  id: string
  title: string
  description: string
  location: {
    city: string
    country: string
    lat: number
    lng: number
    address: string
  }
  images: string[]
  price: number
  rating: number
  reviewCount: number
  host: Host
  amenities: string[]
  propertyType: string
  rooms: number
  beds: number
  baths: number
  guests: number
  instantBook: boolean
}

export interface Booking {
  id: string
  listingId: string
  listing?: Listing
  userId: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: 'upcoming' | 'completed' | 'cancelled'
  createdAt: string
}

export interface Review {
  id: string
  listingId: string
  user: {
    name: string
    avatar: string
    date: string
  }
  rating: number
  comment: string
  createdAt: string
}

export interface SearchFilters {
  location: string
  checkIn: string | null
  checkOut: string | null
  guests: number
  minPrice: number
  maxPrice: number
  propertyType: string
  rooms: number
  beds: number
  amenities: string[]
}
