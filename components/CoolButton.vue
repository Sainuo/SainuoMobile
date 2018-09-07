<template>
    <van-button class="cool-button" :disabled="cooling" :type="type" :size="size" @click="onClick">
        <slot>{{text}}</slot>{{btnText}}
    </van-button>
</template>

<script>
export default {
    props:{
        text:{type:String,default:"确定"},
        comment:{type:String,default:'剩余[s]秒'},
        time:{type:Number,default:60},
        check:{type:Boolean,Function,default:true},
        click:{type:Function,default:null},
        type:{type:String,default:'default'},
        size:{type:String,default:'normal'},
        tag:{type:String,default:'button'}
    },
    data(){
        return{
            tm:null,
            cooltime:0,
            btnText:'',
            cooling:false,
        }
    },
    methods:{
        onClick(evt){
            var me=this;
            if(!(typeof(me.check)=='function'?me.check():me.check)){return false;}
            if(me.click){
                me.click();
                me.cooltime=parseInt(me.time);
                me.cooling=true;
                me.setText(1);
                me.tm=setInterval(me.timer,1000);
                evt.preventDefault();
            }else{
                me.$emit('click',evt);
            }
        },
        timer(){
            var me=this;
            me.cooltime--;
            me.setText(1);
            if(me.cooltime<=0){
                clearInterval(me.tm);
                me.tm=null;
                me.cooling=false;
                me.setText(0);
            }
        },
        setText(s){
            var me=this;
            me.btnText=s?`(${me.comment.replace('[s]',me.cooltime)})`:'';
        }
    },
    mounted(){

    }
}
</script>

<style>
.cool-button[disabled]{
    background-color:#ddd;
    border:1px solid #ddd;
}
</style>
