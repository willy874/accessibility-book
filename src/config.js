export default {
  version: '0.0.1',
  api: {
    baseUrl: location.protocol + '//' + process.env.APP_VUE_BASE_URL + '/api',
    headers: {},
  },
  auth: {
    baseUrl: location.protocol + '//' + process.env.APP_VUE_BASE_URL + '/auth',
    headers: {},
  },
}
