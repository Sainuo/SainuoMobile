<template>
    <div>
        <validater class="test2" ref="form" :model="form" :rules="rules">
            <div>
                <validater-item prop="name">
                    <input v-model="form.name" />
                </validater-item>
            </div>
            
            <validater-item prop="phone" :rules="phonerule">
                <input v-model="form.phone" />
                
            </validater-item>
            <div>
                <button @click="onChange">改规则</button>
                <button @click="onSubmit">提交</button>
            </div>
        </validater>
    </div>
</template>

<script>
import Validater from '~/components/Validater.vue';
import ValidaterItem from '~/components/ValidaterItem.vue';
export default {
    components:{Validater,ValidaterItem},
    data(){
        return {
            form:{
                name:"",
                phone:""
            },
            rules:{
                name:[
                    {event:'blur',check:'required',msg:'不是中文'}
                ]
            },
            phonerule:{event:'change',check:'required',msg:'号码不能为空！'}
        }
    },
    methods:{
        onChange(){
            this.phonerule={event:'change',check:/^[\d]+$/,msg:'请输入数字!'}
        },
        async onSubmit(){
            var me=this,form=me.$refs.form;
            form.validate().then(x=>{
                console.log(`成功：${x}`);
            }).catch(x=>{
                console.log(`失败：${x}`);
            });
            // var b=await form.validate();
            // console.log(b)
        }
    }
}
</script>

<style>

</style>
