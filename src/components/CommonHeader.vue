<template>
  <div class="header-container">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="原密码" prop="pwd">
          <el-input type="password" v-model="form.pwd" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="form.newPwd" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="再次确认" prop="rePwd">
          <el-input type="password" v-model="form.rePwd" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel1">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="l-content">
      <el-button style="margin-right: 20px;" @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
      <el-breadcrumb separator="|">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/user.jpg" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
          <el-dropdown-item command="handlePassword">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { logout, setPassword } from '@/api'
import Cookie from 'js-cookie'
export default {
  data () {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      form:{
        pwd: '',
        newPwd: '',
        rePwd: ''
      },
      submitForm:{
        pwd: '',
        newPwd: ''
      },
      rules: {
        pwd: [
          { required: true, message: '请输入原密码'}
        ],
        newPwd: [
          { required: true, message: '请输入新密码'}
        ],
        rePwd: [
          { validator: validatePass2, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    },
    handleClick(command) {
      if( command === 'cancel'){
        logout()
        Cookie.remove('token')
        this.$router.push('/login')
      }
      if( command === 'handlePassword'){
        this.dialogVisible = true
      }
    },
    handleClose(){
      this.form = {
        pwd: '',
        newPwd: '',
        rePwd: ''
      }
      this.submitForm = {
        pwd: '',
        newPwd: ''
      }
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    cancel1(){
      this.handleClose()
    },
    submit(){
      this.$confirm('确定进行此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         this.$refs.form.validate((valid) => {
          if (valid) {
            this.submitForm.pwd = this.form.pwd
            this.submitForm.newPwd = this.form.newPwd
            setPassword(this.submitForm).then(( data ) => {
              var msg_type = data.data.code===200 ? 'success' : 'warning';
              this.$message({
                type: msg_type,
                message: data.data.msg,
              });
              if(data.data.code === 200){
                Cookie.remove('token')
                this.$router.push('/login')
              }
            })
          } else {
            this.$message({
              type: 'warning',
              message: '请检查内容是否完整正确'
            });    
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });          
      });
      this.dialogVisible = false
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabList
    })
  }
}
</script>
<style lang="less" scoped>
.header-container {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .l-content {
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner{
        font-weight: normal;
        &.is-link {
          color: #666
        }
      }
      &:last-child {
        .el-breadcrumb__inner{
          color: #fff;
        }
      }
    }
  }
}
</style>