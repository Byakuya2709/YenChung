<!-- filepath: src/views/ContactView.vue -->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { sendConsultationRequest } from '@/services/telegram'
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  MessageCircle,
  User,
  Facebook,
} from 'lucide-vue-next'

import PrimaryButton from '@/components/common/PrimaryButton.vue'
const router = useRouter()

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: MessageCircle, href: '#', label: 'Zalo' },
]
// Form state
const formData = ref({
  name: '',
  phone: '',
  email: '',
  subject: 'Tư vấn sản phẩm',
  message: '',
})

const isSubmitting = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

// Validation
const errors = ref<Record<string, string>>({})

const isValidPhone = computed(() => {
  const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
  return phoneRegex.test(formData.value.phone)
})

const isValidEmail = computed(() => {
  if (!formData.value.email) return true // Email is optional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(formData.value.email)
})

const isFormValid = computed(() => {
  return (
    formData.value.name.trim() !== '' &&
    formData.value.phone.trim() !== '' &&
    isValidPhone.value &&
    isValidEmail.value &&
    formData.value.message.trim() !== ''
  )
})

// Validate form
function validateForm(): boolean {
  errors.value = {}

  if (!formData.value.name.trim()) {
    errors.value.name = 'Vui lòng nhập họ tên'
  }

  if (!formData.value.phone.trim()) {
    errors.value.phone = 'Vui lòng nhập số điện thoại'
  } else if (!isValidPhone.value) {
    errors.value.phone = 'Số điện thoại không hợp lệ'
  }

  if (formData.value.email && !isValidEmail.value) {
    errors.value.email = 'Email không hợp lệ'
  }

  if (!formData.value.message.trim()) {
    errors.value.message = 'Vui lòng nhập nội dung tư vấn'
  }

  return Object.keys(errors.value).length === 0
}

// Submit form
async function handleSubmit() {
  if (!validateForm() || !isFormValid.value) {
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const success = await sendConsultationRequest({
      name: formData.value.name,
      phone: formData.value.phone,
      email: formData.value.email || undefined,
      subject: formData.value.subject,
      message: formData.value.message,
      createdAt: new Date(),
    })

    if (success) {
      isSuccess.value = true
      // Reset form
      formData.value = {
        name: '',
        phone: '',
        email: '',
        subject: 'Tư vấn sản phẩm',
        message: '',
      }
      errors.value = {}

      // Auto close success message after 5s
      setTimeout(() => {
        isSuccess.value = false
      }, 5000)
    } else {
      errorMessage.value = 'Không thể gửi yêu cầu. Vui lòng thử lại sau.'
    }
  } catch (error) {
    errorMessage.value = 'Đã xảy ra lỗi. Vui lòng thử lại sau.'
  } finally {
    isSubmitting.value = false
  }
}

