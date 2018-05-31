<template>
    <div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished"  @load="onLoad">
              <nuxt-link to="messagedetail" class="padding-xl item">
                <div v-for="(item,index) in list" :key="index" class="padding-xl" >
                  <h3>肝龙胶囊能加量服用呢</h3>
                  <div class="color-gray">
                      <span>2018-5-4</span>
                  </div>
                  <div class="float-right vertical-middle">已回复</div>
                </div>
              </nuxt-link>
            </van-list>
        </van-pull-refresh>
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