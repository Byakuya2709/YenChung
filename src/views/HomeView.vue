<!-- filepath: src/views/HomeView.vue -->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockCustomProduct, mockComboProducts, mockUnitProducts } from '@/mock/products'
import HeroSection from '@/components/features/HeroSection.vue'
import ProductCard from '@/components/features/ProductCard.vue'
import type { Product } from '@/types/product'

// Nhóm sản phẩm theo category
const customProducts = ref<Product[]>(mockCustomProduct)
const comboProducts = ref<Product[]>(mockComboProducts)
const unitProducts = ref<Product[]>(mockUnitProducts)
</script>

<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Custom Products Section -->
    <section id="custom-products" class="bg-gray-50 py-16 lg:py-20">
      <div class="container mx-auto px-4">
        <div class="mb-10 text-center">
          <h2 class="mb-3 text-3xl font-bold text-gray-900 lg:text-4xl">Tùy Chỉnh Theo Ý Bạn</h2>
          <p class="mx-auto max-w-2xl text-gray-600">
            Lựa chọn trọng lượng, thể tích, và bao bì theo sở thích của bạn
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductCard v-for="product in customProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- Combo Products Section -->
    <section id="combo-products" class="bg-white py-16 lg:py-20">
      <div class="container mx-auto px-4">
        <div class="mb-10 text-center">
          <h2 class="mb-3 text-3xl font-bold text-gray-900 lg:text-4xl">Combo Tiết Kiệm</h2>
          <p class="mx-auto max-w-2xl text-gray-600">
            Các gói combo có sẵn với giá ưu đãi, phù hợp cho gia đình và doanh nghiệp
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductCard v-for="product in comboProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- Unit Products Section -->
    <section id="unit-products" class="bg-gray-50 py-16 lg:py-20">
      <div class="container mx-auto px-4">
        <div class="mb-10 text-center">
          <h2 class="mb-3 text-3xl font-bold text-gray-900 lg:text-4xl">Sản Phẩm Đơn Lẻ</h2>
          <p class="mx-auto max-w-2xl text-gray-600">
            Các sản phẩm có sẵn với cấu hình cố định, mua ngay không cần tùy chỉnh
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductCard v-for="product in unitProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="bg-white py-16 lg:py-24">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">Về Chúng Tôi</h2>
          <p class="mb-4 text-lg text-gray-600">
            Với hơn 10 năm kinh nghiệm trong ngành yến sào, chúng tôi cam kết mang đến cho khách
            hàng những sản phẩm chất lượng nhất, được khai thác và chế biến theo quy trình khép kín.
          </p>
          <p class="text-lg text-gray-600">
            Mỗi sợi yến đều được chọn lọc tỉ mỉ, đảm bảo giữ nguyên giá trị dinh dưỡng tự nhiên.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="bg-gray-50 py-16 lg:py-24">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">Liên Hệ Với Chúng Tôi</h2>
          <p class="mb-8 text-lg text-gray-600">
            Có thắc mắc hoặc muốn đặt hàng? Liên hệ ngay với chúng tôi!
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a
              href="tel:0123456789"
              class="rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-600"
            >
              Gọi Ngay: 0123 456 789
            </a>
            <a
              href="mailto:contact@yensao.vn"
              class="rounded-full border-2 border-primary px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Email: contact@yensao.vn
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
