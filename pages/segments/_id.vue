<template>
  <el-main>
    <el-container class="segments id">
      <!-- --ПОЛЬЗОВАТЕЛИ СЕГМЕНТА- -->
      <el-col :span="6" class="component-outer users">
        <div class="component">
          <div class="component__title">
            <h2 class="title">Пользователи сегмента</h2>
          </div>
          <div class="component__body">
            <div v-if="usersGraphics.series">
              <apexchart :options="usersGraphics.options" :series="usersGraphics.series" />
            </div>
            <div
              style="text-align: center; font-weight: bold; font-size: 13px; margin-top: 100px; padding-bottom: 150px;"
              v-else
            >Недостаточно данных</div>
            <div class="info">
              <font-awesome-icon :icon="['fas', 'users']" class="fa-lg" />
              <div class="count">
                <div class="count__top">{{usersStats.segment}}</div>
                <div class="count__bottom">из {{usersStats.database}} пользователей</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <!-- --ДАННЫЕ ПО СЕГМЕНТУ- -->
      <el-col :span="12" class="component-outer info">
        <div class="component">
          <div class="component__title">
            <h2 class="title">Данные по сегменту</h2>
          </div>
          <div class="component__body">
            <div class="wrapper">
              <div class="step">
                <el-steps direction="vertical">
                  <el-step title="Выручка внутри сегмента"></el-step>
                  <span class="count first">{{segmentDataStats.earnings.toFixed()}}</span>
                  <el-step title="Выручка на 1 пользователя"></el-step>
                  <span class="count second">{{segmentDataStats.averageUserEarnings.toFixed()}}</span>
                  <el-step title="Заказов"></el-step>
                  <span class="count third">{{segmentDataStats.orders.toFixed()}}</span>
                </el-steps>
              </div>
              <div class="step">
                <el-steps direction="vertical">
                  <el-step title="Средний чек"></el-step>
                  <span class="count first">{{segmentDataStats.averageEarnings.toFixed()}}</span>
                  <el-step title="LTV"></el-step>
                  <span class="count second">N/A</span>
                  <el-step title="Просмотры страниц"></el-step>
                  <span class="count third">N/A</span>
                </el-steps>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <!-- --ТИП УСТРОЙСТВА- -->
      <el-col :span="6" class="component-outer devices">
        <div class="component">
          <div class="component__title">
            <h2 class="title">Тип устройства</h2>
          </div>
          <div class="component__body">
            <apexchart :options="devicesGraphics.options" :series="devicesGraphics.series" />
          </div>
        </div>
      </el-col>
      <!-- ТОВАРЫ ТОП-10 -->
      <el-col :span="18" class="component-outer goods">
        <div class="component">
          <div class="component__body">
            <visitor-table
              :data="filteredTopTenGoods"
              :monolite="true"
              :labels="labelsTopTenGoods"
            ></visitor-table>
          </div>
        </div>
      </el-col>
      <!-- --ТОП ЛОКАЦИЙ- -->
      <el-col :span="6" class="component-outer locations">
        <div class="component">
          <div class="component__title">
            <h2 class="title">Топ локаций</h2>
          </div>
          <div class="component__body">
            <el-tabs>
              <el-tab-pane label="Города">
                <apexchart
                  :options="locationsGraphics.options"
                  :height="computedLocationsHeight"
                  :series="locationsGraphics.series"
                />
              </el-tab-pane>
              <el-tab-pane label="Районы">
                <apexchart
                  :options="locationsGraphics.options"
                  :height="computedLocationsHeight"
                  :series="locationsGraphics.series"
                />
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
      <!-- ПОЛЬЗОВАТЕЛИ СЕГМЕНТА ТАБЛИЦА -->
      <el-col :span="24" class="component-outer users-table">
        <div class="component">
          <div class="wallpaper-table">
            <div class="tools">
              <div>
                <h3>Пользователи сегмента</h3>
              </div>
              <div>
                <!-- <el-dropdown trigger="click">
                <el-button type="warning" class="el-button-custom-cog">
                  <font-awesome-icon :icon="['fas', 'cog']" class="fa-lg" />
                </el-button>

                </el-dropdown>-->
                <!-- ФИЛЬТР -->
              </div>
            </div>
            <!-- -ТАБЛИЦА -->
            <div v-if="usersDetailsStats.content" class="template-table">
              <visitor-table
                :data="filteredUserStatsTable"
                :labels="labelsUserStatsTable"
              ></visitor-table>
              <el-pagination
                style="padding: 25px;"
                background
                layout="prev, pager, next"
                :total="usersDetailsStats.length"
                :page-size="10"
                :current-page="usersDetailsData.offset + 1"
                :hide-on-single-page="true"
                @current-change="changePageIndex"
              ></el-pagination>
            </div>
          </div>
        </div>
      </el-col>
    </el-container>
  </el-main>
</template>

<script>
import draggable from "vuedraggable";
import VisitorTable from '@/components/visitor-components/visitor-table.vue';

