<template>
<div>
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
  </van-cell-group>
</div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
export default {
  methods:{
    onDoctor(){
      this.getUserInfoByOpenId("oqtAnwuiolNCZkn58o4ktI1pUG6E");
    },
    onTest(){
      this.getUserInfoByOpenId("oqtAnwue1ZjPDboSWNUtdc492bMw");
    },
    getUserInfoByOpenId(openId){
      let me=this;
      axios.get(apiConfig.wechatOAuth_get,{params:{openid:openId}}).then(response=>{
        
        axios.defaults.headers.common['authorization'] =`Bearer ${response.data.token}`;
        console.log(axios.defaults.headers.common['authorization']);
        me.$store.dispatch("modules/userinfo/updateUserInfo",response.data.userInfo);
        me.$dialog.alert({message:"登录完成"});
      });
    }
  },
  mounted(){
    
  }
}
</script>
