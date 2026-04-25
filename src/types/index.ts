export interface Category {
  id: string
  name: string
  slug: string
  image_url: string
  description?: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  original_price?: number
  images: string[]
  category_id: string
  category?: Category
  stock: number
  rating: number
  review_count: number
  features?: string[]
  brand?: string
  sku: string
  is_featured: boolean
  created_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  shipping_address: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled'
  payment_method: 'cod'
  notes?: string
  created_at: string
}

export interface OrderItem {
  product_id: string
  product_name: string
  product_image: string
  price: number
  quantity: number
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}
