<template>
  <div class="__th_dropdown">
    <div class="action">
      <span
        class="__trigger_button_sbow_or_hide_0190"
        @click="trigger == 'click' && handleActions()"
        @dblclick="trigger == 'doubleclick' && handleActions()"
        @mouseenter="trigger == 'focus' && handleActions()"
        ref="action"
      >
        <slot v-if="true" name="action">
          <button class="__default_button"></button>
        </slot>
      </span>
    </div>
    <div
      class="window __trigger_element_hide_0190"
      :style="windowStyles"
      ref="window"
      v-show="enable"
    >
      <span class="closable" @click="cancel">x</span>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        props: {
            hideByDefault: {type: Boolean, default: true},
            trigger: {type: String, default: "click"},
            enable: {type: Boolean, default: false}
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


                this.$emit("update:enable", true);
                const {width} = this.$refs.action.getBoundingClientRect();

                this.$nextTick(() => {
                    this.windowStyles = {
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
        },

        data() {
            return {
                visible: false,
                windowStyles: {
                    marginLeft: `90px`
                }
            };
        }
    };
</script>
<style lang="scss" scoped>
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
      padding: 20px;
      border-radius: 8px;
      position: absolute;
      box-shadow: 0px 5px 60px rgba(92, 118, 143, 0.32);

      &.__trigger_element_hide_0190 {
        z-index: 2;
      }

      .closable {
        float: right;
        cursor: pointer;
        margin: -5px 0 0 0;
        text-align: center;
        font-size: 15px;
        height: 20px;
        width: 20px;
        padding: 10px 0;
      }
    }

    .content {
      width: 300px;
    }
  }
</style>
