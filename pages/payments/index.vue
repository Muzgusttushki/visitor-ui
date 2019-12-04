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
            <ux-dropdown :enable.sync="dropdownVisible1" trigger="click">
              <template slot="action">
                <el-button type="warning" class="el-button-custom-cog">
                  <font-awesome-icon :icon="['fas', 'cog']" class="fa-lg" />
                </el-button>
              </template>
              <!-- ------------------------------ ВЫБОР КРИТЕРИЕВ------------------------------------- -->
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
            </ux-dropdown>
            <!-- ------------------------------------------ФИЛЬТР----------------------------------- -->
            <ux-dropdown
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
                  <div class="wrapper">
                    <h3>Фильтры</h3>

                    <!-- ---------------------------------SMART SEARCH------------------------------------ -->
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
                    <!-- --------------------------------------------------------------------------------- -->

                    <!-- ----------------------------------------TOWN PICK-------------------------------- -->
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
                            v-for="(label, labelID) in filters.cities"
                            :key="labelID"
                            :label="label.name"
                            :value="label.name"
                          >{{label.name}} ({{label.quantity}})</el-option>
                        </el-select>
                      </div>
                    </div>
                    <!-- ------------------------------------------------------------------------------- -->

                    <!-- ----------------------------------EVENT PICK----------------------------------- -->
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
                            v-for="(label, labelID) in filters.events"
                            :key="labelID"
                            :label="label.name"
                            :value="label.name"
                          >{{label.name}} ({{label.quantity}})</el-option>
                        </el-select>
                      </div>
                    </div>
                    <!-- ----------------------------------------------------------------- -->

                    <!-- -------------------------------AVERAGE CHECK--------------------- -->
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
                    <!-- ------------------------------------------------------------------ -->

                    <!-- -----------------------------------AMOUNT MONEY------------------- -->
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
                    <!-- ------------------------------------------------------------------ -->

                    <!-- -----------------------------BOUGHT TICKETS----------------------- -->
                    <div class="filter">
                      <div class="title">Купил билетов</div>

                      <div class="container">
                        <el-slider
                          v-model="localFilters.ticketInTransaction"
                          range
                          :step="1"
                          :min="filters.minTickets"
                          :max="filters.maxTickets"
                        />
                      </div>
                    </div>
                    <!-- ------------------------------------------------------------------ -->

                    <!-- --------------------------AMOUNT TRANSACTIONS--------------------- -->
                    <div class="filter">
                      <div class="title">Кол-во транзакций</div>

                      <div class="container">
                        <el-slider
                          v-model="localFilters.transactions"
                          range
                          :step="1"
                          :min="filters.minTransactions"
                          :max="filters.maxTransactions"
                        />
                      </div>
                    </div>
                    <!-- ------------------------------------------------------------------ -->

                    <!-- --------------------------------APPLY BUTTON---------------------- -->
                    <div class="container">
                      <el-button type="primary" @click="applyPayments(true)">Применить</el-button>
                    </div>
                    <!-- ------------------------------------------------------------------ -->

                  </div>
                </div>
              </template>
              <!-- ______________________________________________________________________________ -->
            </ux-dropdown>
          </div>
        </div>

        <!-- ______________________________________TABLE_________________________________________ -->
        <div v-if="this.payments" v-loading="loading.content" class="template-table">
          <el-table :data="this.payments.data" class="payments-list" @row-click="paymentDetails">
            <el-table-column
              v-for="(column, columnID) in columns.filter(
                resolve => resolve.visible
              )"
              :key="columnID"
              :prop="column.source"
              :label="column.label"
              :width="column.width"
            >
              <template slot-scope="scope">
                <!-- <span v-if="column.source == 'events'">{{ (scope.row[column.source])[0] }}</span> -->
                <span :class="`el-table__row-${column.source}`">
                  <span
                  v-if="column.source == 'firstActive' || column.source == 'lastActive'"
                  >{{handleData(scope.row[column.source])}}</span>
                  <span v-else>{{String(scope.row[column.source])}}</span>
                </span>
              </template>
            </el-table-column>
          </el-table>

          <!-- -----------------------------------------PAGINATION-------------------------------------- -->
          <el-pagination
            style="margin-top: 30px;"
            background
            layout="prev, pager, next"
            :total="this.payments.length"
            :page-size="10"
            :current-page.sync="current"
            hide-on-single-page
          />
          <!-- ------------------------------------------------------------------------------------------ -->

        </div>
        <!-- ____________________________________________________________________________________________ -->

        <!-- _____________________________________LOADING________________________________________________ -->
        <div v-else>
          <div class="on-loading">
            <div class="title">
              <loading-square />
              <loading-square />
              <loading-square />
              <loading-square />
              <loading-square />
              <loading-square />
            </div>
            <div class="main">
              <loading-square />
              <loading-square />
              <loading-square />
              <loading-square />
            </div>
          </div>
        </div>
        <!-- ____________________________________________________________________________________________ -->
      </div>
    </el-main>
  </el-container>
