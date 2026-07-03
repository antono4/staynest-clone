# Airbnb Clone - Project Specification

## 1. Concept & Vision

A premium vacation rental platform clone inspired by Airbnb. The application delivers a warm, inviting, and trustworthy experience that makes finding and booking accommodations feel effortless and exciting. The design emphasizes beautiful imagery, intuitive interactions, and a sense of wanderlust.

**Personality:** Warm, trustworthy, aspirational, and effortlessly sophisticated.

## 2. Design Language

### Aesthetic Direction
Inspired by Airbnb's modern yet approachable design - clean layouts with generous whitespace, hero imagery that inspires travel dreams, and a color palette that feels welcoming and premium.

### Color Palette
```
Primary:        #FF385C (Coral/Rose - brand signature)
Primary Dark:   #E31C5F (Darker coral for hover states)
Secondary:      #00A699 (Teal - secondary actions)
Background:     #FFFFFF (Pure white)
Surface:        #F7F7F7 (Light gray for cards)
Text Primary:   #222222 (Near black)
Text Secondary: #717171 (Medium gray)
Text Tertiary:  #B0B0B0 (Light gray)
Border:         #DDDDDD (Subtle borders)
Success:        #008A05 (Green for confirmations)
```

### Typography
- **Headings:** "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- **Body:** Same font family for consistency
- **Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Scale:** 12px, 14px, 16px, 18px, 22px, 28px, 32px, 40px, 56px

### Spatial System
- Base unit: 4px
- Common spacing: 8px, 12px, 16px, 24px, 32px, 48px, 64px
- Container max-width: 1280px
- Card border-radius: 12px
- Button border-radius: 8px

### Motion Philosophy
- **Micro-interactions:** 150-200ms ease-out for hovers and state changes
- **Page transitions:** 300ms ease-in-out for smooth navigation
- **Scroll reveals:** Subtle fade-up animations (400ms) for content sections
- **Image hover:** Scale 1.02 with smooth transition
- **Loading states:** Skeleton shimmer animation

### Visual Assets
- Icons: Lucide React icons (clean, consistent line icons)
- Images: Unsplash API for high-quality accommodation photos
- Decorative: Subtle shadows, rounded corners, soft gradients

## 3. Layout & Structure

### Page Architecture

#### Landing Page (Home)
1. **Navigation Bar** (sticky)
   - Logo (left)
   - Search bar (center) - expandable on scroll
   - User menu (right): login, signup, user avatar dropdown

2. **Hero Section**
   - Full-width background image with overlay
   - Bold headline: "Find your next getaway"
   - Quick search widget below

3. **Filter Bar** (sticky below nav on scroll)
   - Property type, Price range, Rooms/Beds, Amenities
   - Horizontal scrollable on mobile

4. **Featured Categories**
   - Icon + text cards for trending destinations
   - Horizontal scroll on mobile

5. **Listings Grid**
   - Responsive grid: 4 columns desktop, 2 tablet, 1 mobile
   - Card design: Image, heart icon, rating, price, title
   - Infinite scroll or pagination

6. **Footer**
   - Multi-column links, social icons, copyright

#### Search Results Page
- Map + list layout (side-by-side on desktop)
- Filter sidebar
- Sort options
- Listing cards with map markers

#### Listing Detail Page
- Image gallery (main + thumbnails)
- Host info
- Booking widget (sticky sidebar)
- Amenities grid
- Location map
- Reviews section
- Similar listings

#### User Dashboard
- Tabs: Saved, Trips, Messages, Settings
- Booking cards with status
- Wishlist grid

### Responsive Strategy
- Mobile-first approach
- Breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)
- Touch-friendly tap targets (min 44px)
- Collapsible navigation on mobile

## 4. Features & Interactions

### Core Features

#### 1. Property Search & Discovery
- **Search bar:** Location autocomplete, date picker (check-in/check-out), guest count selector
- **Filters:** Property type (entire place, private room, shared room), price slider, amenities checkboxes
- **Sort:** Relevance, Price (low/high), Rating, Newest
- **View modes:** Grid view, Map view (desktop)

#### 2. Listing Cards
- **Display:** Cover image, favorite button, rating, price per night, location
- **Hover:** Image zoom, quick-view tooltip
- **Click:** Navigate to detail page
- **Favorite:** Heart icon toggle with animation

#### 3. Listing Detail
- **Image gallery:** Lightbox modal, thumbnail navigation
- **Booking widget:** Date picker, guest selector, price calculation, book button
- **Amenities:** Icon grid with "Show all" expansion
- **Reviews:** Star rating, written reviews, host response
- **Map:** Embedded location map
- **Share/Save:** Action buttons

