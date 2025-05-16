<template>
  <div class="container">
    <div class="header">
    </div>
    <div class="table">
      <el-table :data="responseList" stripe style="width: 100%; overflow: visible">
        <el-table-column prop="fid" label="id"> </el-table-column>
        <el-table-column prop="feedbackTypeId" label="反馈类型"> 
          <template slot-scope="scope">
            <el-tag v-if="scope.row.feedbackTypeId==1" type="priamry" disable-transitions>建议</el-tag>
            <el-tag v-if="scope.row.feedbackTypeId==2" type="success" disable-transitions>正向反馈</el-tag>
            <el-tag v-if="scope.row.feedbackTypeId==3" type="danger" disable-transitions>负向反馈</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="branchId" label="反馈分店">
          <template slot-scope="scope">
            <span v-for="item in branchList" :key="item.branchId" v-if="scope.row.branchId == item.branchId">{{ item.branchName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="feedbackTime" label="反馈时间"></el-table-column>
        <el-table-column prop="feedbackStatus" label="反馈状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.feedbackStatus=='已反馈'" type="danger" disable-transitions>已反馈</el-tag>
            <el-tag v-if="scope.row.feedbackStatus=='处理中'" type="primary" disable-transitions>处理中</el-tag>
            <el-tag v-if="scope.row.feedbackStatus=='已完成'" type="success" disable-transitions>已完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="opreate" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleLook(scope.row)"
              >查看</el-button
            >
            <el-button size="mini" type="text" @click="handleFinish(scope.row)"
              >完成</el-button
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
import { getResponseList, getBranch, updateFeedBack } from '@/api';
export default {
  data () {
    return {
      form: {
        time: ''
      },
      feedbackForm: {
        fid: '',
        feedbackTypeId: '',
        branchId: '',
        feedbackContent: '',
        feedbackStatus: '',
      },
      pageData: {
        page: 1,
        limit: 10
      },
      responseList: [],
      branchList: [],
      total: 0,
      active: 1
    }
  },
  methods: {
    handleFinish(row) {
      for(let i=0; i<this.responseList.length;i++){
        if(row.fid == this.responseList[i].fid){
          if(this.responseList[i].feedbackStatus == '已反馈'){
            this.$alert('请先查看内容！', '提示', {
              confirmButtonText: '确定',
            });
          } else if(this.responseList[i].feedbackStatus == '已完成'){
             this.$alert('已处理完成！', '提示', {
              confirmButtonText: '确定',
            });
          }
          else {
            this.$alert('处理成功！', '提示', {
              confirmButtonText: '确定',
            });
            // this.responseList[i].feedbackStatus = '已完成'
            this.feedbackForm.fid = row.fid
            this.feedbackForm.feedbackTypeId = row.feedbackTypeId
            this.feedbackForm.branchId = row.branchId
            this.feedbackForm.feedbackContent = row.feedbackContent
            this.feedbackForm.feedbackStatus = '已完成'
            updateFeedBack(this.feedbackForm).then(() => {
              this.getList()
            })
          }
        }
      }
    },
    handleLook(row) {
      for(let i=0; i<this.responseList.length;i++){
        if(row.fid == this.responseList[i].fid){
          if(this.responseList[i].feedbackStatus == '已反馈'){
              // this.responseList[i].feedbackStatus = '处理中'
               this.feedbackForm.fid = row.fid
            this.feedbackForm.feedbackTypeId = row.feedbackTypeId
            this.feedbackForm.branchId = row.branchId
            this.feedbackForm.feedbackContent = row.feedbackContent
            this.feedbackForm.feedbackStatus = '处理中'
              updateFeedBack(this.feedbackForm).then(() => {
                this.getList()
              })
              this.$alert(row.feedbackContent, '反馈内容', {
              confirmButtonText: '确定',
            });
          } else if( this.responseList[i].feedbackStatus == '处理中'){
            this.responseList[i].feedbackStatus = '处理中'
              this.$alert(row.feedbackContent, '反馈内容', {
              confirmButtonText: '确定',
            });
          }else {
            this.$alert(row.feedbackContent, '反馈内容', {
              confirmButtonText: '确定',
            });
          }
        }
      }
    },
    handlePage(val) {
      this.pageData.page = val
      this.getList()
    },
    getList() {
      getResponseList(this.pageData).then(({ data }) => { 
        this.responseList = data.data.list
        this.total = data.data.count
      })
      getBranch().then(({ data }) => {
        const { branchList } = data.data
        this.branchList = branchList
        console.log(branchList)
      })
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