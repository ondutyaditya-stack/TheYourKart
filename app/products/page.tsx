'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { CategoryNav } from '@/components/layout/category-nav'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/product/product-card'
import { products, categories, brands } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const brandParam = searchParams.get('brand')

  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  )
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    brandParam ? [brandParam] : []
  )
  const [priceRange, setPriceRange] = useState([0, 250000])
  const [sortBy, setSortBy] = useState('featured')

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    // Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter((p) =>
        selectedBrands.includes(p.brand.toLowerCase())
      )
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'discount':
        result.sort((a, b) => b.discount - a.discount)
        break
      default:
        // featured - keep original order
        break
    }

    return result
  }, [selectedCategories, selectedBrands, priceRange, sortBy])

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    )
  }

  const toggleBrand = (slug: string) => {
    setSelectedBrands((prev) =>
      prev.includes(slug) ? prev.filter((b) => b !== slug) : [...prev, slug]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 250000])
  }

  const activeFiltersCount =
    selectedCategories.length +
    selectedBrands.length +
    (priceRange[0] > 0 || priceRange[1] < 250000 ? 1 : 0)

  return (
    <Providers>
      <div className="min-h-screen flex flex-col">
        <Header />
        <CategoryNav />

        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">All Products</h1>
              <p className="text-muted-foreground mt-1">
                {filteredProducts.length} products found
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Best Discount</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside
              className={`${
                showFilters ? 'fixed inset-0 z-50 bg-background p-4' : 'hidden'
              } md:block md:static md:w-64 flex-shrink-0`}
            >
              <div className="flex items-center justify-between mb-6 md:hidden">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  className="w-full mb-4 text-primary"
                  onClick={clearFilters}
                >
                  Clear all filters
                </Button>
              )}

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.slice(0, 6).map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedCategories.includes(category.slug)}
                        onCheckedChange={() => toggleCategory(category.slug)}
                      />
                      <span className="text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Brands</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label
                      key={brand.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedBrands.includes(brand.slug)}
                        onCheckedChange={() => toggleBrand(brand.slug)}
                      />
                      <span className="text-sm">{brand.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Price Range</h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={250000}
                  step={1000}
                  className="mb-4"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Rs. {priceRange[0].toLocaleString()}</span>
                  <span>Rs. {priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* Mobile Apply Button */}
              <Button
                className="w-full md:hidden bg-primary hover:bg-primary/90"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </Button>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground">
                    No products found matching your filters.
                  </p>
                  <Button
                    variant="link"
                    className="text-primary mt-2"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </Providers>
  )
}
