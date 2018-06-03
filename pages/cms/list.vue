<template>
    <div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished"  @load="onLoad">
                <div class="articlelist padding-xl border-bottom-m border-color-default" v-for="(key,index) in list" :key="index">
                    <div class="face">
                        <img src="~/static/images/logo.png"/>
                    </div>
                    <div class="article padding-left-xl">
                      <h3 class="text-ellipsis margin-top-0">赛诺只要获国家高新技术大奖</h3>
                        <p>
                          
2月14日，来自全国种植技术的专家学者对我基地澳洲大镰基因分离技......
赛诺只要获国家高新技术大奖  
                        </p>
                        <div>
                            <span>2014-3-14</span><a class="float-right">查看详情</a>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
import axios from "axios"
export default {
 data:()=>({
      list: [],
      refreshing: false,
      loading: false,
      finished: false
  }),
  methods: {
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          const text = this.list.length + 1;
          this.list.push(text < 10 ? '0' + text : text);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    onRefresh() {
      setTimeout(() => {
        this.list = [];
        this.finished = false;
        this.refreshing = false;
        window.scrollTo(0, 10);
      }, 1000);
    }
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