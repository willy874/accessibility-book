import { request, authRequest } from './request'

/**
 * @returns {Promise<AxiosResponse<BookModel[]>>  }
 */
export const apiGetBookList = () => request.get(`book/`)

/**
 * @param {number} id
 * @returns {Promise<AxiosResponse<BookModel>>  }
 */
export const apiGetBookById = (id) => request.get(`book/${id}/`)

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
