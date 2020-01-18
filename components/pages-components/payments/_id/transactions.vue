<template>
  <div>
    <el-row>
      <h2 class="component-title">Транзакции пользователя</h2>
    </el-row>
    <el-row class="activity-row">
      <el-col :span="12">
        <p>Сумма покупок</p>
      </el-col>
      <el-col :span="12" class="text-right">
        <p>{{ data["earnings"] }}₽</p>
      </el-col>
    </el-row>
    <el-row class="activity-row row-bg">
      <el-col :span="12">
        <p>Транзакций</p>
      </el-col>
      <el-col :span="12" class="text-right">
        <p>{{ data["sales"] }}</p>
      </el-col>
    </el-row>
    <el-row class="activity-row">
      <el-col :span="12">
        <p>Билетов куплено</p>
      </el-col>
      <el-col :span="12" class="text-right">
        <p>{{ data["tickets"] }}</p>
      </el-col>
    </el-row>
    <el-row class="activity-row row-bg">
      <el-col :span="12">
        <p>Билетов в 1 заказе</p>
      </el-col>
      <el-col :span="12" class="text-right">
        <p>{{ data["averageTickets"] }}</p>
      </el-col>
    </el-row>
    <el-row class="activity-row">
      <el-col :span="12">
        <p>Средний чек</p>
      </el-col>
      <el-col :span="12" class="text-right">
        <p>{{ data["averageEarnings"] }}₽</p>
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