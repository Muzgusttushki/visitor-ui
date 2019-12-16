import Vue from 'vue'

Vue.use({
  install(vue) {

    vue.prototype.$formatTimeForSend = function({ start, end }) {
      console.log(start, end, 'start, end')
      const day = date => date.getDate();
      const month = date => date.getMonth();
      const year = date => date.getFullYear();

      const fullData = (date, type) => `${type}=${year(date)}&${type}=${month(date)}&${type}=${day(date)}`;
      console.log(fullData(start, 'pdd'), 'full data')
      return String(`?${fullData(start, 'pdd')}&${fullData(end, 'sdd')}`)
    }
  }
})
