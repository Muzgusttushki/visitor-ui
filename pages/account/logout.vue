<template v-loading="loading">
  <el-container>
    wait...
  </el-container>
</template>
<script>
export default {

  data () {
    return {
      loading: true
    }
  },
  mounted () {
    this.$nextTick(async () => {
      await this.$store.dispatch('account/exit')
      this.loading = false

      this.$router.replace('/')
    })
  }
}
</script>
