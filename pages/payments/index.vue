<template>
  <el-container class="payments index">
    <el-main v-loading="loading.pages">
      <div class="wallpaper-table">
        <div class="tools">
          <div>
            <h3>
              Транзакции
              <span v-if="this.payments">({{this.payments.length}})</span>
            </h3>
          </div>
          <div class="button-group">
            <visitor-dropdown :enable.sync="dropdownVisible1" trigger="click">
              <template slot="action">
                <el-button type="warning" class="el-button-custom-cog">
                  <font-awesome-icon :icon="['fas', 'cog']" class="fa-lg" />
                </el-button>
              </template>
              <!--  ВЫБОР КРИТЕРИЕВ -->
              <template class="container">
                <div class="payments index tools-container">
                  <h3>Отображение</h3>
                  <div class="test">
                    <draggable v-model="columns">
                      <el-tag
                        v-for="(column, columnID) in columns"
                        :key="columnID"
                        :type="column.visible ? 'warning' : 'info'"
                        effect="dark"
                        @click="column.visible = !column.visible"
                      >{{ column.label }}</el-tag>
                    </draggable>
                  </div>
                </div>
              </template>
            </visitor-dropdown>
            <!-- ФИЛЬТР -->
            <visitor-dropdown
              :enable.sync="dropdownVisible2"
              v-if="filters"
              trigger="click"
              class="tools__filters"
            >
              <template slot="action">
                <span class="el-dropdown-link">
                  <el-button type="warning" class="el-button-custom-slider">
                    <font-awesome-icon :icon="['fas', 'sliders-h']" class="fa-lg" />
                  </el-button>
                </span>
              </template>

              <!-- __________________________________FILTER PARAMETERS__________________________________________ -->
              <template>
                <div class="payments index filter-container">
                  <h3 class="filter-title">Фильтры</h3>
                  <div class="wrapper">

                    <!-- SMART SEARCH -->
                    <div class="filter">
                      <!-- <div class="title">Умный поиск</div>
                      <div class="clever-search">
                        <el-input v-model="inputSearchTowns" placeholder="Значение"></el-input>
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="Поиск по любому атрибуту"
                          placement="top-end"
                        >
                        </el-tooltip>
                        <font-awesome-icon :icon="['fas', 'search']" class="fa-lg" />
                      </div>-->
                    </div>

                    <!-- TOWN PICK -->
                    <div class="filter">
                      <div class="title">Город ({{filters.cities.length}})</div>
                      <div class="container">
                        <el-select
                          v-model="localFilters.city"
                          multiple
                          automatic-dropdown
                          collapse-tags
                          placeholder="Все города"
                          class="super_puper_my_class"
                        >
                          <el-option
                            v-for="(item, labelID) in filters.cities"
                            :key="labelID"
                            :value="item.label"
                          >{{item.label}} ({{item.quantity}})</el-option>
                        </el-select>
                      </div>
                    </div>

                    <!-- EVENT PICK -->
                    <div class="filter">
                      <div class="title">Событие ({{filters.events.length}})</div>

                      <div class="container">
                        <el-select
                          v-model="localFilters.event"
                          multiple
                          collapse-tags
                          placeholder="Все события"
                        >
                          <el-option
                            v-for="(item, labelID) in filters.events"
                            :key="labelID"
                            :value="item.label" 
                          >{{item.label}} ({{item.quantity}})</el-option>
                        </el-select>
                      </div>
                    </div>

                    <!-- AVERAGE CHECK -->
                    <div class="filter">
                      <div class="title">Средний чек</div>

                      <div class="container">
                        <el-slider
                          v-model="localFilters.averageMoney"
                          range
                          :min="filters.minAverageEarnings"
                          :max="filters.maxAverageEarnings"
                        />
                      </div>
                    </div>

                    <!-- AMOUNT MONEY -->
                    <div class="filter">
                      <div class="title">Принес денег</div>

                      <div class="container">
                        <el-slider
                          v-model="localFilters.money"
                          range
                          :min="filters.minEarnings"
                          :max="filters.maxEarnings"
                          :step="Number(((filters.maxEarnings - filters.minEarnings) / 24).toFixed())"
                        />
                      </div>
                    </div>

                    <!-- BOUGHT TICKETS -->
                    <div class="filter">
                      <div class="title">Купил билетов</div>

                      <div class="container">
                        <el-slider
                          v-model="localFilters.ticketInTransaction"
                          range
                          :step="1"
                          :min="filters.minTicketQuantity"
                          :max="filters.maxTicketQuantity"
                        />
                      </div>
                    </div>

                    <!-- AMOUNT TRANSACTIONS -->
                    <div class="filter">
                      <div class="title">Кол-во транзакций</div>

                      <div class="container">
                        <el-slider
                          v-model="localFilters.transactions"
                          range
                          :step="1"
                          :min="filters.minTransactionsQuantity"
                          :max="filters.maxTransactionsQuantity"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- APPLY BUTTON -->
                  <div class="container apply-button">
                    <el-button type="primary" @click="applyPayments(true, true)">Применить</el-button>
                  </div>
                </div>
              </template>
            </visitor-dropdown>
          </div>
        </div>

        <!-- TABLE -->
        <div class="table-container" v-if="this.payments" >
          <div v-loading="loading.content" class="template-table">
            <visitor-table 
              :data="filteredPaymentsData" 
              :labels="columns.filter(r => r.visible)"
              @row-click="paymentDetails"
            ></visitor-table>
          </div>

          <!-- PAGINATION -->
          <el-pagination
            style="margin-top: 30px;"
            background
            layout="prev, pager, next"
            :total="this.payments.length"
            :page-size="10"
            :current-page.sync="current"
            hide-on-single-page
          />
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import draggable from "vuedraggable";
import VisitorTable from '@/components/visitor-components/visitor-table.vue';
import VisitorDropdown from '@/components/visitor-components/visitor-dropdown.vue';

