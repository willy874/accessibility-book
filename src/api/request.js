import Axios from 'axios'
import Config from '@/config'
import {
  getRequestSuccess,
  getRequestError,
  getResponseSuccess,
  getResponseError,
  getAuthRequestSuccess,
  getBaseRequestSuccess,
} from './interceptors'

const config = Config.value

/**
 * api
 */
export const instance = function (options) {
  const axios = Axios.create({
    baseURL: `${config.api.baseUrl}`,
    headers: {
      'X-Client-Version': config.version,
      accept: 'application/json',
      ...config.api.headers,
    },
  })
  axios.interceptors.request.use(getRequestSuccess(options), getRequestError(options))
  axios.interceptors.response.use(getResponseSuccess(options), getResponseError(options))

  return axios
}

export const request = instance()

/**
 * auth
 */
export const authInstance = function (options) {
  const axios = Axios.create({
    baseURL: `${config.auth.baseUrl}`,
    headers: {
      'X-Client-Version': config.version,
      accept: 'application/json',
      ...config.auth.headers,
    },
  })

  axios.interceptors.request.use(getAuthRequestSuccess(options), getRequestError(options))
  axios.interceptors.response.use(getResponseSuccess(options), getResponseError(options))

  return axios
}

export const authRequest = authInstance()

/**
 * root
 */
export const baseInstance = function (options) {
  const axios = Axios.create({
    baseURL: `${config.base.baseUrl}`,
    headers: {
      'X-Client-Version': config.version,
      accept: 'application/json',
      ...config.base.headers,
    },
  })

  axios.interceptors.request.use(getBaseRequestSuccess(options), getRequestError(options))
  axios.interceptors.response.use(getResponseSuccess(options), getResponseError(options))

  return axios
}
export const baseRequest = baseInstance()
