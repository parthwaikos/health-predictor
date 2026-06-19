import axios from 'axios'
import { API_ENDPOINTS } from '@/utils/constants'

const apiClient = axios.create({
  baseURL: API_ENDPOINTS.PREDICT.split('/api')[0],
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred'
    return Promise.reject(new Error(message))
  }
)

export const healthApi = {
  async predict(data) {
    return apiClient.post('/api/predict', data)
  },

  async chatbot(question) {
    return apiClient.get('/api/chatbot', { params: { question } })
  },

  async getReport(predictionId) {
    return apiClient.get(`/api/report/${predictionId}`)
  },

  async healthCheck() {
    return apiClient.get('/api/health')
  },
}

export default apiClient
