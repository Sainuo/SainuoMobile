<template>
    <div>
        <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow @click-left="$router.back()"/>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished"  @load="onLoad">
              <div v-for="(item,index) in list" :key="index" class="padding-xl" >
                  <div>
                      <h3>用药记录</h3>
                  </div>
                  <div>
                      访视v0
                  </div>
                  <div class="color-red">
                      未填写
                  </div>
              </div>
            </van-list>
        </van-pull-refresh>
        <van-popup class="searchOption" v-model="popup.show" position="right" :overlay="true">
           <div class="padding-xl">
              <demo-block title="性别">
                <van-radio-group v-model="search.gender" class="padding-xl">
                  <van-radio :name="null">全部</van-radio>
                  <van-radio :name="0">女</van-radio>
                  <van-radio :name="1">男</van-radio>
                </van-radio-group>
              </demo-block>
              <demo-block title="检验项目">
                
              </demo-block>
              <div class="margin-top-xl">
              <van-button type="primary" size="large" @click="popup.show=false">确定</van-button>
              </div>
           </div>
        </van-popup>
    </div>
</template>
<script>
export default {
   data:()=>({
      popup:{
        show:false
      },
      search:{
        name:"",
        gender:null,
        programe:""
      },
      list: [],
      refreshing: false,
      loading: false,
      finished: false
  }),
  methods: {
    onSearch(){

    },
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
