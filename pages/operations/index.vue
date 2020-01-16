<template>
  <el-container class="operations index">
    <el-main>
      <div class="wallpaper-table">
        <div class="tools">
          <div>
            <h3>Операции</h3>
          </div>
          <div class="button-group">
            <visitor-dropdown trigger="click" :enable.sync="dropdownVisible1  ">
              <template slot="action">
                <el-button type="warning" class="el-button-custom-cog">
                  <font-awesome-icon :icon="['fas', 'cog']" class="fa-lg" />
                </el-button>
              </template>
              <template class="container">
                <div class="operations index tools-container">
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
              <template>
                <!-- ФИЛЬТРЫ -->
                <div class="operations index filter-container">
                  <h3 class="filter-title">Фильтры</h3>
                  <div class="wrapper">
                    <div class="filter">
                      <el-checkbox
                        label="Отображать посещения"
                        v-model="localFilters.sheets"
                        class="checkbox-operation"
                      ></el-checkbox>
                      <div class="title">Событие ({{filters.events.length}})</div>
                      <div class="container">
                        <el-select
                          v-model="localFilters.events"
                          multiple
                          collapse-tags
                          placeholder="Все события"
                          class="el-select__event"
                        >
                          <el-option
                            v-for="(label, labelID) in filters.events"
                            :key="labelID"
                            :value="label.name"
                          >{{label.name}} ({{label.quantity}})</el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="filter">
                      <div class="title">Город ({{filters.cities.length}})</div>
                      <div class="container">
                        <el-select
                          v-model="localFilters.cities"
                          multiple
                          collapse-tags
                          placeholder="Все события"
                        >
                          <el-option
                            v-for="(label, labelID) in filters.cities"
                            :key="labelID"
                            :value="label.name"
                          >{{label.name}} ({{label.quantity}})</el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="filter">
                      <div class="title">Браузер ({{filters.browsers.length}})</div>
                      <div class="container">
                        <el-select
                          v-model="localFilters.browsers"
                          multiple
                          collapse-tags
                          placeholder="Все события"
                        >
                          <el-option
                            v-for="(label, labelID) in filters.browsers"
                            :key="labelID"
                            :value="label.name"
                          >{{label.name}} ({{label.quantity}})</el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="filter">
                      <div class="title">Источник ({{filters.sources.length}})</div>
                      <div class="container">
                        <el-select
                          v-model="localFilters.sources"
                          multiple
                          collapse-tags
                          placeholder="Все события"
                        >
                          <el-option
                            v-for="(label, labelID) in filters.sources"
                            :key="labelID"
                            :value="label.name"
                          >{{label.name}} ({{label.quantity}})</el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="filter">
                      <div class="title">Статус ({{filters.statuses.length}})</div>
                      <div class="container">
                        <el-select
                          v-model="localFilters.statuses"
                          multiple
                          collapse-tags
                          placeholder="Все события"
                        >
                          <el-option
                            v-for="(label, labelID) in filters.statuses"
                            :key="labelID"
                            :value="label.name"
                          >{{translate[label.name]}} ({{label.quantity}})</el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="filter">
                      <div class="title">Операционная система ({{filters.oses.length}})</div>
                      <div class="container">
                        <el-select
                          v-model="localFilters.oses"
                          multiple
                          collapse-tags
                          placeholder="Все события"
                        >
                          <el-option
                            v-for="(label, labelID) in filters.oses"
                            :key="labelID"
                            :value="label.name"
                          >{{label.name}} ({{label.quantity}})</el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                  <div class="filter apply-button">
                    <div class="title"></div>

                    <div class="container">
                      <el-button @click="applyPayments(true)">Применить</el-button>
                    </div>
                  </div>
                </div>
              </template>
            </visitor-dropdown>
          </div>
        </div>
        <!-- ТАБЛИЦА -->
        <div v-if="!loading.pages" class="table-container">
          <div
            v-if="this.operations"
            v-loading="loading.content||!this.operations"
            class="template-table"
          > 
            <visitor-table
              :data="filteredOperations"
              :labels="columns.filter(r => r.visible)"
              @row-click="dialogHandler"
            ></visitor-table>

            <!--
            <el-table
              :data="this.operations.documents"
              class="payments-list"
              @row-click="dialogHandler"
            >
              <el-table-column
                v-for="(column, columnID) in columns.filter(
                  resolve => resolve.visible
                )"
                :key="columnID"
                :prop="column.source"
                :label="column.label"
                :min-width="column.width"
              >
                <template slot-scope="scope">
                  <span
                    v-if="column.source == 'date' && scope.row['date']"
                  >{{ `${scope.row[column.source].substr(8, 2)}.${scope.row[column.source].substr(5, 2)}.${scope.row[column.source].substr(0, 4)}` }}</span>
                  <span
                    v-else-if="column.source == 'event' && !scope.row['event']"
                  >{{scope.row['url']}}</span>
                  <span v-else-if="column.source == 'status'">{{translate[scope.row['status']]}}</span>
                  <span v-else-if="column.source == 'os' && !scope.row['os']">N/A</span>
                  <span v-else-if="column.source == 'browser' && !scope.row['browser']">N/A</span>
                  <span v-else-if="column.source == 'zip' && !scope.row['zip']">N/A</span>
                  <span v-else-if="column.source == 'city' && !scope.row['city']">N/A</span>
                  <span v-else>{{scope.row[column.source]}}</span>
                </template>
              </el-table-column>
            </el-table>
            -->
            <el-pagination
              style="margin-top: 30px;"
              background
              layout="prev, pager, next"
              :total="this.operations.length"
              :page-size="20"
              hide-on-single-page
              :current-page.sync="current"
            />
          </div>
          <div v-else-if="!loading.content||this.operations" style="text-align: center; font-size: 35px; padding-bottom: 25px;">
            <p>Нет данных</p>
          </div>
        </div>
      </div>
      <!-- ДИАЛОГОВОЕ ОКНО -->
      <div>
        <dialog-popper
          v-if="dialogData.loading"
          @closeDialog="handleClose"
          :visible.sync="dialogVisible"
          :data="dialogData"
        />
      </div>
    </el-main>
  </el-container>
