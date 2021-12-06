const config = {
  env: process.env,
  version: '0.0.1',
  liff: false,
  base: {
    baseUrl: location.protocol + '//' + location.host + '/root',
    headers: {},
  },
  api: {
    baseUrl: location.protocol + '//' + location.host + '/api',
    headers: {},
  },
  auth: {
    baseUrl: location.protocol + '//' + location.host + '/auth',
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
}

export default VueConfig
