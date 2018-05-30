import Vue from "vue";

/**
 * @author:zhy
 * @doc:https://cn.vuejs.org/v2/guide/custom-directive.html
 */
Vue.directive("permission", (el, binding, vnode, oldVnode) => {
  // 聚焦元素   
  if (!window.$nuxt.$store.getters["modules/permission/contains"](binding.value)) {
    el.style.display = "none";
  }
  else {
    el.style.removeProperty("display");
  }
});