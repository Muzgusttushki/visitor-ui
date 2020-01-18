<template>
  <el-main class="vld-parent">
    <vue-loading 
      :active.sync="loading"
      :is-full-page="false"
    />
    <el-tabs v-if="graphicData" v-model="activeTab">
      <el-tab-pane label="Продажи">
        <apexchart
          v-if="activeTab === '0'"
          type="bar"
          height="280"
          :options="settings"
          :series="graphicData.transactions"
        />
      </el-tab-pane>
      <el-tab-pane label="Операции">
        <apexchart 
          v-if="activeTab === '1'"
          type="bar" 
          height="280"
          :options="settings" 
          :series="graphicData.operations" 
        />
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>
<script>
import { device_type_settings } from './settings.js';

export default {
  data () {
    return {
      activeTab: '0',
      graphicData: null,
      loading: true,
      settings: device_type_settings
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

      const remoteGraphics = await this.$store.dispatch('dashboard/getDevicesGraphics')
      if (remoteGraphics) {
        const { transactions, operations } = remoteGraphics;
        this.graphicData = {
          transactions: [{
            name: 'Продажи',
            data: [ ...transactions ]
          }],
          operations: [{
            name: 'Операции',
            data: [ ...operations ]
          }]
        }
      }

      this.loading = false
    }
  }
}
</script>

<style scope>
</style>