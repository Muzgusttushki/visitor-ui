<template>
  <apexchart 
    :options="settings" 
    :series="data"
  />
</template>

<script>
import { users_settings } from './settings.js';
export default {
  props: ['data'],
  data() {
    return {
      settings: users_settings
    }
  }
}
</script>