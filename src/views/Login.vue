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
      <div class="titleImg" v-if="IconState">{{ BASCOMPANY }}</div>
      <el-form
        v-show="!IconState"
        :model="loginForm"
        :rules="fieldRules"
        ref="loginForm"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
      >
        <div id="login_container" style="transform: scale(0.8)"></div>
      </el-form>
      <el-form
        v-show="IconState"
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
            @keyup.enter.native="login()"
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
            @keyup.enter.native="login()"
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
            >登 录</el-button>
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
      IconState: false,
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
      BASCOMPANY: '',
      redirect: undefined,
      pcAppid: '',
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          var state = query.state
          if (!state) {
            localStorage.setItem('redirect', this.redirect)
          }
        } else {
          localStorage.setItem('redirect', undefined)
        }
        var ss = localStorage.getItem('redirect')
        console.log(ss)
      },
      immediate: true,
    },
  },
  created() {
    this.$api.login.getCompanyInfo().then((res) => {
      if (res.statusCode == 200) {
        this.BASCOMPANY = 'asa'
        let p = res.data.filter((item) => item.ParaCode == 'BASCOMPANY')
        if (p.length > 0) this.BASCOMPANY = p[0].ParaRun
        let d = res.data.filter((item) => item.ParaCode == 'pcAppid')
        if (d.length > 0) this.pcAppid = d[0].ParaRun
      }
    })
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
          user: {
            Account: this.loginForm.account,
            PassWord: this.loginForm.password,
            // captcha: this.loginForm.captcha,
          },
        }
        await this.$api.login
          .login({
            user: {
              Account: this.loginForm.account,
              PassWord: this.loginForm.password,
            },
          })
          .then((res) => {
            if (res.statusCode !== 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              Cookies.set('token', res.data.Token) // 放置token到Cookie
              Cookies.set('user', res.data.user.Name.trim()) // 放置token到Cookie
              sessionStorage.setItem('user', res.data.user.Name) // 保存用户到本地会话
              //alert(res.Value.user.UserName);
              //sessionStorage.setItem('userId', userInfo.Id) // 保存用户到本地会话
              this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
              this.$store.commit('userLogin', res.data.user)
              //用户平板登录直接跳转到生产面板
              this.$router.push(this.redirect == 'TrnCard' ? 'TrnCard' : '/')
              //this.$router.push('/') // 登录成功，跳转到主页
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
    ddLoginInit() {
      //钉钉扫码流程：扫码成功登录后会自动跳到这个url页面，url路径会携带code，你拿到这个code，调用登录接口成功就跳转。
      //你的项目页面
      let url = encodeURIComponent('http://47.110.12.39:8666/#/login')
      // appid 找后端要
      let appid = 'dingoam5kvo3xidin66gxg'
      // 钉钉自己的url 修改上面俩，不需要动这个
      let goto = encodeURIComponent(
        `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}`
      )
      let obj = DDLogin({
        id: 'login_container', //这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
        goto: goto, //请参考注释里的方式
        style: 'border:none;background-color:#FFFFFF;',
        width: '100%', //官方参数 365
        height: '290', //官方参数 400
      })
      let handleMessage = (event) => {
        let origin = event.origin
        // console.log('origin', event.origin)
        if (origin == 'https://login.dingtalk.com') {
          //判断是否来自ddLogin扫码事件。
          let loginTmpCode = event.data
          //获取到loginTmpCode后就可以在这里构造跳转链接进行跳转了
          // console.log('loginTmpCode', loginTmpCode)
          //此步拿到临时loginTmpCode换取正式code
          //window.location.href = 'http://localhost:84/#/login?redirect=TrnCard22&state=1'
          window.location.href = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}&loginTmpCode=${loginTmpCode}`
        }
      }
      if (typeof window.addEventListener != 'undefined') {
        window.addEventListener('message', handleMessage, false)
      } else if (typeof window.attachEvent != 'undefined') {
        window.attachEvent('onmessage', handleMessage)
      }
    },
    handleCodeLogin(code) {
      this.$api.login
        .ddLogin({ code: code })
        .then((res) => {
          if (res.statusCode !== 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            Cookies.set('token', res.data.Token) // 放置token到Cookie
            Cookies.set('user', res.data.user.Name.trim())
            sessionStorage.setItem('user', res.data.user.Name) // 保存用户到本地会话
            //alert(res.Value.user.UserName);
            //sessionStorage.setItem('userId', userInfo.Id) // 保存用户到本地会话
            this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
            this.$store.commit('userLogin', res.data.user)
            this.redirect = localStorage.getItem('redirect')
            this.$router.push(this.redirect == 'TrnCard' ? 'TrnCard' : '/')
            //this.$router.push('/') // 登录成功，跳转到主页
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
    },
  },
  mounted() {
    //code是登录所需最终参数
    const { code } = this.$route.query
    if (code) {
      //登录接口
      this.handleCodeLogin(code)
    } else {
      //钉钉二维码
      this.ddLoginInit()
    }
  },
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
      width: 224px;
      height: 87px;
      font-size: 24px;
      //background: url('../assets/image/titleImg.png') no-repeat;
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