<template>
    <div>
        <van-notice-bar text="请认真填写以下信息 一旦提交将不能修改"/>
        <validater ref="form" :model="ruleForm" :rules="rules">
            <demo-block title="基本信息">
                <van-cell-group>
                    <validater-item prop="name">
                        <van-field
                            v-model="ruleForm.name"
                            required
                            label="姓名"
                            icon="clear"
                            placeholder="请输入姓名"
                            @click-icon="ruleForm.name = ''"
                        />
                    </validater-item>
                    <validater-item prop="nationality">
                        <biz-cell-select required title="民族" v-model="ruleForm.nationality" remote :modelMap="model=>model.data" empty-text="请选择民族" clearable src="/data/nationality.json"/>
                    </validater-item>
                    <validater-item prop="birthday">
                        <biz-cell-date-picker
                            required
                            title="生日" 
                            :min-date="new Date().thisYearFirstDate().addDate('y',-100)"
                            :max-date="new Date()"
                            v-model="ruleForm.birthday"
                        />
                    </validater-item>
                    <validater-item prop="phoneNumber">
                        <van-field
                            v-model="ruleForm.phoneNumber"
                            label="电话号码"
                            icon="clear"
                            placeholder="电话号码"
                            type="tel"
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
                            <cool-button slot="button" size="small" type="primary" :time="120" :click="onSMS" :disabled="!/^1[0-9]{10}$/.test(ruleForm.phoneNumber)">发送验证码</cool-button>
                        </van-field>
                    </validater-item>
                </van-cell-group>
            </demo-block>
            <demo-block title="性别">
                <van-cell-group>
                    <validater-item prop="gender">
                        <van-cell title="女性" clickable @click="ruleForm.gender = 0">
                            <van-radio :name="0" v-model="ruleForm.gender" />
                        </van-cell>
                        <van-cell title="男性" clickable @click="ruleForm.gender = 1">
                            <van-radio :name="1" v-model="ruleForm.gender"/>
                        </van-cell>
                    </validater-item>
                </van-cell-group>
            </demo-block>
            <demo-block title="参与项目">
                <van-cell-group>
                    <validater-item prop="medProjectId">
                        <biz-cell-select required title="项目" v-model="ruleForm.medProjectId" remote :modelMap="model=>model.result.items" value-field="id" display-field="projectName" clearable empty-text="请选择项目" :src="urls.project_get" :params="org" />
                    </validater-item>
                </van-cell-group>
            </demo-block>
        </validater>
        <div class="padding-xl">
            <van-button @click="onSave($refs.form)" type="primary" size="large">保存</van-button>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import BizCellDatePicker from "~/components/BizCellDatePicker.vue"
import BizCellSelect from "~/components/BizCellSelect.vue"
import CoolButton from "~/components/CoolButton.vue"
import Validater from '~/components/Validater.vue';
import ValidaterItem from '~/components/ValidaterItem.vue';
export default {
    components:{
        Validater,ValidaterItem,CoolButton,
        "biz-cell-date-picker":BizCellDatePicker,
        "biz-cell-select":BizCellSelect
    },
    data(){
        return {
            org:{organizationId:0},
            urls:{
                project_get:apiConfig.project_in_organization
            },
            ruleForm:{
                "organizationUnitId":0,
                "openId": "",
                "phoneNumber": "",
                "name": "",
                "medProjectId": null,
                "gender": 0,
                "birthday": new Date(),
                "nationality": "",
                "smsCode":""
            },
            rules:{
                name:[{event:'blur',check:'required',msg:'姓名不能为空！'}],
                nationality:[{event:'change',check:'required',msg:'民族不能为空！'}],
                birthday:[{event:'change',check:'required',msg:'生日不能为空！'}],
                phoneNumber:[{event:'blur',check:'required,phone',msg:'请填写手机号码！'}],
                smsCode:[{event:'blur',check:'required,number',msg:'请填写短信验证码！'}],
                medProjectId:[{event:'change',check:'required',msg:'参与项目不能为空！'}]
            }
        };
    },

    methods:{
        onSave(form){
            let me=this;
            form.validate().then(b=>{
                if(!b){return false;}
                axios.post(apiConfig.wechat_createTester,me.ruleForm).then(response=>{
                    me.$toast.success("保存成功");
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
        userinfo(){ return this.$store.state.modules.userinfo; }
    },
    mounted(){
        var me=this;
        this.ruleForm.organizationUnitId = parseInt(this.$route.query.organizationUnitId);
        this.ruleForm.openId = this.userinfo.openId;
        me.org.organizationId=this.ruleForm.organizationUnitId;
    }
}
</script>