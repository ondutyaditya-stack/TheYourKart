'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Plus, Check, Star } from 'lucide-react'
import { Product, formatPrice } from '@/lib/data'
import { useCart } from '@/lib/cart-context'
import { useWishlist } from '@/lib/wishlist-context'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(product)
    setTimeout(() => setIsAdding(false), 1500)
  }

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  const badgeColors = {
    Sale: 'bg-primary text-primary-foreground',
    New: 'bg-blue-500 text-white',
    Hot: 'bg-purple-500 text-white',
  }

  return (
    <div className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${badgeColors[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur-sm transition-colors ${
            isInWishlist(product.id)
              ? 'text-primary'
              : 'text-muted-foreground hover:text-primary'
          }`}
          aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {product.brand}
        </p>

        {/* Title */}
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-card-foreground line-clamp-2 mb-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="text-xs font-medium text-green-600">
              {product.discount}% off
            </span>
          </div>

          {/* Add to Cart Button */}
          <Button
            size="icon"
            onClick={handleAddToCart}
            className={`h-8 w-8 rounded-full transition-colors ${
              isAdding
                ? 'bg-green-500 hover:bg-green-500'
                : 'bg-primary hover:bg-primary/90'
            }`}
            aria-label="Add to cart"
          >
            {isAdding ? (
              <Check className="h-4 w-4 text-white" />
            ) : (
              <Plus className="h-4 w-4 text-primary-foreground" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
