<template>   
    <div>
        <xscroll class="full" pulldown pullup @pullup-loading="onLoad" @pulldown-loading="onRefresh" auto-load ref="xs">
            <div v-for="(item,index) in i" :key="index">
                {{index}}
            </div>
        </xscroll>
    </div>
</template>
<script>
import xscroll from "~/components/XScroll.vue"
export default {
    components:{
        'xscroll':xscroll
    },
    data(){
        return {
            i:0
        };
    },
    methods:{
        onLoad(fn){
            this.i+=10;
            setTimeout(fn,1000);
        },
        onRefresh(fn){
            this.i=10;
            setTimeout(fn,1000);
        }
    },
    mounted(){
        window.vm=this;
    }
}
</script>
<style scoped>
    .full{
        position: absolute;
        top:0;
        right: 0;
        bottom: 0;
        left:0;
    }
</style>
