import { Star, BadgeCheck } from 'lucide-react'
import { reviews } from '@/lib/data'

export function CustomerReviews() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">{review.avatar}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-card-foreground">
                      {review.name}
                    </h4>
                    {review.verified && (
                      <BadgeCheck className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
