import { ProductCard } from '@/components/product/product-card'
import { getProducts } from '@/lib/shopify'

export async function FeaturedProducts() {
  const products = await getProducts();

  return (
    <section className="py-12 bg-background border-t">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Trending on TheYourKart</h2>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">Loading premium products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
