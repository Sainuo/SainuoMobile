module.exports = {
  css: [
    '~/static/css/theme/default.css',
    '~/static/css/schema.default.css',
    '~/static/css/rich_media_content.css',
    '~/static/css/app.css',
    '~/static/css/fontawesome/font-awesome-4.7.0/css/font-awesome.css',
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: '赛诺制药',    
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,user-scalable=no' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'format-detection', content: 'email=no' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-touch-fullscreen', content: 'yes' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    script: [
      { src: "/javascript/xscroll/build/standalone/xscroll.min.js" },
      { src: "/javascript/xscroll/build/standalone/plugins/pulldown.min.js" },
      { src: "/javascript/xscroll/build/standalone/plugins/pullup.min.js" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /**
   *  Customize router mode
   */
  router: {
    mode: 'history',// "hash" | "history" | "abstract"
  },
  plugins: [
    '~/plugins/vant',
    '~/plugins/vant-lazyload',
    '~/plugins/vant-doc',
    "~/plugins/axios-global-error",
    "~/plugins/vue-filters"
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
    extend(config, { isDev, isClient }) {
      config.entry.babelpolyfill = "babel-polyfill";
      if (isDev && isClient) {
        config.devtool = "inline-source-map";

        config.entry.eventsourcepolyfill = "eventsource-polyfill";

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
