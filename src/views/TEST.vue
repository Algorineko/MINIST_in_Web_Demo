<template>
  <div class="row">
    <div class="mainpart col-md-10 offset-md-1">
      <h1 class="text-start">测试</h1>
      <h2>echarts test</h2>
    </div>
    <div id="ct1" style="width: 800px; height: 800px"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.drawChart();
  },
  methods: {
    makeGaussian(amplitude, x0, y0, sigmaX, sigmaY) {
      return function (amplitude, x0, y0, sigmaX, sigmaY, x, y) {
        let exponent = -(
          (Math.pow(x - x0, 2) / (2 * Math.pow(sigmaX, 2))) +
          (Math.pow(y - y0, 2) / (2 * Math.pow(sigmaY, 2)))
        );
        return amplitude * Math.pow(Math.E, exponent);
      }.bind(null, amplitude, x0, y0, sigmaX, sigmaY);
    },
    generateGaussianData() {
      const gaussian = this.makeGaussian(50, 0, 0, 20, 20);
      let data = [];
      for (var i = 0; i < 1000; i++) {
        let x = Math.random() * 100 - 50;
        let y = Math.random() * 100 - 50;
        let z = gaussian(x, y);
        data.push([x, y, z]);
      }
      return data;
    },
    drawChart() {
      let myChart = this.$echarts.init(document.getElementById("ct1"));
      let option = {
        grid3D: {},
        xAxis3D: {},
        yAxis3D: {},
        zAxis3D: {},
        // series: [{
        //   type: 'scatter3D',
        //   symbolSize: 5,
        //   data: this.generateGaussianData(),
        // }],
        series: [{
          type: 'surface',
          wireframe: true,  // 显示网格线
          // shading: 'color', // 使用颜色着色
          data: this.generateGaussianData(),
        }],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style>

</style>
