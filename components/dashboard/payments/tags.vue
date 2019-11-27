<template>
  <el-main>
    
  </el-main>
</template>

<script>
export default {
  data () {
    return {
      data: null,
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
      this.data = null
      this.loading = true

      const remoteGraphics = await this.$store.dispatch('dashboard/getBuyersStats')
      if (remoteGraphics) {
        this.data = {
          tags: {
            1: 'one',
            2: 'two',
            3: 'three',
            4: 'four',
            5: 'five',
            6: 'six',
            7: 'seven'
          }
        }
      }

      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-tag {
  display: flex;
}

.loading {
  width: 45px;
  height: 15px;
}
</style>