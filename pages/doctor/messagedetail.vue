<template>
    <div>
        <van-cell-group>
            <van-field
                v-model="title"
                label="留言标题"
                icon="clear"
                placeholder="请输入用户名"
                required
                disabled
            />
            <van-field
                v-model="content"
                label="留言内容"
                icon="clear"
                placeholder="请输入用户名"
                required
                disabled
            />
            <van-field
                v-model="message"
                label="回复内容"
                type="textarea"
                placeholder="请输入留言"
                rows="1"
                autosize
            />
        </van-cell-group>
        <van-button @click="onSubmit" type="primary">保存回复</van-button>
    </div>
</template>
<script>
import axios from "axios"
export default {
    data(){
        return {
            title:"",
            content:"",
            message:""
        };
    },
    methods:{
        onSubmit(){

        }
    }
}
</script>