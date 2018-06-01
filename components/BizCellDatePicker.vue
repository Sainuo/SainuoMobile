<template>
    <van-cell @click="onShow" :title="title" is-link :value="display" />
</template>
<script>
/**
 * author      : 反转的分针
 * date        : 2018-05-31
 * mail        : 114233763@qq.com
 * description : 模糊查询
 * @param {String} value v-model
 * @returns {Date} item.DataValue
 * @example
 *    <biz-select title="民族" v-model="ruleForm.id" remote src="/data/nationnality.json"/>
 */
import Vue from "vue"
import BizDatePicker from "./BizDatePicker.vue"
const BizDatePickerConstructor = Vue.extend(BizDatePicker)
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    title:{
      type:String,
      default:"请选择"
    },
    minDate:{
      type:Date,
      default:()=>new Date().thisYearFirstDate().addDate('y',-10)
    },
    maxDate:{
      type:Date,
      default:()=>new Date().thisYearLastDate().addDate('y',10)
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    format:{
      type:String,
      default:"yyyy-MM-dd"
    },
    value: {
      type: Date,
      default:()=>new Date()
    }
  },
  data() {
    return {     
      val: new Date(),
      picker:null
    };
  },
  watch: {
    value: function(val, oldVal) {
      this.updateValue(val);
    }
  },
  computed:{
    display(){
      if(this.val){
        return this.val.format(this.format);
      }
      return this.placeholder;
    }
  },
  methods: {
    updateValue(val){
      if(val){
          this.val=new Date(val);
      }
      else{
        this.val=val;
      }
    },
    onShow(){
      let picker=this.picker;
      picker.value=this.val;
      picker.show=true;
    },
    createPicker(){
      let picker=this.picker=new BizDatePickerConstructor();
      picker.value=this.val;
      picker.maxDate=this.maxDate;
      picker.minDate=this.minDate;

      document.body.appendChild(picker.$mount(document.createElement("div")).$el);
      picker.$on("input",(evt)=>{
        this.$emit("input",evt);
      });
    }
  },
  mounted() {
    this.updateValue(this.value);
    this.createPicker();
  },
  destroyed(){
    document.body.removeChild(this.picker.$el);
    this.picker.$destroy();
    this.picker=null;
  }
};
</script>