<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <header class="bg-moon text-abyss sticky top-0 z-50">
    <div class="mx-auto max-w-360 px-10 py-8.75">
      <div class="flex items-center justify-between">
        <div class="cursor-pointer select-none" @click="router.push('/')">
          <CommonIcon name="logo" class="w-21" />
        </div>

        <div class="flex items-center gap-22.75">
          <nav class="flex items-center gap-14.5 text-[20px]">
            <a href="#" class="hover:text-stone transition-colors">Works</a>
            <a href="#" class="hover:text-stone transition-colors">About</a>
          </nav>

          <div class="lang-start-section flex items-center gap-4">
            <button
                type="button"
                class="w-13 h-13 rounded-full border border-cloud flex items-center justify-center hover:bg-lavender transition-colors cursor-pointer"
                aria-label="Language"
            >
              <CommonIcon name="lang-icon" class="w-6 h-6" />
            </button>

            <button
                type="button"
                class="h-13 w-35.5 px-5 rounded-full bg-abyss hover:bg-lavender transition-colors cursor-pointer"
            >
              <span class="text-moon text-[20px] font-medium">Let's work</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
