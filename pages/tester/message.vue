<template>
    <div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished"  @load="onLoad">
              <nuxt-link v-if="list.length" to="messagedetail" class="padding-xl item">
                <div v-for="(item,index) in list" :key="index" class="padding-xl" >
                  <h3>{{item.title}}</h3>
                  <div class="color-gray">
                      <span>{{item.timeStr}}</span>
                  </div>
                  <div class="float-right vertical-middle">{{item.hasReply}}</div>
                </div>
              </nuxt-link>
              <div v-else class="text-align-center">
                <span>没有留言</span>
              </div>
            </van-list>
        </van-pull-refresh>
        <div class="padding-xl">
          <nuxt-link to="messageadd">
            <van-button type="primary" size="large">添加新留言</van-button>
          </nuxt-link>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
export default {
   data:()=>({
      popup:{
        show:false
      },
      search:{
        skipCount:0,
        maxResultCount:10
      },
      list: [],
      refreshing: false,
      loading: false,
      finished: false
  }),
  methods: {
    onSearch(){

    },
    loadData(callBack){
      let me = this;
      me.search.skipCount=me.list.length;
      axios.get(apiConfig.message_getMessagePagedList,{params:me.search}).then(response=>{
          let r = response.data.result;
          if(me.list.length===0){
            me.list = r.items;
          }
          else{
            me.list = me.list.concat(r.items)
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