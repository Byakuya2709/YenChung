<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useProductPrice } from '@/composables/useProductPrice'
import { mockProduct } from '@/mock/products'
import type { Product } from '@/types/product'

import QuantityCounter from '@/components/common/QuantityCounter.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import ProductTypeSelector from '@/components/features/ProductTypeSelector.vue'
import WeightSelector from '@/components/features/WeightSelector.vue'
import VolumeSelector from '@/components/features/VolumeSelector.vue'
import PackageSelector from '@/components/features/PackageSelector.vue'
import { ShoppingCart } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

// State
const product = ref<Product>(mockProduct)
const quantity = ref(1)
const selectedType = ref(product.value.types[0]?.id || '')
const selectedWeight = ref(product.value.types[0]?.weightOptions[0]?.id || '')
const selectedVolume = ref(product.value.volumeOptions?.[0] || '')
const selectedPackage = ref<number | null>(null)

// Tính số lượng layer hiển thị (tối đa 5 layer để tránh quá tải UI)
const displayLayers = computed(() => Math.min(quantity.value, 5))
const hasMoreLayers = computed(() => quantity.value > 3)

// Lấy weightOptions của type hiện tại
const currentWeightOptions = computed(() => {
  const type = product.value.types.find((t) => t.id === selectedType.value)
  return type?.weightOptions || []
})

// Khi đổi type, tự động chọn weight đầu tiên
watch(selectedType, (newType) => {
  const type = product.value.types.find((t) => t.id === newType)
  if (type && type.weightOptions.length > 0) {
    selectedWeight.value = type.weightOptions[0].id
  }
})

// Tính giá
const { unitPrice, totalPrice, formattedPrice } = useProductPrice(
  product,
  selectedType,
  selectedWeight,
  quantity,
)

// Thêm vào giỏ hàng
function addToCart() {
  const type = product.value.types.find((t) => t.id === selectedType.value)
  const weight = currentWeightOptions.value.find((w) => w.id === selectedWeight.value)

  cartStore.addItem({
    id: `${product.value.id}-${Date.now()}`,
    productId: product.value.id,
    productName: product.value.name,
    productImage: product.value.images[0],
    quantity: quantity.value,
    selectedType: `${type?.name} - ${weight?.name}`,
    selectedWeight: selectedWeight.value,
    selectedVolume: selectedVolume.value,
    selectedPackage: selectedPackage.value,
    price: unitPrice.value,
    totalPrice: totalPrice.value,
  })

  quantity.value = 1
  router.push('/cart')
}

