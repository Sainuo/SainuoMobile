<template>
    <div data-role='amap' :style="{width:numberToPX(width),height:numberToPX(height)}"></div>
</template>
<script>
/**
 * @author:zhy
 * @date:20180417
 */
export default {
  props:{
    url:{
      type:String,
      default:"http://webapi.amap.com/maps?v=1.4.3&key="
    },
    amapKey:{
      type:String,
      default:"",
      required:true
    },
    //http://lbs.amap.com/api/javascript-api/reference/map
    opts:{
      type:Object,
      default:()=>({
          resizeEnable: true,
          zoom: 16,
          center: [102.711664, 25.041005]
      })
    },
    width:{
      type:String|Number,
      default:"100%"
    },
    height:{
      type:String|Number,
      default:"100%"
    }
  },
  data:()=>({
    amap:null,
  }),
  methods:{
    numberToPX(val){
      if(typeof val==="number")return `${val}px`;
      return val;
    },
    onLoad(evt){
      let me = this;
      me.map = new AMap.Map(me.$el, me.opts);

      me.$emit("load",{
        target:me,
        map:me.map,
        AMap:AMap
      });
    },
    addAmapReference(){
      let me=this;
      var script= document.createElement("script");
      script.setAttribute("data-reference","amap");
      script.addEventListener("load",evt=>{ me.onLoad(evt); });
      script.src=`${me.url}${me.amapKey}`;
      document.querySelector("head").appendChild(script);
    },
    createReference(){
      let me=this;
      if(me.isReferenced()){
        me.onLoad({target:me});
      }
      else{
        me.addAmapReference();
      }
    },
    isReferenced(){
      let me=this;
      return document.querySelectorAll("[data-reference='amap']").length>0;
    }
  },
  mounted(){
    this.createReference();
  }
}
</script>

