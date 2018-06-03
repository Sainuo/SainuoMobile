<template>
    <div>
        <van-tabs v-model="active">
            <van-tab v-for="(tab,index) in tabs" :title="tab" :key="index">
                <nuxt-loader src="detail" />
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import NuxtLoader from "~/components/nuxt-loader";
export default {
  components: {
    "nuxt-loader": NuxtLoader
  },
  data() {
    return {
        tabs:[
            '新闻资讯',
            '检验项目',
            '活动推广'
        ],
        active: 0
    };
  }
};
</script>