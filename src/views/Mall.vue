<template>
  <div class="manage">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%">
      <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="form.goodsName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="goodsComment">
          <el-input v-model="form.goodsComment" placeholder="请输入商品描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="handleAdd" type="primary">
        + 新增
      </el-button>
      <el-form :inline="true" :model="goodForm">
        <el-form-item>
          <el-input v-model="goodForm.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table
      :data="tableData"
      stripe
      style="width: 100%">
        <el-table-column
          prop="gid"
          label="商品ID">
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="goodsComment"
          label="商品描述">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="修改时间">
        </el-table-column>
        <el-table-column
          prop="salesSum"
          label="销售量">
        </el-table-column>
        <el-table-column
          prop="stockSum"
          label="库存量">
        </el-table-column>
        <el-table-column
          prop="opreate"
          label="操作">
          <template slot-scope="scope">
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
import { getGood, addGood, editGood, delGood, searchGood } from '@/api'
export default {
  data () {
    return {
      dialogVisible: false,
      tableData: [],
      modalType: 0,
      total: 0,
      form: {
        goodsName: '',
        goodsComment: '',
      },
      rules: {
        goodsName: [
          { required: true, message: '请输入商品名称'}
        ],
        goodsComment: [
          { required: false }
        ],
      },
      goodForm: {
        page: 1,
        limit: 10,
        name: ''
      },
      pageData: {
        page: 1,
        limit: 10
      },
      searchType: 0
    }
  },
  methods: {
    submit () {
      this.$confirm('确定进行此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         this.$refs.form.validate((valid) => {
          if (valid) {
            if(this.modalType === 0){
              addGood(this.form).then(() => {
                this.$refs.form.resetFields()
                this.dialogVisible = false
                this.getList()
                this.$message({
                  type: 'success',
                  message: '添加成功'
                });    
              })
            } else {
              editGood(this.form).then(() => {
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
    handleEdit(row) {
      this.modalType = 1;
      this.dialogVisible = true
      this.form = JSON.parse(JSON.stringify(row))
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delGood({gid: row.gid}).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
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
    handleClose () {
      this.form = {
        goodsName: '',
        goodsComment: ''
      }
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    cancel() {
      this.handleClose()
    },
    getList() {
      getGood(this.pageData).then(({ data }) => {
        this.tableData = data.data.list
        this.total = data.data.count || 0
      })
    },
    onSubmit () {
      if(this.goodForm.name == ''){
        this.pageData.page = 1
        this.searchType = 0
        this.getList()
      } else {
        this.searchType = 1
        searchGood(this.goodForm).then(({ data }) => {
          this.tableData = data.data.search
          this.total = data.data.count
        })
      }
    },
    handlePage(val) {
      if(this.searchType == 0){
        this.pageData.page = val
        this.getList()
      } else {
        this.goodForm.page = val
        searchGood(this.goodForm).then(({ data }) => {
          this.tableData = data.data.search
          this.total = data.data.count
        })
      }
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.manage {
  height: 100%;
  .manage-header{
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