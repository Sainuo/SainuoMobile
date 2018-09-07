<template>
    <div class="horizontal-vertical-center">获取用户信息</div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import webConfig from "~/static/webConfig"
export default {
    methods:{
        loginByCode(code){
            let me = this;
            axios.get(apiConfig.wechat_getWechatOAuthInfo,{params:{code:code}}).then(response=>{
                let openId=response.data.result.openId;
                localStorage.setItem('openid',openId);
                me.$store.dispatch("modules/userinfo/updateOpenId",openId);
                me.goReturnUrl();
            });
        },
        getWxCode(){
            let me = this;
            let appid = webConfig.wx_appid;
            let redirectUri = encodeURIComponent(`${webConfig.wx_callbackUrl}`);
            let state = JSON.stringify(me.$route.query);
            window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`);
        },
        isCallBack(){
            let me = this;
            let {code,state} = me.$route.query;
            return code && state;
        },
        goReturnUrl(){
            let me = this;
            let state =JSON.parse(decodeURIComponent( me.$route.query.state));
            let {returnUrl}=state;

            state.openid=localStorage.getItem("openid");
            
            delete state.returnUrl;//删除returnUrl字段
            if(returnUrl){
                me.$router.replace({path:returnUrl,query:state});//原样复制querystring到转向地址
            }
        }
    },
    mounted(){
        let me=this;
        if(me.isCallBack())
        {
            me.loginByCode(me.$route.query.code);
        }else{
            me.getWxCode();
        }
    }
}
</script>