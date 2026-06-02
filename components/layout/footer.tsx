import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, MessageCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const shopLinks = [
  { name: 'Mobiles', href: '/products?category=mobiles' },
  { name: 'Laptops', href: '/products?category=laptops' },
  { name: 'TVs', href: '/products?category=tvs' },
  { name: 'Audio', href: '/products?category=audio' },
  { name: 'Cameras', href: '/products?category=cameras' },
]

const helpLinks = [
  { name: 'Track Order', href: '#' },
  { name: 'Returns & Refunds', href: '#' },
  { name: 'Shipping Info', href: '#' },
  { name: 'FAQs', href: '#' },
  { name: 'Contact Us', href: '#' },
]

const companyLinks = [
  { name: 'About Us', href: '#' },
  { name: 'Careers', href: '#' },
  { name: 'Press', href: '#' },
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-secondary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="bg-primary/10 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-2">
                  Subscribe to our Newsletter
                </h3>
                <p className="text-secondary-foreground/80">
                  Get exclusive deals and updates delivered to your inbox
                </p>
              </div>
              <form className="flex w-full md:w-auto gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-secondary-foreground text-secondary min-w-[240px]"
                />
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-primary">TheYour</span>
              <span className="text-secondary-foreground">Kart</span>
            </h2>
            <p className="text-secondary-foreground/80 mb-6 text-sm leading-relaxed">
              {`India's premium destination for electronics. 100% genuine products with GST invoice.`}
            </p>
            <div className="flex gap-3">
              <Link href="#" className="p-2 rounded-full bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-secondary-foreground/10 hover:bg-[#25D366] hover:text-white transition-colors" aria-label="WhatsApp Support">
                <MessageCircle className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              {helpLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-secondary-foreground/60">
              © 2024 TheYourKart. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-secondary-foreground/50">We accept:</span>
              <div className="flex gap-2">
                {['Visa', 'Mastercard', 'UPI', 'RuPay', 'EMI'].map((method) => (
                  <span
                    key={method}
                    className="px-2 py-1 bg-secondary-foreground/10 rounded text-xs font-medium"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
