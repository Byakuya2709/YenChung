<!-- filepath: src/components/common/QuantityCounter.vue -->

<script setup lang="ts">
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
  <div
    class="flex items-center gap-4 rounded-full border border-gray-600/50 bg-white/10 px-3 py-2 shadow-lg backdrop-blur-md"
  >
    <button
      @click="decrement"
      :disabled="modelValue <= min"
      class="w-6 text-center text-xl font-semibold text-white/95 transition-opacity hover:opacity-80 disabled:opacity-50"
    >
      -
    </button>
    <div class="min-w-[20px] text-center text-base font-semibold text-white/95">
      {{ modelValue }}
    </div>
    <button
      @click="increment"
      :disabled="max !== undefined && modelValue >= max"
      class="w-6 text-center text-xl font-semibold text-white/95 transition-opacity hover:opacity-80 disabled:opacity-50"
    >
      +
    </button>
  </div>
</template>
