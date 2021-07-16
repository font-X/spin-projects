<template>
  <div>
    <nav class="jy-nav-list" @click="setActiveScreenPageIndex()">
      <div class="jy-tabs-wrapper">
        <div class="jy-tabs-scroll" :style="{ marginRight: funWidth + 'px' }">
          <ul class="jy-tabs" ref="jytabs">
            <li
              class="jy-tab"
              @click="modifyNav(nav)"
              :class="{
                active: isActivenav(nav, index),
                closing: closingNav.MenuCode === nav.MenuCode,
              }"
              v-for="(nav, index) of navTree"
              :key="nav.MenuCode"
            >
              <div>{{ nav.MenuName }}</div>
              <div class="jy-tab-close" @click.stop="closeNav(nav)">
                <i class="el-icon-close" aria-hidden="true"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="jy-nav-fun"
        :style="{ width: funWidth + 'px', marginLeft: -funWidth + 'px' }"
      >
        <i @click="showAllMenu()" class="el-icon-menu">菜单</i>
        <i v-if="isActivePage" class="el-icon-refresh">刷新</i>
        <i v-if="isActivePage" @click="toggleScreenState()" class="el-icon-full-screen">全屏</i>
        <i v-if="isActivePage" class="el-icon-search">查找</i>
        <i v-if="isActivePage" @click="addScreenPage" class="el-icon-copy-document">分屏</i>
        <i v-if="isActivePage" >设置</i>
        <div class="jy-nav-fun-extend" style="display: none">
          <el-select
            size="mini"
            :style="{ height: '100px' }"
            v-model="value"
            filterable
            placeholder="请选择"
          >
            <el-option
              size="mini"
              v-for="item in navTree"
              :key="item.MenuCode"
              :label="item.MenuName"
              :value="item.MenuCode"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  props: {
    pageIndex: Number,
  },
  updated() {
    let jytabs = this.$refs.jytabs,
      children = jytabs.children,
      activeIndex = this.activeIndex
    children[activeIndex] &&
      setTimeout(function () {
        if(children[activeIndex])
          children[activeIndex].scrollIntoView(true)
      }, 200)
  },
  data: function () {
    return {
      closingNav: {},
      activeIndex: -1,
      value: '',
    }
  },
  computed: {
    screenPages() {
      return this.$store.state.menu.screenPages
    },
    navTree() {
      return this.$store.state.menu.screenPages[this.pageIndex].navTree
    },
    activeNav() {
      return this.$store.state.menu.screenPages[this.pageIndex].activeNav
    },
    isActivePage() {
      return this.$store.state.menu.activeScreenPageIndex === this.pageIndex
    },
    funWidth() {
      return this.isActivePage ? 250 : 50
    },
  },
  methods: {
    getState(menuCode) {
      return activeNav.MenuCode.trim() === menuCode.trim() ? 'active' : ''
    },
    modifyNav(nav) {
      this.$store.commit('pushNavTree', nav)
    },
    closeNav(nav) {
      let that = this
      this.closingNav = nav
      setTimeout(function () {
        that.$store.commit('closeNav', { nav, pageIndex: that.pageIndex })
        that.closingNav = {}
      }, 200)
    },
    addScreenPage() {
      this.$store.commit('addScreenPage', this.activeNav)
    },
    isActivenav(nav, index) {
      let flag = this.activeNav.MenuCode === nav.MenuCode
      if (flag) {
        this.activeIndex = index
      }
      return flag
    },
    setActiveScreenPageIndex() {
      this.$store.commit('setActiveScreenPageIndex', this.pageIndex)
    },
    toggleScreenState() {
      ;(this.$store.state.app.isFullScreen
        ? this.exitFullscreen
        : this.fullScreen)()
    },
    //fullScreen()和exitScreen()有多种实现方式，此处只使用了其中一种
    //全屏
    fullScreen() {
      var element = document.documentElement
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      }
      this.$store.commit('modifyScreenState', true)
    },
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
      this.$store.commit('modifyScreenState', false)
    },
  },
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.jy-nav-list {
  background-color: #eee;
  height: 32px;
  box-shadow: 0 -8px 10px -8px rgba(174, 174, 174, 0.35) inset;
  padding-top: 3px;

  .jy-tabs-wrapper {
    float: left;
    background-color: #eee;
    width: 100%;

    .jy-tabs-scroll {
      margin-right: 250px;
      overflow: hidden;
    }

    .jy-tabs {
      height: 32px;
      width: 99999px;

      .jy-tab {
        float: left;
        position: relative;
        margin: 0 2px;
        background-color: #f6f6f6;
        border-right: 1px solid #d9d9d9;
        padding: 0 0.8em;
        border-radius: 2px;
        line-height: 30px;
        box-shadow: 1px 0 3px rgba(174, 174, 174, 0.35);
        cursor: pointer;
        animation: shownav 0.2s;

        div {
          float: left;
        }

        .jy-tab-close {
          margin: 0 3px;
        }
      }
      .jy-tab.active {
        background-color: #fff;
        box-shadow: 1px 0 3px rgba(174, 174, 174, 0.35), inset 0 2px 0 #206ca4;
      }
      .jy-tab.closing {
        animation: hidnav 0.2s;
      }
      @keyframes shownav {
        from {
          top: 32px;
        }
        to {
          top: 0;
        }
      }
      @keyframes hidnav {
        from {
          top: 0;
        }
        to {
          top: 32px;
          display: none;
        }
      }
      // .jy-tab.active::before{
      //     content: " ";
      //     position: absolute;
      //     left:2px;
      //     top: 4px;
      //     width: 4px;
      //     height: 4px;
      //     border-radius:50%;
      //     background-color: #1890ff;
      // }
    }
  }
  .jy-nav-fun {
    float: left;
    width: 250px;
    height: 100%;
    line-height: 32px;
    margin-left: -250px;
    background-color: #eee;
    z-index: 2;

    i {
      cursor: pointer;
    }

    .jy-nav-fun-extend {
      position: relative;
      z-index: 2;
      margin-top: 2px;
      background-color: #fff;
    }
  }
}
.jy-nav-list .jy-tabs-wrapper .jy-tabs .jy-tab[data-v-a5ba148c]{
    background: #F7F8FF;
    font-size: 12px;
}
.jy-nav-list .jy-tabs-wrapper .jy-tabs .jy-tab.active[data-v-a5ba148c] {
  box-shadow: none;
  color: #fff;
  background: #36c2cf;
}
.jy-nav-list .jy-nav-fun[data-v-a5ba148c]{
    background-color: #fff;
}
.jy-nav-list .jy-tabs-wrapper[data-v-a5ba148c]{
    background-color: #fff;
}
.jy-nav-list[data-v-a5ba148c]{
    padding: 0px;
    border-top: 3px solid #fff;
    border-bottom: 6px solid #fff;
}
.fa-times[data-v-a5ba148c] {
    position: absolute;
    bottom: 11px;
    right: 5px;
}
</style>