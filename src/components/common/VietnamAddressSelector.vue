<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { ChevronDown, Loader2 } from 'lucide-vue-next'

interface Props {
  modelValue: {
    province: string
    district: string
    ward: string
  }
  error?: string
}

interface Emits {
  (e: 'update:modelValue', value: { province: string; district: string; ward: string }): void
}

interface Province {
  code: number
  name: string
}

interface District {
  code: number
  name: string
}

interface Ward {
  code: number
  name: string
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedProvince = ref(props.modelValue.province)
const selectedDistrict = ref(props.modelValue.district)
const selectedWard = ref(props.modelValue.ward)

const provinces = ref<Province[]>([])
const districts = ref<District[]>([])
const wards = ref<Ward[]>([])

const isLoadingProvinces = ref(false)
const isLoadingDistricts = ref(false)
const isLoadingWards = ref(false)

// Load danh sách tỉnh/thành phố
async function loadProvinces() {
  isLoadingProvinces.value = true
  try {
    const response = await fetch('https://provinces.open-api.vn/api/p/')
    const data = await response.json()
    provinces.value = data.sort((a: Province, b: Province) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error('Lỗi tải danh sách tỉnh/thành:', error)
  } finally {
    isLoadingProvinces.value = false
  }
}

// Load danh sách quận/huyện theo tỉnh
async function loadDistricts(provinceCode: number) {
  isLoadingDistricts.value = true
  districts.value = []
  wards.value = []
  try {
    const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
    const data = await response.json()
    districts.value = data.districts.sort((a: District, b: District) =>
      a.name.localeCompare(b.name),
    )
  } catch (error) {
    console.error('Lỗi tải danh sách quận/huyện:', error)
  } finally {
    isLoadingDistricts.value = false
  }
}

// Load danh sách phường/xã theo quận
async function loadWards(districtCode: number) {
  isLoadingWards.value = true
  wards.value = []
  try {
    const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
    const data = await response.json()
    wards.value = data.wards.sort((a: Ward, b: Ward) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error('Lỗi tải danh sách phường/xã:', error)
  } finally {
    isLoadingWards.value = false
  }
}

// Watch changes và emit
watch([selectedProvince, selectedDistrict, selectedWard], () => {
  emit('update:modelValue', {
    province: selectedProvince.value,
    district: selectedDistrict.value,
    ward: selectedWard.value,
  })
})

// Watch province change
watch(selectedProvince, async (newValue) => {
  selectedDistrict.value = ''
  selectedWard.value = ''
  if (newValue) {
    const province = provinces.value.find((p) => p.name === newValue)
    if (province) {
      await loadDistricts(province.code)
    }
  } else {
    districts.value = []
    wards.value = []
  }
})

// Watch district change
watch(selectedDistrict, async (newValue) => {
  selectedWard.value = ''
  if (newValue) {
    const district = districts.value.find((d) => d.name === newValue)
    if (district) {
      await loadWards(district.code)
    }
  } else {
    wards.value = []
  }
})

onMounted(() => {
  loadProvinces()
})
</script>

<template>
  <div class="space-y-4">
    <!-- Tỉnh/Thành phố -->
    <div>
      <label class="mb-2 block text-sm font-semibold text-gray-700">
        Tỉnh/Thành phố
        <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <select
          v-model="selectedProvince"
          :disabled="isLoadingProvinces"
          class="w-full appearance-none rounded-xl border border-gray-300 px-4 py-3 pr-10 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-gray-100"
          :class="error ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : ''"
        >
          <option value="">-- Chọn Tỉnh/Thành phố --</option>
          <option v-for="province in provinces" :key="province.code" :value="province.name">
            {{ province.name }}
          </option>
        </select>
        <Loader2
          v-if="isLoadingProvinces"
          class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-primary"
        />
        <ChevronDown
          v-else
          class="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>

    <!-- Quận/Huyện -->
    <div>
      <label class="mb-2 block text-sm font-semibold text-gray-700">
        Quận/Huyện
        <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <select
          v-model="selectedDistrict"
          :disabled="!selectedProvince || isLoadingDistricts"
          class="w-full appearance-none rounded-xl border border-gray-300 px-4 py-3 pr-10 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
          :class="error ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : ''"
        >
          <option value="">-- Chọn Quận/Huyện --</option>
          <option v-for="district in districts" :key="district.code" :value="district.name">
            {{ district.name }}
          </option>
        </select>
        <Loader2
          v-if="isLoadingDistricts"
          class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-primary"
        />
        <ChevronDown
          v-else
          class="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>

    <!-- Phường/Xã -->
    <div>
      <label class="mb-2 block text-sm font-semibold text-gray-700">
        Phường/Xã
        <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <select
          v-model="selectedWard"
          :disabled="!selectedDistrict || isLoadingWards"
          class="w-full appearance-none rounded-xl border border-gray-300 px-4 py-3 pr-10 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
          :class="error ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : ''"
        >
          <option value="">-- Chọn Phường/Xã --</option>
          <option v-for="ward in wards" :key="ward.code" :value="ward.name">
            {{ ward.name }}
          </option>
        </select>
        <Loader2
          v-if="isLoadingWards"
          class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-primary"
        />
        <ChevronDown
          v-else
          class="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  </div>
</template>
