<template>
    <div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished"  @load="onLoad">
              <nuxt-link v-if="list.length"  v-for="(item,index) in list" :key="index" :to="`messagedetail?id=${item.id}`" class="padding-xl item">
                <div class="padding-xl itemborder iteminrow" >
                  <div>
                    <h3 class="margin-top-0">{{item.title}}</h3>
                    <div class="color-gray">
                        <span>{{item.timeStr}}</span>
                    </div>
                  </div>
                  <div class="itemstate">
                    <span class="vertical-middle hasReply">{{item.hasReply}}</span>
                  </div>
                </div>
              </nuxt-link>
              <div v-else class="text-align-center">
                <span>没有留言</span>
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
          if(callBack) callBack(r.items.length);
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