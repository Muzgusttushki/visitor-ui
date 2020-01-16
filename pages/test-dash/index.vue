<template>
  <el-container v-loading="loading" class="dashboard index" direction="vertical">
    <!-- -----------------------------------КОМПОНЕНТЫ----------------------------------------------- -->
    <el-container class="_dashboard_stats">
      <el-col :span="4" class="component-wrapper" v-for="(item, id) in topComponents" :key="id">
          <div class="top-component">
            <el-row class="top">
              <el-col class="top-title">
                {{item.title}}
              </el-col>
            </el-row>
            <el-row class="center">
              <el-tooltip :content="`${item.tooltipNumber}`" placement="top-start" class="left">
                <div>{{ request[item.current].toFixed() }}</div>
              </el-tooltip>
            </el-row>
            <el-row class="bottom">
              <div class="bottom__container">
                <el-tooltip :content="`${item.tooltipNumberLast}`" placement="top-start">
                  <div class="left">
                    {{ request[item.last].toFixed() | moreThanOneThousand }}
                    <div class="left-hidden">
                      {{ request[item.last].toFixed() }}
                    </div>
                  </div>
                </el-tooltip>
                <el-tooltip :content="`Динамика роста ${item.tooltipPercent}`" placement="top-end">
                  <div class="right">
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
      }]
    }
  },

  middleware: 'roles/user',

  filters: {
    moreThanOneThousand (value) {
      if (value > 99999) {
        return (value / 1000).toFixed(0) + 'k'
      } else if (value > 999) {
        return (value / 1000).toFixed(1) + 'k'
      }
      return parseInt(value).toFixed(0)
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

  async asyncData ({ store, $axios, params }) {
    
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
    const pAvEars = request.previousAverageEarnings
    const AvEars = request.averageEarnings
    request.percentAverageEarnings = AvEars > pAvEars ? 
      AvEars / pAvEars * 100 - 100 :
      0 - (pAvEars / AvEars * 100 - 100)

    return {
      loading: false,
      request
    }
  },

  methods: {
    async applyGlobalFilters () {
      this.loading = true

      const request = await this.$store.dispatch('dashboard/getDashboardStats')
      const pAvEars = request.previousAverageEarnings
      const AvEars = request.averageEarnings
      request.percentAverageEarnings = AvEars > pAvEars ? 
        AvEars / pAvEars * 100 - 100 :
        0 - (pAvEars / AvEars * 100 - 100)

      this.request = request
      this.$nextTick(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.percent-down {
  color:red;
}

.percent-up {
  color: green;
}

.percent-up,
.percent-down {
  font-weight: bold;
}

.index {
  $title-color: #1B2C3D;

  .el-row {
    width: 100%;
  }

  .chart-visual {
    margin: 0 6px;
    display: flex;
    flex-flow: row wrap;

    .devices .el-main {
      overflow: hidden;
    }


    .el-row {

      .el-col {
        padding: 20px;
      }
    }
    .graphic-container {
      padding: 14px;
      min-height: 300px;

      .graphic-outer {
        height: 100%;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(47, 79, 111, 0.2);

        .graphic-inner {
          padding: 30px;

          .el-main {
            overflow: visible;
          }
        }

        .el-tabs__header {
          margin: 0;
        }

        .el-tabs__content {
          height: 100%;
          overflow: visible;
        }

        .container-events-top {
          width: 100%;
          padding: 30px 0;

          .title, .cell {
            padding-left: 30px;
          }

          thead {
            .is-leaf {
              display: none;
            }
          }
          tbody {
            border-bottom: 0;

            .el-table__row {
              * {
                border: 0;
              }
              color: #000000;

              .cell {
                font-size: 14px;
              }
            }

            .row-bg {
              background-color: #F9FAFC;
            }
          }
        }

        .title {
          padding-bottom: 15px;
          color: $title-color;
          font-style: normal;
          font-weight: bold;
          font-size: 22px;
          line-height: 21px;
        }

        .el-main {
          padding: 0;
          height: 250px;

          @media (min-width: 1400px) {
            height: 330px;
          }
        }
      }
    }

    .tickets {
      width: 330px;
      .el-main {
        height: 260px;
      }

      .apexcharts-xaxis-label {
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        color: #1B2C3D;
      }
    }

    .sales {
      width: 100%;
      .apexcharts-legend.center.position-bottom {
        // margin-top: 10px;
        bottom: 0 !important;
      }
    }
    
    // .chart-visual
    @media (max-width: 1200px) {
      & {
        justify-content: space-between;
      }
      .graphic-container {
        margin: 0;
        padding: 0;
      }

      .buyers, .map {
        margin-bottom: 10px;
      }
      
      .events, .devices, .buyers, .tickets {
        order: 1
      }
      .events {
        width: 100%;
        margin-bottom: 10px;
      }

      .tickets .graphic-outer .graphic-inner {
        padding-bottom: 10px;
      }

      .sales, .map {
        width: 49.55%;
      }

      .devices, .buyers, .tickets {
        width: 32.7%;
      }
    }

    @media (max-width: 1390px) {
      .map, .buyers, .devices, .sales, .events {
        .graphic-outer {
          height: 350px;
        }
      }
    }
  }
  ._dashboard_stats {

    margin: 20px 6px 5px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;

    .component-wrapper {
      padding: 0 14px;
      min-height: 100px;
    }

    @media (max-width: 1209px) {
      margin: 6px;

      .component-wrapper {
        padding: 0;
      }

      .component-wrapper:not(:first-child) {
        padding-left: 4px;
      }

      .component-wrapper:not(:last-child) {
        padding-right: 4px;
      }

      .component-wrapper {

        .center .el-col {
          font-size: 20px;
        }

        .left, .right {
          font-weight: 500;
          font-size: 13px;
          display: flex;
          align-items: center;
        }
      }
    }

    @media (max-width: 770px) {
      .component-wrapper {
        min-width: 150px;
        margin-bottom: 10px;
      }
    }

    .el-row {
      width: 170px;
      padding-bottom: 20px;

      .el-col {
        width: 100%;
      }
      .top-component {
        width: 100%;
        height: 100%;
      }
    }

    .top-component {
      height: 100%;
      background-color: #FFFFFF;
      border-radius: 10px;
      box-shadow: 0px 0px 10px rgba(47, 79, 111, 0.2);

      .top {
        padding: 15px 15px 0 15px;

        .top-title {
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 15px;
          padding-bottom: 15px;
          border-bottom: 0.5px solid #F0F2F6;
          color: $title-color;
        }
      }

      .center {
        font-size: 24px;
        font-weight: 500;
        color: $title-color;
        line-height: 28px;
        padding: 33px 0px 24px 15px;
        width: fit-content;

        .el-tooltip {
          cursor: pointer;
        }
      }

      .bottom {
        padding: 15px;
        font-size: 1.3rem;
        width: 100%;

        &__container {
          width: 100%;
          display: flex;
          justify-content: space-between;
          position: relative;
        }

        .hidden {
          display: none;
        }

        .left-hidden, .right-hidden {
          display: none;
          
          position: absolute;
          width: 50%;
        }
 
        .left, .right {
          display: flex;
          align-items: center;
          color: #5AB6FE;
          width: 50%;

          &:hover {
            .left-hidden, .right-hidden {
              position: absolute;
              background: white;
              display: inline-flex;
              cursor: pointer;
            }
            .left-hidden {
              left: 0;
            } 
            .right-hidden {
              right: 0;
            }
            .right-hidden {
              justify-content: flex-end;
            }
          }
        }

        .left {
          justify-content: flex-start;
        }

        .right {
          justify-content: flex-end;
        }
      }
    }
  }
}

</style>