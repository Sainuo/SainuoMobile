<template>
    <div>
        <van-tabs v-model="active">
            <van-tab v-for="(tab,index) in tabs" :title="tab" :key="index">
                <nuxt-loader :path="'list'"></nuxt-loader>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import { Tabs, Tab } from "vant";
import nuxtloader from "~/components/nuxt-loader";
export default {
  data() {
    return {
      tabs: ["新闻资讯", "检验项目", "活动推广"],
      active: 0
    };
  },
  components: {
    'nuxt-loader':nuxtloader
  }
};
</script>