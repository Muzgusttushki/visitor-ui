<template>
  <div 
    :class="monolite ? 'monolite' : 'split'" 
    class="scrollbarFix visitor-table"
    v-loading="loading"
    ref="table">
    <table 
      :style="{ width: tableWidth + 'px' }"
    >
      <div v-if="!loading">
        <div class="header" v-if="showHeader">
          <tr>
            <th
              v-for="(name, id) of labels"
              :key="id"
              :style="{ width: calcCellWidth(name['width']) + 'px' }"
              :class="name.prop"
            >{{name.label}}</th>
          </tr>
        </div>
        <div class="body scrollbarFix">
          <tr
            v-for="(row, rowID) of visibleRows"
            :key="rowID"
            @click="$emit('row-click', row)"
          >
            <th
            v-for="(item, key, index) of row"
            :class="key"
            :key="key"
            :style="{ width: calcCellWidth(labels.find(r => r.prop === key)['width']) + 'px'}"
            ><slot :cell="{ key: key, prop: item, rowID: rowID }">{{item}}</slot>
            </th>
          </tr>
          <div v-if="!data.length" class="no-data">
            <span>No data...</span>
          </div>
        </div>
      </div>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Array, default: {} },
    labels: { type: Array, default: {} },
    monolite: { type: Boolean, default: false },
    showHeader: { type: Boolean, default: true }
  },
  data() {
    return {
      loading: true,
      tableWidth: 0,
      coeffcient: 1
    }
  },
  computed: {
    visibleRows() {
      console.log();
      const data = this.data;
      const labels = this.labels;
      const visibleLabels = labels.map(item => {
        const { visible, prop } = item;
        if (typeof visible !== 'undefined') {
          return visible ? prop : null;
        }
        return prop;
      }); // keys array 
      return data.map(item => {
        const visibleData = {}
        visibleLabels.map((key, index) => visibleData[key] = item[key] )
        return visibleData;
      })
    }
  },
  mounted() {
    this.$nextTick(() => this.calcTableWidth())
  },
  watch: {
    tableWidth(val) {
      this.loading = false;
    },
    labels() {
      this.calcTableWidth();
    }
  },
  methods: {
    calcCellWidth(width) {
      return Math.floor(width * this.coeffcient);
    },
    calcTableWidth() {
      const { width } = this.$refs.table.getBoundingClientRect();
      const labelsWidth = this.labels.reduce((sum, current) => sum + current.width, 0);
      const coeff = width / labelsWidth;
      console.log(width, 'client width', this.$refs.table)

      this.coeffcient = coeff > 1 ? coeff : 1;
      this.tableWidth = coeff > 1 ? width : labelsWidth;
    }
  }
}
</script>

<style lang="scss" scoped>
.split {

  table {
    border-spacing: 0 10px;
    
    .body, .header {
      margin: 5px;
    }

    .header {
      border-radius: 5px;
      background-color: #DEF0FF;
      box-shadow: 0 0 5px 1px rgb(199, 199, 199); 

      tr th {
        font-size: 13px;
        font-weight: 500;
        color: #000000;
      }
    }

    .body {

      tr {
        box-shadow: 0 0 5px 1px rgb(199, 199, 199);
        position: relative;
        display: block;
        border-radius: 5px;
        margin: 10px 0;
        
        &:hover {
          background-color: rgb(245, 245, 245);
        }

        th {
          font-size: 15px;
          padding: 15px 0;
          color: #333333;
          font-weight: normal;
        }
      }
    }
  }
}

.monolite {

  table {
    border-spacing: 0;
    
    .header {
      border-radius: 5px;
      background-color: #DEF0FF;

      tr th {
        font-size: 13px;
        font-weight: 500;
        color: #000000;
      }
    }

    .body {
      overflow: auto;

      tr {
        position: relative;
        margin: 10px 0;

        th {
          font-size: 15px;
          padding: 15px 0;
          color: #333333;
          font-weight: normal;
        }
      }
    }
  }
}

.no-data {
  font-size: 20px;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  color: #cccccc;
  font-style: italic; 
}

.visitor-table {
  width: 100%;
  overflow: auto;
  box-sizing: border-box;

  .header {
    padding: 10px 0;
  }
}

.scrollbarFix {

  /* width */
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
  // Firefox and IE
  & {
    scrollbar-color: #888 #f1f1f1;
    scrollbar-width: thin;
  }
}
</style>