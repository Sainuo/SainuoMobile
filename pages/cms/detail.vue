<template>
    <div class="padding-xl rich_media_content">
        <h1 class="text-align-center">{{detail.title}}</h1>
        <div>
            <span>{{detail.creationTimeStr}}</span>&nbsp;&nbsp;<span class="color-blue">{{detail.author}}</span>
        </div>
        <div v-html="htmlDecode(detail.content)"></div>
    </div>
</template>
<script>
import axios from "axios"
import apiConfig from '~/static/apiConfig'
import utility from "~/static/javascript/utility"
export default {
    data(){
        return {
            id:0,
            detail:{
                "id": 0,
                "title": "加载中",
                "categoryId": 0,
                "category": {
                    "id": 0,
                    "name": "string"
                },
                "img": "",
                "content": "加载中",
                "author": "加载中",
                "creationTimeStr": "0000-00-00",
                "isTop": true
            }
        };
    },
    methods:{
        loadData(){
            let me=this;
            axios.get(apiConfig.article_read,{params:{id:me.id}}).then(response=>{
                me.detail=response.data.result;
            });
        },
        htmlDecode(val){
            let v=utility.htmlDecode(val);
            console.log(v);
            return v;
        }
    },    
    mounted(){
        let me = this;
        me.id = me.$route.query.id;
        me.loadData();
    }
}
</script>

