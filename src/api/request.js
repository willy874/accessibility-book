import Axios from 'axios'
import config from '@/config'
import {
  getRequestSuccess,
  getRequestError,
  getResponseSuccess,
  getResponseError,
  getAuthRequestSuccess,
} from './interceptors'

/**
 * api
 */
export const instance = function () {
  const axios = Axios.create({
    baseURL: `${config.api.baseUrl}`,
    headers: {
      'X-Client-Version': config.version,
      accept: 'application/json',
      ...config.api.headers,
    },
  })
  const token = localStorage.getItem('token')
  axios.defaults.headers.Authorization = `Token ${token}`

  axios.interceptors.request.use(getRequestSuccess(axios), getRequestError(axios))
  axios.interceptors.response.use(getResponseSuccess(axios), getResponseError(axios))

  return axios
}

export const request = instance()

/**
 * auth
 */
export const authInstance = function () {
  const axios = Axios.create({
    baseURL: `${config.auth.baseUrl}`,
    headers: {
      'X-Client-Version': config.version,
      accept: 'application/json',
      ...config.auth.headers,
    },
  })

  axios.interceptors.request.use(getAuthRequestSuccess(axios), getRequestError(axios))
  axios.interceptors.response.use(getResponseSuccess(axios), getResponseError(axios))

  return axios
}

export const authRequest = authInstance()
