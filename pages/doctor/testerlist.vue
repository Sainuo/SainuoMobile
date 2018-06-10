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
              <div v-for="(item,index) in list" :key="index" class="padding-xl itemborder" >
                <h3><span>{{item.name}}</span>&nbsp;<span>{{item.sex}}</span>&nbsp;<span>{{item.nationality}}</span></h3>
                <div class="color-gray">
                  <div>
                    <label>手机号码：</label>{{item.phoneNumber}}<span></span>
                  </div>
                  <div>
                    <label>出生日期：</label>{{item.birthday|date}}<span></span>
                  </div>
                  <div>
                    <label>受试项目：</label>{{item.project.projectName}}<span></span>
                  </div>
                </div>
              </div>
            </van-list>
        </van-pull-refresh>
        <van-popup class="searchOption" v-model="popup.show" position="right" :overlay="true">
           <div>
              <demo-block title="性别">
                <van-radio-group v-model="search.sex">
                  <van-cell-group>
                    <van-cell title="全部" clickable @click="search.sex = null">
                        <van-radio :name="null"/>
                    </van-cell>
                    <van-cell title="女性" clickable @click="search.sex = 0">
                        <van-radio :name="0"/>
                    </van-cell>
                    <van-cell title="男性" clickable @click="search.sex = 1">
                        <van-radio :name="1"/>
                    </van-cell>  
                  </van-cell-group>
                </van-radio-group>
              </demo-block>
              <demo-block title="检验项目">
                <van-cell-group>
                  <biz-cell-select title="项目" v-model="search.projectId" remote :modelMap="model=>model.result.items" value-field="id" display-field="projectName" empty-text="全部" clearable :src="urls.project_get"/>
                </van-cell-group>
              </demo-block>
              <div class="margin-top-xl padding-xl">
              <van-button type="primary" size="large" @click="()=>{popup.show=false;search();}">确定</van-button>
              </div>
           </div>
        </van-popup>
    </div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import BizCellSelect from "~/components/BizCellSelect.vue"
export default {
    components: {
      "biz-cell-select": BizCellSelect
    },
   data:()=>({
      urls:{
        project_get:apiConfig.project_get
      },
      popup:{
        show:false
      },
      search:{
        name:"",
        sex:null,
        projectId:null,
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
      this.list=[];
      this.loadData();
    },
    loadData(callBack){
      let me = this;
      me.search.skipCount=me.list.length;
      axios.get(apiConfig.wechat_getTesterPagedList,{params:me.search}).then(response=>{
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
