import 'bootstrap/dist/css/bootstrap.css'; //引用bootstrap的样式
import 'bootstrap/dist/js/bootstrap.min.js'; //引用bootstrap的js
import Vue from 'vue';
import router from './router/index.js';
import App from './App.vue';
// import echarts from 'echarts';
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');