<template>
  <div>
    {{ test }}
    <el-select ref="element" v-model="value" placeholder="Select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>
<script>
export default {
  data () {
    return {
      options: [{
        value: 'Option1',
        label: 'Option1'
      }, {
        value: 'Option2',
        label: 'Option2'
      }, {
        value: 'Option3',
        label: 'Option3'
      }, {
        value: 'Option4',
        label: 'Option4'
      }, {
        value: 'Option5',
        label: 'Option5'
      }, {
        value: 'Option51',
        label: 'Option5'
      }, {
        value: 'Option25',
        label: 'Option5'
      }, {
        value: 'Option35',
        label: 'Option5'
      }, {
        value: 'Option45',
        label: 'Option5'
      }],
      value: '',
      el: null
    }
  },
  computed: {
    test () {
      if (this.el) {
        const { moveX, moveY } = this.el
        return { moveX, moveY }
      }

      return null
    }
  },
  mounted () {
    console.log(this.$refs.element)
    this.el = this.$refs.element.$refs.scrollbar
  }
}
</script>
