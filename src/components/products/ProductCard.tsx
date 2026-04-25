'use client'

import Link from 'next/link'
import { ShoppingCart, Star } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { useCartStore } from '@/store/cart'

interface Props { product: Product }

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore(s => s.addItem)
  const discount = product.original_price ? calculateDiscount(product.original_price, product.price) : 0

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-orange-50 to-amber-50">
            🏠
          </div>
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
          {product.is_featured && (
            <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              HOT
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <p className="text-xs text-orange-500 font-medium mb-1">{product.brand}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-orange-500 transition-colors mb-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.review_count})</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-lg font-bold text-orange-600">{formatPrice(product.price)}</p>
            {product.original_price && (
              <p className="text-xs text-gray-400 line-through">{formatPrice(product.original_price)}</p>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium px-3 py-2 rounded-xl transition-colors"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Thêm
          </button>
        </div>
      </div>
    </div>
  )
}
