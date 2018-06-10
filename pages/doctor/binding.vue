<template>
<div>
    <demo-block title="基本信息">
            <van-cell-group>
                <van-field
                    v-model="ruleForm.name"
                    label="姓名"
                    icon="clear"
                    placeholder="请输入用户名"
                    required
                    @click-icon="ruleForm.name = ''"
                />
                <van-field
                    v-model="ruleForm.phoneNumber"
                    type="tel"
                    label="手机号"
                    icon="clear"
                    placeholder="请输入手机号"
                    required
                    @click-icon="ruleForm.phoneNumber = ''"
                    :error-message="rules.phoneNumber"
                />
                <van-field
                    center
                    v-model="ruleForm.smsCode"
                    type="number"
                    pattern="[0-9]*"
                    label="短信验证码"
                    placeholder="请输入短信验证码"
                    icon="clear"
                    @click-icon="ruleForm.smsCode = ''"
                    :error-message="rules.smsCode"
                    required
                >
                <van-button slot="button" size="small" type="primary" @click="onSMS">发送验证码</van-button>
            </van-field>
            </van-cell-group>
        </demo-block>
        <div class="padding-xl">
            <van-button @click="onSave" type="primary" size="large">确认绑定</van-button>
        </div>
</div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
export default {
    data(){
        return {
            ruleForm:{
                "name": "",
                "phoneNumber": "",
                "smsCode": "",
                "openId": ""
            },
            rules:{
                "name": "",
                "phoneNumber": "",
                "smsCode": "",
                "openId": ""
            }
        };
    },
    methods:{
        onSave(){
            let me = this;
            axios.put(apiConfig.wechat_BindDoctorByPhone,me.ruleForm).then(respones=>{
                me.$toast.success("绑定成功");
                me.$router.replace("/");
            });
        },
        onSMS(){
            let me=this;
            me.rules.phoneNumber= me.ruleForm.phoneNumber===""?"请输入手机号码":"";

            if(me.ruleForm.phoneNumber!==""){
                axios.get(apiConfig.tester_sms_read,{params:{phoneNumber:me.ruleForm.phoneNumber}}).then(response=>{});
            }
        }
    },
    computed: {
        userinfo(){ return this.$store.state.modules.userinfo; }
    },
    mounted(){
        this.ruleForm.openId=this.userinfo.openId;
        window.vm=this;
    }
}
</script>


