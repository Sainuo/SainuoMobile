<template>
<div>
    <demo-block title="基本信息">
        <validater ref="form" :model="ruleForm" :rules="rules">
            <van-cell-group>
                <validater-item prop="name">
                    <van-field
                        v-model="ruleForm.name"
                        label="姓名"
                        icon="clear"
                        placeholder="请输入用户名"
                        required
                        @click-icon="ruleForm.name = ''"
                    />
                </validater-item>
                <validater-item prop="phoneNumber">
                    <van-field
                        v-model="ruleForm.phoneNumber"
                        type="tel"
                        label="手机号"
                        icon="clear"
                        placeholder="请输入手机号"
                        required
                        @click-icon="ruleForm.phoneNumber = ''"
                    />
                </validater-item>
                <validater-item prop="smsCode">
                    <van-field
                        center
                        v-model="ruleForm.smsCode"
                        type="number"
                        pattern="[0-9]*"
                        label="短信验证码"
                        placeholder="请输入短信验证码"
                        icon="clear"
                        @click-icon="ruleForm.smsCode = ''"
                        required
                    >
                        <cool-button slot="button" size="small" type="primary" :time="120" :click="onSMS" :disabled="disabled">发送验证码</cool-button>
                    </van-field>
                </validater-item>
            </van-cell-group>
        </validater>
    </demo-block>
    <div class="padding-xl">
        <van-button @click="onSave($refs.form)" type="primary" size="large">确认绑定</van-button>
    </div>
</div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import CoolButton from "~/components/CoolButton.vue"
import Validater from '~/components/Validater.vue';
import ValidaterItem from '~/components/ValidaterItem.vue';
export default {
    components:{
        Validater,ValidaterItem,CoolButton
    },
    data(){
        return {
            phoneNumber:"",
            ruleForm:{
                "name": "",
                "phoneNumber": "",
                "smsCode": "",
                "openId": ""
            },
            rules:{
                name:[{event:'blur',check:'required',msg:'姓名不能为空！'}],
                phoneNumber:[{event:'blur',check:'required,phone',msg:'请填写手机号码！'}],
                smsCode:[{event:'blur',check:'required,number',msg:'请填写短信验证码！'}]
            }
        };
    },
    methods:{
        onSave(form){
            let me = this;
            form.validate().then(b=>{
                if(!b){return false;}
                axios.put(apiConfig.wechat_BindDoctorByPhone,me.ruleForm).then(respones=>{
                    me.$toast.success("绑定成功");
                    me.$router.replace({path:`/login/?openid=${me.userinfo.openId}`});
                });
            }).catch(x=>{});
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
        disabled(){
            var me=this,phone=me.phoneNumber,input=me.ruleForm.phoneNumber;
            if(!/^1[0-9]{10}$/.test(input)){return true;}
            if(phone!==input){return true;}
            return false;
        },
        userinfo(){ return this.$store.state.modules.userinfo; }
    },
    mounted(){
        var me=this,q=me.$route.query;
        me.phoneNumber=q.phoneNumber;
        me.ruleForm.openId=me.userinfo.openId;
    }
}
</script>


