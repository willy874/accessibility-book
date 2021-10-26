const path = require('path')

module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/auth': {
        target: 'https://library.pastwind.org/',
        pathRewrite: { '^/auth': '/dj-rest-auth' },
      },
      '/api': {
        target: 'https://library.pastwind.org/',
        pathRewrite: { '^/api': '/api/v1' },
      },
    },
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
