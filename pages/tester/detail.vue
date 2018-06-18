<template>
    <div class="padding-xl">
        <div class="myinfo padding-xl border-m border-color-default">
            <div>
                <img src="~/static/images/icon/letter.png"/>
            </div>
            <div class="margin-left-xl">
                <h3 class="margin-top-0"><span>{{info.name}}</span>&nbsp;<span>{{info.sex}}</span>&nbsp;<span>{{info.nationality}}</span></h3>
                <div class="color-gray" style="line-height:18px;">
                  <div>
                    <label>手机号码：</label><span>{{info.phoneNumber}}</span>
                  </div>
                  <div>
                    <label>出生日期：</label><span>{{info.birthday|date}}</span>
                  </div>
                  <div>
                    <label>受试项目：</label><span>{{info.project.projectName}}</span>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        info(){ return this.$store.state.modules.userinfo.info; }
    }
}
</script>
<style scoped>
    .myinfo{
        display: flex;
        flex-direction: row;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.149019607843137);
        border-radius: 2px;
        border-color: rgba(233, 233, 233, 1);
    }
</style>
