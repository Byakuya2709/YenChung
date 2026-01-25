<!-- filepath: src/components/features/CartItemCard.vue -->

<script setup lang="ts">
import { computed } from 'vue'
import type { CartItem } from '@/types/cart'

interface Props {
  item: CartItem
}

const props = defineProps<Props>()

const emit = defineEmits<{
  remove: []
  updateQuantity: [quantity: number]
}>()

const formatOptions = computed(() => {
  return `${props.item.selectedType} | ${props.item.selectedWeight} | ${props.item.selectedVolume}`
})

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + 'đ'
}

function increaseQuantity() {
  emit('updateQuantity', props.item.quantity + 1)
}

function decreaseQuantity() {
  if (props.item.quantity > 1) {
    emit('updateQuantity', props.item.quantity - 1)
  }
}
</script>

<template>
  <div class="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md">
    <img
      :src="item.productImage"
      :alt="item.productName"
      class="h-20 w-20 rounded-lg object-cover"
    />

    <div class="min-w-0 flex-1">
      <h3 class="truncate text-base font-semibold text-gray-900">
        {{ item.productName }}
      </h3>
      <p class="mt-1 text-sm text-gray-600">
        {{ formatOptions }}
      </p>
      <p class="mt-2 text-lg font-bold text-primary">
        {{ formatPrice(item.totalPrice) }}
      </p>
    </div>

    <div class="flex flex-col items-end gap-2">
      <button @click="emit('remove')" class="text-sm font-medium text-red-500 hover:text-red-700">
        Xóa
      </button>
      <div class="flex items-center gap-2 rounded-lg bg-gray-100 px-2 py-1">
        <button @click="decreaseQuantity" class="px-2 font-semibold text-gray-700">-</button>
        <span class="min-w-[20px] text-center font-semibold text-gray-900">
          {{ item.quantity }}
        </span>
        <button @click="increaseQuantity" class="px-2 font-semibold text-gray-700">+</button>
      </div>
    </div>
  </div>
</template>
