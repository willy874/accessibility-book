import { RouterName } from '@/consts'

const base = 'https://api.pastwind.org'

const config = {
  env: process.env,
  lineLoginRequestParam: {
    response_type: 'code',
    client_id: '1656649897',
    nonce: '09876xyz',
    scope: 'profile openid email',
    redirect_uri: location.origin + '/login',
  },
  version: '0.0.1',
  liffId: '1656538444-L3wP67PM',
  liff: location.host === 'tpwlweb.3anology.info',
  authorizationHeaderPrefix: 'Token',
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
  /**
   * @type {RouterName[]}
   */
  loginRoutes: [RouterName.LOGIN, RouterName.REGISTER],
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
    const instance = vm || app
    const LiifQuery = instance?.$route?.query?.['liff.state']
    if (LiifQuery) {
      return instance.$router.resolve(LiifQuery)
    } else if (instance?.$route) {
      return instance.$route
    } else {
      return null
    }
  }
}

export default VueConfig
