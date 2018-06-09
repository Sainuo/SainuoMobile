<template>
    <div>
        <van-nav-bar title="肝多龙核苷酸" left-text="返回" left-arrow @click-left="$router.back()"/>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished"  @load="onLoad">
              <nuxt-link v-for="(item,index) in list" :key="index" v-if="list.length" :to="`collectdetail?id=${item.id}`" class="padding-xl item">
                <div class="padding-xl" >
                    <div>
                        <h3>{{item.title}}</h3>
                    </div>
                    <div>
                        {{item.name}}
                    </div>
                    <div class="color-red">
                        {{item.status}}
                    </div>
                </div>
              </nuxt-link>
              <div v-else class="text-align-center">
                <span>没有用药记录</span>
              </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
export default {
   data:()=>({
      search:{
        maxCount:10,
        skipCount:0,
      },
      list: [],
      refreshing: false,
      loading: false,
      finished: false
  }),
  methods: {
    onSearch(){
      this.loadData();
    },
    loadData(callBack){
      let me = this;
      me.search.skipCount = me.list.length;
      axios.get(apiConfig.wechat_getMyVisitNumbers,{params:me.search}).then(response=>{
          let r = response.data.result;
          if(me.list.length===0){
            me.list = r;
          }
          else{
            me.list = me.list.concat(r)
          }
          me.totalCount=r.totalCount;
         if(callBack) callBack(me.totalCount);
      });
    },
    onLoad() {
      let me=this;
      me.loadData(
        (count)=>{
          me.loading = false;
          if(count===0){
            me.finished = true;
          }
        }
      );
    },
    onRefresh() {
      let me=this;
      me.list=[];
      me.loadData(
        ()=>{
        me.finished = false;
        me.refreshing = false;
        window.scrollTo(0, 10);
        }
      );
    }
  }
}
</script>
