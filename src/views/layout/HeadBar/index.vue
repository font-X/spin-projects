<template>
  <div class="jy-header" :class="{ isFull: isFullScreen }">
    <div class="jy-logo">
      <img src="../../../assets/image/logo.png" />
    </div>
    <menu-list></menu-list>
    <div class="user-info">
      <div class="user-com" style="padding-top: 15px; padding-bottom: 12px">
        <el-badge :value="15" :max="99" type="success" class="item">
          <img class="user-notice" src="../../../assets/image/dateplan.png" />
        </el-badge>
      </div>
      <div class="user-com" style="padding-top: 15px; padding-bottom: 12px">
        <el-badge :value="25" :max="99" class="item">
          <img class="user-notice" src="../../../assets/image/notice.png" />
        </el-badge>
      </div>
      <div class="user-com" @mouseout="showCancle = false" @mouseover="showCancle = true">
        <div class="uesr-img-container">
          <img class="user-img" src="../../../assets/image/user-pic.jpg" />
          <span class="user-name">{{ userName }}</span>
          <span class="user-icon el-icon-arrow-down"></span>
        </div>
        <el-collapse-transition>
          <div
            v-show="showCancle"
            class="cancle"
            style="padding-top: 15px; padding-bottom: 12px"
            @click="LoginOut"
          >
            退出登录
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import MenuList from './MenuList.vue'
import Axios from 'axios'
import Cookies from 'js-cookie'
export default {
  components: {
    MenuList,
  },
  data() {
    return {
      showCancle: false,
    }
  },
  methods: {
    LoginOut() {
      this.$confirm('确认退出吗?', '提示', {
        type: 'warning',
      })
        .then(() => {
          sessionStorage.removeItem('user')
          this.deleteCookie('token')
          this.$store.commit('setMenuList', []) 
          this.$router.push('/login')
          /*
          this.$api.login
            .logout()
            .then(res => {})
            .catch(function(res) {});
          */
        })
        .catch((err) => {
          console.error(err)
        })
    },
    // 删除cookie
    deleteCookie: function (name) {
      Cookies.remove(name)
    },
  },
  created() {
    this.$api.menu.getMenuList().then((data) => {
      let dfaultmenu={
          ImgUrl: '',
          LinkUrl: '',
          MenuCode: '01010101',
          MenuName: '订单进度表',
          MenuOrder: 1,
          MenuUrl: 'BusinessManagement/OrderScheduleList',
          ParentCode: '01',
          Valid: '1',
        }
      data.data.defaultActiveMenu = [dfaultmenu]
      data.data.Menus[0].Children.push(dfaultmenu)
      this.$store.commit('setMenuList', data.data || data.Value)
    })
  },
  computed: {
    isFullScreen() {
      return store.state.app.isFullScreen
    },
    userName() {
      let name = sessionStorage.getItem('user')
      return name && name.trim()
    },
  },
}
</script>

<style scoped lang="scss">
.jy-header {
  height: 50px;
  z-index: 2;
  padding-left: 80px;
  padding-right: 250px;

  .jy-logo {
    float: left;
    width: 80px;
    height: 100%;
    background: #21bdca;
    margin-left: -80px;
    position: relative;
    padding: 5px 10px 0;

    img {
      width: 55px;
      height: 40px;
      margin: 0 auto;
    }
  }

  .user-info {
    background-color: #5473e8;
    height: 50px;
    float: right;
    width: 250px;
    margin-left: -250px;
    display: flex;
    position: relative;
    right: -250px;
    z-index: 2;

    .user-com {
      display: flex;
      float: right;
      padding: 5px 12px;
      cursor: pointer;

      .user-notice {
        width: 12px;
        line-height: 40px;
      }

      .user-img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 8px;
        margin-top: 5px;
      }

      .user-name {
        width: 54px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
      }
    }

    .user-com:hover {
      background-color: #4560cb;
    }
  }
}
>>> .el-badge {
  line-height: 40px;
  transform: scale(1.1);
}
>>> .el-badge__content.is-fixed {
  top: 5px;
}
.user-info .user-com:first-child {
  width: 20%;
  border-left: 1px solid rgb(97, 125, 233);
  border-right: 1px solid rgb(97, 125, 233);
}
.user-info .user-com:nth-child(2) {
  width: 20%;
  border-right: 1px solid rgb(97, 125, 233);
}
.user-info .user-com:nth-child(3) {
  position: relative;
  width: 60%;
  border-right: 1px solid rgb(97, 125, 233);
  .uesr-img-container {
    position: absolute;
    left: 50%;
    top: 50%;
    display: flex;
    justify-content: space-between;
    transform: translate(-50%, -50%);
  }
  .user-icon {
    color: #fff;
    position: absolute;
    top: 50%;
    right: -14px;
    transform: translate(0, -50%);
  }
}
.cancle {
  position: absolute;
  right: 0;
  top: 100%;
  width: 100%;
  height: 100%;
  line-height: 50px;
  color: #000;
  cursor: pointer;
  transition: 1s;
  text-align: center;
  border: 1px solid #ccc;
  background-color: #fff;
}
.cancle:hover {
  background-color: rgb(97, 125, 233);
}
.jy-header.isFull {
  display: none;
}
</style>