import { RouterName } from '@/consts'
import { isApp } from '@/utils'

let app = null

class VueConfig {
  static assignConfig(value) {
    const base = location.protocol + '//' + value.baseUrl
    return {
      ...value,
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
  }

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
      return route
    } else if (instance?.$route) {
      return instance.$route
    } else {
      return null
    }
  }

  /**
   * @param {(callback: typeof config) => unknown | Promise<unknown>} callback
   * @return {Promise<void>}
   */
  static async setConfig(callback) {
    await callback(this.value)
  }
}

const config = {
  site_conf: {
    favicon: 'https://eyestudy.org/media/static/eyestudy.ico',
    logo1: 'https://eyestudy.org/media/static/Logo.jpg',
    logo2: '',
    site_name: '',
    domain: process.env.VUE_APP_API_URL,
  },
  baseUrl: process.env.VUE_APP_API_URL,
  env: process.env,
  package: JSON.parse(process.env.VUE_APP_PACKAGE),
  lineLoginRequestParam: {
    response_type: 'code',
    client_id: process.env.VUE_APP_CLIENT_ID,
    nonce: '09876xyz',
    scope: 'profile openid email',
    redirect_uri: location.origin + '/login',
  },
  lineBindRequestParam: {
    response_type: 'code',
    client_id: process.env.VUE_APP_CLIENT_ID,
    nonce: '09876xyz',
    scope: 'profile openid email',
    redirect_uri: location.origin + '/navigation',
  },
  isApp: isApp(),
  liffId: process.env.VUE_APP_LIFF_ID,
  liff: location.host === process.env.VUE_APP_LIFF_HOST,
  authorizationHeaderPrefix: 'Token',
  loginRoutes: [RouterName.LOGIN, RouterName.REGISTER, RouterName.NO_AUTHORIZED],
  ...VueConfig.assignConfig({
    baseUrl: process.env.VUE_APP_API_URL,
  }),
}

VueConfig.value = config

export default VueConfig
