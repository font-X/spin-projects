<template>
  <div
    @dragstart.prevent
    :style="jyinputnumber"
    :class="[
      'el-input-number',
      inputNumberSize ? 'el-input-number--' + inputNumberSize : '',
      { 'is-disabled': inputNumberDisabled },
      { 'is-without-controls': !controls },
      { 'is-controls-right': controlsAtRight },
    ]"
  >
    <span
      class="el-input-number__decrease"
      ref="decreasebtn"
      role="button"
      v-if="controls"
      v-repeat-click="decrease"
      :class="{ 'is-disabled': minDisabled }"
      @keydown.enter="decrease"
    >
      <i :class="`el-icon-${controlsAtRight ? 'arrow-down' : 'minus'}`"></i>
    </span>
    <span
      class="el-input-number__increase"
      role="button"
      v-if="controls"
      v-repeat-click="increase"
      :class="{ 'is-disabled': maxDisabled }"
      @keydown.enter="increase"
    >
      <i :class="`el-icon-${controlsAtRight ? 'arrow-up' : 'plus'}`"></i>
    </span>
    <el-input
      ref="input"
      :value="displayValue"
      :placeholder="placeholder"
      :disabled="inputNumberDisabled"
      :size="inputNumberSize"
      readonly
      :max="max"
      :min="min"
      :name="name"
      :label="label"
      @keydown.up.native.prevent="increase"
      @keydown.down.native.prevent="decrease"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @change="handleInputChange"
    >
    </el-input>
  </div>
