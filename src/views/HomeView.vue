<!-- filepath: src/views/HomeView.vue -->

<script setup lang="ts">
import { ref } from 'vue'
import { mockCustomProduct, mockComboProducts, mockUnitProducts } from '@/mock/products'
import HeroSection from '@/components/features/HeroSection.vue'
import ProductCarousel from '@/components/common/ProductCarousel.vue'
import { Sparkles, Package, Box, Phone, Mail } from 'lucide-vue-next'
import type { Product } from '@/types/product'

// Nhóm sản phẩm theo category
const customProducts = ref<Product[]>(mockCustomProduct)
const comboProducts = ref<Product[]>(mockComboProducts)
const unitProducts = ref<Product[]>(mockUnitProducts)
</script>

<template>
  <div class="bg-gray-50">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Custom Products Section -->
    <section
      id="custom-products"
      class="relative overflow-hidden bg-gray-50 py-12 sm:py-16 lg:py-20"
    >
      <!-- Decorative Background -->
      <div class="pointer-events-none absolute inset-0 opacity-5">
        <div class="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500 blur-3xl"></div>
      </div>

      <div class="container relative mx-auto px-4">
        <!-- Section Header -->
        <div class="mb-8 text-center sm:mb-10 lg:mb-12">
          <div
            class="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700"
          >
            <Sparkles class="h-4 w-4" />
            <span>Tự do sáng tạo</span>
          </div>
          <h2
            class="mb-3 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl lg:text-5xl"
          >
            Tùy Chỉnh Theo Ý Bạn
          </h2>
          <p class="mx-auto max-w-2xl text-sm text-gray-600 sm:text-base lg:text-lg">
            Lựa chọn trọng lượng, thể tích, và bao bì theo sở thích của bạn
          </p>
        </div>

        <!-- Carousel -->
        <ProductCarousel :products="customProducts" :autoplay="true" />
      </div>
    </section>

    <!-- Combo Products Section -->
    <section id="combo-products" class="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <!-- Decorative Background -->
      <div class="pointer-events-none absolute inset-0 opacity-5">
        <div
          class="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-purple-500 blur-3xl"
        ></div>
      </div>

      <div class="container relative mx-auto px-4">
        <!-- Section Header -->
        <div class="mb-8 text-center sm:mb-10 lg:mb-12">
          <div
            class="mb-3 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700"
          >
            <Package class="h-4 w-4" />
            <span>Tiết kiệm hơn</span>
          </div>
          <h2
            class="mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl lg:text-5xl"
          >
            Combo Tiết Kiệm
          </h2>
          <p class="mx-auto max-w-2xl text-sm text-gray-600 sm:text-base lg:text-lg">
            Các gói combo có sẵn với giá ưu đãi, phù hợp cho gia đình và doanh nghiệp
          </p>
        </div>

        <!-- Carousel -->
        <ProductCarousel :products="comboProducts" :autoplay="true" :autoplay-interval="6000" />
      </div>
    </section>

    <!-- Unit Products Section -->
    <section
      id="unit-products"
      class="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 py-12 sm:py-16 lg:py-20"
    >
      <!-- Decorative Background -->
      <div class="pointer-events-none absolute inset-0 opacity-5">
        <div class="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-green-500 blur-3xl"></div>
      </div>

      <div class="container relative mx-auto px-4">
        <!-- Section Header -->
        <div class="mb-8 text-center sm:mb-10 lg:mb-12">
          <div
            class="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700"
          >
            <Box class="h-4 w-4" />
            <span>Sẵn sàng sử dụng</span>
          </div>
          <h2
            class="mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl lg:text-5xl"
          >
            Sản Phẩm Yến Thô
          </h2>
          <p class="mx-auto max-w-2xl text-sm text-gray-600 sm:text-base lg:text-lg">
            Các sản phẩm có sẵn với cấu hình cố định, mua ngay không cần tùy chỉnh
          </p>
        </div>

        <!-- Carousel -->
        <ProductCarousel :products="unitProducts" :autoplay="true" :autoplay-interval="7000" />
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-24">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-4xl">
          <div class="mb-10 text-center">
            <h2 class="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
              Về Chúng Tôi
            </h2>
            <div
              class="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-red-500 to-orange-500"
            ></div>
          </div>

          <div class="grid gap-8 lg:grid-cols-2">
            <div class="rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 p-6 sm:p-8">
              <h3 class="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">Cam Kết Chất Lượng</h3>
              <p class="mb-4 text-sm leading-relaxed text-gray-700 sm:text-base">
                Với hơn 10 năm kinh nghiệm trong ngành yến sào, chúng tôi cam kết mang đến cho khách
                hàng những sản phẩm chất lượng nhất, được khai thác và chế biến theo quy trình khép
                kín.
              </p>
              <p class="text-sm leading-relaxed text-gray-700 sm:text-base">
                Mỗi sợi yến đều được chọn lọc tỉ mỉ, đảm bảo giữ nguyên giá trị dinh dưỡng tự nhiên.
              </p>
            </div>

            <div class="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 sm:p-8">
              <h3 class="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                Tại Sao Chọn Chúng Tôi?
              </h3>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <div
                    class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white"
                  >
                    ✓
                  </div>
                  <span class="text-sm text-gray-700 sm:text-base"
                    >100% yến tự nhiên, không tẩm ướp</span
                  >
                </li>
                <li class="flex items-start gap-3">
                  <div
                    class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white"
                  >
                    ✓
                  </div>
                  <span class="text-sm text-gray-700 sm:text-base"
                    >Chứng nhận an toàn thực phẩm</span
                  >
                </li>
                <li class="flex items-start gap-3">
                  <div
                    class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white"
                  >
                    ✓
                  </div>
                  <span class="text-sm text-gray-700 sm:text-base"
                    >Giao hàng tận nơi nhanh chóng</span
                  >
                </li>
                <li class="flex items-start gap-3">
                  <div
                    class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white"
                  >
                    ✓
                  </div>
                  <span class="text-sm text-gray-700 sm:text-base">Hỗ trợ tư vấn 24/7</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section
      id="contact"
      class="relative overflow-hidden bg-gradient-to-br from-red-600 to-orange-600 py-12 sm:py-16 lg:py-24"
      style="background-image: url('/public/bg-3.png')"
    >
      <!-- Animated Background -->
      <div class="pointer-events-none absolute inset-0 opacity-10">
        <div class="absolute h-full w-full animate-[slide_20s_linear_infinite]"></div>
      </div>

      <div class="container relative mx-auto px-4">
        <div class="mx-auto max-w-3xl text-center text-white">
          <h2 class="mb-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Liên Hệ Với Chúng Tôi
          </h2>
          <p class="mb-8 text-base text-white/90 sm:text-lg lg:text-xl">
            Có thắc mắc hoặc muốn đặt hàng? Liên hệ ngay với chúng tôi!
          </p>

          <div class="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="tel:0123456789"
              class="group flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-base font-bold text-red-600 shadow-2xl transition-all hover:scale-105 sm:px-8 sm:text-lg"
            >
              <Phone class="h-5 w-5" />
              <span>0123 456 789</span>
            </a>
            <a
              href="mailto:contact@yensao.vn"
              class="group flex items-center justify-center gap-3 rounded-full border-2 border-white bg-white/10 px-6 py-4 text-base font-bold backdrop-blur-sm transition-all hover:bg-white hover:text-red-600 sm:px-8 sm:text-lg"
            >
              <Mail class="h-5 w-5" />
              <span>contact@yensao.vn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
