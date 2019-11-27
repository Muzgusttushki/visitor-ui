<template>
  <el-main>
    <div v-if="!loading">
      
      <!-- <div v-else>
        Нет данных
      </div> -->
    </div>
    <div v-else>
      <loading-square class="loading" />
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
          options: {},
          series: [{
            name: 'series1',
            data: 1
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
