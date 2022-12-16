import axios from 'axios'
import { message } from 'ant-design-vue'

const service = axios.create({
  timeout: 10000
})

service.interceptors.request.use()

service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
