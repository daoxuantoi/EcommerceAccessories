'use client'

import Link from 'next/link'
import { ShoppingCart, Search, Menu, X, Home } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const totalItems = useCartStore(s => s.totalItems())

  const navLinks = [
    { href: '/', label: 'Trang Chủ' },
    { href: '/products', label: 'Sản Phẩm' },
    { href: '/products?category=bep-nau-nuong', label: 'Bếp & Nấu' },
    { href: '/products?category=may-gia-dung', label: 'Máy Gia Dụng' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">
              Nhà <span className="text-orange-500">Xinh</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/products" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Search className="h-5 w-5 text-gray-600" />
            </Link>
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 flex flex-col gap-3">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className="text-gray-700 hover:text-orange-500 font-medium py-1"
              onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
