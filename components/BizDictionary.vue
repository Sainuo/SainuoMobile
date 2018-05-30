<template>
    <el-select v-model="val" clearable :placeholder="placeholder" @change="handleChange">
        <el-option v-for="item in options"
                        :key = "item.DataValue"
                        :label = "item.DataName"
                        :value = "item.DataValue">
            <biz-image v-if="item.IconEnabled" style="float: left;margin-top:-2px;" width="24px" height="24px" :src="item.Icon" alt="24x24"></biz-image>
            <span style="float: left">{{ item.DataName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.DataValue }}</span>
        </el-option>
    </el-select>
</template>
<script>
import axios from "axios"
import ELEMENT from "element-ui"
import BizImage from "~/components/BizImage.vue"
  /**
 * author      : 反转的分针
 * date        : 20170713
 * mail        : 114233763@qq.com
 * description : 字典下拉框
 * @param {string} src http://xxx.yyy.zzz/abc/def
 * @param {string} placeholder
 * @param {string} value v-model
 * @returns {string} item.DataValue
 */
export default {
    props: {
        "src": {
            "type": String,
            "default": ""
        },
        "placeholder": {
            "type": String,
            "default": "请选择"
        },
        "value": {
            "type": String,
            "default":""
        }
    },
    data: function () {
        return {
            "val": "",
            "options":[]
        };
    },
    watch: {
        "value": function (val, oldVal) {
            var me = this;
            me.val = val;
        }
    },
    methods: {
        handleChange: function (val) {
            this.$emit("input", val);
        },
        updateValue: function (val) {
            this.val = val;
        },
        getData: function () {
            var me = this;
            axios.get(me.src).then(function (response) {
                me.options = response.data;
            });
        }
    },
    components: {
        "el-select": ELEMENT.Select,
        "el-option": ELEMENT.Option,
        "biz-image":BizImage
    },
    mounted: function () {
        this.getData();
        this.updateValue(this.value);
    }
}
</script>
