<template>
  <el-main>
    <div v-if="!loading">
      <div v-if="graphics">
        <el-container>
            <el-main>
                
            </el-main>
        </el-container>
      </div>
      <div v-else>
        Нет данных
      </div>
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
        this.graphics = [{
          date: '08-02-2019',
          cheque: '48$',
          event: 'No. 189, Grove St, Los Angeles',
          source: 'Facebook',
          promo: 'skidka10'
        }, {
          date: '08-02-2019',
          cheque: '48$',
          event: 'No. 189, Grove St, Los Angeles',
          source: 'Facebook',
          promo: 'skidka10'
        }, {
          date: '08-02-2019',
          cheque: '48$',
          event: 'No. 189, Grove St, Los Angeles',
          source: 'Facebook',
          promo: 'skidka10'
        }, {
          date: '08-02-2019',
          cheque: '48$',
          event: 'No. 189, Grove St, Los Angeles',
          source: 'Facebook',
          promo: 'skidka10'
        }, {
          date: '08-02-2019',
          cheque: '48$',
          event: 'No. 189, Grove St, Los Angeles',
          source: 'Facebook',
          promo: 'skidka10'
        }, {
          date: '08-02-2019',
          cheque: '48$',
          event: 'No. 189, Grove St, Los Angeles',
          source: 'Facebook',
          promo: 'skidka10'
        }, {
          date: '08-02-2019',
          cheque: '48$',
          event: 'No. 189, Grove St, Los Angeles',
          source: 'Facebook',
          promo: 'skidka10'
        }, {
          date: '08-02-2019',
          cheque: '48$',
          event: 'No. 189, Grove St, Los Angeles',
          source: 'Facebook',
          promo: 'skidka10'
        }, {
          date: '08-02-2019',
          cheque: '48$',
          event: 'No. 189, Grove St, Los Angeles',
          source: 'Facebook',
          promo: 'skidka10'
        }, {
          date: '08-02-2019',
          cheque: '48$',
          event: 'No. 189, Grove St, Los Angeles No. 189, Grove St, Los AngelesNo. 189, Grove St, Los Angeles',
          source: 'Facebook',
          promo: 'skidka10'
        }, {
          date: '08-02-2019',
          cheque: '48$',
          event: 'No. 189, Grove St, Los Angeles',
          source: 'Facebook',
          promo: 'skidka10'
        }, {
          date: '08-02-2019',
          cheque: '48$',
          event: 'No. 189, Grove St, Los Angeles',
          source: 'Facebook',
          promo: 'skidka10'
        }]
      }

      this.loading = false
    }
  }
}
</script>
