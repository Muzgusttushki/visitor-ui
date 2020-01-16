<template>
  <div>
    <div>
      <span class="title">Сведения по операции</span>
      <span class="description">"{{data.statuses[status] || 'Заход на сайт'}}"</span>
    </div>
    <div class="step-wrapper">
      <div class="inner">
        <div class="title">URL:</div>
        <div class="description">{{data.viewer.url || '-'}}</div>
      </div>
    </div>
    <div class="step-wrapper">
      <div class="inner">
        <span class="title">ID:</span>
        <span class="description">{{data.viewer._id|| '-'}}</span>
      </div>
      <div class="inner">
        <span class="title">ФИО:</span>
        <span class="description">{{data.viewer.name|| '-'}}</span>
      </div>
      <div class="inner">
        <span class="title">Дата визита:</span>
        <span
          class="description"
        >{{handleDate(data.viewer.date, "{D}.{MM}.{Y} {H}:{M}") || '-'}}</span>
      </div>
      <div class="inner">
        <span class="title">Email:</span>
        <span class="description">{{data.viewer.email|| '-'}}</span>
      </div>
      <div class="inner">
        <span class="title">Телефон:</span>
        <span class="description">{{data.viewer.phone|| '-'}}</span>
      </div>
    </div>
    <div class="step-wrapper" v-if="data.viewer.utm.tags">
      <div
        v-for="(utmKey, utmID) in Object.keys(data.viewer.utm.tags)"
        :key="utmID"
        class="inner"
      >
        <span class="title">{{utmKey}}:</span>
        <span
          class="description"
        >{{data.viewer.utm.tags[utmKey]}}</span>
      </div>
    </div>
    <div class="step-wrapper">
      <div class="inner">
        <span class="title">Yandex:</span>
        <span
          class="description"
        >{{data.viewer.analytics.yandex || '-'}}</span>
      </div>
      <div class="inner">
        <span class="title">Google:</span>
        <span
          class="description"
        >{{data.viewer.analytics.google || '-'}}</span>
      </div>
      <div class="inner">
        <span class="title">Facebook:</span>
        <span
          class="description"
        >{{data.viewer.analytics.facebook|| '-'}}</span>
      </div>
      <div class="inner">
        <span class="title">Visitor:</span>
        <span
          class="description"
        >{{data.viewer.analytics.vis|| '-'}}</span>
      </div>
    </div>
    <div class="step-wrapper">
      <div class="inner">
        <span class="title">Браузер:</span>
        <span
          class="description"
        >{{data.viewer.browser.name|| '-'}}</span>
      </div>
      <div class="inner">
        <span class="title">Версия:</span>
        <span
          class="description"
        >{{data.viewer.browser.version|| '-'}}</span>
      </div>
      <div class="inner">
        <span class="title">ОС:</span>
        <span class="description">{{data.viewer.os.name|| '-'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OperationDetail',
  props: ['data', 'status'],
  methods: {
    handleDate(time, format) {
      return this.$times({ time: String(time), format: String(format) });
    }
  }
}
</script>

<style scoped lang="scss">

</style>