<!-- filepath: src/components/features/ProductImages.vue -->

<script setup lang="ts">
interface Props {
  images: string[]
  productName?: string
}

withDefaults(defineProps<Props>(), {
  productName: 'Sản phẩm',
})
</script>

<template>
  <div class="relative z-10 flex justify-center gap-4 pb-4 pt-14">
    <img
      v-for="(image, index) in images"
      :key="index"
      :src="image"
      :alt="`${productName} ${index + 1}`"
      class="h-24 w-32 rounded-xl object-cover"
    />
  </div>
</template>
