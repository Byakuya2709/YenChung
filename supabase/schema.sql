-- filepath: supabase/schema.sql
-- Chạy script này trong Supabase SQL Editor

-- ========================================
-- 1. TẠO BẢNG PRODUCTS
-- ========================================
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('custom', 'combo', 'unit')),
  base_price INTEGER NOT NULL,
  images TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 2. TẠO BẢNG PRODUCT OPTIONS
-- ========================================
CREATE TABLE IF NOT EXISTS product_options (
  id SERIAL PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  option_type TEXT NOT NULL CHECK (option_type IN ('type', 'weight', 'volume', 'package')),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  additional_price INTEGER DEFAULT 0,
  metadata JSONB,
  UNIQUE(product_id, option_type, value)
);

-- ========================================
-- 3. TẠO BẢNG ORDERS
-- ========================================
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  shipping_address TEXT,
  location TEXT,
  customer_note TEXT,
  subtotal INTEGER NOT NULL,
  shipping_fee INTEGER DEFAULT 0,
  discount INTEGER DEFAULT 0,
  total INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipping', 'delivered', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 4. TẠO BẢNG ORDER ITEMS
-- ========================================
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_category TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  selected_options JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 5. TẠO INDEXES ĐỂ TỐI ƯU PERFORMANCE
-- ========================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_product_options_product ON product_options(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- ========================================
-- 6. ENABLE ROW LEVEL SECURITY (RLS)
-- ========================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 7. TẠO POLICIES
-- ========================================

-- Products: Ai cũng đọc được
DROP POLICY IF EXISTS "Anyone can read products" ON products;
CREATE POLICY "Anyone can read products"
  ON products FOR SELECT
  USING (true);

-- Product Options: Ai cũng đọc được
DROP POLICY IF EXISTS "Anyone can read product_options" ON product_options;
CREATE POLICY "Anyone can read product_options"
  ON product_options FOR SELECT
  USING (true);

-- Orders: Ai cũng tạo được (anonymous users)
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Orders: Ai cũng đọc được (filter sẽ làm trong code)
DROP POLICY IF EXISTS "Anyone can read orders" ON orders;
CREATE POLICY "Anyone can read orders"
  ON orders FOR SELECT
  USING (true);

-- Order Items: Ai cũng tạo được
DROP POLICY IF EXISTS "Anyone can create order_items" ON order_items;
CREATE POLICY "Anyone can create order_items"
  ON order_items FOR INSERT
  WITH CHECK (true);

-- Order Items: Ai cũng đọc được
DROP POLICY IF EXISTS "Anyone can read order_items" ON order_items;
CREATE POLICY "Anyone can read order_items"
  ON order_items FOR SELECT
  USING (true);

-- ========================================
-- 8. TẠO FUNCTION ĐỂ TỰ ĐỘNG UPDATE TIMESTAMP
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- ========================================
-- 9. TẠO TRIGGERS
-- ========================================
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- 10. THÔNG BÁO HOÀN THÀNH
-- ========================================
DO $$
BEGIN
  RAISE NOTICE '✅ Database schema đã được tạo thành công!';
  RAISE NOTICE '📋 Bảng đã tạo: products, product_options, orders, order_items';
  RAISE NOTICE '🔐 Row Level Security đã được bật';
  RAISE NOTICE '📊 Indexes đã được tạo để tối ưu performance';
END $$;
