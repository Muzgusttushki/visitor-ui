<template>
  <div>
    <!-- <div v-if="!loading"> -->
      
    <!-- </div>
    <div v-else>
      <loading-square class="loading" />
    </div> -->
  </div>
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
          zeeer: 1
        }
      
      }

      this.loading = false
    }
  }
}
</script>
