# Project Overview

Dự án này là một Web App thương mại điện tử đơn giản (Mobile First Priority), tập trung bán một sản phẩm cụ thể.

- **Mục tiêu:** Giúp người dùng không rành công nghệ có thể xem sản phẩm, thêm vào giỏ hàng và tạo đơn hàng nhanh chóng.
- **Tính năng chính:** Xem chi tiết sản phẩm, quản lý giỏ hàng, đặt hàng (lưu thông tin đơn hàng, KHÔNG tích hợp thanh toán trực tuyến).
- **Yêu cầu cốt lõi:** Giao diện đồng nhất, trực quan, hiện đại, tối ưu UX/UI cho mobile. Dễ dàng thay đổi theme (màu sắc, font) qua cấu hình.

# Tech Stack

- **Core:** Vue 3 (Script Setup), TypeScript, Vite, Vue Router.
- **Styling:** Tailwind CSS, PostCSS.
- **State Management:** Pinia (đề xuất cho quản lý giỏ hàng).
- **Icons:** Lucide-vue-next hoặc Heroicons (dùng qua component).
- **Linting/Formatting:** ESLint, Prettier.

# Coding Guidelines

## 1. General Principles

- **No Hardcoding:** Tuyệt đối không hardcode dữ liệu sản phẩm hay giao diện. Dữ liệu phải được tách biệt (mock data hoặc config) để sẵn sàng kết nối API backend sau này.
- **Mobile First:** Luôn ưu tiên thiết kế và class Tailwind cho màn hình nhỏ trước (`w-full`), sau đó mới đến các breakpoint lớn hơn (`md:w-1/2`).
- **SEO & Accessibility (a11y):**
  - Luôn có thẻ `alt` cho hình ảnh.
  - Sử dụng thẻ ngữ nghĩa (`<header>`, `<main>`, `<article>`, `<button>`).
  - Đảm bảo độ tương phản màu sắc và kích thước vùng chạm (touch target) > 44px.

## 2. Vue & TypeScript Conventions

- **Naming:**
  - Component file: `PascalCase.vue` (VD: `ProductCard.vue`).
  - Composables: `useCamelCase.ts` (VD: `useCart.ts`).
  - Props/Events: Dùng `defineProps`, `defineEmits` với TypeScript interface rõ ràng.
- **Logic:** Tách logic phức tạp ra khỏi component, đưa vào `composables/`.
- **Script Setup:** Luôn sử dụng `<script setup lang="ts">`.

## 3. Tailwind & Styling (Themeability)

- **Utility-First:** Sử dụng class utility rõ ràng.
- **Theming:** Không dùng mã màu hex cứng (VD: `#ff0000`) trong template. Hãy dùng biến CSS hoặc config của Tailwind (VD: `bg-primary`, `text-accent`) để dễ dàng đổi theme toàn cục.
- **Helpers:** Chỉ dùng `@apply` trong file CSS riêng cho các pattern lặp lại quá nhiều, ưu tiên dùng component tái sử dụng hơn là class phức tạp.

# Project Structure Strategy

Tổ chức thư mục để dễ mở rộng và bảo trì:

- `src/assets/`: Static files (images, fonts).
- `src/components/`:
  - `common/`: Các nút, input, card cơ bản (Atomic design).
  - `layout/`: Header, Footer, MobileNavigation.
  - `features/`: Các component đặc thù (CartItem, ProductDetail).
- `src/composables/`: Logic tái sử dụng (useCart, useTheme, useOrder).
- `src/types/`: TypeScript interfaces/types (Product, CartItem, Order).
- `src/views/`: Các trang chính (HomeView, CheckoutView).
- `src/mock/`: Dữ liệu giả lập (để thay thế bằng API sau này).

# Resources & Scripts

- `npm run dev`: Chạy server development.
- `npm run build`: Build production.
- `npm run lint`: Kiểm tra lỗi cú pháp và style.
- Tài liệu tham khảo: Vue 3 Docs, Tailwind CSS Docs.

## 4. Cách Copilot nên phản hồi

- Viết code đầy đủ (không thiếu import/props).
- Mã front-end phải **tách biệt logic & UI**.
- Với UI output, Copilot sinh ra với Tailwind classes chuẩn.
- Khi hỗ trợ SEO, Copilot cung cấp cấu trúc `<head>` phù hợp.
- Khi đề cập backend API, Copilot phải dùng placeholder và chú thích rõ cần đổi khi backend thật sẵn sàng.

## 5. Trả lời bằng tiếng Việt

- Mọi gợi ý mã, giải thích, bình luận code đều phải bằng tiếng Việt.
- Thêm tên file và đường dẫn đầy đủ ở đầu mỗi đoạn code được gợi ý.
