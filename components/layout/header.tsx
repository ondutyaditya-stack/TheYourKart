'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/lib/cart-context'
import { useRouter } from 'next/navigation'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { totalItems } = useCart()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-background transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-xl md:text-2xl font-bold">
              <span className="text-primary">TheYour</span>
              <span className="text-secondary">Kart</span>
            </h1>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl mx-4"
          >
            <div className="flex w-full">
              <Input
                type="search"
                placeholder="Search for mobiles, laptops, cameras..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                type="submit"
                className="rounded-l-none bg-primary hover:bg-primary/90"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/wishlist" className="hidden md:block">
              <Button variant="ghost" size="icon" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Shopping cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="hidden md:flex" aria-label="User account">
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="flex w-full">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="submit"
              className="rounded-l-none bg-primary hover:bg-primary/90"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            <Link
              href="/products"
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Products
            </Link>
            <Link
              href="/wishlist"
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Wishlist
            </Link>
            <Link
              href="/cart"
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cart
            </Link>
            <Link
              href="#"
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
