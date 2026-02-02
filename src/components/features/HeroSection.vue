<!-- filepath: src/components/features/HeroSection.vue -->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  ChevronRight,
  Sparkles,
  Award,
  ShieldCheck,
  Star,
  TrendingUp,
  Heart,
} from 'lucide-vue-next'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

function scrollToProducts() {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    class="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-50 to-white"
    style="background-image: url('/bg-3.png')"
  >
    <!-- Background Decorations -->
    <div class="pointer-events-none absolute inset-0">
      <!-- Animated gradient orbs -->
      <div
        class="absolute -left-20 top-20 h-72 w-72 animate-float rounded-full bg-gradient-to-r from-red-400/20 to-orange-400/20 blur-3xl"
      ></div>
      <div
        class="absolute -right-20 bottom-20 h-96 w-96 animate-float-delayed rounded-full bg-gradient-to-r from-amber-400/20 to-yellow-400/20 blur-3xl"
      ></div>
      <div
        class="absolute right-1/4 top-1/3 h-64 w-64 animate-float-slow rounded-full bg-gradient-to-r from-orange-400/10 to-red-400/10 blur-3xl"
      ></div>
    </div>

    <!-- Grid Pattern Overlay -->
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:64px_64px] opacity-20"
    ></div>

    <div class="container relative mx-auto px-4 py-6 sm:py-8 lg:py-10">
      <div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <!-- Text Content - Mobile First -->
        <div
          class="relative z-10 transition-all duration-1000"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
        >
          <!-- Trust Badge -->
          <div
            class="mb-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 shadow-sm sm:mb-6"
          >
            <Sparkles class="h-4 w-4" />
            <span>Đánh giá 5 sao từ khách hàng</span>
          </div>

          <!-- Main Heading -->
          <h1
            class="mb-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:mb-6 sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span
              class="bg-gradient-to-r leading-[1.1] text-white font-extrabold bg-clip-text text-transparent text-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              Yến Tươi
            </span>
            <span class="relative inline-block">
              <span
                class="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-300 bg-clip-text text-transparent sm:text-4xl lg:text-5xl xl:text-6xl"
              >
                Chưng Nóng
              </span>
              <!-- Underline decoration -->
              <svg
                class="absolute -bottom-2 left-0 h-3 w-full text-white"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,7 Q50,0 100,7 T200,7"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  opacity="0.3"
                />
              </svg>
            </span>
            <!-- <span class="block text-3xl text-gray-600 sm:text-4xl lg:text-5xl">
              Bổ dưỡng mỗi ngày
            </span> -->
          </h1>

          <!-- Description -->
          <p class="mb-6 text-base leading-relaxed text-white sm:mb-8 sm:text-lg lg:text-xl">
            Sản phẩm yến sào 100% tự nhiên, giàu protein và acid amin thiết yếu. Giúp tăng cường sức
            khỏe, làm đẹp da và nâng cao hệ miễn dịch.
          </p>

          <!-- Key Features Grid -->
          <div class="mb-6 grid gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4">
            <div
              class="group flex items-center gap-3 rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md sm:flex-col sm:text-center"
            >
              <div
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg"
              >
                <ShieldCheck class="h-6 w-6" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-bold text-gray-900 sm:text-base">100% Thiên Nhiên</p>
                <p class="text-xs text-gray-500">Không chất bảo quản</p>
              </div>
            </div>

            <div
              class="group flex items-center gap-3 rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md sm:flex-col sm:text-center"
            >
              <div
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 text-white shadow-lg"
              >
                <Award class="h-6 w-6" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-bold text-gray-900 sm:text-base">Chứng Nhận ATTP</p>
                <p class="text-xs text-gray-500">An toàn tuyệt đối</p>
              </div>
            </div>

            <!-- <div
              class="group flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md sm:flex-col sm:text-center"
            >
              <div
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg"
              >
                <Heart class="h-6 w-6" />
              </div>

              <div class="flex-1">
                <p class="text-sm font-bold text-gray-900 sm:text-base">10.000+ Khách</p>
                <p class="text-xs text-gray-500">Tin dùng & yêu thích</p>
              </div>
            </div> -->
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              @click="scrollToProducts"
              class="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-yellow-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/40 sm:text-lg"
            >
              <Sparkles class="h-5 w-5" />
              Khám Phá Sản Phẩm
              <ChevronRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="/contact"
              class="flex items-center justify-center gap-2 rounded-full border-2 border-gray-900 bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all hover:bg-gray-900 hover:text-white sm:text-lg"
            >
              Liên Hệ Tư Vấn
            </a>
          </div>
        </div>

        <!-- Hero Visual -->
        <div
          class="relative transition-all duration-1000 delay-300"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
        >
          <!-- Main Image Container -->
          <div class="relative">
            <!-- Background Glow -->
            <div
              class="absolute inset-0 -z-10 translate-y-4 rounded-[2rem] bg-gradient-to-br from-red-400/30 to-orange-400/30 blur-2xl"
            ></div>

            <!-- Image Card -->
            <div
              class="relative overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-gray-900/5"
            >
              <img
                src="/hero.jpg"
                alt="Yến Sào Cao Cấp"
                class="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <!-- Gradient Overlay -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent"
              ></div>
            </div>

            <!-- Floating Stats Card - Bottom Left -->
            <!-- <div
              class="absolute -bottom-6 -left-4 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-900/5 sm:-left-8 sm:p-6"
            >
              <div class="flex items-center gap-4">
                <div
                  class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg"
                >
                  <TrendingUp class="h-7 w-7" />
                </div>
                <div>
                  <p class="text-2xl font-bold text-gray-900">10+</p>
                  <p class="text-sm text-gray-600">Năm kinh nghiệm</p>
                </div>
              </div>
            </div> -->

            <!-- Floating Badge - Top Right -->
            <div
              class="absolute -right-4 top-6 animate-bounce-slow rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-400 p-4 shadow-xl sm:-right-6"
            >
              <Sparkles class="h-6 w-6 text-white sm:h-8 sm:w-8" />
            </div>

            <!-- Quality Badge - Top Left -->
            <div
              class="absolute left-6 top-6 rounded-xl bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm"
            >
              <div class="flex items-center gap-2">
                <Star class="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span class="text-sm font-bold text-gray-900">Chất lượng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 -mb-2">
      <svg class="w-full" viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          fill="#F9FAFB"
        />
      </svg>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(-5deg);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-15px) scale(1.05);
  }
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}
</style>
