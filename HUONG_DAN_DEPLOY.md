# Hướng Dẫn Cài Đặt & Deploy - Nhà Xinh Ecommerce

## Chạy Local

1. Cài dependencies (chỉ cần lần đầu):
   npm install

2. Cấu hình API key trong file `.env.local`:
   ANTHROPIC_API_KEY=sk-ant-...   ← lấy tại console.anthropic.com

3. Chạy dev server:
   npm run dev
   → Mở http://localhost:3000

---

## Deploy lên Vercel (miễn phí)

### Bước 1 - Tạo tài khoản
- Đăng ký tại https://vercel.com (dùng tài khoản GitHub)

### Bước 2 - Đẩy code lên GitHub
   git init
   git add .
   git commit -m "first commit"
   git remote add origin https://github.com/username/nha-xinh.git
   git push -u origin main

### Bước 3 - Import vào Vercel
- Vào https://vercel.com/new → chọn repo GitHub vừa tạo → Deploy

### Bước 4 - Thêm Environment Variables trên Vercel
- Vào Settings → Environment Variables → thêm:
  ANTHROPIC_API_KEY = sk-ant-xxxxx

### Bước 5 - Redeploy
- Vercel tự động deploy mỗi khi bạn push code mới lên GitHub

---

## Tính Năng Đã Có

- Trang chủ: Hero, danh mục, sản phẩm nổi bật
- Danh sách sản phẩm: Tìm kiếm, lọc theo danh mục, sắp xếp giá
- Chi tiết sản phẩm: Thông tin, tính năng, thêm vào giỏ
- Giỏ hàng: Thêm/xóa/cập nhật số lượng, lưu localStorage
- Thanh toán: Form COD, validation, xác nhận đơn hàng
- AI Chatbot: Tư vấn sản phẩm 24/7 bằng Claude API (nút chat góc phải)

## Thêm Sản Phẩm

Chỉnh sửa file: src/lib/data.ts
- Thêm vào mảng `products[]`
- Thêm danh mục vào `categories[]` nếu cần

## Cấu Trúc Thư Mục

src/
├── app/
│   ├── page.tsx              ← Trang chủ
│   ├── products/page.tsx     ← Danh sách sản phẩm
│   ├── products/[slug]/      ← Chi tiết sản phẩm
│   ├── cart/page.tsx         ← Giỏ hàng
│   ├── checkout/page.tsx     ← Thanh toán
│   └── api/
│       ├── chat/route.ts     ← Claude AI endpoint
│       ├── products/route.ts ← API sản phẩm
│       └── orders/route.ts   ← API đơn hàng
├── components/
│   ├── layout/               ← Navbar, Footer
│   ├── products/             ← ProductCard
│   └── chat/                 ← ChatBot AI
├── lib/
│   ├── data.ts               ← Dữ liệu sản phẩm (thêm ở đây)
│   └── utils.ts              ← Tiện ích
└── store/cart.ts             ← Zustand cart state
