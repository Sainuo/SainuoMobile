<template>
    <label  class="base64-uploader" v-loading="loading">
        <input type="file" v-show="false" @change="choose"/>
        <img v-if="val.length && preview" :src="val" class="base64">
        <i v-else class="el-icon-plus base64-uploader-icon"></i>
    </label>
</template>
<script>
/**
*@author ReversalMinute
*@datetime  20180521
*@example
*<biz-base64-image v-model="ruleForm.image1"></biz-base64-image>
*/
export default {
    props:{
        preview:{
            type:Boolean,
            default:true
        },
        value:{
            type:String,
            default:""
        }
    },
    data(){
        return {
            loading:false,
            val:""
        };
    },
    methods:{
        choose(evt){
            let me=this;
            let input=evt.target;
            let fd=new FileReader();

            me.loading=false;
            fd.addEventListener("load",loadEvent=>{
                me.val=loadEvent.target.result;
                me.$emit("input",me.val);
            });
            fd.addEventListener("loadend",()=>{
                 me.loading=false;
            });
            fd.readAsDataURL(input.files[0]);
            input.value="";
        }
    },
    watch:{
        value(val,oldVal){
            if(typeof val==="string")this.val=val;
        }
    },
    mounted(){
        if(this.value){
            this.val=this.value;
        }
    }
}
</script>
<style scoped>
.base64-uploader{
    display: inline-block;
    width: 178px;
    height: 178px;
    overflow: hidden;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
}

.base64-uploader:hover {
    border-color: #409eff;
    box-shadow: 0px 0px 8px 0px rgba(232,237,250,0.6), 0px 2px 4px 0px rgba(232,237,250,0.5);
}


.base64-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .base64-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .base64-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .base64 {
    max-width: 178px;
    height: auto;
    display: block;
  }
</style>

