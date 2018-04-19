module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxtjsvant',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,user-scalable=no' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'format-detection', content: 'email=no' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-touch-fullscreen', content: 'yes' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /**
   *  Customize router mode
   */
  router: {
    mode: 'hash',// "hash" | "history" | "abstract"
  },
  plugins:[
    '~plugins/vant'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      config.devtool = "inline-source-map";
      config.entry.polyfill="eventsource-polyfill";
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
