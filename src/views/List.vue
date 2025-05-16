<template>
  <div class="container">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%">
      <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
        <el-form-item label="店名" prop="branchName">
          <el-input v-model="form.branchName" placeholder="请输入店名"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="respName">
          <el-input v-model="form.respName" placeholder="负责人姓名"></el-input>
        </el-form-item>
        <el-form-item label="开业状态" prop="branchStatus">
          <el-select v-model="form.branchStatus" placeholder="请选择">
            <el-option label="CLOSE" value="CLOSE"></el-option>
            <el-option label="OPEN" value="OPEN"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="respMobile">
          <el-input v-model="form.respMobile" placeholder="请输入负责人电话号码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible1"
      :before-close="handleClose1"
      width="50%">
      <el-form ref="setForm" :rules="setRules" :model="setForm" label-width="80px">
        <el-form-item label="月目标" prop="monthTarget">
          <el-input v-model="setForm.monthTarget" placeholder="请输入月目标"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="targetTime">
          <el-select v-model="setForm.targetTime" placeholder="请选择">
            <el-option label="1月" value="01-01"></el-option>
            <el-option label="2月" value="02-01"></el-option>
            <el-option label="3月" value="03-01"></el-option>
            <el-option label="4月" value="04-01"></el-option>
            <el-option label="5月" value="05-01"></el-option>
            <el-option label="6月" value="06-01"></el-option>
            <el-option label="7月" value="07-01"></el-option>
            <el-option label="8月" value="08-01"></el-option>
            <el-option label="9月" value="09-01"></el-option>
            <el-option label="10月" value="10-01"></el-option>
            <el-option label="11月" value="11-01"></el-option>
            <el-option label="12月" value="12-01"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="setForm.type" placeholder="请选择">
            <el-option label="每日相等" value="0"></el-option>
            <el-option label="周末比工作日高" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel1">取 消</el-button>
        <el-button type="primary" @click="submit1">确 定</el-button>
      </span>
    </el-dialog>
    <div class="header">
      <el-button @click="handleAdd" type="primary">
        + 新增
      </el-button>
      <el-form :inline="true" :model="branchForm">
        <el-form-item>
          <el-input v-model="branchForm.name" placeholder="请输入店名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table
      :data="branchTable"
      stripe
      style="width: 100%;overflow: visible">
        <el-table-column
          prop="branchName"
          label="店名">
        </el-table-column>
        <el-table-column
          prop="respName"
          label="负责人">
        </el-table-column>
        <el-table-column
          prop="branchStatus"
          label="开业状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.branchStatus == 'OPEN'" type="success" disable-transitions>OPEN</el-tag>
            <el-tag v-if="scope.row.branchStatus == 'CLOSE'" type="danger" disable-transitions>CLOSE</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="respMobile"
          label="负责人电话">
        </el-table-column>
        <el-table-column
          prop="opreate"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleSet(scope.row)" type="primary">设置目标</el-button>
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleDelete(scope.row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getBranchSelect, addBranch, editBranch, deleteBranch, searchBranch, setTarget, getBranch } from '@/api'
export default {
  data () {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      form: {
        parentId: 1,
        branchName: '',
        respName: '',
        respMobile: '',
        branchStatus: ''
      },
      rules: {
        branchName: [
          { required: true, message: '请输入店名' }
        ],
        respName: [
          { required: true, message: '请输入负责人' }
        ],
        respMobile: [
          { required: true, message: '请输入负责人手机号' }
        ],
        branchStatus: [
          { required: true, message: '请选择开业状态' }
        ]
      },
      setRules: {
        monthTarget: [
          { required: true, message: '请输入月目标'}
        ],
        targetTime: [
          { required: true, message: '请选择月份'}
        ],
        type: [
          { required: true, message: '请选择类型'}
        ]
      },
      branchForm: {
        page: 1,
        limit: 10,
        name: ''
      },
      setForm: {
        branchId: '',
        targetTime: '',
        monthTarget: '',
        type: '',
      },
      branch: {},
      branchTable: [],
      branchList: [],
      modalType: 0,
      total: 0,
      searchType: 0,
      pageData: {
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    onSubmit() {
      if(this.branchForm.name == ''){
        this.pageData.page = 1
        this.searchType = 0
        this.getList()
      } else {
        this.searchType = 1
        searchBranch(this.branchForm).then(({ data }) => {
          this.branchTable = data.data.search
          this.total = data.data.count
        })
      }
    },
    submit() {
      this.$confirm('确定进行此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         this.$refs.form.validate((valid) => {
          if (valid) {
            if(this.modalType === 0){
              addBranch(this.form).then(() => {
                this.$refs.form.resetFields()
                this.dialogVisible = false
                this.getList()
                this.$message({
                  type: 'success',
                  message: '添加成功'
                });    
              })
            } else {
              editBranch(this.form).then(() => {
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
    submit1() {
       this.$confirm('确定进行此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         var today = new Date()
         var year = today.getFullYear()
         var dealDate = year + "-" + this.setForm.targetTime
         this.setForm.targetTime = dealDate
         setTarget(this.setForm).then(() => {
          this.$refs.setForm.resetFields()
          this.dialogVisible1 = false
         })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });          
      });
    },
    handleSet(row){
      this.setForm.branchId = row.branchId
      this.dialogVisible1 = true
    },
    getList () {
      getBranchSelect(this.pageData).then(({ data })=>{
        this.branchTable = data.data.branchList
        this.total = data.total|| 0
      }) 
    },
    handleEdit (row) {
      this.modalType = 1
      this.dialogVisible = true
      this.form= JSON.parse(JSON.stringify(row))
    },
    handleClose () {
      this.form = {
        parentId: 1,
        branchName: '',
        respName: '',
        respMobile: '',
        branchStatus: ''
      }
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    handleClose1 () {
      this.setForm = {
        branchId: '',
        targetTime: '',
        monthTarget: '',
        type: '',
      }
      this.$refs.setForm.resetFields()
      this.dialogVisible1 = false
    },
    cancel() {
      this.handleClose()
    },
    cancel1() {
      this.handleClose1()
    },
    handleAdd() {
      this.modalType = 0,
      this.dialogVisible = true
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该分店, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBranch({ branchId: row.branchId }).then((data) => {
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
    handlePage(val) {
      if(this.searchType == 0){
        this.pageData.page = val
        this.getList()
      } else {
        this.searchType == 1
        this.branchForm.page = val
        searchBranch(this.branchForm).then(({ data }) => {
          this.branch = data.data.branch
          this.branchTable = []
          this.branchTable.push(this.branch)
          this.total = data.data.count
        })
      }
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
<style lang="less" scoped>
.container{
  height: 100%;
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .table{
    height: 680px;
    position: relative;
    .pager{
      margin-top: 20px;
      position: absolute;
      right: 20px
    }
  }
}
</style>