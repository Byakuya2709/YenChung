<!-- filepath: src/views/CheckoutView.vue -->

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useOrder } from '@/composables/useOrder'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import type { OrderForm } from '@/types/order'

const router = useRouter()
const cartStore = useCartStore()
const { isSubmitting, orderError, createOrder } = useOrder()

const formData = ref<OrderForm>({
  customerName: '',
  phoneNumber: '',
  address: '',
  note: '',
})

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + 'đ'
}

async function handleSubmit() {
  if (cartStore.items.length === 0) {
    router.push('/')
    return
  }

  const order = await createOrder(formData.value, cartStore.items)

  if (order) {
    // Xóa giỏ hàng
    cartStore.clearCart()

    // Chuyển đến trang thành công
    router.push({
      name: 'order-success',
      params: { orderId: order.id },
    })
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <MobileHeader title="Thanh Toán" show-back-button :show-cart="false" />

    <main class="container mx-auto px-4 pb-32 pt-20">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Thông tin khách hàng -->
        <div class="rounded-2xl bg-white p-6 shadow-md">
          <h2 class="mb-4 text-xl font-bold text-gray-900">Thông tin đơn hàng</h2>

          <div class="space-y-4">
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">
                Họ và tên <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.customerName"
                type="text"
                required
                class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary"
                placeholder="Nhập họ và tên"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">
                Số điện thoại <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.phoneNumber"
                type="tel"
                required
                pattern="[0-9]{10,11}"
                class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary"
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">
                Địa chỉ <span class="text-red-500"></span>
              </label>
              <textarea
                v-model="formData.address"
                rows="3"
                class="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary"
                placeholder="Chỉ nhận khu vực nội ô Tam Bình, Vĩnh Long"
              ></textarea>
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">
                Ghi chú (tùy chọn)
              </label>
              <textarea
                v-model="formData.note"
                rows="2"
                class="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary"
                placeholder="Thêm ghi chú cho đơn hàng"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Đơn hàng -->
        <div class="rounded-2xl bg-white p-6 shadow-md">
          <h2 class="mb-4 text-xl font-bold text-gray-900">Đơn hàng của bạn</h2>

          <div class="space-y-3">
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="flex items-start justify-between text-sm"
            >
              <div class="flex-1">
                <p class="font-medium text-gray-900">{{ item.productName }} x{{ item.quantity }}</p>
                <p class="mt-0.5 text-xs text-gray-600">
                  {{ item.selectedType }} | {{ item.selectedWeight }} |
                  {{ item.selectedVolume }}
                </p>
              </div>
              <p class="ml-4 font-semibold text-gray-900">
                {{ formatPrice(item.totalPrice) }}
              </p>
            </div>
          </div>

          <div class="mt-4 border-t border-gray-200 pt-4">
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-gray-900">Tổng cộng:</span>
              <span class="text-2xl font-bold text-primary">
                {{ formatPrice(cartStore.totalPrice) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Lỗi -->
        <div v-if="orderError" class="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {{ orderError }}
        </div>
      </form>
    </main>

    <!-- Bottom Bar -->
    <div
      class="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <div class="container mx-auto max-w-md">
        <PrimaryButton
          type="submit"
          :loading="isSubmitting"
          :disabled="isSubmitting"
          @click="handleSubmit"
          class="w-full"
        >
          {{ isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt hàng' }}
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>
