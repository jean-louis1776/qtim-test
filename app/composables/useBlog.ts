export interface BlogPost {
  id: string
  title: string
  body: string
  createdAt: string
  [key: string]: unknown
}

const API_BASE_URL = 'https://6082e3545dbd2c001757abf5.mockapi.io/qtim-test-work/posts'

export const useBlog = () => {
  const fetchPosts = async (page: number = 1, limit: number = 10) => {
    try {
      return await $fetch<BlogPost[]>(`${API_BASE_URL}`, {
        params: {
          page,
          limit,
        },
      })
    } catch (error) {
      console.error('Error fetching posts:', error)
      throw error
    }
  }

  const fetchPostById = async (id: string) => {
    try {
      return await $fetch<BlogPost>(`${API_BASE_URL}/${id}`)
    } catch (error) {
      console.error('Error fetching post:', error)
      throw error
    }
  }

  return {
    fetchPosts,
    fetchPostById,
  }
}
