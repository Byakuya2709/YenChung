<!-- filepath: src/views/CartView.vue -->

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import CartItemCard from '@/components/features/CartItemCard.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

const router = useRouter()
const cartStore = useCartStore()

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + 'đ'
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <MobileHeader title="Giỏ Hàng" show-back-button :show-cart="false" />

    <main class="container mx-auto px-4 pb-32 pt-20">
      <div v-if="cartStore.items.length === 0" class="py-16 text-center">
        <div class="mb-4 text-6xl">🛒</div>
        <h2 class="mb-2 text-xl font-semibold text-gray-900">Giỏ hàng trống</h2>
        <p class="mb-6 text-gray-600">Hãy thêm sản phẩm vào giỏ hàng!</p>
        <PrimaryButton @click="router.push('/')"> Tiếp tục mua sắm </PrimaryButton>
      </div>

      <div v-else class="space-y-4">
        <CartItemCard
          v-for="item in cartStore.items"
          :key="item.id"
          :item="item"
          @remove="cartStore.removeItem(item.id)"
          @update-quantity="(qty) => cartStore.updateQuantity(item.id, qty)"
        />
      </div>
    </main>

    <!-- Bottom Bar -->
    <div
      v-if="cartStore.items.length > 0"
      class="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <div class="container mx-auto max-w-md">
        <div class="mb-4 flex items-center justify-between">
          <span class="font-medium text-gray-700">Tổng cộng:</span>
          <span class="text-2xl font-bold text-primary">
            {{ formatPrice(cartStore.totalPrice) }}
          </span>
        </div>
        <PrimaryButton @click="router.push('/checkout')" class="w-full">
          Thanh toán ({{ cartStore.totalItems }})
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>
