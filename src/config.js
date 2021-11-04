console.log('process.env', process.env)

export default {
  version: '0.0.1',
  key: '8cbf85baafa13a8062883bbd5412c7e85a90c7a8',
  api: {
    baseUrl: location.protocol + '//' + location.host + '/api',
    headers: {},
  },
  auth: {
    baseUrl: location.protocol + '//' + location.host + '/auth',
    headers: {},
  },
}
