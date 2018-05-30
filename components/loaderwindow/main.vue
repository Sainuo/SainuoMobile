<template>
  <el-dialog :title="title" :visible.sync="visible" :modal="true" @close="onClose">
    <nuxt-loader :path="path" @confirm="onConfirm" @cancel="onCancel"></nuxt-loader>
  </el-dialog>
</template>
<script>
import nuxtloader from "../nuxt-loader"

export default {
  data:()=>({
      title:"window",
      visible:false,
      path:""
  }),
  methods:{
    onClose(){
      this.$emit("cancel",{target:this,model:null})
    },
    onConfirm(evt){
        this.$emit("confirm",evt)
        this.visible=false
    },
    onCancel(evt){
        this.$emit("cancel",evt)
        this.visible=false
    }
  },
  components:{
    'nuxt-loader':nuxtloader
  },
  mounted(){
    this.$nextTick(()=>{
      this.visible=true
    })
  }
}
</script>