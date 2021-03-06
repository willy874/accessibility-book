import { request, authRequest, baseRequest } from './request'
import { formDataFormat, formUrlEncodedFormat } from '@/utils'

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
 * @param {PasswordRegisterRequestParam} data
 * @returns {Promise<AxiosResponse<null>>}
 */
export const apiPostPasswordRegister = (data) => authRequest.post(`password/change/`, data)

/**
 * @param {PasswordChangeRequestParam} data
 * @returns {Promise<AxiosResponse<null>>}
 */
export const apiPostPasswordChange = (data) => authRequest.put(`password/change/`, data)

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
 * @param {UserUpdateRequestParam} data
 * @returns {Promise<AxiosResponse<unknown>>}
 */
export const apiPatchUserInfo = (data) => request.patch(`user/`, formDataFormat(data))

/**
 * @returns {Promise<AxiosResponse<ResponseCollection<BookModel>>>  }
 */
export const apiGetBookList = () => request.get(`book/`)

/**
 * @param {JsonData} query
 * @returns {Promise<AxiosResponse<ResponseCollection<BookModel>>>  }
 */
export const apiGetBookListByQuery = (query) => request.get(`book/`, { params: formUrlEncodedFormat(query) })

/**
 * @param {string} id
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
 * @param {Partial<HistoryRequestParam>} data
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
export const apiDeleteBookMark = (id) => request.delete(`bookmark/${id}/`)

/**
 * @returns {Promise<AxiosResponse<any>>}
 */
export const apiGetMenuJson = () => request.get(`test/`)

/**
 * @returns {Promise<AxiosResponse<ResponseCollection<NewsModel>>>}
 */
export const apiGetNewsList = () => request.get(`news/`)

/**
 * @returns {Promise<AxiosResponse<ResponseCollection<NewsModel>>>}
 */
export const apiGetNewsById = (id) => request.get(`news/${id}/`)

/**
 * @returns {Promise<AxiosResponse<ResponseCollection<SearchModel>>>}
 */
export const apiPostSearch = (data) => request.post(`search/`, data)

/**
 * @returns {Promise<AxiosResponse<SiteConf>>}
 */
export const apiGetSiteConf = () => request.get(`site_conf/`)

export const apiPostRegistration = (data) => authRequest.post(`registration/`, data)
