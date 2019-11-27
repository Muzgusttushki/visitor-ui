<template>
  <el-main>
    <div v-if="!loading">
      <el-tabs v-if="graphics">
        <el-tab-pane label="Полгода">
          <apexchart 
            v-if="graphics" 
            width="100%" 
            height="215" 
            type="area" 
            :options="graphics.options" 
            :series="graphics.series" 
          />
        </el-tab-pane>
        <el-tab-pane label="Месяц">
          <apexchart 
            v-if="graphics" 
            width="100%" 
            height="215" 
            type="area" 
            :options="graphics.options" 
            :series="graphics.series" 
          />
        </el-tab-pane>
        <el-tab-pane label="Неделя">
          <apexchart 
            v-if="graphics" 
            width="100%" 
            height="215" 
            type="area" 
            :options="graphics.options" 
            :series="graphics.series" 
          />
        </el-tab-pane>
      </el-tabs>
      <div v-else>
        Нет данных
      </div>
    </div>
    <div v-else>
      <span><i class="el-icon-loading"></i></span>
    </div>
  </el-main>
</template>
<script>
export default {
  data () {
    return {
      graphics: null,
      loading: true
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
      this.graphics = null
      this.loading = true

      const remoteGraphics = await this.$store.dispatch('dashboard/getBuyersStats')
      if (remoteGraphics) {
        this.graphics = {
          options: {
            chart: {
              type: 'area',
              toolbar: {
                show: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
              type: 'datetime',
              categories: ['2018-09-19T00:00:00', '2018-09-19T01:30:00', '2018-09-19T02:30:00', '2018-09-19T03:30:00', '2018-09-19T04:30:00', '2018-09-19T05:30:00', '2018-09-19T06:30:00']               
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              }
            }
          },
          series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
          }, {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41]
          }]
        }
      }

      this.loading = false
    }
  }
}
</script>
