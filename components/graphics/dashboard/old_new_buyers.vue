<template>
  <el-main v-loading="!graphicData">
    <div v-if="graphicData">
      <apexchart
        height="270"
        :options="settings"
        :series="graphicData"
      />
    </div>
  </el-main>
</template>
<script>
import { old_new_buyers_settings } from './settings.js'

export default {
  data () {
    return {
      graphicData: null,
      loading: true,
      settings: old_new_buyers_settings
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
      this.graphicData = null
      this.loading = true

      const remoteGraphics = await this.$store.dispatch('dashboard/getBuyersStats')
      if (remoteGraphics) {
        const { buyers, previousBuyers } = remoteGraphics;
        this.graphicData = [buyers, previousBuyers];
      }

      this.loading = false
    }
  }
}
</script>
