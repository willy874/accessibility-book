import { request } from './request'

export const apiGetChapterById = (id) => request.get(`chapter/${id}/`)
