import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export interface BlogPost {
  id: string
  title: string
  createdAt: string
  image?: string
  preview?: string
  description?: string
  [key: string]: unknown
}

const API_BASE_URL = 'https://6082e3545dbd2c001757abf5.mockapi.io/qtim-test-work/posts'
const PER_PAGE = 8

export const useBlogStore = defineStore('blog', () => {
  const allPosts = ref<BlogPost[]>([])
  const postsByPage = ref<Record<number, BlogPost[]>>({})
  const totalCount = ref(0)
  const isLoadingPosts = ref(false)
  const postsError = ref<string | null>(null)

  const postDetails = ref<Record<string, BlogPost>>({})
  const isLoadingPost = ref(false)
  const postError = ref<string | null>(null)

  const totalPages = computed(() => {
    if (!totalCount.value) {
      return 0
    }

    return Math.ceil(totalCount.value / PER_PAGE)
  })

  const fetchPosts = async (page: number = 1) => {
    // Если страница уже в кеше, возвращаем её
    if (postsByPage.value[page]) {
      return postsByPage.value[page]
    }

    // Если все посты уже загружены, просто нарезаем нужную страницу
    if (allPosts.value.length > 0) {
      const startIdx = (page - 1) * PER_PAGE
      const endIdx = startIdx + PER_PAGE
      postsByPage.value[page] = allPosts.value.slice(startIdx, endIdx)
      return postsByPage.value[page]
    }

    // Загружаем все посты один раз
    isLoadingPosts.value = true
    postsError.value = null

    try {
      const response = await $fetch<BlogPost[]>(`${API_BASE_URL}`)

      if (response) {
        allPosts.value = response
        totalCount.value = response.length

        // Нарезаем запрошенную страницу
        const startIdx = (page - 1) * PER_PAGE
        const endIdx = startIdx + PER_PAGE
        postsByPage.value[page] = response.slice(startIdx, endIdx)
      }

      return postsByPage.value[page]
    } catch (error) {
      postsError.value = 'Ошибка при загрузке статей'
      throw error
    } finally {
      isLoadingPosts.value = false
    }
  }

  const fetchPostById = async (id: string) => {
    if (!id) {
      return null
    }

    if (postDetails.value[id]) {
      postError.value = null
      return postDetails.value[id]
    }

    isLoadingPost.value = true
    postError.value = null

    try {
      const post = await $fetch<BlogPost>(`${API_BASE_URL}/${id}`)
      postDetails.value = {
        ...postDetails.value,
        [id]: post,
      }
      return post
    } catch (error) {
      postError.value = 'Ошибка при загрузке статьи'
      throw error
    } finally {
      isLoadingPost.value = false
    }
  }

  const clearPostsError = () => {
    postsError.value = null
  }

  const clearPostError = () => {
    postError.value = null
  }

  return {
    allPosts,
    postsByPage,
    postDetails,
    totalCount,
    totalPages,
    isLoadingPosts,
    isLoadingPost,
    postsError,
    postError,
    perPage: PER_PAGE,
    fetchPosts,
    fetchPostById,
    clearPostsError,
    clearPostError,
  }
})
