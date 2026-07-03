// Format currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)
}

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

// Format date range
export const formatDateRange = (checkIn: string, checkOut: string): string => {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  
  const startMonth = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(start)
  const endMonth = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(end)
  
  if (startMonth === endMonth) {
    return `${startMonth} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`
  }
  
  return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${start.getFullYear()}`
}

// Calculate nights between dates
export const calculateNights = (checkIn: string, checkOut: string): number => {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Calculate total price
export const calculateTotalPrice = (
  pricePerNight: number,
  checkIn: string,
  checkOut: string,
  cleaningFee: number = 50,
  serviceFee: number = 30
): { nights: number; pricePerNight: number; cleaningFee: number; serviceFee: number; total: number } => {
  const nights = calculateNights(checkIn, checkOut)
  const subtotal = pricePerNight * nights
  const calculatedServiceFee = Math.round(subtotal * 0.12) // 12% service fee
  
  return {
    nights,
    pricePerNight,
    cleaningFee,
    serviceFee: calculatedServiceFee,
    total: subtotal + cleaningFee + calculatedServiceFee,
  }
}

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11)
}

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Class names helper
export const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ')
}

// Format review count
export const formatReviewCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toString()
}

// Get rating text
export const getRatingText = (rating: number): string => {
  if (rating >= 4.9) return 'Exceptional'
  if (rating >= 4.8) return 'Wonderful'
  if (rating >= 4.5) return 'Great'
  if (rating >= 4.0) return 'Good'
  return 'Fair'
}

// Check if date is in the past
export const isPastDate = (dateString: string): boolean => {
  return new Date(dateString) < new Date()
}

// Get today's date as ISO string
export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0]
}

// Get date string N days from now
export const getDateFromNow = (days: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}

// Debounce function
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
