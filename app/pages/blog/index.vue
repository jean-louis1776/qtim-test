<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { fetchPosts } = useBlog()

const currentPage = computed(() => {
  const page = Number(route.query.page) || 1
  return page > 0 ? page : 1
})

// фронтовая пагинация: фиксированное количество страниц
const totalPages = 5
const pages = computed(() => Array.from({ length: totalPages }, (_, i) => i + 1))

const limit = 10
const posts = ref<Awaited<ReturnType<typeof fetchPosts>>>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const loadPosts = async () => {
  isLoading.value = true
  error.value = null
  try {
    posts.value = await fetchPosts(currentPage.value, limit)
  } catch (err) {
    error.value = 'Ошибка при загрузке статей'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const goToPage = (page: number) => {
  router.push({ query: { page } })
}

const goToNextPage = () => {
  if (currentPage.value < totalPages) {
    goToPage(currentPage.value + 1)
  }
}

watch(currentPage, () => {
  loadPosts()
}, { immediate: true })

useHead({
  title: 'Блог - Список статей',
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-charcoal">Блог</h1>

    <div v-if="isLoading" class="text-center py-12">
      <p class="text-stone">Загрузка статей...</p>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">{{ error }}</p>
      <button
        @click="loadPosts"
        class="mt-4 px-4 py-2 bg-ocean text-moon rounded hover:bg-opacity-90"
      >
        Попробовать снова
      </button>
    </div>

    <div v-else-if="posts.length === 0" class="text-center py-12">
      <p class="text-stone">Статьи не найдены</p>
    </div>

    <div v-else>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <article
          v-for="post in posts"
          :key="post.id"
          class="bg-cloud rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
          @click="router.push(`/blog/${post.id}`)"
        >
          <h2 class="text-xl font-bold mb-3 text-charcoal line-clamp-2">
            {{ post.title }}
          </h2>
          <p class="text-stone mb-4 line-clamp-3">
            {{ post.body }}
          </p>
          <div class="flex items-center justify-between">
            <span class="text-sm text-stone">
              {{ new Date(post.createdAt).toLocaleDateString('ru-RU') }}
            </span>
            <span class="text-ocean font-medium">Читать далее →</span>
          </div>
        </article>
      </div>

      <!-- Пагинация -->
      <div class="flex items-center justify-center gap-3 mt-10">
        <button
          v-for="page in pages"
          :key="page"
          @click="goToPage(page)"
          :disabled="isLoading"
          class="w-10 h-10 rounded-full text-sm font-medium transition-colors flex items-center justify-center"
          :class="[
            currentPage === page
              ? 'bg-black text-white'
              : 'bg-cloud text-charcoal hover:bg-stone',
            isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
          ]"
        >
          {{ page }}
        </button>

        <button
          @click="goToNextPage"
          :disabled="currentPage === pages.length || isLoading"
          class="w-10 h-10 rounded-full border border-cloud flex items-center justify-center text-charcoal hover:bg-cloud transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          ➜
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
