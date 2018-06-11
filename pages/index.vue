<template>
<div>
  <div v-if="show">
    <van-nav-bar title="Title" left-text="Back" right-text="Button" left-arrow/>
    <van-cell-group>
      <van-cell to="demo/list" title="列表" value="下拉刷新下拉加载" />
      <van-cell to="demo/form" title="表单" value="基本信息录入" label="描述信息" />
      <van-cell to="demo/cellform" title="cell表单" value="" />
      <van-cell to="demo/bizselect" title="选择框" value="点击弹出选择项" label="描述信息" />
      <van-cell to="demo/bizdatepicker" title="日期选择框" value="点击弹出选择项" label="描述信息" />
      <van-cell @click="onDoctor" title="医生登录" value="医生登录" label="医生登录" />
      <van-cell to="doctor/" title="医生入口" value="医生入口" label="描述信息" />
      <van-cell @click="onTest" title="受试者登录" value="受试者登录" label="受试者登录" />
      <van-cell to="tester/" title="受试者入口" value="受试者入口" label="描述信息" />
      <van-cell to="guest/" title="游客" value="游客" label="游客" />
      <van-cell to="cms/" title="项目咨询" value="项目咨询" label="描述信息" />
      <van-cell @click="onViewState" title="显示用户状态" value="显示用户状态" label="描述信息" />
      <van-cell @click="getWxCode" title="微信受权" value="微信受权" label="描述信息" />
    </van-cell-group>
  </div>
</div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import webConfig from "~/static/webConfig"
export default {
  data(){
    return{
      show:webConfig.debug,
      loading:null
    }
  },
  methods:{
    onDoctor(){
      this.getUserInfoByOpenId("oqtAnwuiolNCZkn58o4ktI1pUG6E");
    },
    onTest(){
      this.getUserInfoByOpenId("oqtAnwn24v9KgnvIYXllwLRlFgN8");
    },
    getUserInfoByOpenId(openId){
      let me=this;
      axios.get(apiConfig.wechatOAuth_get,{params:{openid:openId}}).then(response=>{
        axios.defaults.headers.common['authorization'] =`Bearer ${response.data.token}`;
        me.$store.dispatch("modules/userinfo/updateUserInfo",response.data.userInfo);
        me.$store.dispatch("modules/userinfo/updateOpenId",openId);

        let {organizationUnitId}=me.$route.query;
        if(organizationUnitId){
          me.$store.dispatch("modules/userinfo/updateOrganizationUnitId",organizationUnitId);
        }

        me.$dialog.alert({message:"登录完成"});
      });
    },
    getOpenIdByCode(code){
       axios.get(apiConfig.wechat_getWechatOAuthInfo,{params:{code:code}}).then(response=>{
         this.getUserInfoByOpenId(response.openId);
       });
    },
    getWxCode(){
      let appid = webConfig.wx_appid;
      let redirectUri = encodeURIComponent(window.location.href);
      window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base&state=${new Date().getTime()}#wechat_redirect`
    },
    onViewState(){
      this.$dialog.alert({
        message:JSON.stringify(this.$store.state.modules.userInfo)
      });
    },
    checkOpenId(){
      let me = this;
      let openid = localStorage.getItem("openid");
      if(openid){
        me.getUserInfoByOpenId(openid);
      }
      else{
        me.getWxCode();
      }
    },
    saveOpenId(openid){
      localStorage.setItem("openid",openid)
    }
  },
  mounted(){
    let me = this;
    me.loading = me.$toast.loading({
      message:"获取身份信息",
      duration:0
    });
    me.checkOpenId();
  }
}
</script>
