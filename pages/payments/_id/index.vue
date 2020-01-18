<template>
  <el-main class="payments id">
    <el-tabs @tab-click="openTabEvent" class="main-wrapper" v-model="activeTab">
      <el-tab-pane name="main">
        <template slot="label">
          <div class="header-title left">Общая сводка</div>
        </template>
        <div class="container" v-if="activeTab === 'main'">
          <el-col :span="10" class="col-container user-chart">
            <div class="component-container">
              <div v-if="userDetails" class="component-container-inner">
                <!-- ИНФОРМАЦИЯ О КЛИЕНТЕ -->
                <el-row>
                  <el-col :span="3" class="user-image">
                    <div v-if="false">
                      <img src alt width="50px" height="50px" />
                    </div>
                    <div v-else>
                      <div
                        class="user-image"
                        :style="{background: userGender}">
                        <span>{{getUserAbbreviationCallback(userDetails.aboutUser["username"])}}</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="16" :offset="4">
                    <el-row>
                      <h2 class="component-title">{{ userDetails.aboutUser["username"] }}</h2>
                    </el-row>
                    <el-row>
                      <p>
                        {{(userDetails.aboutUser["gender"] == 1 ? 'Мужской'
                        : userDetails.aboutUser["gender"] == 2 ? 'Женский' : null) || 'N/A'}}, N/A лет
                      </p>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" :offset="7">
                    <nuxt-link :to="userId + '/points/'">
                      <el-button type="success" class="button-points">0 баллов</el-button>
                    </nuxt-link>
                  </el-col>
                  <el-col :span="13" class="btn-group">
                    <font-awesome-icon :icon="['fab', 'facebook-f']" class="fa-border" />
                    <font-awesome-icon :icon="['fab', 'twitter']" class="fa-border" />
                    <font-awesome-icon :icon="['fab', 'google-plus-g']" class="fa-border" />
                    <font-awesome-icon :icon="['fab', 'vk']" class="fa-border" />
                    <font-awesome-icon :icon="['fab', 'odnoklassniki']" class="fa-border" />
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="3">
                    <p class="text-grey">Телефон:</p>
                  </el-col>
                  <el-col :span="10" :offset="4">
                    <p>{{ userDetails.aboutUser["phone"] }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="3">
                    <p class="text-grey">E-mail:</p>
                  </el-col>
                  <el-col :span="10" :offset="4">
                    <p>{{ userDetails.aboutUser["email"] }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="3">
                    <p class="text-grey">Город</p>
                  </el-col>
                  <el-col :span="10" :offset="4">
                    <p>{{ userDetails.aboutUser["city"] }}</p>
                  </el-col>
                </el-row>
                <el-row class="last-activity">
                  <el-col :offset="7" :span="8">
                    <el-row>
                      <p class="text-grey">Зарегестрирован:</p>
                    </el-row>
                    <el-row class="time">
                      <div>
                        {{ this.$times({
                          time: userDetails.aboutUser["firstActive"],
                          format: '{D}.{MM}.{Y}'
                        })}}
                      </div>
                      <div>
                        {{ this.$times({
                          time: userDetails.aboutUser["firstActive"],
                          format: '{H}:{M}:{S}'
                        })}}
                      </div>
                    </el-row>
                  </el-col>
                  <el-col :span="8">
                    <el-row>
                      <p class="text-grey">Последний визит:</p>
                    </el-row>
                    <el-row class="time">
                      <div>
                        {{ this.$times({
                          time: userDetails.aboutUser["lastActive"],
                          format: '{D}.{MM}.{Y}'
                        })}}
                      </div>
                      <div>
                        {{ this.$times({
                          time: userDetails.aboutUser["lastActive"],
                          format: '{H}:{M}:{S}'
                        })}}
                      </div>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="7" class="col-container user-activity">
            <div class="component-container">
              <!-- АКТИВНОСТЬ ПОЛЬЗОВАТЕЛЯ -->
              <component-activity :data="userActivity" />
            </div>
          </el-col>
          <el-col :span="7" class="col-container user-transactions">
            <!-- ТРАНЗАКЦИИ ПОЛЬЗОВАТЕЛЯ -->
            <div class="component-container">
              <component-transactions :data="userDetails.userTransactions" />
            </div>
          </el-col>
          <el-col :span="10" class="col-container graphic-activity">
            <!-- ACTIVITY GRAPH -->
            <div class="component-container">
              <el-row>
                <h2 class="component-title">График активности</h2>
              </el-row>
              <graphic-activity :data="userDetails.activity[0]"/>
            </div>
          </el-col>
          <el-col :span="7" class="col-container graphic-transitions">
            <!-- ИСТОЧНИКИ ПЕРЕХОДОВ -->
            <div class="component-container">
              <div>
                <el-row class="title">
                  <h2 class="component-title">Источники переходов</h2>
                </el-row>
                <graphic-transitions v-if="userSourceAnalyse" :data="userSourceAnalyse" />
              </div>
            </div>
          </el-col>
          <el-col :span="7" class="col-container graphic-conversions">
            <!-- ИСТОЧНИКИ КОНВЕРСИЙ -->
            <div class="component-container">
              <div>
                <el-row class="content">
                  <h2 class="component-title">Источники конверсий</h2>
                </el-row>
                <graphic-conversions :data="[91]" />
              </div>
            </div>
          </el-col>
          <div class="specification">
            <!-- ДЕТАЛИЗАЦИЯ -->
            <el-col class="component-container">
              <div class="specification__head">
                <div class="specification__head-title">
                  <h3>Детализация</h3>
                </div>
                <div class="specification__head-button">
                  <el-dropdown trigger="click">
                    <el-button type="warning" class="custom-cog">
                      <font-awesome-icon :icon="['fas', 'cog']" class="fa-lg" />
                    </el-button>
                    <!-- фильтр -->
                    <el-dropdown-menu slot="dropdown" class="container">
                      <div class="id payments tools-container">
                        <h3>Параметры</h3>
                        <div class="test" v-if="userDetails.details">
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
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
              <div class='table-container'>
                <div class="template-table" v-if="userDetails.details">
                  <!-- TABLE -->
                  <visitor-table
                    :data="filteredUserDetails"
                    :labels="columns.filter(r => r.visible)"
                    @row-click="dialogHandler"
                  ></visitor-table>
                </div>
              </div>
            </el-col>
          </div>
          <el-col :span="7" class="col-container device-type">
            <!-- ТИП УСТРОЙСТВА -->
            <div class="component-container">
              <div class="device-type-inner">
                <el-row>
                  <h2 class="component-title">Тип устройства</h2>
                </el-row>
                <el-main>
                  <el-row class="body-wrapper">
                    <el-row class="row-wrapper" v-if="userDetails.devices['devices']">
                      <graphic-devices :data="devicesList" />
                    </el-row>
                    <div class="list" v-if="filteredDeviceType">
                      <div>
                        <el-row class="title">ОС</el-row>
                        <div v-for="(item, key) in filteredDeviceType.os" :key="key" class="line">
                          <el-row class="type">{{item}}</el-row>
                        </div>
                      </div>
                      <div class="right">
                        <el-row class="title">Браузер</el-row>
                        <div v-for="(item, key) in filteredDeviceType.browsers" :key="key" class="line">
                          <el-row class="type">{{item}}</el-row>
                        </div>
                      </div>
                    </div>
                  </el-row>
                </el-main>
              </div>
            </div>
          </el-col>

          <!-- СЕГМЕНТЫ -->
          <el-col :span="17" class="col-container graphic-tags">
            <div class="component-container">
              <el-main>
                <el-tabs type="card">
                  <el-tab-pane label="Сегменты">
                    <div class="tag-name-outer" v-if="userDetails['segments']">
                      <div
                        v-for="(item, id) in userDetails['segments']"
                        :key="id"
                        class="tag-name"
                      >
                        <nuxt-link :to="'/segments/' + item.address" class="link">
                          {{item.name}}
                        </nuxt-link>
                      </div>
                    </div>
                    <div class="create-similar">
                      <div class="title">
                        <h2>Создание похожих сегментов</h2>
                      </div>
                      <div class="tag-name-outer">
                        <!-- <div class="tag-name">По дате регистрации</div>
                        <div class="tag-name">Похожи по чеку</div>
                        <div class="tag-name">Покупали те же билеты</div>
                        <div class="tag-name">С похожими баллами</div>-->
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="Компании">
                    <div class="tag-name"></div>
                  </el-tab-pane>
                </el-tabs>
              </el-main>
            </div>
          </el-col>
          <!-- __________ -->

          <el-col :span="7" class="col-container comments">
            <component-comments />
          </el-col>
          <!--<el-col :span="14" class="col-container probality">
            
            <div class="component-container">
              <el-row>
                <h2 class="component-title">Вероятность действий</h2>
              </el-row>
              <el-main>
                <el-row>
                  <graphic-possibility :data="[57, 82, 62]" />
                </el-row>
              </el-main>
            </div>
          </el-col>-->
        </div>
      </el-tab-pane>
      <el-tab-pane name="details">
        <template slot="label">
          <div class="header-title right">Детализация</div>
        </template>
        <el-container class="detail payments" v-if="activeTab === 'details'">
          <div class="container">
            <el-tabs>

              <!-- all actions -->
              <el-tab-pane label="Все действия">
                <div
                  v-if="!tabAsyncManager.loading && tabAsyncManager.detailsData.length"
                  class="table-list"
                >
                  <el-tabs
                    tab-position="left"
                    v-model="active"
                    @tab-click="detailUserOperationEvent"
                    v-if="filteredSessions"
                  >
                    <el-tab-pane
                      v-for="line in filteredSessions"
                      :name="line._id"
                      :key="line._id"
                    >
                      <template slot="label">
                        <div
                          class="container-steps"
                          :class="line.color">
                          <div class="info">
                            <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="fa-lg in" />
                            {{tabAsyncManager.statuses[line.status]}}
                          </div>
                          <div class="date">{{handleDate(line.date, "{D}.{MM}.{Y}")}}</div>
                          <div 
                            class="time"
                            :class="line.class"
                            >{{handleDate(line.date, "{H}:{M}")}}</div>
                        </div>
                      </template>

                      <div class="wrapper">
                        <div class="step">
                          <component-detail :data="tabAsyncManager" :status="line.status" />
                        </div>
                      </div>
                    </el-tab-pane>
                  </el-tabs>

                  <div class="pagination">
                    <el-dropdown split-button type="primary" @command="handleCommand">
                      {{views}}
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          v-for="(count, key) in [10, 20, 30, 40]"
                          :command="count"
                          :key="key">
                          <span style="padding: 0 5px">{{count}}</span>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <el-pagination
                      background
                      layout="prev, pager, next"
                      :total="this.tabAsyncManager.detailsData.length"
                      :page-size="Number(this.views)"
                      :current-page.sync="current"
                    ></el-pagination>
                  </div>
                </div>
                <div v-else>
                  <div v-loading="true" style="height: 470px;"></div>
                </div>
              </el-tab-pane>
              
              <!-- outgoing -->
              <el-tab-pane disabled>
                <template slot="label">
                  <el-select value="Исходящие">
                    <div class="payments detail dropdown">
                      <el-option
                        v-for="(item, id) in dropdown.options"
                        :key="id"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </div>
                  </el-select>
                </template>
              </el-tab-pane>

              <!-- incoming -->
              <el-tab-pane disabled>
                <template slot="label">
                  <el-select value="Входящие">
                    <div class="payments detail dropdown">
                      <el-option
                        v-for="item in dropdown.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </div>
                  </el-select>
                </template>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-container>
      </el-tab-pane>
    </el-tabs>

    <!-- transaction information ( dialog popper ) -->
    <div>
      <component-dialog
        :visible.sync="dialogVisible"
        @closeDialog="handleClose"
        :data="dialogData"
        v-if="dialogData.loading"
      ></component-dialog>
    </div>
    <!-- ______ -->
  </el-main>
</template>
<script>
import VisitorTable from '@/components/visitor-components/visitor-table.vue';
import draggable from 'vuedraggable';

// GRAPHICS 
import GraphicActivity from '@/components/graphics/payments-id/activity.vue';
import GraphicConversions from '@/components/graphics/payments-id/conversions.vue';
import GraphicDevices from '@/components/graphics/payments-id/devices.vue';
import GraphicTransitions from '@/components/graphics/payments-id/transitions.vue';
import GraphicPossibility from '@/components/graphics/payments-id/possibility.vue';

// PAGE COMPONENTS
import ComponentComments from '@/components/pages-components/payments/_id/comments.vue';
import ComponentTransactions from '@/components/pages-components/payments/_id/transactions.vue';
import ComponentActivity from '@/components/pages-components/payments/_id/activity.vue';
import ComponentDialog from "@/components/pages-components/payments/_id/dialog.vue";
import ComponentDetail from "@/components/pages-components/payments/_id/detail.vue";

export default {
  middleware: "roles/user",
  components: { 
    draggable,
    VisitorTable,
    GraphicActivity,
    GraphicConversions,
    GraphicDevices,
    GraphicTransitions,
    GraphicPossibility,
    ComponentDetail,
    ComponentDialog,
    ComponentComments,
    ComponentTransactions,
    ComponentActivity
  },
  data() {
    return {
      activeTab: 'main',
      userActivity: null,
      userSourceAnalyse: null,
      current: 1,
      userId: null,
      active: null,
      dialogData: {
        browser: {},
        os: {},
        cookies: {},
        utm: { tags: {} },
        analytics: {}
      },
      avatar: {
        2: '#e7c5ee',
        1: '#4c89ff'
      },
      customTabsHeadStyle: null,
      customTabsBodyStyle: null,

      columns: [
        { label: "Дата", prop: "date", visible: true, width: 100 },
        { label: "Событие", prop: "event", visible: true, width: 300 },
        { label: "Чек", prop: "earnings", visible: true, width: 80 },
        { label: "Купил билетов", prop: "tickets", visible: true, width: 100 },
        { label: "Источник", prop: "source", visible: true, width: 130 },
        { label: "Город", prop: "city", visible: true, width: 100 }
      ],

      views: 20,
      dropdown: {
        input: "",
        output: "",
        options: [{
            value: "all",
            label: "Все"
          },{
            value: "email",
            label: "Email"
          },{
            value: "sms",
            label: "SMS"
          },{
            value: "banner",
            label: "Баннер"
          },{
            value: "sms1",
            label: "SMS"
          },{
            value: "push1",
            label: "Push"
          }
        ]
      },

      dialogVisible: false,

      tabAsyncManager: {
        statuses: {
          WIDGET_OPEN: "Открыл виджет",
          WIDGET_LAZY: "Виджет загружен",
          WIDGET_SEAT: "Выбирает места",
          WIDGET_UNSEAT: "Удаляет места",
          WIDGET_ORDER: "Оформление",
          WIDGET_SUCCESS: "Оплата",
          WIDGET_PAYMENT: "Оплачен",
          ACCESS_SITE: "Заход на сайт"
        },

        lastChangeTab: null,
        data: null,
        detailsData: {
          length: 0,
          operations: null
        },
        offset: 1,
        loading: false,

        viewer: {
          _id: null,
          name: null,
          date: null,
          email: null,
          phone: null,

          utm: {
            source: null,
            tags: null
          },

          os: {
            name: null,
            arch: null
          },

          browser: {
            name: null,
            version: null
          },

          analytics: {
            google: null,
            facebook: null,
            yandex: null,
            vis: null
          }
        }
      }
    };
  },
  async asyncData({ store, params, $axios }) {
    const userId = params.id;

    const userDetails = await store.dispatch("payment/getUserDetails", userId); 

    const request = await $axios.get(
      `${process.env.address}/v1/reports/buyers/userActivity/${userId}`
    );

    return { userDetails, userId, userActivity: request.data };
  },
  mounted() {
    this.getUserSourceAnalyse();
  },
  watch: {
    current() {
      this.tabAsyncManager.lastChangeTab = null;
      this.openTabEvent({ name: "details" });
    },
    views() {
      this.tabAsyncManager.lastChangeTab = null;
      this.openTabEvent({ name: "details" });
    }
  },
  computed: {
    filteredUserDetails() {
      return this.userDetails.details.map(item => {
        item.date = this.$times({ time: item.date, format: '{D}.{MM}.{Y}' })
        return item;
      })
    },
    userGender() {
      const { gender } = this.userDetails.aboutUser;
      return this.avatar[gender];
    },
    devicesList() {
      const { computer, phone } = this.userDetails.devices['devices'];
      return {
        labels: [
          computer[0] ? 'Компьютер' : null,
          phone[0] ? 'Смартфон' : null
        ],
        values: [
          computer[0] ? computer [0] : null,
          phone[0] ? phone[0] : null
        ]
      };
    },
    filteredSessions() {
      const data = this.tabAsyncManager.detailsData.operations.reverse();

      const check = (current, date) => {
        return (
          (
            (new Date(current)) - (new Date(date)) 
          ) / 1000 / 60 
        ) > 60
      }

      const sessions = {
        date: null, 
        flag: true, 
        rev() {
          this.flag = !this.flag
        }
      };

      const details = data.map((item, index, array) => {
        if (!item.status) item.status = 'ACCESS_SITE';
        
        const end = array.length === index + 1 ? 0 : 1;
        item.color = sessions.flag ? 'white' : 'grey';
        if (sessions.date === null) {
          if (check(array[index + end].date, item.date) || !end) {
            item.class = 'single';
            sessions.rev();
          } else {
            item.class = 'first';
            sessions.date = item.date;
          }
        } else if (check(array[index + end].date, item.date)) {
          item.class = 'last';
          sessions.date = null;
          sessions.rev();
        } else if (!end) {
          item.class = 'last';
        } else {
          item.class = 'line';
          sessions.date = item.date;
        }
        return item;
      });
      return details.reverse();
    },
    filteredDeviceType() {
      const data = this.userDetails.devicesList.list;

      if (data.length === 1) {
        return {
          os: [data[0].os],
          browser: [data[0].browser]
        };
      }

      const os = [];
      const browsers = [];

      for (let i = 0; i < data.length; i++) {
        const exist = os.includes(data[i].os) && browsers.includes(data[i].browser);
        if (!exist) {
          os.push(data[i].os) && browsers.push(data[i].browser);
        }
      }

      return { os, browsers };
    },
  },
  methods: {
    async getUserSourceAnalyse() {
      const request = await this.$axios.get(
        `${process.env.address}/v1/reports/buyers/userSourceAnalyse/${this.userId}`
      );
      this.userSourceAnalyse = request.data;
    },
    handleClose() {
      this.dialogVisible = false;
      this.dialogData = {
        browser: {},
        os: {},
        cookies: {},
        utm: { tags: {} },
        analytics: {},
        loading: false
      };
    },
    async dialogHandler(val) {
      console.log(val, 'dialog handler')
      const request = await this.$axios.post(
        `${process.env.address}/v1/reports/payments.details`,
        {
          offset: val.offset,
          ...this.$store.getters["dashboard/globalFilters"]
        }
      );

      this.dialogData = { ...request.data, loading: true };
      this.dialogVisible = true;
    },

    getUserAbbreviationCallback(name) {
      const sliceName = name.split(" ");
      name = [sliceName[0][0]];
      if (sliceName[1]) name.push(sliceName[1][0]);

      return name.join("");
    },
    handleDate(time, format) {
      return this.$times({ time: String(time), format: String(format) });
    },
    handleCommand(command) {
      this.views = command;
    },
    openTabEvent({ name }) {
      if (name !== "details" || this.tabAsyncManager.lastChangeTab === name) {
        this.tabAsyncManager.lastChangeTab = name;
        return;
      }

      this.tabAsyncManager.lastChangeTab = name;
      this.tabAsyncManager.loading = true;

      this.$axios
        .post(
          `${process.env.address}/v1/reports/getDetailsUserInformation.steps`,
          {
            views: Number(this.views),
            phone: this.userId,
            offset: this.current
          }
        )
        .then(resolve => {
          const { data } = resolve;
          if (data.error) {
            return;
          }

          this.tabAsyncManager.detailsData = data.then;

          const id = this.tabAsyncManager.detailsData.operations[0]["_id"];
          this.detailUserOperationEvent({ name: id });
          this.active = id;
          
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          this.tabAsyncManager.loading = false;
        });
    },

    detailUserOperationEvent({ name }) {
      this.$axios
        .post(
          `${process.env.address}/v1/reports/getDetailsUserInformation.info`,
          {
            address: name
          }
        )
        .then(resolve => {
          const { data } = resolve;

          if (data.error) {
            return;
          }

          this.tabAsyncManager.viewer = data.then;
        });
    }
  }
};
</script>

<style lang="scss">

</style>