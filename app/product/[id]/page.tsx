'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { shopifyFetch } from '@/lib/shopify'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = decodeURIComponent(params.id)
    shopifyFetch({ query: `{ product(id: "${id}") { id title description images(first: 1) { edges { node { url altText } } } priceRange { minVariantPrice { amount currencyCode } } } }` }).then((res) => {
      setProduct(res.body?.data?.product)
      setLoading(false)
    })
  }, [params.id])

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>
  if (!product) return <div className="min-h-screen flex items-center justify-center text-xl">Product not found</div>

  const price = parseFloat(product.priceRange.minVariantPrice.amount)
  const image = product.images.edges[0]?.node.url || ''

  return (
    <Providers>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-grow max-w-5xl mx-auto px-4 py-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="rounded-xl overflow-hidden border">
              <img src={image} alt={product.title} className="w-full object-cover" />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">{product.title}</h1>
              <p className="text-3xl font-bold text-primary">Rs.{price.toLocaleString()}</p>
              <p className="text-muted-foreground">{product.description}</p>
              <div className="flex flex-col gap-3 mt-4">
                <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-lg">Buy Now</button>
                <button className="w-full border border-primary text-primary py-3 rounded-lg font-semibold text-lg">Add to Cart</button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </Providers>
  )
}