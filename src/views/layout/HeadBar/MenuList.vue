<template>
  <ul class="jy-menu-list">
    <li
      class="jy-menu-item-first"
      :class="getState(menu.MenuCode)"
      :style="{
        textAlign: 'center',
        maxWidth: '100px',
        width: 95 / pMune.length + '%',
      }"
      v-for="menu of pMune"
      :key="menu.MenuCode"
      @mouseenter="modifyState($event, menu.MenuCode, true)"
      @mouseleave="modifyState()"
    >
      <span class="jy-menu-text">{{ menu.MenuName }}</span>
      <i class="fa fa-angle-down" aria-hidden="true"></i>
      <ul class="jy-popup-menu" :style="popupStyle">
        <li
          class="jy-popup-item"
          v-for="sMenu of getSMenu(menu.MenuCode)"
          :key="sMenu.MenuCode"
        >
          <span>{{ sMenu.MenuName }}</span>
          <el-row :gutter="0">
            <el-col
              :span="6"
              v-for="thMenu of sMenu.Children.filter((m) => {
                return m.MenuUrl
              })"
              :key="thMenu.MenuCode"
            >
              <div @click="addMenu(thMenu)" class="grid-content">
                {{ thMenu.MenuName }}
              </div></el-col
            >
          </el-row>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
export default {
  data: function () {
    return {
      openedMenu: '',
      popupStyle: {},
    }
  },
  computed: {
    menudata() {
      return this.$store.state.menu.menuList
    },
    pMune() {
      return this.menudata && this.menudata.firstMenuList
    },
  },
  methods: {
    modifyState($event, menuCode, flag) {
      if (flag) {
        let { pageX, target } = $event,
          aviWidth = window.innerWidth,
          popupStyle = {}
        if (aviWidth - pageX < 500) {
          popupStyle = {
            left: target.clientWidth - 500 + 'px',
          }
        }
        this.popupStyle = popupStyle
      }
      menuCode = menuCode || ''
      this.openedMenu = menuCode
    },
    getState(menuCode) {
      return this.openedMenu === menuCode ? 'open' : ''
    },
    getSMenu(d, level) {
     if (this.menudata) {
        let dt2 = this.menudata.secondMenuList,
          sMenu = []
        for (let i = 0; i < dt2.length; i++) {
          let item = dt2[i]
          if (
            d &&
            d.replace(/\s+$/, '') ===
              (item.ParentCode && item.ParentCode.replace(/\s+$/, ''))
          ) {
            if (
              item.Children &&
              item.Children.some((m) => {
                return m.MenuUrl
              })
            )
              sMenu.push(item)
          } else if (sMenu.length > 0) {
            //modi li 注释掉break，否则有些菜单不显示
            //break
          }
        }
        // let sMenu = this.menudata.dt2.filter(item => {
        //     return level == 2
        //         ? d.replace(/\s+$/,"") === (item.ParentCode && item.ParentCode.replace(/\s+$/,""))
        //         : d.split(",").indexOf(item.MenuCode.replace(/\s+$/,"")) > -1
        // })
        return sMenu
      }
    },
    addMenu(menu) {
      this.openedMenu = ''
      this.$store.commit('pushNavTree', menu)
    },
  },
}
</script>
<style lang="scss" scoped>
ul {
  margin: 0;
  padding: 0;
}
.jy-menu-list {
  float: left;
  height: 100%;
  width: 100%;
  color: white;
  cursor: pointer;
  background-color: #4560cb;
  position: relative;
  padding-left: 5%;

  li {
    list-style: none;
    z-index: 2;
  }

  .jy-menu-item-first {
    float: left;
    position: relative;
    height: 100%;
    line-height: 50px;
    font-size: 13px;

    .jy-popup-menu {
      display: none;
      position: absolute;
      background-color: #fff;
      width: 500px;
      top: 50px;
      left: 0;
      color: #000;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

      .jy-popup-item {
        padding: 2px;
        text-align: left;
        position: relative;
        line-height: 1.5em;

        span {
          background-color: #fff;
          margin-left: 20px;
          position: relative;
          z-index: 1;
          padding: 0 8px;
          color: #2888cf;
          line-height: 30px;
        }

        .grid-content {
          padding-left: 20px;
          color: rgba(0, 0, 0, 0.87);
          line-height: 2em;
        }
        .grid-content:hover {
          background: #a1c5ec;
        }
      }
      .jy-popup-item:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 15px;
        border-top: 1px solid #dedede;
      }
    }
  }

  .jy-menu-item-first.open {
    .jy-popup-menu {
      display: block;
    }
  }

  .jy-menu-item-first:hover {
    background-color: #273eb0;
  }

  .icon:before {
    content: '\f107';
  }
}
</style>