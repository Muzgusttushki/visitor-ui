<template>
  <el-main class="payments id">
    <el-tabs @tab-click="openTabEvent" class="main-wrapper">
      <el-tab-pane>
        <template slot="label">
          <div class="header-title left">Общая сводка</div>
        </template>
        <div class="container">
          <el-col :span="10" class="col-container user-chart">
            <div class="component-container">
              <div v-if="userDetails" class="component-container-inner">
                <!-- ----------------------------------ИНФОРМАЦИЯ О КЛИЕНТЕ---------------------------------- -->
                <el-row>
                  <el-col :span="3" class="user-image">
                    <div v-if="false">
                      <img src alt width="50px" height="50px" />
                    </div>
                    <div v-else>
                      <div :class="'user-image'">
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
                    <el-button @click="routPoints" type="success" class="button-points">0 баллов</el-button>
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
              <!-- ------------------------------АКТИВНОСТЬ ПОЛЬЗОВАТЕЛЯ--------------------------------- -->
              <el-row>
                <h2 class="component-title">Активность пользователя</h2>
              </el-row>
              <el-row class="activity-row">
                <el-col :span="18">
                  <p>Кол-во активных действий</p>
                </el-col>
                <el-col :span="6" class="text-right">
                  <p v-if="userActivity">{{userActivity['totalActions']}}</p>
                  <p v-else>N/A</p>
                </el-col>
              </el-row>
              <el-row class="activity-row row-bg">
                <el-col :span="18">
                  <p>Заходы на сайт</p>
                </el-col>
                <el-col :span="6" class="text-right">
                  <p v-if="userActivity">{{userActivity['sheetActions']}}</p>
                  <p v-else>N/A</p>
                </el-col>
              </el-row>
              <el-row class="activity-row">
                <el-col :span="18">
                  <p>Взаимодействие с виджетом</p>
                </el-col>
                <el-col :span="6" class="text-right">
                  <p v-if="userActivity">{{userActivity['widgetActions']}}</p>
                  <p v-else>N/A</p>
                </el-col>
              </el-row>
              <el-row class="activity-row row-bg">
                <el-col :span="18">
                  <p>Открытие писем</p>
                </el-col>
                <el-col :span="6" class="text-right">
                  <p>0</p>
                </el-col>
              </el-row>
              <el-row class="activity-row">
                <el-col :span="18">
                  <p>Опросы</p>
                </el-col>
                <el-col :span="6" class="text-right">
                  <p>0</p>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="7" class="col-container user-transactions">
            <!-- ----------------------------------ТРАНЗАКЦИИ ПОЛЬЗОВАТЕЛЯ-------------------------------- -->
            <div class="component-container">
              <div>
                <el-row>
                  <h2 class="component-title">Транзакции пользователя</h2>
                </el-row>
                <el-row class="activity-row">
                  <el-col :span="12">
                    <p>Сумма покупок</p>
                  </el-col>
                  <el-col :span="12" class="text-right">
                    <p
                      v-if="userDetails.userTransactions['earnings']"
                    >{{ userDetails.userTransactions["earnings"] }}₽</p>
                    <loading-square v-else />
                  </el-col>
                </el-row>
                <el-row class="activity-row row-bg">
                  <el-col :span="12">
                    <p>Транзакций</p>
                  </el-col>
                  <el-col :span="12" class="text-right">
                    <p v-if="userDetails">{{ userDetails.userTransactions["sales"] }}</p>
                    <loading-square v-else />
                  </el-col>
                </el-row>
                <el-row class="activity-row">
                  <el-col :span="12">
                    <p>Билетов куплено</p>
                  </el-col>
                  <el-col :span="12" class="text-right">
                    <p v-if="userDetails">{{ userDetails.userTransactions["tickets"] }}</p>
                    <loading-square v-else />
                  </el-col>
                </el-row>
                <el-row class="activity-row row-bg">
                  <el-col :span="12">
                    <p>Билетов в 1 заказе</p>
                  </el-col>
                  <el-col :span="12" class="text-right">
                    <p v-if="userDetails">{{ userDetails.userTransactions["averageTickets"] }}</p>
                    <loading-square v-else />
                  </el-col>
                </el-row>
                <el-row class="activity-row">
                  <el-col :span="12">
                    <p>Средний чек</p>
                  </el-col>
                  <el-col :span="12" class="text-right">
                    <p v-if="userDetails">{{ userDetails.userTransactions["averageEarnings"] }}₽</p>
                    <loading-square v-else />
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="10" class="col-container graphic-activity">
            <!-- ------------------------------------ACTIVITY GRAPH------------------------------------ -->
            <div class="component-container">
              <el-row>
                <h2 class="component-title">График активности</h2>
              </el-row>
              <el-tabs v-if="userDetails.activity">
                <el-tab-pane
                  v-for="(item, key) in [
                  {name: 'Год', var: 'year'},
                  {name: 'Месяц', var: 'month'},
                  {name: 'Неделя', var: 'week'}
                ]"
                  :key="key"
                  :label="item.name"
                >
                  <apexchart
                    type="area"
                    :options="{
                      ...graphic_activity.common,
                      xaxis: { 
                        categories: [...editActivityDates(userDetails.activity[0][item.var].dates)],
                        labels: {show: false},
                        tooltip: {enabled: false}
                      }
                    }"
                    :series="[
                      { name: 'Операции', data: userDetails.activity[0][item.var].operations },
                      { name: 'Транзакции', data: userDetails.activity[0][item.var].transactions }
                    ]"
                  />
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
          <el-col :span="7" class="col-container graphic-transitions">
            <!-- -----------------------------------ИСТОЧНИКИ ПЕРЕХОДОВ------------------------------------ -->
            <div class="component-container">
              <div>
                <el-row class="title">
                  <h2 class="component-title">Источники переходов</h2>
                </el-row>
                <el-tabs class="content">
                  <div v-if="userSourceAnalyse && filteredUserSource">
                    <apexchart
                      type="donut"
                      :options="{labels: this.filteredUserSource.type, ...this.graphic_transitions}"
                      :series="this.filteredUserSource.value"
                    />
                  </div>
                  <div v-else>
                    <loading-circle />
                  </div>
                </el-tabs>
              </div>
            </div>
          </el-col>
          <el-col :span="7" class="col-container graphic-conversions">
            <!-- ---------------------------------------ИСТОЧНИКИ КОНВЕРСИЙ-------------------------------- -->
            <div class="component-container">
              <div>
                <el-row class="content">
                  <h2 class="component-title">Источники конверсий</h2>
                </el-row>
                <el-tabs class="content">
                  <div>
                    <apexchart
                      width="100%"
                      type="donut"
                      :options="graphic_transitions"
                      :series="[42, 50, 91]"
                    />
                  </div>
                </el-tabs>
              </div>
            </div>
          </el-col>
          <div class="specification">
            <!-- ----------------------------------ДЕТАЛИЗАЦИЯ--------------------------------------------- -->
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
                    <!-- -----фильтр----- -->
                    <el-dropdown-menu slot="dropdown" class="container">
                      <div class="id payments tools-container">
                        <h3>Параметры</h3>
                        <div class="test" v-if="userDetails.details">
                          <el-tag
                            v-for="(column, columnID) in columns"
                            :key="columnID"
                            :type="column.visible ? 'warning' : 'info'"
                            effect="dark"
                            @click="column.visible = !column.visible"
                          >{{ column.label }}</el-tag>
                        </div>
                      </div>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
              <div class="template-table" v-if="userDetails">
                <!-- -----TABLE----- -->
                <el-table
                  v-if="userDetails.details"
                  :data="userDetails.details"
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
                    <template slot="header">
                      <span>{{ column.label }}</span>
                    </template>
                    <template slot-scope="scope">
                      <span>
                        <span
                          v-if="column.source == 'date'"
                        >{{`${scope.row[column.source].substr(8, 2)}.${scope.row[column.source].substr(5, 2)}.${scope.row[column.source].substr(0,4)}`}}</span>
                        <span v-else>{{scope.row[column.source]}}</span>
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
                <div v-else>123</div>
              </div>
            </el-col>
          </div>
          <el-col :span="7" class="col-container device-type">
            <!-- -------------------------------------------ТИП УСТРОЙСТВА--------------------------------- -->
            <div class="component-container">
              <div class="device-type-inner">
                <el-row>
                  <h2 class="component-title">Тип устройства</h2>
                </el-row>
                <el-main>
                  <el-row class="body-wrapper">
                    <el-row class="row-wrapper" v-if="userDetails.devices['devices']">
                      <apexchart
                        :series="devicesList.values"
                        :options="{
                          ...graphic_devices,
                          labels: devicesList.labels
                        }"
                        type="donut"
                        height="300"
                        width="100%"
                      />
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

          <!-- --------------------------------------------СЕГМЕНТЫ------------------------------------- -->
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
                        @click="routSegment(item.address)"
                      >{{ item.name }}</div>
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
          <!-- ------------------------------------------------------------------------------------------ -->

          <!-- -------------------------------------------КОММЕНТАРИИ------------------------------------ -->
          <el-col :span="7" class="col-container comments">
            <div class="component-container">
              <el-row>
                <h2 class="component-title">Комментарии</h2>
              </el-row>
              <div class="comments__container">
                <el-row class="comments__wrapper">
                  <el-row class="comments__wrapper_username">
                    <el-col :span="6">
                      <img src alt width="45px" height="45px" />
                    </el-col>
                    <el-col :span="19" class="container">
                      <div class="name">Иван Дмитриев</div>
                      <div class="position">Технический директор</div>
                    </el-col>
                  </el-row>
                  <el-row class="comments__wrapper_text">
                    <el-col :offset="6" :span="18">Давали бесплатный проход на спектакль с Лебедевым</el-col>
                  </el-row>
                  <el-row class="comments__wrapper_date">
                    <el-col :offset="6" :span="18">19.06.2019</el-col>
                  </el-row>
                </el-row>
                <el-row class="comments__wrapper">
                  <el-row class="comments__wrapper_username">
                    <el-col :span="6">
                      <img src alt width="45px" height="45px" />
                    </el-col>
                    <el-col :span="19" class="container">
                      <div class="name">Иван Дмитриев</div>
                      <div class="position">Технический директор</div>
                    </el-col>
                  </el-row>
                  <el-row class="comments__wrapper_text">
                    <el-col :offset="6" :span="18">Давали бесплатный проход на спектакль с Лебедевым</el-col>
                  </el-row>
                  <el-row class="comments__wrapper_date">
                    <el-col :offset="6" :span="18">19.06.2019</el-col>
                  </el-row>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="14" class="col-container probality">
            <!-- ----------------------------------------ВЕРОЯТНОСТЬ ДЕЙСТВИЙ------------------------------ -->
            <div class="component-container">
              <el-row>
                <h2 class="component-title">Вероятность действий</h2>
              </el-row>
              <el-main>
                <el-row>
                  <el-col :span="8">
                    <div>
                      <apexchart
                        :options="{...graphic_probability, colors: ['#5AB6FE']}"
                        :series="[60]"
                        height="200"
                      />
                      <p>Вероятность открыть e-mail</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div>
                      <apexchart
                        :options="{...graphic_probability, colors: ['#4BDCA3']}"
                        :series="[90]"
                        height="200"
                      />
                      <p>Вероятность открыть e-mail</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div>
                      <apexchart
                        :options="{...graphic_probability, colors: ['#FFC657']}"
                        :series="[90]"
                        height="200"
                      />
                      <p>Вероятность открыть e-mail</p>
                    </div>
                  </el-col>
                </el-row>
              </el-main>
            </div>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane name="details">
        <template slot="label">
          <div class="header-title right">Детализация</div>
        </template>
        <el-container class="detail payments">
          <div class="container">
            <el-tabs>
              <!-- ------------------------------------ВСЕ ДЕЙСТВИЯ----------------------------------------- -->
              <el-tab-pane label="Все действия">
                <div
                  v-if="!tabAsyncManager.loading && tabAsyncManager.detailsData.length"
                  class="table-list"
                >
                  <el-tabs
                    tab-position="left"
                    v-model="active"
                    @tab-click="detailUserOperationEvent"
                  >
                    <el-tab-pane
                      v-for="(val, valID) in tabAsyncManager.detailsData.operations"
                      :name="val._id"
                      :key="valID"
                    >
                      <template slot="label">
                        <div 
                          class="container-steps"
                          :class="val.color">
                          <div class="info">
                            <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="fa-lg in" />
                            {{tabAsyncManager.statuses[val.status] || 'Заход на сайт'}}
                          </div>
                          <div class="date">{{handleDate(val.date, "{D}.{MM}.{Y}")}}</div>
                          <div 
                            class="time" 
                            :class="{first: val.first, last: val.last, single: val.single, line: val.line}"
                            >{{handleDate(val.date, "{H}:{M}")}}</div>
                        </div>
                      </template>

                      <div class="wrapper">
                        <div class="step">
                          <div></div>
                          <div>
                            <div>
                              <span class="title">Сведения по операции</span>
                              <span class="description">"{{tabAsyncManager.statuses[val.status]}}"</span>
                            </div>
                            <div class="step-wrapper">
                              <div class="inner">
                                <div class="title">URL:</div>
                                <div class="description">{{tabAsyncManager.viewer.url || '-'}}</div>
                              </div>
                            </div>
                            <div class="step-wrapper">
                              <div class="inner">
                                <span class="title">ID:</span>
                                <span class="description">{{tabAsyncManager.viewer._id|| '-'}}</span>
                              </div>
                              <div class="inner">
                                <span class="title">ФИО:</span>
                                <span class="description">{{tabAsyncManager.viewer.name|| '-'}}</span>
                              </div>
                              <div class="inner">
                                <span class="title">Дата визита:</span>
                                <span
                                  class="description"
                                >{{handleDate(tabAsyncManager.viewer.date, "{D}.{MM}.{Y} {H}:{M}") || '-'}}</span>
                              </div>
                              <div class="inner">
                                <span class="title">Email:</span>
                                <span class="description">{{tabAsyncManager.viewer.email|| '-'}}</span>
                              </div>
                              <div class="inner">
                                <span class="title">Телефон:</span>
                                <span class="description">{{tabAsyncManager.viewer.phone|| '-'}}</span>
                              </div>
                            </div>
                            <div class="step-wrapper" v-if="tabAsyncManager.viewer.utm.tags">
                              <div
                                v-for="(utmKey, utmID) in Object.keys(tabAsyncManager.viewer.utm.tags)"
                                :key="utmID"
                                class="inner"
                              >
                                <span class="title">{{utmKey}}:</span>
                                <span
                                  class="description"
                                >{{tabAsyncManager.viewer.utm.tags[utmKey]}}</span>
                              </div>
                            </div>
                            <div class="step-wrapper">
                              <div class="inner">
                                <span class="title">Yandex:</span>
                                <span
                                  class="description"
                                >{{tabAsyncManager.viewer.analytics.yandex || '-'}}</span>
                              </div>
                              <div class="inner">
                                <span class="title">Google:</span>
                                <span
                                  class="description"
                                >{{tabAsyncManager.viewer.analytics.google || '-'}}</span>
                              </div>
                              <div class="inner">
                                <span class="title">Facebook:</span>
                                <span
                                  class="description"
                                >{{tabAsyncManager.viewer.analytics.facebook|| '-'}}</span>
                              </div>
                              <div class="inner">
                                <span class="title">Visitor:</span>
                                <span
                                  class="description"
                                >{{tabAsyncManager.viewer.analytics.vis|| '-'}}</span>
                              </div>
                            </div>
                            <div class="step-wrapper">
                              <div class="inner">
                                <span class="title">Браузер:</span>
                                <span
                                  class="description"
                                >{{tabAsyncManager.viewer.browser.name|| '-'}}</span>
                              </div>
                              <div class="inner">
                                <span class="title">Версия:</span>
                                <span
                                  class="description"
                                >{{tabAsyncManager.viewer.browser.version|| '-'}}</span>
                              </div>
                              <div class="inner">
                                <span class="title">ОС:</span>
                                <span class="description">{{tabAsyncManager.viewer.os.name|| '-'}}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-tab-pane>
                  </el-tabs>

                  <div class="pagination">
                    <el-dropdown split-button type="primary" @command="handleCommand">
                      {{views}}
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="10">
                          <span style="padding: 0 5px">10</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="20">
                          <span style="padding: 0 5px">20</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="30">
                          <span style="padding: 0 5px">30</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="40">
                          <span style="padding: 0 5px">40</span>
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
              <!-- -----------------------------------ИСХОДЯЩИЕ--------------------------------------------- -->
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
              <!-- --------------------------------ВХОДЯЩИЕ--------------------------------------------- -->
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

    <!-- -----------------------------------------ИНФОРМАЦИЯ О ТРАНЗАКЦИИ------------------------------ -->
    <div>
      <dialogs
        :visible.sync="dialogVisible"
        @closeDialog="handleClose"
        :data="dialogData"
        v-if="dialogData.loading"
      ></dialogs>
    </div>
    <!-- ----------------------------------------------------------------------------------------------- -->
  </el-main>
