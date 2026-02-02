<!-- filepath: src/components/layout/AppHeader.vue -->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { Menu, X, ShoppingCart } from 'lucide-vue-next'

const router = useRouter()
const cartStore = useCartStore()
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)

const navigation = [
  { name: 'Sản Phẩm', href: '/#products' },
  { name: 'Tra Cứu Đơn Hàng', href: '/orders/track' },
  // { name: 'Giới Thiệu', href: '/#about' },
  { name: 'Liên Hệ', href: '/contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- Header Container với Glass Morphism -->
  <header
    class="fixed left-0 right-0 z-50 transition-all duration-500 ease-out"
    :class="[isScrolled ? 'top-2 sm:top-3 px-3 sm:px-4 lg:px-6' : 'top-0 px-0']"
  >
    <div
      class="mx-auto max-w-7xl transition-all duration-500 ease-out"
      :class="[
        isScrolled
          ? 'bg-white backdrop-blur-xl shadow-2xl shadow-primary/10 rounded-2xl border border-gray-400/40 py-1'
          : 'bg-white shadow-sm',
      ]"
    >
      <nav class="relative">
        <!-- Main Navigation Bar -->
        <div
          class="flex items-center justify-between transition-all duration-300"
          :class="[
            isScrolled ? 'h-14 px-4 sm:px-6 lg:px-8' : 'h-16 px-4 sm:h-18 sm:px-6 lg:h-20 lg:px-8',
          ]"
        >
          <!-- Logo - Optimized cho Mobile -->
          <router-link
            to="/"
            class="flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
          >
            <!-- Logo Icon với gradient -->
            <div
              class="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary to-blue-600 shadow-lg shadow-primary/25 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/40"
              :class="isScrolled ? 'h-9 w-9 sm:h-10 sm:w-10' : 'h-11 w-11 sm:h-12 sm:w-12'"
            >
              <span
                class="font-bold text-white transition-all duration-300"
                :class="isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'"
              >
                Y
              </span>
              <!-- Shine Effect -->
              <div
                class="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </div>

            <!-- Brand Text -->
            <div class="flex flex-col leading-tight">
              <h1
                class="font-bold text-gray-900 transition-all duration-300 tracking-tight"
                :class="isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'"
              >
                Lưu Gia Yến
              </h1>
              <p
                class="text-gray-500 transition-all duration-300 font-medium hidden sm:block"
                :class="isScrolled ? 'text-[10px] sm:text-xs' : 'text-xs'"
              >
                Thiên nhiên 100%
              </p>
            </div>
          </router-link>

          <!-- Desktop Navigation - Clean & Minimal -->
          <div class="hidden items-center gap-1 md:flex lg:gap-2">
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              class="relative px-4 py-2 text-sm text-black transition-all duration-300 hover:text-primary lg:text-lg rounded-xl hover:bg-primary/5 group"
            >
              <span class="relative z-10 font-medium">{{ item.name }}</span>
              <!-- Hover Background Effect -->
              <div
                class="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </a>
          </div>

          <!-- Action Buttons - Mobile Optimized -->
          <div class="flex items-center gap-1.5 sm:gap-2">
            <!-- Cart Button với Badge đẹp hơn -->
            <router-link
              to="/cart"
              class="relative rounded-xl p-2.5 transition-all duration-300 hover:bg-gray-100 active:scale-95 group"
              :class="isScrolled ? 'sm:p-2.5' : 'sm:p-3'"
            >
              <ShoppingCart
                class="text-gray-700 transition-all duration-300 group-hover:text-primary group-hover:scale-110"
                :class="isScrolled ? 'h-5 w-5 sm:h-6 sm:w-6' : 'h-6 w-6'"
              />
              <!-- Cart Badge với số lượng -->
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="scale-0 opacity-0"
                enter-to-class="scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="scale-100 opacity-100"
                leave-to-class="scale-0 opacity-0"
              >
                <span
                  v-if="cartStore.totalItems > 0"
                  class="absolute -right-0.5 -top-0.5 flex min-w-[18px] min-h-[18px] items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 px-1.5 text-[10px] font-bold text-white shadow-lg shadow-red-500/50 ring-2 ring-white"
                  :class="isScrolled ? 'sm:min-w-[20px] sm:text-xs' : 'sm:min-w-[22px] sm:text-xs'"
                >
                  {{ cartStore.totalItems > 99 ? '99+' : cartStore.totalItems }}
                </span>
              </transition>
            </router-link>

            <!-- Mobile Menu Button - Hamburger Animation -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="relative rounded-xl p-2.5 transition-all duration-300 hover:bg-gray-100 active:scale-95 md:hidden text-center"
              :class="[isScrolled ? 'sm:p-2.5' : 'sm:p-3', mobileMenuOpen ? 'bg-gray-100' : '']"
              aria-label="Toggle menu"
            >
              <div class="relative h-6 w-6">
                <!-- Animated Hamburger Icon -->
                <span
                  class="absolute left-0 top-1.5 h-0.5 w-6 bg-gray-700 transition-all duration-300 rounded-full"
                  :class="mobileMenuOpen ? 'top-3 rotate-45' : ''"
                ></span>
                <span
                  class="absolute left-0 top-3 h-0.5 w-6 bg-gray-700 transition-all duration-300 rounded-full"
                  :class="mobileMenuOpen ? 'opacity-0 scale-0' : ''"
                ></span>
                <span
                  class="absolute left-0 top-4.5 h-0.5 w-6 bg-gray-700 transition-all duration-300 rounded-full"
                  :class="mobileMenuOpen ? 'top-3 -rotate-45' : ''"
                ></span>
              </div>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation - Modern Slide Menu -->
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-active-class="transition-all duration-250 ease-in"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="mobileMenuOpen" class="overflow-hidden border-t border-gray-100 md:hidden">
            <div class="space-y-1 px-4 py-4 sm:px-6">
              <a
                v-for="(item, index) in navigation"
                :key="item.name"
                :href="item.href"
                @click="mobileMenuOpen = false"
                class="group flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-black transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:text-primary active:scale-[0.98]"
                :style="{
                  transitionDelay: `${index * 30}ms`,
                  animation: mobileMenuOpen ? `slideIn 0.3s ease-out ${index * 0.05}s both` : '',
                }"
              >
                <!-- Icon Bullet Point -->
                <div
                  class="flex h-2 w-2 items-center justify-center rounded-full bg-primary/40 transition-all duration-300 group-hover:bg-primary group-hover:scale-150"
                ></div>
                <span>{{ item.name }}</span>
                <!-- Arrow Icon -->
                <svg
                  class="ml-auto h-5 w-5 text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </transition>
      </nav>
    </div>
  </header>

  <!-- Spacer với dynamic height -->
  <div
    class="transition-all duration-300"
    :class="isScrolled ? 'h-16 sm:h-18' : 'h-16 sm:h-18 lg:h-20'"
  ></div>
</template>

<style scoped>
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
