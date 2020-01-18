<template>
  <div>
    <div>
      <span class="title">Сведения по операции</span>
      <span class="description">"{{data.statuses[status] || 'Заход на сайт'}}"</span>
    </div>
    <div class="step-wrapper">
      <div class="inner">
        <div class="title">URL:</div>
        <div class="description">{{filteredViewerData.url }}</div>
      </div>
    </div>
    <div class="step-wrapper">
      <div class="inner">
        <span class="title">ID:</span>
        <span class="description">{{filteredViewerData._id}}</span>
      </div>
      <div class="inner">
        <span class="title">ФИО:</span>
        <span class="description">{{filteredViewerData.name}}</span>
      </div>
      <div class="inner">
        <span class="title">Дата визита:</span>
        <span
          class="description"
        >{{handleDate(filteredViewerData.date, "{D}.{MM}.{Y} {H}:{M}") }}</span>
      </div>
      <div class="inner">
        <span class="title">Email:</span>
        <span class="description">{{filteredViewerData.email}}</span>
      </div>
      <div class="inner">
        <span class="title">Телефон:</span>
        <span class="description">{{filteredViewerData.phone}}</span>
      </div>
    </div>
    <div class="step-wrapper" v-if="filteredViewerData.utmTags">
      <div
        v-for="(utmKey, utmID) in Object.keys(filteredViewerData.utmTags)"
        :key="utmID"
        class="inner"
      >
        <span class="title">{{utmKey}}:</span>
        <span
          class="description"
        >{{filteredViewerData.utmTags[utmKey]}}</span>
      </div>
    </div>
    <div class="step-wrapper">
      <div class="inner">
        <span class="title">Yandex:</span>
        <span
          class="description"
        >{{filteredViewerData.analytics.yandex }}</span>
      </div>
      <div class="inner">
        <span class="title">Google:</span>
        <span
          class="description"
        >{{filteredViewerData.analytics.google }}</span>
      </div>
      <div class="inner">
        <span class="title">Facebook:</span>
        <span
          class="description"
        >{{filteredViewerData.analytics.facebook}}</span>
      </div>
      <div class="inner">
        <span class="title">Visitor:</span>
        <span
          class="description"
        >{{filteredViewerData.analytics.vis}}</span>
      </div>
    </div>
    <div class="step-wrapper">
      <div class="inner">
        <span class="title">Браузер:</span>
        <span
          class="description"
        >{{filteredViewerData.browser.name}}</span>
      </div>
      <div class="inner">
        <span class="title">Версия:</span>
        <span
          class="description"
        >{{filteredViewerData.browser.version}}</span>
      </div>
      <div class="inner">
        <span class="title">ОС:</span>
        <span class="description">{{filteredViewerData.os.name}}</span>
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
  },
  computed: {
    filteredViewerData() {
      const data = this.data.viewer;
      return {
        utmTags: {
          ...this.$utils.filterObjectProps(data.utm.tags, '-')
        },
        browser: {
          ...this.$utils.filterObjectProps(data.browser, '-')
        },
        analytics: {
          ...this.$utils.filterObjectProps(data.analytics, '-')
        },
        url: data.url ? data.url : '-',
        _id: data._id ? data._id : '-',
        name: data.name ? data.name : '-',
        date: data.date ? this.$times({ time: data.date, format: '{D}.{MM}.{Y} {H}:{M}' }) : '-',
        email: data.email ? data.email : '-',
        phone: data.phone ? data.phone : '-',
        os : { name: data.os.name ? data.os.name : '-' }
      }
    }
  },
}
</script>

<style scoped lang="scss">

</style>