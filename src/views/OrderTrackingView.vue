<!-- filepath: src/views/OrderTrackingView.vue -->

<script setup lang="ts">
import { ref } from 'vue'
import { Search, Package, Phone, MapPin, Calendar, DollarSign, Box } from 'lucide-vue-next'
import { getOrdersByPhone, getOrderById } from '@/services/order.service'
import type { OrderWithItems } from '@/services/order.service'

const searchType = ref<'phone' | 'orderId'>('phone')
const searchPhone = ref('')
const searchOrderId = ref('')
const orders = ref<OrderWithItems[]>([])
const isSearching = ref(false)
const hasSearched = ref(false)
const errorMessage = ref('')

const searchOrders = async () => {
  if (searchType.value === 'phone' && !searchPhone.value.trim()) {
    errorMessage.value = 'Vui lòng nhập số điện thoại'
    return
  }

  if (searchType.value === 'orderId' && !searchOrderId.value.trim()) {
    errorMessage.value = 'Vui lòng nhập mã đơn hàng'
    return
  }

  isSearching.value = true
  hasSearched.value = false
  errorMessage.value = ''
  orders.value = []

  try {
    if (searchType.value === 'phone') {
      const result = await getOrdersByPhone(searchPhone.value.trim())
      orders.value = result
    } else {
      const result = await getOrderById(searchOrderId.value.trim())
      orders.value = result ? [result] : []
    }
    hasSearched.value = true
  } catch (error) {
    console.error('Error searching orders:', error)
    errorMessage.value = 'Đã xảy ra lỗi khi tra cứu. Vui lòng thử lại sau.'
    orders.value = []
  } finally {
    isSearching.value = false
  }
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    shipping: 'Đang giao hàng',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy',
  }
  return statusMap[status] || status
}

