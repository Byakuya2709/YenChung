<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useOrder } from '@/composables/useOrder'
import { useCartStore } from '@/stores/cart'
import { useProductPrice } from '@/composables/useProductPrice'
import { allProducts } from '@/mock/products'
import type { Product, CustomProduct } from '@/types/product'

import QuantityCounter from '@/components/common/QuantityCounter.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import ProductTypeSelector from '@/components/features/ProductTypeSelector.vue'
import WeightSelector from '@/components/features/WeightSelector.vue'
import VolumeSelector from '@/components/features/VolumeSelector.vue'
import PackageSelector from '@/components/features/PackageSelector.vue'
import { ShoppingCart, ChevronRight, Shield, Sparkles, Package, Star, Check } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
const { createDirectOrder } = useOrder()

// State
const product = ref<Product | null>(null)
const quantity = ref(1)

// States chỉ dùng cho custom product
const selectedType = ref('')
const selectedWeight = ref('')
const selectedVolume = ref('')
const selectedPackage = ref<number | null>(null)

// Kiểm tra xem có phải custom product không
const isCustomProduct = computed(() => product.value?.category === 'custom')
const customProduct = computed(() =>
  isCustomProduct.value ? (product.value as CustomProduct) : null,
)

// Load sản phẩm từ route params
onMounted(() => {
  const productId = route.params.id as string
  const foundProduct = allProducts.find((p) => p.id === productId)

  if (foundProduct) {
    product.value = foundProduct

    // Nếu là custom product, khởi tạo các giá trị mặc định
    if (foundProduct.category === 'custom') {
      const custom = foundProduct as CustomProduct
      selectedType.value = custom.types[0]?.id || ''
      selectedWeight.value = custom.types[0]?.weightOptions[0]?.id || ''
      selectedVolume.value = custom.volumeOptions?.[0] || ''
    }
  } else {
    // Redirect về home nếu không tìm thấy
    router.push('/')
  }
})

// Tính số lượng layer hiển thị (tối đa 5 layer để tránh quá tải UI)
const displayLayers = computed(() => Math.min(quantity.value, 5))
const hasMoreLayers = computed(() => quantity.value > 3)

// Lấy weightOptions của type hiện tại (chỉ cho custom)
const currentWeightOptions = computed(() => {
  if (!customProduct.value) return []
  const type = customProduct.value.types.find((t) => t.id === selectedType.value)
  return type?.weightOptions || []
})

