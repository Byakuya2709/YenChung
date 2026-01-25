<!-- filepath: src/components/common/ProductCarousel.vue -->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import ProductCard from '@/components/features/ProductCard.vue'
import type { Product } from '@/types/product'
import type { Swiper as SwiperType } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

interface Props {
  products: Product[]
  autoplay?: boolean
  autoplayInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: false,
  autoplayInterval: 5000,
})

// Swiper instance ref
const swiperRef = ref<SwiperType | null>(null)
const isBeginning = ref(true)
const isEnd = ref(false)

// Chỉ bật carousel khi có > 4 sản phẩm
const shouldShowCarousel = computed(() => props.products.length > 4)

// Swiper modules (không có Navigation - ta tự làm)
const modules = [Pagination, Autoplay]

// Swiper breakpoints cho responsive
const breakpoints = {
  320: {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  1280: {
    slidesPerView: 4,
    spaceBetween: 16,
  },
}

// Autoplay config
const autoplayConfig = props.autoplay
  ? {
      delay: props.autoplayInterval,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }
  : false

// Swiper event handlers
function onSwiper(swiper: SwiperType) {
  swiperRef.value = swiper
  isBeginning.value = swiper.isBeginning
  isEnd.value = swiper.isEnd
}

function onSlideChange(swiper: SwiperType) {
  isBeginning.value = swiper.isBeginning
  isEnd.value = swiper.isEnd
}

// Custom navigation functions
function goNext() {
  swiperRef.value?.slideNext()
}

function goPrev() {
  swiperRef.value?.slidePrev()
}
</script>

<template>
  <div class="carousel-wrapper">
    <!-- Grid thông thường khi ≤ 4 sản phẩm - CENTERED -->
    <div v-if="!shouldShowCarousel" class="flex w-full justify-center">
      <div
        class="grid gap-4"
        :class="{
          'grid-cols-1': products.length === 1,
          'grid-cols-2': products.length >= 2,
          'lg:grid-cols-3': products.length >= 3,
          'xl:grid-cols-4': products.length >= 4,
        }"
      >
        <div v-for="product in products" :key="product.id" class="w-44 sm:w-52 lg:w-60">
          <ProductCard :product="product" />
        </div>
      </div>
    </div>

    <!-- Swiper Carousel khi > 4 sản phẩm -->
    <div v-else class="relative mx-auto">
      <!-- Custom Prev Button - Đặt bên ngoài hoàn toàn -->
      <button
        v-show="!isBeginning"
        @click="goPrev"
        class="absolute -left-2 top-1/2 z-50 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl transition-all hover:scale-110 hover:bg-gradient-to-br hover:from-orange-500 hover:to-red-500 hover:text-white sm:-left-6 sm:flex"
      >
        <ChevronLeft class="h-6 w-6" />
      </button>

      <!-- Swiper -->
      <div class="px-0 sm:px-8">
        <Swiper
          :modules="modules"
          :slides-per-view="2"
          :space-between="16"
          :breakpoints="breakpoints"
          :pagination="{ clickable: true }"
          :autoplay="autoplayConfig"
          :loop="false"
          :centered-slides="false"
          class="!pb-12"
          @swiper="onSwiper"
          @slide-change="onSlideChange"
        >
          <SwiperSlide v-for="product in products" :key="product.id" class="!h-auto">
            <ProductCard :product="product" />
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Custom Next Button - Đặt bên ngoài hoàn toàn -->
      <button
        v-show="!isEnd"
        @click="goNext"
        class="absolute -right-2 top-1/2 z-50 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl transition-all hover:scale-110 hover:bg-gradient-to-br hover:from-orange-500 hover:to-red-500 hover:text-white sm:-right-6 sm:flex"
      >
        <ChevronRight class="h-6 w-6" />
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Custom pagination styles */
:deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background: #d1d5db;
  opacity: 1;
  transition: all 0.3s;
}

:deep(.swiper-pagination-bullet-active) {
  width: 32px;
  border-radius: 4px;
  background: linear-gradient(135deg, #f97316 0%, #ef4444 100%);
}

:deep(.swiper-pagination-bullet:hover) {
  background: #9ca3af;
}
</style>
