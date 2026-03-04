import axios from 'axios'

export function useApi(baseUrl) {
  const apiBaseUrl = baseUrl || import.meta.env.VITE_API_BASE_URL
  const TOKEN = 'v-token'

  const apiClient = axios.create({
    baseURL: apiBaseUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  apiClient.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem(TOKEN)

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => Promise.reject(error),
  )

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('Erro na requisição', error.response?.data || error.message)
      return Promise.reject(error)
    },
  )

  return apiClient
}
