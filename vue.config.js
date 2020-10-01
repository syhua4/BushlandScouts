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
        networks: '@/networks',
        store: '@/store',
        views: '@/views',
        utils: '@/utils',
        theme: '@/theme'
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
  }
};
