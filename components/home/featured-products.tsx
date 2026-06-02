import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { products } from '@/lib/data'
import { ProductCard } from '@/components/product/product-card'

export function FeaturedProducts() {
  const featuredProducts = products.slice(0, 8)

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <Link
            href="/products"
            className="text-primary font-medium flex items-center gap-1 hover:underline"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
