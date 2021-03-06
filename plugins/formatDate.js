import Vue from 'vue'

Vue.use({
  install(vue) {

    vue.prototype.$formatDate = function(start, end) {
      console.log('format date function')
      start = new Date(start);
      end = new Date(end);
      const day = date => date.getDate();
      const month = date => date.getMonth();
      const year = date => date.getFullYear();

      const fullData = (date, type) => `${type}=${year(date)}&${type}=${month(date)}&${type}=${day(date)}`;
      return String(`?${fullData(start, 'pdd')}&${fullData(end, 'sdd')}`)
    }
  }
})