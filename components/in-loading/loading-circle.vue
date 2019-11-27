<template>
  <el-main class="loading">
    <div class="animationLoading">
      <div class="loading-animation_one"></div>
    </div>
  </el-main>
</template>

<style  scoped>

.loading {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.animationLoading{
  /* border-radius: 20px; */
  height: 200px;
  width: 200px;
}

@keyframes animate {
  from {
    background-position: -770px 0
  }
  to { 
    background-position: 770px 0
  }

}
.loading-animation_one {
  border-radius: 50%;
  position:relative;
  background-color: #CCC;
  height: 6px;
  animation: animate 2s infinite linear;
  /* animation-name: animate; 
  animation-duration: 2s; 
  animation-iteration-count: infinite;
  animation-timing-function: linear;    */
  background: -webkit-gradient(linear, left top, right top, color-stop(8%, #eeeeee), color-stop(18%, #dddddd), color-stop(33%, #eeeeee));
  background: -webkit-linear-gradient(left, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  -webkit-background-size: 800px 104px;
  background-size: 800px 104px; 
}

.loading-animation_one {
  height: 100%;
  width: 100%;  
}
</style>