module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        }
      ]
    },
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        store: '@/store',
        views: '@/views',
        networks: '@/networks',
        common: '@/common',
        plugin: '@/plugin'
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import "~assets/css/mixin.scss";
        `
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_SERVER_URL,
        https: false,
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
