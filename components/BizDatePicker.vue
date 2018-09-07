<template>
    <van-popup v-model="show" position="bottom">
        <van-datetime-picker
          v-model="val"
          type="date"
          :max-date="maxDate"
          :min-date="minDate"
          @confirm="onConfirm"
          @cancel="show = false"
        />
    </van-popup>
</template>
<script>
/**
 * author      : 反转的分针
 * date        : 2018-05-31
 * mail        : 114233763@qq.com
 * description : 模糊查询
 * @param {String} value v-model
 * @returns {Date} item.DataValue
 * @example
 *          <biz-cell-date-picker
                required
                title="生日" 
                :minDate="new Date().thisYearFirstDate().addDate('y',-100)"
                :maxdate="new Date()"
                v-model="ruleForm.birthday"
            />
 */
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    title:{
      type:String,
      default:"请选择"
    },
    minDate:{
      type:Date,
      default:()=>new Date().thisYearFirstDate().addDate('y',-10)
    },
    maxDate:{
      type:Date,
      default:()=>new Date().thisYearLastDate().addDate('y',10)
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    format:{
      type:String,
      default:"yyyy-MM-dd"
    },
    value: {
      type: Date,
      default:()=>new Date()
    }
  },
  data() {
    return {     
      val: new Date(),
      show:false
    };
  },
  watch: {
    value: function(val, oldVal) {
      this.updateValue(val);
    }
  },
  computed:{
    display(){
      if(this.val){
        return this.val.format(this.format);
      }
      return this.placeholder;
    }
  },
  methods: {
    onConfirm() {
        this.$emit("input",this.val);
        this.$emit('change',{type:'change'});
        this.show = false;
    },
    updateValue(val){
      if(val){
          this.val=new Date(val);
      }
      else{
        this.val=val;
      }
    }
  },
  mounted: function() {
    this.updateValue(this.value);
  }
};
</script>