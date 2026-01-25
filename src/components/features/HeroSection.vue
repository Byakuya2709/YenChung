<!-- filepath: src/components/features/HeroSection.vue -->

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

function scrollToProducts() {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="relative overflow-hidden bg-primary-900 bg-pattern-red">
    <div class="container mx-auto px-4 py-20 lg:py-32">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <!-- Text Content -->
        <div class="text-white">
          <h1 class="mb-6 text-4xl font-bold leading-tight lg:text-5xl xl:text-6xl">
            Yến Sào Thiên Nhiên
            <span class="text-accent">100%</span>
          </h1>
          <p class="mb-8 text-lg text-white/90 lg:text-xl">
            Sản phẩm yến sào cao cấp, giàu dinh dưỡng, tốt cho sức khỏe. Cam kết chất lượng từ thiên
            nhiên.
          </p>

          <div class="flex flex-wrap gap-4">
            <button
              @click="scrollToProducts"
              class="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-primary transition-all hover:shadow-lg"
            >
              Khám Phá Ngay
              <ChevronRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#contact"
              class="rounded-full border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-primary"
            >
              Liên Hệ
            </a>
          </div>
        </div>

        <!-- Hero Image -->
        <div class="relative">
          <div class="relative z-10 overflow-hidden rounded-3xl shadow-2xl">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/3df98569dbc493b9763e05ff5b58ec3d5cfdf595?width=600"
              alt="Yến Sào Cao Cấp"
              class="h-full w-full object-cover"
            />
          </div>
          <!-- Decorative Elements -->
          <div
            class="absolute -right-4 -top-4 h-72 w-72 rounded-full bg-accent opacity-20 blur-3xl"
          ></div>
          <div
            class="absolute -bottom-4 -left-4 h-72 w-72 rounded-full bg-white opacity-10 blur-3xl"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>
