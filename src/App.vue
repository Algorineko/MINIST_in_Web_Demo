<template>
  <div class="App row">
    <!-- 顶部 -->
    <div class="headtop col-md-12 offset-md-0 shadow">
      <p class="headtop_title"><img src="./img/NCU.png" alt="NCU" class="headtop_img">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NCU</p>
    </div>
    <!-- 导航栏 -->
    <div class="model_nav col-md-2 offset-md-0 border-end">
      <ul class="nav flex-column">
        <li class="nav-item nav_title shadow">
          <a class="nav-link text-center nav_header">模型列表</a>
        </li>
        <li class="nav-item shadow-sm">
          <a class="nav-link active" aria-current="page" href="#/minist">MINIST</a>
        </li>
        <li class="nav-item shadow-sm">
          <a class="nav-link disabled" href="#">Model_2</a>
        </li>
        <li class="nav-item shadow-sm">
          <a class="nav-link disabled" href="#">Model_3</a>
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
}
.nav_title{
  padding: 0%;
}
</style>