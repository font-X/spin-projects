<template>
  <el-container>
    <div class="secondBackground">
      <div class="titleContainer">
        <span class="Title" v-if="IconState">外贸智慧管理软件</span><br />
        <span class="engTaitle" v-if="IconState">EXTERNAL TRADE SOFTWARE</span>
      </div>
      <div
        class="loginIcon"
        :class="IconState ? '' : 'loginIcon2'"
        :IconState="IconState"
        @click="changeLogin"
      ></div>
      <div class="titleImg" v-if="IconState"></div>
      <el-form
        v-if="IconState"
        :model="loginForm"
        :rules="fieldRules"
        ref="loginForm"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
      >
        <span class="tool-bar"> </span>
        <el-form-item prop="account">
          <span class="titleInput">账号</span>
          <el-input
            class="Bottom-Border"
            type="text"
            v-model="loginForm.account"
            auto-complete="off"
            placeholder="请输入您的手机号或工号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span class="titleInput">密码</span>
          <el-input
            class="Bottom-Border"
            type="password"
            v-model="loginForm.password"
            auto-complete="off"
            placeholder="请输入登录密码"
          ></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <!-- <el-button
            type="primary"
            style="width: 48%"
            @click.native.prevent="reset"
            >重 置</el-button
          > -->
          <el-button
            class="loginBTN"
            @click.native.prevent="login"
            :loading="loading"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import Cookies from 'js-cookie'
// import ThemePicker from "@/components/ThemePicker"
// import LangSelector from "@/components/LangSelector"
export default {
  name: 'Login',
  components: {
    // ThemePicker,
    // LangSelector
  },
  data() {
    return {
      IconState: true,
      loading: false,
      loginForm: {
        account: '',
        password: '',
        // captcha:'',
        // src: ''
      },
      fieldRules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        // ,
        // captcha: [
        //   { required: true, message: '请输入验证码', trigger: 'blur' }
        // ]
      },
      checked: true,
    }
  },
  methods: {
    changeLogin() {
      this.IconState = !this.IconState
    },
    login() {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) return
        this.loading = true
        let userInfo = {
          Account: this.loginForm.account,
          Password: this.loginForm.password,
          captcha: this.loginForm.captcha,
        }
        await this.$api.login
          .login(userInfo)
          .then((res) => {
            // console.info(res)
            console.log(res)
            if (res.Code < 0) {
              this.$message({
                message: res.Message,
                type: 'error',
              })
            } else {
              Cookies.set('token', res.Value.Token) // 放置token到Cookie
              sessionStorage.setItem('user', res.Value.user.UserName) // 保存用户到本地会话
              //alert(res.Value.user.UserName);
              //sessionStorage.setItem('userId', userInfo.Id) // 保存用户到本地会话
              this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
              this.$store.commit('userLogin', res.Value.user)
              this.$router.push('/') // 登录成功，跳转到主页
            }
            this.loading = false
          })
          .catch((res) => {
            this.loading = false
            this.$message({
              message: res.message,
              type: 'error',
            })
          })
      })
    },
    // reset() {
    //   this.$refs.loginForm.resetFields()
    // },
  },
  mounted() {},
  computed: {
    ...mapState({}),
  },
}
</script>
<style lang="scss" scoped>
.el-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('../assets/image/background1.png') no-repeat;
  .secondBackground {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1062px;
    height: 742px;
    background: url('../assets/image/background2.png') no-repeat;
    .loginIcon {
      position: absolute;
      right: 41px;
      top: 32px;
      width: 64px;
      height: 64px;
      background: url('../assets/image/loginIcon1.png') no-repeat;
    }
    .loginIcon2 {
      background: url('../assets/image/loginIcon2.png') no-repeat;
    }
    .titleContainer {
      position: absolute;
      top: 53px;
      right: 266px;
      font-family: Microsoft YaHei;
      .Title {
        width: 230px;
        height: 28px;
        font-size: 28px;
        font-weight: 400;
        color: #999999;
      }
      .engTaitle {
        width: 226px;
        height: 13px;
        font-size: 16px;
        font-weight: 400;
        color: #999999;
      }
    }

    .titleImg {
      position: absolute;
      top: 159px;
      right: 184px;
      width: 184px;
      height: 47px;
      background: url('../assets/image/titleImg.png') no-repeat;
    }
    .login-container {
      position: absolute;
      bottom: 100px;
      right: 96px;
      background-clip: padding-box;
      margin: 100px auto;
      width: 370px;
      padding: 35px 0px 15px 35px;
      background: #fff;
      .titleInput {
        width: 34px;
        height: 17px;
        font-size: 16px;
        font-weight: bold;
        color: #999999;
      }

      .loginBTN {
        position: absolute;
        bottom: -100px;
        width: 370px;
        height: 54px;
        background: #4260b0;
        border-radius: 27px;
        font-size: 20px;
        font-weight: 400;
        color: #fefefe;
      }

      .title {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #505458;
      }
      .remember {
        margin: 0px 0px 35px 0px;
      }
    }
  }
}
</style>