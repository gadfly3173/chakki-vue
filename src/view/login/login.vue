<template>
  <div class="login">
    <div class="form-box" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
      <div class="title"><h1 title="Lin">Chakki - 作业平台</h1></div>
      <form class="login-form" autocomplete="off" @submit.prevent="throttleLogin()">
        <div class="form-item nickname">
          <i class="el-icon-user"></i>
          <input type="text" v-model="form.username" autocomplete="off" placeholder="请填写用户名" />
        </div>
        <div class="form-item password">
          <i class="el-icon-lock"></i>
          <input type="password" v-model="form.password" autocomplete="off" placeholder="请填写用户登录密码" />
        </div>
        <div class="form-item captcha">
          <i class="el-icon-key"></i>
          <input
            type="text"
            v-model="form.captcha"
            autocomplete="off"
            placeholder="请填写验证码"
            class="input"
            maxlength="4"
          />
          <img :src="captchaUrl" class="captcha-img" alt="点击刷新验证码" @click.stop="getCaptcha" />
        </div>
        <button class="submit-btn" type="submit">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import AppConfig from '@/config/index'
import User from '@/lin/model/user'
import Utils from '@/lin/util/util'

export default {
  name: 'login',
  data() {
    return {
      loading: false, // 加载动画
      wait: 2000, // 2000ms之内不能重复发起请求
      throttleLogin: null, // 节流登录
      form: {
        username: '',
        password: '',
        captcha: '',
      },
      captchaUrl: '',
    }
  },
  methods: {
    async login() {
      const { username, password, captcha } = this.form
      try {
        this.loading = true
        const tokens = await User.getToken(username, password, captcha)
        if (tokens.mfarequire) {
          return this.handleLoginWithMFA()
        }
        await this.getInformation()
        this.loading = false
        this.$router.push(AppConfig.defaultRoute)
        this.$message.success('登录成功')
      } catch (e) {
        this.loading = false
        this.getCaptcha()
      }
    },
    async getInformation() {
      try {
        // 尝试获取当前用户信息
        const user = await User.getPermissions()
        this.setUserAndState(user)
        this.setUserPermissions(user.permissions)
      } catch (e) {
        // eslint-disable-next-line
        console.log(e)
      }
    },
    async getCaptcha() {
      this.captchaUrl = await User.getCaptcha()
      this.form.captcha = ''
    },
    async handleLoginWithMFA() {
      this.$prompt('由于您设置了MFA，本次登录需要验证您的MFA码。请在五分钟内输入MFA码', '登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]{6}$/,
        inputErrorMessage: 'MFA码为六位数字',
      })
        .then(async ({ value }) => {
          await User.loginWithMFA(value)
          await this.getInformation()
          this.loading = false
          this.$router.push(AppConfig.defaultRoute)
          this.$message.success('登录成功')
        })
        .catch(() => {
          this.resetForm()
        })
    },
    resetForm() {
      this.form = {
        username: '',
        password: '',
        captcha: '',
      }
      this.getCaptcha()
      this.loading = false
    },
    ...mapActions(['setUserAndState']),
    ...mapMutations({
      setUserPermissions: 'SET_USER_PERMISSIONS',
    }),
  },
  created() {
    // 节流登录
    this.throttleLogin = Utils.throttle(this.login, this.wait)
    this.getCaptcha()
  },
  components: {},
}
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: #1b2c5f url('../../assets/image/login/login-ba.png') no-repeat center;
  background: #1b2c5f url('../../assets/image/login/login-ba.jpg') no-repeat center;
  background-size: cover;

  .team-name {
    position: fixed;
    left: 40px;
    top: 50%;
    width: 50px;
    transform: translateY(-50%);
  }

  .form-box {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 445px;

    .title {
      height: 37px;
      font-size: 30px;
      line-height: 37px;
      margin-bottom: 15%;

      h1 {
        padding-left: 74px;
        box-sizing: border-box;
        text-align: left;
        color: #8c98ae;
      }
    }

    .login-form {
      width: 100%;

      .form-item {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        padding-bottom: 13px;
        margin-bottom: 34px;

        input {
          width: 350px;
          height: 100%;
          background: transparent;
          color: #c4c9d2;
          font-size: 14px;
          padding-left: 20px;
          box-sizing: border-box;
        }

        i {
          color: #c4c9d2;
          vertical-align: middle;
        }
      }

      .form-item.nickname {
        background: url('../../assets/image/login/nickname.png') no-repeat;
        background-size: 100% auto;
        background-position: left bottom;
      }

      .form-item.password {
        background: url('../../assets/image/login/password.png') no-repeat;
        background-size: 100% auto;
        background-position: left bottom;
      }

      .form-item.captcha {
        display: flex;
        justify-content: center;
        i {
          line-height: 30px;
        }
        .input {
          width: 240px;
        }
        .captcha-img {
          height: 30px;
          width: 110px;
          margin: 0;
          cursor: pointer;
        }
      }

      .submit-btn {
        width: 100%;
        height: 70px;
        color: #c4c9d2;
        font-size: 16px;
        text-align: left;
        box-sizing: border-box;
        padding: 0 10px;
        padding-left: 74px;
        background: url('../../assets/image/login/login-btn.png') no-repeat;
        background-size: 90% auto;
        background-position: center bottom;
        border: none;
        cursor: pointer;
      }
    }
  }
}
</style>
