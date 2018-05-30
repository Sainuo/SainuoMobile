<template>
    <div>
        <van-search v-model="search.name" show-action @search="onSearch" placeholder="受试者姓名">
          <div slot="action" @click="onSearch">
            <span class="margin-left-right-xl">
              <span class="vertical-align-middle">搜索</span>
              <van-icon name="wap-nav" class="margin-left-l vertical-align-middle" @click="popup.show=true" />
            </span>
          </div>
        </van-search>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished"  @load="onLoad">
              <div v-for="(item,index) in list" :key="index" class="padding-xl" >
                <h3><span>张某某</span>&nbsp;<span>男</span>&nbsp;<span>白族</span></h3>
                <div class="color-gray">
                  <div>
                    <label>手机号码：</label><span></span>
                  </div>
                  <div>
                    <label>出生日期：</label><span></span>
                  </div>
                  <div>
                    <label>受试项目：</label><span></span>
                  </div>
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