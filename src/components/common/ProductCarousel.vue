<!-- filepath: src/components/common/ProductCarousel.vue -->

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import ProductCard from '@/components/features/ProductCard.vue'
import type { Product } from '@/types/product'

interface Props {
  products: Product[]
  autoplay?: boolean
  autoplayInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: false,
  autoplayInterval: 5000,
})

const currentIndex = ref(0)
const isTransitioning = ref(false)
let autoplayTimer: number | null = null

// Tính số items hiển thị dựa vào màn hình
const itemsPerView = computed(() => {
  if (typeof window === 'undefined') return 4
  const width = window.innerWidth
  if (width < 640) return 2 // mobile: 2 cols
  if (width < 1024) return 3 // tablet: 3 cols
  return 4 // desktop: 4 cols
})

const maxIndex = computed(() => {
  return Math.max(0, props.products.length - itemsPerView.value)
})

const canGoPrev = computed(() => currentIndex.value > 0)
const canGoNext = computed(() => currentIndex.value < maxIndex.value)

const visibleProducts = computed(() => {
  return props.products.slice(currentIndex.value, currentIndex.value + itemsPerView.value)
})

function goToPrev() {
  if (!canGoPrev.value || isTransitioning.value) return
  isTransitioning.value = true
  currentIndex.value = Math.max(0, currentIndex.value - 1)
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

function goToNext() {
  if (!canGoNext.value || isTransitioning.value) return
  isTransitioning.value = true
  currentIndex.value = Math.min(maxIndex.value, currentIndex.value + 1)
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

function startAutoplay() {
  if (!props.autoplay) return
  stopAutoplay()
  autoplayTimer = window.setInterval(() => {
    if (canGoNext.value) {
      goToNext()
    } else {
      currentIndex.value = 0
    }
  }, props.autoplayInterval)
}

function stopAutoplay() {
  if (autoplayTimer !== null) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <div class="relative" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
    <!-- Carousel Container -->
    <div class="overflow-hidden">
      <div
        class="grid gap-4 transition-all duration-500 ease-out sm:gap-6"
        :class="{
          'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4': true,
        }"
      >
        <TransitionGroup name="fade">
          <div v-for="product in visibleProducts" :key="product.id">
            <ProductCard :product="product" />
          </div>
        </TransitionGroup>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <button
      v-if="canGoPrev"
      @click="goToPrev"
      class="absolute -left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 hover:bg-primary hover:text-white disabled:opacity-50 sm:-left-6"
      :disabled="!canGoPrev"
    >
      <ChevronLeft class="h-6 w-6" />
    </button>

    <button
      v-if="canGoNext"
      @click="goToNext"
      class="absolute -right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 hover:bg-primary hover:text-white disabled:opacity-50 sm:-right-6"
      :disabled="!canGoNext"
    >
      <ChevronRight class="h-6 w-6" />
    </button>

    <!-- Dots Indicator -->
    <div v-if="maxIndex > 0" class="mt-6 flex justify-center gap-2">
      <button
        v-for="i in maxIndex + 1"
        :key="i"
        @click="currentIndex = i - 1"
        class="h-2 rounded-full transition-all"
        :class="currentIndex === i - 1 ? 'w-8 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
