<template>
  <el-main class="vld-parent">
    <vue-loading 
      :active.sync="loading"
      :is-full-page="false"
    />
    <transition name="graphic">
      <div v-if="graphicData">
        <apexchart 
          type="bar" 
          height="330" 
          :options="settings" 
          :series="graphicData" 
        />
      </div>
    </transition>
  </el-main>
</template>
<script>
import { tickets_number_settings } from './settings';

export default {
  data () {
    return {
      graphicData: null,
      loading: true,
      settings: tickets_number_settings
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

      const remoteGraphics = await this.$store.dispatch('dashboard/getSalesTicketGraphics')
      if (remoteGraphics) {
        const { data } = remoteGraphics
        this.graphicData = [{ name: 'Всего', data: [...data] || [] }]
      }
      console.log(this.graphicData, 'graphic data', remoteGraphics)

      this.loading = false
    }
  }
}
</script>
