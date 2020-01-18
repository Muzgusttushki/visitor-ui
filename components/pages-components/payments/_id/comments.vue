<template>
  <div>
    <div class="component-container">
      <el-row>
        <h2 class="component-title">Комментарии</h2>
      </el-row>
      <div class="comments__container">
        <div class="wrapper">
          <el-row class="comments__wrapper" v-for="(_, id) of new Array(5)" :key="id">
            <el-row class="comments__wrapper_username">
              <el-col :span="5">
                <img v-if="false" src="" alt="" width="45px" height="45px" />
                <p v-else class="no-image">No image</p>
              </el-col>
              <el-col :offset="1" :span="18" class="container">
                <div class="name">Иван Дмитриев</div>
                <div class="position">Технический директор</div>
              </el-col>
            </el-row>
            <el-row class="comments__wrapper_text">
              <el-col :offset="5" :span="19">Давали бесплатный проход на спектакль с Лебедевым</el-col>
            </el-row>
            <el-row class="comments__wrapper_date">
              <el-col :offset="5" :span="19">19.06.2019</el-col>
            </el-row>
          </el-row>
        </div>
      </div>
      <div class="empty-element-for-padding"></div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
p.no-image {
  width: 45px;
  height: 45px;
  text-align: center;
  background-color: #d4d4d4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  font-size: 11px;
}
.empty-element-for-padding {
  height: 30px;
  width: 100%;
}
</style>