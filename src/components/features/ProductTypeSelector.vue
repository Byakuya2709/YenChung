<!-- filepath: src/components/features/ProductTypeSelector.vue -->

<script setup lang="ts">
import StarIcon from '@/components/common/StarIcon.vue'
import type { ProductType } from '@/types/product'

interface Props {
  types: ProductType[]
  modelValue: string
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="space-y-0">
    <div
      v-for="type in types"
      :key="type.id"
      @click="emit('update:modelValue', type.id)"
      class="cursor-pointer rounded-xl px-4 py-3 transition-all"
      :class="
        modelValue === type.id
          ? 'border border-white bg-white shadow-[inset_3px_3px_7px_rgba(136,150,163,0.58),inset_-3px_-3px_7px_white]'
          : 'bg-transparent'
      "
    >
      <div class="flex items-start gap-3">
        <StarIcon :active="modelValue === type.id" />

        <div class="flex-1">
          <div class="flex items-center justify-between">
            <div
              class="text-[17px] leading-[22px] -tracking-[0.43px]"
              :class="
                modelValue === type.id
                  ? 'font-semibold text-[#880912]'
                  : 'font-normal text-white/95'
              "
            >
              {{ type.name }}
            </div>
            <div
              v-if="modelValue === type.id"
              class="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200"
            >
              <div class="h-2.5 w-2.5 rounded-full bg-[#9B0104]"></div>
            </div>
          </div>
          <div
            class="mt-1 text-[13px] leading-[18px] -tracking-[0.08px]"
            :class="modelValue === type.id ? 'text-black' : 'text-gray-300'"
          >
            {{ type.basePrice ? type.basePrice.toLocaleString('vi-VN') + 'đ' : type.priceText }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
