'use client'

import Link from 'next/link'
import { categories } from '@/lib/data'
import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CategoryNav() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

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
    <nav className="border-b bg-background sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-sm md:hidden"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide py-3 gap-1 md:justify-center"
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                activeCategory === category.slug
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              onClick={() => setActiveCategory(category.slug)}
            >
              <span className="mr-1.5">{category.icon}</span>
              {category.name}
            </Link>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-sm md:hidden"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  )
}
