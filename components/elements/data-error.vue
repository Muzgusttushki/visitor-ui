<template>
  <div :style="`display: ${displayError}`">
    <el-alert
      @close="close"
      title="Ошибка!"
      type="error"
      description="Что то пошло не так! Попробуйте перезагрузить страницу."
      show-icon> 
    </el-alert>
  </div>
</template>

<script>
export default {
  computed: {
    displayError() {
      return this.$requestHandlerData.error == true ? 'block' : 'none'
    }
  },
  methods: {
    close() {
      this.$requestHandlerData.error = false
    }
  }
}
</script>

<style lang="scss">
.el-alert {
  box-shadow: 0px 5px 60px rgba(92, 118, 143, 0.32);
  width: 450px;
  height: 100px;
  right: 10px;
  top: 10px;
  background: white;
  position: fixed;
  z-index: 12;
}
</style>
