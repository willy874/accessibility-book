import { request, authRequest } from './request'

/**
 * @param {number} id
 * @returns {Promise<AxiosResponse<ChapterModel>>  }
 */
export const apiGetChapterById = (id) => request.get(`chapter/${id}/`)

/**
 * @param {LoginRequestParam} data
 * @returns {Promise<AxiosResponse<LoginResponseData>>}
 */
export const apiPostUser = (data) => authRequest.post(`login/`, data)
