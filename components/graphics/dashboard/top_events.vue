<template>
  <el-main v-loading="!graphicData" class="local-main">
    <div v-if="graphicData" style="width: 100%">
      <visitor-table
        :data="graphicData"
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

<style lang="scss" scoped>
// .local-main {
//   // background: red;
  
//   .visitor-table {

//     .body {

//       tr {
//         font-size: 14px;
//         color: #000000;

//         th.name {
//           text-align: left;
//         }

//         &:nth-child(odd) {
//           background-color: #F9FAFC;
//         }
//       }
//     }
//   }
// }
</style>
