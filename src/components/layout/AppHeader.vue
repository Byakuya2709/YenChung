<!-- filepath: src/components/layout/AppHeader.vue -->

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { Menu, X, ShoppingCart } from 'lucide-vue-next'

const router = useRouter()
const cartStore = useCartStore()
const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'Trang Chủ', href: '/' },
  { name: 'Sản Phẩm', href: '/#products' },
  { name: 'Giới Thiệu', href: '/#about' },
  { name: 'Liên Hệ', href: '/#contact' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
    <nav class="container mx-auto">
      <div class="flex h-16 items-center justify-between px-4 lg:h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <span class="text-xl font-bold text-white">Y</span>
          </div>
          <div class="hidden sm:block">
            <h1 class="text-lg font-bold text-primary lg:text-xl">Yến Sào Cao Cấp</h1>
            <p class="text-xs text-gray-600">Thiên nhiên 100%</p>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden items-center gap-8 md:flex">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            class="text-sm font-medium text-gray-700 transition-colors hover:text-primary lg:text-base"
          >
            {{ item.name }}
          </a>
        </div>

        <!-- Cart & Mobile Menu -->
        <div class="flex items-center gap-4">
          <!-- Cart Button -->
          <router-link
            to="/cart"
            class="relative rounded-full p-2 transition-colors hover:bg-gray-100"
          >
            <ShoppingCart class="h-6 w-6 text-gray-700" />
            <span
              v-if="cartStore.totalItems > 0"
              class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white"
            >
              {{ cartStore.totalItems }}
            </span>
          </router-link>

          <!-- Mobile Menu Toggle -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="rounded p-2 transition-colors hover:bg-gray-100 md:hidden"
          >
            <Menu v-if="!mobileMenuOpen" class="h-6 w-6 text-gray-700" />
            <X v-else class="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="border-t border-gray-200 bg-white px-4 py-4 md:hidden">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          @click="mobileMenuOpen = false"
          class="block py-3 text-base font-medium text-gray-700 transition-colors hover:text-primary"
        >
          {{ item.name }}
        </a>
      </div>
    </nav>
  </header>
</template>
