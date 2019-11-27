<template>
  <div>{{operations.data}}</div>
</template>
<script>
export default {
  async asyncData({ $axios, store }) {
    const request = await $axios.post(
      "http://127.0.0.1:3303/v1/operations/filters",
      {
        ...store.getters["dashboard/globalFilters"]
      }
    );

    const operations = await $axios.post(
      "http://127.0.0.1:3303/v1/operations/get",
      {
        ...request.data,
        ...store.getters["dashboard/globalFilters"],
        offset: 0
      }
    );

    return {
      operations
    };
  }
};
</script>