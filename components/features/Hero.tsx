'use client'

import Image from 'next/image'
import SearchBar from './SearchBar'

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop"
          alt="Luxury vacation home"
          fill
          priority
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-text-primary">
            Over 1 million stays available worldwide
          </span>
        </div>
        
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-slide-up">
          Find Your Perfect
          <span className="block text-primary">Getaway</span>
        </h1>
        
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
          Discover unique stays and experiences in destinations around the world
        </p>
        
        {/* Search Bar */}
        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <SearchBar variant="hero" />
        </div>
        
        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">4.9</p>
            <p className="text-sm text-white/70">Average Rating</p>
          </div>
          <div className="w-px h-12 bg-white/30 hidden md:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-white">100K+</p>
            <p className="text-sm text-white/70">Happy Guests</p>
          </div>
          <div className="w-px h-12 bg-white/30 hidden md:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-white">50+</p>
            <p className="text-sm text-white/70">Destinations</p>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/70 rounded-full mt-2 animate-scroll" />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.3; }
        }
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
