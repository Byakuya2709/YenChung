<!-- filepath: src/components/features/ProductCard.vue -->

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { ShoppingCart, Sparkles, Zap } from 'lucide-vue-next'
import type { Product } from '@/types/product'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const router = useRouter()
const cartStore = useCartStore()

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + 'đ'
}

function viewDetail() {
  router.push(`/product/${props.product.id}`)
}

// Mua nhanh cho combo/unit (số lượng 1)
function quickBuy() {
  // Tạo CartItem và lưu vào sessionStorage cho "mua ngay"
  const directPurchaseItem = {
    id: `${props.product.id}-${Date.now()}`,
    productId: props.product.id,
    productName: props.product.name,
    productImage: props.product.images[0],
    quantity: 1,
    selectedType: 'Sản phẩm có sẵn',
    selectedWeight: '',
    selectedVolume: '',
    selectedPackage: null,
    price: props.product.basePrice,
    totalPrice: props.product.basePrice,
  }

  sessionStorage.setItem('direct_purchase', JSON.stringify(directPurchaseItem))
  router.push('/checkout')
}

// Badge label cho từng category
const categoryBadge = {
  custom: { label: 'Tùy chỉnh', color: 'bg-blue-500' },
  combo: { label: 'Combo', color: 'bg-purple-500' },
  unit: { label: 'Có sẵn', color: 'bg-green-500' },
}
</script>

<template>
  <div
    class="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:rounded-2xl"
    @click="viewDetail"
  >
    <!-- Category Badge -->
    <div
      class="absolute left-2 top-2 z-10 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold text-white backdrop-blur-sm sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-sm"
      :class="categoryBadge[product.category].color"
    >
      <Sparkles class="h-3 w-3" />
      <span>{{ categoryBadge[product.category].label }}</span>
    </div>

    <!-- Product Image -->
    <div class="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <img
        :src="product.images[0]"
        :alt="product.name"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <!-- Hover Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <div class="absolute bottom-3 left-3 right-3 space-y-2 sm:bottom-4 sm:left-4 sm:right-4">
          <!-- Nút "Mua nhanh" cho combo/unit -->
          <button
            v-if="product.category === 'combo' || product.category === 'unit'"
            @click.stop="quickBuy"
            class="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2 text-xs font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <Zap class="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Mua Nhanh</span>
          </button>

          <!-- Nút "Xem chi tiết" -->
          <button
            @click.stop="viewDetail"
            class="flex w-full items-center justify-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-gray-900 shadow-md transition-all hover:scale-105 hover:shadow-lg sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <ShoppingCart class="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Xem Chi Tiết</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Product Info -->
    <div class="flex flex-1 flex-col p-3 sm:p-4">
      <h3 class="mb-1 text-sm font-bold text-gray-900 line-clamp-1 sm:mb-2 sm:text-base lg:text-lg">
        {{ product.name }}
      </h3>
      <p class="mb-2 flex-1 text-xs text-gray-600 line-clamp-2 sm:mb-3 sm:text-sm">
        {{ product.description }}
      </p>

      <div class="flex items-center justify-between">
        <div>
          <p v-if="product.category === 'custom'" class="text-[10px] text-gray-500 sm:text-xs">
            Chỉ từ
          </p>
          <p class="text-base font-bold text-red-600 sm:text-lg lg:text-xl">
            {{ formatPrice(product.basePrice) }}
          </p>
        </div>

        <button
          @click.stop="
            product.category === 'combo' || product.category === 'unit' ? quickBuy() : viewDetail()
          "
          class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white transition-all hover:scale-110 hover:shadow-lg sm:h-10 sm:w-10"
          :title="
            product.category === 'combo' || product.category === 'unit'
              ? 'Mua nhanh'
              : 'Xem chi tiết'
          "
        >
          <component
            :is="product.category === 'combo' || product.category === 'unit' ? Zap : ShoppingCart"
            class="h-3.5 w-3.5 sm:h-4 sm:w-4"
          />
        </button>
      </div>
    </div>

    <!-- Shine Effect on Hover -->
    <div
      class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    >
      <div
        class="absolute -inset-full animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent"
      ></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.animate-shine {
  animation: shine 1.5s ease-in-out;
}
</style>
