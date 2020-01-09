<template>
  <el-main>
    <div v-if="!loading">
      <el-tabs v-if="graphics">
        <el-tab-pane label="Продажи">
          <apexchart
            v-if="graphics"
            type="bar"
            height="280"
            :options="graphics.options"
            :series="graphics.transactions"
          />
        </el-tab-pane>
        <el-tab-pane label="Операции">
          <apexchart v-if="graphics" type="bar" :options="graphics.options" :series="graphics.operations" />
        </el-tab-pane>
      </el-tabs>
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

      const remoteGraphics = await this.$store.dispatch('dashboard/getDevicesGraphics')
      if (remoteGraphics) {
        this.graphics = {
          options: {
            categories: [],
            legend: {
              show: false
            },
            xaxis: {
              categories: ['Смартфон', 'Компьютер', 'Другое'],
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              labels: {
                style: {
                  fontSize: '13px',
                  fontFamily: 'Rubik, sans-serif'
                }
              }
            },
            grid: {
              show: false
            },
            yaxis: {
              axisTicks: {
                show: false
              },
              labels: {
                show: false
              }
            },
            chart: {
              type: 'bar',
              toolbar: {
                show: false
              }
            },
            colors: ['#5AB6FE', '#4BDCA3', '#6382A7'],
            chartOptions: {
              dataLabels: {
                enabled: false
              }
            },
            plotOptions: {
              bar: {
                dataLabels: {
                  position: 'center' // top, center, bottom
                },
                distributed: true
              }
            },
            responsive: [{
              breakpoint: 4000,
              options: {
                chart: {
                  height: 280
                }
              }
            }, {
              breakpoint: 1400,
              options: {
                chart: {
                  height: 220
                }
              }
            }]
          },
          transactions: [{
            name: 'Продажи',
            data: [
              remoteGraphics.transactions.phones,
              remoteGraphics.transactions.desktops,
              remoteGraphics.transactions.others
            ]
          }],

          operations: [{
            name: 'Операции',
            data: [
              remoteGraphics.operations.phones,
              remoteGraphics.operations.desktops,
              remoteGraphics.operations.others
            ]
          }]
        }
      }

      this.loading = false
    }
  }
}
</script>

<style scope>
.el-tabs__nav-wrap:after {
  width: 176px;
}
</style>