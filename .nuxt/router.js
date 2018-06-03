import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _2de98545 = () => import('..\\pages\\tester\\index.vue' /* webpackChunkName: "pages_tester_index" */).then(m => m.default || m)
const _7e655fc7 = () => import('..\\pages\\cms\\index.vue' /* webpackChunkName: "pages_cms_index" */).then(m => m.default || m)
const _b3342636 = () => import('..\\pages\\doctor\\index.vue' /* webpackChunkName: "pages_doctor_index" */).then(m => m.default || m)
const _32ccaea8 = () => import('..\\pages\\cms\\detail.vue' /* webpackChunkName: "pages_cms_detail" */).then(m => m.default || m)
const _76e95abc = () => import('..\\pages\\demo\\docs.vue' /* webpackChunkName: "pages_demo_docs" */).then(m => m.default || m)
const _6378c300 = () => import('..\\pages\\tester\\register.vue' /* webpackChunkName: "pages_tester_register" */).then(m => m.default || m)
const _0077e40a = () => import('..\\pages\\tester\\collectlist.vue' /* webpackChunkName: "pages_tester_collectlist" */).then(m => m.default || m)
const _34c835f1 = () => import('..\\pages\\doctor\\chart.vue' /* webpackChunkName: "pages_doctor_chart" */).then(m => m.default || m)
const _5f746eda = () => import('..\\pages\\doctor\\message.vue' /* webpackChunkName: "pages_doctor_message" */).then(m => m.default || m)
const _d82e00c2 = () => import('..\\pages\\demo\\list.vue' /* webpackChunkName: "pages_demo_list" */).then(m => m.default || m)
const _279a32ee = () => import('..\\pages\\tester\\detail.vue' /* webpackChunkName: "pages_tester_detail" */).then(m => m.default || m)
const _0a6706ee = () => import('..\\pages\\tester\\collectdetail.vue' /* webpackChunkName: "pages_tester_collectdetail" */).then(m => m.default || m)
const _58e28644 = () => import('..\\pages\\demo\\bizdatepicker.vue' /* webpackChunkName: "pages_demo_bizdatepicker" */).then(m => m.default || m)
const _14736f3a = () => import('..\\pages\\tester\\message.vue' /* webpackChunkName: "pages_tester_message" */).then(m => m.default || m)
const _690bf8b2 = () => import('..\\pages\\demo\\cellform.vue' /* webpackChunkName: "pages_demo_cellform" */).then(m => m.default || m)
const _5fefd8c5 = () => import('..\\pages\\demo\\form.vue' /* webpackChunkName: "pages_demo_form" */).then(m => m.default || m)
const _7f100739 = () => import('..\\pages\\cms\\list.vue' /* webpackChunkName: "pages_cms_list" */).then(m => m.default || m)
const _1d9e291e = () => import('..\\pages\\demo\\bizselect.vue' /* webpackChunkName: "pages_demo_bizselect" */).then(m => m.default || m)
const _236fb45a = () => import('..\\pages\\doctor\\testerlist.vue' /* webpackChunkName: "pages_doctor_testerlist" */).then(m => m.default || m)
const _a28914ea = () => import('..\\pages\\tester\\messagedetail.vue' /* webpackChunkName: "pages_tester_messagedetail" */).then(m => m.default || m)
const _1ea63d2b = () => import('..\\pages\\doctor\\messagedetail.vue' /* webpackChunkName: "pages_doctor_messagedetail" */).then(m => m.default || m)
const _afc16638 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



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
    mode: 'hash',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/tester",
			component: _2de98545,
			name: "tester"
		},
		{
			path: "/cms",
			component: _7e655fc7,
			name: "cms"
		},
		{
			path: "/doctor",
			component: _b3342636,
			name: "doctor"
		},
		{
			path: "/cms/detail",
			component: _32ccaea8,
			name: "cms-detail"
		},
		{
			path: "/demo/docs",
			component: _76e95abc,
			name: "demo-docs"
		},
		{
			path: "/tester/register",
			component: _6378c300,
			name: "tester-register"
		},
		{
			path: "/tester/collectlist",
			component: _0077e40a,
			name: "tester-collectlist"
		},
		{
			path: "/doctor/chart",
			component: _34c835f1,
			name: "doctor-chart"
		},
		{
			path: "/doctor/message",
			component: _5f746eda,
			name: "doctor-message"
		},
		{
			path: "/demo/list",
			component: _d82e00c2,
			name: "demo-list"
		},
		{
			path: "/tester/detail",
			component: _279a32ee,
			name: "tester-detail"
		},
		{
			path: "/tester/collectdetail",
			component: _0a6706ee,
			name: "tester-collectdetail"
		},
		{
			path: "/demo/bizdatepicker",
			component: _58e28644,
			name: "demo-bizdatepicker"
		},
		{
			path: "/tester/message",
			component: _14736f3a,
			name: "tester-message"
		},
		{
			path: "/demo/cellform",
			component: _690bf8b2,
			name: "demo-cellform"
		},
		{
			path: "/demo/form",
			component: _5fefd8c5,
			name: "demo-form"
		},
		{
			path: "/cms/list",
			component: _7f100739,
			name: "cms-list"
		},
		{
			path: "/demo/bizselect",
			component: _1d9e291e,
			name: "demo-bizselect"
		},
		{
			path: "/doctor/testerlist",
			component: _236fb45a,
			name: "doctor-testerlist"
		},
		{
			path: "/tester/messagedetail",
			component: _a28914ea,
			name: "tester-messagedetail"
		},
		{
			path: "/doctor/messagedetail",
			component: _1ea63d2b,
			name: "doctor-messagedetail"
		},
		{
			path: "/",
			component: _afc16638,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
