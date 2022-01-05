import { request, authRequest, baseRequest } from './request'

/**
 * @param {LoginRequestParam} data
 * @returns {Promise<AxiosResponse<LoginResponseData>>}
 */
export const apiPostUserLogin = (data) => authRequest.post(`login/`, data)

/**
 * @returns {Promise<AxiosResponse<null>>}
 */
export const apiPostLogout = () => authRequest.post(`logout/`)

/**
 * @param {LineLoginRequestParam} data
 * @returns {Promise<AxiosResponse<LoginResponseData>>}
 */
export const apiPostLineLogin = (data) => authRequest.post(`line/`, data)

/**
 * @returns {Promise<AxiosResponse<LoginResponseData>>}
 */
export const apiPostLineConnect = () => authRequest.post(`line/connect/`)

/**
 * @param {RegisterRequestParam} data
 * @returns {Promise<AxiosResponse<LoginResponseData>>}
 */
export const apiPostRegister = (data) => authRequest.post(`registration/`, data)

/**
 * @returns {Promise<AxiosResponse<null>>}
 */
export const apiGetSocialAccounts = () => baseRequest.get(`socialaccounts/`)

/**
 * @param {number} id
 * @returns {Promise<AxiosResponse<null>>}
 */
export const apiPostSocialAccountsDisconnectedById = (id) => baseRequest.post(`socialaccounts/${id}/disconnect/`)

/**
 * @returns {Promise<AxiosResponse<UserModel>>  }
 */
export const apiGetUserInfo = () => request.get(`user/`)

/**
 * @returns {Promise<AxiosResponse<ResponseCollection<BookModel>>>  }
 */
export const apiGetBookList = () => request.get(`book/`)

/**
 * @param {number} id
 * @returns {Promise<AxiosResponse<BookModel>>  }
 */
export const apiGetBookById = (id) => request.get(`book/${id}/`)

/**
 * @returns {Promise<AxiosResponse<ResponseCollection<TagModel>>>  }
 */
export const apiGetTagList = () => request.get(`tag/`)

/**
 * @param {number} id
 * @returns {Promise<AxiosResponse<ChapterModel>>  }
 */
export const apiGetChapterById = (id) => request.get(`chapter/${id}/`)

/**
 * @param {number} id
 * @returns {Promise<AxiosResponse<ResponseCollection<ChapterModel>>>  }
 */
export const apiGetChapterListByTagId = (id) => request.get(`chapter/?tag=${id}`)

/**
 * @returns {Promise<AxiosResponse<ResponseCollection<HistoryModel>>>}
 */
export const apiGetHistoryList = () => request.get(`history/`)

/**
 * @param {HistoryRequestParam} data
 * @returns {Promise<AxiosResponse<HistoryCreateResponse>>}
 */
export const apiPostHistory = (data) => request.post(`history/`, data)

/**
 * @returns {Promise<AxiosResponse<ResponseCollection<BookMarkModel>>>}
 */
export const apiGetBookMarkList = () => request.get(`bookmark/`)

/**
 * @param {BookMarkRequestParam} data
 * @returns {Promise<AxiosResponse<ResponseCollection<BookMarkModel>>>}
 */
export const apiPostBookMark = (data) => request.post(`bookmark/`, data)

/**
 * @param {number} id
 * @returns {Promise<AxiosResponse<null>>}
 */
export const apiDeleteBookMark = (id) => request.delete(`bookmark/${id}`)

/**
 * @returns {Promise<AxiosResponse<unknown>>}
 */
export const apiGetMenuJson = () => request.get(`test/`)
