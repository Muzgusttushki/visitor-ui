<template>
  <el-main>
    <div v-if="!loading">
      <div v-if="graphics">
        <apexchart
          height="360px"
          :options="graphics.options"
          :series="graphics.data"
        />
      </div>
      <div v-else>
        Нет данных
      </div>
    </div>
    <div v-else>
      <loading-circle class="loading" />
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

      const remoteGraphics = await this.$store.dispatch('dashboard/getLocationsGraphics')
      if (remoteGraphics) {
        this.graphics = {
          options: {
            labels: remoteGraphics.labels,
            dataLabels: {
              formatter (val, opts) {
                return val.toFixed(0) + '%'
              }
            },
            chart: {
              type: 'donut'
            },
            plotOptions: {
              pie: {
                offsetX: 10,
                donut: {
                  labels: {
                    show: true,
                    name: {
                      show: true,
                      fontFamily: 'Rubik, sans-serif'
                    }
                  }
                }
              }
            },
            responsive: [{
              breakpoint: 4000,
              options: {
                chart: {
                  height: 360
                }
              }
            }, {
              breakpoint: 1400,
              options: {
                chart: {
                  width: '100%',
                  height: 300
                }
              }
            }, {
              breakpoint: 1100,
              options: {
                plotOptions: {
                  pie: {
                    offsetX: 40
                  }
                }
              }
            }]
          },
          data: remoteGraphics.data || []
        }
      }

      this.loading = false
    }
  }
}
</script>
