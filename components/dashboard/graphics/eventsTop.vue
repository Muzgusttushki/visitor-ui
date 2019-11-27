<template>
  <el-main>
    <div v-if="!loading">
      <div v-if="graphics">
        <el-table
          :data="graphics.events"
          style="font-size: 18px"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="name"
            label="Название"
            min-width="300"
          />
          <el-table-column
            prop="sales"
            label="Продажи"
            min-width=70
          />
          <el-table-column
            prop="percent"
            label="Процент"
            min-width=70
          />
        </el-table>
      </div>
      <div v-else>
        Нет данных
      </div>
    </div>
    <div v-else>
      <loading-square class="events-top-loadin" />
      <loading-square class="events-top-loadin" />
      <loading-square class="events-top-loadin" />
      <!-- <span><i class="el-icon-loading"></i></span> -->
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

      const remoteGraphics = await this.$store.dispatch('dashboard/getEventRankingGraphics')
      if (remoteGraphics) {
        for (const item of remoteGraphics.events) {
          item.percent += '%'
        }
        this.graphics = remoteGraphics
      }

      this.loading = false
    },

    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 === 0) { return 'row-bg' }
      return ''
    }
  }
}
</script>

<style scoped>
.loading {
  margin: 0 30px;
}
</style>
