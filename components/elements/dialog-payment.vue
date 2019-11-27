<template>
  <el-dialog :visible.sync="visible" title="Карточка транзакции">
    <div class="wrapper">
      <div class="dialogInfo user">
        <div class="dialogInfo__title">Пользователь</div>
        <div class="dialogInfo__container">
          <div class="item">
            <span class="item__name">ID:</span>
            {{data['_id'] || '-'}}
          </div>
          <div class="item">
            <span class="item__name">ФИО:</span>
            {{data['userName'] || '-'}}
          </div>
          <div class="item">
            <span class="item__name">Дата визита:</span>
            {{this.$times({
              time: String(data['date']),
              format: '{Y}.{MM}.{D} {H}:{M}'
            }) || '-'}}
          </div>
          <div class="item">
            <span class="item__name">Email:</span>
            {{data['userEmail'] || '-'}}
          </div>
          <div class="item">
            <span class="item__name">Телефон:</span>
            {{data['userPhone'] || '-'}}
          </div>
          <div class="separator"></div>
          <div v-if="this.utm">
            <div class="item">
              <span class="item__name">UTM_source:</span>
              <span>{{this.utm['utm_source'] || '-'}}</span>
            </div>
            <div class="item">
              <span class="item__name">UTM_medium:</span>
              <span>{{this.utm['utm_medium'] || '-'}}</span>
            </div>
            <div class="item">
              <span class="item__name">UTM_campaign:</span>
              <span>{{this.utm['utm_campaign'] || '-'}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="dialogInfo geo">
        <div class="dialogInfo__title">Геоданные</div>
        <div class="dialogInfo__container">
          <div class="item">
            <span class="item__name">Страна:</span>
            {{data['county'] || '-'}}
          </div>
          <div class="item">
            <span class="item__name">Регион:</span>
            {{data['region'] || '-'}}
          </div>
          <div class="item">
            <span class="item__name">Город:</span>
            {{data['city'] || '-'}}
          </div>
          <div class="item">
            <span class="item__name">Координаты:</span> -
          </div>
          <div class="item">
            <span class="item__name">Часовой пояс:</span>
            {{data['timezone'] || '-'}}
          </div>
          <div class="item">
            <span class="item__name">Zip code:</span>
            {{data['zip'] || '-'}}
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
            {{data['browser']['name'] || '-'}}
          </div>
          <div class="item">
            <span class="item__name">Версия:</span>
            {{data['browser']['version'] || '-'}}
          </div>
          <div class="item">
            <span class="item__name">ОС:</span>
            {{data['os']['name'] || '-'}}
          </div>
          <div class="item">
            <span class="item__name">Версия:</span>
            {{data['os']['arch'] || '-'}}
          </div>
        </div>
      </div>
      <div class="dialogInfo event">
        <div class="dialogInfo__title">Событие</div>
        <div class="dialogInfo__container">
          <div class="item">
            <span class="item__name">Дата события:</span>
            <span v-if="data['dataEvent']">
              {{this.$times({
                time: data['dataEvent'],
                format: '{Y}.{MM}.{D} {H}:{M}'
              })}}
            </span>
            <span v-else>-</span>
          </div>
          <div class="item">
            <span class="item__name">Кол-во билетов:</span>
            {{data['tickets'] || '-'}}
          </div>
          <div class="item">
            <span class="item__name">Посадка:</span>
            {{String(data.seats) || '-'}}
          </div>
          <div class="item">
            <span class="item__name">Места:</span> -
          </div>
          <div class="item">
            <span class="item__name">Помокод:</span> -
          </div>
          <div class="item">
            <span class="item__name">Источник:</span>
            {{data['source'] || '-'}}
          </div>
          <div class="item">
            <span class="item__name">URL:</span>
            {{ (data['utm'] ? data['utm']['source']: data['source']) || '-'}}
          </div>
          <div class="item">
            <span class="item__name">Товар:</span>
            {{data['nameEvent'] || '-'}}
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['data', 'visible'],
  data() {
    return {
      utm: this.data.utm.tags || null
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

      .user, .cook {
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

          .separator {
            // height: 1px;
            width: 80%;
            margin:7px 0 7px 10px;
            border: 1px solid #F3F6FB;
          }

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
