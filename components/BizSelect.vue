<template>
    <div>
        <van-cell @click="show=true" :title="title" is-link :value="value['displayField']" />
        <van-popup v-model="show" position="bottom">
            <van-picker
            ref="picker"
            :loading="loading"
            show-toolbar
            title="标题"
            :value-key="displayField"
            :columns="options"
            @cancel="onCancel"
            @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>
<script>
/**
 * author      : 反转的分针
 * date        : 20170713
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
 *    <biz-select v-model="search.RoleUid" src="/api/Account/Role" :show-columns="['RoleName']" display-field="RoleName" value-field="Uid" placeholder="选择角色"></biz-select><br />
 */
import axios from "axios";
export default {
  props: {
    src: {
      type: String,
      default: ""
    },
    autoLoad: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    title:{
        type:String,
        default:"请选择"
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    modelMap: {
      type: Function,
      default: model => {
        return model;
      }
    },
    params: {
      type: Object,
      default: () => ({
        skipCount: 0,
        maxCount: 65536
      })
    },
    valueField: {
      type: String,
      default: "id" //model:item|fieldName:item.fieldName
    },
    displayField: {
      type: String,
      default: "name"
    },
    remote: {
      type: Boolean,
      default: false
    },
    value: {
      type: String | Object,
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      show: false,
      val: "",
      options: []
    };
  },
  watch: {
    value: function(val, oldVal) {
      var me = this;
      me.val = val;
    }
  },
  methods: {
    onConfirm() {
        this.$emit("input",this.valueMap(val));
        this.show=false;
    },
    onCancel() {
        this.show=false;
    },
    getValueField: function(item) {
      var me = this;
      if (me.valueField !== "model") {
        return item[me.valueField];
      }
      return item;
    },
    updateValue: function(val) {
      this.val = val;
      this.$refs.picker.setColumnIndex(0, getIndexByModel(val));
    },
    loadData: function() {
      var me = this;
      me.loading = true;

      axios.get(me.src, { params: me.params }).then(function(response) {
        me.allOptions = me.modelMap(response.data);
        me.options = me.allOptions;
        me.loading = false;
        me.$emit("load", { target: me, data: me.allOptions });
      });
    },
    valueMap: function(value) {
      var me = this;
      var fields = [];
      if (me.valueField === "model") {
        return value;
      }
      else{
          return value[this.valueField];
      }
    },
    getIndexByModel(model){
        for(var i=0,item;item=this.options[i];i++){
            if(this.valueField==="model" && JSON.stringify(model)===JSON.stringify(item)){
                return i;
            }
            else if(model === item[this.valueField]){
                return i;
            }
        }
        return -1;
    }
  },
  mounted: function() {
    var me = this;
    if (me.autoLoad) {
      me.loadData();
    }
    me.updateValue(me.value);
  }
};
</script>

