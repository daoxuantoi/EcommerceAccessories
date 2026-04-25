'use client'

import { use, useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { ShoppingCart, Star, CheckCircle, ArrowLeft, Package } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { products as localProducts, categories } from '@/lib/data'
import { useCartStore } from '@/store/cart'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { Product } from '@/types'

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const addItem = useCartStore(s => s.addItem)

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await supabase
        .from('products')
        .select('*, category:categories(id,name,slug)')
        .eq('slug', slug)
        .single()
      if (data) {
        setProduct(data)
      } else {
        const local = localProducts.find(p => p.slug === slug)
        setProduct(local ?? null)
      }
      setLoading(false)
    }
    fetchProduct()
  }, [slug])

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">Đang tải...</div>
  )
  if (!product) notFound()

  const category = categories.find(c => c.id === product.category_id)
  const discount = product.original_price ? calculateDiscount(product.original_price, product.price) : 0
  const categoryEmojis: Record<string, string> = {
    'bep-nau-nuong': '🍳', 'may-gia-dung': '🔌', 'phong-ngu': '🛏️',
    'phong-tam': '🚿', 'don-dep': '🧹', 'do-dien-tu': '💡',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/products" className="flex items-center gap-2 text-gray-500 hover:text-orange-500 mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" /> Quay lại
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative aspect-square bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl flex items-center justify-center">
          {product.images?.[0] && !product.images[0].startsWith('/images/') ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-3xl" />
          ) : (
            <span className="text-[120px]">{categoryEmojis[category?.slug || ''] ?? '🏠'}</span>
          )}
          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1.5 rounded-full text-sm">
              -{discount}%
            </span>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-orange-500 font-medium bg-orange-50 px-3 py-1 rounded-full">{product.category?.name ?? category?.name}</span>
            <span className="text-sm text-gray-400">{product.brand}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
              ))}
            </div>
            <span className="font-semibold text-sm">{product.rating}</span>
            <span className="text-gray-400 text-sm">({product.review_count} đánh giá)</span>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-extrabold text-orange-600">{formatPrice(product.price)}</span>
            {product.original_price && (
              <span className="ml-3 text-lg text-gray-400 line-through">{formatPrice(product.original_price)}</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {product.features && product.features.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Tính năng nổi bật</h3>
              <ul className="space-y-2">
                {product.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Package className="h-4 w-4" />
            <span>Còn {product.stock} sản phẩm trong kho</span>
          </div>

          <div className="flex gap-3">
            <button onClick={() => addItem(product)}
              className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-2xl transition-colors">
              <ShoppingCart className="h-5 w-5" /> Thêm vào giỏ
            </button>
            <Link href="/cart" onClick={() => addItem(product)}
              className="flex-1 flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-2xl transition-colors">
              Mua ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
