import { apiGetUserInfo } from '@/api'

/**
 *
 * @param {UserActionContext} store
 * @returns {UserModel}
 */
export async function fetchUserInfo(store) {
  try {
    const res = await apiGetUserInfo()
    if (res.isAxiosError) {
      throw new Error(res.data.detail)
    }
    store.commit('setUserInfo', res.data)
    return store.state.info
  } catch (error) {}
}
