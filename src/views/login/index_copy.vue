<template>
  <div class="login-container">
    <header class="login-container__header">
      <div class="login-container__sysname">{{ $t('systemName') }}</div>
      <div style="float: right;margin-top:18px;">
        <el-dropdown>
          <span class="el-dropdown-link">
            <span :class="`lan lan-link `+iconLang"></span><i class="el-icon-arrow-down el-icon--right" style="color:#fff;font-size:12px;"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><a href="javascript:;" class="lan lan--zh-CN" data-lan="中文" @click="switchLang('zh-CN', $event)"></a></el-dropdown-item>
            <el-dropdown-item><a href="javascript:;" class="lan lan--en" @click="switchLang('en', $event)"></a></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">{{ $t('loginTitle') }}</h3>
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
</template>

<script>
  import { fetchData } from 'api';
  import { ACCOUNT_URL } from 'api/url';
  import CryptoJS from 'crypto-js';
  import { AES_CRYPT } from 'utils/dict';
  import { aesEncrypt, aesDecrypt } from 'utils';

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
        iconLang: 'lan--' + this.$store.getters.lang,
        loginForm: {
          loginName: 'D001',
          password: 'QTA2M1'
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
              console.log('login success!')
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
    background-color: #2d3a4b;

    .login-container__header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 54px;
      background-color: rgba(34,34,34,0.7);
      border-width: 0 0 1px;
      border-color: #080808;
      padding: 0 30px;

      .login-container__sysname {
        float: left;
        color: #FFFFFF;
        line-height: 54px;
      }
    }

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
      color: #889aa4;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #eeeeee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
  .lan {
    display: block;
    width: 80px;
    height: 20px;
    line-height: 20px;
    background: url('../../assets/images/lang.png') no-repeat 0 0;
  }
  .lan-link {
    width: 24px;
    vertical-align: middle;
    margin-top: -2px;
    display: inline-block;
  }
  .lan--zh-CN {
    background-position: 0 0px;
  }
  .lan--en {
    background-position: 0 -20px;
  }
</style>
