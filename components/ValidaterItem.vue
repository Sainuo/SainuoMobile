<template>
    <div class="m-validater_form_item">
        <div @input="onChange" @change="onChange"><slot></slot></div>
        <div v-if="error" class="error-msg">{{errorMsg}}</div>
    </div>
</template>

<script>
export default {
    props:{
        prop:{type:String,default:''},
        rules:{type:Object|Array,default:null}
    },
    data(){
        return {
            input:null,
            checks:[],
            error:false,
            errorMsg:'',
            validater:null
        }
    },
    watch:{
        rules(){
            var me=this;
            me.resetField();
            me.clearValidate();
            me.changeRules();
        }
    },
    methods:{
        resetField(){
            var me=this;
            me.validater&&me.validater.$emit('itemreset',me.prop);
        },
        clearValidate(){
            var me=this;
            me.validater&&me.validater.$emit('itemclear',me.prop);
        },
        changeRules(){
            var me=this;
            if(me.prop){
                me.validater&&me.validater.$emit('iteminited',{tag:me,prop:me.prop,rules:me.rules});
            }
        },
        triggerEvent(evt){
            var me=this,rules=me.checks,res={prop:me.prop,status:true,msg:''};
            var e=evt?evt.type:'';
            for(let i=0;i<rules.length;i++){
                if((e&&rules[i]['event']==e)||!e){
                    let r=rules[i],tp=typeof(r['check']),cks=[];
                    if(tp=='boolean'||tp=='number'){
                        cks=[];
                    }else if(tp=='object'){
                        if(r['check'] instanceof Array){
                            cks=r['check'];
                        }else if(r['check'] instanceof RegExp){
                            cks=[r['check']];
                        }
                    }else{
                        cks=r['check'].split(',');
                    }
                    for(let j=0;j<cks.length;j++){
                        if(!me.validater.checker(me.prop,cks[j])){
                            me.error=true;
                            me.errorMsg=r['msg'];
                            return {prop:me.prop,status:false,msg:r['msg']};
                        }else{
                            me.error=false;
                            me.errorMsg='';
                        }
                    }
                }
            }
            return res;
        },
        bindEvent(rules){
            var me=this;
            if(me.input){
                me.checks.map(r=>{me.input.removeEventListener(r['event'],me.triggerEvent,false);});
            }else{
                me.checks.map(r=>{me.$off(r['event'],me.triggerEvent);});
            }
            me.checks=rules;
            if(me.input){
                me.checks.map(r=>{me.input.addEventListener(r['event'],me.triggerEvent,false);});
            }else{
                me.checks.map(r=>{me.$on(r['event'],me.triggerEvent);});
            }
        },
        getValidater(){
            var me=this;
            var p=me.$parent,cls=p.$el.classList.value;
            while(p&&!/^m\-validater\_form/.test(cls)){
                p=p.$parent;
                cls=p.$el.classList.value;
            }
            return p;
        },
        onChange(x){
            this.$emit('blur',x);
            this.$emit('change',x);
        }
    },
    mounted(){
        var me=this;
        var query='select,textarea,input:not([type="button"]),input:not([type="submit"]),input:not([type="reset"]),input:not([type="file"]),input:not([type="image"]),input:not([type="camera"]),input:not([type="microphone"]),input:not([type="camcorder"])';
        me.input=me.$el.querySelector(query);
        me.validater=me.getValidater();
        this.changeRules();
    }
}
</script>
<style>
.error-msg{
    color:#f90;
    padding-left:80px;
}
</style>
