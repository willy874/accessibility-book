console.log('process.env', process.env)

export default {
  version: '0.0.1',
  key: '34541f0e1dd79fe7f45803da2061031b696b56f7',
  api: {
    baseUrl: location.protocol + '//' + location.host + '/api',
    headers: {},
  },
  auth: {
    baseUrl: location.protocol + '//' + location.host + '/auth',
    headers: {},
  },
}
