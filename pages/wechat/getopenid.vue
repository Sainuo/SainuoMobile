<template>
    <div>获取用户openid</div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import QueryStringConvert from "~/static/javascript/querystringConvert"
export default {
    data(){
        return{
            returnUrl:null
        }
    },
    methods:{
        loginByCode(code){
            let me=this;
            axios.get(apiConfig.wechat_getWechatOAuthInfo,{params:{code:code}}).then(response=>{
                let openId=response.data.result.openId;
                localStorage.setItem('openid',openId);
            });
        },
        getWxCode(){
            let me=this;
            let appid = webConfig.wx_appid;
            let redirectUri = encodeURIComponent(`${webConfig.wx_callbackUrl}`);
            let state = QueryStringConvert.serializeObject(me.$route.query);
            window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`);
        }
    },
    mounted(){

        this.getWxCode();
    }
}
</script>