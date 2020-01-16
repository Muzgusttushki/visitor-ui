<template>
  <el-container class="dashboard index" direction="vertical">
    <!-- КОМПОНЕНТЫ -->
    <el-container v-loading="!request">
      <div v-if="request" class="_dashboard_stats">
        <el-col :span="4" class="component-wrapper" v-for="(item, id) in topComponents" :key="id">
          <div class="top-component">
            <el-row class="top">
              <el-col class="top-title">
                {{item.title}}
              </el-col>
            </el-row>
            <el-row class="center">
              <el-tooltip :content="`${item.tooltipNumber}`" placement="top" class="left">
                <div>{{ request[item.current].toFixed() }}</div>
              </el-tooltip>
            </el-row>
            <el-row class="bottom">
              <el-tooltip :content="`${item.tooltipNumberLast}`" placement="top-start">
                <div class="left">
                  <span class="left-short">{{ request[item.last] | numberFix }}</span>
                  <span class="left-full">{{ request[item.last].toFixed() }}</span>
                </div>
              </el-tooltip>
              <el-tooltip :content="`Динамика роста ${item.tooltipPercent}`" placement="top-end">
                <div :class="request[item.percent] < 0 ? 'low' : 'up'" class="right">
                  <i :class="request[item.percent] < 0 ? 'el-icon-bottom percent-down' : 'el-icon-top percent-up'" />
                  <div class="right-short">{{ request[item.percent] | numberFix }}%</div>
                  <div class="right-full">{{ request[item.percent].toFixed() }}%</div>
                </div>
              </el-tooltip>
            </el-row>
          </div>
        </el-col>
      </div>
    </el-container>
    <el-container class="chart-visual" direction="vertical">
      <!-- ГРАФИК ПРОДАЖ -->
      <el-col :span="11" class="graphic-container sales">
        <div class="graphic-outer">
          <div class="graphic-inner">
            <div class="title">
              График продаж
            </div>
            <GraphicsSalesUI />
          </div>
        </div>
      </el-col>
      <el-col :span="13" class="graphic-container events">
        <!-- ТОП 10 СОБЫТИЙ -->
        <div class="graphic-outer">
          <div class="container-events-top">
            <div class="title">
              Топ 10 событий
            </div>
            <GraphicsEventsTopUI />
          </div>
        </div>
      </el-col>
      <el-col :span="11" class="graphic-container map">
        <!-- КАРТА ПОКУПАТЕЛЕЙ -->
        <div class="graphic-outer">
          <div class="graphic-inner">
            <div class="title">
              Карта покупателей
            </div>
            <GraphicsLocationsUI />
          </div>
        </div>
      </el-col>
      <el-col :span="7" class="graphic-container devices">
        <!-- ТИП УСТРОЙСТВА -->
        <div class="graphic-outer">
          <div class="graphic-inner">
            <div class="title">
              Тип устройства
            </div>
            <GraphicsDevicesUI />
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="graphic-container buyers">
        <!-- -ПОКУПАТЕЛИ -->
        <div class="graphic-outer">
          <div class="graphic-inner">
            <div class="title">
              Покупатели
            </div>
            <GraphicsBuyers />
          </div>
        </div>
      </el-col>
      <el-col :span="7" class="graphic-container tickets">
        <!-- КОЛИЧЕСТВО БИЛЕТОВ В ЗАКАЗЕ -->
        <div class="graphic-outer">
          <div class="graphic-inner">
            <div class="title">
              Количество билетов в заказе
            </div>
            <GraphicsTicketsInTransaction />
          </div>
        </div>
      </el-col>
    </el-container>
  </el-container>
</template>
<script>

import GraphicsSalesUI from '@/components/graphics/dashboard/sales.vue'
import GraphicsDevicesUI from '@/components/graphics/dashboard/device_type.vue'
import GraphicsLocationsUI from '@/components/graphics/dashboard/buyers_map.vue'
import GraphicsEventsTopUI from '@/components/graphics/dashboard/top_events.vue'
import GraphicsTicketsInTransaction from '@/components/graphics/dashboard/tickets_number.vue'
import GraphicsBuyers from '@/components/graphics/dashboard/old_new_buyers.vue'
 
