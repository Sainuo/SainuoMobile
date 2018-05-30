<template>
    <div>
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image" />
            </van-swipe-item>
        </van-swipe>
        <div>
            <div>
                <img src="~/static/images/icon/users.png"/>
                <div>
                    患者列表
                </div>
            </div>
            <div>
                <img src="~/static/images/icon/pie.png"/>
                <div>
                    统计信息
                </div>
            </div>
            <div>
                <img src="~/static/images/icon/message.png"/>
                <div>
                    患者留言
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            images:[
                '~/static/images/u53076.png',
                '~/static/images/u53078.png',
                '~/static/images/u53080.png'
            ]
        };
    }
}
</script>

