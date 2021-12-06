const config = {
  env: process.env,
  version: '0.0.1',
  liff: true,
  base: {
    baseUrl: 'https://library.pastwind.org/',
    headers: {},
  },
  api: {
    baseUrl: 'https://library.pastwind.org/api/v1',
    headers: {},
  },
  auth: {
    baseUrl: 'https://library.pastwind.org/dj-rest-auth',
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
