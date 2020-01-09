<template>
  <div>...</div>
</template>
<script>
export default {
  middleware: 'roles/user',

  mounted () {
    this.$router.replace('/dashboard/')
  }
}
</script>
