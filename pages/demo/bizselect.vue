<template>
  <div>
      <van-cell-group>
          <biz-select v-model="id" remote src="/data/bizselect.json"/>
      </van-cell-group>
      <div>
          <van-button @click="getData">显示数据</van-button>
      </div>
  </div>
</template>
<script>
import BizSelect from "~/components/BizSelect.vue";
export default {
  components: {
    "biz-select": BizSelect
  },
  data() {
    return {
      ruleForm: {
        id: null
      }
    };
  },
  methods: {
    getData() {
      this.$dialog.alert({
        message: JSON.stringify(this.ruleForm)
      });
    },
    setData() {
      this.ruleForm = {
        id: 1
      };
    }
  }
};
</script>

