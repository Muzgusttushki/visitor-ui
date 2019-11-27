<template>
  <div>
    <canvas ref="scena"></canvas>
  </div>
</template>

<script>
import { ThEngine } from "./engine";
export default {
  mounted() {
    this.$nextTick(() => {
      const { scena } = this.$refs;
      this.engine = new ThEngine(scena);

      this.init();
    });
  },

  data() {
    return {
      engine: null
    };
  },

  methods: {
    init() {
      this.engine.addObject("var-1", {
        type: "variable->number",
        value: 50
      });

      this.engine.addObject("var-2", {
        type: "variable->number",
        value: 25
      });

      this.engine.addObject("multiply-1", {
        type: "function->sum",
        arguments: ["var-1", "var-2"]
      });
    }
  }
};
</script>