#### 4. User Authentication (Simulated)
- Login modal with email/password
- Signup modal
- Session persistence (localStorage)
- Protected routes (booking, wishlist)

#### 5. Booking Flow
- Select dates on calendar
- Calculate total price
- Confirm booking modal
- Success confirmation with booking reference

#### 6. Wishlist/Favorites
- Heart icon on cards to save
- Dedicated wishlist page
- Sync with user account

### Interaction Details

#### Hover States
- Buttons: Slight lift (translateY -1px) + shadow
- Cards: Image scale 1.02, shadow increase
- Links: Color change to primary

#### Loading States
- Skeleton cards with shimmer animation
- Spinner for actions
- Progress bar for multi-step flows

#### Empty States
- "No results found" with illustration
- "No favorites yet" with CTA
- "No bookings" with search suggestion

#### Error States
- Form validation with inline messages
- Toast notifications for errors
- Retry buttons where applicable

## 5. Component Inventory

### Navigation
- **Navbar:** Logo, nav links, user menu | States: default, scrolled (compact), mobile menu open
- **Mobile Menu:** Full-screen overlay with links

### Search Components
- **SearchBar:** Expandable search with icon | States: collapsed, expanded, focused
- **DatePicker:** Calendar popup | States: single date, range selection
- **GuestSelector:** Dropdown with +/- controls | States: closed, open
- **FilterChip:** Pill-shaped filter | States: default, active, disabled

### Cards
- **ListingCard:** Image, info, price | States: default, hover, favorited, loading (skeleton)
- **CategoryCard:** Icon, label | States: default, hover
- **BookingCard:** Reservation details | States: upcoming, past, cancelled

### Buttons
- **Primary:** Coral background, white text | States: default, hover, active, disabled, loading
- **Secondary:** White background, dark text, border | States: default, hover, active
- **Ghost:** Transparent, text only | States: default, hover
- **Icon:** Circle or square icon button | States: default, hover, active

### Form Elements
- **Input:** Text field | States: default, focused, error, disabled
- **Select:** Dropdown | States: closed, open, selected
- **Checkbox:** With label | States: unchecked, checked, disabled
- **RangeSlider:** Price range | States: default, dragging

### Feedback
- **Toast:** Notification popup | Variants: success, error, info
- **Modal:** Overlay dialog | Variants: small, medium, large, fullscreen
- **Skeleton:** Loading placeholder | Variants: text, image, card
- **Badge:** Small status indicator | Variants: primary, secondary, success, warning

## 6. Technical Approach

### Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React
- **State:** React hooks (useState, useContext)
- **Data:** Mock data with simulated API delays
- **Storage:** localStorage for persistence

### Project Structure
```
/app
  /page.tsx              # Landing page
  /search/page.tsx       # Search results
  /listing/[id]/page.tsx # Listing detail
  /dashboard/page.tsx    # User dashboard
  /layout.tsx            # Root layout
  /globals.css           # Global styles
/components
  /ui                    # Base components (Button, Input, Card, etc.)
  /layout                # Header, Footer, Navigation
  /features              # Feature-specific (SearchBar, ListingCard, etc.)
  /modals                # Modal components
/lib
  /data.ts               # Mock data
  /types.ts              # TypeScript types
  /utils.ts              # Utility functions
/public
  /images                # Static images
```

### Data Models

#### User
```typescript
{
  id: string
  name: string
  email: string
  avatar: string
  bookings: Booking[]
  favorites: string[] // listing IDs
}
```

#### Listing
```typescript
{
  id: string
  title: string
  description: string
  location: { city: string, country: string, lat: number, lng: number }
  images: string[]
  price: number
  rating: number
  reviewCount: number
  host: Host
  amenities: string[]
  propertyType: string
  rooms: number
  beds: number
  guests: number
}
```

#### Booking
```typescript
{
  id: string
  listingId: string
  userId: string
  checkIn: Date
  checkOut: Date
  guests: number
  totalPrice: number
  status: 'upcoming' | 'completed' | 'cancelled'
  createdAt: Date
}
```

### Mock API Simulation
- Artificial delays (300-800ms) to simulate network
- localStorage for user session and favorites
- In-memory state for search filters

### Performance Considerations
- Image lazy loading
- Component code splitting (dynamic imports)
- Optimized re-renders with React.memo
- Skeleton loading states
