<!-- filepath: src/components/features/CartItemCard.vue -->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Minus, Plus, Trash2, Package } from 'lucide-vue-next'
import type { CartItem } from '@/types/cart'

interface Props {
  item: CartItem
}

const props = defineProps<Props>()

const emit = defineEmits<{
  remove: []
  updateQuantity: [quantity: number]
}>()

const isRemoving = ref(false)

const formatOptions = computed(() => {
  const options = [
    props.item.selectedType,
    props.item.selectedWeight,
    props.item.selectedVolume,
  ].filter(Boolean)
  return options.join(' • ')
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

function handleRemove() {
  isRemoving.value = true
  setTimeout(() => {
    emit('remove')
  }, 200)
}
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
    :class="isRemoving ? 'scale-95 opacity-0' : 'scale-100 opacity-100'"
  >
    <!-- Main Content -->
    <div class="flex gap-3 p-3 sm:gap-4 sm:p-4">
      <!-- Product Image -->
      <div class="relative flex-shrink-0">
        <div
          class="relative h-20 w-20 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 sm:h-24 sm:w-24"
        >
          <img
            :src="item.productImage"
            :alt="item.productName"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <!-- Quantity Badge on Image -->
        <div
          class="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-lg"
        >
          {{ item.quantity }}
        </div>
      </div>

      <!-- Product Info -->
      <div class="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h3 class="text-base font-bold text-gray-900 sm:text-lg">
            {{ item.productName }}
          </h3>
          <div class="mt-1 flex items-center gap-1 text-xs text-gray-500 sm:text-sm">
            <Package class="h-3.5 w-3.5 flex-shrink-0" />
            <p class="truncate">
              {{ formatOptions }}
            </p>
          </div>
        </div>

        <!-- Price & Actions Row -->
        <div class="mt-2 flex items-end justify-between gap-2">
          <!-- Price -->
          <div>
            <p class="text-xs text-gray-500">Thành tiền</p>
            <p class="text-lg font-bold text-primary sm:text-xl">
              {{ formatPrice(item.totalPrice) }}
            </p>
          </div>

          <!-- Quantity Controls -->
          <div class="flex items-center gap-2">
            <!-- Decrease Button -->
            <button
              @click="decreaseQuantity"
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 transition-all hover:bg-gray-200 active:scale-95 disabled:opacity-50"
              :disabled="item.quantity <= 1"
              aria-label="Giảm số lượng"
            >
              <Minus class="h-4 w-4 text-gray-700" />
            </button>

            <!-- Quantity Display -->
            <div
              class="flex h-9 min-w-[44px] items-center justify-center rounded-xl bg-primary/10 px-3 font-bold text-primary"
            >
              {{ item.quantity }}
            </div>

            <!-- Increase Button -->
            <button
              @click="increaseQuantity"
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary transition-all hover:bg-primary/90 active:scale-95"
              aria-label="Tăng số lượng"
            >
              <Plus class="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Remove Button -->
    <button
      @click="handleRemove"
      class="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500 opacity-0 transition-all hover:bg-red-500 hover:text-white active:scale-95 group-hover:opacity-100 sm:right-3 sm:top-3"
      aria-label="Xóa sản phẩm"
    >
      <Trash2 class="h-4 w-4" />
    </button>

    <!-- Hover Border Effect -->
    <div
      class="pointer-events-none absolute inset-0 rounded-2xl border-2 border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-20"
    ></div>
  </div>
</template>
