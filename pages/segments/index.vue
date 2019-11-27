<template>
  <el-container class="segments index" direction="vertical">
    <div class="main-wrapper">
      <el-collapse class="new-segment" accordion>
        <div>
          <ux-dropdown :enable.sync="exampledp" trigger="click">
            <template slot="action">
              <div class="wrapper">
                <div class="new-segment__title">Новый сегмент</div>
                <el-button type="primary" class="new-segment__button">
                  <font-awesome-icon :icon="['fas', 'plus']"/>
                </el-button>
              </div>
            </template>
            <template>
              <div>
                <el-form ref="form" :model="addSegmentData">
                  <el-form-item label="Имя">
                    <el-input v-model="addSegmentData.name" placeholder="Веедите цель"></el-input>
                  </el-form-item>
                  <el-form-item label="Цель">
                    <el-select v-model="addSegmentData.target" placeholder="Выберите цель">
                      <el-option value="buyers->month" label="не покупал 30 дней"></el-option>
                      <el-option value="buyers->quarte" label="не покупал 3 мес"></el-option>
                      <el-option value="buyers->half-year" label="не покупал 6 мес"></el-option>
                      <el-option value="buyers->new" label="новые за 7 дней"></el-option>
                      <el-option value="buyers->weekends" label="покупал сб, вс"></el-option>
                      <el-option value="buyers->friday" label="покупал в пятницу"></el-option>
                      <el-option value="buyers->average:bill(33)" label="ср. чек покупателя 33%"></el-option>
                      <el-option value="buyers->average:bill(72)" label="ср. чек покупателя 72%"></el-option>
                      <el-option value="buyers->average:bill(100)" label="ср. чек покупателя 100%"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Источник">
                    <el-select
                      multiple
                      v-model="addSegmentData.sources"
                      placeholder="Выберите источник"
                    >
                      <el-option value="http://topconcerts.ru" label="http://topconcerts.ru"></el-option>
                      <el-option value="https://topconcerts.ru" label="https://topconcerts.ru"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div class="button-group">
                  <el-button @click="cancelSegmentAdd">Отмена</el-button>
                  <el-button
                    type="primary"
                    :disabled="!(addSegmentData.name && addSegmentData.target && addSegmentData.sources)"
                    @click="addSegment"
                  >Добавить
                  </el-button>
                </div>
              </div>
            </template>
          </ux-dropdown>
        </div>
      </el-collapse>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="Стандартные сегменты" name="1" v-if="segments">
          <el-col :span="6" class="card" v-for="(segment, localeID) in segments" :key="segment._id">

            <!-- ____________________________________SEGMENT SETTINGS_____________________________________ -->
            <el-dropdown :hide-timeout="200" :hide-on-click="false">
                <span class="el-dropdown-link">
                  <font-awesome-icon :icon="['fas', 'ellipsis-h']"/>
                </span>
              <el-dropdown-menu slot="dropdown" class="segments index segment-settings">

                <!-- -------------------------------EDIT SEGMENT---------------------------------------- -->
                <el-dropdown-item>
                  <p class="title">Изменить</p>
                  <span class="icon">
                      <font-awesome-icon :icon="['fas', 'pencil-alt']"/>
                    </span>
                </el-dropdown-item>
                <!-- ----------------------------------------------------------------------------------- -->

                <!-- ------------------------------UPDATE AUTOMATICLY----------------------------------- -->
                <el-dropdown-item>
                  <p class="title">Обновлять автоматически</p>
                  <span class="icon">
                      <el-switch
                        :value="segment.automation"
                        active-color="#13ce66"
                        @change="handleSegmentSetting({command: 'segment->automatic', ...segment, automation: !segment.automation, localeID})"
                      ></el-switch>
                    </span>
                </el-dropdown-item>
                <!-- ----------------------------------------------------------------------------------- -->

                <!-- -------------------------------UPDATE SEGMENT-------------------------------------- -->
                <el-dropdown-item>
                  <p class="title" @click="handleSegmentSetting({command: 'segment->update', ...segment})">Обновить
                    принудительно</p>
                </el-dropdown-item>
                <!-- ----------------------------------------------------------------------------------- -->

                <!-- -------------------------------DELETE SEGMENT-------------------------------------- -->
                <el-dropdown-item class="delete">
                  <div @click="handleRemoveSegment(segment._id, localeID)"
                       style="display: flex; justify-content: space-between; width: 100%">
                    <p class="title">Удалить</p>
                    <span class="icon">
                        <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                      </span>
                  </div>
                </el-dropdown-item>
                <!-- ---------------------------------------------------------------------------------- -->

              </el-dropdown-menu>
            </el-dropdown>
            <!-- ______________________________________________________________________________________ -->

            <div
              v-loading="segment.updates"
              class="card_inner"
              @click="(!segment.updates && segment.enable) && routCard(segment)"
              style="cursor: pointer"
            >

              <!-- _________________________________NUMBER OF PEOPLE IN SEGMENT__________________________ -->
              <div class="card_inner_header">
                <el-row class="title">
                  <div>{{segment.name}}</div>
                </el-row>
                <el-row class="center">
                  <el-col :span="4">
                    <font-awesome-icon :icon="['fas', 'users']" class="fa-2x color-green"/>
                  </el-col>
                  <el-col :span="20">
                    <el-row class="count">
                      {{ segment.enable ? segment.then.users.segment : 0}} человек
                    </el-row>
                    <el-row class="color-grey">
                      {{ segment.enable ? Math.floor(segment.then.users.segment / segment.then.users.database * 100) : 0
                      }}% от общей базы
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <!-- ______________________________________________________________________________________ -->

              <!-- _______________________________________SEGMENT DETAIL___________________________________ -->
              <div class="card_inner_main">
                <el-row class="color-grey">Детали:</el-row>
                <el-row>{{segment.removeVisible}}
                  <el-col :span="4">
                    <font-awesome-icon :icon="['fas', 'receipt']" class="color-grey"/>
                  </el-col>
                  <el-col
                    :span="20"
                    class="detail-info"
                  >{{ segment.enable ? Math.floor(segment.then.stats.averageEarnings) : 0}} ₽ средний чек
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">
                    <font-awesome-icon :icon="['fas', 'shopping-bag']" class="color-grey"/>
                  </el-col>
                  <el-col
                    :span="20"
                    class="detail-info"
                  >{{ segment.enable ? segment.then.stats.orders : 0}} покупок
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">
                    <font-awesome-icon :icon="['fas', 'bullseye']" class="color-grey"/>
                  </el-col>
                  <el-col :span="20" class="detail-info">1 компания</el-col>
                </el-row>
              </div>
              <!-- _______________________________________________________________________________ -->

              <!--
                <div class="card_inner_button">
                <nuxt-link to="segments">
                  <el-button type="primary">

                    <font-awesome-icon :icon="['fas', 'chevron-right']" class="color-grey" />
                  </el-button>
                </nuxt-link>
              </div>
               -->
            </div>
          </el-col>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-container>
