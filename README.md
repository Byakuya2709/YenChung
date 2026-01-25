# E-Commerce Web App - Single Product Focus

Dự án Web App thương mại điện tử đơn giản, tối ưu cho Mobile First, tập trung bán một sản phẩm cụ thể.

## Mục tiêu

- Giúp người dùng không rành công nghệ có thể xem sản phẩm, thêm vào giỏ hàng và tạo đơn hàng nhanh chóng
- Giao diện đồng nhất, trực quan, hiện đại
- Tối ưu UX/UI cho mobile
- Dễ dàng thay đổi theme (màu sắc, font) qua cấu hình

## Tech Stack

- **Frontend**: Vue 3 (Composition API) + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS 3 + PostCSS
- **State Management**: Pinia
- **Icons**: Lucide-vue-next
- **Linting**: ESLint + Prettier

## Project Structure

```
src/
├── assets/           # Static assets (images, fonts, styles)
├── components/
│   ├── common/      # Reusable components (buttons, inputs, cards)
│   ├── layout/      # Layout components (Header, Footer, Navigation)
│   └── features/    # Feature-specific components (CartItem, ProductDetail)
├── composables/     # Reusable logic (useCart, useTheme, useOrder)
├── types/           # TypeScript interfaces (Product, CartItem, Order)
├── views/           # Page components (HomeView, CheckoutView)
├── mock/            # Mock data (sẵn sàng thay thế bằng API)
├── App.vue          # Root component
└── main.ts          # Entry point
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Cài đặt

```sh
npm install
```

### Development

```sh
npm run dev
```

### Production Build

```sh
npm run build
```

### Type Check

```sh
npm run type-check
```

### Lint & Format

```sh
npm run lint
npm run format
```
