const path = require('path')

module.exports = {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    host: '127.0.0.1',
    port: 8000,
    // proxy: {
    //   '/root': {
    //     target: 'https://library.pastwind.org/',
    //     pathRewrite: {
    //       '^/root': '/',
    //     },
    //   },
    //   '/auth': {
    //     target: 'https://library.pastwind.org/',
    //     pathRewrite: {
    //       '^/auth': '/dj-rest-auth',
    //     },
    //     onProxyReq(proxyReq, req, res) {
    //       const cookie = req.headers.cookie
    //       if (cookie) {
    //         proxyReq.setHeader('cookie', '')
    //       }
    //     },
    //   },
    //   '/api': {
    //     target: 'https://library.pastwind.org/',
    //     pathRewrite: {
    //       '^/api': '/api/v1',
    //     },
    //   },
    // },
  },
  css: {
    sourceMap: true,
  },
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {
      files: ['src/**/*.{vue,htm,html,css,sss,less,scss}'],
    },
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/style/_variables.scss'),
        path.resolve(__dirname, './src/style/_mixins.scss'),
        path.resolve(__dirname, `./src/style/_functions.scss`),
      ],
    },
  },
  chainWebpack: (config) => {
    config.plugin('stylelint').use('stylelint-webpack-plugin')
  },
}
