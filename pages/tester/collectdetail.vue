<template>
    <div>
        <demo-block title="自上次访视以来，是否有新的合并用药？">
            <van-radio-group v-model="ruleForm.combinedDrugUse">
                <van-cell-group>
                    <van-cell title="否" clickable @click="ruleForm.combinedDrugUse = false">
                        <van-radio :name="false"/>
                    </van-cell>
                    <van-cell title="是" clickable @click="ruleForm.combinedDrugUse =  true">
                        <van-radio :name="true"/>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </demo-block>
        <template v-if="ruleForm.combinedDrugUse">
            <demo-block v-for="(item,index) in ruleForm.combinedDrugUserRecord" :key="index">
                <van-cell-swipe :right-width="65" :left-width="65" :on-close="(clickPosition,instance)=>onClose(item,clickPosition,instance)">
                    <van-cell-group>
                        <van-field
                            v-model="item.drugName"
                            label="药物名称"
                            icon="clear"
                            placeholder="请输入药物名称"
                            required
                            @click-icon="()=>{item.drugName = ''}"
                        />
                        <van-field
                            v-model="item.quantityUse"
                            type="number"
                            pattern="[0-9]*"
                            label="每次用量"
                            icon="clear"
                            placeholder="请输入每次用量"
                            required
                            @click-icon="()=>{item.quantityUse = ''}"
                        >
                            <span>片/粒</span>
                        </van-field>
                        <biz-cell-date-picker required title="用药开始" v-model="item.startUseTime"/>
                        <biz-cell-date-picker required title="用药结束" v-model="item.endUseTime"/>
                        <van-field
                            v-model="item.otherNote"
                            type="number"
                            label="其它备注"
                            icon="clear"
                            placeholder="请输入其它备注"
                            required
                            @click-icon="()=>{item.otherNote = ''}"
                        />
                    </van-cell-group>
                    <span slot="right">删除</span>
                </van-cell-swipe>
            </demo-block>
            <div class="padding-xl">
                <van-button @click="onAdd" size="large"><i class="fa fa-plus"></i>添加合并用药记录</van-button>
            </div>
        </template>
        <div class="margin-top-xl padding-xl">
            <van-button @click="onSave" type="primary" size="large" >保存</van-button>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import utility from "~/static/javascript/utility"
import BizCellDatePicker from "~/components/BizCellDatePicker.vue"

export default {
    components:{
        'biz-cell-date-picker':BizCellDatePicker
    },
    data(){
        return {
            id:0,
            ruleForm:{
                "id": 0,
                "combinedDrugUse": false,
                "combinedDrugUserRecordJson": "",
                "combinedDrugUserRecord": []
            }
        };
    },
    methods:{
        loadData(){
            let me=this;
            axios.get(apiConfig.wechat_getMyVisitInfo,{params:{id:me.id}}).then(response=>{
                me.ruleForm= utility.toClientModel(response.data.result,true);
            });
        },
        onAdd(){
            let me=this;
            me.ruleForm.combinedDrugUserRecord.push(Object.assign({},{
                "drugName": "",
                "quantityUse": "",
                "startUseTime": new Date(),
                "endUseTime": new Date(),
                "otherNote": ""
            }));
        },
        onClose(item,clickPosition,instance){
            let me=this;
            switch (clickPosition) {
                    case 'left':
                    case 'cell':
                    case 'outside':
                    instance.close();
                    break;
                    case 'right':
                    me.$dialog.confirm({
                        message: '确定删除吗？'
                    }).then(() => {
                        let idx= me.ruleForm.combinedDrugUserRecord.indxOf(item);
                        if(idx>-1){
                            me.ruleForm.combinedDrugUserRecord.splice(idx,1);
                        }
                        instance.close();
                    });
                    break;
            }
        },
        onSave(){
            let me=this;
            axios.put(apiConfig.wechat_updateDrugRecord,me.ruleForm).then(response=>{
                me.$toast.success("保存成功");
                me.$router.back();
            });
        }
    },
    mounted(){
        let me = this;
        me.id = me.$route.query.id;
        me.loadData();
        window.vm = me;
    }
}
</script>