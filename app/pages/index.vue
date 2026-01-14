<script setup lang="ts">
const router = useRouter()
const { fetchPosts } = useBlog()

const posts = ref<Awaited<ReturnType<typeof fetchPosts>>>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const loadPosts = async () => {
  isLoading.value = true
  error.value = null
  try {
    // Загружаем первые 6 статей для главной
    posts.value = await fetchPosts(1, 6)
  } catch (err) {
    console.error(err)
    error.value = 'Ошибка при загрузке статей'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadPosts()
})

useHead({
  title: 'Главная - QTIM Blog',
})
</script>

<template>
  <div class="container mx-auto px-4 py-16">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <div class="mb-8">
        <CommonIcon name="logo" class="w-24 h-24 mx-auto mb-6" />
      </div>
      <h1 class="text-5xl font-bold mb-6 text-charcoal">
        Добро пожаловать в QTIM Blog
      </h1>
      <p class="text-xl text-stone">
        Читайте интересные статьи и будьте в курсе последних новостей
      </p>
    </div>

    <section>
      <h2 class="text-2xl font-bold mb-6 text-charcoal">
        Последние статьи
      </h2>

      <div v-if="isLoading" class="text-center py-12">
        <p class="text-stone">Загрузка статей...</p>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-500 mb-4">{{ error }}</p>
        <button
          @click="loadPosts"
          class="px-4 py-2 bg-ocean text-moon rounded hover:bg-opacity-90"
        >
          Попробовать снова
        </button>
      </div>

      <div v-else-if="posts.length === 0" class="text-center py-12">
        <p class="text-stone">Статьи не найдены</p>
      </div>

      <div v-else>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
          <article
            v-for="post in posts"
            :key="post.id"
            class="bg-cloud rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            @click="router.push(`/blog/${post.id}`)"
          >
            <h3 class="text-xl font-bold mb-3 text-charcoal line-clamp-2">
              {{ post.title }}
            </h3>
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

        <div class="text-center">
          <NuxtLink
            to="/blog"
            class="inline-block px-8 py-4 bg-ocean text-moon rounded-lg font-semibold hover:bg-opacity-90 transition-colors shadow-lg"
          >
            Все статьи блога →
          </NuxtLink>
        </div>
      </div>
    </section>
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