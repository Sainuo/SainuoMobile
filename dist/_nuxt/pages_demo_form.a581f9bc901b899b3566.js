webpackJsonp([5],{"40S0":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=t("rtK/"),n=t("gvHO"),l=t("VU/8")(r.a,n.a,!1,null,null,null);l.options.__file="pages\\demo\\form.vue",a.default=l.exports},gvHO:function(e,a,t){"use strict";var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("van-nav-bar",{attrs:{title:"标题","left-text":"返回","right-text":"按钮","left-arrow":""},on:{"click-left":function(a){e.$router.back()}}}),t("p",[e._v("个人信息收集")]),t("van-cell-group",[t("van-field",{attrs:{label:"姓名",placeholder:"请输入姓名"},model:{value:e.ruleForm.name,callback:function(a){e.$set(e.ruleForm,"name",a)},expression:"ruleForm.name"}}),t("van-field",{attrs:{label:"生日",placeholder:"请输入生日",type:"date"},model:{value:e.ruleForm.birthday,callback:function(a){e.$set(e.ruleForm,"birthday",a)},expression:"ruleForm.birthday"}}),t("van-radio-group",{model:{value:e.ruleForm.gender,callback:function(a){e.$set(e.ruleForm,"gender",a)},expression:"ruleForm.gender"}},[t("van-cell",[t("van-radio",{attrs:{name:"male"}},[e._v("男")])],1),t("van-cell",[t("van-radio",{attrs:{name:"female"}},[e._v("女")])],1)],1),t("van-switch-cell",{attrs:{title:"已婚"},model:{value:e.ruleForm.isMarried,callback:function(a){e.$set(e.ruleForm,"isMarried",a)},expression:"ruleForm.isMarried"}}),t("p",[e._v("爱好")]),t("van-checkbox-group",{model:{value:e.ruleForm.favorite,callback:function(a){e.$set(e.ruleForm,"favorite",a)},expression:"ruleForm.favorite"}},[t("van-cell",[t("van-checkbox",{attrs:{name:"音乐"}},[e._v("听音乐")])],1),t("van-cell",[t("van-checkbox",{attrs:{name:"足球"}},[e._v("踢足球")])],1),t("van-cell",[t("van-checkbox",{attrs:{name:"篮球"}},[e._v("打篮球")])],1)],1),t("van-picker",{attrs:{columns:e.columns},on:{change:e.onChange}}),t("div",[t("label",{attrs:{for:"language"}},[e._v("掌握的编程语言")]),t("br"),t("select",{directives:[{name:"model",rawName:"v-model",value:e.ruleForm.language,expression:"ruleForm.language"}],attrs:{id:"language",name:"language",multiple:"multiple"},on:{change:function(a){var t=Array.prototype.filter.call(a.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.ruleForm,"language",a.target.multiple?t:t[0])}}},[t("option",{attrs:{value:"Basic"}},[e._v("Basic")]),t("option",{attrs:{value:"C"}},[e._v("C")]),t("option",{attrs:{value:"C++"}},[e._v("C++")]),t("option",{attrs:{value:"C#"}},[e._v("C#")]),t("option",{attrs:{value:"Java"}},[e._v("Java")]),t("option",{attrs:{value:"Javascript"}},[e._v("Javascript")]),t("option",{attrs:{value:"Python"}},[e._v("Python")]),t("option",{attrs:{value:"Ruby"}},[e._v("Ruby")])])])],1),t("van-button",{attrs:{type:"primary"},on:{click:e.getData}},[e._v("获取数据")]),t("van-button",{attrs:{type:"default"},on:{click:e.resetData}},[e._v("设置数据")])],1)};r._withStripped=!0;var n={render:r,staticRenderFns:[]};a.a=n},"rtK/":function(e,a,t){"use strict";var r=t("mvHQ"),n=t.n(r);a.a={data:function(){return{defaultIndex:0,columns:["昆明","呈贡"],ruleForm:{name:"zhy",birthday:"1985-04-06",gender:"male",isMarried:!1,favorite:["音乐"],address:"昆明",language:["C","Java"]}}},methods:{onChange:function(e,a,t){this.ruleForm.address=a},getData:function(e){console.log("hello"),this.$dialog.alert({message:n()(this.ruleForm)}).then(function(){})},resetData:function(e){this.$dialog.alert({message:"resetData"}).then(function(){}),this.ruleForm={name:"zhy",birthday:"1985-04-06",gender:"male",isMarried:!1,favorite:["音乐"],address:"昆明",language:["C","Java"]}}},mounted:function(){window.vm=this}}}});