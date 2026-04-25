-- 1. CATEGORIES
create table if not exists categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  image_url text,
  description text,
  created_at timestamptz default now()
);

-- 2. PRODUCTS
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  price numeric not null,
  original_price numeric,
  images text[] default '{}',
  category_id uuid references categories(id),
  stock int default 0,
  rating numeric default 5,
  review_count int default 0,
  features text[] default '{}',
  brand text,
  sku text unique,
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- 3. ORDERS
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  shipping_address text not null,
  notes text,
  total numeric not null,
  status text default 'pending',
  payment_method text default 'cod',
  created_at timestamptz default now()
);

-- 4. ORDER ITEMS
create table if not exists order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) on delete cascade,
  product_id uuid,
  product_name text not null,
  price numeric not null,
  quantity int not null,
  created_at timestamptz default now()
);

-- 5. ENABLE PUBLIC READ cho products & categories
alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

create policy "Public read categories" on categories for select using (true);
create policy "Public read products" on products for select using (true);
create policy "Anyone can insert orders" on orders for insert with check (true);
create policy "Anyone can insert order_items" on order_items for insert with check (true);
create policy "Public read orders" on orders for select using (true);
create policy "Public read order_items" on order_items for select using (true);

-- 6. SEED DATA - Categories
insert into categories (name, slug, description) values
  ('Bếp & Nấu nướng', 'bep-nau-nuong', 'Nồi, chảo, bếp điện, lò vi sóng'),
  ('Máy Gia Dụng', 'may-gia-dung', 'Máy xay, máy ép, nồi chiên không dầu'),
  ('Phòng Ngủ', 'phong-ngu', 'Chăn ga gối đệm, đèn ngủ'),
  ('Phòng Tắm', 'phong-tam', 'Bình nước nóng, phụ kiện phòng tắm'),
  ('Dọn Dẹp', 'don-dep', 'Máy hút bụi, robot lau nhà'),
  ('Đồ Điện Tử', 'do-dien-tu', 'Quạt điện, máy lọc không khí, đèn LED')
on conflict (slug) do nothing;

-- 7. SEED DATA - Products (dùng slug category để lấy id)
insert into products (name, slug, description, price, original_price, category_id, stock, rating, review_count, features, brand, sku, is_featured)
select
  p.name, p.slug, p.description, p.price, p.original_price,
  c.id, p.stock, p.rating, p.review_count, p.features, p.brand, p.sku, p.is_featured
from (values
  ('Nồi Cơm Điện Tử Panasonic 1.8L','noi-com-dien-tu-panasonic-18l','Nồi cơm điện tử Panasonic dung tích 1.8L, công nghệ nấu nhiều tầng nhiệt, giữ ấm 24h.',1290000,1690000,'bep-nau-nuong',50,4.8,234,array['Dung tích 1.8L','Nấu nhiều chế độ','Giữ ấm 24h','Lòng nồi chống dính'],'Panasonic','PAN-NCE18',true),
  ('Máy Xay Sinh Tố Philips HR2221','may-xay-sinh-to-philips-hr2221','Máy xay sinh tố Philips 600W, lưỡi dao Titan sắc bén, bình thủy tinh 1.5L.',890000,1200000,'may-gia-dung',30,4.6,189,array['Công suất 600W','Bình thủy tinh 1.5L','Lưỡi dao Titan','3 tốc độ xay'],'Philips','PHI-HR2221',true),
  ('Nồi Chiên Không Dầu Xiaomi 4L','noi-chien-khong-dau-xiaomi-4l','Nồi chiên không dầu Xiaomi 4L, điều khiển qua app, 8 chế độ nấu.',1590000,2100000,'may-gia-dung',25,4.7,312,array['Dung tích 4L','Điều khiển app','8 chế độ nấu','Nhiệt độ 80-200°C'],'Xiaomi','XMI-AF4L',true),
  ('Bộ Chăn Ga Gối Cotton 4 Món','bo-chan-ga-goi-cotton-4-mon','Bộ chăn ga gối 4 món 100% cotton tự nhiên, mềm mại, thoáng mát.',650000,890000,'phong-ngu',80,4.5,156,array['100% cotton tự nhiên','Kích thước 1m8x2m','4 món đầy đủ','Dễ giặt máy'],'HomeLife','HL-BED4P',false),
  ('Bình Đun Nước Siêu Tốc Sunhouse 1.8L','binh-dun-nuoc-sieu-toc-sunhouse','Bình đun nước siêu tốc Sunhouse inox 304, dung tích 1.8L, tự ngắt khi sôi.',290000,390000,'bep-nau-nuong',100,4.4,421,array['Inox 304 an toàn','Dung tích 1.8L','Tự ngắt khi sôi','Công suất 1500W'],'Sunhouse','SH-KET18',false),
  ('Máy Hút Bụi Không Dây Dyson V8','may-hut-bui-khong-day-dyson-v8','Máy hút bụi không dây Dyson V8, lực hút 115 AW, pin 40 phút.',8900000,11500000,'don-dep',10,4.9,98,array['Lực hút 115 AW','Pin 40 phút','Trọng lượng 2.61kg','Lọc HEPA'],'Dyson','DYS-V8',true),
  ('Quạt Điều Hoà Điện Tử Casper','quat-dieu-hoa-dien-tu-casper','Quạt điều hoà Casper 100W, làm mát bằng hơi nước, bình chứa 7L.',2490000,3200000,'do-dien-tu',20,4.3,67,array['Công suất 100W','Bình chứa 7L','Điều khiển từ xa','3 tốc độ gió'],'Casper','CAS-FAN7L',false),
  ('Bộ Dao Bếp Inox 5 Món Fivestar','bo-dao-bep-inox-5-mon-fivestar','Bộ dao bếp inox cao cấp 5 món Fivestar, cán nhựa ABS chống trượt.',350000,480000,'bep-nau-nuong',60,4.6,203,array['Inox 430 cao cấp','5 loại dao đầy đủ','Cán nhựa ABS','Có kệ đựng dao'],'Fivestar','FS-KNIFE5',false)
) as p(name,slug,description,price,original_price,cat_slug,stock,rating,review_count,features,brand,sku,is_featured)
join categories c on c.slug = p.cat_slug
on conflict (slug) do nothing;
