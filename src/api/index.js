import { request, authRequest, baseRequest } from './request'

/**
 * @returns {Promise<AxiosResponse<BookModel[]>>  }
 */
export const apiGetBookList = () => request.get(`book/`)

/**
 * @returns {Promise<AxiosResponse<UserModel>>  }
 */
export const apiGetUserInfo = () => request.get(`user/`)

/**
 * @param {number} id
 * @returns {Promise<AxiosResponse<BookModel>>  }
 */
export const apiGetBookById = (id) => request.get(`book/${id}/`)

/**
 * @returns {Promise<AxiosResponse<TagModel[]>>  }
 */
export const apiGetTagList = () => request.get(`tag/`)

/**
 * @param {number} id
 * @returns {Promise<AxiosResponse<ChapterModel>>  }
 */
export const apiGetChapterById = (id) => request.get(`chapter/${id}/`)

/**
 * @param {number} id
 * @returns {Promise<AxiosResponse<ChapterModel>>  }
 */
export const apiGetChapterByTag = (id) => request.get(`chapter/?tag=${id}`)

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
export const apiPostRegister = (data) => authRequest.get(`registration/`, data)

/**
 * @returns {Promise<AxiosResponse<null>>}
 */
export const apiPostSocialAccounts = () => baseRequest.get(`socialaccounts/`)

/**
 * @param {number} id
 * @returns {Promise<AxiosResponse<null>>}
 */
export const apiPostSocialAccountsDisconnectedById = (id) => baseRequest.post(`socialaccounts/${id}/disconnect/`)

/**
 * @param {HistoryRequestParam} data
 * @returns {Promise<AxiosResponse<HistoryCreateResponse>>}
 */
export const apiPostHistory = (data) => request.post(`history/`, data)

/**
 * @returns {Promise<AxiosResponse<BookMarkModel[]>>}
 */
export const apiGetBookMark = () => request.get(`bookmark/`)

/**
 * @param {BookMarkRequestParam} data
 * @returns {Promise<AxiosResponse<BookMarkModel>>}
 */
export const apiPostBookMark = (data) => request.post(`bookmark/`, data)
