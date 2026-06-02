'use client'

import { useEffect, useState } from 'react'

const offers = [
  'Free Delivery on orders above Rs.499',
  'Use code FIRST10 for 10% off on first order',
  'No-Cost EMI available on select products',
  'GST Invoice available on all orders',
  '7-Day Easy Returns on all products',
]

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...offers, ...offers].map((offer, index) => (
          <span key={index} className="mx-8 text-sm font-medium">
            {offer}
          </span>
        ))}
      </div>
    </div>
  )
}
