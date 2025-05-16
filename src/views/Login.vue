<template>
  <el-form ref="form" label-width="70px" :inline="true" class="login-container" :model="form" :rules="rules">
    <h3 class="login_title">后台登录</h3>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input type="password" v-model="form.pwd" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="submit" style="margin-left: 105px; margin-top: 10px" type="primary">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import {getAdmin} from '../api'

export default {
  data() {
    return {
      form: {
        username: '',
        pwd: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          getAdmin(this.form).then(({data}) => {
            // console.log(data)
            // console.log(data.data.userInfo.roleName)
            // console.log(data.data.userInfo.roleName.includes('ROLE_ADMIN') || data.data.userInfo.roleName[0] === 'ROLE_HEAD')
            if (data.code === 200 && (data.data.userInfo.roleName[0] === 'ROLE_ADMIN' || data.data.userInfo.roleName[0] === 'ROLE_HEAD')) {
              Cookie.set('token', data.data.token)
              this.$router.push('/home').catch(() => {
              })
            } else if(data.code === 200){
              this.$message.error("您的权限不足")
            }else{
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;

  .login_title {
    text-align: center;
    margin-bottom: 40px;
  }

  .el-input {
    width: 198px;

  }
}
</style>