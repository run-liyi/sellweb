<template>
  <el-row>
    <el-col :span="8">
      <el-card class="box-card">
       <div class="user">
        <img src="../assets/images/user.jpg" alt="">
        <div class="userinfo">
          <p class="name">Admin</p>
          <p class="access">超级管理员</p>
        </div>
       </div>
       <div class="login-info">
        <p>上次登录时间： <span>2022-11-21</span></p>
        <p>上次登录地点： <span>长沙</span></p>
       </div>
      </el-card>
      <div class="num">
        <el-card body-style=" display: flex">
          <i class="icon" :class="`el-icon-s-flag`" style=" background: #5ab1ef"></i>
          <div class="text">
            <p class="price">￥{{ this.totalYesterdayTarget }}</p>
            <p class="desc">昨日总目标</p>
          </div>
        </el-card>
        <el-card body-style=" display: flex">
          <i class="icon" :class="`el-icon-success`" style=" background: #2ec7c9"></i>
          <div class="text">
            <p class="price">￥{{ this.totalYesterdaySell }}</p>
            <p class="desc">昨日总销售额</p>
          </div>
        </el-card>
        <el-card body-style=" display: flex">
          <i class="icon" :class="`el-icon-remove`" style=" background: #ffb980"></i>
          <div class="text">
            <p class="price">￥{{ this.totalYesterdayDistance }}</p>
            <p class="desc">昨日总差额</p>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="16">
      <el-card class="selltable">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          >
            <el-table-column
              :show-overflow-tooltip="true"
              prop="name"
              label="卖场"
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="yesterdayTarget"
              label="目标"
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="yesterdaySell"
              label="销售额"
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="yesterdayDistance"
              label="差额"
              align="center"
              >
               <template slot-scope="scope">
                <el-tag
                  :type="scope.row.yesterdayDistance > 0 ? 'success' : 'danger'"
                  disable-transitions>{{scope.row.yesterdayDistance}}</el-tag>
              </template>
            </el-table-column>
        </el-table>
      </el-card>
      <div class="graph">
        <el-card>
          <div ref="echarts1" style="height: 340px"></div>
        </el-card>
        <el-card>
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import * as echarts from 'echarts'
import { getData } from '../api'
import tab from '@/store/tab'
export default {
  data () {
    return {
      tableData: [],
      countData: [],
      videoData: [],
      orderData: [],
      dateArr: [],
      valueArr: [],
      totalYesterdayTarget: 0,
      totalYesterdaySell: 0,
      totalYesterdayDistance: 0
    }
  },
  mounted () {
    getData().then(({ data }) => {
      console.log(data)
      const { yesterdayData } = data.data
      const { orderWeekData } = data.data
      this.tableData = yesterdayData
      this.orderData = orderWeekData
      this.totalYesterdayTarget = data.data.totalYesterdayTarget
      this.totalYesterdaySell = data.data.totalYesterdaySell
      this.totalYesterdayDistance = data.data.totalYesterdayDistance
      console.log(this.orderData)
      for (let i=0; i<this.orderData.length; i++){
        this.dateArr.push(this.orderData[i].data)
        this.valueArr.push(this.orderData[i].value)
      }
      for(let i = 0; i < this.tableData.length ;i++){
        var pieData = new Object()
        pieData.name = this.tableData[i].name
        pieData.value = this.tableData[i].yesterdaySell
        this.videoData.push(pieData)
      }
      const echarts1 = echarts.init(this.$refs.echarts1)
      var echarts1Option = {
        tooltip: {
          trigger: "item"
        },
        grid: {
          top: 50,
          x: 55,
          x2: 30,
          y2: 80
        },
        xAxis: {
          type: 'category',
          data: this.dateArr,
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '历史销售趋势',
            data: this.valueArr,
            type: 'line',
          }
        ]
      }
      echarts1.setOption(echarts1Option)
      const echarts2 = echarts.init(this.$refs.echarts2)
      var echarts2Option = {
        title: {
          text: '销售占比图',
          left: 'center',
          top: '40%',
          textStyle: {
            fontSize: 28,
            color: '#454c5c',
            align: 'center'
          }
        },
        tooltip: {
          trigger: "item"
        },
        series: [
          {
            data: this.videoData,
            type: 'pie',
            label: {
              show: false
            },
            radius: ["75%","100%"]
          }
        ],
      }
      echarts2.setOption(echarts2Option)
    })
  }
}
</script>

<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .accsss {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.selltable {
  height: 315px;
  margin-left: 20px;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  display: none;
}
.num {
  margin-top: 20px;
  .el-card {
    margin-bottom: 10px;
  }
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    margin-top: 50px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      height: 30px;
      line-height: 30px;
    }
    .desc {
      font-size: 14px;
      text-align: left;
      color: #999999;
    }
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  margin-left: 20px;
  .el-card {
    width: 48%;
    height: 340px;
  }
}
</style>