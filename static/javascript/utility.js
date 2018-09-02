﻿import webConfig from "~/static/webConfig"
import '~/static/javascript/stringFormat'
import '~/static/javascript/dateFormat'

class Utility {
    constructor() {
        var me = this;
        this.history = [];
        this.hashParameters = {};
        this.debug = false;
        this.isPing = false;
        this.timerId = null;
        this.pingInterval = 10 * 60 * 1000;
        this.ui = null;
        me.filters = {
            /*
            *时间
            */
            "time": function (val) {
                var date = me.textToDate(val);
                if (isNaN(date.getTime())) {
                    return "不可用日期";
                }
                return date.format("yyyy-MM-dd HH:mm:ss");
            },
            /*
           *日期
           */
            "date": function (val) {
                var date = me.textToDate(val);
                if (isNaN(date.getTime())) {
                    return "不可用日期";
                }
                return date.format("yyyy-MM-dd");
            },
            /*
            * 钱
            */
            "money": function (val) {
                if (typeof val === "number") {
                    return val.toFixed(2);
                }
                return "0.00";
            },
            /*
            * 需要除以100
            */
            "intMoney": function (val) {
                if (typeof val === "number") {
                    return (val / 100).toFixed(2);
                }
                return "0.00";
            },
            "image": function (src) {
                var idx = src.indexOf('http');
                if (idx === 0) {
                    return src;
                }
                else {
                    return webconfig.resourceServerAddress + src;
                }
            }
        };
        me.directives = {
            /*
            * 跳转指令
            */
            'href': {
                "bind": function (el, binding, vnode, oldVnode) {
                    var fnPageLoader = $f.getPageLoader();
                    el.addEventListener("click", function (evt) {
                        var url = binding.expression;
                        if (typeof url === "string" && url !== "#" && url !== "" && fnPageLoader) {
                            fnPageLoader(url);
                        }
                    });
                }
            },
            "back": {
                "bind": function (el, binding, vnode, oldVnode) {
                    var fnPageLoader = $f.getPageLoader();
                    el.addEventListener("click", function (evt) {
                        $f.back();
                    });
                }
            }
        };
    }
    /**
    *@method textToDate
    *@return Date
    */
    textToDate(text) {
        var d = new Date("Invalid Date");
        if (text instanceof Date) {
            d = text;
        }
        else if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(text)) {
            //2016-09-18T03:46:11
            var t = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/.exec(text);
            d = new Date(t[1], parseInt(t[2]) - 1, t[3], t[4], t[5], t[6]);
        }
        else if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+/.test(text)) {
            //2016-09-18T03:46:11.893Z
            var t = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d+)/.exec(text);
            d = new Date(t[1], parseInt(t[2]) - 1, t[3], t[4], t[5], t[6], t[7].substr(0, 4));
        }
        else if (/\/Date\(-?\d+\)\//.test(text)) {
            //Microsoft json Date \/Date(1450800000000)\/ \/Date(-62135596800000)\/
            d = new Date(parseInt(text.substring(6)));
        }
        return d;
    }
    /**
     * 用户登录
     * @param {} response
     * @param {} fnCallBack
     * @returns {}
     */
    login(user) {
        //user:{
        //    "Username": "admin",
        //    "UserId": 1,
        //    "RoleName": "SystemAdmin",
        //    "SessionName": "DMPSKey",
        //    "SessionKey": "d4791bb351d6c459b3eb5a232a0d27d6cd93c826",
        //    "ReturnUrl": "&username=admin&token=597f5441e7d174b607873874ed54b974674986ad543e7458e28a038671c9f64c"
        //}
        var me = this;
        me.setUser(user);
        //me.ping();
    }
    /**
     * 用户退出
     * @returns {}
     */
    logout() {
        var me = this;
        localStorage.clear();
        clearInterval(me.timerId);
        me.ui.loadPage("/wwwroot/login.html");
        me.ajax({ method: "POST", url: "/Account/Logout" });
    }
    /**
     * ping pong
     * @returns {}
     */
    ping() {
        var me = this;
        if (!me.isPing) {
            me.isPing = true;
            me.ajax({ url: "/api/Auth/Ping" });
            me.timerId = setInterval(function () {
                me.ajax({ url: "/api/Auth/Ping" });
            }, me.pingInterval);
        }
    }
    /**
     * 获取用户SessionKey
     * @returns {}
     */
    getSessionKey() {
        var me = this;
        return me.getUser() ? me.getUser().SessionKey : null;
    }
    /**
     * 设置用户信息
     * @param {object} user
     * @returns {void}
     */
    setUser(user) {
        localStorage["User"] = JSON.stringify(user);
    }
    /**
     * 获取用户信息
     * @returns {object}
     */
    getUser() {
        return JSON.parse(localStorage["User"], function (k, v) {
            if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(v)) {
                //2016-09-18T03:46:11.893Z
                return new Date(v.replace("T", ""));
            }
            else if (/\/Date\(-?\d+\)\//.test(v)) {
                //Microsoft json Date \/Date(1450800000000)\/ \/Date(-62135596800000)\/
                return new Date(parseInt(v.substring(6)));
            }
            return v;
        });
    }
    fixDate(o) {
        for (var p in o) {
            if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(o[p])) {
                //2016-09-18T03:46:11.893Z
                o[p] = new Date(o[p].replace("T", ""));
            }
            else if (/\/Date\(-?\d+\)\//.test(o[p])) {
                //Microsoft json Date \/Date(1450800000000)\/ \/Date(-62135596800000)\/
                o[p] = new Date(parseInt(o[p].substring(6)));
            }
        }
        return o;
    }
    getMenu() {
        var me = this;
        var user = me.getUser();
        return user.UserMenuModels;
    }
    htmlEncode(v) {
        return (v + "").replace(/&/g, "&amp;")
            .replace(/"/g, '&quot;')
            .replace(/'/g, "&#39;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
    htmlDecode(v) {
        return (v + "").replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
    }
    /**
    *服务器模型转客户端模型
    */
    toClientModel(model){
        var me = this;
        if (model instanceof Array) {
            for (var i = 0, item; item = model[i]; i++) {
                model[i]=me.toClientModel(item);
            }
            return model;
        }else if (model instanceof Object) {
            for (var p in model) {
                model[p]=me.toClientModel(model[p]);
            }
            return model;
        }else if(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(model)){
            return new Date(model);
        }else if(/\/Date\(-?\d+\)\//.test(model)){
            new Date(parseInt(model.substring(6)));
        }else{
            return model;
        }
    }
    /**
    *客户端面模型转服务器模型
    */
    toServerModel(model){
        var me = this;
        if (model instanceof Array) {
            for (var i = 0, item; item = model[i]; i++) {
                model[i]=me.toServerModel(item);
            }
            return model;
        }else if (model instanceof Object) {
            for (var p in model) {
                model[p]=me.toServerModel(model[p]);
            }
            return model;
        }else if(model instanceof Date){
            return model.format("yyyy-MM-dd HH:mm:ss");
        }else{
            return model;
        }
    }
    /**
     * 打印日志
     * @param {} text
     * @param {} type
     * @returns {}
     */
    log(text, type) {
        var me = this;
        if (!type)
            type = "log";
        if (me.debug) {
            console[type](text);
        }
    }
    /**
     * 弹出对话框
     * @param {string} text
     * @returns {void}
     */
    alert(text, fnOk) {
        if (this.ui) {
            this.ui.$alert(text, "", {
                confirmButtonText: '确定',
                callback: fnOk
            });
        }
        else {
            alert(text);
        }
        if (webConfig.debug) {
            console.log(text);
        }
    }
    /**
     * 确定
     * @param {string} text
     * @param {function} fnOk
     * @param {function} fnCancel
     * @returns {void}
     */
    confirm(text, fnOk, fnCancel) {
        this.ui.$confirm(text, '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
        }).then(fnOk).catch(fnCancel);
    }
    /**
     * 输入
     * @param {string} text
     * @param {function} fnOk
     * @param {function} fnCancle
     * @returns {void}
     */
    prompt(text, fnOk, fnCancel) {
        this.ui.$prompt(text, '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(fnOk).catch(fnCancel);
    }
    /**
     * ajax请求
     * @param {} options
     * @returns {}
     */
    ajax(options) {
        var me = this;
        var accept = {
            "html": "text/html",
            "json": "application/json",
            "text": "text/plain"
        };
        options.accept = options.accept ? accept[options.accept] : accept["json"];
        var settings = Object.assign({
            url: "",
            method: "GET",
            data: null,
            accept: accept["json"],
            progress: function (progressEvent) { },
            success: function (body, loadEvent) { },
            error: function (body, errorEvent) {
                var request = errorEvent.target;
                if (/application\/json/i.test(request.getResponseHeader("Content-Type"))) {
                    me.errorHander(JSON.parse(body));
                }
            },
            complete: function (body, loadendEvent) { }
        }, options);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function (loadEvent) {
            if (this.status === 200) {
                settings.success(this.responseText, loadEvent);
            }
            else {
                settings.error(this.responseText, loadEvent);
            }
        });
        xhr.addEventListener("loadend", function (loadendEvent) {
            settings.complete(this.responseText, loadendEvent);
        });
        xhr.addEventListener("progress", function (progressEvent) {
            settings.progress(this.responseText, progressEvent);
        });
        xhr.addEventListener("error", function (errorEvent) {
            settings.error(this.responseText, errorEvent);
        });
        xhr.open(settings.method, settings.url);
        xhr.setRequestHeader("Accept", settings.accept);
        xhr.send(settings.data);
    }
    /**
    * @method addParameters
    * @param {number} vueUid
    * @param {object}
    * @re
    */
    addParameters(vueUid, parameters) {
        return this.hashParameters[vueUid] = parameters;
    }
    /**
    * @method removeParameters
    * @param {number} vueUid
    */
    removeParameters(vueUid) {
        delete this.hashParameters[vueUid];
    }
    /**
    * @method getParameters
    * @param {number} vueUid
    */
    getParameters(vueUid) {
        return this.hashParameters[vueUid];
    }
    /**
    * @method getAllParameters
    * @return {array}
    */
    getAllParameters() {
        return this.hashParameters;
    }
    /**
    * @method getParameters
    * @param {number} vueUid
    * @returns {any}
    */
    getParametersByKey(vueUid, key) {
        var me = this;
        var o = me.getParameters(vueUid);
        for (var p in o) {
            if (p.toLowerCase() === key.toLowerCase()) {
                return o[p];
            }
        }
        return o;
    }
    /**
    * @method setUrl
    */
    setUrl(url, isBack) {
        var me = this;
        if (!isBack)
            me.pushUrl(url);
    }
    /**
    * @method pushUrl
    * @param {Btring} url
    * @param {Boolean} isShowUrl
    * @returns {void}
    */
    pushUrl(url, notShow) {
        var me = this;
        if (typeof url === "string" && url !== "") {
            if (!notShow)
                history.pushState(null, "", location.origin + url);
            me.history.push(url);
        }
    }
    /**
    * @method popUrl
    * @param {Boolean} isShowUrl
    * @return {void}
    */
    popUrl(notShow) {
        var me = this;
        var url = me.history.pop();
        if (!notShow)
            history.pushState(null, "", location.origin + url);
        return url;
    }
    /*
    *@method updateCurrentUrl
    *@returns {void}
    */
    updateCurrentUrl() {
        var me = this;
        var history = me.history;
        history[history.length - 1] = location.pathname + location.search;
    }
    /**
    * @method back
    * @returns {void}
    */
    back() {
        var me = this;
        var fnPageLoader = me.getPageLoader();
        me.history.pop(); //current
        var url = me.history[me.history.length - 1]; //last
        if (fnPageLoader && url)
            fnPageLoader(url, true);
    }
    /**
    *@method go
    *@returns {void}
    */
    go(url) {
        var me = this;
        var fnPageLoader = me.getPageLoader();
        if (fnPageLoader)
            fnPageLoader(url);
    }
    /**
     * @method getPageComponent
     * @param {string} url
     * @param {function} fn
     * @returns {object}
     */
    getPageComponent(options) {
        var me = this;
        var settings = Object.assign({}, {
            url: "",
            isBack: false,
            isChangeUrl: true,
            success: function (component) { },
            error: function (exception) { }
        }, options);
        if (settings.isChangeUrl)
            me.setUrl(settings.url, settings.isBack);
        try {
            me.ajax({
                url: settings.url,
                accept: "html",
                success: function (body) {
                    try {
                        var dp = new DOMParser();
                        var dom = dp.parseFromString(body, "text/html");
                        var div = dom.querySelector("body > div");
                        var script = dom.querySelector("body > script");
                        var template = div ? div.outerHTML : '<div><h1 class="horizontal-vertical-center">建设中……</span></div>';
                        var options = me.getVueOptions(script ? script.innerHTML : "");
                        if (options == null) {
                            options = {};
                        }
                        var component = {
                            template: template
                        };
                        component.template = template;
                        if (options.data) {
                            if (typeof options.data === "object") {
                                component.data = function () { return options.data; };
                            }
                            else if (typeof options.data === "function") {
                                component.data = options.data;
                            }
                        }
                        else {
                            component.data = function () { return {}; };
                        }
                        me.convertToVueOptions(component, options);
                        settings.success(component);
                    }
                    catch (ex) {
                        settings.error(ex);
                    }
                },
                error: function (body, event) {
                    var xhr = event.target;
                    settings.success({
                        template: '<div class="horizontal-vertical-center">' +
                            '<h1>{{status}}&nbsp;{{statusText}}</h1>' +
                            '<h2 class="horizontal-vertical-center">{{message}}</h2>' +
                            '</div>',
                        data: function () {
                            return {
                                status: xhr.status,
                                statusText: xhr.statusText,
                                message: ""
                            };
                        }
                    });
                }
            });
        }
        catch (e) {
            settings.error(e);
        }
    }
    /**
     *
     * @param out {object} compoment
     * @param {object} options
     * @returns {void}
     */
    convertToVueOptions(component, options) {
        for (var propertyName in options) {
            if (options.hasOwnProperty(propertyName)) {
                if (propertyName.toLowerCase() === "template") {
                    continue;
                }
                else if (propertyName.toLowerCase() === "data") {
                    continue;
                }
                /*Bug:js需要手动赋值?*/
                else if (propertyName.toLowerCase() === "methods") {
                    component[propertyName] = options["methods"];
                }
                else if (propertyName.toLowerCase() === "props") {
                    component[propertyName] = options["props"];
                }
                else if (propertyName.toLowerCase() === "propsData") {
                    component[propertyName] = options["propsData"];
                }
                else if (propertyName.toLowerCase() === "computed") {
                    component[propertyName] = options["computed"];
                }
                else if (propertyName.toLowerCase() === "watch") {
                    component[propertyName] = options["watch"];
                }
                //选项 / DOM
                else if (propertyName.toLowerCase() === "render") {
                    component[propertyName] = options["render"];
                }
                //选项 / 生命周期钩子
                else if (propertyName.toLowerCase() === "beforeCreate") {
                    component[propertyName] = options["beforeCreate"];
                }
                else if (propertyName.toLowerCase() === "created") {
                    component[propertyName] = options["created"];
                }
                else if (propertyName.toLowerCase() === "beforeMount") {
                    component[propertyName] = options["beforeMount"];
                }
                else if (propertyName.toLowerCase() === "mounted") {
                    component[propertyName] = options["mounted"];
                }
                else if (propertyName.toLowerCase() === "beforeUpdate") {
                    component[propertyName] = options["beforeUpdate"];
                }
                else if (propertyName.toLowerCase() === "updated") {
                    component[propertyName] = options["updated"];
                }
                else if (propertyName.toLowerCase() === "activated") {
                    component[propertyName] = options["activated"];
                }
                else if (propertyName.toLowerCase() === "deactivated") {
                    component[propertyName] = options["deactivated"];
                }
                else if (propertyName.toLowerCase() === "beforeDestroy") {
                    component[propertyName] = options["beforeDestroy"];
                }
                else if (propertyName.toLowerCase() === "destroyed") {
                    component[propertyName] = options["destroyed"];
                }
                //选项 / 资源
                else if (propertyName.toLowerCase() === "directives") {
                    component[propertyName] = options["directives"];
                }
                else if (propertyName.toLowerCase() === "filters") {
                    component[propertyName] = options["filters"];
                }
                else if (propertyName.toLowerCase() === "components") {
                    component[propertyName] = options["components"];
                }
                //选项 / 资源
                else if (propertyName.toLowerCase() === "parent") {
                    component[propertyName] = options["parent"];
                }
                else if (propertyName.toLowerCase() === "mixins") {
                    component[propertyName] = options["mixins"];
                }
                else if (propertyName.toLowerCase() === "name") {
                    component[propertyName] = options["name"];
                }
                else if (propertyName.toLowerCase() === "extends") {
                    component[propertyName] = options["extends"];
                }
                else if (propertyName.toLowerCase() === "delimiters") {
                    component[propertyName] = options["delimiters"];
                }
                else if (propertyName.toLowerCase() === "functional") {
                    component[propertyName] = options["functional"];
                }
            }
        }
    }
    /**
    *@method getVueOptionsFromStirng
    *@param {string} text
    *@returns {string}
    */
    getVueOptionsFromStirng(text) {
        var start = text.search(/(?!new Vue\(){/);
        var end = text.search(/(?=\);s*\r?\n\s*$)/);
        var ostr = text.substring(start, end);
        return ostr;
    }
    /**
     * @method getVueOptions
     * @param {sring} text
     * @returns {object}
     */
    getVueOptions(text) {
        var me = this;
        var result = me.getVueOptionsFromStirng(text);
        if (!result)
            return { data: function () { } };
        return me.createObjectFromText(result);
    }
    /**
     * 文本创建对象
     * @param {string} text
     * @returns {object}
     */
    createObjectFromText(text) {
        var me = this;
        var v = 1;
        if (v === 1) {
            return me.createObjectFromEval(text);
        }
        return null;
    }
    /**
     * 文本创建对象
     * @param {string} text
     * @returns {object}
     */
    createObjectFromEval(text) {
        var me = this;
        try {
            me.log("createObjectFromEval");
            me.log(text);
            var o = eval("(" + text + ")");
            me.log(o);
            return o;
        }
        catch (e) {
            me.errorHander(e);
            return null;
        }
    }
    /*
    *获取路径中的参数
    *@param {string} rule
    *@return {object}
    */
    getRouteParameters(rule) {
        var o = {};
        //rule:/{folder}/{guid}
        //path:http://x.y.z/Shop/90c4b3e2-3792-4ab3-8df8-89cbad89d58e
        var paths = location.pathname.slice(1).split('/');
        for (var i = 0, key; key = rule.slice(1).split('/')[i]; i++) {
            if (key === "")
                break;
            if (key.indexOf("{") > -1 && key.indexOf("}") > -1)
                o[key.replace(/{|}/g, "")] = paths[i];
        }
        return o;
    }
    /*
     *获取Url中的参数
     *@param {string} 参数名字
     *@return {string}
     *example:
     *  getQueryString("ID");
     */
    getQueryString(name, vueUid) {
        var me = this;
        var parameter = null;
        if (vueUid)
            parameter = me.getParametersByKey(vueUid, name);
        if (parameter)
            return parameter;
        return me.getQueryStringFromText(name, window.location.search);
    }
    /**
    * 从字串中找参数键值
    *@method getQueryStringFromText
    */
    getQueryStringFromText(name, url) {
        var me = this;
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var params = me.getQueryStringParametersFromText(url);
        if (params) {
            params.match(reg);
            var r = params.match(reg);
            if (r != null)
                return decodeURIComponent(r[2]);
        }
        return null;
    }
    /**
     * 获取全部参数
     * @returns {string}
     */
    getQueryStringParameters(vueUid) {
        var me = this;
        var parameter = null;
        if (vueUid)
            parameter = me.getParameters(vueUid);
        if (parameter)
            return parameter;
        return me.getQueryStringParametersFromText(window.location.search);
    }
    /**
    * 从字串中分离参数和路径
    * @method getQueryStringParametersFromUrl
    */
    getQueryStringParametersUrlFromText(text) {
        var me = this;
        ;
        var urlParams = text.split("?");
        return {
            url: me.undefinedToEmptyString(urlParams[0]),
            parameters: me.undefinedToEmptyString(urlParams[1])
        };
    }
    /*
    * 空转化为null
    * @param {val} text
    * @return {object|null}
    */
    emptyToNull(val) {
        if (val === undefined || val === "" || val === null || val === Guid.empty.toString()) {
            return null;
        }
        return val;
    }
    /*
    * 空转化为null
    * @param {val} text
    * @return {object|null}
    */
    undefinedToEmptyString(val) {
        if (val === undefined) {
            return "";
        }
        return val;
    }
    /*从字串中分离路径*/
    /**
    * @param {stirng} text
    * @return {stirng}
    */
    getUrlFromText(text) {
        return this.getQueryStringParametersUrlFromText(text).url;
    }
    /*从字串中分离参数*/
    /**
    * @param {stirng} text
    * @return {stirng}
    */
    getQueryStringParametersFromText(text) {
        return this.getQueryStringParametersUrlFromText(text).parameters;
    }
    /**
    *查询字串转对象
    *@method queryStringParamatersToObject
    */
    queryStringParamatersToObject(text) {
        var o = null;
        if (text.length > 0 && text.indexOf('=') > -1) {
            o = {};
            var keyValues = text.split("&");
            for (var i = 0, keyValue; keyValue = keyValues[i]; i++) {
                var kv = keyValue.split("=");
                o[kv[0].toLowerCase()] = kv[1];
            }
        }
        return o;
    }
    /**
    *对象转查询字串
    *@method objectToQueryString
    */
    objectToQueryString(o) {
        var queryString = [];
        for (var p in o) {
            queryString.push("{key}={value}".format({ key: p, value: encodeURIComponent(o[p]) }));
        }
        return queryString.join("&");
    }
    /**
     * 异常处理
     * @returns {void}
     */
    errorHander(error) {
        var me = this;
        var e = me.unityError(error);
        if (e.name === 1) {
            me.ui.$alert("登录超时，请重新登录", {
                confirmButtonText: '重新登录',
                callback: function (action) {
                    me.ui.loadPage("/wwwroot/login.html");
                }
            });
        }
        else {
            me.alert(e.message);
        }
    }
    /**
     * 统一异常
     * @param {} error
     * @returns {}
     */
    unityError(error) {
        var e = new Error();
        //Business
        if (typeof error.Success === "boolean" && !error.Success) {
            e.name = error.ExceptionType;
            e.message = error.ErrorMsg;
        }
        //js Exception
        else if (error.message) {
            e.message = error.message;
        }
        return e;
    }
}

export default new Utility()