</template>
<script>
import ElInput from 'element-ui/packages/input'
import Focus from 'element-ui/src/mixins/focus'
import RepeatClick from 'element-ui/src/directives/repeat-click'
export default {
  name: 'ElInputNumber',
  mixins: [Focus('input')],
  inject: {
    elForm: {
      default: '',
    },
    elFormItem: {
      default: '',
    },
  },
  directives: {
    repeatClick: RepeatClick,
  },
  components: {
    ElInput,
  },
  props: {
    // 控件高度,为了适应平板
    height: {
      type: Number,
      default: 37,
    },
    // 计数器步长
    step: {
      type: Number,
      default: 1,
    },
    // 是否只能输入 step 的倍数
    stepStrictly: {
      type: Boolean,
      default: false,
    },
    // 设置计数器允许的最大值
    max: {
      type: Number,
      default: Infinity,
    },
    // 设置计数器允许的最小值
    min: {
      type: Number,
      default: -Infinity,
    },
    // value / v-model    绑定值
    value: {},
    // 是否禁用计数器
    disabled: Boolean,
    // 计数器尺寸    string    large, small
    size: String,
    // 是否使用控制按钮
    controls: {
      type: Boolean,
      default: true,
    },
    // 控制按钮位置    string    right
    controlsPosition: {
      type: String,
      default: '',
    },
    // 原生属性
    name: String,
    // 输入框关联的label文字
    label: String,
    // 输入框默认 placeholder
    placeholder: String,
    // 数值精度
    precision: {
      type: Number,
      validator(val) {
        return val >= 0 && val === parseInt(val, 10)
      },
    },
  },
  data() {
    return {
      currentValue: 0,
      userInput: null,
      jyinputnumber: {
        'line-height': '37px',
      },
    }
  },
  watch: {
    // vaue值变化
    value: {
      // 立即触发
      immediate: true,
      // 自定义函数
      handler(value) {
        let newVal = value === undefined ? value : Number(value)
        if (newVal !== undefined) {
          if (isNaN(newVal)) {
            return
          }
          // 是否只能输入 step 的倍数
          if (this.stepStrictly) {
            const stepPrecision = this.getPrecision(this.step)
            const precisionFactor = Math.pow(10, stepPrecision)
            newVal =
              (Math.round(newVal / this.step) * precisionFactor * this.step) /
              precisionFactor
          }

          if (this.precision !== undefined) {
            newVal = this.toPrecision(newVal, this.precision)
          }
        }
        if (newVal >= this.max) newVal = this.max
        if (newVal <= this.min) newVal = this.min
        this.currentValue = newVal
        this.userInput = null
        this.$emit('input', newVal)
      },
    },
  },
  computed: {
    // 不能小于最小数
    minDisabled() {
      return this._decrease(this.value, this.step) < this.min
    },
    // 不能大于最大数
    maxDisabled() {
      return this._increase(this.value, this.step) > this.max
    },
    numPrecision() {
      const { value, step, getPrecision, precision } = this
      const stepPrecision = getPrecision(step)
      if (precision !== undefined) {
        if (stepPrecision > precision) {
          console.warn(
            '[Element Warn][InputNumber]precision should not be less than the decimal places of step'
          )
        }
        return precision
      } else {
        return Math.max(getPrecision(value), stepPrecision)
      }
    },
    // 控制条在右侧
    controlsAtRight() {
      return this.controls && this.controlsPosition === 'right'
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },
    inputNumberSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    inputNumberDisabled() {
      return this.disabled || (this.elForm || {}).disabled
    },
    displayValue() {
      if (this.userInput !== null) {
        return this.userInput
      }

      let currentValue = this.currentValue

      if (typeof currentValue === 'number') {
        // 如果只能输入 step 的倍数
        if (this.stepStrictly) {
          // 小数点后面几位小数
          const stepPrecision = this.getPrecision(this.step)
          const precisionFactor = Math.pow(10, stepPrecision)
          currentValue =
            (Math.round(currentValue / this.step) *
              precisionFactor *
              this.step) /
            precisionFactor
        }

        if (this.precision !== undefined) {
          currentValue = currentValue.toFixed(this.precision)
        }
      }

      return currentValue
    },
  },
  methods: {
    // 截取为传入的位数
    toPrecision(num, precision) {
      if (precision === undefined) precision = this.numPrecision
      return parseFloat(Number(num).toFixed(precision))
    },
    // 获取小数点后面还有几位
    getPrecision(value) {
      if (value === undefined) return 0
      const valueString = value.toString()
      const dotPosition = valueString.indexOf('.')
      let precision = 0
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1
      }
      return precision
    },
    _increase(val, step) {
      if (typeof val !== 'number' && val !== undefined) return this.currentValue

      const precisionFactor = Math.pow(10, this.numPrecision)
      // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
      return this.toPrecision(
        (precisionFactor * val + precisionFactor * step) / precisionFactor
      )
    },
    // 递减函数
    _decrease(val, step) {
      if (typeof val !== 'number' && val !== undefined) return this.currentValue
      // eg: 10的0.1次方
      const precisionFactor = Math.pow(10, this.numPrecision)

      return this.toPrecision(
        (precisionFactor * val - precisionFactor * step) / precisionFactor
      )
    },
    increase() {
      if (this.inputNumberDisabled || this.maxDisabled) return
      const value = this.value || 0
      const newVal = this._increase(value, this.step)
      this.setCurrentValue(newVal)
    },
    decrease() {
      if (this.inputNumberDisabled || this.minDisabled) return
      const value = this.value || 0
      const newVal = this._decrease(value, this.step)
      this.setCurrentValue(newVal)
    },
    handleBlur(event) {
      this.$emit('blur', event)
    },
    handleFocus(event) {
      this.$emit('focus', event)
    },
    setCurrentValue(newVal) {
      const oldVal = this.currentValue
      if (typeof newVal === 'number' && this.precision !== undefined) {
        newVal = this.toPrecision(newVal, this.precision)
      }
      if (newVal >= this.max) newVal = this.max
      if (newVal <= this.min) newVal = this.min
      if (oldVal === newVal) return
      this.userInput = null
      this.$emit('input', newVal)
      this.$emit('change', newVal, oldVal)
      this.currentValue = newVal
    },
    handleInput(value) {
      this.userInput = value
    },
    handleInputChange(value) {
      const newVal = value === '' ? undefined : Number(value)
      if (!isNaN(newVal) || value === '') {
        this.setCurrentValue(newVal)
      }
      this.userInput = null
    },
    select() {
      this.$refs.input.select()
    },
  },
  mounted() {
    let innerInput = this.$refs.input.$refs.input
    innerInput.setAttribute('role', 'spinbutton')
    innerInput.setAttribute('aria-valuemax', this.max)
    innerInput.setAttribute('aria-valuemin', this.min)
    innerInput.setAttribute('aria-valuenow', this.currentValue)
    innerInput.setAttribute('aria-disabled', this.inputNumberDisabled)
  },
  updated() {
    if (!this.$refs || !this.$refs.input) return
    const innerInput = this.$refs.input.$refs.input
    innerInput.setAttribute('aria-valuenow', this.currentValue)
  },
  //自适应
  created() {
    this.$nextTick(() => {
      this.jyinputnumber['line-height'] = this.height + 'px'
    })
  },
}
</script>
<style lang="scss" scoped>
.el-input-number__decrease {
  background: #36c2cf;
  color: white;
  width: '60px' !important;
}
.el-input-number__increase {
  background: #5372e7;
  color: white;
  width: '60px' !important;
}
.el-input-number__decrease, .el-input-number__increase{
 width: '60px' !important;
 font-size: 16px;
}
.el-input {
  font-size: 16px;
}
>>> .el-input__inner {
  height: 38px;
}
</style>