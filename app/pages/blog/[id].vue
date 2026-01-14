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

watch(
  postId,
  () => {
    loadPost()
  },
  { immediate: true },
)

useHead({
  title: computed(() => (post.value ? `${post.value.title} - Блог` : 'Статья')),
})
</script>

<template>
  <div class="mx-auto max-w-360 px-28 pt-29.75 pb-20 text-abyss">
    <div v-if="isLoading" class="text-center py-12">
      <p class="text-stone">Loading...</p>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500 mb-4">{{ error }}</p>
      <button
        @click="loadPost"
        class="px-4 py-2 bg-ocean text-moon rounded hover:bg-opacity-90"
      >
        Try again
      </button>
    </div>

    <article v-else-if="post">
      <header class="mb-18.25">
        <h1 class="text-[84px] font-normal">
          {{ post.title }}
        </h1>
      </header>

      <div
        v-if="post.image"
        class="mb-20"
      >
        <img
          src="~/assets/images/article-img.jpg"
          :alt="post.title"
          class="w-full max-h-175 object-cover"
        />
      </div>

      <section class="max-w-173.75">
        <p class="mb-8 text-base">
          About
        </p>
        <p class="text-[36px] whitespace-pre-wrap tracking-[124%]">
          {{ post.description }}
        </p>
      </section>
    </article>

    <div v-else class="text-center py-12">
      <p class="text-stone">Article not found</p>
    </div>
  </div>
</template>
