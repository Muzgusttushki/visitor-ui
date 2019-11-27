<template>
  <div>
    <div v-if="loading">
      <!-- <div v-if="userDetails"> -->
        
      <!-- </div>
      <div v-else>
        SERVER ERROR
      </div> -->
    </div>
    <div v-else>
      <loading-square class="loading" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userDetails: null,
      loading: true
    }
  },

  methods: {
    async initDetails() {
      this.userDetails = null
      this.loading = true

      const userInfo = await this.$store.dispatch('payment/getUserDetails', this.$router.currentRoute.params.id)
      if(userInfo) {
        this.userDetails = userInfo
      }
      
      this.loading = false
    }
  }
}
</script>

<style scoped>
</style>
