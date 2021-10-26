console.log('process.env', process.env)

export default {
  version: '0.0.1',
  api: {
    baseUrl: location.protocol + '//' + location.host + '/api',
    headers: {},
  },
  auth: {
    baseUrl: location.protocol + '//' + location.host + '/auth',
    headers: {},
  },
}
