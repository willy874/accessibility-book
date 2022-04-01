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
  loginRoutes: [RouterName.LOGIN, RouterName.REGISTER, RouterName.NO_AUTHORIZED],
}

let app = null

class VueConfig {
  static setApp(vm) {
    app = vm
  }

  static useApp() {
    return app
  }

  /**
   * @param {Vue} [vm]
   * @returns {Route}
   */
  static getRoute(vm) {
    const instance = vm || app
    const LiifQuery = instance?.$route?.query?.['liff.state']
    if (LiifQuery) {
      const route = instance.$router.resolve(LiifQuery).route
      console.log(window.location)
      console.log(instance.$store.state?.route)
      return route
    } else if (instance?.$route) {
      return instance.$route
    } else {
      return null
    }
  }
}

VueConfig.value = config

export default VueConfig