</template>
<script>
import draggable from "vuedraggable";

export default {
  layout: "dashboard",
  middleware: "roles/user",
  components: {
    draggable
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
        { label: "Телефон", source: "_id", visible: true, width: 100 },
        { label: "Имя", source: "name", visible: true, width: 150 },
        { label: "Событие", source: "events", visible: true, width: 450 },
        { label: "Прибыль", source: "earnings", visible: true, width: 100 },
        { label: "Билетов", source: "ticketsCount", visible: true, width: 100 },
        { label: "Источник", source: "source", visible: true, width: 200 },
        {
          label: "Транзакций",
          source: "transactions",
          visible: true,
          width: 120
        },
        {
          label: "Последняя активность",
          source: "lastActive",
          visible: true,
          formatDate: true,
          width: 200
        },
        {
          label: "Первая активность",
          source: "firstActive",
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
      }
    };
  },

  computed: {
    globalFiltersTimeInterval() {
      return this.$store.getters["dashboard/globalFilters"].timeInterval;
    }
  },

  watch: {
    globalFiltersTimeInterval() {
      this.applyPaymentsFilters(true);
    },

    current(offset) {
      this.localFilters.offset = offset - 1;
      this.applyPaymentsFilters();
    }
  },

  mounted() {
    this.applyPaymentsFilters();
  },

  methods: {
    paymentDetails(row) {
      // sessionStorage.LSTableData = JSON.stringify(this.payments.data)
      // console.log(sessionStorage)
      // console.log(JSON.parse(sessionStorage.LSTableData))
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
        const filters = await this.$store.dispatch(
          "dashboard/getPaymentsFilters"
        );
        if (!filters) {
          this.payments = null;
          this.filters = null;

          this.loading.pages = false;
          return null;
        }
        this.filters = filters;

        if (reset) {
          // reset local filters
          this.localFilters = {
            money: [this.filters.minEarnings, this.filters.maxEarnings],
            averageMoney: [
              this.filters.minAverageEarnings,
              this.filters.maxAverageEarnings
            ],
            ticketInTransaction: [
              this.filters.minTickets,
              this.filters.maxTickets
            ],
            transactions: [
              this.filters.minTransactions,
              this.filters.maxTransactions
            ],
            city: [],
            event: [],
            offset: 0
          };
          this.current = 1;
        }

        this.$nextTick(() => {
          this.loading.pages = false;
          this.applyPayments();
        });
      });
    },

    applyPayments(reset) {
      this.dropdownVisible2 = false;

      if (reset) {
        this.current = 1;
      }

      this.$nextTick(async () => {
        this.loading.content = true;
        this.payments = await this.$store.dispatch(
          "payment/getPayments",
          this.localFilters
        );

        if (!this.payments) this.payments = null;
        this.loading.content = false;
      });
    }
  }
};
</script>
