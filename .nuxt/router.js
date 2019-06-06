import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _527a5b00 = () => import('..\\pages\\cms\\index.vue' /* webpackChunkName: "pages_cms_index" */).then(m => m.default || m)
const _6de158e8 = () => import('..\\pages\\doctor\\index.vue' /* webpackChunkName: "pages_doctor_index" */).then(m => m.default || m)
const _5e1ae2d1 = () => import('..\\pages\\guest\\index.vue' /* webpackChunkName: "pages_guest_index" */).then(m => m.default || m)
const _2179a6c0 = () => import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages_login_index" */).then(m => m.default || m)
const _5092ebec = () => import('..\\pages\\tester\\index.vue' /* webpackChunkName: "pages_tester_index" */).then(m => m.default || m)
const _cc2ae5da = () => import('..\\pages\\cms\\detail.vue' /* webpackChunkName: "pages_cms_detail" */).then(m => m.default || m)
const _0e4cd960 = () => import('..\\pages\\cms\\list.vue' /* webpackChunkName: "pages_cms_list" */).then(m => m.default || m)
const _5d776b76 = () => import('..\\pages\\demo\\bizdatepicker.vue' /* webpackChunkName: "pages_demo_bizdatepicker" */).then(m => m.default || m)
const _3b888205 = () => import('..\\pages\\demo\\bizselect.vue' /* webpackChunkName: "pages_demo_bizselect" */).then(m => m.default || m)
const _04051c40 = () => import('..\\pages\\demo\\cellform.vue' /* webpackChunkName: "pages_demo_cellform" */).then(m => m.default || m)
const _61726516 = () => import('..\\pages\\demo\\docs.vue' /* webpackChunkName: "pages_demo_docs" */).then(m => m.default || m)
const _8f656904 = () => import('..\\pages\\demo\\form.vue' /* webpackChunkName: "pages_demo_form" */).then(m => m.default || m)
const _27731b50 = () => import('..\\pages\\demo\\list.vue' /* webpackChunkName: "pages_demo_list" */).then(m => m.default || m)
const _2199f887 = () => import('..\\pages\\demo\\scroll.vue' /* webpackChunkName: "pages_demo_scroll" */).then(m => m.default || m)
const _c7ea4fc6 = () => import('..\\pages\\demo\\vanform.vue' /* webpackChunkName: "pages_demo_vanform" */).then(m => m.default || m)
const _bf2df182 = () => import('..\\pages\\doctor\\binding.vue' /* webpackChunkName: "pages_doctor_binding" */).then(m => m.default || m)
const _57719c98 = () => import('..\\pages\\doctor\\chart.vue' /* webpackChunkName: "pages_doctor_chart" */).then(m => m.default || m)
const _7d5ec7c1 = () => import('..\\pages\\doctor\\message.vue' /* webpackChunkName: "pages_doctor_message" */).then(m => m.default || m)
const _f5a3e65c = () => import('..\\pages\\doctor\\messagedetail.vue' /* webpackChunkName: "pages_doctor_messagedetail" */).then(m => m.default || m)
const _6daf5e13 = () => import('..\\pages\\doctor\\testerlist.vue' /* webpackChunkName: "pages_doctor_testerlist" */).then(m => m.default || m)
const _70eed695 = () => import('..\\pages\\tester\\collectdetail.vue' /* webpackChunkName: "pages_tester_collectdetail" */).then(m => m.default || m)
const _050cc93c = () => import('..\\pages\\tester\\collectlist.vue' /* webpackChunkName: "pages_tester_collectlist" */).then(m => m.default || m)
const _5a1da127 = () => import('..\\pages\\tester\\detail.vue' /* webpackChunkName: "pages_tester_detail" */).then(m => m.default || m)
const _325dc821 = () => import('..\\pages\\tester\\message.vue' /* webpackChunkName: "pages_tester_message" */).then(m => m.default || m)
const _ccc7f6e0 = () => import('..\\pages\\tester\\messageadd.vue' /* webpackChunkName: "pages_tester_messageadd" */).then(m => m.default || m)
const _15434532 = () => import('..\\pages\\tester\\messagedetail.vue' /* webpackChunkName: "pages_tester_messagedetail" */).then(m => m.default || m)
const _02d986f9 = () => import('..\\pages\\tester\\register.vue' /* webpackChunkName: "pages_tester_register" */).then(m => m.default || m)
const _1927f7e4 = () => import('..\\pages\\wechat\\getopenid.vue' /* webpackChunkName: "pages_wechat_getopenid" */).then(m => m.default || m)
const _51714a8b = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



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
			path: "/cms",
			component: _527a5b00,
			name: "cms"
		},
		{
			path: "/doctor",
			component: _6de158e8,
			name: "doctor"
		},
		{
			path: "/guest",
			component: _5e1ae2d1,
			name: "guest"
		},
		{
			path: "/login",
			component: _2179a6c0,
			name: "login"
		},
		{
			path: "/tester",
			component: _5092ebec,
			name: "tester"
		},
		{
			path: "/cms/detail",
			component: _cc2ae5da,
			name: "cms-detail"
		},
		{
			path: "/cms/list",
			component: _0e4cd960,
			name: "cms-list"
		},
		{
			path: "/demo/bizdatepicker",
			component: _5d776b76,
			name: "demo-bizdatepicker"
		},
		{
			path: "/demo/bizselect",
			component: _3b888205,
			name: "demo-bizselect"
		},
		{
			path: "/demo/cellform",
			component: _04051c40,
			name: "demo-cellform"
		},
		{
			path: "/demo/docs",
			component: _61726516,
			name: "demo-docs"
		},
		{
			path: "/demo/form",
			component: _8f656904,
			name: "demo-form"
		},
		{
			path: "/demo/list",
			component: _27731b50,
			name: "demo-list"
		},
		{
			path: "/demo/scroll",
			component: _2199f887,
			name: "demo-scroll"
		},
		{
			path: "/demo/vanform",
			component: _c7ea4fc6,
			name: "demo-vanform"
		},
		{
			path: "/doctor/binding",
			component: _bf2df182,
			name: "doctor-binding"
		},
		{
			path: "/doctor/chart",
			component: _57719c98,
			name: "doctor-chart"
		},
		{
			path: "/doctor/message",
			component: _7d5ec7c1,
			name: "doctor-message"
		},
		{
			path: "/doctor/messagedetail",
			component: _f5a3e65c,
			name: "doctor-messagedetail"
		},
		{
			path: "/doctor/testerlist",
			component: _6daf5e13,
			name: "doctor-testerlist"
		},
		{
			path: "/tester/collectdetail",
			component: _70eed695,
			name: "tester-collectdetail"
		},
		{
			path: "/tester/collectlist",
			component: _050cc93c,
			name: "tester-collectlist"
		},
		{
			path: "/tester/detail",
			component: _5a1da127,
			name: "tester-detail"
		},
		{
			path: "/tester/message",
			component: _325dc821,
			name: "tester-message"
		},
		{
			path: "/tester/messageadd",
			component: _ccc7f6e0,
			name: "tester-messageadd"
		},
		{
			path: "/tester/messagedetail",
			component: _15434532,
			name: "tester-messagedetail"
		},
		{
			path: "/tester/register",
			component: _02d986f9,
			name: "tester-register"
		},
		{
			path: "/wechat/getopenid",
			component: _1927f7e4,
			name: "wechat-getopenid"
		},
		{
			path: "/",
			component: _51714a8b,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
