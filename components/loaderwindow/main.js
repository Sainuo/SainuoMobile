/**
 * @author : zy364432
 * @date   : 20180423
 */

import Vue from "vue"
import loaderwindowVue from "./main.vue"
const loaderwindowConstructor = Vue.extend(loaderwindowVue)

export default {
    install(vue) {
        if (this.installed) return;
        this.installed = true;

        vue.prototype.$loaderwindow = function(options){

            var settings = {
                title: "窗口",
                path: "",
                params: null
            };

            if (typeof arguments[0] === "string") {
                settings.path = arguments[0];
            }
            else if (typeof arguments[0] === "object") {
                Object.assign(settings, options);
            }

            if (typeof arguments[1] === "object") {
                settings.params = arguments[1];
            }
            else if (typeof arguments[1] === "string") {
                settings.title = arguments[1];
            }

            var instance = new loaderwindowConstructor();

            for (let prop in settings) {
                if (settings.hasOwnProperty(prop)) {
                  instance[prop] = settings[prop];
                }
            }

            document.body.appendChild(instance.$mount(document.createElement("div")).$el);

            return new Promise((resolve,reject)=>{
                instance.$on("confirm",(evt)=>{
                    resolve(evt)
                })
                instance.$on("cancel",(evt)=>{
                    reject(evt)
                })
            });
        };
    }
};