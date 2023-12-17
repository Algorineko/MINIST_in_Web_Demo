<template>
  <div class="row">
    <div class="mainpart col-md-10 offset-md-1">
      <h1 class="text-start">国际参考电离层(IRI)</h1>
      <br><br>
      <p>时间:<input type="text" v-model="information.time"><i>截止到2020-12-31</i>&nbsp;<b>(格式:2020-12-31T00)</b></p>
      <p>起始高度:<input type="text" v-model="information.altitude_start"><i>0 to 1000 km</i></p>
      <p>截止高度:<input type="text" v-model="information.altitude_stop"></p>
      <p>步长:<input type="text" v-model="information.altitude_stepsize"></p>
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
    <div class="mainpart col-md-10 offset-md-1">
      <p>时间,高度暂时固定</p>
      <p>位置步长:<input type="text" v-model="information_3d.position_stepsize"></p>
      <p>起始经度:<input type="text" v-model="information_3d.longitude_start"><i>0° to 360°</i></p>
      <p>结束经度:<input type="text" v-model="information_3d.longitude_stop"><i>0° to 360°</i></p>
      <p>起始纬度:<input type="text" v-model="information_3d.latitude_start"><i>-90° to 90°</i></p>
      <p>结束纬度:<input type="text" v-model="information_3d.latitude_stop"><i>-90° to 90°</i></p>
      <button type="button" class="btn btn-primary" @click="submit_3d">提交</button>
    </div>
    <div>
      <p>Ne/(cm^-3):</p>
      <p>{{ ne }}</p>
      <div id="ne_chart_3d" style="width: 800px; height: 600px"></div>
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
          altitude_start:100,
          altitude_stop:1000,
          altitude_stepsize:100,
          longitude:120,//Longitude (0° to 360°)
          latitude:80,//Latitude (-90° to 90°)
        },
        ne:[],
        nOp:[],
        neChart:null,
        nOpChart:null,
        information_3d:{
          time:"2020-12-31T00",//截止到2020-12-31
          //Height (0 to 1000 km)
          altitude:100,
          position_stepsize:10,
          longitude_start:80,//Longitude (0° to 360°)
          longitude_stop:130,
          latitude_start:30,//Latitude (-90° to 90°)
          latitude_stop:70,
        },
        ne_3d:[],
        neChart_3d:null,
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
        for (let i = this.information.altitude_start; i <= this.information.altitude_stop; i += this.information.altitude_stepsize) {
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
        for (let i = this.information.altitude_start; i <= this.information.altitude_stop; i += this.information.altitude_stepsize) {
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
        axios.post('http://127.0.0.1:8000/get_2D_info', this.information)
        .then(response => {
          // console.log(response.data.message);
          this.ne=response.data.ne;
          this.nOp=response.data.nOp;
          this.drawChart();
        })
      },
      drawChart_3d() {
        // console.log(this.ne_3d);
        if (this.neChart_3d) {
          this.neChart_3d.dispose();
        }
        this.neChart_3d = this.$echarts.init(document.getElementById("ne_chart_3d"));
        let option = {
          grid3D: {},
          xAxis3D: {
            name:'经度',
          },
          yAxis3D: {
            name: '纬度',
          },
          zAxis3D: {
            name:'Ne/(cm^-3)',
          },
          // 离散点
          series: [
            {
              type: 'scatter3D',
              symbolSize: 5,
              data: this.ne_3d,
            }
          ],
          // 拟合后
          // series: [{
          //   type: 'surface',
          //   wireframe: true,  // 显示网格线
          //   shading: 'color', // 使用颜色着色
          //   data: this.ne_3d,
          // }],
        };
        this.neChart_3d.setOption(option);
      }, 
      submit_3d() {
        axios.post('http://127.0.0.1:8000/get_3D_info', this.information_3d)
          .then(response => {
            // console.log(response.data.neData);
            this.ne_3d = response.data.neData; 
            this.drawChart_3d(); 
          })
          .catch(error => {
            console.error('Error fetching 3D data:', error);
          });
      },
		},
	}
</script>

<style>
	.alert-box-item {
		overflow: hidden;
	}
</style>
