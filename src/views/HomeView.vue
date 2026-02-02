<!-- filepath: src/views/HomeView.vue -->

<script setup lang="ts">
import { ref } from 'vue'
import { mockCustomProduct, mockComboProducts, mockUnitProducts } from '@/mock/products'
import HeroSection from '@/components/features/HeroSection.vue'
import ProductCarousel from '@/components/common/ProductCarousel.vue'
import { Sparkles, Package, Box, Phone, Mail, CheckCircle, Users, Shield } from 'lucide-vue-next'
import type { Product } from '@/types/product'

// Nhóm sản phẩm theo category
const customProducts = ref<Product[]>(mockCustomProduct)
const comboProducts = ref<Product[]>(mockComboProducts)
const unitProducts = ref<Product[]>(mockUnitProducts)

// Các lợi ích chính
const benefits = [
  {
    icon: Shield,
    title: '100% Thiên Nhiên',
    description: 'Không chất bảo quản, không tẩm ướp',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: CheckCircle,
    title: 'Chứng Nhận ATTP',
    description: 'Đạt tiêu chuẩn an toàn thực phẩm',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: '10.000+ Khách Hàng',
    description: 'Tin dùng và đánh giá 5 sao',
    color: 'from-purple-500 to-pink-500',
  },
]
</script>

