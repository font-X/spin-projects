<template>
  <div
    :class="[
      type === 'textarea' ? 'el-textarea' : 'el-input',
      inputSize ? 'el-input--' + inputSize : '',
      {
        'is-disabled': inputDisabled,
        'el-input-group': $slots.prepend || $slots.append,
        'el-input-group--append': $slots.append,
        'el-input-group--prepend': $slots.prepend,
        'el-input--prefix': $slots.prefix || prefixIcon,
        'el-input--suffix': $slots.suffix || suffixIcon || clearable,
      },
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <!--当type的值不等于textarea时-->
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="el-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <!--核心部分：输入框-->
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="el-input__inner"
        v-bind="$attrs"
        :style="{
          color:
            msgType == 'success'
              ? '#67c23a'
              : msgType == 'error'
              ? '#f56c6c'
              : '#e6a23c',
        }"
        :type="type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autoComplete || autocomplete"
        :value="currentValue"
        ref="input"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      />

      <!-- input框内的头部的内容 -->
      <span class="el-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <!--prefixIcon头部图标存在时，显示i标签-->
        <i class="el-input__icon" v-if="prefixIcon" :class="prefixIcon"></i>
      </span>
      <!-- input框内的尾部的内容 -->
      <span
        class="el-input__suffix"
        v-if="
          $slots.suffix ||
          suffixIcon ||
          showClear ||
          (validateState && needStatusIcon)
        "
      >
        <span class="el-input__suffix-inner">
          <!--showClear为false时，显示尾部图标-->
          <template v-if="!showClear">
            <slot name="suffix"></slot>
            <i class="el-input__icon" v-if="suffixIcon" :class="suffixIcon"></i>
          </template>
          <!--showClear为true时，显示清空图标-->
          <i
            v-else
            class="el-input__icon el-icon-circle-close el-input__clear"
            @click="clear"
          ></i>
        </span>
        <!--这里应该是跟表单的校验相关，根据校验状态显示对应的图标-->
        <i
          class="el-input__icon"
          v-if="validateState"
          :class="['el-input__validateIcon', validateIcon]"
        ></i>
      </span>
      <!-- 后置元素 -->
      <div class="el-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
   
   
    </template>
    <!--当type的值等于textarea时-->
    <textarea
      v-else
      :tabindex="tabindex"
      class="el-textarea__inner"
      :value="currentValue"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @input="handleInput"
      ref="textarea"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autoComplete || autocomplete"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    >
    </textarea>
  </div>
</template>
<script>
import emitter from 'element-ui/src/mixins/emitter'
import Migrating from 'element-ui/src/mixins/migrating'

import merge from 'element-ui/src/utils/merge'
import { isKorean } from 'element-ui/src/utils/shared'

