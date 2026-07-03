'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, User, Menu, X, Heart, Home } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { mockUser } from '@/lib/data'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    // Check for user session
    const user = localStorage.getItem('user')
    if (user) setIsLoggedIn(true)
  }, [])
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/search', label: 'Explore' },
    { href: '/dashboard', label: 'Trips' },
  ]
  
  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'bg-white shadow-md py-3' 
            : 'bg-white/95 backdrop-blur-sm py-4'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-text-primary hidden sm:block">
                Stay<span className="text-primary">Nest</span>
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    pathname === link.href
                      ? 'bg-surface text-text-primary'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            {/* Search Bar - Center */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <Link 
                href="/search"
                className="flex items-center gap-3 w-full px-4 py-2.5 bg-surface rounded-full border border-transparent hover:border-border hover:shadow-md transition-all"
              >
                <Search className="w-4 h-4 text-text-secondary" />
                <span className="text-sm text-text-secondary">Search destinations...</span>
              </Link>
            </div>
            
            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Become a Host */}
              <Link 
                href="/host"
                className="hidden sm:block px-4 py-2 text-sm font-medium text-text-primary hover:bg-surface rounded-full transition-colors"
              >
                Become a Host
              </Link>
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-full border transition-all',
                    isUserMenuOpen 
                      ? 'border-border shadow-md' 
                      : 'border-transparent hover:border-border'
                  )}
                >
                  <Menu className="w-5 h-5 text-text-secondary" />
                  <div className="w-8 h-8 bg-surface rounded-full flex items-center justify-center">
                    {isLoggedIn ? (
                      <img 
                        src={mockUser.avatar} 
                        alt={mockUser.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-text-secondary" />
                    )}
                  </div>
                </button>
                
                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-border py-2 animate-scale-in">
                    {isLoggedIn ? (
                      <>
                        <div className="px-4 py-3 border-b border-border">
                          <p className="font-medium text-text-primary">{mockUser.name}</p>
                          <p className="text-sm text-text-secondary">{mockUser.email}</p>
                        </div>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4 text-text-secondary" />
                          <span className="text-sm">My Profile</span>
                        </Link>
                        <Link
                          href="/dashboard?tab=favorites"
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Heart className="w-4 h-4 text-text-secondary" />
                          <span className="text-sm">Saved</span>
                        </Link>
                        <div className="border-t border-border mt-2 pt-2">
                          <button
                            onClick={() => {
                              localStorage.removeItem('user')
                              setIsLoggedIn(false)
                              setIsUserMenuOpen(false)
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-red-500 hover:bg-red-50 transition-colors"
                          >
                            Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            localStorage.setItem('user', JSON.stringify(mockUser))
                            setIsLoggedIn(true)
                            setIsUserMenuOpen(false)
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-surface transition-colors"
                        >
                          Sign Up
                        </button>
                        <button
                          onClick={() => {
                            localStorage.setItem('user', JSON.stringify(mockUser))
                            setIsLoggedIn(true)
                            setIsUserMenuOpen(false)
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm hover:bg-surface transition-colors"
                        >
                          Log In
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-surface rounded-full transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-text-secondary" />
                ) : (
                  <Menu className="w-5 h-5 text-text-secondary" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl animate-slide-up">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-text-primary">
                  Stay<span className="text-primary">Nest</span>
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-surface rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>
            </div>
            
            <nav className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all',
                    pathname === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-primary hover:bg-surface'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <div className="p-4 border-t border-border">
              <Button variant="primary" className="w-full">
                Become a Host
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Spacer for fixed header */}
      <div className="h-[72px]" />
    </>
  )
}