// Khi đổi type, tự động chọn weight đầu tiên (chỉ cho custom)
watch(selectedType, (newType) => {
  if (!customProduct.value) return
  const type = customProduct.value.types.find((t) => t.id === newType)
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

const categoryMap: Record<string, string> = {
  combo: 'Combo đủ đầy',
  unit: 'Yến thô',
}

// Thêm vào giỏ hàng
function addToCart() {
  if (!product.value) return

  let selectedTypeText = ''

  // Tạo text hiển thị dựa trên category
  if (isCustomProduct.value && customProduct.value) {
    const type = customProduct.value.types.find((t) => t.id === selectedType.value)
    const weight = currentWeightOptions.value.find((w) => w.id === selectedWeight.value)
    selectedTypeText = `${type?.name} - ${weight?.name}`
  } else {
    selectedTypeText = categoryMap[product.value.category] ?? ''
  }

  cartStore.addItem({
    id: `${product.value.id}-${Date.now()}`,
    productId: product.value.id,
    productName: product.value.name,
    productImage: product.value.images[0],
    productCategory: product.value.category, // Thêm category
    quantity: quantity.value,
    selectedType: selectedTypeText,
    selectedWeight: isCustomProduct.value ? selectedWeight.value : '',
    selectedVolume: isCustomProduct.value ? selectedVolume.value : '',
    selectedPackage: isCustomProduct.value ? selectedPackage.value : null,
    price: unitPrice.value,
    totalPrice: totalPrice.value,
  })

  quantity.value = 1
}

// Mua ngay - chỉ mua sản phẩm hiện tại, không tính giỏ hàng
function goToCheckout() {
  if (!product.value) return

  let selectedTypeText = ''

  // Tạo text hiển thị dựa trên category
  if (isCustomProduct.value && customProduct.value) {
    const type = customProduct.value.types.find((t) => t.id === selectedType.value)
    const weight = currentWeightOptions.value.find((w) => w.id === selectedWeight.value)
    selectedTypeText = `${type?.name} - ${weight?.name}`
  } else {
    selectedTypeText = 'Sản phẩm có sẵn'
  }

  // Tạo CartItem từ sản phẩm hiện tại
  const directPurchaseItem = {
    id: `${product.value.id}-${Date.now()}`,
    productId: product.value.id,
    productName: product.value.name,
    productImage: product.value.images[0],
    productCategory: product.value.category, // Thêm category
    quantity: quantity.value,
    selectedType: selectedTypeText,
    selectedWeight: isCustomProduct.value ? selectedWeight.value : '',
    selectedVolume: isCustomProduct.value ? selectedVolume.value : '',
    selectedPackage: isCustomProduct.value ? selectedPackage.value : null,
    price: unitPrice.value,
    totalPrice: totalPrice.value,
  }

  // Lưu vào sessionStorage với key riêng cho "mua ngay"
  sessionStorage.setItem('direct_purchase', JSON.stringify(directPurchaseItem))

  // Chuyển đến trang checkout
  router.push('/checkout')
}
</script>

<template>
  <div
    v-if="!product"
    class="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-white"
  >
    <div class="text-center">
      <div class="mb-4 animate-spin text-4xl">⏳</div>
      <p class="text-gray-600">Đang tải sản phẩm...</p>
    </div>
  </div>

  <div v-else class="min-h-screen bg-gradient-to-br from-slate-50 to-white">
    <!-- Background Pattern -->
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:64px_64px] opacity-20"
    ></div>

    <header class="sticky top-0 z-40 border-b border-gray-200/50 bg-white/80 backdrop-blur-xl">
      <div class="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        <button
          @click="router.back()"
          class="flex items-center gap-2 rounded-xl px-3 py-2 text-gray-700 transition-all hover:bg-gray-100 active:scale-95"
        >
          <ArrowLeft class="h-5 w-5" />
          <span class="font-medium">Quay lại</span>
        </button>
        <h1 class="text-lg font-bold text-gray-900">Chi tiết sản phẩm</h1>
        <div class="w-20"></div>
      </div>
    </header>

    <div class="container relative mx-auto px-4 py-4 sm:py-4 lg:py-6">
      <!-- Breadcrumb - Modern -->

      <div class="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <!-- Left Column: Product Image -->
        <div class="lg:sticky lg:top-24 lg:h-fit">
          <!-- Main Image Card -->
          <div
            class="relative overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-900/5"
          >
            <!-- Background Glow -->
            <div
              class="absolute inset-0 -z-10 translate-y-4 rounded-3xl bg-gradient-to-br from-red-400/20 to-orange-400/20 blur-2xl"
            ></div>

            <!-- 3D Stack Display -->
            <div class="relative aspect-square p-8">
              <div
                v-for="layer in displayLayers"
                :key="layer"
                class="absolute left-1/2 top-1/2 w-[70%] transition-all duration-500 ease-out"
                :style="{
                  transform: `
                    translate(-50%, -50%) 
                    translateX(${(layer - 1) * 40 - (displayLayers - 1) * 20}px) 
                    scale(${1 - (layer - 1) * 0.12})
                  `,
                  zIndex: 10 - layer,
                  opacity: 1 - (layer - 1) * 0.2,
                  filter: layer === 1 ? 'none' : `blur(${(layer - 1) * 0.8}px)`,
                }"
              >
                <img
                  v-if="product"
                  :src="product.images[0]"
                  :alt="product.name"
                  class="h-full w-full object-contain drop-shadow-2xl"
                />
              </div>

              <!-- Quantity Badge -->
              <div
                v-if="quantity > 1"
                class="absolute bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 text-white shadow-xl"
              >
                <div class="text-center">
                  <div class="text-2xl font-bold">{{ quantity }}</div>
                  <div class="text-[10px] font-medium">sản phẩm</div>
                </div>
              </div>

              <!-- Quality Badge -->
              <div
                class="absolute left-6 top-6 z-10 rounded-xl bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm"
              >
                <div class="flex items-center gap-2">
                  <Star class="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span class="text-sm font-bold text-gray-900">Chất lượng</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Trust Badges -->
          <div class="mt-6 grid grid-cols-3 gap-3">
            <div class="rounded-xl bg-white p-3 text-center shadow-md ring-1 ring-gray-900/5">
              <Shield class="mx-auto mb-2 h-6 w-6 text-red-600" />
              <p class="text-xs font-semibold text-gray-900">100% Tự Nhiên</p>
            </div>
            <div
              v-if="product.category === `custom`"
              class="rounded-xl bg-white p-3 text-center shadow-md ring-1 ring-gray-900/5"
            >
              <Package class="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <p class="text-xs font-semibold text-gray-900">Sản phẩm chưng nóng</p>
            </div>
            <div
              v-if="product.category === `unit`"
              class="rounded-xl bg-white p-3 text-center shadow-md ring-1 ring-gray-900/5"
            >
              <Package class="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <p class="text-xs font-semibold text-gray-900">Giao hàng toàn quốc</p>
            </div>
            <div class="rounded-xl bg-white p-3 text-center shadow-md ring-1 ring-gray-900/5">
              <Check class="mx-auto mb-2 h-6 w-6 text-green-600" />
              <p class="text-xs font-semibold text-gray-900">Không chất bảo quản</p>
            </div>
          </div>
        </div>

        <!-- Right Column: Product Details -->
        <div class="space-y-6">
          <!-- Product Info Card -->
          <div class="rounded-2xl bg-pattern-red p-6 shadow-xl ring-1 ring-gray-900/5 sm:p-8">
            <!-- Category Badge -->
            <div
              class="mb-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700"
            >
              <Sparkles class="h-4 w-4" />
              <span>{{
                product?.category === 'custom'
                  ? 'Tùy Chỉnh'
                  : product?.category === 'combo'
                    ? 'Combo Tiết Kiệm'
                    : 'Yến Thô'
              }}</span>
            </div>

            <!-- Product Title & Description -->
            <h1 class="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {{ product?.name }}
            </h1>
            <p class="mb-6 text-base leading-relaxed text-white">
              {{ product?.description }}
            </p>

            <!-- Price & Quantity -->
            <div
              class="flex flex-row gap-4 rounded-xl bg-pattern-red p-5 items-center justify-between"
            >
              <div>
                <p class="mb-1 text-base font-medium text-white">Giá sản phẩm</p>
                <p class="text-3xl font-extrabold text-yellow-500 sm:text-4xl">
                  {{ formattedPrice }}
                </p>
              </div>
              <div class="flex items-center gap-3 flex-row md:flex-col">
                <p class="hidden md:block text-base font-medium text-white">Số lượng:</p>
                <QuantityCounter v-model="quantity" />
              </div>
            </div>
          </div>

          <!-- Custom Product Options -->
          <div v-if="isCustomProduct && customProduct" class="space-y-4">
            <!-- Type & Weight Selection -->
            <div class="rounded-2xl bg-pattern-red p-6 shadow-xl ring-1 ring-gray-900/5">
              <div class="mb-5 flex items-center justify-between">
                <div>
                  <h3 class="text-2xl font-bold text-white">Lượng Yến</h3>
                  <p class="text-base text-yellow-400">Chọn lượng yến mong muốn</p>
                </div>
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                  <Sparkles class="h-5 w-5 text-red-600" />
                </div>
              </div>

              <div class="space-y-4">
                <ProductTypeSelector v-model="selectedType" :types="customProduct.types" />
                <div class="h-px bg-gray-200"></div>
                <WeightSelector v-model="selectedWeight" :weights="currentWeightOptions" />
              </div>
            </div>

            <!-- Volume Selection -->
            <div class="rounded-2xl bg-pattern-red p-6 shadow-xl ring-1 ring-gray-900/5">
              <VolumeSelector v-model="selectedVolume" :volumes="customProduct.volumeOptions" />
            </div>

            <!-- Package Selection -->
            <div class="rounded-2xl bg-pattern-red p-6 shadow-xl ring-1 ring-gray-900/5">
              <PackageSelector v-model="selectedPackage" :packages="customProduct.packageOptions" />
            </div>
          </div>

          <!-- Non-Custom Product Notice -->
          <div
            v-if="!isCustomProduct"
            class="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-6 shadow-lg"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-400 text-white"
              >
                <Package class="h-6 w-6" />
              </div>
              <div>
                <h3 class="mb-1 font-bold text-amber-900">Sản phẩm có sẵn</h3>
                <p class="text-sm text-amber-800">
                  {{
                    product?.category === 'combo'
                      ? 'Combo đã được cấu hình sẵn với giá ưu đãi. Chỉ cần chọn số lượng và đặt hàng!'
                      : 'Sản phẩm yến thô chất lượng cao, đã được đóng gói sẵn sàng giao hàng!'
                  }}
                </p>
              </div>
            </div>
          </div>

          <!-- Action Buttons - Desktop -->
          <div class="hidden gap-4 sm:flex">
            <PrimaryButton
              @click="addToCart"
              variant="cta"
              class="flex flex-1 items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-bold transition-all hover:scale-105"
            >
              <ShoppingCart class="h-5 w-5 inline-block mx-1" />
              Thêm vào giỏ
            </PrimaryButton>

            <PrimaryButton
              @click="goToCheckout"
              variant="primary"
              class="flex flex-1 items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-bold shadow-lg shadow-yellow-500/30 transition-all hover:scale-105 hover:shadow-red-500/50"
            >
              <Sparkles class="h-5 w-5 inline-block mx-1" />
              Mua Ngay
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Fixed Bottom Actions - Mobile -->
    <div
      class="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 p-4 shadow-2xl backdrop-blur-lg sm:hidden"
    >
      <div class="flex gap-3">
        <PrimaryButton
          @click="addToCart"
          variant="cta"
          class="flex flex-[1,5] items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-bold transition-all hover:scale-105"
        >
          <ShoppingCart class="h-5 w-5 inline-block mx-1" />
          Thêm vào giỏ
        </PrimaryButton>

        <PrimaryButton
          @click="goToCheckout"
          variant="primary"
          class="flex flex-[1] items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-bold shadow-lg shadow-yellow-500/30 transition-all hover:scale-105 hover:shadow-red-500/50"
        >
          <Sparkles class="h-5 w-5 inline-block mx-1" />
          Mua Ngay
        </PrimaryButton>
      </div>
    </div>

    <!-- Mobile Bottom Spacer -->
    <div class="h-24 sm:hidden"></div>
  </div>
</template>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
