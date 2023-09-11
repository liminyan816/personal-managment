import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const service = axios.create({
  baseURL: 'mock',
  timeout: 5000
})

service.interceptors.request.use((config) => {
  nprogress.start();
  return config
})

service.interceptors.response.use((response) => {
  nprogress.done();
  return response.data
},(error) => {
  nprogress.done();
  return error
})

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}

export default service;