<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Benefits Section - Nổi bật giữa hero và sản phẩm -->
    <!-- <section class="relative z-10 -mt-12 pb-12 sm:-mt-16 sm:pb-16">
      <div class="container mx-auto max-w-6xl px-4">
        <div
          class="grid gap-4 rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-gray-900/5 sm:grid-cols-3 sm:gap-6 sm:p-8"
        >
          <div
            v-for="(benefit, index) in benefits"
            :key="index"
            class="group flex items-start gap-4 rounded-xl p-4 transition-all hover:bg-gray-50"
          >
            <div
              :class="`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${benefit.color} text-white shadow-lg`"
            >
              <component :is="benefit.icon" class="h-6 w-6" />
            </div>
            <div>
              <h3 class="mb-1 font-bold text-gray-900">{{ benefit.title }}</h3>
              <p class="text-sm text-gray-600">{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Custom Products Section -->
    <section id="products" class="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <div class="container relative mx-auto max-w-7xl px-4">
        <!-- Section Header -->
        <div class="mb-8 text-center sm:mb-12">
          <div
            class="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
          >
            <Sparkles class="h-4 w-4" />
            <span>Tự do sáng tạo</span>
          </div>
          <h2
            class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            Tùy Chỉnh
            <span class="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Theo Ý Bạn
            </span>
          </h2>
          <p class="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
            Lựa chọn trọng lượng, thể tích, và bao bì theo sở thích của bạn
          </p>
        </div>

        <!-- Carousel -->
        <div class="mx-auto max-w-6xl">
          <ProductCarousel :products="customProducts" :autoplay="true" />
        </div>
      </div>
    </section>

    <!-- Combo Products Section -->
    <section
      id="combo-products"
      class="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 py-12 sm:py-16 lg:py-20"
    >
      <div class="container relative mx-auto max-w-7xl px-4">
        <!-- Section Header -->
        <div class="mb-8 text-center sm:mb-12">
          <div
            class="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700"
          >
            <Package class="h-4 w-4" />
            <span>Tiết kiệm hơn</span>
          </div>
          <h2
            class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            Combo
            <span
              class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              Tiết Kiệm
            </span>
          </h2>
          <p class="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
            Các gói combo có sẵn với giá ưu đãi, phù hợp cho gia đình và doanh nghiệp
          </p>
        </div>

        <!-- Carousel -->
        <div class="mx-auto max-w-6xl">
          <ProductCarousel :products="comboProducts" :autoplay="true" :autoplay-interval="6000" />
        </div>
      </div>
    </section>

    <!-- Unit Products Section -->
    <section id="unit-products" class="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <div class="container relative mx-auto max-w-7xl px-4">
        <!-- Section Header -->
        <div class="mb-8 text-center sm:mb-12">
          <div
            class="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700"
          >
            <Box class="h-4 w-4" />
            <span>Sẵn sàng sử dụng</span>
          </div>
          <h2
            class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            Sản Phẩm
            <span
              class="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
            >
              Yến Thô
            </span>
          </h2>
          <p class="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
            Các sản phẩm có sẵn với cấu hình cố định, mua ngay không cần tùy chỉnh
          </p>
        </div>

        <!-- Carousel -->
        <div class="mx-auto max-w-6xl">
          <ProductCarousel :products="unitProducts" :autoplay="true" :autoplay-interval="7000" />
        </div>
      </div>
    </section>

    <!-- About Section - Redesigned -->
    <section
      id="about"
      class="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white py-16 sm:py-20 lg:py-24"
    >
      <!-- Background Pattern -->
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:64px_64px] opacity-20"
      ></div>

      <div class="container relative mx-auto max-w-6xl px-4">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Tại Sao Chọn
            <span class="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              Chúng Tôi?
            </span>
          </h2>
          <p class="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
            Hơn 10 năm kinh nghiệm mang đến sản phẩm yến sào chất lượng cao
          </p>
        </div>

        <div class="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <!-- Left Card -->
          <div
            class="group rounded-2xl bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 p-8 shadow-xl ring-1 ring-gray-900/5 transition-all hover:shadow-2xl sm:p-10"
          >
            <div class="mb-6 flex items-center gap-4">
              <div
                class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg"
              >
                <Shield class="h-8 w-8" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 sm:text-3xl">Cam Kết Chất Lượng</h3>
            </div>
            <p class="mb-4 text-base leading-relaxed text-gray-700">
              Với nhiều năm kinh nghiệm trong ngành yến sào, chúng tôi cam kết mang đến cho khách
              hàng những sản phẩm chất lượng nhất, được khai thác và chế biến hoàn toàn thủ công đảm
              bảo an toàn vệ sinh.
            </p>
            <p class="text-base leading-relaxed text-gray-700">
              Mỗi sợi yến đều được chọn lọc tỉ mỉ, đảm bảo giữ nguyên giá trị dinh dưỡng tự nhiên.
            </p>
          </div>

          <!-- Right Card -->
          <div
            class="group rounded-2xl bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-8 shadow-xl ring-1 ring-gray-900/5 transition-all hover:shadow-2xl sm:p-10"
          >
            <div class="mb-6 flex items-center gap-4">
              <div
                class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg"
              >
                <CheckCircle class="h-8 w-8" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 sm:text-3xl">Vì Sao Chọn Chúng Tôi?</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div
                  class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-sm"
                >
                  ✓
                </div>
                <span class="text-base text-gray-700">100% yến tự nhiên, không tẩm ướp</span>
              </li>
              <li class="flex items-start gap-3">
                <div
                  class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-sm"
                >
                  ✓
                </div>
                <span class="text-base text-gray-700">Sản phẩm chế biến thủ công, tỉ mỉ</span>
              </li>
              <li class="flex items-start gap-3">
                <div
                  class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-sm"
                >
                  ✓
                </div>
                <span class="text-base text-gray-700"
                  >Giao hàng tận nơi tại khu vực Tam Bình, Vĩnh Long</span
                >
              </li>
              <li class="flex items-start gap-3">
                <div
                  class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-sm"
                >
                  ✓
                </div>
                <span class="text-base text-gray-700">Hỗ trợ tư vấn 24/7</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section - Redesigned -->
    <section
      id="contact"
      class="relative overflow-hidden bg-gradient-to-br from-red-800 via-red-900 to-red-700 py-16 sm:py-20 lg:py-24"
    >
      <!-- Animated Background -->
      <div class="pointer-events-none absolute inset-0">
        <div
          class="absolute left-1/4 top-20 h-72 w-72 animate-float rounded-full bg-red-500/20 blur-3xl"
        ></div>
        <div
          class="absolute bottom-20 right-1/4 h-96 w-96 animate-float-delayed rounded-full bg-amber-700/20 blur-3xl"
        ></div>
      </div>

      <div class="container relative mx-auto max-w-4xl px-4 text-center">
        <div class="mb-8 sm:mb-10">
          <h2 class="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Sẵn Sàng Đặt Hàng?
          </h2>
          <p class="mx-auto max-w-2xl text-base text-gray-300 sm:text-lg lg:text-xl">
            Liên hệ với chúng tôi để được tư vấn và đặt hàng ngay hôm nay
          </p>
        </div>

        <div class="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
          <a
            href="tel:0123456789"
            class="group flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-red-500/30 transition-all hover:scale-105 hover:shadow-red-500/50 sm:text-lg"
          >
            <Phone class="h-5 w-5" />
            <span>0123 456 789</span>
          </a>
          <a
            href="mailto:contact@yensao.vn"
            class="group flex items-center justify-center gap-3 rounded-full border-2 border-white bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-gray-900 sm:text-lg"
          >
            <Mail class="h-5 w-5" />
            <span>contact@yensao.vn</span>
          </a>
        </div>

        <!-- Additional Info -->
        <!-- <div class="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
          <div class="flex items-center gap-2">
            <CheckCircle class="h-5 w-5 text-green-500" />
            <span>Giao hàng toàn quốc</span>
          </div>
          <div class="flex items-center gap-2">
            <CheckCircle class="h-5 w-5 text-green-500" />
            <span>Thanh toán khi nhận hàng</span>
          </div>
          <div class="flex items-center gap-2">
            <CheckCircle class="h-5 w-5 text-green-500" />
            <span>Hỗ trợ 24/7</span>
          </div>
        </div> -->
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 1s;
}
</style>
