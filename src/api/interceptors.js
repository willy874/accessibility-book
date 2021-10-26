export function getRequestSuccess(axios) {
  return (req) => req
}

export function getRequestError(axios) {
  return (error) => error
}

export function getResponseSuccess(axios) {
  return (res) => res
}

export function getResponseError(axios) {
  return (error) => error
}

export function getAuthRequestSuccess(axios) {
  return (req) => req
}
