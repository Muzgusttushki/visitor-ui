<template>
  <div class="loading">
    <div class="animationLoading">
      <div class="loading-animation_one"></div>
    </div>
  </div>
</template>

<style scoped>

.loading {
  padding: 10px 0;
  /* width: 100%; */
  height: 50px;
}

.animationLoading{
  width: 100%;
  height: 100%;
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
  border-radius: 10px;
  background-color: #CCC;
  animation: animate 2s infinite linear;
  background: -webkit-gradient(linear, left top, right top, color-stop(8%, #eeeeee), color-stop(18%, #dddddd), color-stop(33%, #eeeeee));
  background: -webkit-linear-gradient(left, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  -webkit-background-size: 800px 104px;
  background-size: 800px 104px;
  width: 100%;
  height: 100%;
}
</style>