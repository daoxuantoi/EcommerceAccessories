import Link from 'next/link'
import { ArrowRight, ShieldCheck, Truck, HeadphonesIcon, RotateCcw } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import { supabase } from '@/lib/supabase'
import { categories as localCategories, products as localProducts } from '@/lib/data'
import { Category, Product } from '@/types'

const categoryEmojis: Record<string, string> = {
  'bep-nau-nuong': '🍳', 'may-gia-dung': '🔌', 'phong-ngu': '🛏️',
  'phong-tam': '🚿', 'don-dep': '🧹', 'do-dien-tu': '💡',
}

async function getData() {
  const [{ data: dbCategories }, { data: dbProducts }] = await Promise.all([
    supabase.from('categories').select('*').order('name'),
    supabase.from('products').select('*, category:categories(id,name,slug)').eq('is_featured', true).limit(8),
  ])
  return {
    categories: (dbCategories as Category[]) ?? localCategories,
    featuredProducts: (dbProducts as Product[]) ?? localProducts.filter(p => p.is_featured),
  }
}

export default async function HomePage() {
  const { categories, featuredProducts } = await getData()

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Đồ Gia Dụng<br />
            <span className="text-white/90">Chính Hãng, Giá Tốt</span>
          </h1>
          <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Hàng nghìn sản phẩm gia dụng chất lượng cao. Tư vấn AI 24/7, giao hàng nhanh toàn quốc.
          </p>
          <Link href="/products"
            className="bg-white text-orange-600 font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2">
            Mua Sắm Ngay <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: ShieldCheck, label: 'Hàng Chính Hãng', sub: '100% sản phẩm có nguồn gốc' },
            { icon: Truck, label: 'Giao Hàng Nhanh', sub: 'Toàn quốc trong 2-3 ngày' },
            { icon: HeadphonesIcon, label: 'Hỗ Trợ 24/7', sub: 'AI tư vấn mọi lúc' },
            { icon: RotateCcw, label: 'Đổi Trả Dễ Dàng', sub: 'Trong vòng 30 ngày' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Danh Mục Sản Phẩm</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link key={cat.id} href={`/products?category=${cat.slug}`}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100">
              <span className="text-3xl">{categoryEmojis[cat.slug] ?? '📦'}</span>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sản Phẩm Nổi Bật</h2>
          <Link href="/products" className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1 text-sm">
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner AI */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-sm font-semibold text-orange-400 mb-2">✨ Powered by Claude AI</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Tư Vấn Mua Hàng Thông Minh</h3>
            <p className="text-gray-300">Hỏi AI về bất kỳ sản phẩm gia dụng nào — so sánh, gợi ý, giải đáp thắc mắc ngay lập tức.</p>
          </div>
          <div className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold whitespace-nowrap">
            💬 Nhấn vào biểu tượng chat bên phải
          </div>
        </div>
      </section>
    </div>
  )
}
