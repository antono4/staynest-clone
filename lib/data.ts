import { Listing, User, Review, Booking, Host } from './types'

// Sample hosts
const hosts: Host[] = [
  {
    id: 'h1',
    name: 'Sarah Mitchell',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    isSuperhost: true,
    responseTime: 'within an hour',
    createdAt: '2019-03-15',
  },
  {
    id: 'h2',
    name: 'Marco Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    isSuperhost: true,
    responseTime: 'within a few hours',
    createdAt: '2018-07-22',
  },
  {
    id: 'h3',
    name: 'Emma Thompson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    isSuperhost: false,
    responseTime: 'within a day',
    createdAt: '2021-01-10',
  },
  {
    id: 'h4',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    isSuperhost: true,
    responseTime: 'within an hour',
    createdAt: '2017-11-05',
  },
  {
    id: 'h5',
    name: 'Yuki Tanaka',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    isSuperhost: true,
    responseTime: 'within a few hours',
    createdAt: '2020-05-18',
  },
]

// Mock listings data
export const listings: Listing[] = [
  {
    id: '1',
    title: 'Modern Downtown Loft with City Views',
    description: 'Experience urban living at its finest in this stunning modern loft. Floor-to-ceiling windows offer breathtaking views of the city skyline. The open-concept design features high ceilings, designer furniture, and a fully equipped kitchen. Just steps from top restaurants, galleries, and public transit.',
    location: {
      city: 'New York',
      country: 'United States',
      lat: 40.7128,
      lng: -74.006,
      address: '123 Manhattan Ave, New York, NY',
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    ],
    price: 285,
    rating: 4.92,
    reviewCount: 127,
    host: hosts[0],
    amenities: ['WiFi', 'Kitchen', 'Air conditioning', 'Washer', 'Dryer', 'TV', 'Elevator', 'Gym'],
    propertyType: 'Entire apartment',
    rooms: 2,
    beds: 1,
    baths: 1,
    guests: 3,
    instantBook: true,
  },
  {
    id: '2',
    title: 'Cozy Beachfront Bungalow with Ocean Views',
    description: 'Wake up to the sound of waves in this charming beachfront bungalow. Fall asleep watching the sunset from your private deck. The interior features rustic coastal decor, a comfortable living area, and a kitchen stocked for home cooking. Direct beach access included.',
    location: {
      city: 'Malibu',
      country: 'United States',
      lat: 34.0259,
      lng: -118.7798,
      address: '456 Pacific Coast Hwy, Malibu, CA',
    },
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    ],
    price: 450,
    rating: 4.88,
    reviewCount: 89,
    host: hosts[1],
    amenities: ['Beach access', 'Ocean view', 'Kitchen', 'WiFi', 'Parking', 'BBQ grill', 'Fire pit'],
    propertyType: 'Entire house',
    rooms: 3,
    beds: 2,
    baths: 2,
    guests: 5,
    instantBook: true,
  },
  {
    id: '3',
    title: 'Stylish Studio in Historic District',
    description: 'Discover the charm of the historic district in this elegantly designed studio apartment. High ceilings, exposed brick walls, and modern amenities create the perfect blend of old and new. Walking distance to museums, theaters, and acclaimed restaurants.',
    location: {
      city: 'New Orleans',
      country: 'United States',
      lat: 29.9511,
      lng: -90.0715,
      address: '789 French Quarter St, New Orleans, LA',
    },
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?w=800&h=600&fit=crop',
    ],
    price: 125,
    rating: 4.95,
    reviewCount: 203,
    host: hosts[2],
    amenities: ['WiFi', 'Kitchen', 'Air conditioning', 'Washer', 'TV', 'Patio', 'Historic building'],
    propertyType: 'Entire apartment',
    rooms: 1,
    beds: 1,
    baths: 1,
    guests: 2,
    instantBook: false,
  },
  {
    id: '4',
    title: 'Mountain Retreat with Hot Tub & Sauna',
    description: 'Escape to this stunning mountain retreat surrounded by towering pines and breathtaking views. Features a private hot tub, Finnish sauna, and floor-to-ceiling windows. Perfect for year-round adventure with hiking trails, ski slopes, and wildlife viewing.',
    location: {
      city: 'Aspen',
      country: 'United States',
      lat: 39.1911,
      lng: -106.8175,
      address: '321 Mountain View Rd, Aspen, CO',
    },
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
    ],
    price: 650,
    rating: 4.97,
    reviewCount: 56,
    host: hosts[3],
    amenities: ['Hot tub', 'Sauna', 'Fireplace', 'WiFi', 'Kitchen', 'Parking', 'Ski-in/ski-out', 'Mountain view'],
    propertyType: 'Entire house',
    rooms: 4,
    beds: 3,
    baths: 3,
    guests: 8,
    instantBook: true,
  },
  {
    id: '5',
    title: 'Minimalist Japanese-Style Garden Suite',
    description: 'Find peace and tranquility in this thoughtfully designed Japanese-inspired suite. Features a private zen garden, tatami seating area, and shoji screens. The minimalist aesthetic promotes relaxation and mindfulness.',
    location: {
      city: 'San Francisco',
      country: 'United States',
      lat: 37.7749,
      lng: -122.4194,
      address: '567 Japan Center, San Francisco, CA',
    },
    images: [
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    ],
    price: 195,
    rating: 4.89,
    reviewCount: 142,
    host: hosts[4],
    amenities: ['Garden view', 'WiFi', 'Kitchen', 'Air conditioning', 'Yoga mats', 'Tea ceremony set'],
    propertyType: 'Private room',
    rooms: 1,
    beds: 1,
    baths: 1,
    guests: 2,
    instantBook: true,
  },
  {
    id: '6',
    title: 'Luxury Penthouse with Rooftop Terrace',
    description: 'Live like royalty in this spectacular penthouse featuring a private rooftop terrace with 360-degree city views. The interior showcases designer furnishings, marble bathrooms, and a gourmet kitchen. Building amenities include concierge and valet parking.',
    location: {
      city: 'Miami',
      country: 'United States',
      lat: 25.7617,
      lng: -80.1918,
      address: '890 Brickell Ave, Miami, FL',
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    ],
    price: 890,
    rating: 4.94,
    reviewCount: 78,
    host: hosts[0],
    amenities: ['Rooftop terrace', 'Pool', 'Concierge', 'WiFi', 'Kitchen', 'Gym', 'Valet parking', 'City view'],
    propertyType: 'Entire apartment',
    rooms: 3,
    beds: 2,
    baths: 2,
    guests: 6,
    instantBook: true,
  },
  {
    id: '7',
    title: 'Charming Cottage in Vineyard',
    description: 'Surround yourself with rolling hills and grapevines in this enchanting countryside cottage. Enjoy wine tastings, fresh produce from the garden, and stunning sunset views. Perfect for a romantic getaway or peaceful retreat.',
    location: {
      city: 'Napa Valley',
      country: 'United States',
      lat: 38.2975,
      lng: -122.2869,
      address: '234 Vineyard Lane, Napa, CA',
    },
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
    ],
    price: 320,
    rating: 4.91,
    reviewCount: 167,
    host: hosts[1],
    amenities: ['Vineyard view', 'Wine cellar', 'Garden', 'WiFi', 'Kitchen', 'Fireplace', 'Breakfast included'],
    propertyType: 'Entire house',
    rooms: 2,
    beds: 1,
    baths: 1,
    guests: 3,
    instantBook: false,
  },
  {
    id: '8',
    title: 'Industrial-Chic Loft with Art Studio',
    description: 'Unleash your creativity in this unique industrial loft featuring a private art studio and gallery wall. High ceilings, concrete floors, and abundant natural light create the perfect creative space. Located in a vibrant arts district.',
    location: {
      city: 'Los Angeles',
      country: 'United States',
      lat: 34.0522,
      lng: -118.2437,
      address: '678 Arts District Blvd, Los Angeles, CA',
    },
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?w=800&h=600&fit=crop',
    ],
    price: 175,
    rating: 4.86,
    reviewCount: 94,
    host: hosts[2],
    amenities: ['Art studio', 'WiFi', 'Kitchen', 'Air conditioning', 'Washer', 'High ceilings', 'Natural light'],
    propertyType: 'Entire loft',
    rooms: 2,
    beds: 2,
    baths: 1,
    guests: 4,
    instantBook: true,
  },
  {
    id: '9',
    title: 'Secluded Treehouse Retreat',
    description: 'Live among the treetops in this magical treehouse escape. Connected by rope bridges and suspended platforms, this unique retreat offers complete privacy surrounded by ancient forest. Wake to birdsong and forest views from every window.',
    location: {
      city: 'Portland',
      country: 'United States',
      lat: 45.5152,
      lng: -122.6784,
      address: '456 Forest Park Rd, Portland, OR',
    },
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop',
    ],
    price: 275,
    rating: 4.98,
    reviewCount: 41,
    host: hosts[3],
    amenities: ['Forest view', 'Private deck', 'WiFi', 'Kitchenette', 'Heating', 'Hiking trails', 'Stargazing'],
    propertyType: 'Entire treehouse',
    rooms: 1,
    beds: 1,
    baths: 1,
    guests: 2,
    instantBook: false,
  },
  {
    id: '10',
    title: 'Boutique Hotel-Style Suite Downtown',
    description: 'Experience five-star luxury in this impeccably designed boutique suite. Hotel-quality linens, designer toiletries, and round-the-clock concierge service ensure a memorable stay. Steps from fine dining, shopping, and entertainment.',
    location: {
      city: 'Chicago',
      country: 'United States',
      lat: 41.8781,
      lng: -87.6298,
      address: '123 Magnificent Mile, Chicago, IL',
    },
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    ],
    price: 225,
    rating: 4.9,
    reviewCount: 312,
    host: hosts[4],
    amenities: ['Concierge', 'Room service', 'WiFi', 'Kitchen', 'Gym access', 'Laundry service', 'City view'],
    propertyType: 'Entire apartment',
    rooms: 1,
    beds: 1,
    baths: 1,
    guests: 2,
    instantBook: true,
  },
  {
    id: '11',
    title: 'Lakeside Cabin with Private Dock',
    description: 'Your perfect lakeside escape awaits in this charming cabin with a private dock and stunning water views. Enjoy kayaking, fishing, and swimming right from your backyard. Cozy interiors feature a stone fireplace and panoramic windows.',
    location: {
      city: 'Lake Tahoe',
      country: 'United States',
      lat: 39.0968,
      lng: -120.0324,
      address: '789 Lake Shore Dr, Lake Tahoe, CA',
    },
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop',
    ],
    price: 380,
    rating: 4.93,
    reviewCount: 118,
    host: hosts[0],
    amenities: ['Lake view', 'Private dock', 'Kayaks', 'WiFi', 'Kitchen', 'Fireplace', 'Parking', 'Beach access'],
    propertyType: 'Entire cabin',
    rooms: 2,
    beds: 2,
    baths: 1,
    guests: 5,
    instantBook: true,
  },
  {
    id: '12',
    title: 'Historic Brownstone with Garden',
    description: 'Step into history in this beautifully restored brownstone featuring original architectural details and a private garden oasis. Located on a tree-lined street in a prime neighborhood, walking distance to parks, cafes, and cultural attractions.',
    location: {
      city: 'Boston',
      country: 'United States',
      lat: 42.3601,
      lng: -71.0589,
      address: '456 Beacon Hill, Boston, MA',
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    ],
    price: 295,
    rating: 4.87,
    reviewCount: 76,
    host: hosts[1],
    amenities: ['Garden', 'Fireplace', 'WiFi', 'Kitchen', 'Air conditioning', 'Washer', 'Historic building', 'Patio'],
    propertyType: 'Entire house',
    rooms: 3,
    beds: 2,
    baths: 2,
    guests: 6,
    instantBook: false,
  },
]

