<template>
  <el-main class="vld-parent">
    <vue-loading 
      :active.sync="loading"
      :is-full-page="false"
    />
    <el-tabs v-if="graphicData" @tab-click="handleTabClick">
      <el-tab-pane
        v-for="(data, key, index) of graphicData"
        :key="key"
        :label="translateLabel[key]"
      >
        <apexchart
          v-if="activeTab === String(index)"
          :series="data"
          :options="{...settings, xaxis: { 
            categories: categories,
            labels: {
              show: false
            },
            tooltip: {
              enabled: false
            }
          }}"
          height="300"
          type="area"
        />
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>
<script>
import { sales_settings } from './settings.js';

export default {
  data () {
    return {
      activeTab: '0',
      graphicData: false,
      loading: true,
      localInterval: null,
      settings: sales_settings,
      categories: null,
      translateLabel: {
        transactions: 'Билеты',
        users: "Новые покупатели",
        operations: "Операции"
      }
    }
  },

  computed: {
    globalFilters () {
      return this.$store.getters['dashboard/globalFilters']
    }
  },

  watch: {
    async 'globalFilters.timeInterval' () {
      await this.getGraphicsRemote()
    },

    async 'globalFilters.sources' () {
      await this.getGraphicsRemote()
    }
  },

  async mounted () {
    await this.getGraphicsRemote()
  },

  methods: {
    async getGraphicsRemote () {
      const interval = this.globalFilters.timeInterval;

      /* 
      check  : determines the days interval
      format : various format for 2 days (check == 2), 1 day (check == 1) and more
      */

      this.graphicData = null;
      this.loading = true;
      
      const request = await this.$axios.get(
        `${process.env.address}/v1/api/dashboard/graphics/activity${this.$formatDate(interval.start, interval.end)}`
      );
      if (request.data.error) return null;
      // const request = await this.$store.dispatch('dashboard/getSalesGraphics')
      
      const remoteGraphics = request.data;

      // const remoteBuyers = await this.$store.dispatch('dashboard/getBuyersStats')
      if (remoteGraphics) { // && remoteBuyers
        const dates = remoteGraphics.users.yAxis;

        const check = Math.floor((
          new Date(dates[dates.length - 1]['x']) - new Date(dates[0]['x'])
        ) / 1000 / 60 / 60 / 24 )
        
        const format =
          check == 2 ?
          '{D}.{MM} {H}:{M}'
          : check == 1 ?
          '{H}:{M}' : '{D}.{MM}.{Y}';
        
        this.categories = [
          ...dates.map(item => {
            const first = this.$times({
              time: item['x'],
              format: format
            })
            const second = this.$times({
              time: item['y'],
              format: format
            })
            return `${first} - ${second}`
          })
        ]

        const { transactions, operations, users } = remoteGraphics;
        this.graphicData = {
          transactions: [{
            name: 'Всего',
            data: [...transactions.xAxis]
          }],

          operations: [{
            name: 'Всего',
            data: [...operations.xAxis]
          }],

          users: [{
            name: 'Всего',
            data: [...users.xAxis]
          }]
        }
      }

      this.loading = false
    },
    handleTabClick(tab, event) {
      this.activeTab = tab.index;
      console.log(this.settings);
    }
  }
}
</script>