const subjects = ['Tư vấn sản phẩm', 'Hỏi giá', 'Vận chuyển', 'Hợp tác kinh doanh', 'Khác']
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-white">
    <!-- Background Pattern -->
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:64px_64px] opacity-20"
    ></div>

    <div class="container relative mx-auto px-4 py-8 sm:py-12 lg:py-16">
      <!-- Header -->
      <div class="mb-8 text-center sm:mb-12">
        <div
          class="mb-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700"
        >
          <MessageCircle class="h-4 w-4" />
          <span>Liên hệ ngay</span>
        </div>
        <h1
          class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        >
          Tư Vấn
          <span class="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            Miễn Phí
          </span>
        </h1>
        <p class="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
          Để lại thông tin, chúng tôi sẽ liên hệ tư vấn chi tiết cho bạn trong thời gian sớm nhất
        </p>
      </div>

      <div class="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <!-- Left Column: Contact Info -->
        <div class="space-y-6 lg:col-span-1">
          <!-- Contact Cards -->
          <div class="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-900/5">
            <div class="mb-6 flex items-center gap-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500 text-white"
              >
                <Phone class="h-6 w-6" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900">Điện thoại</h3>
                <p class="text-sm text-gray-600">Gọi ngay để được hỗ trợ</p>
              </div>
            </div>
            <a href="tel:0123456789">
              <PrimaryButton class="w-full justify-center">
                <Phone class="h-5 w-5 inline-block" />
                0123 456 789
              </PrimaryButton>
            </a>
          </div>

          <div class="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-900/5">
            <div class="mb-6 flex items-center gap-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
              >
                <Mail class="h-6 w-6" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900">Email</h3>
                <p class="text-sm text-gray-600">Gửi email cho chúng tôi</p>
              </div>
            </div>
            <a href="mailto:contact@yensao.vn">
              <PrimaryButton variant="secondary" class="w-full justify-center">
                <Phone class="h-5 w-5 inline-block mx-2 text-black" />
                <span class="text-black">contact@yensao.vn</span>
              </PrimaryButton>
            </a>
          </div>

          <div class="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-900/5">
            <div class="mb-4 flex items-center gap-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white"
              >
                <MapPin class="h-6 w-6" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900">Địa chỉ</h3>
                <p class="text-sm text-gray-600">Ghé thăm cửa hàng</p>
              </div>
            </div>
            <p class="text-sm leading-relaxed text-gray-700">
              Ấp 7, Xã Cái Ngang, Tam Bình, Vĩnh Long
            </p>
            <div class="mt-4 flex items-center gap-3">
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

          <!-- Working Hours -->
          <div class="rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 p-6 shadow-lg">
            <div class="mb-4 flex items-center gap-3">
              <Clock class="h-6 w-6 text-amber-600" />
              <h3 class="text-lg font-bold text-gray-900">Giờ làm việc</h3>
            </div>
            <ul class="space-y-2 text-sm text-gray-700">
              <li class="flex items-center justify-between">
                <span>Thứ 2 - Thứ 6:</span>
                <span class="font-semibold">8:00 - 18:00</span>
              </li>
              <li class="flex items-center justify-between">
                <span>Thứ 7 - Chủ nhật:</span>
                <span class="font-semibold">9:00 - 17:00</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Column: Contact Form -->
        <div class="lg:col-span-2">
          <div class="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-900/5 sm:p-8">
            <div class="mb-6">
              <h2 class="mb-2 text-2xl font-bold text-gray-900">Gửi yêu cầu tư vấn</h2>
              <p class="text-sm text-gray-600">
                Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại sớm nhất
              </p>
            </div>

            <!-- Success Message -->
            <div v-if="isSuccess" class="mb-6 rounded-xl border-2 border-green-200 bg-green-50 p-4">
              <div class="flex items-center gap-3">
                <CheckCircle class="h-6 w-6 flex-shrink-0 text-green-600" />
                <div>
                  <p class="font-semibold text-green-900">Gửi yêu cầu thành công!</p>
                  <p class="text-sm text-green-700">
                    Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.
                  </p>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="mb-6 rounded-xl border-2 border-red-200 bg-red-50 p-4">
              <p class="text-sm text-red-700">{{ errorMessage }}</p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-5">
              <!-- Name -->
              <div>
                <label for="name" class="mb-2 block text-sm font-semibold text-gray-900">
                  Họ và tên <span class="text-red-600">*</span>
                </label>
                <div class="relative">
                  <User class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    class="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    :class="{ 'border-red-500': errors.name }"
                  />
                </div>
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
              </div>

              <!-- Phone -->
              <div>
                <label for="phone" class="mb-2 block text-sm font-semibold text-gray-900">
                  Số điện thoại <span class="text-red-600">*</span>
                </label>
                <div class="relative">
                  <Phone class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="phone"
                    v-model="formData.phone"
                    type="tel"
                    placeholder="0912345678"
                    class="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    :class="{ 'border-red-500': errors.phone }"
                  />
                </div>
                <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
              </div>

              <!-- Email (Optional) -->
              <div>
                <label for="email" class="mb-2 block text-sm font-semibold text-gray-900">
                  Email <span class="text-sm font-normal text-gray-500">(Không bắt buộc)</span>
                </label>
                <div class="relative">
                  <Mail class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    placeholder="example@email.com"
                    class="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    :class="{ 'border-red-500': errors.email }"
                  />
                </div>
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
              </div>

              <!-- Subject -->
              <div>
                <label for="subject" class="mb-2 block text-sm font-semibold text-gray-900">
                  Chủ đề
                </label>
                <select
                  id="subject"
                  v-model="formData.subject"
                  class="w-full rounded-xl border-2 border-gray-200 bg-white py-3 px-4 text-gray-900 transition-colors focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                >
                  <option v-for="subject in subjects" :key="subject" :value="subject">
                    {{ subject }}
                  </option>
                </select>
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="mb-2 block text-sm font-semibold text-gray-900">
                  Nội dung tư vấn <span class="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  rows="5"
                  placeholder="Nhập nội dung cần tư vấn..."
                  class="w-full rounded-xl border-2 border-gray-200 bg-white py-3 px-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  :class="{ 'border-red-500': errors.message }"
                ></textarea>
                <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="!isFormValid || isSubmitting"
                class="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-red-500/30 transition-all hover:scale-105 hover:shadow-red-500/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send class="h-5 w-5" :class="{ 'animate-pulse': isSubmitting }" />
                {{ isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
