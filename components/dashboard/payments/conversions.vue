<template>
  <el-main>
    <div v-if="!loading">
      
      <!-- <div v-else>
        Нет данных
      </div> -->
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
          options: {},
          series: [25, 25, 25, 25]
        }
      }

      this.loading = false
    }
  }
}
</script>
