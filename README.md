# StayNest - Airbnb Clone Application

A modern, responsive vacation rental platform clone inspired by Airbnb, built with Next.js 14 and Tailwind CSS.

![StayNest Preview](https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=600&fit=crop)

## 🚀 Features

### Core Features
- **Homepage** - Beautiful hero section, category browsing, and featured listings
- **Search & Filter** - Search by location, filter by price, property type, guests, and bedrooms
- **Listing Details** - Full gallery, host info, amenities, reviews, and booking widget
- **Booking System** - Date selection, guest count, price calculation, and confirmation
- **User Dashboard** - View trips, manage favorites, account settings
- **Favorites/Wishlist** - Save listings with heart icon, persisted to localStorage

### Design Features
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Skeleton loading states
- Toast notifications
- Modal dialogs
- Map integration for locations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State**: React hooks + Context
- **Data**: Mock data with simulated API delays
- **Storage**: localStorage for persistence

## 📁 Project Structure

```
/app
  /page.tsx              # Landing page
  /search/page.tsx       # Search results page
  /listing/[id]/page.tsx # Listing detail page
  /dashboard/page.tsx    # User dashboard
  /layout.tsx            # Root layout
  /globals.css           # Global styles
/components
  /ui                    # Base components (Button, Input, Card, Modal, Toast)
  /layout                # Layout components (Header, Footer)
  /features              # Feature components (ListingCard, SearchBar, Hero, etc.)
/lib
  /data.ts               # Mock data and API functions
  /types.ts              # TypeScript type definitions
  /utils.ts              # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**

```bash
cd airbnb-clone
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

4. **Open the application**

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Pages

### Homepage (`/`)
- Hero section with search bar
- Category browsing cards
- All listings grid
- Featured listings carousel
- Call-to-action section

### Search (`/search`)
- Search by location
- Filter by price, property type, guests, bedrooms
- Active filter chips
- Responsive listings grid

### Listing Detail (`/listing/[id]`)
- Image gallery with lightbox
- Host information
- Amenities grid
- Location map
- Reviews section
- Sticky booking widget

### Dashboard (`/dashboard`)
- Tabbed interface (Trips, Saved, Settings)
- Booking history with status
- Saved favorites
- Account settings

## 🎨 Design System

### Colors
- Primary: `#FF385C` (Coral/Rose)
- Secondary: `#00A699` (Teal)
- Background: `#FFFFFF`
- Surface: `#F7F7F7`
- Text Primary: `#222222`
- Text Secondary: `#717171`

### Typography
- Font Family: Circular (Airbnb's custom font), system fallbacks
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components
- Buttons: Primary, Secondary, Ghost, Outline variants
- Cards: Listing cards with hover effects
- Modals: Overlay dialogs with animations
- Toasts: Success, error, info notifications

## 🔧 Data Persistence

The app uses localStorage to persist:
- User favorites/wishlist
- User bookings
- Simulated user session

Note: Data is stored locally in the browser and will reset when clearing browser data.

## 📄 License

This project is for educational purposes and portfolio use only. This is not affiliated with or endorsed by Airbnb.

## 🙏 Acknowledgments

- Design inspired by [Airbnb](https://www.airbnb.com)
- Images from [Unsplash](https://unsplash.com)
- Icons by [Lucide](https://lucide.dev)