export default {
  middleware: "roles/user",
  components: {
    draggable,
    VisitorTable,
    VisitorDropdown
  },

  data() {
    return {
      current: 1,
      loading: {
        pages: false,
        content: false
      },

      inputSearchTowns: "",
      dropdownVisible1: false,
      dropdownVisible2: false,

      columns: [
        { label: "Телефон", prop: "_id", visible: true, width: 200 },
        { label: "Имя", prop: "name", visible: true, width: 150 },
        { label: "Событие", prop: "events", visible: true, width: 450 },
        { label: "Прибыль", prop: "earnings", visible: true, width: 100 },
        { label: "Билетов", prop: "ticketsCount", visible: true, width: 100 },
        { label: "Источник", prop: "source", visible: true, width: 200 },
        {
          label: "Транзакций",
          prop: "transactions",
          visible: true,
          width: 120
        },
        {
          label: "Последняя активность",
          prop: "lastActive",
          visible: true,
          formatDate: true,
          width: 200
        },
        {
          label: "Первая активность",
          prop: "firstActive",
          visible: false,
          formatDate: true,
          width: 190
        }
      ],
      filters: null,
      error: false,
      payments: null,
      localFilters: {
        money: null,
        averageMoney: null,
        ticketInTransaction: null,
        transactions: null,
        city: null,
        event: null,
        offset: 0
      },
      updateCheckTimer: null,

      force: false
    };
  },

  computed: {
    globalFiltersTimeInterval() {
      return this.$store.getters["dashboard/globalFilters"].timeInterval;
    },
    filteredPaymentsData() {
      return this.payments.data.map(item => {
        item.lastActive = this.$times({ time: String(item.lastActive), format: '{D}.{MM}.{Y}' });
        item.firstActive = this.$times({ time: String(item.firstActive), format: '{D}.{MM}.{Y}' });
        return item;
      })
    }
  },

  watch: {
    globalFiltersTimeInterval() {
      this.applyPaymentsFilters(true);
    },

    current(offset) {
      if(!this.force) return;
      this.localFilters.offset = offset - 1;
      this.$store.commit("dashboard/cachePaymentFilterState", {
        state: { ...this.localFilters },
        write: true
      });
      this.applyPayments();
    }
  },

  mounted() {
    this.applyPaymentsFilters(true);
  },

  updated() {
    this.updateCheck();
  },

  methods: {
    updateCheck() {
      const check = this.$store.commit('dashboard/cachePaymentFilterTime');
      if (check) this.applyPayments(false, true);
    },
    paymentDetails(row) {
      this.$router.push(`/payments/${row._id}`);
    },
    handleData(value) {
      return this.$times({
        time: value,
        format: "{D}.{MM}.{Y}"
      });
    },
    applyPaymentsFilters(reset) {
      this.$nextTick(async () => {
        this.loading.pages = true;
        const date = this.globalFiltersTimeInterval;
        const filters = await this.$axios.get(
          `${process.env.address}/v1/api/customers/filters${this.$formatDate(date.start, date.end)}`
        );
        // const filters = await this.$store.dispatch(          // old api
        //   "dashboard/getPaymentsFilters"
        // );
        if (!filters) {
          this.payments = null;
          this.filters = null;

          this.loading.pages = false;
          return null;
        }
        this.filters = filters.data.then;

        // const _cacheFilters = await new Promise(callback => {
        //   this.$store.commit("dashboard/cachePaymentFilterState", {
        //     callback
        //   });
        // });

        // if (_cacheFilters) {
        //   this.localFilters = { ..._cacheFilters.state };
        //   this.current = new Number(_cacheFilters.state.offset) + 1;
        // } else if (reset) {
        if (reset) {
          // reset local filters
          this.localFilters = {
            money: [
              this.filters.minEarnings, 
              this.filters.maxEarnings
            ],
            averageMoney: [
              this.filters.minAverageEarnings,
              this.filters.maxAverageEarnings
            ],
            ticketInTransaction: [
              this.filters.minTicketQuantity,
              this.filters.maxTicketQuantity
            ],
            transactions: [
              this.filters.minTransactionsQuantity,
              this.filters.maxTransactionsQuantity
            ],
            city: [],
            event: [],
            offset: 0
          };
          // this.current = 1;
        }
       // this.force = true;

        this.$nextTick(() => {
          this.loading.pages = false;
          this.applyPayments();
        });
      });
    },

    applyPayments(reset, onload) {
      this.dropdownVisible2 = false;
      
      if (reset) {
        this.current = 1;
      }

      this.$nextTick(async () => {
        if (onload) {
          this.$store.commit("dashboard/cachePaymentFilterState", {
            state: { ...this.localFilters },
            write: true
          });
        }

        this.loading.content = true;
        this.payments = await this.$store.dispatch(
          "payment/getPayments",
          this.localFilters
        );


        if (!this.payments) this.payments = null;
        console.log(this.payments, 'payments')
        this.loading.content = false;
      });

      this.force = true;
    }
  }
};
</script>
