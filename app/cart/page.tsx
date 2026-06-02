'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react'

export default function CartPage() {
  return (
    <Providers>
      <CartPageContent />
    </Providers>
  )
}

function CartPageContent() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()

  const deliveryFee = totalPrice >= 499 ? 0 : 49
  const totalWithDelivery = totalPrice + deliveryFee

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Looks like you {`haven't`} added anything to your cart yet. Start shopping to fill it up!
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-destructive"
            onClick={clearCart}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 bg-card border border-border rounded-xl p-4"
              >
                {/* Product Image */}
                <Link
                  href={`/product/${item.product.id}`}
                  className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted"
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase mb-1">
                        {item.product.brand}
                      </p>
                      <Link
                        href={`/product/${item.product.id}`}
                        className="font-medium text-card-foreground hover:text-primary line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-1.5 border border-border rounded-md hover:bg-muted transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="p-1.5 border border-border rounded-md hover:bg-muted transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-primary">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-muted-foreground">
                          {formatPrice(item.product.price)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add {formatPrice(499 - totalPrice)} more for free delivery
                  </p>
                )}
                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(totalWithDelivery)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    (Inclusive of all taxes)
                  </p>
                </div>
              </div>

              <Button className="w-full mt-6 bg-primary hover:bg-primary/90" size="lg">
                Proceed to Checkout
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  <span className="text-muted-foreground">Secure checkout with SSL</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Free delivery on orders above Rs.499</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">7-day easy returns</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">We accept:</p>
                <div className="flex flex-wrap gap-2">
                  {['Visa', 'Mastercard', 'UPI', 'RuPay', 'EMI'].map((method) => (
                    <span
                      key={method}
                      className="px-2 py-1 bg-muted rounded text-xs font-medium"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
