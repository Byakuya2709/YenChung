# Hướng dẫn Triển khai lên Vercel

## Yêu cầu trước khi triển khai

- Tài khoản Vercel (đăng ký miễn phí tại [vercel.com](https://vercel.com))
- Git repository đã được push lên GitHub/GitLab/Bitbucket
- Dự án đã được test kỹ trên local (`npm run build` và `npm run preview`)

## Phương pháp 1: Triển khai qua Vercel Dashboard (Đơn giản nhất)

### Bước 1: Đăng nhập Vercel

1. Truy cập [vercel.com](https://vercel.com)
2. Đăng nhập bằng GitHub/GitLab/Bitbucket

### Bước 2: Import Project

1. Click **"Add New"** → **"Project"**
2. Chọn repository của bạn từ danh sách
3. Click **"Import"**

### Bước 3: Cấu hình Project

Vercel sẽ tự động phát hiện framework (Vite), nhưng đảm bảo các thông tin sau:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Bước 4: Thiết lập Environment Variables (Quan trọng!)

Trong phần **"Environment Variables"**, thêm các biến môi trường:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_TELEGRAM_BOT_TOKEN=your-telegram-bot-token
VITE_TELEGRAM_CHAT_ID=your-telegram-chat-id
```

**Lưu ý:**

- Các biến môi trường phải bắt đầu bằng `VITE_` để Vite có thể nhận diện
- Copy chính xác giá trị từ file `.env` local của bạn
- Không commit file `.env` lên Git!

### Bước 5: Deploy

1. Click **"Deploy"**
2. Đợi Vercel build và deploy (thường 1-3 phút)
3. Sau khi hoàn thành, bạn sẽ có URL dạng: `https://your-project.vercel.app`

## Phương pháp 2: Triển khai qua Vercel CLI

### Bước 1: Cài đặt Vercel CLI

```bash
npm install -g vercel
```

### Bước 2: Đăng nhập

```bash
vercel login
```

### Bước 3: Deploy từ thư mục dự án

```bash
# Deploy lần đầu (production)
vercel --prod

# Hoặc deploy preview
vercel
```

### Bước 4: Làm theo hướng dẫn

CLI sẽ hỏi:

- Set up and deploy? **Y**
- Which scope? Chọn account của bạn
- Link to existing project? **N** (lần đầu tiên)
- Project name? Nhập tên hoặc để mặc định
- Directory? `.` (thư mục hiện tại)

### Bước 5: Thêm Environment Variables

```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_TELEGRAM_BOT_TOKEN
vercel env add VITE_TELEGRAM_CHAT_ID
```

Sau mỗi lệnh, paste giá trị và chọn môi trường (Production/Preview/Development).

### Bước 6: Redeploy với Environment Variables

```bash
vercel --prod
```

## Cấu hình Custom Domain (Tùy chọn)

### Trên Vercel Dashboard:

1. Vào project settings
2. Chọn tab **"Domains"**
3. Thêm domain của bạn
4. Làm theo hướng dẫn để cấu hình DNS

## Auto-Deploy khi Git Push

Vercel tự động deploy khi bạn push code lên Git:

- **main/master branch** → Production deployment
- **Các branch khác** → Preview deployment

Để tắt auto-deploy cho một branch:

1. Vào Project Settings
2. Chọn **Git**
3. Cấu hình Production Branch hoặc Ignored Build Step

## Troubleshooting

### Lỗi Build

- Kiểm tra `npm run build` trên local trước
- Xem build logs trên Vercel Dashboard
- Đảm bảo tất cả dependencies đã được khai báo trong `package.json`

### Lỗi 404 khi refresh page

- File `vercel.json` đã được tạo với rewrites config để xử lý SPA routing
- Nếu vẫn gặp lỗi, kiểm tra lại nội dung file `vercel.json`

### Supabase không kết nối

- Kiểm tra environment variables đã được set đúng chưa
- Đảm bảo Supabase URL cho phép domain Vercel truy cập
- Vào Supabase Dashboard → Settings → API để kiểm tra

### Environment Variables không hoạt động

- Phải bắt đầu bằng `VITE_`
- Phải redeploy sau khi thêm/sửa env vars
- Kiểm tra trên Vercel Dashboard → Settings → Environment Variables

## Monitoring & Logs

### Xem Logs

1. Vào project dashboard trên Vercel
2. Chọn deployment bạn muốn xem
3. Click vào **"View Function Logs"** hoặc **"Build Logs"**

### Analytics

Vercel cung cấp analytics miễn phí:

- Page views
- Performance metrics
- Web Vitals

Vào project → Analytics để xem chi tiết.

## Rollback

Nếu deployment mới có vấn đề:

1. Vào Deployments tab
2. Tìm deployment trước đó hoạt động tốt
3. Click menu → **"Promote to Production"**

## Best Practices

1. **Luôn test trên local trước khi push:**

   ```bash
   npm run build
   npm run preview
   ```

2. **Sử dụng Preview Deployments:**

   - Tạo branch mới cho features
   - Push để tạo preview deployment
   - Test trên preview URL trước khi merge

3. **Bảo mật Environment Variables:**

   - Không commit `.env` files
   - Sử dụng Vercel Environment Variables
   - Phân biệt giá trị cho Production/Preview/Development

4. **Optimize Build:**
   - Sử dụng dynamic imports cho code splitting
   - Optimize images và assets
   - Enable Vercel's image optimization nếu cần

## Tài nguyên

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Vue Router HTML5 Mode](https://router.vuejs.org/guide/essentials/history-mode.html)

## Giới hạn Free Plan

- 100 GB bandwidth/tháng
- Serverless Function Executions: 100GB-Hrs
- 6,000 build minutes/tháng
- Unlimited deployments

Nếu vượt giới hạn, cân nhắc nâng cấp lên Pro plan ($20/tháng).
