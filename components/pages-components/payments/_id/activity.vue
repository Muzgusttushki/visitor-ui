<template>
  <div>
    <el-row>
      <h2 class="component-title">Активность пользователя</h2>
    </el-row>
    <el-row class="activity-row">
      <el-col :span="18">
        <p>Кол-во активных действий</p>
      </el-col>
      <el-col :span="6" class="text-right">
        <p>{{filteredData['totalActions']}}</p>
      </el-col>
    </el-row>
    <el-row class="activity-row row-bg">
      <el-col :span="18">
        <p>Заходы на сайт</p>
      </el-col>
      <el-col :span="6" class="text-right">
        <p>{{filteredData['sheetActions']}}</p>
      </el-col>
    </el-row>
    <el-row class="activity-row">
      <el-col :span="18">
        <p>Взаимодействие с виджетом</p>
      </el-col>
      <el-col :span="6" class="text-right">
        <p>{{filteredData['widgetActions']}}</p>
      </el-col>
    </el-row>
    <el-row class="activity-row row-bg">
      <el-col :span="18">
        <p>Открытие писем</p>
      </el-col>
      <el-col :span="6" class="text-right">
        <p>0</p>
      </el-col>
    </el-row>
    <el-row class="activity-row">
      <el-col :span="18">
        <p>Опросы</p>
      </el-col>
      <el-col :span="6" class="text-right">
        <p>0</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    filteredData() {
      return this.$utils.filterObjectProps(this.data, 'N/A');
    }
  },
}
</script>