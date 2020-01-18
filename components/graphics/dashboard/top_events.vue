<template>
  <el-main class="vld-parent">
    <vue-loading
      :active.sync="loading"
      :is-full-page="false"
    />
    <div v-if="graphicData" class="container">
      <visitor-table
        :data="filteredGraphicData"
        :labels="labels"
        :monolite="true"
        :showHeader="false"
      ></visitor-table>
    </div>
  </el-main>
</template>
<script>
import VisitorTable from '@/components/visitor-components/visitor-table.vue';
export default {
  components: { VisitorTable },
  data () {
    return {
      graphicData: null,
      loading: true,
      labels: [{
        prop: 'name',
        label: 'Название',
        width: 300
      },{
        prop: 'sales',
        label: 'Продажи',
        width: 70
      },{
        prop: 'percent',
        label: 'Процент',
        width: 70
      }]
    }
  },

  computed: {
    globalFilters () {
      return this.$store.getters['dashboard/globalFilters'];
    },
    filteredGraphicData() {
      return this.graphicData.map(item => {
        item.percent += '%';
        return item;
      })
    }
  },

  watch: {
    async 'globalFilters.timeInterval' () {
      await this.getGraphicsRemote();
    },

    async 'globalFilters.sources' () {
      await this.getGraphicsRemote();
    }
  },

  async mounted () {
    await this.getGraphicsRemote();
  },

  methods: {
    async getGraphicsRemote () {
      this.graphicData = null;
      this.loading = true;

      const remoteGraphics = await this.$store.dispatch('dashboard/getEventRankingGraphics');
      if (remoteGraphics) this.graphicData = remoteGraphics.events;

      this.loading = false;
    }
  }
}
</script>
