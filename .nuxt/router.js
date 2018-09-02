import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _545b81c0 = () => import('..\\pages\\doctor\\index.vue' /* webpackChunkName: "pages_doctor_index" */).then(m => m.default || m)
const _4841cbc0 = () => import('..\\pages\\tester\\index.vue' /* webpackChunkName: "pages_tester_index" */).then(m => m.default || m)
const _5393c3c6 = () => import('..\\pages\\guest\\index.vue' /* webpackChunkName: "pages_guest_index" */).then(m => m.default || m)
const _2acc70cc = () => import('..\\pages\\cms\\index.vue' /* webpackChunkName: "pages_cms_index" */).then(m => m.default || m)
const _675e67ec = () => import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages_login_index" */).then(m => m.default || m)
const _4791eba8 = () => import('..\\pages\\demo\\cellform.vue' /* webpackChunkName: "pages_demo_cellform" */).then(m => m.default || m)
const _1b573955 = () => import('..\\pages\\tester\\message.vue' /* webpackChunkName: "pages_tester_message" */).then(m => m.default || m)
const _f8640f7c = () => import('..\\pages\\wechat\\getopenid.vue' /* webpackChunkName: "pages_wechat_getopenid" */).then(m => m.default || m)
const _03300134 = () => import('..\\pages\\tester\\messagedetail.vue' /* webpackChunkName: "pages_tester_messagedetail" */).then(m => m.default || m)
const _5e0bfd0e = () => import('..\\pages\\demo\\bizdatepicker.vue' /* webpackChunkName: "pages_demo_bizdatepicker" */).then(m => m.default || m)
const _157896dc = () => import('..\\pages\\tester\\messageadd.vue' /* webpackChunkName: "pages_tester_messageadd" */).then(m => m.default || m)
const _71d68f72 = () => import('..\\pages\\cms\\detail.vue' /* webpackChunkName: "pages_cms_detail" */).then(m => m.default || m)
const _05a15ad4 = () => import('..\\pages\\tester\\collectlist.vue' /* webpackChunkName: "pages_tester_collectlist" */).then(m => m.default || m)
const _ed3b0f1a = () => import('..\\pages\\doctor\\binding.vue' /* webpackChunkName: "pages_doctor_binding" */).then(m => m.default || m)
const _6e52c706 = () => import('..\\pages\\doctor\\messagedetail.vue' /* webpackChunkName: "pages_doctor_messagedetail" */).then(m => m.default || m)
const _5a1390c9 = () => import('..\\pages\\tester\\collectdetail.vue' /* webpackChunkName: "pages_tester_collectdetail" */).then(m => m.default || m)
const _cc95985a = () => import('..\\pages\\demo\\scroll.vue' /* webpackChunkName: "pages_demo_scroll" */).then(m => m.default || m)
const _2ce81f42 = () => import('..\\pages\\doctor\\testerlist.vue' /* webpackChunkName: "pages_doctor_testerlist" */).then(m => m.default || m)
const _729f7cd8 = () => import('..\\pages\\cms\\list.vue' /* webpackChunkName: "pages_cms_list" */).then(m => m.default || m)
const _405010a4 = () => import('..\\pages\\demo\\list.vue' /* webpackChunkName: "pages_demo_list" */).then(m => m.default || m)
const _2481f339 = () => import('..\\pages\\demo\\bizselect.vue' /* webpackChunkName: "pages_demo_bizselect" */).then(m => m.default || m)
const _23506bc1 = () => import('..\\pages\\demo\\docs.vue' /* webpackChunkName: "pages_demo_docs" */).then(m => m.default || m)
const _390e3c45 = () => import('..\\pages\\tester\\register.vue' /* webpackChunkName: "pages_tester_register" */).then(m => m.default || m)
const _38573973 = () => import('..\\pages\\tester\\detail.vue' /* webpackChunkName: "pages_tester_detail" */).then(m => m.default || m)
const _665838f5 = () => import('..\\pages\\doctor\\message.vue' /* webpackChunkName: "pages_doctor_message" */).then(m => m.default || m)
const _0c56e9ca = () => import('..\\pages\\demo\\form.vue' /* webpackChunkName: "pages_demo_form" */).then(m => m.default || m)
const _3a846a68 = () => import('..\\pages\\doctor\\chart.vue' /* webpackChunkName: "pages_doctor_chart" */).then(m => m.default || m)
const _f0ce2682 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/doctor",
			component: _545b81c0,
			name: "doctor"
		},
		{
			path: "/tester",
			component: _4841cbc0,
			name: "tester"
		},
		{
			path: "/guest",
			component: _5393c3c6,
			name: "guest"
		},
		{
			path: "/cms",
			component: _2acc70cc,
			name: "cms"
		},
		{
			path: "/login",
			component: _675e67ec,
			name: "login"
		},
		{
			path: "/demo/cellform",
			component: _4791eba8,
			name: "demo-cellform"
		},
		{
			path: "/tester/message",
			component: _1b573955,
			name: "tester-message"
		},
		{
			path: "/wechat/getopenid",
			component: _f8640f7c,
			name: "wechat-getopenid"
		},
		{
			path: "/tester/messagedetail",
			component: _03300134,
			name: "tester-messagedetail"
		},
		{
			path: "/demo/bizdatepicker",
			component: _5e0bfd0e,
			name: "demo-bizdatepicker"
		},
		{
			path: "/tester/messageadd",
			component: _157896dc,
			name: "tester-messageadd"
		},
		{
			path: "/cms/detail",
			component: _71d68f72,
			name: "cms-detail"
		},
		{
			path: "/tester/collectlist",
			component: _05a15ad4,
			name: "tester-collectlist"
		},
		{
			path: "/doctor/binding",
			component: _ed3b0f1a,
			name: "doctor-binding"
		},
		{
			path: "/doctor/messagedetail",
			component: _6e52c706,
			name: "doctor-messagedetail"
		},
		{
			path: "/tester/collectdetail",
			component: _5a1390c9,
			name: "tester-collectdetail"
		},
		{
			path: "/demo/scroll",
			component: _cc95985a,
			name: "demo-scroll"
		},
		{
			path: "/doctor/testerlist",
			component: _2ce81f42,
			name: "doctor-testerlist"
		},
		{
			path: "/cms/list",
			component: _729f7cd8,
			name: "cms-list"
		},
		{
			path: "/demo/list",
			component: _405010a4,
			name: "demo-list"
		},
		{
			path: "/demo/bizselect",
			component: _2481f339,
			name: "demo-bizselect"
		},
		{
			path: "/demo/docs",
			component: _23506bc1,
			name: "demo-docs"
		},
		{
			path: "/tester/register",
			component: _390e3c45,
			name: "tester-register"
		},
		{
			path: "/tester/detail",
			component: _38573973,
			name: "tester-detail"
		},
		{
			path: "/doctor/message",
			component: _665838f5,
			name: "doctor-message"
		},
		{
			path: "/demo/form",
			component: _0c56e9ca,
			name: "demo-form"
		},
		{
			path: "/doctor/chart",
			component: _3a846a68,
			name: "doctor-chart"
		},
		{
			path: "/",
			component: _f0ce2682,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
