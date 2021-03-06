import axios from 'axios'

let baseURL = ''
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://api.music.lizhiwen.online'
}

const service = axios.create({
  baseURL,
  timeout: 5000
})

/* service.interceptors.request.use(config => {
  return config
}, err => {
  // console.log(err) // debug
  return Promise.reject(err)
})

service.interceptors.response.use(res => {
  return res
}, err => {
  // console.log(err) // debug
  Promise.reject(err)
}) */

export default service
