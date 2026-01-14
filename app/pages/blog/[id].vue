<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBlogStore } from '~~/stores/blog'

const route = useRoute()
const blogStore = useBlogStore()
const { postDetails, isLoadingPost, postError } = storeToRefs(blogStore)

const postId = computed(() => route.params.id as string)
const post = computed(() => postDetails.value[postId.value] ?? null)
const isLoading = computed(() => isLoadingPost.value)
const error = computed(() => postError.value)

const loadPost = async () => {
  if (!postId.value) return

  try {
    await blogStore.fetchPostById(postId.value)
  } catch (err) {
    console.error(err)
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
        class="px-4 py-2 bg-ocean text-moon rounded hover:bg-opacity-90 cursor-pointer"
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
