<template>
  <el-container>
    <div style="width:400px; height: 600px; display:-webkit-inline-box" ref="json"></div>
    <div v-loading="loading" style="width:400px; height: 600px;" ref="state"></div>
    <div>
      <el-button @click="handleSegment">build</el-button>
    </div>
  </el-container>
</template>
<script>
import jsoneditor from "jsoneditor";
export default {
  mounted() {
    this.$nextTick(() => {
      this.editor = new jsoneditor(this.$refs.json, { });

      // set json
      const initialJson = {
        info: {},
        query: {
          filters: [
            {
              search: "and",
              design: {
                eq: [
                  {
                    status: "WIDGET_LAZY"
                  }
                ]
              }
            }
          ]
        }
      };

      this.editor.set(initialJson);
      this.handleSegment();
    });
  },

  data() {
    return {
      editor: null,
      state: null,
      loading: false
    };
  },

  methods: {
    async handleSegment() {
      this.loading = true;

      if (!this.state) {
        this.state = new jsoneditor(this.$refs.json, { mode: "view" });
      }

      const { data } = await this.$axios.post(
        `${process.env.address}/v1/segments/compile`,
        this.editor.get()
      );

      this.state.set({...data});

      this.loading = false;
    }
  }
};
</script>
<style lang="scss">
@import "jsoneditor/dist/jsoneditor.min.css";
</style>
