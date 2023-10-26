import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入view组件,“ 绝对路径 ” @ 表示src
import MINIST from '@/views/MINIST';
// VueRouter插件初始化
Vue.use(VueRouter);
// 创建路由对象
const router=new VueRouter({
  routes:[
    {path: '/minist', component:MINIST},
  ]
});
// 导出路由对象
export default router;