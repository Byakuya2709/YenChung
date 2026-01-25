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
import { ShoppingCart } from 'lucide-vue-next'

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
    selectedTypeText = 'Sản phẩm có sẵn'
  }

  cartStore.addItem({
    id: `${product.value.id}-${Date.now()}`,
    productId: product.value.id,
    productName: product.value.name,
    productImage: product.value.images[0],
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
  <div v-if="!product" class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="text-center">
      <div class="mb-4 text-4xl">⏳</div>
      <p class="text-gray-600">Đang tải sản phẩm...</p>
    </div>
  </div>

  <div v-else class="min-h-screen bg-gray-50 py-2">
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
                v-if="product"
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
              <h1 class="mb-2 text-2xl font-bold text-white sm:text-3xl">{{ product?.name }}</h1>
              <p class="text-sm text-white sm:text-base">{{ product?.description }}</p>
            </div>

            <!-- Quantity Counter -->
            <div
              class="mt-5 flex flex-row items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <h3 class="text-3xl font-bold text-white sm:text-4xl">{{ formattedPrice }}</h3>
              <QuantityCounter v-model="quantity" />
            </div>
          </div>

          <!-- Product Type Selection Card - Chỉ hiển thị cho custom product -->
          <div
            v-if="isCustomProduct && customProduct"
            class="rounded-2xl border border-gray-200 p-4 shadow-sm sm:p-6"
          >
            <div class="mb-4">
              <h3 class="text-lg font-bold text-white sm:text-xl">Lượng Yến</h3>
              <p class="text-xs text-accent sm:text-sm">Chọn lượng yến mong muốn</p>
            </div>

            <div class="space-y-4">
              <ProductTypeSelector v-model="selectedType" :types="customProduct.types" />

              <div class="h-px bg-gray-200"></div>

              <WeightSelector v-model="selectedWeight" :weights="currentWeightOptions" />
            </div>
          </div>

          <!-- Volume Selection - Chỉ hiển thị cho custom product -->
          <div
            v-if="isCustomProduct && customProduct"
            class="rounded-2xl border border-gray-200 p-4 shadow-sm sm:p-6"
          >
            <VolumeSelector v-model="selectedVolume" :volumes="customProduct.volumeOptions" />
          </div>

          <!-- Package Selection - Chỉ hiển thị cho custom product -->
          <div
            v-if="isCustomProduct && customProduct"
            class="rounded-2xl border border-gray-200 p-4 shadow-sm sm:p-6"
          >
            <PackageSelector v-model="selectedPackage" :packages="customProduct.packageOptions" />
          </div>

          <!-- Thông báo cho combo/unit product -->
          <div
            v-if="!isCustomProduct"
            class="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 shadow-sm sm:p-6"
          >
            <p class="text-center text-sm text-yellow-800">
              {{
                product?.category === 'combo'
                  ? '🎁 Sản phẩm combo có sẵn, chỉ cần chọn số lượng!'
                  : '📦 Sản phẩm đơn lẻ có sẵn, chỉ cần chọn số lượng!'
              }}
            </p>
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
