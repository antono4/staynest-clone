'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Umbrella, Mountain, Building2, Trees, Waves, Snowflake, Palmtree, Landmark } from 'lucide-react'
import { categories } from '@/lib/data'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const iconMap: Record<string, React.ReactNode> = {
  Umbrella: <Umbrella className="w-6 h-6" />,
  Mountain: <Mountain className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  Trees: <Trees className="w-6 h-6" />,
  Waves: <Waves className="w-6 h-6" />,
  Snowflake: <Snowflake className="w-6 h-6" />,
  Palmtree: <Palmtree className="w-6 h-6" />,
  Landmark: <Landmark className="w-6 h-6" />,
}

export default function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }
  
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
              Browse by Category
            </h2>
            <p className="text-text-secondary">
              Explore unique stays for every type of traveler
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-border hover:bg-surface transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-text-secondary" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-border hover:bg-surface transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>
        
        {/* Categories Grid */}
        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/search?category=${category.id}`}
                className="flex-none snap-start group/category"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative w-[140px] md:w-[160px] aspect-square rounded-2xl overflow-hidden bg-surface group-hover/category:shadow-xl transition-all duration-300">
                  {/* Background Image */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/category:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <div className="mb-2 transform transition-transform duration-300 group-hover/category:-translate-y-1">
                      {iconMap[category.icon]}
                    </div>
                    <span className="font-semibold text-sm md:text-base">
                      {category.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
