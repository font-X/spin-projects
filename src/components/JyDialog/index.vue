<template>
  <div>
    <el-dialog
      :top="'5px'"
      append-to-body
      :close-on-click-modal="false"
      v-bind="$attrs"
      :visible.sync="tempVisible"
      v-on="$listeners"
      v-dialogDrag="isDrag"
      center
      :fullscreen="fullscreen"
      :show-close="realShowClose"
      :title="title"
    >
      <template v-slot:title v-if="$slots.title">
        <slot name="title"></slot>
      </template>
      <template v-slot:title v-else>
        <el-row>
          <el-col :span="16">
            <label class="title">{{ title }}</label>
          </el-col>
          <el-col :span="8" align="right">
            <div class="icons">
              <i
                :class="
                  fullscreen
                    ? ' el-icon-copy-document'
                    : 'el-icon el-icon-full-screen'
                "
                @click="toggleFullscreen"
              ></i>
              <i class="el-icon el-icon-close" @click="closeDialog"></i>
            </div>
          </el-col>
        </el-row>
      </template>
      <div class="jy-win-dialog" v-if="$slots.default" :style="d_Style">
        <slot></slot>
        <!-- <main-content :activeNav="params.activeNav" ></main-content> -->
      </div>
      <template v-slot:footer v-if="$slots.footer">
        <slot name="footer"></slot>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'JyDialog',
  props: {
    visible: Boolean,
    autofill: {
      default: true,
      type: Boolean,
    },
    isDrag: {
      type: Boolean,
      default: true,
    },
    isDragWidth: {
      type: Boolean,
      default: true,
    },
    fullscreen: Boolean,
    showClose: Boolean,
    title: String,
  },
  components: {},
  data: function () {
    return {
      tempVisible: this.visible,
      realShowClose: this.showClose,
    }
  },
  created() {
    if (!this.$slots.title) {
      this.realShowClose = false
    }
  },
  computed: {
    menuName() {
      return (
        (this.params &&
          this.params.activeNav &&
          this.params.activeNav.MenuName) ||
        '页面'
      )
    },
    d_Style() {
      let style = {}
      if (this.autofill) {
        style = {
          height: window.innerHeight - 150 + 'px',
          overflow: 'auto',
        }
      }
      return style
    },
  },
  watch: {
    tempVisible(v) {
      this.$emit('update:visible', v)
    },
    visible(v) {
      this.tempVisible = v
    },
  },
  methods: {
    getDrag() {
      return this.isDrag
    },
    toggleFullscreen() {
      this.fullscreen = !this.fullscreen
    },
    closeDialog() {
      this.$emit('update:visible', false)
    },
  },
}
</script>
<style scoped>
.title {
  font-size: 18px;
  height: 24px;
  line-height: 24px;
}
.icons {
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  height: 24px;
  width: 100%;
}
.icons i {
  font-size: 17px;
  margin-right: 10px;
  height: 24px;
  line-height: 24px;
}

>>> .jy-win-dialog .w_bg {
  background-color: #fff !important;
  padding: 0;
}
</style>