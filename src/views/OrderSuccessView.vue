<!-- filepath: src/views/OrderSuccessView.vue -->

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

const router = useRouter()
const route = useRoute()

const orderId = route.params.orderId as string
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100 p-4">
    <div class="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
      <div class="mb-6">
        <div
          class="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100"
        >
          <svg
            class="h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h1 class="mb-2 text-2xl font-bold text-gray-900">Đặt hàng thành công!</h1>
        <p class="text-gray-600">Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất.</p>
      </div>

      <div class="mb-6 rounded-lg bg-gray-50 p-4">
        <p class="mb-1 text-sm text-gray-600">Mã đơn hàng</p>
        <p class="text-lg font-bold text-primary">
          {{ orderId }}
        </p>
      </div>

      <div class="space-y-3">
        <PrimaryButton @click="router.push('/')" class="w-full"> Tiếp tục mua sắm </PrimaryButton>
      </div>
    </div>
  </div>
</template>
