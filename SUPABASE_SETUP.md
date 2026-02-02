# Hướng Dẫn Setup Supabase

## 1. Tạo Project Supabase

1. Truy cập [https://supabase.com](https://supabase.com)
2. Đăng nhập hoặc tạo tài khoản mới
3. Click **New Project**
4. Nhập thông tin:
   - **Name**: Fusion Vue App
   - **Database Password**: Tạo mật khẩu mạnh (lưu lại)
   - **Region**: Chọn Southeast Asia (Singapore) để gần Việt Nam
5. Click **Create new project** và đợi ~2 phút

## 2. Tạo Database Schema

1. Vào project vừa tạo
2. Click **SQL Editor** trong sidebar trái
3. Copy toàn bộ nội dung file `supabase/schema.sql`
4. Paste vào SQL Editor
5. Click **Run** để tạo tables và policies
6. Kiểm tra trong **Table Editor** sẽ thấy 4 bảng:
   - products
   - product_options
   - orders
   - order_items

## 3. Lấy API Keys

1. Click **Settings** (icon bánh răng) ở sidebar
2. Click **API** trong menu Settings
3. Copy 2 thông tin:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbG...` (key rất dài)

## 4. Cấu Hình Environment Variables

1. Tạo file `.env` ở thư mục gốc project:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Telegram Bot Configuration (nếu có)
VITE_TELEGRAM_BOT_TOKEN=your-bot-token-here
VITE_TELEGRAM_CHAT_ID=your-chat-id-here
VITE_TELEGRAM_CONSULTATION_CHAT_ID=your-consultation-chat-id-here
```

2. Thay thế:
   - `your-project.supabase.co` → Project URL của bạn
   - `your-anon-key-here` → anon public key của bạn

## 5. Seed Products từ Mock Data

Sau khi cấu hình xong `.env`:

```bash
npm run seed:products
```

Script này sẽ:

- Đọc dữ liệu từ `src/mock/products.ts`
- Insert vào Supabase
- Tạo product options cho custom products

**Lưu ý**: Chỉ chạy 1 lần. Nếu chạy lại sẽ upsert (cập nhật nếu đã tồn tại).

## 6. Kiểm Tra Dữ Liệu

1. Vào **Table Editor** trong Supabase Dashboard
2. Click vào bảng **products** → Sẽ thấy danh sách sản phẩm
3. Click vào bảng **product_options** → Sẽ thấy các options

## 7. Test Tạo Đơn Hàng

1. Start dev server: `npm run dev`
2. Thêm sản phẩm vào giỏ hàng
3. Checkout và điền thông tin
4. Submit đơn hàng
5. Vào **Table Editor** → bảng **orders** → Sẽ thấy đơn hàng mới
6. Bảng **order_items** → Sẽ thấy chi tiết sản phẩm trong đơn

## 8. Test Tra Cứu Đơn Hàng

1. Truy cập `/orders/track`
2. Nhập số điện thoại hoặc mã đơn hàng
3. Click "Tra cứu ngay"
4. Sẽ hiển thị danh sách đơn hàng

## Troubleshooting

### Lỗi: "Supabase chưa được cấu hình"

- Kiểm tra file `.env` có tồn tại không
- Kiểm tra tên biến môi trường có đúng `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY` không
- Restart dev server sau khi tạo `.env`

### Lỗi: "permission denied for table products"

- Kiểm tra RLS policies đã được tạo chưa (chạy lại `schema.sql`)
- Policies "Anyone can read" và "Anyone can create" phải enable

### Lỗi: "Failed to seed products"

- Kiểm tra API keys có đúng không
- Kiểm tra database schema đã tạo chưa
- Check console để xem error cụ thể

### Products không hiển thị sau khi seed

- Vào Supabase Table Editor kiểm tra dữ liệu
- Check browser console có lỗi không
- Kiểm tra `getAllProducts()` trong service có gọi đúng không

## Next Steps

Sau khi setup xong Supabase:

1. **Cập nhật HomeView** để load products từ Supabase:

   ```typescript
   import { getAllProducts, getProductsByCategory } from '@/services/product.service'

   onMounted(async () => {
     products.value = await getAllProducts()
   })
   ```

2. **Cập nhật ProductDetailView** để load từ Supabase:

   ```typescript
   import { getProductById, getProductOptions } from '@/services/product.service'

   const product = await getProductById(route.params.id)
   const options = await getProductOptions(product.id)
   ```

3. **Admin Panel** (tùy chọn):
   - Tạo trang admin để quản lý đơn hàng
   - Update order status
   - View all orders

## Security Notes

- ✅ Anon key là PUBLIC - an toàn để commit vào code
- ✅ RLS policies bảo vệ dữ liệu
- ✅ Service role key KHÔNG được dùng trong frontend
- ✅ Không commit file `.env` (đã có trong `.gitignore`)

Chúc bạn setup thành công! 🎉
