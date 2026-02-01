<!-- filepath: src/views/CartView.vue -->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { ShoppingBag, ArrowLeft, Trash2, Tag, Gift } from 'lucide-vue-next'
import CartItemCard from '@/components/features/CartItemCard.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

const router = useRouter()
const cartStore = useCartStore()

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + 'đ'
}

// Tính phí vận chuyển và giảm giá (giả lập)
const shippingFee = computed(() => {
  return cartStore.totalPrice > 500000 ? 0 : 0
})

const discount = computed(() => {
  return cartStore.totalPrice > 1000000 ? 0 : 0
})

const finalTotal = computed(() => {
  return cartStore.totalPrice + shippingFee.value - discount.value
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50">
    <!-- Header với Back Button -->
    <header class="sticky top-0 z-40 border-b border-gray-200/50 bg-white/80 backdrop-blur-xl">
      <div class="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        <button
          @click="router.push('/')"
          class="flex items-center gap-2 rounded-xl px-3 py-2 text-gray-700 transition-all hover:bg-gray-100 active:scale-95"
        >
          <ArrowLeft class="h-5 w-5" />
          <span class="font-medium">Quay lại</span>
        </button>
        <h1 class="text-lg font-bold text-gray-900">
          Giỏ hàng
          <span v-if="cartStore.totalItems > 0" class="text-primary">
            ({{ cartStore.totalItems }})
          </span>
        </h1>
        <div class="w-20"></div>
      </div>
    </header>

    <main class="container mx-auto px-4 pb-40 pt-6 sm:px-6">
      <!-- Empty State -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="cartStore.items.length === 0"
          class="mx-auto mt-16 max-w-md rounded-3xl bg-white p-8 text-center shadow-xl sm:mt-24 sm:p-12"
        >
          <div
            class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200"
          >
            <ShoppingBag class="h-12 w-12 text-gray-400" />
          </div>
          <h2 class="mb-3 text-2xl font-bold text-gray-900">Giỏ hàng trống</h2>
          <p class="mb-8 text-gray-600">
            Bạn chưa có sản phẩm nào trong giỏ hàng.<br />
            Hãy khám phá và thêm sản phẩm yêu thích nhé!
          </p>
          <PrimaryButton @click="router.push('/')" class="w-full">
            <ShoppingBag class="mr-2 h-5 w-5 inline-block" />
            Khám phá sản phẩm
          </PrimaryButton>
        </div>
      </transition>

      <!-- Cart Items List -->
      <transition-group
        v-if="cartStore.items.length > 0"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
        tag="div"
        class="space-y-3 sm:space-y-4"
      >
        <CartItemCard
          v-for="(item, index) in cartStore.items"
          :key="item.id"
          :item="item"
          :style="{ transitionDelay: `${index * 50}ms` }"
          @remove="cartStore.removeItem(item.id)"
          @update-quantity="(qty) => cartStore.updateQuantity(item.id, qty)"
        />
      </transition-group>
    </main>

    <!-- Bottom Checkout Bar -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-full"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-full"
    >
      <div
        v-if="cartStore.items.length > 0"
        class="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200/50 bg-white/95 backdrop-blur-xl"
      >
        <div class="container mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-5">
          <!-- Summary Details -->
          <div class="mb-4 space-y-2 rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50/30 p-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Tạm tính</span>
              <span class="font-semibold text-gray-900">
                {{ formatPrice(cartStore.totalPrice) }}
              </span>
            </div>

            <div class="flex items-center justify-between text-sm">
              <span class="flex items-center gap-1 text-gray-600">
                <Tag class="h-4 w-4" />
                Phí vận chuyển
              </span>
              <span
                class="font-semibold"
                :class="shippingFee === 0 ? 'text-green-600' : 'text-gray-900'"
              >
                {{ shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee) }}
              </span>
            </div>

            <div v-if="discount > 0" class="flex items-center justify-between text-sm">
              <span class="flex items-center gap-1 text-gray-600">
                <Gift class="h-4 w-4" />
                Giảm giá
              </span>
              <span class="font-semibold text-green-600"> -{{ formatPrice(discount) }} </span>
            </div>
            <div class="border-t border-gray-200 pt-2">
              <div class="flex items-center justify-between">
                <span class="text-base font-bold text-gray-900">Tổng cộng</span>
                <span class="text-2xl font-bold text-primary">
                  {{ formatPrice(finalTotal) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Checkout Button -->
          <PrimaryButton @click="router.push('/checkout')" class="w-full h-12 sm:h-14">
            <span class="text-base font-bold">Tiến hành thanh toán</span>
            <span class="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-sm">
              {{ cartStore.totalItems }}
            </span>
          </PrimaryButton>

          <!-- Free Shipping Note -->
          <!-- <p
            v-if="shippingFee > 0 && cartStore.totalPrice < 500000"
            class="mt-3 text-center text-xs text-gray-500"
          >
            Mua thêm {{ formatPrice(500000 - cartStore.totalPrice) }} để được miễn phí vận chuyển
          </p> -->
        </div>
      </div>
    </transition>
  </div>
</template>
