<!-- filepath: src/components/features/VolumeSelector.vue -->

<script setup lang="ts">
interface Props {
  volumes: string[]
  modelValue: string
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div>
    <div
      class="mb-4 h-px w-full bg-[#AC7F5E]/20 shadow-[0_0_19px_white,0_10px_10px_rgba(255,255,255,0.25)] backdrop-blur-[2px]"
    ></div>

    <h3 class="mb-3 text-[22px] font-bold leading-7 -tracking-[0.26px] text-white/95">Thể Tích:</h3>

    <div
      class="flex items-center gap-0 rounded-full border border-gray-600/50 bg-white/10 p-0.5 backdrop-blur-md"
    >
      <button
        v-for="volume in volumes"
        :key="volume"
        @click="emit('update:modelValue', volume)"
        class="flex-1 rounded-full py-1.5 text-center text-[17px] leading-[22px] -tracking-[0.43px] transition-all"
        :class="
          modelValue === volume
            ? 'border border-white bg-[#E8EBEE] font-semibold text-[#840510] shadow-[inset_3px_3px_7px_rgba(136,150,163,0.58),inset_-3px_-3px_7px_white]'
            : 'font-normal text-white/95'
        "
      >
        {{ volume }}
      </button>
    </div>
  </div>
</template>
