<template>
  <div>
    <el-col :span="8" v-for="(item, id) in [
        { color: '#5AB6FE', data: [60], label: 'Вероятность открыть e-mail' },
        { color: '#4BDCA3', data: [90], label: 'Вероятность следующей покупки' },
        { color: '#FFC657', data: [80], label: 'Вероятность отказа' }
      ]" :key="id">
      <div>
        <apexchart
          :options="{...settings, colors: item.color}"
          :series="item.data"
          height="200"
        />
        <p>{{item.label}}</p>
      </div>
    </el-col>
  </div>
</template>

<script>
import { possibility_settings } from './settings.js';
export default {
  props: ['data'],
  data() {
    return {
      settings: possibility_settings
    }
  }
}
</script>