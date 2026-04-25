'use client'

import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()
  const total = totalPrice()

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-700 mb-2">Giỏ hàng trống</h2>
        <p className="text-gray-400 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
        <Link href="/products"
          className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-orange-600 transition-colors">
          Mua Sắm Ngay <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Giỏ Hàng ({items.length} sản phẩm)</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="bg-white rounded-2xl p-4 flex gap-4 border border-gray-100 shadow-sm">
              <div className="w-20 h-20 bg-orange-50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">🏠</div>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.slug}`} className="font-semibold text-gray-900 hover:text-orange-500 line-clamp-2 text-sm">{product.name}</Link>
                <p className="text-xs text-gray-400 mt-0.5">{product.brand}</p>
                <p className="text-orange-600 font-bold mt-1">{formatPrice(product.price)}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeItem(product.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-20">
            <h2 className="font-bold text-gray-900 mb-4">Tóm Tắt Đơn Hàng</h2>
            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between"><span className="text-gray-500">Tạm tính</span><span>{formatPrice(total)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Phí vận chuyển</span><span className="text-green-600">Miễn phí</span></div>
              <div className="border-t pt-3 flex justify-between font-bold text-base">
                <span>Tổng cộng</span>
                <span className="text-orange-600">{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/checkout"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
              Tiến Hành Thanh Toán <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/products" className="block text-center text-sm text-gray-400 hover:text-gray-600 mt-3">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
