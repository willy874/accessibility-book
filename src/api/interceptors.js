import Config from '@/config'
import consts from '@/consts'

/**
 * @enum {number}
 * @readonly
 */
const HttpCode = consts.httpCode

/**
 * @param {InterceptorsOptions} options
 * @return {InterceptorsClosure<AxiosRequestConfig>}
 */
export function getRequestSuccess(options) {
  return (req) => {
    const token = localStorage.getItem('token')
    req.headers.Authorization = `Token ${token}`
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
    const route = vm.$router.currentRoute

    const status = error?.response?.status
    switch (status) {
      case HttpCode.CLIENT_ERROR:
        console.error('Client Error')
        break
      case HttpCode.UNAUTHORIZED:
        vm.$router.replace({ name: 'Login', query: { replacePath: route.path } })
        break
      case HttpCode.FORBIDDEN:
        vm.$router.replace({ name: 'Login', query: { replacePath: route.path } })
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
    return req
  }
}
