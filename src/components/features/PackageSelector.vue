<!-- filepath: src/components/features/PackageSelector.vue -->

<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import type { PackageOption } from '@/types/product'

interface Props {
  packages: PackageOption[]
  modelValue: number | null
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()
</script>

<template>
  <div>
    <h3 class="mb-3 text-[22px] font-bold leading-7 -tracking-[0.26px] text-white/95">Đóng Gói:</h3>

    <div class="grid grid-cols-4 gap-3">
      <div
        v-for="pkg in packages"
        :key="pkg.id"
        @click="emit('update:modelValue', pkg.id)"
        class="group relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2 transition-all"
        :class="
          modelValue === pkg.id
            ? 'border-primary ring-2 ring-primary ring-offset-2'
            : 'border-gray-200 hover:border-gray-300'
        "
      >
        <img v-if="pkg.image" :src="pkg.image" :alt="pkg.name" class="h-full w-full object-cover" />
        <div v-else class="h-full w-full bg-white"></div>

        <!-- Check Icon -->
        <div
          v-if="modelValue === pkg.id"
          class="absolute inset-0 flex items-center justify-center bg-primary/20"
        >
          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <Check class="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
