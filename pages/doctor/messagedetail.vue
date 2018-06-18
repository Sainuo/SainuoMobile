<template>
    <div>
        <demo-block title="受试者留言">
            <van-cell-group>
                <van-field
                    v-model="message.title"
                    label="留言标题"
                    placeholder="请输入留言标题"
                    disabled
                />
                <van-field
                    v-model="message.content"
                    label="留言内容"
                    placeholder="请输入留言内容"
                    disabled
                />
            </van-cell-group>
        </demo-block>
        <demo-block title="留言">
            <van-field
                v-for="(item,index) in replies"
                :key="index"
                v-model="item.content"
                :label="item.userName"
                placeholder="请输入留言内容"
                disabled
            />
        </demo-block>
        <demo-block title="回复">
            <van-cell-group>
                <van-field
                    v-model="ruleForm.reply"
                    label="回复内容"
                    type="textarea"
                    placeholder="请输入留言"
                    rows="1"
                    autosize
                    required
                    icon="clear"
                    @click-icon="ruleForm.reply = ''"
                    :error-message="rules.reply"
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
            rules:{
                reply:""
            },
            ruleForm:{
                reply:""
            },
            replies:[],
            
        };
    },
    methods:{
        onSave(){
            let me = this;
            if(me.ruleForm.reply===""){
                me.rules.reply="请输入留言";
                return;
            }
            else{
                me.rules.reply="";
            }

            axios.post(apiConfig.message_addReply,{
                "messageId": me.id,
                "content": me.ruleForm.reply
            })
            .then(response=>{
                me.ruleForm.reply="";
                me.loadReplies();
            });
        },
        loadMessage(){
            let me=this;
            axios.get(apiConfig.message_read,{params:{id:me.id}}).then(response=>{
                me.message=response.data.result;
            });
        },
        loadReplies(){
            let me=this;
            axios.get(apiConfig.message_getReplyList,{params:{id:me.id}}).then(response=>{
                me.replies = response.data.result;
            });
        }
    },
    mounted(){
        let me=this;
        window.vm=me;
        let id=me.$route.query.id;;
        if(id){
            me.id=id;
            me.loadMessage();
            me.loadReplies();
        }
    }
}
</script>