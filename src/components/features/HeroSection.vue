<!-- filepath: src/components/features/HeroSection.vue -->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ChevronRight, Sparkles, Award, ShieldCheck } from 'lucide-vue-next'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

function scrollToProducts() {
  document.getElementById('custom-products')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    class="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-orange-500"
    style="background-image: url('/bg-3.png')"
  >
    <!-- Animated Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute h-full w-full animate-[slide_20s_linear_infinite]"></div>
    </div>

    <!-- Floating Orbs -->
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute left-1/4 top-20 h-64 w-64 animate-float rounded-full bg-white/10 blur-3xl"
      ></div>
      <div
        class="absolute right-1/3 top-40 h-96 w-96 animate-float-delayed rounded-full bg-yellow-300/20 blur-3xl"
      ></div>
      <div
        class="absolute bottom-20 left-1/3 h-80 w-80 animate-float-slow rounded-full bg-orange-300/10 blur-3xl"
      ></div>
    </div>

    <div class="container relative mx-auto px-4 py-16 lg:py-24">
      <div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <!-- Text Content -->
        <div
          class="relative z-10 text-white transition-all duration-1000"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
        >
          <!-- Badge -->
          <div
            class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm"
          >
            <Sparkles class="h-4 w-4 text-yellow-300" />
            <span>Sản phẩm 100% từ thiên nhiên</span>
          </div>

          <h1
            class="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Yến Sào
            <span
              class="block bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent"
            >
              Thiên Nhiên
            </span>
          </h1>

          <p class="mb-8 text-lg text-white/90 sm:text-xl lg:text-2xl">
            Giàu dinh dưỡng, tốt cho sức khỏe<br class="hidden sm:block" />
            Cam kết chất lượng cao cấp từ thiên nhiên
          </p>

          <!-- Features -->
          <div class="mb-8 grid gap-4 sm:grid-cols-2">
            <div class="flex items-center gap-3 rounded-lg bg-white/10 p-3 backdrop-blur-sm">
              <ShieldCheck class="h-8 w-8 flex-shrink-0 text-yellow-300" />
              <div>
                <p class="font-semibold">Chứng nhận ATTP</p>
                <p class="text-sm text-white/80">An toàn tuyệt đối</p>
              </div>
            </div>
            <div class="flex items-center gap-3 rounded-lg bg-white/10 p-3 backdrop-blur-sm">
              <Award class="h-8 w-8 flex-shrink-0 text-yellow-300" />
              <div>
                <p class="font-semibold">Chất lượng cao</p>
                <p class="text-sm text-white/80">Đạt chuẩn quốc tế</p>
              </div>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-4">
            <button
              @click="scrollToProducts"
              class="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-red-600 shadow-2xl transition-all hover:scale-105 hover:shadow-yellow-300/50"
            >
              Khám Phá Ngay
              <ChevronRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#contact"
              class="flex items-center gap-2 rounded-full border-2 border-white bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm transition-all hover:bg-white hover:text-red-600"
            >
              Liên Hệ Tư Vấn
            </a>
          </div>
        </div>

        <!-- Hero Image -->
        <div
          class="relative transition-all duration-1000 delay-300"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
        >
          <div class="relative z-10">
            <div class="relative overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white/20">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/3df98569dbc493b9763e05ff5b58ec3d5cfdf595?width=800"
                alt="Yến Sào Cao Cấp"
                class="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <!-- Overlay Gradient -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
              ></div>
            </div>

            <!-- Floating Card -->
            <div
              class="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-2xl backdrop-blur-sm sm:-left-8 sm:-bottom-8 sm:p-6"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-2xl font-bold text-white"
                >
                  10+
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-600">Năm kinh nghiệm</p>
                  <p class="text-xs text-gray-500">Chất lượng tin cậy</p>
                </div>
              </div>
            </div>

            <!-- Floating Badge -->
            <div
              class="absolute -right-4 top-6 animate-bounce-slow rounded-full bg-yellow-400 p-3 shadow-lg sm:-right-6"
            >
              <Sparkles class="h-6 w-6 text-white sm:h-8 sm:w-8" />
            </div>
          </div>

          <!-- Decorative Blurs -->
          <div
            class="absolute -right-8 -top-8 h-64 w-64 rounded-full bg-yellow-300/30 blur-3xl"
          ></div>
          <div class="absolute -bottom-8 -left-8 h-64 w-64 rounded-full bg-white/20 blur-3xl"></div>
        </div>
      </div>
    </div>

    <!-- Wave Bottom -->
    <div class="absolute bottom-0 left-0 right-0 -mb-2">
      <svg class="w-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          fill="#F9FAFB"
        />
      </svg>
    </div>
  </section>
</template>

<style scoped>
@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(60px);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-30px) translateX(-15px);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-15px) translateX(20px);
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
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 10s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 12s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}
</style>
