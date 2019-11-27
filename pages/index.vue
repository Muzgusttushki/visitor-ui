<template>
  <div>...</div>
</template>
<script>
export default {
  layout: 'dashboard',
  middleware: 'roles/user',

  mounted () {
    this.$router.replace('/dashboard/')
  }
}
</script>
