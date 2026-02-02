<!-- filepath: src/views/CheckoutView.vue -->

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { sendOrderNotification, type OrderInfo } from '@/services/telegram'
import { createOrder } from '@/services/order.service'
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  FileText,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Gift,
  Tag,
  CreditCard,
} from 'lucide-vue-next'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import VietnamAddressSelector from '@/components/common/VietnamAddressSelector.vue'
import type { OrderForm } from '@/types/order'
import type { CartItem } from '@/types/cart'

const router = useRouter()
const cartStore = useCartStore()

// State cho "mua ngay"
const directPurchaseItem = ref<CartItem | null>(null)
const isDirectPurchase = computed(() => directPurchaseItem.value !== null)

// State cho submit
const isSubmitting = ref(false)
const orderError = ref('')

// Items hiển thị: nếu là "mua ngay" thì dùng item đó, không thì dùng giỏ hàng
const displayItems = computed(() => {
  return isDirectPurchase.value ? [directPurchaseItem.value!] : cartStore.items
})

// Kiểm tra xem TẤT CẢ sản phẩm có phải là category = 'unit' không
const isOnlyUnitProducts = computed(() => {
  if (displayItems.value.length === 0) return false

  // Fallback: Nếu productCategory không có, dùng productId để detect
  return displayItems.value.every((item) => {
    if (item.productCategory) {
      return item.productCategory === 'unit'
    }
    // Fallback: check theo productId pattern
    return item.productId?.startsWith('unit-')
  })
})

// Kiểm tra xem có sản phẩm mixed (vừa unit vừa custom/combo) không
const hasMixedProducts = computed(() => {
  const hasUnit = displayItems.value.some((item) => {
    if (item.productCategory) return item.productCategory === 'unit'
    return item.productId?.startsWith('unit-')
  })
  const hasOther = displayItems.value.some((item) => {
    if (item.productCategory) {
      return item.productCategory === 'custom' || item.productCategory === 'combo'
    }
    return item.productId?.startsWith('custom-') || item.productId?.startsWith('combo-')
  })
  return hasUnit && hasOther
})

// Kiểm tra xem có sản phẩm local (custom/combo) không
const hasLocalProduct = computed(() => {
  return displayItems.value.some((item) => {
    if (item.productCategory) {
      return item.productCategory === 'custom' || item.productCategory === 'combo'
    }
    return item.productId?.startsWith('custom-') || item.productId?.startsWith('combo-')
  })
})

// Tổng giá
const totalPrice = computed(() => {
  return displayItems.value.reduce((sum, item) => sum + item.totalPrice, 0)
})

// Tính phí vận chuyển và giảm giá
const shippingFee = computed(() => {
  return totalPrice.value > 500000 ? 0 : 0
})

const discount = computed(() => {
  return totalPrice.value > 1000000 ? 0 : 0
})

const finalTotal = computed(() => {
  return totalPrice.value + shippingFee.value - discount.value
})

// Kiểm tra xem có direct purchase không khi mount
onMounted(() => {
  const directPurchaseData = sessionStorage.getItem('direct_purchase')
  if (directPurchaseData) {
    directPurchaseItem.value = JSON.parse(directPurchaseData)
    // Xóa khỏi sessionStorage sau khi đọc
    sessionStorage.removeItem('direct_purchase')
  }
})

const formData = ref<OrderForm>({
  customerName: '',
  phoneNumber: '',
  address: '',
  note: '',
})

// Address selector cho sản phẩm Unit
const addressParts = ref({
  province: '',
  district: '',
  ward: '',
})

const streetAddress = ref('') // Số nhà, tên đường

// Location cho sản phẩm local (chén/tô)
const location = ref('')

// Form validation states
const formErrors = ref({
  customerName: '',
  phoneNumber: '',
  addressParts: '',
  streetAddress: '',
  location: '',
})

function validateForm(): boolean {
  formErrors.value = {
    customerName: '',
    phoneNumber: '',
    addressParts: '',
    streetAddress: '',
    location: '',
  }

  let isValid = true

  // Họ tên - BẮT BUỘC
  if (!formData.value.customerName.trim()) {
    formErrors.value.customerName = 'Vui lòng nhập họ tên'
    isValid = false
  }

  // Số điện thoại - BẮT BUỘC
  if (!formData.value.phoneNumber.trim()) {
    formErrors.value.phoneNumber = 'Vui lòng nhập số điện thoại'
    isValid = false
  } else if (!/^[0-9]{10,11}$/.test(formData.value.phoneNumber)) {
    formErrors.value.phoneNumber = 'Số điện thoại không hợp lệ (10-11 số)'
    isValid = false
  }

  // Địa chỉ - BẮT BUỘC cho đơn hàng TOÀN BỘ là unit products
  if (isOnlyUnitProducts.value) {
    if (!addressParts.value.province || !addressParts.value.district || !addressParts.value.ward) {
      formErrors.value.addressParts = 'Vui lòng chọn đầy đủ Tỉnh/Huyện/Xã'
      isValid = false
    }
    if (!streetAddress.value.trim()) {
      formErrors.value.streetAddress = 'Vui lòng nhập số nhà, tên đường'
      isValid = false
    }
  }

  return isValid
}

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + 'đ'
}

