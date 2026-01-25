<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
  loading: false,
})

const variantClasses = computed(() => {
  if (props.variant === 'primary') {
    return 'bg-primary-500 text-white shadow-[inset_1px_1px_0_-0.5px_#333,inset_-1px_-1px_0_-0.5px_#262626,inset_0_0_11px_#F2F2F2] backdrop-blur-xl text-[#75010C]'
  } else if (props.variant === 'secondary') {
    return 'bg-white text-primary rounded-[20px] border border-gray-600/50 bg-gray-100/30 backdrop-blur-lg shadow-lg'
  }
  return 'bg-white/50 text-white rounded-[20px] border border-gray-600/50 bg-gray-100/30 backdrop-blur-lg shadow-lg'
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="rounded-3xl px-6 py-2.5 transition-all disabled:cursor-not-allowed disabled:opacity-50"
    :class="variantClasses"
  >
    <span v-if="loading" class="mr-2 inline-block animate-spin">⏳</span>
    <span class="text-base font-semibold leading-[21px] -tracking-[0.31px]">
      <slot />
    </span>
  </button>
</template>
