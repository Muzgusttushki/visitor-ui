<template>
  <div class="content">
      <apexchart
        width="100%"
        type="donut"
        :options="settings"
        :series="data"
      />
  </div>
</template>

<script>
import { transitions_settings } from './settings.js';
export default {
  props: ['data'],
  data() {
    return {
      settings: transitions_settings
    }
  }
}
</script>