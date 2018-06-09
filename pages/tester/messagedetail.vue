<template>
    <div>
        <demo-block title="受试者留言">
            <van-cell-group>
                <van-field
                    v-model="message.title"
                    label="留言标题"
                    icon="clear"
                    placeholder="请输入留言标题"
                    required
                    disabled
                />
                <van-field
                    v-model="message.content"
                    label="留言内容"
                    icon="clear"
                    placeholder="请输入留言内容"
                    required
                    disabled
                />

                <van-field
                    v-for="(item,index) in replies"
                    :key="index"
                    v-model="item.content"
                    label="留言内容"
                    icon="clear"
                    placeholder="请输入留言内容"
                    required
                    disabled
                />

                <van-field
                    v-model="reply"
                    label="回复内容"
                    type="textarea"
                    placeholder="请输入留言"
                    rows="1"
                    autosize
                />
            </van-cell-group>
        </demo-block>
        <div class="padding-xl">
            <van-button size="large" @click="onSave" type="primary">保存回复</van-button>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
export default {
    data(){
        return {
            id:0,
            message:{
                title:"",
                content:""
            },
            replies:[],
            reply:""
        };
    },
    methods:{
        onSave(){
            let me=this;
            axios.post(apiConfig.message_addReply,{
                "messageId": me.id,
                "content": me.reply
            })
        },
        loadMessage(){
            let me=this;
            axios.get(apiConfig.message_read,{params:{id}}).then(response=>{
                me.message=resopnse.data;
            });
        },
        loadReplies(){
            let me=this;
            axios.get(apiConfig.message_getReplyPagedList,{params:{id:this.id,maxResultCount:65536,skipCount:0}}).then(response=>{
                me.replies=response.data.result.items;
            });
        }
    },
    mounted(){
        let me=this;
        let id=me.$route.query.id;;
        if(id){
            me.id=id;
            me.loadMessage();
            me.loadReplies();
        }
        window.vm=this;
    }
}
</script>