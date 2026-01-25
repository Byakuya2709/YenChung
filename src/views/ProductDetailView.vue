<!-- filepath: src/views/ProductDetailView.vue -->

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
import { ShoppingCart, CreditCard } from 'lucide-vue-next'

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
        <!-- Left Column: Images -->
        <div class="space-y-4">
          <div class="relative aspect-square overflow-hidden rounded-2x shadow-xl">
            <img :src="product.images[0]" :alt="product.name" class="h-full w-full object-cover" />
            <!-- Price Badge -->
            <div
              class="absolute left-4 top-4 rounded-xl bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm"
            >
              <p class="text-2xl font-bold text-primary">{{ formattedPrice }}</p>
              <p class="text-xs text-gray-600">{{ quantity }} sản phẩm</p>
            </div>
          </div>

          <!-- Thumbnail Gallery -->
          <!-- <div class="grid grid-cols-4 gap-2">
            <div
              v-for="(image, index) in product.images"
              :key="index"
              class="aspect-square overflow-hidden rounded-lg bg-gray-100"
            >
              <img
                :src="image"
                :alt="`${product.name} ${index + 1}`"
                class="h-full w-full object-cover"
              />
            </div>
          </div> -->
        </div>

        <!-- Right Column: Product Options -->
        <div class="space-y-6 bg-pattern-red rounded-2xl p-6 shadow-lg lg:sticky lg:top-8">
          <!-- Product Info -->
          <div class="border border-white-600 rounded-3xl p-10">
            <div>
              <h1 class="mb-2 text-3xl font-bold text-white">{{ product.name }}</h1>
              <p class="text-white">{{ product.description }}</p>
            </div>

            <!-- Quantity -->
            <div class="flex items-center gap-4 mt-5 justify-between">
              <h3 class="text-4xl font-bold text-white">{{ formattedPrice }}</h3>
              <QuantityCounter v-model="quantity" />
            </div>
          </div>
          <!-- Product Type Selection Card -->
          <div class="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div class="mb-4">
              <h3 class="text-xl font-bold text-white">Loại Yến</h3>
              <p class="text-sm text-accent">Chọn loại yến và khối lượng</p>
            </div>

            <div class="space-y-4">
              <ProductTypeSelector v-model="selectedType" :types="product.types" />

              <div class="h-px bg-gray-200"></div>

              <WeightSelector v-model="selectedWeight" :weights="currentWeightOptions" />
            </div>
          </div>

          <!-- Volume Selection -->
          <div class="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <VolumeSelector v-model="selectedVolume" :volumes="product.volumeOptions" />
          </div>

          <!-- Package Selection -->
          <div class="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <PackageSelector v-model="selectedPackage" :packages="product.packageOptions" />
          </div>

          <!-- Action Buttons -->
          <div class="sticky bottom-4 flex gap-3">
            <PrimaryButton
              type="submit"
              @click="addToCart"
              class="flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold transition-colors"
            >
              <ShoppingCart class="h-5 w-5 inline-block" />

              Thêm giỏ hàng
            </PrimaryButton>

            <PrimaryButton
              type="submit"
              @click="goToCheckout"
              variant="secondary"
              class="flex flex-2 items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold transition-colors"
              style="background-color: white !important"
            >
              <ShoppingCart class="h-5 w-5 inline-block" />
              Mua ngay
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