</template>
<script>
    export default {
        data() {
            return {
                activeNames: ["1"],
                addSegmentData: {
                    target: [],
                    name: null,
                    sources: null,
                    loading: false
                },
                editSegments: {},
                removeSegment: {},
                updateSegment: false,
                segments: null,

                timer: null,
                exampledp: false
            };
        },

        layout: "dashboard",
        middleware: "roles/user",

        mounted() {
            this.timer = true;
            this.getSegments();
        },

        computed: {},

        beforeDestroy() {
            this.timer = false;
        },

        methods: {
            cancelSegmentAdd() {
                this.addSegmentData = {
                    name: null,
                    sources: null,
                    target: null
                };

                this.exampledp = false;
            },

            routCard(segment) {
                const address = segment["_id"];
                if (address) return this.$router.push(`/segments/${address}`);
            },

            async getSegments() {
                if (!this.timer) return;
                const list = await this.$axios.get(
                    `${process.env.address}/v1/segments/list`
                );

                this.segments = list.data.then.segments;

                await new Promise(resolve => {
                    setTimeout(resolve, 4000);
                });
                this.getSegments();
            },

            handleRemoveSegment(_id, locale) {
                this.$confirm('Вы действительно хотите удалить сегмент?')
                    .then(_ => {
                        this.segments.splice(locale, 1);
                        this.handleSegmentSetting({command: 'segment->remove', _id});
                    })
                    .catch(_ => {
                    });
            },

            handleSegmentSetting({command, _id, automation, localeID}) {
                new Promise(resolve => {
                    this.$axios
                        .post(`${process.env.address}/v1/segments/configure`, {segment: _id, command, automation})
                        .catch(e => {
                            this.$notify.error({
                                title: 'Ошибка!',
                                message: 'Что то пошло не так!'
                            })
                        })
                        .then(resolve => {
                            if (resolve.data.error) {
                                this.$notify.error({
                                    title: "Ошибка",
                                    message: resolve.data.error.message
                                });

                                return;
                            }

                            switch (command) {
                                case 'segment->automatic':
                                    this.segments[localeID].automation = automation;
                                    this.$notify.success({title: 'Успешно!', message: `${automation ? 'Включено': 'Отключено' } автоматическое обновление.`});
                                    break;
                                case 'segment->remove':
                                    this.$notify.success({title: 'Успешно!', message: "Сегмент успешно удален"});
                                    break;
                                case 'segment->update':
                                    this.$notify.success({title: 'Успешно!', message: "Сегмент в очереди на обновление"});
                                    break;

                            }
                        });

                    resolve();
                })
            },

            async addSegment() {
                const request = await this.$axios
                    .post(`${process.env.address}/v1/segments/create`, this.addSegmentData)
                    .catch(() => {
                        this.$notify.error({
                            title: "Ошибка",
                            message:
                                "При создании сегмента произошла ошибка, попробуйте позднее"
                        });
                    })
                    .then(resolve => {
                        if (resolve.data.error) {
                            this.$notify.error({
                                title: "Ошибка",
                                message: "Сегмент не имеет доступа к указанным данным."
                            });

                            return;
                        }

                        this.addSegmentData = {
                            name: null,
                            sources: null,
                            target: null
                        };

                        this.exampledp = false;

                        this.$notify.info({
                            title: "Информация",
                            message: "Успешно, сегмент в очереди на сбор."
                        });
                        this.updated = false
                    });
            }
        }
    };
</script>
