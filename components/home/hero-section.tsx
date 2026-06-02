import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
              New Season Sale
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Next-Gen Tech at Unreal Prices
            </h1>
            <p className="text-lg text-secondary-foreground/80 max-w-lg">
              Discover the latest smartphones, laptops, and gadgets from top brands with unbeatable deals and easy EMI options.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products?category=mobiles">
                <Button size="lg" variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10">
                  Explore Deals
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Promo Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/products?category=mobiles"
              className="bg-primary rounded-xl p-6 hover:scale-105 transition-transform"
            >
              <span className="text-primary-foreground/80 text-sm">Up to 30% off</span>
              <h3 className="text-xl font-bold text-primary-foreground mt-1">Smartphones</h3>
              <p className="text-primary-foreground/70 text-sm mt-2">iPhone, Samsung, OnePlus & more</p>
            </Link>
            <Link
              href="/products?category=laptops"
              className="bg-blue-500 rounded-xl p-6 hover:scale-105 transition-transform"
            >
              <span className="text-white/80 text-sm">Starting at Rs. 34,999</span>
              <h3 className="text-xl font-bold text-white mt-1">Laptops</h3>
              <p className="text-white/70 text-sm mt-2">MacBook, Dell, HP & more</p>
            </Link>
            <Link
              href="/products?category=audio"
              className="bg-purple-500 rounded-xl p-6 hover:scale-105 transition-transform"
            >
              <span className="text-white/80 text-sm">From Rs. 999</span>
              <h3 className="text-xl font-bold text-white mt-1">Audio</h3>
              <p className="text-white/70 text-sm mt-2">Headphones & Speakers</p>
            </Link>
            <Link
              href="/products?category=wearables"
              className="bg-green-500 rounded-xl p-6 hover:scale-105 transition-transform"
            >
              <span className="text-white/80 text-sm">Special Offers</span>
              <h3 className="text-xl font-bold text-white mt-1">Wearables</h3>
              <p className="text-white/70 text-sm mt-2">Smartwatches & Bands</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
