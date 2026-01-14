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

const limit = 8
const posts = ref<Awaited<ReturnType<typeof fetchPosts>>>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const loadPosts = async () => {
  isLoading.value = true
  error.value = null
  try {
    posts.value = await fetchPosts(currentPage.value, limit)
  } catch (err) {
    console.error(err)
    error.value = 'Ошибка при загрузке статей'
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

watch(
  currentPage,
  () => {
    loadPosts()
  },
  { immediate: true },
)

useHead({
  title: 'Главная - QTIM Blog',
})
</script>

<template>
  <div class="mx-auto max-w-360 px-28 pt-30 pb-35 text-abyss">
    <section>
      <h1 class="text-[84px] font-normal tracking-tight mb-14.75">
        Articles
      </h1>

      <div v-if="isLoading" class="text-center py-12">
        <p class="text-stone">Loading...</p>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-500 mb-4">{{ error }}</p>
        <button
          @click="loadPosts"
          class="px-4 py-2 bg-ocean text-moon rounded hover:bg-opacity-90"
        >
          Try Again
        </button>
      </div>

      <div v-else-if="posts.length === 0" class="text-center py-12">
        <p class="text-stone">Articles not found</p>
      </div>

      <div v-else>
        <div class="grid gap-8 grid-cols-4 mb-12.5">
          <article
            v-for="(post, idx) in posts"
            :key="post.id"
            class="group cursor-pointer transition-transform duration-300 will-change-transform hover:-translate-y-1"
            @click="router.push(`/blog/${post.id}`)"
          >
            <div class="w-full aspect-square bg-cloud overflow-hidden">
              <img
                v-if="post.image"
                src="~/assets/images/article-img.jpg"
                :alt="post.title"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div class="mt-5">
              <p class="text-sm text-stone mb-3 overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                {{ post.preview }}
              </p>

              <span
                class="text-sm text-lavender opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                Read more
              </span>
            </div>
          </article>
        </div>

        <div class="flex items-center gap-2">
          <button
            v-for="page in pages"
            :key="page"
            @click="goToPage(page)"
            :disabled="isLoading"
            class="h-11 w-11 rounded-xl text-xs font-medium transition-colors flex items-center justify-center"
            :class="[
              currentPage === page
                ? 'bg-abyss text-moon'
                : 'bg-cloud text-abyss hover:bg-stone/25',
              isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="goToNextPage"
            :disabled="currentPage === pages.length || isLoading"
            class="h-11 w-11 rounded-xl border border-cloud flex items-center justify-center text-abyss hover:bg-stone/25 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <CommonIcon name="arrow" class="h-2.5 w-1.25"/>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>