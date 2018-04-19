<template>
    <div>
        <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow @click-left="$router.back()"/>
        <p>个人信息收集</p>
        <van-cell-group>
        <van-field label="姓名" placeholder="请输入姓名" v-model="ruleForm.name"></van-field>
        <van-field label="生日" placeholder="请输入生日" type="date" v-model="ruleForm.birthday"></van-field>
        <van-radio-group v-model="ruleForm.gender">
            <van-cell>
            <van-radio name="male">男</van-radio>
            </van-cell>
            <van-cell>
            <van-radio name="female">女</van-radio>
            </van-cell>
        </van-radio-group>
        <van-switch-cell v-model="ruleForm.isMarried" title="已婚" />
        <p>爱好</p>
        <van-checkbox-group v-model="ruleForm.favorite">
            <van-cell>
                <van-checkbox name="音乐">听音乐</van-checkbox>
            </van-cell>
            <van-cell>
                <van-checkbox name="足球">踢足球</van-checkbox>
            </van-cell>
            <van-cell>
                <van-checkbox name="篮球">打篮球</van-checkbox>
            </van-cell>
        </van-checkbox-group>
        <van-picker :columns="columns" @change="onChange" />
        <div>
            <label for="language">掌握的编程语言</label><br />
            <select id="language" name="language" multiple="multiple" v-model="ruleForm.language">
                <option value="Basic">Basic</option>
                <option value="C">C</option>
                <option value="C++">C++</option>
                <option value="C#">C#</option>
                <option value="Java">Java</option>
                <option value="Javascript">Javascript</option>
                <option value="Python">Python</option>
                <option value="Ruby">Ruby</option>
            </select>
        </div>
        </van-cell-group>
        <van-button type="primary" @click="getData">获取数据</van-button >
        <van-button type="default" @click="resetData">设置数据</van-button>
    </div>
</template>
<script>
export default {
   data:()=> ({
        defaultIndex:0,
        columns: ['昆明', '呈贡'],
        ruleForm:{
            name: "zhy",
            birthday:'1985-04-06',
            gender: "male",
            isMarried: false,
            favorite: ["音乐"],
            address: "昆明",
            language: ["C","Java"]
        }
    }),
    methods: {
        onChange(picker, value, index){
            this.ruleForm.address=value;
        },
        getData(evt) {
            console.log("hello");
            this.$dialog.alert({message: JSON.stringify(this.ruleForm)}).then(() => {});
        },
        resetData(evt){
            this.$dialog.alert({message: 'resetData'}).then(() => {});
            this.ruleForm= { 
                name: "zhy",
                birthday:'1985-04-06',
                gender: "male",
                isMarried: false,
                favorite: ["音乐"],
                address: "昆明",
                language: ["C","Java"]
            };
        }
    },
    mounted(){
        window.vm=this;
    }
}
</script>

