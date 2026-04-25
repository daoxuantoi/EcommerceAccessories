import { Category, Product } from '@/types'

export const categories: Category[] = [
  { id: '1', name: 'Bếp & Nấu nướng', slug: 'bep-nau-nuong', image_url: '/images/cat-kitchen.jpg', description: 'Nồi, chảo, bếp điện, lò vi sóng' },
  { id: '2', name: 'Máy Gia Dụng', slug: 'may-gia-dung', image_url: '/images/cat-appliance.jpg', description: 'Máy xay, máy ép, nồi chiên không dầu' },
  { id: '3', name: 'Phòng Ngủ', slug: 'phong-ngu', image_url: '/images/cat-bedroom.jpg', description: 'Chăn ga gối đệm, đèn ngủ' },
  { id: '4', name: 'Phòng Tắm', slug: 'phong-tam', image_url: '/images/cat-bathroom.jpg', description: 'Bình nước nóng, phụ kiện phòng tắm' },
  { id: '5', name: 'Dọn Dẹp', slug: 'don-dep', image_url: '/images/cat-cleaning.jpg', description: 'Máy hút bụi, robot lau nhà' },
  { id: '6', name: 'Đồ Điện Tử', slug: 'do-dien-tu', image_url: '/images/cat-electronic.jpg', description: 'Quạt điện, máy lọc không khí, đèn LED' },
]

export const products: Product[] = [
  {
    id: '1', name: 'Nồi Cơm Điện Tử Panasonic 1.8L', slug: 'noi-com-dien-tu-panasonic-18l',
    description: 'Nồi cơm điện tử Panasonic dung tích 1.8L, công nghệ nấu nhiều tầng nhiệt, giữ ấm 24h, chống dính cao cấp.',
    price: 1290000, original_price: 1690000, images: ['/images/p1.jpg'],
    category_id: '1', stock: 50, rating: 4.8, review_count: 234,
    features: ['Dung tích 1.8L', 'Nấu nhiều chế độ', 'Giữ ấm 24h', 'Lòng nồi chống dính'],
    brand: 'Panasonic', sku: 'PAN-NCE18', is_featured: true, created_at: '2024-01-01',
  },
  {
    id: '2', name: 'Máy Xay Sinh Tố Philips HR2221', slug: 'may-xay-sinh-to-philips-hr2221',
    description: 'Máy xay sinh tố Philips 600W, lưỡi dao Titan sắc bén, bình thủy tinh 1.5L an toàn sức khỏe.',
    price: 890000, original_price: 1200000, images: ['/images/p2.jpg'],
    category_id: '2', stock: 30, rating: 4.6, review_count: 189,
    features: ['Công suất 600W', 'Bình thủy tinh 1.5L', 'Lưỡi dao Titan', '3 tốc độ xay'],
    brand: 'Philips', sku: 'PHI-HR2221', is_featured: true, created_at: '2024-01-02',
  },
  {
    id: '3', name: 'Nồi Chiên Không Dầu Xiaomi 4L', slug: 'noi-chien-khong-dau-xiaomi-4l',
    description: 'Nồi chiên không dầu Xiaomi dung tích 4L, điều khiển qua app, 8 chế độ nấu, nhiệt độ 80-200°C.',
    price: 1590000, original_price: 2100000, images: ['/images/p3.jpg'],
    category_id: '2', stock: 25, rating: 4.7, review_count: 312,
    features: ['Dung tích 4L', 'Điều khiển app', '8 chế độ nấu', 'Nhiệt độ 80-200°C'],
    brand: 'Xiaomi', sku: 'XMI-AF4L', is_featured: true, created_at: '2024-01-03',
  },
  {
    id: '4', name: 'Bộ Chăn Ga Gối Cotton 4 Món', slug: 'bo-chan-ga-goi-cotton-4-mon',
    description: 'Bộ chăn ga gối 4 món 100% cotton tự nhiên, mềm mại, thoáng mát, kích thước 1m8x2m.',
    price: 650000, original_price: 890000, images: ['/images/p4.jpg'],
    category_id: '3', stock: 80, rating: 4.5, review_count: 156,
    features: ['100% cotton tự nhiên', 'Kích thước 1m8x2m', '4 món đầy đủ', 'Dễ giặt máy'],
    brand: 'HomeLife', sku: 'HL-BED4P', is_featured: false, created_at: '2024-01-04',
  },
  {
    id: '5', name: 'Bình Đun Nước Siêu Tốc Sunhouse 1.8L', slug: 'binh-dun-nuoc-sieu-toc-sunhouse',
    description: 'Bình đun nước siêu tốc Sunhouse inox 304, dung tích 1.8L, tự ngắt khi sôi, giữ nhiệt tốt.',
    price: 290000, original_price: 390000, images: ['/images/p5.jpg'],
    category_id: '1', stock: 100, rating: 4.4, review_count: 421,
    features: ['Inox 304 an toàn', 'Dung tích 1.8L', 'Tự ngắt khi sôi', 'Công suất 1500W'],
    brand: 'Sunhouse', sku: 'SH-KET18', is_featured: false, created_at: '2024-01-05',
  },
  {
    id: '6', name: 'Máy Hút Bụi Không Dây Dyson V8', slug: 'may-hut-bui-khong-day-dyson-v8',
    description: 'Máy hút bụi không dây Dyson V8, lực hút mạnh 115 AW, pin 40 phút, nhẹ 2.61kg.',
    price: 8900000, original_price: 11500000, images: ['/images/p6.jpg'],
    category_id: '5', stock: 10, rating: 4.9, review_count: 98,
    features: ['Lực hút 115 AW', 'Pin 40 phút', 'Trọng lượng 2.61kg', 'Lọc HEPA'],
    brand: 'Dyson', sku: 'DYS-V8', is_featured: true, created_at: '2024-01-06',
  },
  {
    id: '7', name: 'Quạt Điều Hoà Điện Tử Casper', slug: 'quat-dieu-hoa-dien-tu-casper',
    description: 'Quạt điều hoà Casper 100W, làm mát bằng hơi nước, bình chứa 7L, điều khiển từ xa.',
    price: 2490000, original_price: 3200000, images: ['/images/p7.jpg'],
    category_id: '6', stock: 20, rating: 4.3, review_count: 67,
    features: ['Công suất 100W', 'Bình chứa 7L', 'Điều khiển từ xa', '3 tốc độ gió'],
    brand: 'Casper', sku: 'CAS-FAN7L', is_featured: false, created_at: '2024-01-07',
  },
  {
    id: '8', name: 'Bộ Dao Bếp Inox 5 Món Fivestar', slug: 'bo-dao-bep-inox-5-mon-fivestar',
    description: 'Bộ dao bếp inox cao cấp 5 món Fivestar, cán nhựa ABS chống trượt, sắc bén bền bỉ.',
    price: 350000, original_price: 480000, images: ['/images/p8.jpg'],
    category_id: '1', stock: 60, rating: 4.6, review_count: 203,
    features: ['Inox 430 cao cấp', '5 loại dao đầy đủ', 'Cán nhựa ABS', 'Có kệ đựng dao'],
    brand: 'Fivestar', sku: 'FS-KNIFE5', is_featured: false, created_at: '2024-01-08',
  },
]
