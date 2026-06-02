import { Package, Star, ShoppingBag, Shield } from 'lucide-react'

const stats = [
  { icon: ShoppingBag, label: '2L+ Orders', description: 'Delivered successfully' },
  { icon: Star, label: '4.8★ Rating', description: 'Customer satisfaction' },
  { icon: Package, label: '10K+ Products', description: 'Wide selection' },
  { icon: Shield, label: '100% Genuine', description: 'Authentic products' },
]

export function TrustBar() {
  return (
    <section className="bg-muted border-y border-border">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
