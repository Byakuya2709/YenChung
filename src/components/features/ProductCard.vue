<!-- filepath: src/components/features/ProductCard.vue -->

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ShoppingCart } from 'lucide-vue-next'
import type { Product } from '@/types/product'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const router = useRouter()

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + 'đ'
}

function viewDetail() {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <div
    class="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl"
    @click="viewDetail"
  >
    <!-- Product Image -->
    <div class="relative aspect-square overflow-hidden bg-gray-100">
      <img
        :src="product.images[0]"
        :alt="product.name"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
      ></div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <h3 class="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
        {{ product.name }}
      </h3>
      <p class="mb-3 text-sm text-gray-600 line-clamp-2">
        {{ product.description }}
      </p>

      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500">Từ</p>
          <p class="text-xl font-bold text-primary">{{ formatPrice(product.basePrice) }}</p>
        </div>

        <button
          @click.stop="viewDetail"
          class="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
        >
          <ShoppingCart class="h-4 w-4" />
          <span>Mua Ngay</span>
        </button>
      </div>
    </div>
  </div>
</template>