export default {
  name: 'ElInput',

  componentName: 'ElInput',

  mixins: [emitter, Migrating],

  inheritAttrs: false,

  inject: {
    elForm: {
      default: '',
    },
    elFormItem: {
      default: '',
    },
  },

  data() {
    return {
      currentValue:
        this.value === undefined || this.value === null ? '' : this.value,
      textareaCalcStyle: {},
      hovering: false,
      focused: false,
      isOnComposition: false,
      valueBeforeComposition: null,
    }
  },

  props: {
    value: [String, Number], //绑定值
    size: String, //输入框尺寸，只在type!="textarea" 时有效
    resize: String, //控制是否能被用户缩放
    form: String,
    disabled: Boolean, //禁用
    readonly: Boolean,
    type: {
      //类型texttextarea和其他原生input的type值
      type: String,
      default: 'textarea',
    },
    autosize: {
      //自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }
      type: [Boolean, Object],
      default: false,
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== 'production' &&
          console.warn(
            "[Element Warn][Input]'auto-complete' property will be deprecated in next major version. please use 'autocomplete' instead."
          )
        return true
      },
    },
    validateEvent: {
      //输入时是否触发表单的校验
      type: Boolean,
      default: true,
    },
    suffixIcon: String, //输入框尾部图标
    prefixIcon: String, //输入框头部图标
    label: String, //输入框关联的label文字
    clearable: {
      //是否可清空
      type: Boolean,
      default: false,
    },
    tabindex: String, //输入框的tabindex
    msgType: {
      //字体颜色
      type: String,
      default: 'warning', // success  #67c23a  warning  #e6a23c error #f56c6c
    },
  },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },
    //校验状态
    validateState() {
      return this.elFormItem ? this.elFormItem.validateState : ''
    },
    needStatusIcon() {
      return this.elForm ? this.elForm.statusIcon : false
    },
    validateIcon() {
      return {
        validating: 'el-icon-loading',
        success: 'el-icon-circle-check',
        error: 'el-icon-circle-close',
      }[this.validateState]
    },
    //textarea的样式
    textareaStyle() {
      return merge({}, this.textareaCalcStyle, { resize: this.resize })
    },
    //输入框尺寸，只在 type!="textarea" 时有效
    inputSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    //input是否被禁用
    inputDisabled() {
      return this.disabled || (this.elForm || {}).disabled
    },
    //是否显示清空按钮
    showClear() {
      // clearable属性为true，即用户设置了显示清空按钮的属性；并且在非禁用且非只读状态下才且当前input的value不是空且该input获得焦点或者鼠标移动上去才显示
      return (
        this.clearable &&
        !this.inputDisabled &&
        !this.readonly &&
        this.currentValue !== '' &&
        (this.focused || this.hovering)
      )
    },
  },

  watch: {
    value(val, oldValue) {
      this.setCurrentValue(val)
    },
  },

  methods: {
    focus() {
      ;(this.$refs.input || this.$refs.textarea).focus()
    },
    blur() {
      ;(this.$refs.input || this.$refs.textarea).blur()
    },
    getMigratingConfig() {
      return {
        props: {
          icon: 'icon is removed, use suffix-icon / prefix-icon instead.',
          'on-icon-click': 'on-icon-click is removed.',
        },
        events: {
          click: 'click is removed.',
        },
      }
    },
    handleBlur(event) {
      this.focused = false
      this.$emit('blur', event)
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue])
      }
    },
    select() {
      ;(this.$refs.input || this.$refs.textarea).select()
    },
    resizeTextarea() {
      if (this.$isServer) return
      //autosize自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }
      const { autosize, type } = this
      if (type !== 'textarea') return
      //如果没设置自适应内容高度
      if (!autosize) {
        this.textareaCalcStyle = {
          //高度取文本框的最小高度
          // minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        }
        return
      }
      const minRows = autosize.minRows
      const maxRows = autosize.maxRows
      //如果设置了minRows和maxRows需要计算文本框的高度
      // this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
    },
    handleFocus(event) {
      this.focused = true
      this.$emit('focus', event)
    },
    handleComposition(event) {
      // 如果中文输入已完成
      if (event.type === 'compositionend') {
        //  isOnComposition设置为false
        this.isOnComposition = false
        this.currentValue = this.valueBeforeComposition
        this.valueBeforeComposition = null
        //触发input事件，因为input事件是在compositionend事件之后触发，这时输入未完成，不会将值传给父组件，所以需要再调一次input方法
        this.handleInput(event)
      } else {
        //如果中文输入未完成
        const text = event.target.value
        const lastCharacter = text[text.length - 1] || ''
        //isOnComposition用来判断是否在输入拼音的过程中
        this.isOnComposition = !isKorean(lastCharacter)
        if (this.isOnComposition && event.type === 'compositionstart') {
          //  输入框中输入的值赋给valueBeforeComposition
          this.valueBeforeComposition = text
        }
      }
    },
    handleInput(event) {
      const value = event.target.value
      //设置当前值
      this.setCurrentValue(value)
      //如果还在输入中，将不会把值传给父组件
      if (this.isOnComposition) return
      //输入完成时，isOnComposition为false，将值传递给父组件
      this.$emit('input', value)
    },
    handleChange(event) {
      this.$emit('change', event.target.value)
    },
    setCurrentValue(value) {
      // 输入中，直接返回
      if (this.isOnComposition && value === this.valueBeforeComposition) return
      this.currentValue = value
      if (this.isOnComposition) return
      //输入完成,设置文本框的高度
      this.$nextTick(this.resizeTextarea)
      if (this.validateEvent && this.currentValue === this.value) {
        this.dispatch('ElFormItem', 'el.form.change', [value])
      }
    },
    calcIconOffset(place) {
      let elList = [].slice.call(
        this.$el.querySelectorAll(`.el-input__${place}`) || []
      )
      if (!elList.length) return
      let el = null
      for (let i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i]
          break
        }
      }
      if (!el) return
      const pendantMap = {
        suffix: 'append',
        prefix: 'prepend',
      }

      const pendant = pendantMap[place]
      if (this.$slots[pendant]) {
        el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${
          this.$el.querySelector(`.el-input-group__${pendant}`).offsetWidth
        }px)`
      } else {
        el.removeAttribute('style')
      }
    },
    updateIconOffset() {
      this.calcIconOffset('prefix')
      this.calcIconOffset('suffix')
    },
    //清空事件
    clear() {
      //父组件的value值变成了空，更新父组件中v-model的值
      this.$emit('input', '')
      //触发了父组件的change事件，父组件中就可以监听到该事件
      this.$emit('change', '')
      //触发了父组件的clear事件
      this.$emit('clear')
      //更新当前的currentValue的值
      this.setCurrentValue('')
    },
  },

  created() {
    this.$on('inputSelect', this.select)
  },

  mounted() {
    this.resizeTextarea()
    this.updateIconOffset()
  },

  updated() {
    this.$nextTick(this.updateIconOffset)
  },
}
</script>
<style lang="scss" scoped>
.comimgrt{
  widows: 50px;
  height: 50px;
  float: left;
}
</style>