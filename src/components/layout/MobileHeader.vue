<!-- filepath: src/components/layout/MobileHeader.vue -->

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

interface Props {
  title: string
  showBackButton?: boolean
  showCart?: boolean
}

withDefaults(defineProps<Props>(), {
  showBackButton: false,
  showCart: true,
})

const router = useRouter()
const cartStore = useCartStore()

const cartItemCount = computed(() => cartStore.totalItems)

function goBack() {
  router.back()
}
</script>

<template>
  <header class="fixed left-0 right-0 top-0 z-50 bg-white shadow-md">
    <div class="container mx-auto flex items-center justify-between px-4 py-3">
      <button @click="goBack" v-if="showBackButton" class="text-gray-700 hover:text-gray-900">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <h1 class="flex-1 text-center text-lg font-bold text-gray-900">
        {{ title }}
      </h1>

      <router-link v-if="showCart" to="/cart" class="relative text-gray-700 hover:text-gray-900">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span
          v-if="cartItemCount > 0"
          class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
        >
          {{ cartItemCount }}
        </span>
      </router-link>
    </div>
  </header>
</template>
