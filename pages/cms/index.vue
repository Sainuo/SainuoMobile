<template>
    <div>
        <van-tabs v-model="active">
            <van-tab v-for="index in 4" :title="'选项 ' + index" :key="index">
                内容 {{ index }}
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
export default {
  data() {
    return {
      active: 2
    };
  }
}
</script>