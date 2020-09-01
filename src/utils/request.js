import axios from 'axios'

const service = axios.create({
  // process.env.NODE_ENV === 'development' 来判断是否开发环境
  // easy-mock服务挂了，暂时不使用了
  // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
  timeout: 5000
})

service.interceptors.request.use(
  request => {
    request.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return request
  },
  error => {
    console.log('req err:', error)
    return Promise.reject(new Error())
  }
)

service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data
    } else {
      return response
    }
  },
  error => {
    return error.response
  }
)

export default service
