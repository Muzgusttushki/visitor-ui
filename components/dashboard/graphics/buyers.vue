<template>
  <el-main>
    <div v-if="!loading">
      <div v-if="graphics">
        <apexchart
          height="270"
          :options="graphics.options"
          :series="graphics.buyers"
        />
      </div>
      <div v-else>
        Нет данных
      </div>
    </div>
    <div v-else>
      <loading-circle class="loading" />
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
            labels: ['Всего покупателей', 'За период'],
            dataLabels: {
              style: {
                fontSize: '14px'
              },
              formatter (val, opts) {
                return val.toFixed(0) + '%'
              }
            },
            chart: {
              type: 'donut'
            },
            legend: {
              position: 'bottom'
            },
            responsive: [{
              breakpoint: 4000,
                options: {
                  chart: {
                    height: 370
                  }
                }
              }, {
              breakpoint: 1400,
                options: {
                  chart: {
                    height: 280
                  }
                }
              }, {
              breakpoint: 1200,
                options: {
                  chart: {
                    height: 300
                  }
                }
              }, {
              breakpoint: 1600,
                options: {
                  chart: {
                    height: 330
                  }
                }
            }]
          },
          buyers: [remoteGraphics.buyers, remoteGraphics.previousBuyers]
        }
      }

      this.loading = false
    }
  }
}
</script>
