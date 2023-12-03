<template>
  <div class="row">
    <div class="mainpart col-md-10 offset-md-1">
      <h1 class="text-start">国际参考电离层(IRI)</h1>
      <br><br>
      <p>时间:<input type="text" v-model="information.time"><i>截止到2020-12-31</i>&nbsp;<b>(格式:2020-12-31T00)</b></p>
      <p>起始高度:<input type="text" v-model="information.artitude_start"><i>0 to 1000 km</i></p>
      <p>截止高度:<input type="text" v-model="information.artitude_stop"></p>
      <p>步长:<input type="text" v-model="information.artitude_stepsize"></p>
      <p>经度:<input type="text" v-model="information.longitude"><i>0° to 360°</i></p>
      <p>纬度:<input type="text" v-model="information.latitude"><i>-90° to 90°</i></p>
      <button type="button" class="btn btn-primary" @click="submit">提交</button>
    </div>
    <div>
      <p>Ne/(cm^-3):</p>
      <p>{{ ne }}</p>
      <div id="ne_chart" style="width: 1000px; height: 250px"></div>
      <p>nO+:</p>
      <p>{{ nOp }}</p>
      <div id="nOp_chart" style="width: 1000px; height: 250px"></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  // import * as echarts from 'echarts';
	export default {
		data() {
			return {
        information:{
          time:"2020-12-31T00",//截止到2020-12-31
          //Height (0 to 1000 km)
          artitude_start:100,
          artitude_stop:1000,
          artitude_stepsize:100,
          longitude:120,//Longitude (0° to 360°)
          latitude:80,//Latitude (-90° to 90°)
        },
        ne:[],
        nOp:[],
        neChart:null,
        nOpChart:null,
			}
		},
    mounted() {
      this.drawChart();
    },
		methods: {
      drawChart() {
        if (this.neChart) {
          // this.neChart.dispose();
          this.neChart.clear();
        }
        // this.neChart=null;
        // 基于准备好的dom，初始化echarts实例  这个和上面的id对应
        this.neChart = this.$echarts.init(document.getElementById("ne_chart"));
        // 生成横坐标的数据
        let xAxisData = [];
        for (let i = this.information.artitude_start; i <= this.information.artitude_stop; i += this.information.artitude_stepsize) {
          xAxisData.push(i.toString());
        }
        // 指定图表的配置项和数据
        let option = {
          xAxis: {
            type: 'category',
            data: xAxisData,
            name:'高度/km',
          },
          yAxis: {
            type: 'value',
            name: 'Ne/(cm^-3)'
          },
          series: [
            {
              data: this.ne,  
              type: 'line'
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表
        this.neChart.setOption(option);

        // nOp图表
        if (this.nOpChart) {
          this.nOpChart.dispose();
        }
        this.nOpChart=null;
        // 基于准备好的dom，初始化echarts实例  这个和上面的id对应
        this.nOpChart = this.$echarts.init(document.getElementById("nOp_chart"));
        // 生成横坐标的数据
        let xAxisData2 = [];
        for (let i = this.information.artitude_start; i <= this.information.artitude_stop; i += this.information.artitude_stepsize) {
          xAxisData2.push(i.toString());
        }
        // 指定图表的配置项和数据
        let option2 = {
          xAxis: {
            type: 'category',
            data: xAxisData2,
            name:'高度/km',
          },
          yAxis: {
            type: 'value',
            name: 'nOp'
          },
          series: [
            {
              data: this.nOp,  
              type: 'line',
              lineStyle: {
                color: 'red',
              }
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表
        this.nOpChart.setOption(option2);
      },      
      submit(){
        axios.post('http://127.0.0.1:8000/test_ne', this.information)
        .then(response => {
          // console.log(response.data.message);
          this.ne=response.data.ne;
          this.nOp=response.data.nOp;
          this.drawChart();
        })
      }
		},
	}
</script>

<style>
	.alert-box-item {
		overflow: hidden;
	}
</style>
