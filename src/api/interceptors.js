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
    if (status === HttpCode.CLIENT_ERROR) {
      console.error('Client Error')
    }
    if (status === HttpCode.UNAUTHORIZED) {
      vm.$router.replace({ name: 'Login', query: { replacePath: route.path } })
    }
    if (status === HttpCode.FORBIDDEN) {
      vm.$router.replace({ name: 'Login', query: { replacePath: route.path } })
    }
    if (status === HttpCode.NOT_FOUND) {
      console.error('Not Found')
    }
    if (status === HttpCode.METHOD_NOT_ALLOWED) {
      console.error('Method Not Allowed')
    }
    if (status === HttpCode.Not_ACCEPTABLE) {
      console.error('Not Acceptable')
    }
    if (status === HttpCode.TIMEOUT) {
      console.error('Timeout')
    }
    if (status === HttpCode.SERVER_ERROR) {
      console.error('Server Error')
    }
    if (status === HttpCode.NOT_IMPLEMENTED) {
      console.error('Not Implemented')
    }
    if (status === HttpCode.SERVICE_UNAVAILABLE) {
      console.error('Service Unavailable')
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
