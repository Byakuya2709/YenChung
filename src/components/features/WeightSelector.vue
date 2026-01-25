<!-- filepath: src/components/features/WeightSelector.vue -->

<script setup lang="ts">
import StarIcon from '@/components/common/StarIcon.vue'
import type { WeightOption } from '@/types/product'

interface Props {
  weights: WeightOption[]
  modelValue: string
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div>
    <!-- Tiêu đề section -->
    <!-- <div class="mb-3 px-4">
      <h3 class="text-[22px] font-bold leading-7 -tracking-[0.26px] text-white/95">Trọng Lượng:</h3>
    </div> -->

    <!-- Danh sách weight options -->
    <div class="space-y-0">
      <div
        v-for="weight in weights"
        :key="weight.id"
        @click="emit('update:modelValue', weight.id)"
        class="cursor-pointer rounded-xl px-4 py-3 transition-all"
        :class="
          modelValue === weight.id
            ? 'border border-white bg-white shadow-[inset_3px_3px_7px_rgba(136,150,163,0.58),inset_-3px_-3px_7px_white]'
            : 'bg-transparent'
        "
      >
        <div class="flex items-start gap-3">
          <StarIcon :active="modelValue === weight.id" />

          <div class="flex-1">
            <div class="flex items-center justify-between">
              <div
                class="text-[17px] leading-[22px] -tracking-[0.43px]"
                :class="
                  modelValue === weight.id
                    ? 'font-semibold text-[#880912]'
                    : 'font-normal text-white/95'
                "
              >
                {{ weight.name }}
              </div>
              <div
                v-if="modelValue === weight.id"
                class="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200"
              >
                <div class="h-2.5 w-2.5 rounded-full bg-[#980106]"></div>
              </div>
            </div>
            <div
              v-if="weight.extraText"
              class="mt-1 text-[13px] leading-[18px] -tracking-[0.08px]"
              :class="modelValue === weight.id ? 'text-black' : 'text-gray-300'"
            >
              {{ weight.extraText }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
