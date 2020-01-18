<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane 
      v-for="(item, id) in [
        { label: 'Города', name: 'towns' },
        { label: 'Районы', name: 'area' }
      ]"
      :key="id"
      :label="item.label"
      :name="item.name"
    >
      <apexchart
        v-if="activeTab === item.name"
        :options="{ 
          ...settings,
          xaxis: {
            ...settings.xaxis,
            categories: data.map(r => r.name)
          }
        }"
        :height="computedLocationsHeight"
        :series="[{
          name: 'Name',
          data: data.map(r => r.quantity)
        }]"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { locations_settings } from './settings';

export default {
  props: ['data'],
  data() {
    return {
      settings: locations_settings,
      activeTab: 'towns'
    }
  },
  computed: {
    computedLocationsHeight() {
      return this.data.length * 60;
    }
  }
}
</script>