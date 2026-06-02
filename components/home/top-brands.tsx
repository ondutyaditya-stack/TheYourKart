'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { brands } from '@/lib/data'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function TopBrands() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Top Brands
        </h2>
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md hidden md:flex"
            onClick={() => scroll('left')}
            aria-label="Scroll brands left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide gap-3 py-2 px-8 md:px-12"
          >
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/products?brand=${brand.slug}`}
                className="flex-shrink-0 px-6 py-3 bg-card border border-border rounded-full hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <span className="font-medium whitespace-nowrap">{brand.name}</span>
              </Link>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md hidden md:flex"
            onClick={() => scroll('right')}
            aria-label="Scroll brands right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
