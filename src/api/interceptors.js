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
    if (req.url === 'logout/') {
      const token = localStorage.getItem('token')
      if (token) {
        req.headers.Authorization = `Token ${token}`
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

// :authority: api.pastwind.org
// :method: POST
// :path: /dj-rest-auth/login/
// :scheme: https
// accept: */*
// accept-encoding: gzip, deflate, br
// accept-language: zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7
// content-length: 41
// content-type: application/json; charset=utf-8
// origin: http://127.0.0.1:8000
// referer: http://127.0.0.1:8000/
// sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"
// sec-ch-ua-mobile: ?0
// sec-ch-ua-platform: "Windows"
// user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36
// sec-fetch-dest: empty
// sec-fetch-mode: cors
// sec-fetch-site: cross-site

// Accept: application/json
// Content-Type: application/json
// Referer: http://127.0.0.1:8000/
// sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"
// sec-ch-ua-mobile: ?0
// sec-ch-ua-platform: "Windows"
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36
// X-Client-Version: 0.0.1
