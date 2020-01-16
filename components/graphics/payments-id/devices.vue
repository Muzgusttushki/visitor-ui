<template>
  <apexchart
    :series="data.values"
    :options="{
      ...settings,
      labels: data.labels
    }"
    type="donut"
    width="100%"
  />
</template>

<script>
import { devices_settings } from './settings.js';
export default {
  props: ['data'],
  data() {
    return {
      settings: devices_settings
    }
  }
}
</script>