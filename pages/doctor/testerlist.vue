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
           <div>
              <demo-block title="性别">
                <van-radio-group v-model="search.gender">
                  <van-cell-group>
                    <van-cell title="全部" >
                        <van-radio :name="null"/>
                    </van-cell>
                    <van-cell title="女性">
                        <van-radio :name="0"/>
                    </van-cell>
                    <van-cell title="男性">
                        <van-radio :name="1"/>
                    </van-cell>  
                  </van-cell-group>
                </van-radio-group>
              </demo-block>
              <demo-block title="检验项目">
                <van-cell-group>
                  <biz-select title="民族" v-model="search.program" remote :modelMap="model=>model.data" empty-text="全部" clearable src="/data/nationality.json"/>
                </van-cell-group>
              </demo-block>
              <div class="margin-top-xl padding-xl">
              <van-button type="primary" size="large" @click="popup.show=false">确定</van-button>
              </div>
           </div>
        </van-popup>
    </div>
</template>
<script>
import BizSelect from "~/components/BizSelect.vue"
export default {
    components: {
      "biz-select": BizSelect
    },
   data:()=>({
      popup:{
        show:false
      },
      search:{
        name:"",
        gender:null,
        program:""
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