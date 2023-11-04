<template>
  <div class="App row">
    <!-- 顶部 -->
    <div class="headtop col-md-12 offset-md-0 shadow">
      <p class="headtop_title"><img src="./img/NCU.png" alt="NCU" class="headtop_img">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NCU</p>
    </div>
    <!-- 导航栏 -->
    <div class="model_nav col-md-2 offset-md-0 border-end">
      <ul class="model_list nav flex-column">
        <li class="nav-item nav_title shadow">
          <a class="nav-link text-center nav_header">模型列表</a>
        </li>
        <li class="nav-item shadow-sm">
          <a class="nav-link active" aria-current="page" href="#/minist">MINIST</a>
        </li>
        <li class="nav-item shadow-sm">
          <a class="nav-link" href="#" @click="CV_toggle"><b>计算机视觉</b></a>
        </li>
        <template v-for="(model,index) in CV_arr">
          <li class="nav-item shadow-sm" v-if="CV_isopen" :key="index">
            <a class="nav-link" :href="'#/' + model.href"><i>{{ model.name }}</i></a>
          </li>
        </template>
        <li class="nav-item shadow-sm">
          <a class="nav-link" href="#" @click="NLP_toggle"><b>自然语言处理</b></a>
        </li>
        <template v-for="(model,index) in NLP_arr">
          <li class="nav-item shadow-sm" v-if="NLP_isopen" :key="index">
            <a class="nav-link" :href="'#/' + model.href"><i>{{ model.name }}</i></a>
          </li>
        </template>
        <li class="nav-item shadow-sm">
          <a class="nav-link disabled" href="#"><b>其他</b></a>
        </li>
      </ul>
    </div>
    <!-- 模型展示区 -->
    <div class="col-md-10 offset-md-0 show_area">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        CV_isopen:true,
        CV_arr:[
          {
            index: 1,
            name:"MINIST",
            href:"minist",
          },
          {
            index: 2,
            name:"CV_2",
            href:"cv2",
          },
          {
            index: 3,
            name:"CV_3",
            href:"cv3",
          },
        ],
        NLP_isopen:true,
        NLP_arr:[
          {
            index: 1,
            name:"NLP_1",
            href:"nlp1",
          },
          {
            index: 2,
            name:"NLP_2",
            href:"nlp2",
          },
          {
            index: 1,
            name:"NLP_1",
            href:"nlp1",
          },
          {
            index: 2,
            name:"NLP_2",
            href:"nlp2",
          },
          {
            index: 1,
            name:"NLP_1",
            href:"nlp1",
          },
          {
            index: 2,
            name:"NLP_2",
            href:"nlp2",
          },
          {
            index: 1,
            name:"NLP_1",
            href:"nlp1",
          },
          {
            index: 2,
            name:"NLP_2",
            href:"nlp2",
          },
          {
            index: 1,
            name:"NLP_1",
            href:"nlp1",
          },
          {
            index: 2,
            name:"NLP_2",
            href:"nlp2",
          },
          {
            index: 1,
            name:"NLP_1",
            href:"nlp1",
          },
          {
            index: 2,
            name:"NLP_2",
            href:"nlp2",
          },
          {
            index: 1,
            name:"NLP_1",
            href:"nlp1",
          },
          {
            index: 2,
            name:"NLP_2",
            href:"nlp2",
          },
          {
            index: 1,
            name:"NLP_1",
            href:"nlp1",
          },
          {
            index: 2,
            name:"NLP_2",
            href:"nlp2",
          },
          {
            index: 1,
            name:"NLP_1",
            href:"nlp1",
          },
          {
            index: 2,
            name:"NLP_2",
            href:"nlp2",
          },
        ],
      }
    },
    methods:{
      CV_toggle(){
        this.CV_isopen=!this.CV_isopen;
      },
      NLP_toggle(){
        this.NLP_isopen=!this.NLP_isopen;
      },
    },
    computed: {

    }
  }
</script>

<style>
.headtop{
  background-color: #416791;
  color: white;
  height: 36px;
  position: relative; 
  outline: 2px solid #293da0;
}
.headtop_title{
  position: absolute;
  height: 36px;
  line-height: 36px;
  font-size: 16px;
  margin:0px;
  padding: 0em 2em 0em;
}
.headtop_img{
  height: 34px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius:16px
}
.model_nav{
  background-color: #fff;
  padding: 0px 0px 0px 16px;
  overflow: auto;
  height: 600px;
}
.nav_title{
  padding: 0%;
}
</style>