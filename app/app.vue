<template>
  <div class="app min-h-screen flex flex-col">
    <Header/>
    <main class="flex-1">
      <NuxtPage/>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Тестовое для QTIM',
})
</script>