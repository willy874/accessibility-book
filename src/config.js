const base = 'https://api.pastwind.org'

const config = {
  env: process.env,
  version: '0.0.1',
  liff: location.host === 'tpwlweb.3anology.info',
  base: {
    baseUrl: base,
    headers: {},
  },
  api: {
    baseUrl: base + '/api/v1/',
    headers: {},
  },
  auth: {
    baseUrl: base + '/dj-rest-auth/',
    headers: {},
  },
}

let app = null

class VueConfig {
  static get value() {
    return config
  }

  static setApp(vm) {
    app = vm
  }

  static useApp() {
    return app
  }

  static getRoute(vm) {
    const vue = vm || app
    const { query } = vue.$route
    if (query && query['liff.state']) {
      const { 'liff.state': path } = query
      if (path) {
        const locationData = vue.$router.resolve(path)
        return locationData.route
      } else {
        return null
      }
    } else {
      return vue.$route
    }
  }
}

export default VueConfig
