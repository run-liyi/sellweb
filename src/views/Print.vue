<template>
  <div class="manage">
    <div class="manage-header">
      <el-form :inline="true" :model="dateForm">
        <el-form-item>
          <el-date-picker @change="pickerOptionStart" value-format="yyyy-MM-dd" type="date" placeholder="选择起始日期" v-model="dateForm.begin" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker @change="pickerOptionEnd" value-format="yyyy-MM-dd" type="date" placeholder="选择结束日期" v-model="dateForm.end" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查看</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="loginList" stripe style="width: 100%; overflow: visible">
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="branchName" label="门店名"> </el-table-column>
        <el-table-column prop="ip" label="IP"> </el-table-column>
        <el-table-column prop="location" label="登陆地区"> </el-table-column>
        <el-table-column prop="loginStatus" label="是否成功">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.loginStatus===0" type="danger" disable-transitions>失败</el-tag>
            <el-tag v-if="scope.row.loginStatus===1" type="success" disable-transitions>成功</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="loginTime" label="登陆时间"></el-table-column>
        <el-table-column prop="loginDevice" label="登陆设备"></el-table-column>
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
import { getLoginList } from '@/api'
export default {
  data () {
    return {
      dateForm: {
        page: 1,
        limit: 10,
        begin: '',
        end: '',
      },
      loginList: [],
      total: 0
    }
  },
  methods: {
    pickerOptionStart(){
      if(Date.parse(this.dateForm.begin)>Date.parse(this.dateForm.end)){
        this.dateForm.begin = ''
        this.$notify({
          title: '警告',
          message: '开始时间不能大于结束时间',
          type: 'warning'
        });
        return
      }
    },
    pickerOptionEnd(){
      if(Date.parse(this.dateForm.end)<Date.parse(this.dateForm.begin)){
        this.dateForm.begin = ''
        this.$notify({
          title: '警告',
          message: '结束时间不能小于开始时间',
          type: 'warning'
        });
        return
      }
    },
    getList() {
      getLoginList(this.dateForm).then(({ data }) => {
        this.total = data.data.count
        this.loginList = data.data.list
        console.log(this.loginList)
      })
    },
    search() {
      this.dateForm.page = 1
      this.dateForm.limit = 10
      this.getList()
    },
    handlePage(val) {
      this.dateForm.page = val
      this.getList()
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