export interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  image: string
  category: string
  badge?: 'Sale' | 'New' | 'Hot'
  inStock: boolean
  variants?: {
    color?: string[]
    storage?: string[]
  }
  description?: string
}

export interface Category {
  id: string
  name: string
  icon: string
  slug: string
}

export interface Review {
  id: string
  name: string
  avatar: string
  rating: number
  text: string
  verified: boolean
  date: string
}

export interface Brand {
  id: string
  name: string
  slug: string
}

export const categories: Category[] = [
  { id: '1', name: 'Mobiles', icon: '📱', slug: 'mobiles' },
  { id: '2', name: 'Laptops', icon: '💻', slug: 'laptops' },
  { id: '3', name: 'TVs', icon: '📺', slug: 'tvs' },
  { id: '4', name: 'Audio', icon: '🎧', slug: 'audio' },
  { id: '5', name: 'Cameras', icon: '📷', slug: 'cameras' },
  { id: '6', name: 'Wearables', icon: '⌚', slug: 'wearables' },
  { id: '7', name: 'Gaming', icon: '🎮', slug: 'gaming' },
  { id: '8', name: 'Smart Home', icon: '🏠', slug: 'smart-home' },
]

export const brands: Brand[] = [
  { id: '1', name: 'Apple', slug: 'apple' },
  { id: '2', name: 'Samsung', slug: 'samsung' },
  { id: '3', name: 'Sony', slug: 'sony' },
  { id: '4', name: 'OnePlus', slug: 'oneplus' },
  { id: '5', name: 'LG', slug: 'lg' },
  { id: '6', name: 'Dell', slug: 'dell' },
  { id: '7', name: 'Lenovo', slug: 'lenovo' },
  { id: '8', name: 'Boat', slug: 'boat' },
  { id: '9', name: 'MI', slug: 'mi' },
]

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    brand: 'Apple',
    price: 149900,
    originalPrice: 179900,
    discount: 17,
    rating: 4.8,
    reviews: 2453,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=500&fit=crop',
    category: 'mobiles',
    badge: 'Hot',
    inStock: true,
    variants: {
      color: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
      storage: ['256GB', '512GB', '1TB'],
    },
    description: 'iPhone 15 Pro Max features a strong and lightweight titanium design with the A17 Pro chip for powerful gaming and creative workflows.',
  },
  {
    id: '2',
    name: 'Galaxy S24 Ultra 5G',
    brand: 'Samsung',
    price: 129999,
    originalPrice: 149999,
    discount: 13,
    rating: 4.7,
    reviews: 1872,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop',
    category: 'mobiles',
    badge: 'New',
    inStock: true,
    variants: {
      color: ['Titanium Gray', 'Titanium Violet', 'Titanium Yellow', 'Titanium Black'],
      storage: ['256GB', '512GB', '1TB'],
    },
    description: 'Galaxy AI is here. Search like never before, Icons Icons Icons Icons Icons Icons Icons Icons generate text, and Icons Icons effortlessly with the ultimate icons AI companion.',
  },
  {
    id: '3',
    name: 'MacBook Air M3 15"',
    brand: 'Apple',
    price: 134900,
    originalPrice: 149900,
    discount: 10,
    rating: 4.9,
    reviews: 956,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
    category: 'laptops',
    badge: 'Sale',
    inStock: true,
    variants: {
      color: ['Midnight', 'Starlight', 'Space Gray', 'Silver'],
      storage: ['256GB', '512GB', '1TB'],
    },
    description: 'The remarkably thin MacBook Air is powered by the M3 chip for incredible performance with up to 18 hours of battery life.',
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    price: 26990,
    originalPrice: 34990,
    discount: 23,
    rating: 4.8,
    reviews: 3421,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&h=500&fit=crop',
    category: 'audio',
    badge: 'Sale',
    inStock: true,
    variants: {
      color: ['Black', 'Silver', 'Midnight Blue'],
    },
    description: 'Industry-leading noise cancellation headphones with exceptional sound quality and 30-hour battery life.',
  },
  {
    id: '5',
    name: 'OnePlus 12 5G',
    brand: 'OnePlus',
    price: 64999,
    originalPrice: 69999,
    discount: 7,
    rating: 4.6,
    reviews: 1245,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
    category: 'mobiles',
    badge: 'New',
    inStock: true,
    variants: {
      color: ['Flowy Emerald', 'Silky Black'],
      storage: ['256GB', '512GB'],
    },
    description: 'The OnePlus 12 features Hasselblad Camera for Mobile with 4th Gen sensor and 100W SUPERVOOC charging.',
  },
  {
    id: '6',
    name: 'LG C3 55" OLED TV',
    brand: 'LG',
    price: 119990,
    originalPrice: 154990,
    discount: 23,
    rating: 4.9,
    reviews: 876,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop',
    category: 'tvs',
    badge: 'Hot',
    inStock: true,
    description: 'Perfect black, intense color and stunning picture quality with self-lit OLED pixels.',
  },
  {
    id: '7',
    name: 'Apple Watch Series 9',
    brand: 'Apple',
    price: 41900,
    originalPrice: 49900,
    discount: 16,
    rating: 4.7,
    reviews: 2134,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop',
    category: 'wearables',
    badge: 'Sale',
    inStock: true,
    variants: {
      color: ['Midnight', 'Starlight', 'Silver', 'Pink', 'Product Red'],
    },
    description: 'Advanced health features including blood oxygen, ECG, and the powerful S9 chip.',
  },
  {
    id: '8',
    name: 'Sony Alpha A7 IV',
    brand: 'Sony',
    price: 239990,
    originalPrice: 269990,
    discount: 11,
    rating: 4.9,
    reviews: 543,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop',
    category: 'cameras',
    badge: 'Hot',
    inStock: true,
    description: 'Full-frame mirrorless camera with 33MP sensor, 10fps continuous shooting, and 4K 60p video.',
  },
  {
    id: '9',
    name: 'Dell XPS 15',
    brand: 'Dell',
    price: 149990,
    originalPrice: 179990,
    discount: 17,
    rating: 4.6,
    reviews: 1123,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=500&fit=crop',
    category: 'laptops',
    inStock: true,
    variants: {
      color: ['Platinum Silver', 'Frost White'],
      storage: ['512GB', '1TB', '2TB'],
    },
    description: 'Premium laptop with 15.6" OLED display, 13th Gen Intel Core processors.',
  },
  {
    id: '10',
    name: 'Boat Airdopes 441 Pro',
    brand: 'Boat',
    price: 1999,
    originalPrice: 4990,
    discount: 60,
    rating: 4.3,
    reviews: 45231,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop',
    category: 'audio',
    badge: 'Sale',
    inStock: true,
    variants: {
      color: ['Active Black', 'Cherry Blossom', 'Cyan Cider'],
    },
    description: 'True wireless earbuds with up to 150 hours playback, ENx technology, and BEAST Mode.',
  },
  {
    id: '11',
    name: 'PlayStation 5 Console',
    brand: 'Sony',
    price: 49990,
    originalPrice: 54990,
    discount: 9,
    rating: 4.9,
    reviews: 8765,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop',
    category: 'gaming',
    badge: 'Hot',
    inStock: true,
    description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback.',
  },
  {
    id: '12',
    name: 'Mi 360 Home Security Camera',
    brand: 'MI',
    price: 2999,
    originalPrice: 4499,
    discount: 33,
    rating: 4.4,
    reviews: 12453,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    category: 'smart-home',
    badge: 'Sale',
    inStock: true,
    description: '2K resolution with 360° panoramic coverage, AI human detection, and two-way audio.',
  },
]

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    avatar: 'RS',
    rating: 5,
    text: 'Amazing shopping experience! Got my iPhone delivered within 2 days. Original product with GST invoice. Highly recommended!',
    verified: true,
    date: '2 days ago',
  },
  {
    id: '2',
    name: 'Priya Patel',
    avatar: 'PP',
    rating: 5,
    text: 'Best prices I found anywhere online. The EMI option made it super easy to buy my new laptop. Customer service was excellent!',
    verified: true,
    date: '1 week ago',
  },
  {
    id: '3',
    name: 'Amit Kumar',
    avatar: 'AK',
    rating: 4,
    text: 'Great collection of electronics. The delivery was prompt and the packaging was secure. Will definitely shop again.',
    verified: true,
    date: '2 weeks ago',
  },
]

export const dealProducts = products.filter(p => p.badge === 'Sale').slice(0, 3)

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}
