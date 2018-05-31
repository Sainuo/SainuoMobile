<template>
    <div>
        <van-cell-group>
            <van-field
                v-model="title"
                label="留言标题"
                icon="clear"
                placeholder="请输入留言标题"
                required
            />
            <van-field
                v-model="content"
                label="留言内容"
                icon="clear"
                placeholder="请输入留言内容"
                required
                disabled
            />
        </van-cell-group>
        <van-button @click="onSubmit" type="primary">保存留言</van-button>
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