'use client'

import Link from 'next/link'
import { Globe } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Safety information', href: '#' },
      { label: 'Cancellation options', href: '#' },
      { label: 'Report a concern', href: '#' },
    ],
    hosting: [
      { label: 'Become a Host', href: '#' },
      { label: 'Host resources', href: '#' },
      { label: 'Community forum', href: '#' },
      { label: 'Responsible hosting', href: '#' },
    ],
    staynest: [
      { label: 'Newsroom', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Investors', href: '#' },
      { label: 'Gift cards', href: '#' },
    ],
  }
  
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-xl font-bold text-text-primary">
                Stay<span className="text-primary">Nest</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary mb-4">
              Discover unique places to stay and experiences around the world.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">Facebook</a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">Instagram</a>
            </div>
          </div>
          
          {/* Support Column */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Hosting Column */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Hosting</h3>
            <ul className="space-y-2">
              {footerLinks.hosting.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* StayNest Column */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">StayNest</h3>
            <ul className="space-y-2">
              {footerLinks.staynest.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            © {currentYear} StayNest, Inc. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
              <Globe className="w-4 h-4" />
              English (US)
            </button>
            <button className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              $ USD
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
