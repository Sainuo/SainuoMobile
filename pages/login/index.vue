<template>
    <div></div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import webConfig from "~/static/webConfig"
export default {
    methods:{
        getOpenIdByCode(code){
            let me=this;
            axios.get(apiConfig.wechat_getWechatOAuthInfo,{params:{code:code}}).then(response=>{
                let openId=response.data.openId;
                localStorage.setItem('openid',openId);
                me.getUserInfoByOpenId(me);
            });
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
        }
    },
    mounted(){
        let me=this;
        let code=me.$route.query.code;
        me.getOpenIdByCode(code);
    }
}
</script>

