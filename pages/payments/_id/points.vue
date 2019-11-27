<template>
  <el-main class="payments points">
    <el-col :span="8" class="component">
      <div class="component__title">
        Начисление баллов
        <font-awesome-icon :icon="['fas', 'pencil-alt']" />
      </div>
      <div class="component__body">
        <div class="row">
          <div class="row__name">Переход по e-mail</div>
          <div class="row__count">12</div>
        </div> 
        <div class="row">
          <div class="row__name">Подписка на соц.сети</div>
          <div class="row__count">32</div>
        </div>
        <div class="row">
          <div class="row__name">Подписка на сайт</div>
          <div class="row__count">6</div>
        </div>
        <div class="row">
          <div class="row__name">Участие в опросе</div>
          <div class="row__count">2</div>
        </div>
        <div class="row">
          <div class="row__name">Переход по e-mail</div>
          <div class="row__count">13</div>
        </div>
        <div class="row">
          <div class="row__name">Подписка на сайт</div>
          <div class="row__count">12</div>
        </div>
        <div class="row">
          <div class="row__name">Участие в опросе</div>
          <div class="row__count">2</div>
        </div>
        <div class="row">
          <div class="row__name">Переход по e-mail</div>
          <div class="row__count">3</div>
        </div>
        <div class="button">
          <el-button>Создать позицию <div class="plus">+</div></el-button>
        </div>
      </div>
    </el-col>
  </el-main>
</template>

<script>
export default {
  layout: 'dashboard'
}
</script>