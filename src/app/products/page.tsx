'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import { products, categories } from '@/lib/data'
import { Suspense } from 'react'

function ProductsContent() {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [sortBy, setSortBy] = useState('default')

  const filtered = useMemo(() => {
    let list = [...products]
    if (selectedCategory) {
      const cat = categories.find(c => c.slug === selectedCategory)
      if (cat) list = list.filter(p => p.category_id === cat.id)
    }
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q))
    }
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [search, selectedCategory, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tất Cả Sản Phẩm</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 bg-white" />
        </div>
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 bg-white text-sm">
          <option value="">Tất cả danh mục</option>
          {categories.map(cat => <option key={cat.id} value={cat.slug}>{cat.name}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 bg-white text-sm">
          <option value="default">Mặc định</option>
          <option value="price-asc">Giá thấp đến cao</option>
          <option value="price-desc">Giá cao đến thấp</option>
          <option value="rating">Đánh giá cao nhất</option>
        </select>
      </div>

      <p className="text-sm text-gray-500 mb-4">Tìm thấy {filtered.length} sản phẩm</p>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <SlidersHorizontal className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>Không tìm thấy sản phẩm phù hợp</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  )
}
