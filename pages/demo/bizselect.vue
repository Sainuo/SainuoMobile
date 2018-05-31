<template>
  <div>
    <demo-block title="下拉框">
      <van-cell-group>
          <biz-select title="人员选择" v-model="ruleForm.id" remote src="/data/bizselect.json"/>
          <biz-select title="民族" v-model="ruleForm.nationality" remote :modelMap="model=>model.data" src="/data/nationality.json"/>
          <biz-select title="民族" v-model="ruleForm.nationality2" remote :modelMap="model=>model.data" empty-text="全部" clearable src="/data/nationality.json"/>
      </van-cell-group>
      <div class="margin-top-xl">
          <van-button @click="getData">显示数据</van-button>
          <van-button @click="setData">设置数据</van-button>
      </div>
    </demo-block>
  </div>
</template>
<script>
import BizSelect from "~/components/BizSelect.vue"
export default {
  components: {
    "biz-select": BizSelect
  },
  data() {
    return {
      ruleForm: {
        id: null,
        nationality:"",
        nationality2:""
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
        id: 2,
        nationality:"02",
        nationality2:null
      };
    }
  },
  mounted(){
    window.vm=this;
  }
};
</script>

