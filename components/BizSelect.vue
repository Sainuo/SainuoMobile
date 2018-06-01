<template>
    <van-popup v-model="show" position="bottom">
        <van-picker
        ref="picker"
        :loading="loading"
        show-toolbar
        title="标题"
        :value-key="displayField"
        :columns="columns"
        @cancel="show = false"
        @confirm="onConfirm"
        />
    </van-popup>
</template>
<script>
/**
 * author      : 反转的分针
 * date        : 2018-05-31
 * mail        : 114233763@qq.com
 * description : 模糊查询
 * @param {String} src http://xxx.yyy.zzz/abc/def?gh=ijk&lm=nop#qrst
 * @param {String} placeholder
 * @param {Array} showColumns
 * @param {String} valueField
 * @param {String} displayField
 * @param {String} value v-model
 * @returns {String|Object} item.DataValue
 * @example
 *    <biz-select title="民族" v-model="ruleForm.id" remote src="/data/nationnality.json"/>
 */

export default {
  props: {
    valueField: {
      type: String,
      default: "id" //model:item|fieldName:item.fieldName
    },
    displayField: {
      type: String,
      default: "name"
    },
    value: {
      type: String | Object,
      default: ""
    },
    columns:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  data() {
    return {
      loading: false,
      show: false,
      val: null
    };
  },
  watch: {
    value: function(val, oldVal) {
       this.updateValue(val);
    }
  },
  methods: {
    onConfirm() {
      let me=this;
      let index=me.$refs.picker.getColumnIndex(0);
      me.$emit("input",index);
      me.show = false;
    },
    updateValue: function(index) {
      let me=this;
      me.$refs.picker.setColumnIndex(0,index);
    }
  },
  mounted: function() {
    var me = this;
    me.updateValue(me.value);
  }
};
</script>

