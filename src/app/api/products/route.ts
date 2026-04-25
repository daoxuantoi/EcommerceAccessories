import { NextRequest, NextResponse } from 'next/server'
import { products } from '@/lib/data'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const featured = searchParams.get('featured')

  let filtered = [...products]

  if (category) {
    const { categories } = await import('@/lib/data')
    const cat = categories.find(c => c.slug === category)
    if (cat) filtered = filtered.filter(p => p.category_id === cat.id)
  }

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q)
    )
  }

  if (featured === 'true') {
    filtered = filtered.filter(p => p.is_featured)
  }

  return NextResponse.json(filtered)
}
