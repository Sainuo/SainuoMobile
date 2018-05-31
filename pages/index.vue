<template>
<div>
  <van-nav-bar title="Title" left-text="Back" right-text="Button" left-arrow/>
  <van-cell-group>
    <van-cell to="demo/list" title="列表" value="下拉刷新下拉加载" />
    <van-cell to="demo/form" title="表单" value="基本信息录入" label="描述信息" />
    <van-cell to="demo/cellform" title="cell表单" value="" />
    <van-cell to="demo/bizselect" title="选择框" value="点击弹出选择项" label="描述信息" />
    <van-cell to="demo/bizdatepicker" title="日期选择框" value="点击弹出选择项" label="描述信息" />
    <van-cell to="doctor/" title="医生入口" value="医生入口" label="描述信息" />
    <van-cell to="tester/" title="受试者入口" value="受试者入口" label="描述信息" />
    <van-cell to="cms/" title="项目咨询" value="项目咨询" label="描述信息" />
  </van-cell-group>
</div>
</template>
<script>
export default {
  
}
</script>
