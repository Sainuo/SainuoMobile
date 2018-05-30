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
                    <img class="icon" src="~/static/images/icon/users.png"/>
                    <div>
                        患者列表
                    </div>
                </div>
            </nuxt-link>
            <nuxt-link to="" class="padding-xl item">
                <div>
                    <img class="icon" src="~/static/images/icon/pie.png"/>
                    <div>
                        统计信息
                    </div>
                </div>
            </nuxt-link>
            <nuxt-link to="" class="padding-xl item">
                <div>
                    <img class="icon" src="~/static/images/icon/message.png"/>
                    <div>
                        患者留言
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

