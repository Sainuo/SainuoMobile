<template>
    <div>
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img :src="image" class="col-12" />
            </van-swipe-item>
        </van-swipe>
        <div class="navMenu col-12">
            <nuxt-link to="testerlist" class="padding-xl item">
                <div>
                    <img class="icon" src="~/static/images/icon/info.png"/>
                    <div>
                        我的信息
                    </div>
                </div>
            </nuxt-link>
            <nuxt-link to="chart" class="padding-xl item">
                <div>
                    <img class="icon" src="~/static/images/icon/list.png"/>
                    <div>
                        信息采集
                    </div>
                </div>
            </nuxt-link>
            <nuxt-link to="" class="padding-xl item">
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
    }
}
</script>

