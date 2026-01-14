<template>
  <div class="app min-h-screen flex flex-col">
    <CommonHeader />
    <main class="flex-1">
      <NuxtPage/>
    </main>
    <CommonFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Тестовое для QTIM',
})
</script>