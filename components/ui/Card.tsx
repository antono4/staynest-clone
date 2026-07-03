'use client'

import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export default function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl overflow-hidden transition-all duration-200',
        hover && 'hover:shadow-xl cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-surface" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-surface rounded w-3/4" />
        <div className="h-4 bg-surface rounded w-1/2" />
        <div className="h-4 bg-surface rounded w-1/4" />
      </div>
    </div>
  )
}
