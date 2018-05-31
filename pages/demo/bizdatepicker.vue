<template>
  <div>
    <demo-block title="下拉框">
      <van-cell-group>
          <biz-date-picker title="生日" :minDate="new Date().thisYearFirstDate().addDate('y',-100)" v-model="ruleForm.birthday"/>
      </van-cell-group>
      <div class="margin-top-xl">
          <van-button @click="getData">显示数据</van-button>
          <van-button @click="setData">设置数据</van-button>
      </div>
    </demo-block>
  </div>
</template>
<script>
import BizDatePicker from "~/components/BizDatePicker.vue";
export default {
  components: {
    "biz-date-picker": BizDatePicker
  },
  data() {
    return {
      ruleForm: {
        birthday:null
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
        birthday: new Date(1985,4-1,6)
      };
    }
  },
  mounted(){
    window.vm=this;
  }
};
</script>

