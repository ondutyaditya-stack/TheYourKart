import Link from 'next/link'
import Image from 'next/image'
import { dealProducts, formatPrice } from '@/lib/data'

export function DealOfTheDay() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-secondary rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-6 md:p-10">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <span className="text-primary font-medium mb-2">Limited Time</span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
                Deal of the Day
              </h2>
              <p className="text-secondary-foreground/70 mb-6">
                Grab these exclusive deals before they expire. Hurry up!
              </p>

              <Link
                href="/products?sale=true"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-3 rounded-lg transition-colors w-fit"
              >
                Shop All Deals
              </Link>
            </div>

            {/* Right Content - Deal Products */}
            <div className="grid grid-cols-3 gap-3">
              {dealProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="bg-card rounded-lg p-3 hover:shadow-lg transition-shadow group"
                >
                  <div className="relative aspect-square mb-2 overflow-hidden rounded-md">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 33vw, 150px"
                    />
                    <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] font-semibold px-1.5 py-0.5 rounded">
                      {product.discount}% OFF
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 mb-1">
                    {product.brand}
                  </p>
                  <p className="text-sm font-medium text-card-foreground line-clamp-1">
                    {product.name}
                  </p>
                  <p className="text-sm font-bold text-primary mt-1">
                    {formatPrice(product.price)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
