<template>
    <div>
        <van-tabs v-model="active">
            <van-tab v-for="(item,index) in tabs" v-if="item.isShow" :title="item.name" :key="index">
                <nuxt-loader :path="`list?id=${item.id}`"></nuxt-loader>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import { Tabs, Tab } from "vant";
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import nuxtloader from "~/components/nuxt-loader";
export default {
  components: {
    'nuxt-loader':nuxtloader
  },
  data() {
    return {
      tabs: [
        [
          {
            "id": 0,
            "name": "string",
            "creationTime": "2018-06-09T12:45:25.991Z",
            "creationTimeStr": "string",
            "order": 0,
            "isShow": true
          }
        ]
      ],
      active: 0
    };
  },
  methods:{
    loadData(){
      axios.get(apiConfig.category_all_get).then(response=>{
        this.tabs = response.data;
      });
    }
  },
  mounted(){
    this.loadData();
  }
}
</script>