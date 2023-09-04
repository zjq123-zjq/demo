import axios, { type Method } from 'axios'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { showToast } from 'vant'
import type { Data } from '@/types/request'
const service = axios.create({
  baseURL: '/dev-api',
  timeout: 10000
})

service.interceptors.request.use(
  function (config) {
    const store = useUserStore()
    if (store.user?.token) {
      config.headers.Authorization = `Bearer ${store.user.token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  function (res) {
    if (res.data.code !== 10000) {
      showToast(res.data?.message)
      return Promise.reject(res.data)
    }
    return res.data
  },
  function (error) {
    if (error.response.status === 401) {
      const store = useUserStore()
      store.delUser()
      router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(error)
  }
)

const request = <T>(url: string, method: Method, data?: any) => {
  return service.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}

export default request
