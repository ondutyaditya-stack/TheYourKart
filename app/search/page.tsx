'use client'

import { useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { CategoryNav } from '@/components/layout/category-nav'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/product/product-card'
import { products } from '@/lib/data'
import { Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const searchResults = useMemo(() => {
    if (!query.trim()) return []

    const searchTerms = query.toLowerCase().split(' ')

    return products.filter((product) => {
      const searchableText = `${product.name} ${product.brand} ${product.category} ${product.description || ''}`.toLowerCase()
      return searchTerms.some((term) => searchableText.includes(term))
    })
  }, [query])

  if (!query.trim()) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold mb-2">Start searching</h2>
        <p className="text-muted-foreground mb-6">
          Enter a search term to find products
        </p>
        <Link href="/products">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Browse All Products
          </Button>
        </Link>
      </div>
    )
  }

  if (searchResults.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold mb-2">No results found</h2>
        <p className="text-muted-foreground mb-6">
          {`We couldn't find any products matching "${query}"`}
        </p>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Try:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Checking your spelling</li>
            <li>Using more general terms</li>
            <li>Searching for a brand name</li>
          </ul>
        </div>
        <Link href="/products" className="inline-block mt-6">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Browse All Products
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Search Results for {`"${query}"`}
        </h1>
        <p className="text-muted-foreground">
          {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {searchResults.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default function SearchPage() {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col">
        <Header />
        <CategoryNav />

        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          <Suspense
            fallback={
              <div className="text-center py-16">
                <div className="animate-pulse">
                  <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
                  <div className="h-4 bg-muted rounded w-32 mx-auto"></div>
                </div>
              </div>
            }
          >
            <SearchResultsContent />
          </Suspense>
        </main>

        <Footer />
      </div>
    </Providers>
  )
}
