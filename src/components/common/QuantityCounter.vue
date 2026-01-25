<!-- filepath: src/components/common/QuantityCounter.vue -->

<script setup lang="ts">
import { Minus, Plus } from 'lucide-vue-next'

interface Props {
  modelValue: number
  min?: number
  max?: number
}

const props = withDefaults(defineProps<Props>(), {
  min: 1,
  max: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

function increment() {
  if (props.max === undefined || props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}

function decrement() {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1)
  }
}
</script>

<template>
  <div class="inline-flex items-center rounded-lg border border-gray-300 bg-white">
    <button
      @click="decrement"
      :disabled="modelValue <= min"
      class="p-2 transition-colors hover:bg-gray-50 disabled:opacity-50"
    >
      <Minus class="h-5 w-5 text-gray-700" />
    </button>

    <div class="min-w-[3rem] px-4 text-center font-semibold text-gray-900">
      {{ modelValue }}
    </div>

    <button
      @click="increment"
      :disabled="max !== undefined && modelValue >= max"
      class="p-2 transition-colors hover:bg-gray-50 disabled:opacity-50"
    >
      <Plus class="h-5 w-5 text-gray-700" />
    </button>
  </div>
</template>
