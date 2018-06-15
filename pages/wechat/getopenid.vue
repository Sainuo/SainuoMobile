<template>
    <div>获取用户openid</div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
export default {
    data(){
        return{
            returnUrl:null
        }
    },
    methods:{
        loginByCode(code){
            let me = this;
            axios.get(apiConfig.wechat_getWechatOAuthInfo,{params:{code:code}}).then(response=>{
                let openId=response.data.result.openId;
                localStorage.setItem('openid',openId);
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
            let query = Object.assign({}, me.$route.query);
            let {returnUrl} = me.$route.query;

            delete query.returnUrl;//删除returnUrl字段
            
            if(returnUrl){
                me.$router.replace({path:returnUrl,query:query});//原样复制querystring到转向地址
            }
        }
    },
    mounted(){
        let me=this;
        if(me.isCallBack())
        {
            me.goReturnUrl();
        }
        else{
            this.getWxCode();
        }
    }
}
</script>