async function handleSubmit() {
  // Validate form
  if (!validateForm()) {
    return
  }

  // Kiểm tra có sản phẩm không
  if (displayItems.value.length === 0) {
    router.push('/')
    return
  }

  // Xử lý address
  const finalFormData = { ...formData.value }

  if (isOnlyUnitProducts.value) {
    // Đơn hàng TOÀN BỘ Unit: Ghép địa chỉ đầy đủ
    const addressArray = [
      streetAddress.value.trim(),
      addressParts.value.ward,
      addressParts.value.district,
      addressParts.value.province,
    ].filter(Boolean)
    finalFormData.address = addressArray.join(', ')
  } else if (hasLocalProduct.value) {
    // Đơn hàng Local hoặc Mixed: Dùng địa chỉ mặc định + location
    const defaultAddress = 'Tam Bình, Vĩnh Long'
    finalFormData.address = location.value.trim()
      ? `${location.value}, ${defaultAddress}`
      : defaultAddress
  }

  isSubmitting.value = true
  orderError.value = ''

  try {
    // Tạo đơn hàng trong Supabase
    const order = await createOrder({
      customerName: formData.value.customerName,
      customerPhone: formData.value.phoneNumber,
      customerEmail: '',
      shippingAddress: finalFormData.address,
      location: location.value || undefined,
      customerNote: formData.value.note || undefined,
      items: displayItems.value,
      subtotal: totalPrice.value,
      shippingFee: shippingFee.value,
      discount: discount.value,
      total: finalTotal.value,
    })

    // Gửi thông báo Telegram với thông tin đầy đủ
    const telegramOrder: OrderInfo = {
      orderId: order.id,
      customerName: formData.value.customerName,
      customerPhone: formData.value.phoneNumber,
      customerAddress: finalFormData.address,
      customerNote: formData.value.note || undefined,
      items: displayItems.value.map((item) => ({
        productName: item.productName,
        quantity: item.quantity,
        selectedType: item.selectedType,
        selectedWeight: item.selectedWeight,
        selectedVolume: item.selectedVolume,
        totalPrice: item.totalPrice,
      })),
      subtotal: totalPrice.value,
      shippingFee: shippingFee.value,
      discount: discount.value,
      totalAmount: finalTotal.value,
      createdAt: new Date(),
    }

    // Gửi thông báo (không chờ, không block UI)
    sendOrderNotification(telegramOrder).catch((err) => {
      console.error('Lỗi gửi Telegram:', err)
    })

    // Chỉ xóa giỏ hàng nếu checkout từ giỏ
    if (!isDirectPurchase.value) {
      cartStore.clearCart()
    }

    // Reset direct purchase
    directPurchaseItem.value = null

    // Chuyển đến trang thành công
    router.push({
      name: 'order-success',
      params: { orderId: order.id },
    })
  } catch (error) {
    console.error('Error creating order:', error)
    orderError.value = 'Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại sau.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50">
    <!-- Header -->
    <header class="sticky top-0 z-40 border-b border-gray-200/50 bg-white/80 backdrop-blur-xl">
      <div class="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        <button
          @click="router.back()"
          class="flex items-center gap-2 rounded-xl px-3 py-2 text-gray-700 transition-all hover:bg-gray-100 active:scale-95"
        >
          <ArrowLeft class="h-5 w-5" />
          <span class="font-medium">Quay lại</span>
        </button>
        <h1 class="text-lg font-bold text-gray-900">
          {{ isDirectPurchase ? 'Xác nhận đơn hàng' : 'Thanh toán' }}
        </h1>
        <div class="w-20"></div>
      </div>
    </header>

    <main class="container mx-auto px-4 pb-48 pt-6 sm:px-6">
      <form @submit.prevent="handleSubmit" class="mx-auto max-w-2xl space-y-4 sm:space-y-5">
        <!-- Thông tin khách hàng -->
        <div
          class="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <div
            class="border-b border-gray-100 bg-gradient-to-r from-primary/5 to-blue-500/5 px-5 py-4 sm:px-6"
          >
            <div class="flex items-center gap-3">
              <div class="rounded-xl bg-primary/10 p-2">
                <User class="h-5 w-5 text-primary" />
              </div>
              <h2 class="text-lg font-bold text-gray-900 sm:text-xl">Thông tin giao hàng</h2>
            </div>
          </div>

          <div class="space-y-5 p-5 sm:p-6">
            <!-- Họ và tên -->
            <div>
              <label class="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User class="h-4 w-4" />
                Họ và tên
                <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.customerName"
                type="text"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                :class="
                  formErrors.customerName
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                    : ''
                "
                placeholder="Nhập họ và tên của bạn"
              />
              <p
                v-if="formErrors.customerName"
                class="mt-1.5 flex items-center gap-1 text-xs text-red-600"
              >
                <AlertCircle class="h-3.5 w-3.5" />
                {{ formErrors.customerName }}
              </p>
            </div>

            <!-- Số điện thoại -->
            <div>
              <label class="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Phone class="h-4 w-4" />
                Số điện thoại
                <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.phoneNumber"
                type="tel"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                :class="
                  formErrors.phoneNumber
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                    : ''
                "
                placeholder="Nhập số điện thoại (10-11 số)"
              />
              <p
                v-if="formErrors.phoneNumber"
                class="mt-1.5 flex items-center gap-1 text-xs text-red-600"
              >
                <AlertCircle class="h-3.5 w-3.5" />
                {{ formErrors.phoneNumber }}
              </p>
            </div>

            <!-- Địa chỉ - CHỈ hiển thị cho đơn hàng TOÀN BỘ unit products -->
            <div v-if="isOnlyUnitProducts">
              <label class="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MapPin class="h-4 w-4" />
                Địa chỉ giao hàng
                <span class="text-red-500">*</span>
              </label>

              <!-- Selector Tỉnh/Huyện/Xã -->
              <VietnamAddressSelector v-model="addressParts" :error="formErrors.addressParts" />

              <!-- Error message cho address selector -->
              <p
                v-if="formErrors.addressParts"
                class="mt-2 flex items-center gap-1 text-xs text-red-600"
              >
                <AlertCircle class="h-3.5 w-3.5" />
                {{ formErrors.addressParts }}
              </p>

              <!-- Số nhà, tên đường -->
              <div class="mt-4">
                <label class="mb-2 block text-sm font-semibold text-gray-700">
                  Số nhà, tên đường
                  <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="streetAddress"
                  type="text"
                  class="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  :class="
                    formErrors.streetAddress
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                      : ''
                  "
                  placeholder="Ví dụ: 123 Đường Lê Lợi"
                />
                <p
                  v-if="formErrors.streetAddress"
                  class="mt-1.5 flex items-center gap-1 text-xs text-red-600"
                >
                  <AlertCircle class="h-3.5 w-3.5" />
                  {{ formErrors.streetAddress }}
                </p>
              </div>
            </div>

            <!-- Location - CHỈ hiển thị cho đơn hàng TOÀN LOCAL (không có unit) -->
            <div v-if="hasLocalProduct && !isOnlyUnitProducts && !hasMixedProducts">
              <label class="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MapPin class="h-4 w-4" />
                Vị trí cụ thể (tùy chọn)
              </label>
              <input
                v-model="location"
                type="text"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Ví dụ: Chợ Tam Bình, Trường THPT..."
              />
              <p class="mt-1.5 flex items-center gap-1 text-xs text-gray-500">
                <MapPin class="h-3.5 w-3.5" />
                Địa chỉ mặc định: Tam Bình, Vĩnh Long
              </p>
            </div>

            <!-- Note cho đơn hàng MIXED -->
            <div v-if="hasMixedProducts" class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
              <div class="flex gap-3">
                <AlertCircle class="h-5 w-5 flex-shrink-0 text-blue-600" />
                <div>
                  <h4 class="font-semibold text-blue-900">Lưu ý về đơn hàng</h4>
                  <p class="mt-1 text-sm text-blue-800">
                    Đơn hàng của bạn có cả sản phẩm đóng chai và sản phẩm chưng tươi. Sản phẩm chưng
                    tươi chỉ giao trong khu vực Tam Bình, Vĩnh Long. Chúng tôi sẽ liên hệ xác nhận
                    chi tiết giao hàng.
                  </p>
                </div>
              </div>
            </div>

            <!-- Note về hạn sử dụng ngắn - CHỈ hiển thị cho local/mixed -->
            <div
              v-if="hasLocalProduct"
              class="rounded-xl border-2 border-amber-200 bg-amber-50 p-4"
            >
              <div class="flex gap-3">
                <AlertCircle class="h-5 w-5 flex-shrink-0 text-amber-600" />
                <div>
                  <h4 class="font-semibold text-amber-900">Lưu ý quan trọng</h4>
                  <p class="mt-1 text-sm text-amber-800">
                    Sản phẩm chưng nóng, không chất bảo quản nên có hạn sử dụng ngắn. Do đó, chúng
                    tôi chỉ giao hàng trong khu vực Tam Bình, Vĩnh Long để đảm bảo chất lượng sản
                    phẩm tốt nhất.
                  </p>
                </div>
              </div>
            </div>

            <!-- Ghi chú -->
            <div>
              <label class="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText class="h-4 w-4" />
                Ghi chú đơn hàng (tùy chọn)
              </label>
              <textarea
                v-model="formData.note"
                rows="2"
                class="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Ví dụ: Ít đường, không bỏ táo..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Đơn hàng -->
        <div
          class="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <div
            class="border-b border-gray-100 bg-gradient-to-r from-primary/5 to-blue-500/5 px-5 py-4 sm:px-6"
          >
            <div class="flex items-center gap-3">
              <div class="rounded-xl bg-primary/10 p-2">
                <ShoppingBag class="h-5 w-5 text-primary" />
              </div>
              <h2 class="text-lg font-bold text-gray-900 sm:text-xl">
                {{ isDirectPurchase ? 'Sản phẩm mua ngay' : 'Chi tiết đơn hàng' }}
              </h2>
            </div>
          </div>

          <div class="p-5 sm:p-6">
            <!-- Items list -->
            <div class="space-y-4">
              <div
                v-for="item in displayItems"
                :key="item.id"
                class="flex gap-3 rounded-xl bg-gradient-to-br from-gray-50 to-blue-50/30 p-4"
              >
                <!-- Image -->
                <div
                  class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-white sm:h-20 sm:w-20"
                >
                  <img
                    :src="item.productImage"
                    :alt="item.productName"
                    class="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <!-- Info -->
                <div class="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 class="font-bold text-gray-900 sm:text-lg">
                      {{ item.productName }}
                    </h3>
                    <p class="mt-1 text-xs text-gray-600 sm:text-sm">
                      {{ item.selectedType }} • {{ item.selectedWeight }} •
                      {{ item.selectedVolume }}
                    </p>
                  </div>
                  <div class="mt-2 flex items-center justify-between">
                    <span class="text-sm text-gray-600">Số lượng: {{ item.quantity }}</span>
                    <span class="text-base font-bold text-primary sm:text-lg">
                      {{ formatPrice(item.totalPrice) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tính toán giá -->
            <div class="mt-5 space-y-3 border-t border-gray-200 pt-5">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Tạm tính</span>
                <span class="font-semibold text-gray-900">{{ formatPrice(totalPrice) }}</span>
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
                  Giảm giá (5%)
                </span>
                <span class="font-semibold text-green-600">-{{ formatPrice(discount) }}</span>
              </div>
            </div>

            <!-- Total -->
            <div class="mt-5 rounded-xl bg-gradient-to-r from-primary/10 to-blue-500/10 p-4">
              <div class="flex items-center justify-between">
                <span class="text-base font-bold text-gray-900 sm:text-lg">Tổng thanh toán</span>
                <span class="text-2xl font-bold text-primary sm:text-3xl">
                  {{ formatPrice(finalTotal) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment method info -->
        <div class="rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5 p-4">
          <div class="flex gap-3">
            <CreditCard class="h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <h3 class="font-semibold text-gray-900">Thanh toán khi nhận hàng (COD)</h3>
              <p class="mt-1 text-sm text-gray-600">
                Quý khách vui lòng chuẩn bị đủ tiền mặt khi nhận hàng
              </p>
            </div>
          </div>
        </div>

        <!-- Error message -->
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="orderError"
            class="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
          >
            <AlertCircle class="h-5 w-5 flex-shrink-0 text-red-600" />
            <div class="flex-1">
              <h4 class="font-semibold text-red-900">Có lỗi xảy ra</h4>
              <p class="mt-1 text-sm text-red-700">{{ orderError }}</p>
            </div>
          </div>
        </transition>
      </form>
    </main>

    <!-- Bottom checkout button -->
    <div
      class="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200/50 bg-white/95 backdrop-blur-xl p-4 sm:p-5"
    >
      <div class="container mx-auto max-w-2xl">
        <PrimaryButton
          type="button"
          :disabled="isSubmitting || displayItems.length === 0"
          @click="handleSubmit"
          class="group relative h-14 w-full overflow-hidden text-base font-bold sm:h-16 sm:text-lg"
        >
          <span v-if="!isSubmitting" class="flex items-center justify-center gap-2">
            <CheckCircle2 class="h-5 w-5 transition-transform group-hover:scale-110" />
            Xác nhận đặt hàng
            <span class="ml-1 rounded-full bg-white/20 px-2.5 py-1 text-sm">
              {{ formatPrice(finalTotal) }}
            </span>
          </span>
          <span v-else class="flex items-center justify-center gap-2">
            <Loader2 class="h-5 w-5 animate-spin" />
            Đang xử lý...
          </span>
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>
