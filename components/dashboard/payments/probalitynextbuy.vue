<template>
  <el-main>
    <div v-if="!loading">
      
      <!-- <div v-else>
        Нет данных
      </div> -->
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
          series: [70],
          chartOptions: {
            plotOptions: {
              radialBar: {
                hollow: {
                  size: '60%'
                },
                dataLabels: {
                  value: {
                    show: false
                  },
                  name: {
                    offsetY: 5
                  }
                }
              }
            },
            colors: ['#4BDCA3'],
            labels: ['70%']
          }
        }
      } 

      this.loading = false
    }
  }
}
</script>
