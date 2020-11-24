import axios from 'axios'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(config => {
  return config
}, err => {
  console.log(err) // debug
  return Promise.reject(err)
})

service.interceptors.response.use(res => {
  return res
}, err => {
  console.log(err) // debug
  Promise.reject(err)
})

export default service
