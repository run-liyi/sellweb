<template>
  <div class="container">
    <el-dialog
      title="编辑通知"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="标题" prop="noticeHead">
          <el-input v-model="form.noticeHead" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="noticeContent">
          <el-input type="textarea" v-model="form.noticeContent"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="header">
      <el-button @click="handleAdd" type="primary" size="mini" style="margin-bottom: 20px">
        + 编辑通知
      </el-button>
      <el-form :inline="true" :model="dateForm">
        <el-form-item>
          <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="dateForm.day" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查看</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="notice">
      <el-card v-for="item in noticeList" :key="item.nid">
        <div class="title">
          <h4>{{ item.noticeHead }}<span style="margin-left: 20px; font-size:5px;margin-top: 20px">{{ item.publishTime }}</span></h4>
          <el-button style="padding: 3px 0" type="text" @click="look(item)">查看</el-button>
        </div>
        <el-divider></el-divider>
        <div class="content">
          <p>{{ item.noticeContent }}</p>
        </div>
      </el-card>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="5"
          @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getNoticeList, addNotice, searchNotice } from '@/api';
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        noticeHead: '',
        noticeContent: ''
      },
      dateForm: {
        day: '',
        page: 1,
        limit: 5
      },
      rules: {
        noticeHead: [
          { required: true, message: '请输入标题'}
        ],
        noticeContent: [
          { required: true, message: '请输入内容'}
        ]
      },
      pageData: {
        page: 1,
        limit: 5
      },
      noticeList: [],
      total: 0,
      modelType: 0
    }
  },
  methods: {
    look(item) {
      this.$alert(item.noticeContent, item.noticeHead, {
          confirmButtonText: '确定',
        });
    },
    search () {
      if(this.dateForm.day == null){
        this.pageData.page = 1
        this.getList()
        this.modelType = 0
      } else {
        this.modelType = 1
        searchNotice(this.dateForm).then(({ data }) => {
          this.noticeList = data.data.list
          this.total = data.data.count
        })
      }
    },
    handlePage(val) {
      if(this.modelType == 0){
        this.pageData.page = val
        this.getList()
      } else {
        this.dateForm.page = val
        searchNotice(this.dateForm).then(({ data }) => {
          this.noticeList = data.data.list
          this.total = data.data.count
        })
      }
    },
    getList() {
      getNoticeList(this.pageData).then(({ data }) => { 
        this.noticeList = data.data.list
        this.total = data.data.count
      })
    },
    submit() {
      this.$confirm('确定发布通知?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         this.$refs.form.validate((valid) => {
          if (valid) {
            addNotice(this.form).then(() => {
              this.getList()
            })
            this.$refs.form.resetFields()
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '发布成功'
            });    
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
          message: '已取消发布'
        });          
      });
    },
    handleClose () {
      this.form = {
        noticeHead: '',
        noticeContent: ''
      }
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    handleAdd () {
      this.dialogVisible = true
    },
    cancel() {
      this.handleClose()
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
  }
  .notice{
    .el-card{
      margin-top: 20px;
      width: 100%;
      .title{
        display: flex;
        justify-content: space-between;
      }
    }
    height: 1500px;
    position: relative;
    .pager{
      margin-top: 20px;
      position: absolute;
      right: 20px;
    }
  }
}
</style>

     