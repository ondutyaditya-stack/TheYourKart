'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { products, formatPrice } from '@/lib/data'
import { useCart } from '@/lib/cart-context'
import { useWishlist } from '@/lib/wishlist-context'
import { Button } from '@/components/ui/button'
import {
  Star,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  BadgeCheck,
  Minus,
  Plus,
  ChevronRight,
} from 'lucide-react'

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <Providers>
      <ProductPageContent product={typeof product === 'object' ? product : products[0]} />
    </Providers>
  )
}

function ProductPageContent({ product }: { product: (typeof products)[0] }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.variants?.color?.[0] || '')
  const [selectedStorage, setSelectedStorage] = useState(product.variants?.storage?.[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const { addToCart } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()

  const thumbnails = [product.image, product.image, product.image, product.image]

  const handleAddToCart = () => {
    setIsAdding(true)
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setTimeout(() => setIsAdding(false), 1500)
  }

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  const trustFeatures = [
    { icon: Truck, label: 'Free Delivery', description: 'On orders above Rs.499' },
    { icon: RotateCcw, label: '7-Day Returns', description: 'Easy return policy' },
    { icon: ShieldCheck, label: 'SSL Secure', description: 'Safe transactions' },
    { icon: BadgeCheck, label: '100% Genuine', description: 'Authentic products' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-primary capitalize"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>

        {/* Product Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-muted rounded-xl overflow-hidden">
                <Image
                  src={thumbnails[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.badge && (
                  <span
                    className={`absolute top-4 left-4 px-3 py-1.5 text-sm font-semibold rounded-lg ${
                      product.badge === 'Sale'
                        ? 'bg-primary text-primary-foreground'
                        : product.badge === 'New'
                        ? 'bg-blue-500 text-white'
                        : 'bg-purple-500 text-white'
                    }`}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {thumbnails.map((thumb, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-transparent hover:border-muted-foreground/30'
                    }`}
                  >
                    <Image
                      src={thumb}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Details */}
            <div className="space-y-6">
              {/* Vendor */}
              <p className="text-sm text-muted-foreground uppercase tracking-wide">
                {product.brand}
              </p>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded">
                  {product.discount}% off
                </span>
              </div>

              {/* EMI Info */}
              <p className="text-sm text-muted-foreground">
                No Cost EMI from Rs.{Math.round(product.price / 12).toLocaleString()}/month
              </p>

              {/* Color Variants */}
              {product.variants?.color && (
                <div>
                  <h3 className="font-medium mb-3">
                    Color: <span className="text-muted-foreground">{selectedColor}</span>
                  </h3>
                  <div className="flex gap-2">
                    {product.variants.color.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                          selectedColor === color
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage Variants */}
              {product.variants?.storage && (
                <div>
                  <h3 className="font-medium mb-3">
                    Storage: <span className="text-muted-foreground">{selectedStorage}</span>
                  </h3>
                  <div className="flex gap-2">
                    {product.variants.storage.map((storage) => (
                      <button
                        key={storage}
                        onClick={() => setSelectedStorage(storage)}
                        className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                          selectedStorage === storage
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {storage}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="font-medium mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className={`flex-1 ${
                    isAdding
                      ? 'bg-green-500 hover:bg-green-500'
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                  onClick={handleAddToCart}
                >
                  {isAdding ? 'Added to Cart!' : 'Add to Cart'}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleWishlist}
                  className={isInWishlist(product.id) ? 'text-primary border-primary' : ''}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isInWishlist(product.id) ? 'fill-current' : ''
                    }`}
                  />
                </Button>
              </div>

              <Link href="/cart">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Buy Now
                </Button>
              </Link>

              {/* Trust Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                {trustFeatures.map((feature) => (
                  <div key={feature.label} className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{feature.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-xl font-bold mb-4">Product Description</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              {product.description ||
                `Experience premium quality with the ${product.name}. This ${product.brand} product combines cutting-edge technology with sleek design, delivering exceptional performance for everyday use. Backed by our 7-day return policy and 100% genuine product guarantee.`}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
