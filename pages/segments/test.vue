<template>
  <div>{{state}}</div>
</template>
<script>
export default {

  async asyncData({axios}) {
    const request = await axios.get(`${process.env.address}/v1/segments/test`)

    return {
      state: request.data
    }
  }
};
</script>