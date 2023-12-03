<template>
  <div class="row">
    <div class="mainpart col-md-10 offset-md-1">
      <h1 class="text-start">测试</h1>
      <br><br>
      <h2>echarts test</h2>
    </div>
    <div>
      <div id="ct1" style="width: 600px; height: 400px"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的id对应
      let myChart = this.$echarts.init(document.getElementById("ct1"));
      // 指定图表的配置项和数据
      let option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // drawChart() {
    //   // 基于准备好的dom，初始化echarts实例  这个和上面的id对应
    //   let myChart = this.$echarts.init(document.getElementById("ct1"));
    //   // 指定图表的配置项和数据
    //   let option = {
    //     title: {
    //       text: "ECharts 入门示例",
    //     },
    //     tooltip: {},
    //     legend: {
    //       data: ["销量"],
    //     },
    //     xAxis: {
    //       data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    //     },
    //     yAxis: {},
    //     series: [
    //       {
    //         name: "销量",
    //         type: "bar",
    //         data: [5, 20, 36, 10, 10, 20],
    //       },
    //     ],
    //   };
    //   // 使用刚指定的配置项和数据显示图表。
    //   myChart.setOption(option);
    // },
  },
}
</script>

<style>

</style>