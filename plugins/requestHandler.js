import Vue from 'vue'

Vue.use({
  install(vue) {
    const store = new Vue({data: {error: false}})
    vue.prototype.$requestHandler = async function(request) {
      try {
        return await request
      } catch(e) {
        store.$data.error = true
        console.log(e)
        return false
      }
    }
    vue.prototype.$requestHandlerData = store.$data
  }
})