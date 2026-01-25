<!-- filepath: src/components/layout/AppFooter.vue -->

<script setup lang="ts">
import { Phone, Mail, MapPin, Facebook, MessageCircle } from 'lucide-vue-next'

const contactInfo = [
  { icon: Phone, text: '0123 456 789', href: 'tel:0123456789' },
  { icon: Mail, text: 'contact@yensao.vn', href: 'mailto:contact@yensao.vn' },
  { icon: MapPin, text: 'Tam Bình, Vĩnh Long', href: '#' },
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: MessageCircle, href: '#', label: 'Zalo' },
]
</script>

<template>
  <footer class="border-t border-gray-200 bg-gray-50">
    <div class="container mx-auto px-4 py-12">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <!-- Company Info -->
        <div>
          <div class="mb-4 flex items-center gap-2">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <span class="text-xl font-bold text-white">Y</span>
            </div>
            <h3 class="text-lg font-bold text-primary">Yến Sào Cao Cấp</h3>
          </div>
          <p class="text-sm text-gray-600">
            Chuyên cung cấp yến sào thiên nhiên 100%, chất lượng cao, giàu dinh dưỡng cho sức khỏe.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="mb-4 font-semibold text-gray-900">Liên Kết Nhanh</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="/#products" class="text-gray-600 hover:text-primary">Sản Phẩm</a></li>
            <li><a href="/#about" class="text-gray-600 hover:text-primary">Giới Thiệu</a></li>
            <li><a href="/cart" class="text-gray-600 hover:text-primary">Giỏ Hàng</a></li>
            <li><a href="/#contact" class="text-gray-600 hover:text-primary">Liên Hệ</a></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="mb-4 font-semibold text-gray-900">Thông Tin Liên Hệ</h4>
          <ul class="space-y-3">
            <li v-for="info in contactInfo" :key="info.text" class="flex items-center gap-2">
              <component :is="info.icon" class="h-4 w-4 text-primary" />
              <a :href="info.href" class="text-sm text-gray-600 hover:text-primary">
                {{ info.text }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Social Links -->
        <div>
          <h4 class="mb-4 font-semibold text-gray-900">Kết Nối Với Chúng Tôi</h4>
          <div class="flex gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-primary transition-colors hover:bg-primary-600"
            >
              <component :is="social.icon" class="h-5 w-5 text-white" />
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <!-- <div class="mt-8 border-t border-gray-200 pt-8 text-center">
        <p class="text-sm text-gray-600">
          © {{ currentYear }} Yến Sào Cao Cấp. Tất cả quyền được bảo lưu.
        </p>
      </div> -->
    </div>
  </footer>
</template>
