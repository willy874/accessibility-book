import { RouterName } from '@/consts'
import { isApp } from '@/utils'

const base = location.protocol + '//' + process.env.VUE_APP_API_URL

const config = {
  env: process.env,
  package: JSON.parse(process.env.VUE_APP_PACKAGE),
  lineLoginRequestParam: {
    response_type: 'code',
    client_id: process.env.VUE_APP_CLIENT_ID,
    nonce: '09876xyz',
    scope: 'profile openid email',
    redirect_uri: location.origin + '/login',
  },
  isApp: isApp(),
  liffId: process.env.VUE_APP_LIFF_ID,
  liff: location.host === process.env.VUE_APP_LIFF_HOST,
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
  storage: localStorage,
  loginRoutes: [RouterName.LOGIN, RouterName.REGISTER, RouterName.NO_AUTHORIZED],
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

  /**
   * @param {Vue} vm
   * @returns {Route}
   */
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
