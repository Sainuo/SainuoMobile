import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _2ac8c41f = () => import('..\\pages\\tester\\index.vue' /* webpackChunkName: "pages_tester_index" */).then(m => m.default || m)
const _556fc1a6 = () => import('..\\pages\\cms\\index.vue' /* webpackChunkName: "pages_cms_index" */).then(m => m.default || m)
const _b975a882 = () => import('..\\pages\\doctor\\index.vue' /* webpackChunkName: "pages_doctor_index" */).then(m => m.default || m)
const _6c0ed606 = () => import('..\\pages\\cms\\detail.vue' /* webpackChunkName: "pages_cms_detail" */).then(m => m.default || m)
const _cb30a480 = () => import('..\\pages\\doctor\\testerlist.vue' /* webpackChunkName: "pages_doctor_testerlist" */).then(m => m.default || m)
const _2a6881f6 = () => import('..\\pages\\demo\\list.vue' /* webpackChunkName: "pages_demo_list" */).then(m => m.default || m)
const _6467cbbc = () => import('..\\pages\\demo\\docs.vue' /* webpackChunkName: "pages_demo_docs" */).then(m => m.default || m)
const _925acfaa = () => import('..\\pages\\demo\\form.vue' /* webpackChunkName: "pages_demo_form" */).then(m => m.default || m)
const _31a774cb = () => import('..\\pages\\doctor\\chart.vue' /* webpackChunkName: "pages_doctor_chart" */).then(m => m.default || m)
const _bd014198 = () => import('..\\pages\\doctor\\message.vue' /* webpackChunkName: "pages_doctor_message" */).then(m => m.default || m)
const _02f005be = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



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
			component: _2ac8c41f,
			name: "tester"
		},
		{
			path: "/cms",
			component: _556fc1a6,
			name: "cms"
		},
		{
			path: "/doctor",
			component: _b975a882,
			name: "doctor"
		},
		{
			path: "/cms/detail",
			component: _6c0ed606,
			name: "cms-detail"
		},
		{
			path: "/doctor/testerlist",
			component: _cb30a480,
			name: "doctor-testerlist"
		},
		{
			path: "/demo/list",
			component: _2a6881f6,
			name: "demo-list"
		},
		{
			path: "/demo/docs",
			component: _6467cbbc,
			name: "demo-docs"
		},
		{
			path: "/demo/form",
			component: _925acfaa,
			name: "demo-form"
		},
		{
			path: "/doctor/chart",
			component: _31a774cb,
			name: "doctor-chart"
		},
		{
			path: "/doctor/message",
			component: _bd014198,
			name: "doctor-message"
		},
		{
			path: "/",
			component: _02f005be,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
