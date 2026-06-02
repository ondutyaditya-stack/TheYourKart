import { Providers } from '@/components/providers'
import { AnnouncementBar } from '@/components/layout/announcement-bar'
import { Header } from '@/components/layout/header'
import { CategoryNav } from '@/components/layout/category-nav'
import { HeroSection } from '@/components/home/hero-section'
import { TrustBar } from '@/components/home/trust-bar'
import { ShopByCategory } from '@/components/home/shop-by-category'
import { FeaturedProducts } from '@/components/home/featured-products'
import { DealOfTheDay } from '@/components/home/deal-of-the-day'
import { TopBrands } from '@/components/home/top-brands'
import { CustomerReviews } from '@/components/home/customer-reviews'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col animate-fade-in">
        <AnnouncementBar />
        <Header />
        <CategoryNav />
        <main className="flex-1">
          <HeroSection />
          <TrustBar />
          <ShopByCategory />
          <FeaturedProducts />
          <DealOfTheDay />
          <TopBrands />
          <CustomerReviews />
        </main>
        <Footer />
      </div>
    </Providers>
  )
}
