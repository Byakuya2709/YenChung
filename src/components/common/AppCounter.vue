<template>
  <div
    class="flex items-center gap-4 px-3 py-2 rounded-full border border-gray-600/50 bg-white/10 backdrop-blur-md shadow-lg"
  >
    <button
      @click="decrement"
      :disabled="modelValue <= min"
      class="text-white/95 text-xl font-semibold w-6 text-center hover:opacity-80 transition-opacity disabled:opacity-50"
    >
      -
    </button>
    <div class="text-white/95 text-base font-semibold min-w-[20px] text-center">
      {{ modelValue }}
    </div>
    <button
      @click="increment"
      :disabled="max !== undefined && modelValue >= max"
      class="text-white/95 text-xl font-semibold w-6 text-center hover:opacity-80 transition-opacity disabled:opacity-50"
    >
      +
    </button>
  </div>
</template>

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
