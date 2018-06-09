<template>
    <div>
        <van-cell-group>
            <van-field
                v-model="ruleForm.title"
                label="留言标题"
                icon="clear"
                placeholder="请输入留言标题"
                required
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
                content:"",
                message:""
            }
        };
    },
    methods:{
        onSave(){

        }
    }
}
</script>