<template>
    <div>
        <van-cell @click="show=true" :title="title" is-link :value="display" />
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
    emptyText:{
        type:String,
        default:"无"
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
      me.updateValue(val);
    }
  },
  methods: {
    onConfirm() {
        let selected=this.$refs.picker.getColumnValue(0);
        this.val = selected;
        this.$emit("input",this.valueMap(selected));
        this.show = false;
    },
    onCancel() {
        this.show = false;
    },
    getValueField: function(item) {
      var me = this;
      if (me.valueField !== "model") {
        return item[me.valueField];
      }
      return item;
    },
    updateValue: function(val) {
      let me=this;
      let index=me.getIndexByModel(val);
      if(index>-1){
        me.val=me.options[index];
        me.$refs.picker.setColumnIndex(0,index);
      }
    },
    loadData: function() {
      var me = this;
      me.loading = true;

      axios.get(me.src, { params: me.params }).then(function(response) {
        me.options= me.modelMap(response.data);
        if(me.clearable)me.addEmptyModel();
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
    },
    addEmptyModel(){
      let me = this;
      let o = {};

      if(this.displayField!==""){
        o[this.displayField]=this.emptyText;
      }
      if(this.valueField!==""){
        o[this.valueField]=null;
      }

      me.options.unshift(o);
    }
  },
  computed:{
    display(){
      if(this.val ==="" || this.val===null ){
        return this.placeholder;
      }
      else if(this.displayField==="model"){
        return this.val;
      }
      else if(typeof this.displayField==="string"){
        return this.val[this.displayField];
      }
      return "";
    }
  },
  mounted: function() {
    var me = this;
    if (me.autoLoad) {
      me.loadData();
    }
    me.$on("load",()=>{
      me.updateValue(me.value);
    });
  }
};
</script>

