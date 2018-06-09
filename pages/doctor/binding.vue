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
                    @click-icon="username = ''"
                />
                <van-field
                    v-model="ruleForm.phonenumber"
                    type="tel"
                    label="电话"
                    icon="clear"
                    placeholder="请输入用户名"
                    required
                    @click-icon="username = ''"
                />
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
                name:"",
                phonenumber:""
            }
        };
    },
    methods:{
        onSave(){
            let me=this;
            axios.post("",me.ruleForm).then(respones=>{
                
            });
        }
    }
}
</script>


