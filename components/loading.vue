<template lang="html">
  <div v-if="loading" class="page-loader">
    <p>Загрузка...</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
  .page-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
    opacity: 0.5;
    z-index: 99;
    color: white;
  }
</style>
