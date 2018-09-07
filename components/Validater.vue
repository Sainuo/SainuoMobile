<template>
    <div class="m-validater_form">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props:{
        model:{type:Object,default:null},
        rules:{type:Object,default:null}
    },
    data(){
        return {
            validaters:{},
            children:{}
        }
    },
    watch:{
        rules(){this.changeRules();}
    },
    methods:{
        requiredCheck(v){return v?true:false;},
        unchiniseCheck(v){return !(/^[\u4e00-\u9fa5]*$/gi).test(v);},
        chiniseCheck(v){return (/^[\u4e00-\u9fa5]*$/gi).test(v);},
        idcardCheck(v){return (/^((\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X))?$/gi).test(v);},
        telCheck(v){return (/^([0-9]{3,4}\-[0-9]{7,8})?$/gi).test(v);},
        phoneCheck(v){return (/^(1[0-9]{10})?$/gi).test(v);},
        numberCheck(v){return (/^[\d]*$/gi).test(v);},
        emailCheck(v){return (/^([\w]+\@[\w]+\.[\w]+)?$/gi).test(v);},
        checker(prop,check){
            var me=this,value=me.model[prop],tp=typeof(check),b=true;
            if(tp=='boolean'||tp=='number'){
                b=check?true:false;
            }else if(tp=='function'){
                b=check(value);
            }else if(tp=='object'){
                b=(check instanceof RegExp)?check.test(value):true;
            }else if(tp=='undefined'){
                b=true;
            }else{
                if((/^\/.+?\/$/ig).test(check)){
                    b=(new RegExp(check.replace(/^\//,'').replace(/\/$/,''),'ig')).test(value);
                }else if(check){
                    var fn=`${check}Check`;
                    b=me[fn]?me[fn](value):true;
                }else{
                    b=true;
                }
            }
            return b;
        },
        validate(call){
            var me=this;
            if(call){
                call(me.triggerEvents());
            }else{
                return new Promise((resolve,reject)=>{
                    var b=me.triggerEvents();
                    b['status']?resolve(b):reject(b);
                });
            }
        },
        validateField(prop,call){
            var me=this;
            if(call){
                call(me.triggerEvent(prop));
            }else{
                return new Promise((resolve,reject)=>{
                    var b=me.triggerEvent(prop);
                    b['status']?resolve(b):reject(b);
                });
            }
        },
        resetFields(){
            var me=this,o=me.children;
            for(let i in o){me.onItemReset(o[i]['prop']);}
        },
        clearValidate(){
            var me=this,o=me.children;
            for(let i in o){me.onItemClear(o[i]['prop']);}
        },
        triggerEvent(tag){
            var me=this,vals=me.validaters;
            tag=typeof(tag)=='string'?vals[tag]['tag']:tag;
            return tag.triggerEvent();
        },
        triggerEvents(){
            var me=this,vals=me.validaters,bs=[],res={status:true,msg:''};
            for(let i in vals){
                let tag=vals[i]['tag'];
                if(!tag){continue;}
                let b=me.triggerEvent(tag);
                bs.push(b);
            }
            for(let i=0;i<bs.length;i++){
                if(!bs[i]['status']){res=bs[i];break;}
            }
            return res;
        },
        bindEvents(){
            var me=this,vals=me.validaters;
            for(let i in vals){
                let tag=vals[i]['tag'],rules=vals[i]['rules'];
                if(!tag||!rules){continue;}
                tag.bindEvent(rules);
            }
        },
        changeRules(){
            var me=this;if(!me){return false;}
            var children=me.children,rules=me.rules;
            if(!rules){return false;}
            for(let i in rules){me.validaters[i]={rules:rules[i]};}
            if(children){
                for(let i in children){
                    let c=children[i],o=me.validaters[i];
                    let tag=c&&c['tag']?c['tag']:null,cr=c&&c['rules']?c['rules']:null;
                    let r=cr?(cr instanceof Array?cr:[cr]):(o&&o['rules']?o['rules']:null);
                    me.validaters[i]={tag:tag,rules:r};
                }
            }
            me.bindEvents();
        },
        onItemReset(prop){
            var me=this,tp=typeof(me.model[prop]);
            switch(tp){
                case 'object':me.model[prop]=me.model[prop] instanceof Array?[]:{};break;
                case 'function':me.model[prop]=x=>{};break;
                case 'number':me.model[prop]=0;break;
                default:me.model[prop]='';break;
            }
        },
        onItemClear(prop){
            var me=this,tag=me.children[prop]['tag'];
            tag.error=false;
            tag.errorMsg='';
        },
        onItemInited(item){
            var me=this,prop=item['prop'];
            me.children[prop]=item;
            me.changeRules();
        }
    },
    created(){
        var me=this;
        me.$on('iteminited',me.onItemInited);
        me.$on('itemreset',me.onItemReset);
        me.$on('itemclear',me.onItemClear);
    },
    mounted(){
        this.changeRules();
    }
}
</script>