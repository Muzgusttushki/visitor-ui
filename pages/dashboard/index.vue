<template>
  <el-container v-loading="loading" class="dashboard index" direction="vertical">
    <!-- -----------------------------------КОМПОНЕНТЫ----------------------------------------------- -->
    <el-container class="_dashboard_stats" v-if="request">
      <el-col :span="4" class="component-wrapper" v-for="(item, id) in topComponents" :key="id">
          <div class="top-component">
            <el-row class="top">
              <el-col class="top-title">
                {{item.title}}
              </el-col>
            </el-row>
            <el-row class="center" v-if="request">
              <el-tooltip :content="`${item.tooltipNumber}`" placement="top-start" class="left">
                <div>{{ request[item.current].toFixed() }}</div>
              </el-tooltip>
            </el-row>
            <el-row class="bottom">
              <div class="bottom__container">
                <el-tooltip :content="`${item.tooltipNumberLast}`" placement="top-start">
                  <div class="left">
                    <span>{{ request[item.last].toFixed() | moreThanOneThousand }}</span>
                    <div class="left-hidden">
                      {{ request[item.last].toFixed() }}
                    </div>
                  </div>
                </el-tooltip>
                <el-tooltip :content="`Динамика роста ${item.tooltipPercent}`" placement="top-end">
                  <div :class="request[item.percent] < 0 ? 'right low' : 'right up'">
                    <div><i :class="request[item.percent] < 0 ? 'el-icon-bottom percent-down' : 'el-icon-top percent-up'"></i></div>
                    <div>{{ request[item.percent].toFixed() | moreThanOneThousand }}%</div>
                    <div class="right-hidden">
                      <div><i :class="request[item.percent] < 0 ? 'el-icon-bottom percent-down' : 'el-icon-top percent-up'"></i></div>
                      <div>{{ request[item.percent].toFixed() }}%</div>
                    </div>
                  </div>
                </el-tooltip>
              </div>
            </el-row>
          </div>
        </el-col>
    </el-container>
    <el-container class="chart-visual" direction="vertical">
      <!-- ------------------------------------ГРАФИК ПРОДАЖ---------------------------------------- -->
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
        <!-- --------------------------------------ТОП 10 СОБЫТИЙ------------------------------------ -->
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
        <!-- ----------------------------------------КАРТА ПОКУПАТЕЛЕЙ--------------------------------- -->
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
        <!-- ------------------------------------------ТИП УСТРОЙСТВА--------------------------------- -->
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
        <!-- -----------------------------------------ПОКУПАТЕЛИ--------------------------------------- -->
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
        <!-- -------------------------------КОЛИЧЕСТВО БИЛЕТОВ В ЗАКАЗЕ------------------------------- -->
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
import GraphicsSalesUI from '@/components/dashboard/graphics/sales'
import GraphicsDevicesUI from '@/components/dashboard/graphics/devices'
import GraphicsLocationsUI from '@/components/dashboard/graphics/locations'
import GraphicsEventsTopUI from '@/components/dashboard/graphics/eventsTop'
import GraphicsTicketsInTransaction from '@/components/dashboard/graphics/ticketInTransaction'
import GraphicsBuyers from '@/components/dashboard/graphics/buyers'

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
    moreThanOneThousand (value) {
      if (value > 99999) {
        return (value / 1000).toFixed(0) + 'k'
      } else if (value > 999) {
        return (value / 1000).toFixed(1) + 'k'
      } else return parseInt(value).toFixed(0)
    }
  },

  computed: {
    globalFiltersTimeInterval () {
      console.log(['computed global filter time interval_____dashboard index___']);
      return this.$store.getters['dashboard/globalFilters'].timeInterval
    }
  },

  watch: {
    async globalFiltersTimeInterval () {
      await this.applyGlobalFilters()
    }
  },

  async asyncData ({ store, $axios, params }) {
    console.log(!store.getters['dashboard/globalFilters'].timeInterval)
    if (!store.getters['dashboard/globalFilters'].timeInterval) {
      const previewInstanceDate = new Date()
      previewInstanceDate.setDate(previewInstanceDate.getDate() - 14)

      const resolve = [previewInstanceDate, new Date()]

      store.commit('dashboard/setGlobalFilters', {
        key: 'timeInterval',
        value: {
          start: resolve[0],
          end: resolve[1]
        }
      })
    }

    const request = await store.dispatch('dashboard/getDashboardStats')
    return {
      loading: false,
      request
    }
  },

  methods: {
    formatPercents(prev, curr) {
      if (prev === 0 && curr != 0) return curr;
      else if (curr === 0 && prev != 0) return prev;
      else if (curr === 0 && prev === 0) return 0;
      else {
        return curr > prev ? 
        curr / prev * 100 - 100 :
        0 - (prev / curr * 100 - 100)
      }
    },
    async applyGlobalFilters () {
      // this.loading = true

      const request = await this.$store.dispatch('dashboard/getDashboardStats')
      const pAvEars = request.previousAverageEarnings
      const AvEars = request.averageEarnings
      request.percentAverageEarnings = this.formatPercents(
        request.previousAverageEarnings,
        request.averageEarnings
      )

      this.request = request;
      // this.$nextTick(() => {
      //   this.loading = false
      // })
    }
  }
}
</script>
