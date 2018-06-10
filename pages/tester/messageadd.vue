<template>
    <div>
        <van-cell-group>
            <van-field
                v-model="ruleForm.title"
                label="留言标题"
                icon="clear"
                placeholder="请输入留言标题"
                required
                :error-message="rules.title"
                @click-icon="rules.title = ''"
            />
            <van-field
                v-model="ruleForm.content"
                label="留言内容"
                icon="clear"
                placeholder="请输入留言内容"
                type="textarea"
                rows="1"
                autosize
                required
                :error-message="rules.content"
                @click-icon="rules.content = ''"
            />
        </van-cell-group>
        <div class="padding-xl">
            <van-button @click="onSave" size="large" type="primary">保存留言</van-button>
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
                title:"",
                content:""                
            },
            rules:{
                title:"",
                content:""
            }
        };
    },
    methods:{
        onSave(){
            let me=this;
            let ruleForm=me.ruleForm;
            let rules=me.rules;

            ruleForm.title===""?rules.title="请输入标题":"";
            ruleForm.content===""?rules.content="请输入内容":"";

            if(ruleForm.title!=="" && ruleForm.content!==""){
                axios.post(apiConfig.message_addMessage,ruleForm).then(()=>{
                    me.$nuxt.$toast.success("留言成功");
                    me.$router.back();
                });
            }
        }
    }
}
</script>