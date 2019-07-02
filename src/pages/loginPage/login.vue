<template>
    <div class="loginPage">
        <div class="loginBanner">
            <div class="logoTitle">
                <img src="../../assets/logo.png" />
                <span class="logo2">集团财务关键任务管理平台</span>
            </div>
            <div class="login-container">
               <p class="Formtitle">集团财务关键任务管理平台</p>
                <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
                    <el-form-item prop="username">
                        <span class="icon-container el-icon-user">
                        <!-- <svg-icon icon-class="user" />   -->
                        </span>
                        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <span class="icon-container el-icon-unlock">
                        <!-- <svg-icon icon-class="password"></svg-icon> -->
                        </span>
                        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                        placeholder="密码"></el-input>
                        <!-- <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span> -->
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                        登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: '/home' })
          }).catch((rej) => {
            this.loading = false;
            this.$message({
              type:'error',
              message:rej.message
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
    .loginPage{
        width:100%;
        height: 100%;
        
        .loginBanner{
            width:100%;
            height: 100%;
            background:url(../../assets/banner.png) no-repeat;
            background-size: 100% 100%;
            overflow: hidden;
            .logoTitle{
                margin-left: 84px;
                margin-top: 51px;   
                font-size: 20px;
                color:#fff;
                height: 35px;
                line-height: 35px;
                img{
                  display: inline-block;
                  margin-right: 5px;
                  width:85px;
                  vertical-align: -3px;
                }
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 45px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 11px;
      padding: 12px 5px 12px 15px;
      height: 45px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #2d3a4b !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #fff;
    border-radius: 22px;
    color: #454545;
    margin-bottom: 20px;
  }
  .el-form-item:last-child{
    background:none;
    border:none;
  }
  .el-button--primary{
    border-radius: 22px;
    margin-top: 15px;
    height: 45px;
  }
  .el-form-item__error{
    padding-left: 15px;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
$dl_gray:#d7d7d7;
.login-container {  
  position: absolute;
  width:350px;
  height: 400px;
  background-color: #687396;
  border-radius: 10px;
  top: 20%;
  right: 10%;
  padding: 45px 45px 0px;
  box-sizing: border-box;
  .Formtitle{
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    margin-bottom: 35px
  }
  .login-form {
    width: 100%;
    height: 80%;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .icon-container {
    padding: 2px 5px 6px 15px;
    color: $dl_gray;
    vertical-align: middle;
    width: 12px;
    display: inline-block;
    font-size: 20px;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