</template>
<script>
import draggable from "vuedraggable";
import DialogPopper from "@/components/pages-components/operations/dialog.vue";
import VisitorTable from '@/components/visitor-components/visitor-table.vue';
import VisitorDropdown from '@/components/visitor-components/visitor-dropdown.vue';

export default {
  components: { DialogPopper, draggable, VisitorTable, VisitorDropdown },
  middleware: "roles/user",

  data() {
    return {
      loading: {
        pages: false,
        content: false
      },
      dropdownVisible1: false,
      dropdownVisible2: false,
      current: 1,

      translate: {
        WIDGET_OPEN: "Открыт виджет",
        WIDGET_LAZY: "Виджет загружен",
        WIDGET_SEAT: "Выбор места",
        WIDGET_UNSEAT: "Удаление места",
        WIDGET_ORDER: "Оформление",
        WIDGET_SUCCESS: "Ожидает оплаты",
        WIDGET_PAYMENT: "Оплачен",
        VISITED: "Просмотр страницы"
      },

      dialogVisible: false,
      dialogData: {
        browser: {},
        os: {},
        cookies: {},
        utm: { tags: {} },
        analytics: {}
      },

      inputSearchTowns: "",
      inputSearchEvents: "",

      columns: [
        { label: "Источник", prop: "source", visible: true, width: 150 },
        { label: "Cобытие", prop: "event", visible: true, width: 450 },
        { label: "Браузер", prop: "browser", visible: true, width: 200 },
        { label: "Статус", prop: "status", visible: true, width: 200 },
        { label: "Город", prop: "city", visible: true, width: 80 },
        { label: "Дата", prop: "date", visible: true, width: 150 },
        { label: "Zip", prop: "zip", visible: true, width: 100 },
        { label: "ОС", prop: "os", visible: true, width: 200 },
        { label: "ip", prop: "address", visible: true, width: 120 }
      ],

      operations: null,
      filters: null,
      localFilters: {
        sheets: true,
        sources: null,
        cities: null,
        events: null,
        oses: null,
        browsers: null,
        statuses: null,
        page: 0
      }
    };
  },

  computed: {
    globalFiltersTimeInterval() {
      return this.$store.getters["dashboard/globalFilters"].timeInterval;
    },
    filteredOperations() {
      const data = this.operations.documents;
      return data.map(item => {
        const { date, event, status, os, browser, zip, city, source, address, url, isSheet, _id } = item;
        return {
          date: date ? this.$times({ time: String(date), format: '{D}.{MM}.{Y}' }) : 'N/A',
          event: event ? event : url,
          status: status ? this.translate[status] : 'N/A',
          os: os ? os : 'N/A',
          browser: browser ? browser : 'N/A',
          zip: zip ? zip : 'N/A',
          city: city ? city : 'N/A',
          source: source ? source : 'N/A', 
          address: address ? address : 'N/A',
          url: url ? url : 'N/A',
          isSheet: isSheet ? isSheet : false,
          _id: _id ? _id : 'N/A'
        }
      })
    }
  },

  watch: {
    globalFiltersTimeInterval() {
      this.applyPaymentsFilters();
    },
    current(offset) {
      this.localFilters.page = offset - 1;
      this.applyPayments();
    }
  },

  mounted() {
    this.applyPaymentsFilters();
  },

  methods: {
    handleClose() {
      this.dialogData = {
        browser: {},
        os: {},
        cookies: {},
        utm: { tags: {} },
        analytics: {}
      };
    },
    dialogHandler(val) {
      this.$nextTick(async () => {
        const request = await this.$requestHandler(
          this.$axios.post(
            `${process.env.address}/v1/operations/${
              val.isSheet ? "details.sheet" : "details"
            }`,
            {
              ...this.$store.getters["dashboard/globalFilters"],
              offset: val._id
            }
          )
        );
        if (request) {
          console.log(request, 'request')
          if (val.isSheet) {
            this.dialogData = {
              ...request.data.then,
              loading: true
            };
          } else {
            this.dialogData = {
              ...request.data,
              loading: true
            };
          }
        }
      });
    },

    applyPaymentsFilters() {
      this.$nextTick(async () => {
        this.loading.pages = true;
        this.dialogVisible = true;
        const filters = await this.$requestHandler(
          this.$store.dispatch("dashboard/getOperationsFilters")
        );
        console.log(filters, 'filters')
        if (!filters) {
          this.payments = null;
          this.filters = null;

          this.loading.pages = false;
          return null;
        }

        this.filters = filters;

        this.$nextTick(() => {
          this.loading.pages = false;
          this.applyPayments();
        });
      });
    },

    applyPayments(reset) {
      this.$nextTick(async () => {
        this.loading.content = true;
        this.dropdownVisible1 = false;
        this.dropdownVisible2 = false;

        if (reset) {
          this.current = 1;
        }

        const filters = { ...this.localFilters };

        Object.keys(filters).forEach(key => {
          if (!filters[key] || filters[key].length == 0) delete filters[key];
        });

        const operations = await this.$store.dispatch(
          "dashboard/getOperations",
          filters
        );

        console.log(operations, 'operations')

        if (!operations) {
          this.$notify.error("Ошибка сервера.");
          this.operations = null;
          this.loading.content = false;
          return null;
        }

        this.operations = operations;
        this.loading.content = false;
      });
    },

    changePageOffset(offset) {
      this.localFilters.page = offset - 1;
      this.applyPayments();
    }
  }
};
</script>

<style lang="scss">
.el-dropdown-menu {
  top: 0;
}
.el-table .visit-class {
  background-color: #f3f3f3;
}
</style>
