<template>
  <div v-loading="loading">
      <el-tag :key="index" v-for="(tag,index) in options" :closable="!disabled" :disable-transitions="false" @close="onDelete(tag,index)">{{onDisplay(tag)}}</el-tag>
      <template v-if="!disabled">
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="onAdd">+ 新标签</el-button>
      </template>
  </div>
</template>
<script>
import ELEMENT from "element-ui"
import axios from "axios"
  /**
 * author      : 反转的分针
 * date        : 20180518
 * mail        : 114233763@qq.com
 * description : 模糊查询
 * @param {String} src http://xxx.yyy.zzz/abc/def?gh=ijk&lm=nop#qrst
 * @param {String} valueField
 * @param {String} displayField
 * @param {Array} value v-model
 * @returns {Array} item.DataValue
 * @example
 * 
 */
  export default {
     props: {
        disabled:{
          type:Boolean,
          default:false,
        },
        src: {
            type: String,
            default: ""
        },
        modelMap:{
            type:Function,
            default(model){
                return model;
            }
        },
        params:{
            type:Object,
            default(){
              return {
                skipCount:0,
                maxCount:65536
              };
            }
        },
        handleAdd:{
          type:Function,
          default(callback){
            this.inputVisible = true;
            this.$nextTick(()=> {
              this.$refs.saveTagInput.$refs.input.focus();
            });
            this.$once("inputComplete",(evt)=>{
              this.inputVisible = false;
              this.inputValue = '';
              if(evt.value.length>0){
                callback(evt.value);
              }
            });
          }
        },
        handleDelete:{
          type:Function,
          default(callback,model){
            let me=this;
            me.$confirm(`确定删除${me.onDisplay(model)}`).then(()=>{
              callback();
            });
          }
        },
        valueField: {
            type: String,
            default: "model"//model:item|fieldName:item.fieldName
        },
        displayField: {
            type: String,
            default: "model"//model:item|fieldName:item.fieldName
        },
        remote: {
            type: Boolean,
            default: false
        },
        value: {
            type: Array,
            default(){
              return [];
            }
        }
    },
    data() {
      return {
        loading:false,
        inputVisible: false,
        inputValue: '',
        val:[],
        options: [],
        allOptions:[]
      };
    },
    watch: {
      "value": function (val, oldVal) {
          this.val = val;
          this.fillOptions();
      }
    },
    computed: {
      returnVal(){
        if(this.valueField==="model")
        {
          return this.options;
        }
        else
        {
          return this.options.map(model=>model[this.valueField]);
        }
      }
    },
    methods: {
      handleInputConfirm(evt){
          this.$emit("inputComplete",{value:this.inputValue});
      },
      updateValue: function (val) {
        this.val = val;
        this.fillOptions();
      },
      onDelete(tag,index) {
        let fnCallback=()=>{
            this.options.splice(index,1);
            this.$emit("input",this.returnVal);
        }
        this.handleDelete(fnCallback,tag);
      },
      onAdd(){
        let fnCallback=(model)=>{
            this.options.push(model);
            this.$emit("input",this.returnVal);
        };
        this.handleAdd(fnCallback);
      },
      loadData() {
          var me = this;
          if(me.remote){
            me.remoteLoad();
          }
          else{
            me.fillOptions();
          }
      },
      remoteLoad(){
          let me=this;
          me.loading = true;
          axios.get(me.src,{params:this.params})
          .then(respons=> {
              me.allOptions = me.modelMap(respons.data);
              me.fillOptions();
              me.$emit("load",{target:me,data:me.allOptions});
          })
          .finally(()=>{
              me.loading = false;
          });
      },
      fillOptions(){
        let me=this;
        me.options=[];//clear options
        if(me.val===null)return;
        if(me.remote){
          for(let i=0,item;item=me.val[i];i++){
            let found=this.findItem(item);
            if(found){
              me.options.push(found);
            }
          }
        }
        else{
            me.options=me.val.slice(0);
        }
      },
      findItem(val){
        for(let i=0,item;item=this.allOptions[i];i++){
          if(this.valueField==="model" && this.objectEquals(item,val)){
            return item;
          }
          else if(item[this.valueField]===val){
            return item;
          }
        }
        return null;
      },
      objectEquals(a,b){
        if(typeof a === typeof b === "object"){
          return JSON.stringify(a)===JSON.stringify(b);
        }
        else{
          return a===b;
        }
      },
      onDisplay(model){
        if(this.displayField==="model"){
          return model;
        }
        else{
          return model[this.displayField];
        }
      }
    },
    components: {
        "el-tag": ELEMENT.Tag,
        "el-input": ELEMENT.Input,
        "el-button":ELEMENT.Button
    },
    mounted: function () {
      this.updateValue(this.value);
      this.loadData();
    }
  }
</script>
<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>