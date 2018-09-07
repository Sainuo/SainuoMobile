<template>
    <van-cell :required="required" @click="onShow" :title="loading?'':title" is-link :value="display">
      <van-loading v-if="loading" slot="right-icon" color="black" class="van-cell__right-icon"/>
    </van-cell>
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
 *    <biz-cell-select required title="民族" v-model="ruleForm.projectId" remote :modelMap="model=>model.data" empty-text="全部" clearable src="/data/nationality.json"/>
 */
import Vue from "vue"
import axios from "axios";
import BizSelect from "./BizSelect.vue"
const BizSelectConstructor = Vue.extend(BizSelect)

export default {
  props: {
    src: {type: String,default: ""},
    autoLoad: {type: Boolean,default: true},
    clearable: {type: Boolean,default: false},
    disabled: {type: Boolean,default: false},
    emptyText:{type:String,default:"无"},
    title:{type:String,default:"请选择"},
    placeholder: {type: String,default: "请选择"},
    modelMap: {type: Function,default: model => {return model;}},
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
    displayField: {type: String,default: "name"},
    remote: {type: Boolean,default: false},
    value: {type: String | Object,default: ""},
    required:{type:Boolean,default:false}
  },
  data() {
    return {
      val: null,
      loading:false,
      picker:null,
      selectIndex: -1,
      list:[]
    };
  },
  watch: {
    value: function(val, oldVal) {
      this.val=val;
      this.picker.value=val;
    },
    params(n,o){
      if(n&&this.autoLoad){
        this.loadData();
      }
    }
  },
  methods: {
    onShow(){
      let me=this;
      me.picker.value=me.getIndexByModel(me.val);
      me.picker.show=true;
    },
    valueMap: function(value) {
      var me = this;
      if (me.valueField === "model") {
        return value;
      }
      else{
          return value[me.valueField];
      }
    },
    getIndexByModel(model){
        for(var i=0,item;item=this.list[i];i++){
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
      o[me.displayField]=me.emptyText;
      o[me.valueField]=null;
      me.list.unshift(o);
    },
    loadData: function() {
      var me = this;
      me.loading = true;

      axios.get(me.src, { params: me.params }).then(function(response) {
        me.list= me.modelMap(response.data);
        if(me.clearable){me.addEmptyModel();}
        me.loading = false;
        me.$emit("load", { target: me, data: me.allOptions });
      });
    },
    createPicker(){
      let me = this;
      let picker = me.picker=new BizSelectConstructor();
      picker.value = me.val;
      picker.valueField = me.valueField;
      picker.displayField = me.displayField;
      picker.columns = me.list;
      document.body.appendChild(picker.$mount(document.createElement("div")).$el);
      picker.$on("input",(index)=>{
        let selected = me.list[index];
        me.val=me.valueMap(selected);
        me.$emit("input",me.val);
        me.$emit('change',{type:'change'});
      });
    }
  },
  computed:{
    display(){
      var result='';
      if(this.val==="" || this.val===null){
        result= this.placeholder;
      }else if(this.displayField==="model"){
        result= this.val;
      }else if(typeof this.displayField==="string"){
        result= this.list[this.getIndexByModel(this.val)][this.displayField];
      }
      return result;
    }
  },
  mounted: function() {
    let me = this;
    me.val=me.value;
    if(me.autoLoad){
      me.loadData();
    }
    me.$on("load",(evt)=>{
      me.createPicker();
    });
  },
  destroyed(){
    document.body.removeChild(this.picker.$el);
    this.picker.$destroy();
    this.picker=null;
  }
};
</script>

