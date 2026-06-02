import Link from 'next/link'
import { categories } from '@/lib/data'
import { 
  Smartphone, 
  Laptop, 
  Tv, 
  Headphones, 
  Camera, 
  Watch 
} from 'lucide-react'

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  mobiles: Smartphone,
  laptops: Laptop,
  tvs: Tv,
  audio: Headphones,
  cameras: Camera,
  wearables: Watch,
}

export function ShopByCategory() {
  const mainCategories = categories.slice(0, 6)

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {mainCategories.map((category) => {
            const Icon = categoryIcons[category.slug] || Smartphone
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group flex flex-col items-center p-4 md:p-6 bg-card border border-border rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="p-4 bg-muted rounded-full group-hover:bg-primary/10 transition-colors mb-3">
                  <Icon className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm md:text-base font-medium text-center text-card-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