export default {
  middleware: "roles/user",
  components: {
    draggable,
    VisitorTable
  },

  data() {
    return {
      labelsUserStatsTable: [
        { prop: "_id", label: "Телефон", width: 140 },
        { prop: "name", label: "Имя", width: 200 },
        { prop: "event", label: "Последнее событие", width: 300 },
        { prop: "tickets", label: "Билетов", width: 120 },
        { prop: "earnings", label: "Прибыль", width: 120 },
        { prop: "transactions", label: "Транзакций", width: 120 },
        { prop: "gender", label: "Пол", width: 100 }
      ],
      labelsTopTenGoods: [
        { prop: 'name', label: 'Товары топ-10', width: 300 },
        { prop: 'quantity', label: 'Кол-во транзакций', width: 100 },
        { prop: 'share', label: 'Доля от общего кол-во транзакций', width: 100 }
      ]
    }
  },

  async asyncData({ $axios, params }) {
    if (!params.id) throw new Error("bad request");

    const request = await $axios
      .post(`${process.env.address}/v1/segments/get`, {
        segment: params.id
      })
      .then(resolve => {
        if (resolve.data.error) {
          throw new Error(resolve.error);
        }

        return resolve.data.then;
      });

    return {
      value2: false,
      usersDetailsData: {
        segment: params.id,
        offset: 0
      },

      usersDetailsStats: {
        length: 0,
        content: null
      },

      usersStats: request.users,
      usersGraphics: {
        options: {
          chart: {
            type: "donut"
          },
          responsive: [
            {
              breakpoint: 10000,
              options: {
                chart: {
                  height: 240
                }
              }
            },
            {
              breakpoint: 1600,
              options: {
                chart: {
                  height: 280
                }
              }
            }
          ],
          legend: {
            show: false
          },
          labels: ["Сегмент", "Всего"]
        },

        series:
          request.users.database <= request.users.segment
            ? [100, 0]
            : request.users.segment == 0
            ? null
            : [request.users.segment, request.users.database]
      },
      segmentDataStats: request.stats,
      devicesGraphics: {
        options: {
          chart: {
            type: "bar",
            toolbar: {
              show: false
            }
          },
          xaxis: {
            categories: ["Смартфон", "Компьютер"],
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            labels: {
              style: {
                fontSize: "13px",
                fontFamily: "Rubik, sans-serif"
              }
            }
          },
          grid: {
            show: false
          },
          yaxis: {
            axisTicks: {
              show: false
            },
            labels: {
              show: false
            }
          },
          colors: ["#5AB6FE", "#4BDCA3", "#6382A7"],
          chartOptions: {
            dataLabels: {
              enabled: false
            }
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: "center" // top, center, bottom
              },
              distributed: true
            }
          },
          responsive: [
            {
              breakpoint: 10000,
              options: {
                chart: {
                  height: 250
                }
              }
            }
          ]
        },
        series: [
          {
            name: "Заказов",
            data: [request.devices.computer, request.devices.phone]
          }
        ]
      },
      eventsGraphics: request.events,
      locationsGraphics: {
        options: {
          chart: {
            type: "bar",
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              horizontal: true,
              colors: {
                backgroundBarColors: ["#4BDCA3", "#5AB6FE", "#6382A7"],
                backgroundBarOpacity: 0
              },
              distributed: true
            }
          },
          xaxis: {
            categories: request.locations.map(resolve => resolve.name),
            labels: {
              show: false
            },
            axisBorder: {
              show: false
            }
          }
        },

        series: [
          {
            name: "Продаж: ",
            data: request.locations.map(resolve => {
              return resolve.quantity;
            })
          }
        ]
      }
    };
  },

  async mounted() {
    this.remoteUsersDetails();
  },

  computed: {
    computedLocationsHeight() {
      return this.locationsGraphics.series[0].data.length * 60;
    },
    filteredUserStatsTable() {
      return this.usersDetailsStats.content.map(item => {
        const format = '{D}.{MM}.{Y}';
        item.firstActivity = this.$times({ time: item.firstActivity, format });
        item.lastActivity = this.$times({ time: item.lastActivity, format });
        item.gender = item.gender === 1 ? 'Мужчина' : 'Женщина';
        return item;
      })
    },
    filteredTopTenGoods() {
      return this.eventsGraphics.map(item => {
        item.share += '%';
        return item;
      })
    }
  },

  methods: {
    changePageIndex(offset) {
      if (offset - 1 != this.usersDetailsData.offset) {
        this.usersDetailsData.offset = offset - 1;
        this.remoteUsersDetails();
      }
    },

    async remoteUsersDetails() {
      this.usersDetailsStats = {
        content: null,
        length: 0
      };

      await this.$axios
        .post(
          `${process.env.address}/v1/segments/get.users`,
          this.usersDetailsData
        )
        .then(resolve => {
          resolve = resolve.data;
          if (resolve.error) {
            return;
          }

          this.usersDetailsStats = {
            content: resolve.then.users,
            length: resolve.then.length
          };
        });
    }
  }
};
</script>
