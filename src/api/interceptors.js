import router from '@/router'
export function getRequestSuccess(axios) {
  return (req) => {
    return req
  }
}

export function getRequestError(axios) {
  return (error) => error
}

export function getResponseSuccess(axios) {
  return (res) => res
}

export function getResponseError(axios) {
  return (error) => {
    const status = error?.response.status
    if (status === 401 || status === 403) {
      router.replace('/login')
    }
    return error
  }
}

export function getAuthRequestSuccess(axios) {
  return (req) => {
    return req
  }
}
