<template>
    <div>
        <demo-block title="基本信息">
            <van-cell-group>
                <van-field
                    v-model="username"
                    label="用户名"
                    icon="clear"
                    placeholder="请输入用户名"
                    required
                    @click-icon="username = ''"
                />

                <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
                />

                <van-field
                    v-model="message"
                    label="留言"
                    type="textarea"
                    placeholder="请输入留言"
                    rows="1"
                    autosize
                />

                <van-field
                    center
                    v-model="sms"
                    label="短信验证码"
                    placeholder="请输入短信验证码"
                    icon="clear"
                    @click-icon="sms = ''"
                >
                    <van-button slot="button" size="small" type="primary">发送验证码</van-button>
                </van-field>
            </van-cell-group>
        </demo-block>

        <demo-block title="性别">
            <van-radio-group v-model="gender">
                <van-cell-group>
                    <van-cell title="女性" clickable @click="gender = 0">
                        <van-radio :name="0"/>
                    </van-cell>
                    <van-cell title="男性" clickable @click="gender = 1">
                        <van-radio :name="1"/>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </demo-block>

        <demo-block title="编程技能">
            <van-checkbox-group v-model="language">
                <van-cell-group>
                    <van-cell title="C++">
                        <van-checkbox name="C++" />
                    </van-cell>
                    <van-cell title="C#">
                        <van-checkbox name="C#"/>
                    </van-cell>  
                    <van-cell title="ECMAScript">
                        <van-checkbox name="ECMAScript"/>
                    </van-cell>
                </van-cell-group>
            </van-checkbox-group>
        </demo-block>

        <van-button @click="setData" type="primary" size="large">显示值</van-button>
        <van-button @click="getData" size="large">设置值</van-button>
    </div>
</template>
<script>
import BizSelect from "~/components/BizSelect.vue"
export default {
    components:{
        'biz-select': BizSelect
    },
    data(){
        return {
            username:"",
            password:"",
            message:"",
            sms:"",
            gender:0,
            language:[]
        };
    },
    methods:{
        setData(){

        },
        getData(){
            this.$dialog.alert(JSON.stringify(this.$data));
        }
    }
}
</script>

