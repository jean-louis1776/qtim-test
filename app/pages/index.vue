<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBlogStore } from '~~/stores/blog'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()
const { postsByPage, isLoadingPosts, postsError, totalPages } = storeToRefs(blogStore)

const currentPage = computed(() => {
  const page = Number(route.query.page) || 1
  return page > 0 ? page : 1
})

const posts = computed(() => postsByPage.value[currentPage.value] ?? [])

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const maxVisible = 5

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  // Логика для показа 5 страниц с текущей в центре (когда возможно)
  let start = Math.max(1, current - 2)
  const end = Math.min(total, start + maxVisible - 1)

  // Корректируем start если end упирается в конец
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const isLoading = computed(() => isLoadingPosts.value)
const error = computed(() => postsError.value)

const loadPosts = async () => {
  try {
    await blogStore.fetchPosts(currentPage.value)

    if (totalPages.value && currentPage.value > totalPages.value) {
      router.replace({ query: { page: totalPages.value } })
    }
  } catch (err) {
    console.error(err)
  }
}

const goToPage = (page: number) => {
  router.push({ query: { page } })
}

const goToPrevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1)
  }
}

const goToNextPage = () => {
  if (totalPages.value && currentPage.value < totalPages.value) {
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
          class="px-4 py-2 bg-ocean text-moon rounded hover:bg-opacity-90 cursor-pointer"
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
            v-for="post in posts"
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
              <p class="text-sm text-abyss mb-3 overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
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

        <div v-if="totalPages > 1" class="flex items-center gap-2">
          <button
            @click="goToPrevPage"
            :disabled="currentPage === 1 || isLoading"
            class="h-11 w-11 rounded-xl border border-cloud flex items-center justify-center text-abyss hover:bg-stone/25 transition-colors disabled:hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed rotate-180 cursor-pointer"
          >
            <CommonIcon name="arrow" class="h-2.5 w-1.25"/>
          </button>

          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            :disabled="isLoading"
            class="h-11 w-11 rounded-xl text-xs font-medium transition-colors flex items-center justify-center cursor-pointer"
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
            :disabled="currentPage >= totalPages || isLoading"
            class="h-11 w-11 rounded-xl border border-cloud flex items-center justify-center text-abyss hover:bg-stone/25 transition-colors disabled:hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <CommonIcon name="arrow" class="h-2.5 w-1.25"/>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>