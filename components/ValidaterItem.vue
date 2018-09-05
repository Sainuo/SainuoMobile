<template>
    <div>
        <div><slot></slot></div>
        <div v-if="error">{{errorMsg}}</div>
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
            errorMsg:''
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
            var me=this,parent=me.$parent;
            parent.$emit('itemreset',me.prop);
        },
        clearValidate(){
            var me=this,parent=me.$parent;
            parent.$emit('itemclear',me.prop);
        },
        changeRules(){
            var me=this,parent=me.$parent;
            if(me.prop){
                parent.$emit('iteminited',{tag:me,prop:me.prop,rules:me.rules});
            }
        },
        triggerEvent(evt){
            var me=this,parent=me.$parent,rules=me.checks,res={prop:me.prop,status:true,msg:''};
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
                        if(!parent.checker(me.prop,cks[j])){
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
            me.checks.map(r=>{
                me.input.removeEventListener(r['event'],me.triggerEvent,false);
            });
            me.checks=rules;
            me.checks.map(r=>{
                me.input.addEventListener(r['event'],me.triggerEvent,false);
            });
        }
    },
    mounted(){
        var me=this;
        var query='select,textarea,input:not([type="button"]),input:not([type="submit"]),input:not([type="reset"]),input:not([type="file"]),input:not([type="image"]),input:not([type="camera"]),input:not([type="microphone"]),input:not([type="camcorder"])';
        me.input=me.$el.querySelector(query);
        this.changeRules();
    }
}
</script>

<style>

</style>
