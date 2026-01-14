<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <header class="bg-abyss text-moon shadow-md">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div
          class="flex items-center gap-3 cursor-pointer"
          @click="router.push('/')"
        >
          <CommonIcon name="logo" class="w-8 h-8" />
          <span class="text-xl font-bold">QTIM Blog</span>
        </div>

        <nav class="flex items-center gap-6">
          <NuxtLink
            to="/"
            class="hover:text-lavender transition-colors"
            active-class="text-ocean"
          >
            Главная
          </NuxtLink>
          <NuxtLink
            to="/blog"
            class="hover:text-lavender transition-colors"
            active-class="text-ocean"
          >
            Блог
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 100;
}
</style>