</template>
<script>
import dialogs from "@/components/elements/dialog-payment.vue";
import settings from "@/components/graphics-settings/payments-id.vue";

export default {
  layout: "dashboard",
  middleware: "roles/user",
  components: { dialogs },
  data() {
    return {
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

      customTabsHeadStyle: null,
      customTabsBodyStyle: null,

      columns: [
        { label: "Дата", source: "date", visible: true, width: 100 },
        { label: "Событие", source: "event", visible: true, width: 300 },
        { label: "Чек", source: "earnings", visible: true, width: 100 },
        {
          label: "Купил билетов",
          source: "tickets",
          visible: true,
          width: 150
        },
        { label: "Источник", source: "source", visible: true, width: 130 },
        { label: "Город", source: "city", visible: true, width: 100 }
      ],

      views: 20,
      dropdown: {
        input: "",
        output: "",
        options: [
          {
            value: "all",
            label: "Все"
          },
          {
            value: "email",
            label: "Email"
          },
          {
            value: "sms",
            label: "SMS"
          },
          {
            value: "banner",
            label: "Баннер"
          },
          {
            value: "sms1",
            label: "SMS"
          },
          {
            value: "push1",
            label: "Push"
          }
        ]
      },

      dialogVisible: false,
      graphic_activity: settings.graphic_activity,
      graphic_transitions: settings.graphic_transitions,
      graphic_probability: settings.probability,
      graphic_devices: settings.graphic_devices,

      translatedSources: {
        transitions: {
          direct: "Прямой",
          advertising: "Другая рекламная система",
          messenger: "Мессенджер",
          social: "Соц. сети",
          email: "Почта",
          advertisement: "Реклама"
        }
      },

      tabAsyncManager: {
        statuses: {
          WIDGET_OPEN: "Открыл виджет",
          WIDGET_LAZY: "Виджет загружен",
          WIDGET_SEAT: "Выбирает места",
          WIDGET_UNSEAT: "Удаляет места",
          WIDGET_ORDER: "Оформление",
          WIDGET_SUCCESS: "Оплата",
          WIDGET_PAYMENT: "Оплачен",
          VISIT: "Заход на сайт"
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
    console.log(userDetails.activity);

    const request = await $axios.get(
      `${process.env.address}/v1/reports/buyers/userActivity/${userId}`
    );
    const userActivity = request.data.then;

    return { userDetails, userId, userActivity };
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
    devicesList() {
      const list = { labels: [], values: [] }
      
      const devices = this.userDetails.devices['devices']

      devices['computer'] ? list.labels.push('Компьютер') && Number(list.values.push(devices['computer'])) : null
      devices['phone'] ? list.labels.push('Смартфон') && Number(list.values.push(devices['phone'])) : null

      return list
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
    filteredUserSource() {
      const data = this.userSourceAnalyse;

      if (data.length === 1) {
        return {
          type: [this.translatedSources.transitions[data[0]["type"]]],
          value: [data[0]["quantity"]]
        };
      }

      const names = [];
      const values = [];

      for (let i = 0; i < data.length; i++) {
        const type = data[i].method ? 'advertisement' : data[i].type
        const index = names.indexOf(type);

        if (index >= 0) {
          values[index] += data[i].quantity;
        } else {
          values.push(data[i].quantity) && names.push(type);
        }
      }

      return {
        type: names.map(item => this.translatedSources.transitions[item]),
        value: values
      };
    }
  },
  methods: {
    editActivityDates(dates) {
      const format = "{D}.{MM}.{Y}";

      return dates.map(item => {
        return (
          this.$times({
            time: item.current,
            format
          }) +
          " - " +
          this.$times({
            time: item.countdown,
            format
          })
        );
      });
    },
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
    handleCommand(command) {
      this.views = command;
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
    routSegment(id) {
      this.$router.push(`/segments/${id}`);
    },
    routPoints() {
      this.$router.push(`${this.userId}/points/`);
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
          
          const check = (current, date) => {
            // console.log((
            //   (
            //     (new Date(current)) - (new Date(date)) 
            //   ) / 1000 / 60 
            // ), current, date, 'check');
            return (
              (
                (new Date(current)) - (new Date(date)) 
              ) / 1000 / 60 
            ) > 30
          }

          const sessions = {
            date: null, 
            flag: true, 
            rev() {
              this.flag = !this.flag
            }
          };

          const details = data.then.operations.reverse().map((item, index, array) => {
            item.color = sessions.flag ? 'white' : 'grey';
            const i = array.length === index + 1 ? 0 : 1;
            if (sessions.date === null) {
              if (check(array[index + i].date, item.date) || !i) {
                item.single = true;
                sessions.rev();
              } else {
                item.first = true;
                sessions.date = item.date;
              }
            } else if (check(array[index + i].date, item.date)) {
              item.last = true;
              sessions.date = null;
              sessions.rev();
            } else if (!i) {
              item.last = true;
            } else {
              item.line = true;
              sessions.date = item.date;
            }
            return item;
          });;

          this.tabAsyncManager.detailsData = data.then;
          this.tabAsyncManager.detailsData.operations = details.reverse();
          console.log(this.tabAsyncManager)

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
