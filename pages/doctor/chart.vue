<template>
    <div>
        <h1>{{hospitalName}}</h1>
        <div>
            <div>
                <div><h3>受试者</h3></div>
                <div>50</div>
            </div>
            <div>
                <div><h3>脱落病例</h3></div>
                <div>5</div>
            </div>
            <div>
                <div><h3>剔除病例</h3></div>
                <div>6</div>
            </div>
        </div>
        <div>
            <echarts v-model="charts1"/>
        </div>
        <div>
            <echarts v-model="charts2"/>
        </div>
        <div>
            <echarts v-model="charts3"/>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import echarts from "echarts"
import EChart from "~/components/ECharts.vue"
export default {
    components:{
        "echarts":EChart
    },
    data(){
        return {
            hospitalName:"云南红会医院",
            charts1: {
                  title: {
                    text: '世界人口总量',
                    subtext: '数据来自网络'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['2011年', '2012年']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
                },
                series: [
                    {
                        name: '2011年',
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 630230]
                    },
                    {
                        name: '2012年',
                        type: 'bar',
                        data: [19325, 23438, 31000, 121594, 134141, 681807]
                    }
                ]
            },
            charts2:{
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ]
                    }
                ]
            },
            charts3:{
                  xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true
                }]
            }
        };
    },
    methods:{
        loadTesterCounter() {
            let me=this;
           axios.get(apiConfig.wechat_testerCounter).then(response=>{
               let data=response.data;
               me.charts1.xAxis=data.projects
           });
        },
        loadTesterSexCounter(){
            let me=this;
           axios.get(apiConfig.wechat_testerSexCounter).then(response=>{

           });
        },
        loadTesterAgeCounter(){
            let me=this;
           axios.get(apiConfig.wechat_testerAgeCounter).then(response=>{
               
           });
        }
    },
    mounted(){
        
    }
}
</script>