function goToCheckout() {
  addToCart()
  router.push('/checkout')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-2">
    <div class="container mx-auto px-4">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm text-gray-600">
        <router-link to="/" class="hover:text-primary">Trang chủ</router-link>
        <span class="mx-2">/</span>
        <span class="text-gray-900">Chi tiết sản phẩm</span>
      </nav>

      <div class="grid gap-8 lg:grid-cols-2">
        <!-- Left Column: 3D Stacked Images - Fixed Container -->
        <div class="flex items-start justify-center lg:sticky lg:top-10 lg:h-[600px]">
          <div
            class="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] lg:h-[500px] lg:w-[500px] border-r border-gray bg-white"
          >
            <div
              v-for="layer in displayLayers"
              :key="layer"
              class="absolute left-1/2 top-1/2 w-[80%] transition-all duration-500 ease-out will-change-transform"
              :class="{ 'animate-pop-in': layer === 1 }"
              :style="{
                // --- LOGIC VỊ TRÍ & SCALE ---
                transform: `
          translate(-50%, -50%) 
          translateX(${(layer - 1) * 50 - (displayLayers - 1) * 25}px) 
          scale(${1 - (layer - 1) * 0.15})
        `,

                // --- LOGIC CHIỀU SÂU ---
                zIndex: 100 - layer,
                opacity: 1 - (layer - 1) * 0.25,
                filter: layer === 1 ? 'none' : `blur(${(layer - 1) * 1}px) grayscale(20%)`,

                // --- CẤU HÌNH KHÁC ---
                aspectRatio: '1 / 1',
                pointerEvents: layer === 1 ? 'auto' : 'none',
              }"
            >
              <img
                :src="product.images[0]"
                class="h-full w-full object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)]"
              />
            </div>

            <div
              v-if="hasMoreLayers"
              class="absolute -bottom-3 -right-3 lg:-right-8 lg:top-20 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-2xl sm:h-16 sm:w-16"
            >
              <div class="text-center">
                <div class="text-xl font-bold sm:text-2xl">{{ quantity }}</div>
                <div class="text-[9px] sm:text-[10px]">hủ</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Product Options -->
        <div class="space-y-4 rounded-2xl bg-pattern-red p-4 shadow-lg sm:space-y-6 sm:p-6">
          <!-- Product Info -->
          <div class="rounded-3xl border border-white-600 p-6 sm:p-10">
            <div>
              <h1 class="mb-2 text-2xl font-bold text-white sm:text-3xl">{{ product.name }}</h1>
              <p class="text-sm text-white sm:text-base">{{ product.description }}</p>
            </div>

            <!-- Quantity Counter -->
            <div
              class="mt-5 flex flex-row items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <h3 class="text-3xl font-bold text-white sm:text-4xl">{{ formattedPrice }}</h3>
              <QuantityCounter v-model="quantity" />
            </div>
          </div>

          <!-- Product Type Selection Card -->
          <div class="rounded-2xl border border-gray-200 p-4 shadow-sm sm:p-6">
            <div class="mb-4">
              <h3 class="text-lg font-bold text-white sm:text-xl">Lượng Yến</h3>
              <p class="text-xs text-accent sm:text-sm">Chọn lượng yến mong muốn</p>
            </div>

            <div class="space-y-4">
              <ProductTypeSelector v-model="selectedType" :types="product.types" />

              <div class="h-px bg-gray-200"></div>

              <WeightSelector v-model="selectedWeight" :weights="currentWeightOptions" />
            </div>
          </div>

          <!-- Volume Selection -->
          <div class="rounded-2xl border border-gray-200 p-4 shadow-sm sm:p-6">
            <VolumeSelector v-model="selectedVolume" :volumes="product.volumeOptions" />
          </div>

          <!-- Package Selection -->
          <div class="rounded-2xl border border-gray-200 p-4 shadow-sm sm:p-6">
            <PackageSelector v-model="selectedPackage" :packages="product.packageOptions" />
          </div>

          <div
            class="fixed bottom-0 left-0 right-0 z-40 flex gap-2 border-t border-gray-200 bg-white p-4 shadow-lg sm:relative sm:gap-3 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none"
          >
            <PrimaryButton
              type="submit"
              @click="addToCart"
              variant="secondary"
              class="flex flex-[1.5] items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors sm:rounded-2xl sm:px-6 sm:text-base"
            >
              <ShoppingCart class="h-4 w-4 inline-block sm:h-5 sm:w-5" />
              Thêm vào giỏ hàng
            </PrimaryButton>

            <PrimaryButton
              type="submit"
              @click="goToCheckout"
              variant="cta"
              class="flex flex-[1] items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors sm:flex-2 sm:rounded-2xl sm:px-6 sm:text-base"
            >
              <ShoppingCart class="h-4 w-4 inline-block sm:h-5 sm:w-5" />
              Mua ngay
            </PrimaryButton>
          </div>
        </div>
      </div>

      <!-- Spacer for mobile fixed buttons -->
      <!-- <div class="h-20 sm:hidden"></div> -->
    </div>
  </div>
</template>
<style scoped>
/* Animation cho Layer 1: Phóng to từ nhỏ -> lớn */
.animate-pop-in {
  animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes popIn {
  0% {
    opacity: 0;
    /* Bắt đầu nhỏ xíu */
    transform: translate(-50%, -50%) translateX(0px) scale(0.5);
  }
  100% {
    opacity: 1;
    /* Kết thúc ở kích thước thật (Logic transform sẽ được Vue ghi đè lại sau khi mount, 
       nhưng animation này tạo cảm giác nảy lúc đầu) */
  }
}
</style>
