<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane
      v-for="(item, key) in [
      {name: 'Год', var: 'year'},
      {name: 'Месяц', var: 'month'},
      {name: 'Неделя', var: 'week'}
    ]"
      :key="key"
      :label="item.name"
      :name="item.var"
    >
      <apexchart
        v-if="activeTab === item.var"
        type="area"
        :options="{
          ...settings,
          xaxis: { 
            labels: {show: false},
            tooltip: {enabled: false},
            categories: [...editActivityDates(data[item.var].dates)]
          }
        }"
        :series="[
          { name: 'Операции', data: data[item.var].operations },
          { name: 'Транзакции', data: data[item.var].transactions }
        ]"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
// ГРАФИК АКТИВНОСТИ
import { activity_settings } from './settings.js';

export default {
  props: ['data'],

  data() {
    return {
      settings: activity_settings,
      activeTab: 'year'
    }
  },

  methods: {
    editActivityDates(dates) {
      const format = "{D}.{MM}.{Y}";

      return dates.map(item => {
        return (
          this.$times({
            time: item.current,
            format
          }) +
          " - " +
          this.$times({
            time: item.countdown,
            format
          })
        );
      });
    },
  }

}
</script>