export default {
  components: {
    GraphicsDevicesUI,
    GraphicsSalesUI,
    GraphicsLocationsUI,
    GraphicsEventsTopUI,
    GraphicsTicketsInTransaction,
    GraphicsBuyers
  },

  data() {
    return {
      topComponents: [{
        title: 'Операции',
        tooltipNumberLast: 'Количество операций за прошлый период',
        tooltipNumber: 'Количество операций за выбранный период',
        tooltipPercent: 'операций',
        current: 'operations',
        last: 'previousOperations',
        percent: 'percentOperations'
      },{
        title: 'Продажи',
        tooltipNumberLast: 'Количество продаж за прошлый период',
        tooltipNumber: 'Количество продаж за выбранный период',
        tooltipPercent: 'продаж',
        current: 'earnings',
        last: 'previousEarnings',
        percent: 'percentEarnings'
      },{
        title: 'Товаров',
        tooltipNumberLast: 'Продано товаров за прошлый период',
        tooltipNumber: 'Продано товаров за выбранный период',
        tooltipPercent: 'проданных товаров',
        current: 'events',
        last: 'previousEvents',
        percent: 'percentEvents'
      },{
        title: 'Объем продаж',
        tooltipNumberLast: 'Объем продаж за прошлый период',
        tooltipNumber: 'Объем продаж за выбранный период',
        tooltipPercent: 'объема продаж',
        current: 'sales',
        last: 'previousSales',
        percent: 'percentSales'
      },{
        title: 'Всего клиентов',
        tooltipNumberLast: 'Новые клиенты за выбранный период',
        tooltipNumber: 'Всего клиентов',
        tooltipPercent: 'новых клиентов',
        current: 'buyers',
        last: 'previousBuyers',
        percent: 'percentBuyers'
      },{
        title: 'Средний чек',
        tooltipNumberLast: 'Средний чек за прошлый период',
        tooltipNumber: 'Средний чек за выбранный период',
        tooltipPercent: 'среднего чека',
        current: 'averageEarnings',
        last: 'previousAverageEarnings',
        percent: 'percentAverageEarnings'
      }],

      request: null
    }
  },
  
  middleware: 'roles/user',

  filters: {
    numberFix(number) {
      const value = parseInt(number).toFixed(0);
      console.log(value, 'value')
      return (
        Math.abs(value) > 99999 ?
          (value / 1000).toFixed(0) + 'к' :
        Math.abs(value) > 999 ?
          (value / 1000).toFixed(1) + 'к' : 
        value
      )
    }
  },

  computed: {
    globalFiltersTimeInterval () {
      return this.$store.getters['dashboard/globalFilters'].timeInterval
    }
  },

  watch: {
    async globalFiltersTimeInterval () {
      await this.applyGlobalFilters()
    }
  },

  async asyncData({ store, $axios, params }) {
    const storeDate = await store.getters['dashboard/globalFilters'].timeInterval;
    if (!storeDate.start || !storeDate.end) {
      const previewInstanceDate = new Date()
      previewInstanceDate.setDate(previewInstanceDate.getDate() - 14)

      store.commit('dashboard/setGlobalFilters', {
        key: 'timeInterval',
        value: {
          start: previewInstanceDate,
          end: new Date()
        }
      })
    }

    const request = await store.dispatch('dashboard/getDashboardStats');
    return {
      loading: false,
      request
    }
  },

  methods: {
    formatPercents(prev, curr) {
      return (
        prev === 0 && curr !== 0 ?
          curr :
        curr === 0 && prev !== 0 ?
          prev : 
        curr === 0 && prev === 0 ?
          0 :
        curr > prev ?
          curr / prev * 100 - 100 :
          0 - (prev / curr * 100 - 100)
      )
    },
    async applyGlobalFilters () {
      const request = await this.$store.dispatch('dashboard/getDashboardStats')
      const {
        previousAverageEarnings: prev,
        averageEarnings: curr
      } = request;
      request.percentAverageEarnings = this.formatPercents(prev, curr)

      this.request = request;
    }
  }
}
</script>
