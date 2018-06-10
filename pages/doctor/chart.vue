<template>
    <div>
        <h1 class="text-align-center">{{hospitalName}}</h1>
        <div class="count">
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
        <div class="gender">
            <echarts v-model="chartsFemale"/>
            <echarts v-model="chartsMale"/>
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
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: []
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
                    data: []
                },
                series: [
                ]
            },
            chartsFemale:{
                title:{
                    text:"女性"
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    data:[]
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
                        ]
                    }
                ]
            },
            chartsMale:{
                title:{
                    text:"男性"
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    data:[]
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
                        data:[]
                    }
                ]
            },
            charts3:{
                title:{
                    text:"年龄段"
                },
                xAxis: {
                    type: 'category',
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [],
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
               let data = response.data.result;
                let opts=Object.assign({},me.charts1);

               opts.title.text="试验项目";
               opts.legend.data=data.projects;
               opts.yAxis.data=data.columns;
               opts.series=data.series.map(model=>({'name':model.name,"data":model.data,type:"bar"}));

               me.charts1=opts;
           });
        },
        loadTesterSexCounter(){
            let me=this;
           axios.get(apiConfig.wechat_testerSexCounter).then(response=>{
               let data = response.data.result;
               me.chartsFemale.legend.data=data.projects;
               me.chartsFemale.series[0].data=data.woman;
               me.chartsMale.legend.data=data.projects;
               me.chartsMale.series[0].data=data.man;               
           });
        },
        loadTesterAgeCounter(){
            let me=this;
           axios.get(apiConfig.wechat_testerAgeCounter).then(response=>{
               let data = response.data.result;
               me.charts3.xAxis.data=data.xAxis;
               me.charts3.series=data.series;
           });
        }
    },
    mounted(){
        this.loadTesterCounter();
        this.loadTesterSexCounter();
        this.loadTesterAgeCounter();
        window.vm=this;
    }
}
</script>
<style scoped>
    .gender{
        display:flex;
        flex-direction: row;
        width: 100%;
    }
    .count{
        display:flex;
        flex-direction: row;
        width: 100%;
    }
    .count div{
        flex: auto;
        text-align: center;
    }
</style>

