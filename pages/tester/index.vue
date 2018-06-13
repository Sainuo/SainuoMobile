<template>
    <div>
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img :src="image" class="col-12" />
            </van-swipe-item>
        </van-swipe>
        <nuxt-link to="register">
            <van-notice-bar text="请尽快完善个人信息，并填写所有采集信息"/>
        </nuxt-link>
        <div class="navMenu col-12">
            <nuxt-link to="detail" class="padding-xl item">
                <div>
                    <img class="icon" src="~/static/images/icon/info.png"/>
                    <div>
                        我的信息
                    </div>
                </div>
            </nuxt-link>
            <nuxt-link to="collectlist" class="padding-xl item">
                <div>
                    <img class="icon" src="~/static/images/icon/list.png"/>
                    <div>
                        信息采集
                    </div>
                </div>
            </nuxt-link>
            <nuxt-link to="message" class="padding-xl item">
                <div>
                    <img class="icon" src="~/static/images/icon/message.png"/>
                    <div>
                        留言给医生
                    </div>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            images:[
                '/images/u53076.png',
                '/images/u53078.png',
                '/images/u53080.png'
            ]
        };
    },
    mounted(){
        
    }
}
</script>

