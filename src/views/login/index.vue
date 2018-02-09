<template>
  <div class="login-container">
    <div class="login-content">
      <h3 class="title"><img :src="logoPNG" height="50" alt="" style="vertical-align: middle;margin:0 auto;"></h3>
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
        class="card-box login-form">
        <el-form-item prop="loginName">
          <span class="svg-container"><icon-svg icon-class="jiedianyoujian"></icon-svg></span>
          <el-input name="loginName" type="text" v-model="loginForm.loginName" autoComplete="on" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container"><icon-svg icon-class="mima"></icon-svg></span>
          <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
            placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
            {{ $t('btn.login') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import logoPNG from 'assets/images/productname-bg.png';
  import compLogoPNG from 'assets/images/comp-logo-bg.png';
  export default {
    name: 'login',
    data() {
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'));
        } else {
          callback();
        }
      };
      return {
        logoPNG,
        compLogoPNG,
        iconLang: 'lan--' + this.$store.getters.lang,
        loginForm: {
          loginName: 'admin',
          password: 'admin'
        },
        loginRules: {
          loginName: [
            { required: true, trigger: 'blur', message: '请输入用户名' }
          ],
          password: [
            { required: true, trigger: 'blur', validator: validatePass }
          ]
        },
        loading: false
      }
    },
    methods: {
      switchLang(val) {
        this.iconLang = 'lan--' + val;
        this.$store.dispatch('switchLang', val);
        this.$i18n.locale = val;
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false;
              this.$router.push({ path: '/' });
            }).catch(reason => {
              this.$message.error(reason);
              this.loading = false;
            });
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  .login-container {
    @include relative;
    height: 100vh;
    background: #fff url('../../assets/images/login-bg.jpg') no-repeat center center;
    background-size: cover;

    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #eeeeee;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #fff;
    }
    .login-content {
      max-width: 1200px;
      position: relative;
      height: 100%;
      margin: auto;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #eeeeee;
      font-weight: bold;
      position: absolute;
      left: 0;
      top: 100px;
    }
    .login-form {
      position: absolute;
      top: 280px;
      right: 0px;
      background-color: rgba(255,255,255,0.36);
      border-radius: 60px;
      width: 388px;
      padding: 68px 42px 26px;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>
