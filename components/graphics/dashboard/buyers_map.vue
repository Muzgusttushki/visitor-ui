<template>
  <el-main class="vld-parent">
    <vue-loading 
      :active.sync="loading"
      :is-full-page="false"
    />
    <transition name="graphic">
      <div v-if="graphicData">
        <apexchart
          height="360px"
          :options="settings"
          :series="graphicData"
        />
      </div>
    </transition>
  </el-main>
</template>
<script>
import { buyers_map_settings } from './settings.js';

export default {
  data () {
    return {
      graphicData: null,
      loading: true,
      settings: buyers_map_settings
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

  created() {
  },

  methods: {
    async getGraphicsRemote () {
      this.graphicData = null
      this.loading = true

      const remoteGraphics = await this.$store.dispatch('dashboard/getLocationsGraphics')
      if (remoteGraphics) {
        const { data, labels } = remoteGraphics;
        this.settings.labels = labels;
        this.graphicData = data || [];
      }

      this.loading = false
    }
  }
}
</script>
