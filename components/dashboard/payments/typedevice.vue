<template>
    <el-main>
        <div v-if="!loading">
            <div v-if="graphics">
                
            </div>
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

      const remoteGraphics = await this.$store.dispatch('dashboard/getSalesGraphics')
      if (remoteGraphics) {
        console.log(remoteGraphics)
        this.graphics = {
          options: {},
          series: {
            comp: 39,
            phone: 61
          }
        }
      }

      this.loading = false
    }
  }
}
</script>
