import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { message as Message } from 'ant-design-vue'
import {
  handleRequestHeader,
  handleAuth,
  handleAuthError,
  handleGeneralError,
  handleNetworkError,
  downloadFile
} from './tool'

export const createAxios = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 1000,
    withCredentials: true,
    ...config
  })

  instance.interceptors.request.use((config: any) => {
    return config
  })

  instance.interceptors.response.use(
    (res) => {
      console.log(res)
      const { code, data, message } = res.data
      if (res.data instanceof Blob) {
        return downloadFile(res)
      } else {
        if (code === 200) return data
        else if (code === 401) {
          //todo 跳转login
        } else {
          Message.error(message)
          return Promise.reject(res.data)
        }
      }
    },
    (err) => {
      console.log(err)
      if (err?.response?.status === 401) {
        //todo
      }
      Message.error(err?.response?.data?.message || '服务端异常')
      return Promise.reject(err)
    }
  )

  return instance
}
