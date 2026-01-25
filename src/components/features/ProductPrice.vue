<!-- filepath: src/components/features/ProductPrice.vue -->

<script setup lang="ts">
interface Props {
  price: string
}

defineProps<Props>()
</script>

<template>
  <div class="absolute left-7 top-4 z-20 text-[34px] font-bold leading-tight text-white">
    {{ price }}
  </div>
</template>
