export function getRequestSuccess(axios) {
  return () => {
    const token = localStorage.getItem('token')
    axios.headers.Authorization = `Token ${token}`
  }
}

export function getRequestError(axios) {
  return () => {}
}

export function getResponseSuccess(axios) {
  return () => {}
}

export function getResponseError(axios) {
  return () => {}
}

export function getAuthRequestSuccess(axios) {
  return () => {}
}
