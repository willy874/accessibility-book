import router from '@/router'
import cookie from 'js-cookie'

export function getRequestSuccess(options) {
  return (req) => {
    const token = localStorage.getItem('token')
    req.headers.Authorization = `Token ${token}`
    return req
  }
}

export function getRequestError(options) {
  return (error) => error
}

export function getResponseSuccess(options) {
  return (res) => res
}

export function getResponseError(options) {
  return (error) => {
    const status = error?.response.status
    if (status === 401 || status === 403) {
      router.replace('/login')
    }
    return error
  }
}

export function getAuthRequestSuccess(options) {
  return (req) => {
    cookie.remove('sessionid')
    cookie.remove('csrftoken')
    return req
  }
}
