"use client"

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { CategoryNav } from '@/components/layout/category-nav'
import { ProductCard } from '@/components/product/product-card'
import { Footer } from '@/components/layout/footer'
import { products, categories, formatPrice } from '@/lib/data'
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const queryParam = searchParams.get('q')

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = !categoryParam || product.category === categoryParam
      const matchesQuery = !queryParam || 
        product.name.toLowerCase().includes(queryParam.toLowerCase()) ||
        product.brand.toLowerCase().includes(queryParam.toLowerCase())
      const matchesBrand = !selectedBrand || product.brand === selectedBrand

      return matchesCategory && matchesQuery && matchesBrand
    })
  }, [categoryParam, queryParam, selectedBrand])

  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts]
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
    return result
  }, [filteredProducts, sortBy])

  const currentCategoryName = categories.find(c => c.slug === categoryParam)?.name || 'All Products'

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8 border-b pb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {queryParam ? `Search Results for "${queryParam}"` : currentCategoryName}
          </h2>
          <p className="text-muted-foreground mt-1">{sortedProducts.length} items found</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="flex-1 md:flex-none gap-2">
            <SlidersHorizontal className="h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="flex-1 md:flex-none gap-2">
            <ArrowUpDown className="h-4 w-4" /> Sort
          </Button>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Providers>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <CategoryNav />
        <main className="flex-grow">
          <Suspense fallback={<div className="text-center py-20">Loading products...</div>}>
            <ProductsContent />
          </Suspense>
        </main>
        <Footer />
      </div>
    </Providers>
  )
}
