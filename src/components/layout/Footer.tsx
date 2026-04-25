import Link from 'next/link'
import { Home, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Home className="h-6 w-6 text-orange-400" />
            <span className="text-xl font-bold text-white">Nhà <span className="text-orange-400">Xinh</span></span>
          </div>
          <p className="text-sm leading-relaxed">
            Chuyên cung cấp đồ gia dụng chính hãng, chất lượng cao với giá tốt nhất thị trường.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Danh Mục</h4>
          <ul className="space-y-2 text-sm">
            {['Bếp & Nấu nướng', 'Máy Gia Dụng', 'Phòng Ngủ', 'Dọn Dẹp', 'Đồ Điện Tử'].map(cat => (
              <li key={cat}><Link href="/products" className="hover:text-orange-400 transition-colors">{cat}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Hỗ Trợ</h4>
          <ul className="space-y-2 text-sm">
            {['Chính sách đổi trả', 'Hướng dẫn mua hàng', 'Theo dõi đơn hàng', 'Câu hỏi thường gặp'].map(item => (
              <li key={item}><Link href="/" className="hover:text-orange-400 transition-colors">{item}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Liên Hệ</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-orange-400" /><span>1800 1234</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-orange-400" /><span>support@nhaxinh.vn</span></li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-orange-400 mt-0.5" /><span>123 Nguyễn Huệ, Q.1, TP.HCM</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © 2025 Nhà Xinh. Bảo lưu mọi quyền.
      </div>
    </footer>
  )
}
