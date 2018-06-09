<template>
    <div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished"  @load="onLoad">
                <nuxt-link v-if="list.length"  v-for="(item,index) in list" :key="index" :to="`detail?id=${item.id}`">
                <div class="articlelist padding-xl border-bottom-m border-color-default">
                    <div class="face">
                        <img :src="item.img"/>
                    </div>
                    <div class="article padding-left-xl">
                      <h3 class="text-ellipsis margin-top-0">{{item.title}}</h3>
                        <p v-html="item.content"></p>
                        <div>
                            <span>{{item.creationTimeStr}}</span><a class="float-right">查看详情</a>
                        </div>
                    </div>
                </div>
                </nuxt-link>
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
import axios from "axios"
export default {
 data:()=>({
      search:{
        categoryId:0,
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
      this.loadData();
    },
    loadData(callBack){
      let me = this;
      me.search.skipCount=me.list.length;
      axios.get(apiConfig.article_get,{params:me.search}).then(response=>{
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
  },
  mounted(){
    this.search.categoryId=this.$route.id;
  }
}
</script>
<style scoped>
  .articlelist{
    display: flex;
    flex-direction: row;
  }

  .articlelist .face{
    min-width: 40%;
  }
  
  .articlelist .face img{
    width: 100%;
  }

  .articlelist .article{
    flex: auto;
  }
</style>