import { request, authRequest } from './request'

const apiGetChapterById = (id) => request.get(`chapter/${id}/`)

/**
 * @param {LoginRequestParam} data
 * @returns {Promise<AxiosResponse<LoginResponseData>>  }
 */
function apiPostUser(data) {
  return authRequest.post(`login/`, data)
}

export { apiPostUser, apiGetChapterById }
