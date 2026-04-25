'use client'

import { use } from 'react'
import Link from 'next/link'
import { CheckCircle, Home, Package } from 'lucide-react'

export default function SuccessPage({ searchParams }: { searchParams: Promise<{ orderId: string }> }) {
  const { orderId } = use(searchParams)

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-10 w-10 text-green-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Đặt Hàng Thành Công!</h1>
      <p className="text-gray-500 mb-2">Cảm ơn bạn đã tin tưởng mua sắm tại Nhà Xinh.</p>
      {orderId && (
        <p className="text-sm font-medium text-orange-600 bg-orange-50 rounded-lg px-4 py-2 inline-block mb-6">
          Mã đơn hàng: <span className="font-bold">{orderId}</span>
        </p>
      )}
      <div className="bg-gray-50 rounded-2xl p-6 text-sm text-gray-600 mb-8 text-left space-y-2">
        <p className="flex items-start gap-2"><Package className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />Đơn hàng sẽ được xác nhận qua điện thoại trong vòng 30 phút.</p>
        <p className="flex items-start gap-2"><Package className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />Giao hàng dự kiến trong 2-3 ngày làm việc.</p>
        <p className="flex items-start gap-2"><Package className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />Thanh toán bằng tiền mặt khi nhận hàng (COD).</p>
      </div>
      <div className="flex gap-3 justify-center">
        <Link href="/" className="flex items-center gap-2 border border-gray-200 text-gray-700 font-medium px-5 py-2.5 rounded-full hover:bg-gray-50 transition-colors">
          <Home className="h-4 w-4" /> Về Trang Chủ
        </Link>
        <Link href="/products" className="flex items-center gap-2 bg-orange-500 text-white font-medium px-5 py-2.5 rounded-full hover:bg-orange-600 transition-colors">
          Tiếp Tục Mua Sắm
        </Link>
      </div>
    </div>
  )
}
