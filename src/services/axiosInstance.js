import axios from "/node_modules/.vite/deps/axios.js?v=aa4215ab"
import { jwtDecode } from "jwt-decode";

const baseURL = 'http://127.0.0.1:8000/api'

const instance = axios.create({ baseURL })

let isRefreshing = false
let subscribers = []

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime
  } catch (error) {
    return true
  }
}

const onRefreshed = (token) => {
  subscribers.forEach((callback) => callback(token))
  subscribers = []
}

const addSubscriber = (callback) => {
  subscribers.push(callback)
}

instance.interceptors.request.use(async (config) => {

  let access_token = localStorage.getItem('accessToken')
  const refresh_token = localStorage.getItem('refreshToken')

  if (access_token && isTokenExpired(access_token)) {

    if (!isRefreshing) {
      isRefreshing = true

      try {
        const response = await axios.post(`${baseURL}/token/refresh`, {
          refreshToken: refresh_token,
        })

        const { token, refreshToken } = response.data

        localStorage.setItem('accessToken', token)
        localStorage.setItem('refreshToken', refreshToken)

        onRefreshed(token)
      } catch (err) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber((newToken) => {
        config.headers['Authorization'] = `Bearer ${newToken}`
        resolve(config)
      })
    })

    return retryOriginalRequest
  }

  if (access_token) {
    config.headers['Authorization'] = `Bearer ${access_token}`
  }

  return config
})

export default instance;