const getStatusColor = (status: string) => {
  const colorMap: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    shipping: 'bg-purple-100 text-purple-800 border-purple-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  }
  return colorMap[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatPrice = (price: number) => {
  return price.toLocaleString('vi-VN') + 'đ'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-white">
    <!-- Background Pattern -->
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:64px_64px] opacity-20"
    ></div>

    <div class="container relative mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <!-- Header -->
      <div class="mb-8 text-center">
        <div
          class="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
        >
          <Search class="h-4 w-4" />
          <span>Tra cứu đơn hàng</span>
        </div>
        <h1 class="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Kiểm Tra
          <span class="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            Đơn Hàng
          </span>
        </h1>
        <p class="mx-auto max-w-2xl text-base text-gray-600">
          Nhập số điện thoại hoặc mã đơn hàng để tra cứu tình trạng đơn hàng của bạn
        </p>
      </div>

      <!-- Search Form -->
      <div class="mb-8 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-900/5 sm:p-8">
        <!-- Search Type Tabs -->
        <div class="mb-6 flex gap-2 rounded-xl bg-gray-100 p-1">
          <button
            @click="searchType = 'phone'"
            :class="[
              'flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all',
              searchType === 'phone'
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-600 hover:text-gray-900',
            ]"
          >
            <Phone class="mr-2 inline-block h-4 w-4" />
            Theo số điện thoại
          </button>
          <button
            @click="searchType = 'orderId'"
            :class="[
              'flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all',
              searchType === 'orderId'
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-600 hover:text-gray-900',
            ]"
          >
            <Box class="mr-2 inline-block h-4 w-4" />
            Theo mã đơn hàng
          </button>
        </div>

        <!-- Search Input -->
        <div class="mb-4">
          <label class="mb-2 block text-sm font-semibold text-gray-900">
            {{ searchType === 'phone' ? 'Số điện thoại' : 'Mã đơn hàng' }}
          </label>
          <div class="relative">
            <component
              :is="searchType === 'phone' ? Phone : Box"
              class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            />
            <input
              v-if="searchType === 'phone'"
              v-model="searchPhone"
              type="tel"
              placeholder="Nhập số điện thoại (VD: 0912345678)"
              @keyup.enter="searchOrders"
              class="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
            <input
              v-else
              v-model="searchOrderId"
              type="text"
              placeholder="Nhập mã đơn hàng (VD: ORD-1234567890)"
              @keyup.enter="searchOrders"
              class="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mb-4 rounded-xl border-2 border-red-200 bg-red-50 p-4">
          <p class="text-sm text-red-700">{{ errorMessage }}</p>
        </div>

        <!-- Search Button -->
        <button
          @click="searchOrders"
          :disabled="isSearching"
          class="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-red-500/30 transition-all hover:scale-105 hover:shadow-red-500/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          <Search class="h-5 w-5" :class="{ 'animate-spin': isSearching }" />
          <span v-if="!isSearching">Tra cứu ngay</span>
          <span v-else>Đang tìm kiếm...</span>
        </button>
      </div>

      <!-- Results -->
      <div v-if="orders.length > 0" class="space-y-4">
        <div
          v-for="order in orders"
          :key="order.id"
          class="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-900/5 sm:p-8"
        >
          <!-- Order Header -->
          <div class="mb-6 flex flex-wrap items-center justify-between gap-4 border-b pb-4">
            <div>
              <p class="text-sm text-gray-500">Mã đơn hàng</p>
              <p class="font-mono text-lg font-bold text-gray-900">{{ order.id }}</p>
            </div>
            <span
              :class="[
                'rounded-full border-2 px-4 py-1.5 text-sm font-bold',
                getStatusColor(order.status),
              ]"
            >
              {{ getStatusText(order.status) }}
            </span>
          </div>

          <!-- Order Info -->
          <div class="mb-6 grid gap-4 sm:grid-cols-2">
            <div class="flex items-start gap-3">
              <Calendar class="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              <div>
                <p class="text-sm font-medium text-gray-500">Ngày đặt hàng</p>
                <p class="font-semibold text-gray-900">{{ formatDate(order.created_at) }}</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <Phone class="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              <div>
                <p class="text-sm font-medium text-gray-500">Số điện thoại</p>
                <p class="font-semibold text-gray-900">{{ order.customer_phone }}</p>
              </div>
            </div>

            <div v-if="order.shipping_address" class="flex items-start gap-3 sm:col-span-2">
              <MapPin class="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              <div>
                <p class="text-sm font-medium text-gray-500">Địa chỉ giao hàng</p>
                <p class="text-gray-900">{{ order.shipping_address }}</p>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="mb-6 space-y-3 rounded-xl bg-gray-50 p-4">
            <p class="font-bold text-gray-900">Sản phẩm đã đặt:</p>
            <div
              v-for="item in order.order_items"
              :key="item.id"
              class="flex items-center justify-between gap-4 rounded-lg bg-white p-4"
            >
              <div class="flex-1">
                <p class="font-semibold text-gray-900">{{ item.product_name }}</p>
                <p class="text-sm text-gray-600">Số lượng: {{ item.quantity }}</p>
              </div>
              <p class="text-right font-bold text-red-600">{{ formatPrice(item.total_price) }}</p>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="space-y-2 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-5">
            <div class="flex justify-between text-sm text-gray-600">
              <span>Tạm tính:</span>
              <span>{{ formatPrice(order.subtotal) }}</span>
            </div>
            <div v-if="order.shipping_fee > 0" class="flex justify-between text-sm text-gray-600">
              <span>Phí vận chuyển:</span>
              <span>{{ formatPrice(order.shipping_fee) }}</span>
            </div>
            <div v-if="order.discount > 0" class="flex justify-between text-sm text-green-600">
              <span>Giảm giá:</span>
              <span>-{{ formatPrice(order.discount) }}</span>
            </div>
            <div class="flex justify-between border-t pt-2">
              <span class="text-lg font-bold text-gray-900">Tổng cộng:</span>
              <span class="text-2xl font-extrabold text-red-600">{{
                formatPrice(order.total)
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="hasSearched"
        class="rounded-2xl bg-white p-12 text-center shadow-xl ring-1 ring-gray-900/5"
      >
        <Package class="mx-auto mb-4 h-16 w-16 text-gray-300" />
        <p class="mb-2 text-lg font-bold text-gray-600">Không tìm thấy đơn hàng</p>
        <p class="text-sm text-gray-500">
          {{
            searchType === 'phone'
              ? 'Vui lòng kiểm tra lại số điện thoại'
              : 'Vui lòng kiểm tra lại mã đơn hàng'
          }}
        </p>
      </div>
    </div>
  </div>
</template>
