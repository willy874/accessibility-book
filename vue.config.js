const path = require('path')
const fs = require('fs')
const packagePath = path.join(process.cwd(), 'package.json')
const packageJson = fs.readFileSync(packagePath).toString()
process.env.VUE_APP_PACKAGE = packageJson

module.exports = {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    host: '127.0.0.1',
    port: 8000,
    https: true,
    hotOnly: false,
    proxy: {
      '/api': {
        target: `https://${process.env.VUE_APP_API_URL}`,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
      '/dj-rest-auth': {
        target: `https://${process.env.VUE_APP_API_URL}`,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/dj-rest-auth': '/dj-rest-auth',
        },
      },
    },
  },
  css: {
    sourceMap: true,
  },
  pluginOptions: {
    lintStyleOnBuild: false,
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
