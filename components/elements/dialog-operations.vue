<template>
  <div>
    <el-dialog title="Карточка операции" :visible.sync="visbl">
      <div class="wrapper">
        <div class="dialogInfo main">
          <div class="dialogInfo__title">Основные</div>
          <div class="dialogInfo__container">
            <div class="item">
              <span class="item__name">ID:</span>
              {{data['_id']}}
            </div>
            <div class="item">
              <span class="item__name">Дата визита:</span>
              {{this.$times({
              time: data['date'],
              format: "{Y}-{MM}-{D} {H}:{M}"
              })}}
            </div>
            <!-- ---------------------------UTM------------------------------------ -->
            <div v-if="this.utm">
              <div class="item" v-for="(id, item) in this.utm" :key="id">
                <span class="item__name">{{item}}: </span><span>{{id}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="dialogInfo geo">
          <div class="dialogInfo__title">Геоданные</div>
          <div class="dialogInfo__container">
            <div class="item" v-if="data['country']">
              <span class="item__name">Страна:</span>
              {{data['country']}}
            </div>
            <div class="item" v-if="data['region']">
              <span class="item__name">Регион:</span>
              {{data['region']}}
            </div>
            <div class="item" v-if="data['city']">
              <span class="item__name">Город:</span>
              {{data['city']}}
            </div>
            <div class="item" v-if="data['']">
              <span class="item__name">Координаты:</span> N/A
            </div>
            <div class="item" v-if="data['timezone']">
              <span class="item__name">Часовой пояс:</span>
              {{data['timezone']}}
            </div>
            <div class="item" v-if="data['zip']">
              <span class="item__name">Zip code:</span>
              {{data['zip']}}
            </div>
            <div class="item" v-if="data['address']">
              <span class="item__name">Ip:</span>
              {{data['address']}}
            </div>
          </div>
        </div>
        <div class="dialogInfo cook">
          <div class="dialogInfo__title">Cookie</div>
          <div class="dialogInfo__container">
            <div class="item">
              <span class="item__name">Yandex:</span>
              {{data['cookies']['yandex'] || '-'}}
            </div>
            <div class="item">
              <span class="item__name">Google:</span>
              {{data['cookies']['google'] || '-'}}
            </div>
            <div class="item">
              <span class="item__name">Facebook:</span>
              {{data['cookies']['facebook'] || '-'}}
            </div>
          </div>
        </div>
        <div class="dialogInfo browser">
          <div class="dialogInfo__title">Браузер и ОС</div>
          <div class="dialogInfo__container">
            <div class="item">
              <span class="item__name">Браузер:</span>
              {{data['browser']['name']}}
            </div>
            <div class="item">
              <span class="item__name">Версия:</span>
              {{data['browser']['version']}}
            </div>
            <div class="item">
              <span class="item__name">ОС:</span>
              {{data['os']['name']}}
            </div>
            <div class="item">
              <span class="item__name">Версия:</span>
              {{data['os']['arch']}}
            </div>
          </div>
        </div>
        <div class="dialogInfo event">
          <div class="dialogInfo__title">Событие</div>
          <div class="dialogInfo__container">
            <div class="item" v-if="data['dateEvent']">
              <span class="item__name">Дата события:</span>
              {{this.$times({
              time: data['dateEvent'],
              format: "{Y}-{MM}-{D} {H}:{M}:{S}",
              timezone: data['timezone']
              })}}
            </div>
            <div class="item">
              <span class="item__name">Домен:</span>
              {{ data['source'] }}
            </div>
            <div class="item">
              <span class="item__name">Источник:</span>
              {{ data['utm']['source'] || data['source'] }}
            </div>
            <div class="item">
              <span class="item__name">Товар:</span>
              {{ data['nameEvent'] }}
            </div>
            <div class="item">
              <span class="item__name">URL:</span>
              {{ data['url'] }}
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        props: ['data', 'visible'],
        data() {
            return {
                visbl: this.visible,
                utm: {...this.data.utm.tags} || null
            }
        },
        watch: {
            visbl() {
                this.$emit('closeDialog')
            }
        }
    }
</script>

<style lang="scss">
  .el-dialog__wrapper {

    .el-dialog {
      width: 570px;
      border-radius: 10px;

      &__header {
        padding-bottom: 16px;
      }

      &__title {
        color: #333333;
        font-weight: bold;
        font-size: 16px;
        font-style: normal;
      }

      &__body {
        padding: 0 20px 30px;
      }

      .wrapper {
        display: flex;
        flex-flow: row wrap;

        .main, .cook {
          width: 60%;

          .dialogInfo__title {
            border-radius: 4px 0 0 4px;
          }
        }

        .geo, .browser {
          width: 40%;

          .dialogInfo__title {
            border-radius: 0 4px 4px 0;
          }
        }

        .event {
          width: 100%;

          .dialogInfo__title {
            border-radius: 4px;
          }
        }

        .dialogInfo {

          &__title {
            background: rgba(196, 210, 234, 0.2);
            font-weight: 500;
            font-size: 13px;
            color: #333333;
            padding: 10px;
          }

          &__container {
            margin: 10px 0;
            font-size: 13px;

            .item {
              color: #333333;
              padding: 7px 0 7px 10px;

              &__name {
                color: #5C768F;
              }
            }
          }
        }
      }
    }
  }
</style>
