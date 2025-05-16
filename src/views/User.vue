<template>
  <div class="manage">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%"
    >
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="店名" prop="branchName">
          <el-input
            v-model="form.branchName"
            placeholder="请输入店名"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="fullName">
          <el-input v-model="form.fullName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input
            v-model="form.mobile"
            placeholder="请输入电话号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="roleName">
          <el-checkbox-group v-model="form.roleName">
            <el-checkbox label="ROLE_ADMIN" ></el-checkbox>
            <el-checkbox label="ROLE_HEAD" ></el-checkbox>
            <el-checkbox label="ROLE_BRANCH"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="handleAdd" type="primary"> + 新增 </el-button>
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input v-model="userForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%; overflow: visible">
        <el-table-column prop="uid" label="id"> </el-table-column>
        <el-table-column prop="branchName" label="店名"> </el-table-column>
        <el-table-column prop="fullName" label="姓名"> </el-table-column>
        <el-table-column prop="roleName" label="角色权限">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.roleName[0] == 'ROLE_ADMIN'" type="danger" disable-transitions>管理员</el-tag>
            <el-tag v-if="scope.row.roleName[0] == 'ROLE_HEAD'" type="warning" disable-transitions>总店</el-tag>
            <el-tag v-if="scope.row.roleName[0] == 'ROLE_BRANCH'" type="success" disable-transitions>分店</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="username" label="账号"> </el-table-column>
        <el-table-column prop="opreate" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              @click="handleDelete(scope.row)"
              type="danger"
              >删除</el-button
            >
            <el-button size="mini" type="primary" @click="handleReset(scope.row)"
              >重置</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getUser, addUser, editUser, delUser, searchUser, resetUser } from '@/api'
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        uid: '',
        branchName: '',
        fullName: '',
        mobile: '',
        email: '',
        username: '',
        pwd: "123456",
        roleName: [""]
      },
      rules: {
        branchName: [
          { required: true, message: '请输入店名' }
        ],
        fullName: [
          { required: true, message: '请输入姓名' }
        ],
        mobile: [
          { required: true, message: '请输入电话号码' }
        ],
        email: [
          { required: true, message: '请输入邮箱' }
        ],
        username: [
          { required: true, message: '请输入账号' }
        ],
        roleName: [
          { required: true, message: '请选择角色权限' }
        ]
      },
      userForm: {
        page: 1,
        limit: 10,
        name: ''
      },
      tableData: [],
      modalType: 0, //0表示新增弹窗，1表示编辑
      total: 0,
      pageData: {
        page: 1,
        limit: 10
      },
      searchType: 0
    }
  },
  methods: {
    handleReset (row) {
      this.$confirm('此操作将重置该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetUser({uid: row.uid}).then(({ data }) => {
          var msg_type = data.code===200 ? 'success' : 'warning';
          console.log(data)
          this.$message({
            type: msg_type,
            message: data.msg,
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    submit () {
      this.$confirm('确定进行此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         this.$refs.form.validate((valid) => {
          if (valid) {
            if(this.modalType === 0){
              addUser(this.form).then(() => {
                this.$refs.form.resetFields()
                this.dialogVisible = false
                this.getList()
                this.$message({
                  type: 'success',
                  message: '添加成功'
                });    
              })
            } else {
              editUser(this.form).then(() => {
                this.$refs.form.resetFields()
                this.dialogVisible = false
                this.getList()
                this.$message({
                  type: 'success',
                  message: '修改成功'
                });    
              })
            }
          } else {
            this.$message({
              type: 'warning',
              message: '请检查内容是否完整'
            });    
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });          
      });
    },
    handleClose () {
      this.form = {
        uid: '',
        branchName: '',
        fullName: '',
        mobile: '',
        email: '',
        username: '',
        pwd: "123456",
        roleName: []
      },
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    cancel() {
      this.handleClose()
    },
    handleEdit(row) {
      this.modalType = 1
      this.dialogVisible = true
      this.form= JSON.parse(JSON.stringify(row))
      //对当前行数据进行深拷贝，否则会出
      //  this.tempForm= JSON.parse(JSON.stringify(row))
      //  this.form.uid = this.tempForm.uid
      //  this.form.branchName = this.tempForm.branchName
      //  this.form.fullName = this.tempForm.fullName
      //  this.form.mobile = this.tempForm.mobile
      //  this.form.email = this.tempForm.email
      //  this.form.username = this.tempForm.username
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser({ uid: row.uid }).then((data) => {
          console.log(data)
          var msg_type = data.data.code===200 ? 'success' : 'warning';
          this.$message({
            type: msg_type,
            message: data.data.msg,
          });
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    handleAdd () {
      this.modalType = 0,
      this.dialogVisible = true
    },
    handlePage(val) {
      if(this.searchType==0){
        this.pageData.page = val
        this.getList()
      } else {
        this.userForm.page = val
        searchUser(this.userForm).then(({ data }) => {
          this.tableData = data.data.search
          this.total = data.data.count
        })
      }
    },
    getList () {
      getUser({params: {...this.userForm, ...this.pageData}}).then(({ data }) => {
        this.tableData = data.data.list
        console.log(this.tableData)
        this.total = data.data.count || 0 
      })
    },
    onSubmit() {
      if(this.userForm.name == ''){
        this.pageData.page = 1
        this.getList()
        this.searchType = 0
      } else {
        this.searchType = 1
        searchUser(this.userForm).then(({ data }) => {
          this.tableData = data.data.search
          this.total = data.data.total
        })
      }
    }
  },
  mounted  () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.manage {
  height: 100%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .table {
    height: 800px;
    position: relative;
    .pager {
      margin-top: 20px;
      position: absolute;
      right: 20px;
    }
  }
}
</style>