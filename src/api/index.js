import { request, authRequest } from './request'

export const apiGetChapterById = (id) => request.get(`chapter/${id}/`)

export const apiPostUser = (user) => authRequest.post(`login/`, user)
