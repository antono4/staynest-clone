'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingProps {
  value: number
  showValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Rating({ value, showValue = true, size = 'md', className }: RatingProps) {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }
  
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Star className={cn('fill-primary text-primary', sizes[size])} />
      <span className={cn(
        'font-medium text-text-primary',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        size === 'lg' && 'text-base'
      )}>
        {value.toFixed(2)}
      </span>
      {showValue && (
        <span className={cn(
          'text-text-secondary',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          size === 'lg' && 'text-base'
        )}>
          ({value.toFixed(2)})
        </span>
      )}
    </div>
  )
}
