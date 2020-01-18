<template>
  <apexchart 
    :options="settings" 
    :series="data"
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