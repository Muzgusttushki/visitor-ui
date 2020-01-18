<template>
  <div class="__th_dropdown">
    <div class="action">
      <span
        class="__trigger_button_sbow_or_hide_0190"
        @click.prevent="trigger == 'click' && handleActions()"
        @dblclick="trigger == 'doubleclick' && handleActions()"
        @mouseenter="trigger == 'focus' && handleActions()"
        ref="action"
      >
        <slot v-if="true" name="action">
          <button class="__default_button"></button>
        </slot>
      </span>
    </div>
    <!-- <transition name="fade"> --> <!-- does not work -->
      <div
        class="window __trigger_element_hide_0190"
        :style="windowStyles"
        ref="window"
        v-if="enable"
      >
        <div class="content">
          <span class="closable" @click="cancel">x</span>
          <slot></slot>
        </div>
      </div>
    <!-- </transition> -->
  </div>
</template>
<script>
export default {
  props: {
    hideByDefault: {type: Boolean, default: true},
    trigger: {type: String, default: "click"},
    enable: {type: Boolean, default: false}
  },
    
  data() {
    return {
      visible: false,
      windowStyles: {
        marginLeft: `90px`
      }
    };
  },

  mounted() {
    this.$emit("update:enable", false);
    document.addEventListener("click", this.listener);
  },

  destroyed() {
    document.removeEventListener("click", this.listener);
  },

  methods: {
    handleActions(e) {
      this.$emit("update:enable", !this.enable);
      if (this.enable) return null;
      const {width} = this.$refs.action.getBoundingClientRect();
      this.$nextTick(() => {
        this.windowStyles = {
          marginTop: `15px`,
          marginLeft: `${width - this.$refs.window.offsetWidth}px`
        };
      });
    },

    cancel() {
      this.$emit("update:enable", false);
    },

    listener(event) {
      if (this.enable) {
        const sources = event.path || event.composedPath();

        const dropdownFilters = sources.filter(resolve => {
          return (
            resolve._prevClass == "window __trigger_element_hide_0190" ||
            resolve._prevClass == "__trigger_button_sbow_or_hide_0190"
          );
        });

        if (!dropdownFilters.length) {
          this.$emit("update:enable", false);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .__th_dropdown {
    .action {
      .__default_button {
        width: 150px;
        font-size: 14px;
        padding: 8px;
        border-radius: 8px;
        outline: none;
      }
    }

    .window {
      min-width: 220px;
      background-color: white;
      z-index: 1;
      border-radius: 8px;
      position: absolute;
      box-shadow: 0px 5px 60px rgba(92, 118, 143, 0.32);
      padding: 10px;

      &.__trigger_element_hide_0190 {
        z-index: 2;
      }

      .closable {
        z-index: 10;
        float: right;
        cursor: pointer;
        margin: -5px 0 0 0;
        text-align: center;
        font-size: 15px;
        height: 20px;
        width: 20px;
        padding: 10px 0;
        position: absolute;
        right: 30px;
      }
    }

    .content {
      padding: 20px;
      width: 300px;
      max-height: 450px;
      overflow: auto;
      border: 1px solid #f1f1f1;

      /* width */
      &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #888;
      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

      scrollbar-color: #888 #f1f1f1;
      scrollbar-width: thin;
    }
  }
</style>
