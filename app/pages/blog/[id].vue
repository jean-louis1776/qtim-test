<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { fetchPostById } = useBlog()

const postId = computed(() => route.params.id as string)
const post = ref<Awaited<ReturnType<typeof fetchPostById>> | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

const loadPost = async () => {
  if (!postId.value) return

  isLoading.value = true
  error.value = null
  try {
    post.value = await fetchPostById(postId.value)
  } catch (err) {
    error.value = 'Ошибка при загрузке статьи'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

watch(postId, () => {
  loadPost()
}, { immediate: true })

useHead({
  title: computed(() => post.value ? `${post.value.title} - Блог` : 'Статья'),
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <button
      @click="router.push('/blog')"
      class="mb-6 text-ocean hover:underline flex items-center gap-2"
    >
      ← Назад к списку статей
    </button>

    <div v-if="isLoading" class="text-center py-12">
      <p class="text-stone">Загрузка статьи...</p>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500 mb-4">{{ error }}</p>
      <button
        @click="loadPost"
        class="px-4 py-2 bg-ocean text-moon rounded hover:bg-opacity-90"
      >
        Попробовать снова
      </button>
    </div>

    <article v-else-if="post" class="max-w-4xl mx-auto">
      <header class="mb-8">
        <h1 class="text-4xl font-bold mb-4 text-charcoal">
          {{ post.title }}
        </h1>
        <div class="text-stone">
          <time :datetime="post.createdAt">
            {{ new Date(post.createdAt).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }) }}
          </time>
        </div>
      </header>

      <div class="prose prose-lg max-w-none">
        <p class="text-charcoal leading-relaxed whitespace-pre-wrap">
          {{ post.body }}
        </p>
      </div>
    </article>

    <div v-else class="text-center py-12">
      <p class="text-stone">Статья не найдена</p>
    </div>
  </div>
</template>

<style scoped>
.prose {
  color: var(--color-charcoal);
}
</style>
