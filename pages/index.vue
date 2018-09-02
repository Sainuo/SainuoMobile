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
      
      <van-cell @click="onLoginByOpenID" title="输入opnid登录" value="手动输入openid" label="描述信息" />
      
      <van-cell @click="onBinding" title="医生绑定" value="获取openid转入绑定" label="描述信息" />
      <van-cell @click="onRegister" title="受试者注册" value="获取openid输入注册" label="描述信息" />
      <van-cell @click="login" title="获取身份进转入对应入口" value="医生\受试者入口" label="描述信息" />

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
      this.loginByOpenid("oqtAnwuiolNCZkn58o4ktI1pUG6E");
    },
    onTest(){
      this.loginByOpenid("oqtAnwn24v9KgnvIYXllwLRlFgN8");
    },
    onViewState(){
      this.$dialog.alert({
        message:JSON.stringify(this.$store.state.modules.userInfo)
      });
    },
    loginByOpenid(openid){
      this.$router.push(`/login?openid=${openid}`);
    },
    getWxCode(){
      this.$router.push(`/wechat/login`);
    },
    onBinding(){
      this.$router.replace({path:"wechat/getopenid",query:{returnUrl:"/doctor/binding"}});
    },
    onRegister(){
      let me=this;
      me.$router.replace({path:"wechat/getopenid",query:Object.assign({returnUrl:"/tester/register"},me.$route.query)});
    },
    onLoginByOpenID(){
      let me=this;
      let openid= prompt("请输入openid","oGJk00RRum2_hCfDjkBHy_HPDdW0");
      if(typeof openid==="string" && openid.length>0){
        me.loginByOpenid(openid);
      }
    },
    checkOpenId(){
      let me = this;
      let openid = localStorage.getItem("openid");
      if(openid){
        me.loginByOpenid(openid);
      }
      else{
        me.getWxCode();
      }
    },
    login(){
      let me=this;
      let openid = localStorage.getItem("openid");
      if(typeof openid === "string"){
        me.$store.dispatch("modules/userinfo/updateOpenId",openid);
        me.loginByOpenid(openid);
      }
      else{
        me.$router.replace(`/wechat/getopenid?returnUrl=/login`);
      }
    }
  },
  asyncData({route}){
    var q=route.query;
    if(q.organizationUnitId){
      route.replace({path:"wechat/getopenid",query:Object.assign({returnUrl:"/tester/register"},route.query)});
    }
  },
  mounted(){
    let me = this;
    window.vm=this;
/*     me.loading = me.$toast.loading({
      message:"获取身份信息",
      mask:true,
      duration:0
    });
    me.checkOpenId(); */
  }
}
</script>
