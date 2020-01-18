import Vue from 'vue';

Vue.use({
  install(vue) {
    vue.prototype.$utils = {
      filterObjectProps(obj, emptyValue) {
        const checked = {};
        for (let prop in obj) {
          if (obj[prop]) checked[prop] = obj[prop]
          else if (emptyValue) checked[prop] = emptyValue;
        }
        return checked;
      }
    }
  }
})