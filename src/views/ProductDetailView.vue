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
const selectedType = ref('type3')
const selectedWeight = ref('tho1-10g')
const selectedVolume = ref('100ml')
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
  <div class="min-h-screen bg-gray-50 py-8">
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
            class="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]"
          >
            <!-- Ảnh chồng lên nhau theo kiểu 3D -->
            <div
              v-for="layer in displayLayers"
              :key="layer"
              class="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
              :style="{
                // Lớp 1 (layer=1) sẽ có transform là translate(-50%, -50%) scale(1)
                // Các lớp sau sẽ nhỏ dần và lệch đi
                transform: `translate(-50%, -50%) 
                translate(${(layer - 1) * 32}px, ${(layer - 1) * -21}px) 
                scale(${1 - (layer - 1) * 0.1})`,

                zIndex: 100 - layer, // Đảm bảo lớp nhỏ hơn (layer 1) có z-index lớn hơn

                opacity: 1 - (layer - 1) * 0.2,
                aspectRatio: '1 / 1',
              }"
            >
              <img :src="product.images[0]" class="h-full w-full object-contain" />
            </div>

            <!-- Badge hiển thị số lượng nếu > 5 -->
            <div
              v-if="hasMoreLayers"
              class="absolute -bottom-3 -right-3 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-2xl sm:h-16 sm:w-16"
            >
              <div class="text-center">
                <div class="text-xl font-bold sm:text-2xl">{{ quantity }}</div>
                <div class="text-[9px] sm:text-[10px]">hủ</div>
              </div>
            </div>

            <!-- Price Badge -->
            <!-- <div
              class="absolute -bottom-3 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-white px-4 py-2 shadow-2xl sm:px-6 sm:py-3"
            >
              <p class="text-center text-xl font-bold text-primary sm:text-2xl">
                {{ formattedPrice }}
              </p>
              <p class="text-center text-[10px] text-gray-600 sm:text-xs">
                Tổng: {{ quantity }} sản phẩm
              </p>
            </div> -->
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
              class="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <h3 class="text-3xl font-bold text-white sm:text-4xl">{{ formattedPrice }}</h3>
              <QuantityCounter v-model="quantity" />
            </div>
          </div>

          <!-- Product Type Selection Card -->
          <div class="rounded-2xl border border-gray-200 p-4 shadow-sm sm:p-6">
            <div class="mb-4">
              <h3 class="text-lg font-bold text-white sm:text-xl">Loại Yến</h3>
              <p class="text-xs text-accent sm:text-sm">Chọn loại yến và khối lượng</p>
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

          <!-- Action Buttons - Fixed on mobile -->
          <div
            class="fixed bottom-0 left-0 right-0 z-40 flex gap-2 border-t border-gray-200 bg-white p-4 shadow-lg sm:relative sm:gap-3 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none"
          >
            <PrimaryButton
              type="submit"
              @click="addToCart"
              class="flex flex-[1.5] items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors sm:rounded-2xl sm:px-6 sm:text-base"
            >
              <ShoppingCart class="h-4 w-4 inline-block sm:h-5 sm:w-5" />
              <span class="hidden sm:inline">Thêm giỏ hàng</span>
              <span class="sm:hidden">Giỏ hàng</span>
            </PrimaryButton>

            <PrimaryButton
              type="submit"
              @click="goToCheckout"
              variant="secondary"
              class="flex flex-[1] items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors sm:flex-2 sm:rounded-2xl sm:px-6 sm:text-base"
              style="background-color: white !important"
            >
              <ShoppingCart class="h-4 w-4 inline-block sm:h-5 sm:w-5" />
              Mua ngay
            </PrimaryButton>
          </div>
        </div>
      </div>

      <!-- Spacer for mobile fixed buttons -->
      <div class="h-20 sm:hidden"></div>
    </div>
  </div>
</template>
