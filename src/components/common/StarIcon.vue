<!-- filepath: src/components/common/StarIcon.vue -->

<script setup lang="ts">
interface Props {
  active?: boolean
}

withDefaults(defineProps<Props>(), {
  active: false,
})
</script>

<template>
  <svg
    class="mt-0.5 h-5 w-5 flex-shrink-0"
    :class="active ? 'stroke-[#78000A]' : 'stroke-white/95'"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 1.66669L12.575 6.88335L18.3334 7.72502L14.1667 11.7834L15.15 17.5167L10 14.8084L4.85002 17.5167L5.83335 11.7834L1.66669 7.72502L7.42502 6.88335L10 1.66669Z"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
