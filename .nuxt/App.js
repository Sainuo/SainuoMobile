import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '..\\static\\css\\theme\\default.css'

import '..\\static\\css\\schema.default.css'

import '..\\static\\css\\rich_media_content.css'

import '..\\static\\css\\app.css'

import '..\\static\\css\\fontawesome\\font-awesome-4.7.0\\css\\font-awesome.css'


let layouts = {

  "_default": () => import('..\\layouts\\default.vue'  /* webpackChunkName: "layouts_default" */).then(m => m.default || m)

}

let resolvedLayouts = {}

export default {
  head: {"title":"赛诺制药","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width,user-scalable=no"},{"name":"format-detection","content":"telephone=no"},{"name":"format-detection","content":"email=no"},{"name":"apple-mobile-web-app-capable","content":"yes"},{"name":"apple-touch-fullscreen","content":"yes"},{"hid":"description","name":"description","content":"Nuxt.js project"}],"script":[{"src":"\u002Fjavascript\u002Fxscroll\u002Fbuild\u002Fstandalone\u002Fxscroll.min.js"},{"src":"\u002Fjavascript\u002Fxscroll\u002Fbuild\u002Fstandalone\u002Fplugins\u002Fpulldown.min.js"},{"src":"\u002Fjavascript\u002Fxscroll\u002Fbuild\u002Fstandalone\u002Fplugins\u002Fpullup.min.js"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"}],"style":[]},
  render(h, props) {
    const loadingEl = h('nuxt-loading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      }
    }, [ templateEl ])

    return h('div',{
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },
  
  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },
  
  methods: {
    
    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },
    
    setLayout (layout) {
      if (!layout || !resolvedLayouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      this.layout = resolvedLayouts[_layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !(layouts['_' + layout] || resolvedLayouts['_' + layout])) layout = 'default'
      let _layout = '_' + layout
      if (resolvedLayouts[_layout]) {
        return Promise.resolve(resolvedLayouts[_layout])
      }
      return layouts[_layout]()
      .then((Component) => {
        resolvedLayouts[_layout] = Component
        delete layouts[_layout]
        return resolvedLayouts[_layout]
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
      })
    }
  },
  components: {
    NuxtLoading
  }
}

