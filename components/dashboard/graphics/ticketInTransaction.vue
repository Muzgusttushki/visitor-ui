<template>
  <el-main>
    <div v-if="!loading">
      <div v-if="graphics">
        <apexchart type="bar" height="330" :options="graphics.options" :series="graphics.series" />
      </div>
      <div v-else>
        Нет данных
      </div>
    </div>
    <div v-else>
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

      const remoteGraphics = await this.$store.dispatch('dashboard/getSalesTicketGraphics')
      if (remoteGraphics) {
        this.graphics = {
          options: {
            chart: {
              toolbar: {
                show: false
              }
            },
            legend: {
              show: false
            },
            dataLabels: {
              enabled: false
            },
            plotOptions: {
              bar: {
                dataLabels: {
                  position: 'center' // top, center, bottom
                },
                distributed: true
              }
            },
            labels: ['1', '2', '3', '4', '5+'],
            xaxis: {
              labels: {
                show: true
              },
              axisBorder: {
                show: false
              }
            },
            colors: ['#4BDCA3', '#5AB6FE', '#6382A7', '#B3C0CE', '#B3C0CE'],
            yaxis: {
              labels: {
                show: false
              }
            },
            grid: {
              show: false
            },
            responsive: [{
              breakpoint: 1200,
              options: {
                chart: {
                  height: 240
                }
              }
            }, {
              breakpoint: 1400,
              options: {
                chart: {
                  height: 250
                }
              }
            }]
          },
          series: [{
            name: 'Всего',
            data: remoteGraphics.data || []
          }]
        }
      }

      this.loading = false
    }
  }
}
</script>
