<template>
    <div>
        <h3>{{detail.title}}</h3>
        <div><span>{{detail.author}}</span><span>{{deatil.creationTimeStr}}</span></div>
        <div class="rich_media_content" v-html="detail.content"></div>
    </div>
</template>
<script>
import axios from "axios"
import apiConfig from '~/static/apiConfig'
export default {
    data(){
        return {
            id:0,
            detail:{
                "id": 0,
                "title": "string",
                "categoryId": 0,
                "category": {
                    "id": 0,
                    "name": "string"
                },
                "img": "string",
                "content": "string",
                "author": "string",
                "creationTimeStr": "string",
                "isTop": true
            }
        };
    },
    loadData(){
        axios.get(apiConfig.article_read,{params:{id:this.id}}).then(response=>{
            this.detail=response.data.result;
        });
    },
    mounted(){
        this.id=this.$route.query.id;
        this.loadData();
    }
}
</script>

