import axios from 'axios'

const BASE_URL = 'http://localhost:5001' // Change this

function createApiClient(path: string) {
  const client = axios.create({
    baseURL: `${BASE_URL}/${path}`,
  })

  client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  return client
}

export const authClient = createApiClient('auth')
export const auditClient = createApiClient('audit')
