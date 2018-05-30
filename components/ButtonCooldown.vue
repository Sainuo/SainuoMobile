<template>
   <button
    class="el-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot><template v-if="showSecond">({{cooldownSecond}}秒)</template></span>
  </button>
</template>
<script>
import Vue from "vue"
import ELEMENT from "element-ui"
export default Vue.extend({
    mixins:[ELEMENT.Button],
    props:{
        second:{
          type:Number,
          default:60
        }
    },
    data(){
        return {
            cooldownSecond:60,
            showSecond:false,
            timer:null,
            isDisabled:false
        };
    },
    methods: {
      handleClick(evt) {
        var me=this;
        me.isDisabled=true;
        me.showSecond=true;
        me.cooldownSecond = me.second;
        me.timer= setInterval(()=>{
          if(--me.cooldownSecond===0){
            clearInterval(me.timer);
            me.isDisabled=false;
            me.showSecond=false;
          }
        },1000);
        me.$emit('click', evt);
      }
    },
    computed: {
      buttonDisabled() {
        return this.disabled || this.isDisabled || (this.elForm || {}).disabled;
      }
    }
})
</script>