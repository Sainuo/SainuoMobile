webpackJsonp([4],{"2dm0":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t("S3Ec"),r=t("vfN+"),s=t("VU/8")(i.a,r.a,!1,null,null,null);s.options.__file="pages\\demo\\list.vue",n.default=s.exports},S3Ec:function(e,n,t){"use strict";n.a={data:function(){return{list:[],refreshing:!1,loading:!1,finished:!1}},methods:{onLoad:function(){var e=this;setTimeout(function(){for(var n=0;n<10;n++){var t=e.list.length+1;e.list.push(t<10?"0"+t:t)}e.loading=!1,e.list.length>=40&&(e.finished=!0)},500)},onRefresh:function(){var e=this;setTimeout(function(){e.list=[],e.finished=!1,e.refreshing=!1,window.scrollTo(0,10)},1e3)}}}},"vfN+":function(e,n,t){"use strict";var i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("van-nav-bar",{attrs:{title:"标题","left-text":"返回","right-text":"按钮","left-arrow":""},on:{"click-left":function(n){e.$router.back()}}}),t("van-pull-refresh",{on:{refresh:e.onRefresh},model:{value:e.refreshing,callback:function(n){e.refreshing=n},expression:"refreshing"}},[t("van-list",{attrs:{finished:e.finished},on:{load:e.onLoad},model:{value:e.loading,callback:function(n){e.loading=n},expression:"loading"}},e._l(e.list,function(e){return t("van-cell",{key:e,attrs:{title:e+""}})}))],1)],1)};i._withStripped=!0;var r={render:i,staticRenderFns:[]};n.a=r}});