'use client'

import Link from 'next/link'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/product/product-card'
import { useWishlist } from '@/lib/wishlist-context'
import { products } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Heart, ArrowRight } from 'lucide-react'

export default function WishlistPage() {
  return (
    <Providers>
      <WishlistContent />
    </Providers>
  )
}

function WishlistContent() {
  const { wishlist } = useWishlist()

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id))

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-6">
              Save items you love by clicking the heart icon on any product.
            </p>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary/90">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground mt-1">
            {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} saved
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
