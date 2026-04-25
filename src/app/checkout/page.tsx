'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import { Truck, CheckCircle } from 'lucide-react'

interface FormData {
  name: string
  phone: string
  email: string
  address: string
  notes: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCartStore()
  const [form, setForm] = useState<FormData>({ name: '', phone: '', email: '', address: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const total = totalPrice()

  const validate = () => {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = 'Vui lòng nhập họ tên'
    if (!form.phone.match(/^(0|\+84)[0-9]{9}$/)) e.phone = 'Số điện thoại không hợp lệ'
    if (form.email && !form.email.includes('@')) e.email = 'Email không hợp lệ'
    if (!form.address.trim()) e.address = 'Vui lòng nhập địa chỉ giao hàng'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.name,
          customer_phone: form.phone,
          customer_email: form.email,
          shipping_address: form.address,
          notes: form.notes,
          items: items.map(i => ({
            product_id: i.product.id,
            product_name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
          })),
          total,
        }),
      })
      const data = await res.json()
      if (data.success) {
        clearCart()
        router.push(`/checkout/success?orderId=${data.orderId}`)
      }
    } catch {
      alert('Có lỗi xảy ra, vui lòng thử lại!')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  const field = (key: keyof FormData, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} value={form[key]}
        onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 ${errors[key] ? 'border-red-400' : 'border-gray-200'}`} />
      {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Thanh Toán</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Thông Tin Giao Hàng</h2>
              <div className="space-y-4">
                {field('name', 'Họ và tên *', 'text', 'Nguyễn Văn A')}
                {field('phone', 'Số điện thoại *', 'tel', '0901234567')}
                {field('email', 'Email (tùy chọn)', 'email', 'email@example.com')}
                {field('address', 'Địa chỉ giao hàng *', 'text', 'Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố')}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú (tùy chọn)</label>
                  <textarea value={form.notes} onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Ghi chú thêm cho đơn hàng..."
                    rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 resize-none" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Phương Thức Thanh Toán</h2>
              <div className="flex items-center gap-3 p-4 border-2 border-orange-400 rounded-xl bg-orange-50">
                <Truck className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="font-semibold text-sm">Thanh toán khi nhận hàng (COD)</p>
                  <p className="text-xs text-gray-500">Thanh toán bằng tiền mặt khi nhận được hàng</p>
                </div>
                <CheckCircle className="h-5 w-5 text-orange-500 ml-auto" />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-20">
              <h2 className="font-bold text-gray-900 mb-4">Đơn Hàng ({items.length})</h2>
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 line-clamp-1 flex-1 mr-2">{product.name} x{quantity}</span>
                    <span className="font-medium whitespace-nowrap">{formatPrice(product.price * quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Phí ship</span><span className="text-green-600">Miễn phí</span></div>
                <div className="flex justify-between font-bold text-base">
                  <span>Tổng</span><span className="text-orange-600">{formatPrice(total)}</span>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="mt-4 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors">
                {loading ? 'Đang xử lý...' : 'Đặt Hàng Ngay'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
