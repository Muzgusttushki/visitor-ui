<template>
  <el-main>
    <div v-if="!loading">
      <el-tabs v-if="graphics">
        <el-tab-pane label="Билеты">
          <apexchart v-if="graphics" height="300" type="area" :options="graphics.charOptions" :series="graphics.transactions" />
        </el-tab-pane>
        <el-tab-pane label="Операции">
          <apexchart v-if="graphics" height="300" type="area" :options="graphics.charOptions" :series="graphics.operations" />
        </el-tab-pane>
        <el-tab-pane label="Новые клиенты">
          <apexchart v-if="graphics" height="300" type="area" :options="graphics.charOptions" :series="graphics.users" />
        </el-tab-pane>
      </el-tabs>
      <div v-else> 
        Нет данных
      </div>
    </div>
    <div v-else>
      <loading-square class="loading" />
      <loading-square class="loading" />
      <loading-square class="loading" />
      <!-- <span><i class="el-icon-loading"></i></span> -->
    </div>
  </el-main>
</template>
<script>
export default {
  data () {
    return {
      graphics: null,
      loading: true,
      localInterval: null
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

      this.graphics = null
      this.loading = true 
      
      const request = await this.$axios.get(
        `${process.env.address}/v1/api/dashboard/graphics/activity${this.$formatDate(interval.start, interval.end)}`
      )
      
      // const request = await this.$store.dispatch('dashboard/getSalesGraphics')
      if (request.data.error) return null
      
      const remoteGraphics = request.data;
      
      if (!remoteGraphics) return null
      
      const dates = remoteGraphics.users.yAxis
      const check = Math.floor( ( 
        // get last and first request date
        new Date(dates[dates.length - 1]['x']) - new Date(dates[0]['x']) 
        // and get days count
      ) / 1000 / 60 / 60 / 24 )
      const format = 
        check == 2 ? 
        '{D}.{MM} {H}:{M}' 
        : check == 1 ? 
        '{H}:{M}' : '{D}.{MM}.{Y}';
      
      // const remoteBuyers = await this.$store.dispatch('dashboard/getBuyersStats')
      if (remoteGraphics) { // && remoteBuyers
        this.graphics = {
          charOptions: {
            stroke: {
              curve: 'smooth'
            },
            chart: {
              toolbar: {
                show: false
              },
              animations: {
                enabled: true,
                easing: 'linear',
                animateGradually: {
                  enabled: true,
                  delay: 5000
                }
              }
            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
              categories: [...dates.map(item => {
                const first = this.$times({
                  time: item['x'],
                  format: format
                })
                const second = this.$times({
                  time: item['y'],
                  format: format
                })
                return `${first} - ${second}`
                })],
              labels: {
                show: false
              },
              tooltip: {
                enabled: false
              }
            },
            responsive: [{
              breakpoint: 1400,
              options: {
                chart: {
                  height: 230
                }
              }
            }]
          },
          transactions: [{
            name: 'Всего',
            data: remoteGraphics.transactions.xAxis
          }],

          operations: [{
            name: 'Всего',
            data: remoteGraphics.operations.xAxis
          }],

          users: [{
            name: 'Всего',
            data: remoteGraphics.users.xAxis
          }]
        }
      }

      this.loading = false
    }
  }
}
</script>
