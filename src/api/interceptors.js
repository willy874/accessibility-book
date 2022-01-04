import Config from '@/config'
import { RouterName, HttpCode, StorageKey } from '@/consts'

/**
 * @param {InterceptorsOptions} options
 * @return {InterceptorsClosure<AxiosRequestConfig>}
 */
export function getRequestSuccess(options) {
  return (req) => {
    const token = localStorage.getItem(StorageKey.TOKEN)
    req.headers.Authorization = Config.value.authorizationHeaderPrefix + ' ' + token
    return req
  }
}

/**
 * @param {InterceptorsOptions} options
 * @return {InterceptorsClosure<AxiosError>}
 */
export function getRequestError(options) {
  return (error) => error
}

/**
 * @param {InterceptorsOptions} options
 * @return {InterceptorsClosure<AxiosResponse>}
 */
export function getResponseSuccess(options) {
  return (res) => res
}

/**
 * @param {InterceptorsOptions} options
 * @return {InterceptorsClosure<AxiosError>}
 */
export function getResponseError(options) {
  return (error) => {
    /** @type {Vue} */
    const vm = Config.useApp()
    /** @type {Route} */
    const route = Config.getRoute()
    /** @type {XMLHttpRequest} */
    const request = error.request
    /** @type {number} */
    const status = request.status
    switch (status) {
      case HttpCode.CLIENT_ERROR:
        console.error('Client Error')
        break
      case HttpCode.UNAUTHORIZED:
        if (!route) return
        localStorage.setItem(StorageKey.REPLACE_PATH, route.path)
        localStorage.removeItem(StorageKey.TOKEN)
        vm.$router.replace({ name: RouterName.LOGIN })
        break
      case HttpCode.FORBIDDEN:
        if (!route) return
        localStorage.setItem(StorageKey.REPLACE_PATH, route.path)
        localStorage.removeItem(StorageKey.TOKEN)
        vm.$router.replace({ name: RouterName.LOGIN })
        break
      case HttpCode.NOT_FOUND:
        console.error('Not Found')
        break
      case HttpCode.METHOD_NOT_ALLOWED:
        console.error('Method Not Allowed')
        break
      case HttpCode.Not_ACCEPTABLE:
        console.error('Not Acceptable')
        break
      case HttpCode.TIMEOUT:
        console.error('Timeout')
        break
      case HttpCode.SERVER_ERROR:
        console.error('Server Error')
        break
      case HttpCode.NOT_IMPLEMENTED:
        console.error('Not Implemented')
        break
      case HttpCode.SERVICE_UNAVAILABLE:
        console.error('Service Unavailable')
        break
      default:
        break
    }
    return error
  }
}

/**
 * @param {InterceptorsOptions} options
 * @return {InterceptorsClosure<AxiosRequestConfig>}
 */
export function getAuthRequestSuccess(options) {
  return (req) => {
    if (req.url === 'logout/') {
      const token = localStorage.getItem(StorageKey.TOKEN)
      if (token) {
        req.headers.Authorization = Config.value.authorizationHeaderPrefix + ' ' + token
      }
    }
    return req
  }
}

/**
 * @param {InterceptorsOptions} options
 * @return {InterceptorsClosure<AxiosRequestConfig>}
 */
export function getBaseRequestSuccess(options) {
  return (req) => {
    return req
  }
}
