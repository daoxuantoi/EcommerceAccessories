import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatBot from '@/components/chat/ChatBot'
import StoreHydration from '@/components/layout/StoreHydration'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nhà Xinh - Đồ Gia Dụng Chính Hãng',
  description: 'Cửa hàng đồ gia dụng chính hãng, chất lượng cao với giá tốt nhất. Tư vấn AI 24/7.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${geist.className} bg-gray-50 min-h-screen`}>
        <StoreHydration />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  )
}
