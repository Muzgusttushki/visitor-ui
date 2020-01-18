<template>
  <div class="content">
    <apexchart 
      type="donut"
      :options="{labels: this.filteredUserSource.type, ...settings}"
      :series="this.filteredUserSource.value"
    />
  </div>
</template>

<script>
import { transitions_settings } from './settings.js';
export default {
  props: ['data'],

  data() {
    return {
      translate: {
        direct: "Прямой",
        advertising: "Да",
        messenger: "Мессенджер",
        social: "Соц. сети",
        email: "Почта",
        advertisement: "Реклама"
      },
      settings: transitions_settings
    }
  },

  computed: {
    
    filteredUserSource() {
      const data = this.data;

      if (data.length === 1) {
        return {
          type: [this.translate[data[0]["type"]]],
          value: [data[0]["quantity"]]
        };
      }

      const names = [];
      const values = [];

      for (let i = 0; i < data.length; i++) {
        const type = data[i].method ? 'advertisement' : data[i].type
        const index = names.indexOf(type);

        if (index >= 0) {
          values[index] += data[i].quantity;
        } else {
          values.push(data[i].quantity) && names.push(type);
        }
      }

      return {
        type: names.map(item => this.translate[item]),
        value: values
      };
    }
  },
}
</script>