// Mock reviews
export const reviews: Review[] = [
  {
    id: 'r1',
    listingId: '1',
    user: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      date: 'December 2024',
    },
    rating: 5,
    comment: 'Absolutely stunning apartment! The views are even better than the photos. Sarah was an exceptional host, very responsive and provided great recommendations. Would definitely stay here again.',
    createdAt: '2024-12-15',
  },
  {
    id: 'r2',
    listingId: '1',
    user: {
      name: 'Jessica Parker',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      date: 'November 2024',
    },
    rating: 5,
    comment: 'Perfect location and the apartment was exactly as described. Clean, modern, and had everything we needed. The check-in process was seamless.',
    createdAt: '2024-11-28',
  },
  {
    id: 'r3',
    listingId: '2',
    user: {
      name: 'David Miller',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      date: 'January 2025',
    },
    rating: 5,
    comment: 'Dream beach getaway! Waking up to ocean views and falling asleep to the sound of waves was incredible. The bungalow had everything we needed.',
    createdAt: '2025-01-10',
  },
]

// Mock current user
export const mockUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
  favorites: ['2', '4', '9'],
  bookings: [],
}

// Popular destinations for categories
export const categories = [
  { id: 'beach', name: 'Beach', icon: 'Umbrella', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop' },
  { id: 'mountain', name: 'Mountain', icon: 'Mountain', image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop' },
  { id: 'city', name: 'City', icon: 'Building2', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop' },
  { id: 'countryside', name: 'Countryside', icon: 'Trees', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop' },
  { id: 'lake', name: 'Lake', icon: 'Waves', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop' },
  { id: 'ski', name: 'Ski', icon: 'Snowflake', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop' },
  { id: 'tropical', name: 'Tropical', icon: 'Palmtree', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop' },
  { id: 'historic', name: 'Historic', icon: 'Landmark', image: 'https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?w=400&h=300&fit=crop' },
]

// Helper function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// API simulation functions
export const fetchListings = async (filters?: Partial<{
  location: string
  minPrice: number
  maxPrice: number
  propertyType: string
  guests: number
}>): Promise<Listing[]> => {
  await delay(500)
  let filtered = [...listings]
  
  if (filters?.location) {
    filtered = filtered.filter(l => 
      l.location.city.toLowerCase().includes(filters.location!.toLowerCase()) ||
      l.location.country.toLowerCase().includes(filters.location!.toLowerCase())
    )
  }
  
  if (filters?.minPrice) {
    filtered = filtered.filter(l => l.price >= filters.minPrice!)
  }
  
  if (filters?.maxPrice) {
    filtered = filtered.filter(l => l.price <= filters.maxPrice!)
  }
  
  if (filters?.propertyType) {
    filtered = filtered.filter(l => l.propertyType === filters.propertyType)
  }
  
  if (filters?.guests) {
    filtered = filtered.filter(l => l.guests >= filters.guests!)
  }
  
  return filtered
}

export const fetchListingById = async (id: string): Promise<Listing | null> => {
  await delay(300)
  return listings.find(l => l.id === id) || null
}

export const fetchReviewsByListingId = async (listingId: string): Promise<Review[]> => {
  await delay(400)
  return reviews.filter(r => r.listingId === listingId)
}

export const fetchFeaturedListings = async (): Promise<Listing[]> => {
  await delay(500)
  return listings.filter(l => l.rating >= 4.9).slice(0, 8)
}
