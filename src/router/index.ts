import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import CartView from '@/views/CartView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import OrderSuccessView from '@/views/OrderSuccessView.vue'
import ContactView from '@/views/ContactView.vue'
import OrderTrackingView from '@/views/OrderTrackingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Trang Chủ - Yến Sào Cao Cấp' },
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetailView,
      meta: { title: 'Chi Tiết Sản Phẩm' },
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: { title: 'Giỏ Hàng' },
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
      meta: { title: 'Thanh Toán' },
    },
    {
      path: '/order-success/:orderId',
      name: 'order-success',
      component: OrderSuccessView,
      meta: { title: 'Đặt Hàng Thành Công' },
    },
    {
      path: '/orders/track',
      name: 'order-tracking',
      component: OrderTrackingView,
      meta: { title: 'Tra Cứu Đơn Hàng' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: { title: 'Liên Hệ Tư Vấn' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || 'Yến Sào Cao Cấp'
  next()
})

export default router
