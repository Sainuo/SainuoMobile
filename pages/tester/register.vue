<template>
    <div>
        <van-notice-bar text="请认真填写以下信息 一旦提交将不能修改"/>
        <demo-block title="基本信息">
        <van-cell-group>
            <van-field
                v-model="ruleForm.name"
                label="姓名"
                icon="clear"
                placeholder="请输入姓名"
                required
                @click-icon="ruleForm.name = ''"
            />
            
            <biz-cell-select required title="民族" v-model="ruleForm.projectId" remote :modelMap="model=>model.data" empty-text="请选择" clearable src="/data/nationality.json"/>

            <biz-cell-date-picker
                required
                title="生日" 
                :min-date="new Date().thisYearFirstDate().addDate('y',-100)"
                :max-date="new Date()"
                v-model="ruleForm.birthday"
            />

            <van-field
                v-model="ruleForm.phoneNumber"
                label="电话号码"
                icon="clear"
                placeholder="电话号码"
                type="tel"
                required
                @click-icon="ruleForm.phoneNumber = ''"

            />

            <van-field
                center
                v-model="ruleForm.smsCode"
                label="短信验证码"
                placeholder="请输入短信验证码"
                icon="clear"
                @click-icon="ruleForm.smsCode = ''"
            >
                <van-button slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>
        </van-cell-group>
        </demo-block>
            
        <demo-block title="性别">
            <van-cell-group>
            <van-cell title="女性" clickable @click="ruleForm.gender = 0">
                <van-radio :name="0" v-model="ruleForm.gender" />
            </van-cell>
            
            <van-cell title="男性" clickable @click="ruleForm.gender = 1">
                <van-radio :name="1" v-model="ruleForm.gender"/>
            </van-cell>
            </van-cell-group>
        </demo-block>
        <demo-block title="参与项目">
            <biz-cell-select required title="项目" v-model="ruleForm.medProjectId" remote :modelMap="model=>model.result.items" value-field="id" display-field="projectName" empty-text="请选择" :src="urls.project_get"/>
        </demo-block>
        <div class="padding-xl">
            <van-button @click="onSave" type="primary" size="large">显示值</van-button>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import BizCellDatePicker from "~/components/BizCellDatePicker.vue"
import BizCellSelect from "~/components/BizCellSelect.vue"

export default {
    components:{
        "biz-cell-date-picker":BizCellDatePicker,
        "biz-cell-select":BizCellSelect
    },
    data(){
        return {
            urls:{
                project_get:apiConfig.project_get
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
            }
        };
    },
    methods:{
        onSave(){
            let me=this;
            axios.post(apiConfig.wechat_createTester,me.ruleForm).then(response=>{

            });
        }
    },
    computed: {
        info(){ return this.$store.state.modules.userinfo.info; }
    }
}
</script>