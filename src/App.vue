<!-- filepath: src/App.vue -->

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="relative flex-1 pb-20 sm:pb-0">
      <RouterView />
    </main>
    <!-- <AppFooter /> -->
  </div>
</template>
