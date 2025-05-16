<template>
  <div class="container">
    <div class="tableHeader">
      <div class="tableTitle">
        <h3>销售数据</h3>
        <el-divider></el-divider>
      </div>
      <el-form :inline="true" :model="dateForm">
        <el-form-item>
          <el-date-picker @change="pickerOptionStart" value-format="yyyy-MM-dd" type="date" placeholder="选择起始日期" v-model="dateForm.startTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker @change="pickerOptionEnd" value-format="yyyy-MM-dd" type="date" placeholder="选择结束日期" v-model="dateForm.endTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="tableLook">查看</el-button>
          <el-button type="primary" @click="testExcel">下载报表</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableContainer">
      <el-table
        height="90%"
        :data="totalDataList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="totalDailySalesTarget"
          label="销售目标">
        </el-table-column>
        <el-table-column
          prop="totalSales"
          label="销售额">
        </el-table-column>
        <el-table-column
          label="销售分类">
          <el-table-column
            prop="totalWechatSales"
            label="微信销售">
          </el-table-column>
          <el-table-column
            prop="totalOfflineSales"
            label="线下销售">
          </el-table-column>
          <el-table-column
            prop="totalAppSales"
            label="小程序销售">
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="totalSalesDistance"
          label="差额">
        </el-table-column>
        <el-table-column
          prop="totalAchievementRate"
          label="达成率">
        </el-table-column>
        <el-table-column
          prop="totalYearOnYearRise"
          label="去年同期增长">
        </el-table-column>
        <el-table-column
          label="笔件数">
          <el-table-column
            prop="totalNumberOfSales"
            label="笔数">
          </el-table-column>
          <el-table-column
            prop="totalNumberOfPiecesSold"
            label="件数">
          </el-table-column>
          <el-table-column
            prop="totalRateOfPieces"
            label="客件数">
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table
        height="90%"
        :data="totalDataList"
        stripe
        style="width: 100%">
        <el-table-column
          label="线下客数">
          <el-table-column
            prop="totalOfflineNumber"
            label="进店个数">
          </el-table-column>
          <el-table-column
            prop="totalOfflineDealNumber"
            label="成交个数">
          </el-table-column>
          <el-table-column
            prop="totalOfflineDealSales"
            label="销售额">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="老顾客">
          <el-table-column
            prop="totalOldCustomerNumber"
            label="进店个数">
          </el-table-column>
          <el-table-column
            prop="totalOldCustomerDealNumber"
            label="成交个数">
          </el-table-column>
          <el-table-column
            prop="totalOldCustomerSales"
            label="销售额">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="生日顾客">
          <el-table-column
            prop="totalBirthCustomerNumber"
            label="进店个数">
          </el-table-column>
          <el-table-column
            prop="totalBirthCustomerDealNumber"
            label="成交个数">
          </el-table-column>
          <el-table-column
            prop="totalBirthCustomerDealSales"
            label="销售额">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="chartHeader">
      <div class="chartTitle">
        <h3>销售图表</h3>
        <el-divider></el-divider>
      </div>
    </div>
    <div class="graph">
      <el-card class="chart1">
        <div ref="orderChart" style="width: 100%;height: 340px;"></div>
      </el-card>
      <el-card class="chart2">
        <div ref="pieChartSale" style="width: 100%;height: 340px;"></div>
      </el-card>
    </div>
    <div class="graph">
      <el-card class="chart1">
        <div ref="barChartSale" style="width: 100%;height: 340px;"></div>
      </el-card>
      <el-card class="chart2">
        <div ref="pieChartCustomer" style="width: 100%;height: 340px;"></div>
      </el-card>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import { getSellData, downloadExcel } from '@/api'
export default {
  data () {
    return {
      dateForm: {
        startTime: '',
        endTime: ''
      },
      testForm: {
        date: '',
      },
      totalData: {},
      totalDataList: [],
      everyDataList: [],
    }
  },
  methods: {
    pickerOptionStart(){
      if(Date.parse(this.dateForm.startTime)>Date.parse(this.dateForm.endTime)){
        this.dateForm.startTime = ''
        this.$notify({
          title: '警告',
          message: '开始时间不能大于结束时间',
          type: 'warning'
        });
        return
      }
    },
    pickerOptionEnd(){
      if(Date.parse(this.dateForm.endTime)<Date.parse(this.dateForm.startTime)){
        this.dateForm.startTime = ''
        this.$notify({
          title: '警告',
          message: '结束时间不能小于开始时间',
          type: 'warning'
        });
        return
      }
    },
    testExcel(){
      downloadExcel(this.dateForm)
    },
    initForm () {
      this.dateForm.endTime = this.getDate(-1)
      this.dateForm.startTime = this.getDate(-7)
    },
    getDate(day) {
      var today = new Date();
      var target = today.getTime() + 1000 * 60 *60 *24 *day
      today.setTime(target)
      var year = today.getFullYear()
      var month = today.getMonth() + 1
      var day = today.getDate()
      if(month >= 1 && month <= 9){
        month = "0" + month
      }
      if(day >= 1 && day <= 9) {
        day = "0" + day
      }
      return year + "-" + month + "-" + day
    },
    getData() {
      getSellData(this.dateForm).then(({ data }) => {
        console.log(data)
        this.totalData = data.data.totalData
        this.totalDataList = []
        this.totalDataList.push(this.totalData)
        const { everydayData } = data.data
        this.everyDataList = everydayData
        let orderDateArr = []
        let orderValueArr = []
        let orderTargetArr = []
        let orderDistanceArr = []
        let orderOfflineArr = []
        let orderWechatArr = []
        let orderAppArr = []
        for(let i=0; i < this.everyDataList.length; i++){
          orderDateArr.push(this.everyDataList[i].date)
          orderValueArr.push(this.everyDataList[i].sales)
          orderTargetArr.push(this.everyDataList[i].dailySalesTarget)
          orderDistanceArr.push(this.everyDataList[i].salesDistance)
          orderOfflineArr.push(this.everyDataList[i].offlineSales)
          orderWechatArr.push(this.everyDataList[i].wechatSales)
          orderAppArr.push(this.everyDataList[i].appSales)
        }
        // console.log(orderDateArr)
        // console.log(orderValueArr)
        const orderChart = echarts.init(this.$refs.orderChart)
        var orderChartOption = {
          title: {
            text: '历史销售趋势',
            textStyle: {
              fontSize: 16
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['销售总额', '销售目标', '差额','线下销售','微信销售','小程序销售']
          },
          toolbox: {
            show: true,
            feature: {
              magicType: { show: true, type: ['stack', 'tiled'] },
              saveAsImage: { show: true }
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: orderDateArr
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '销售总额',
              type: 'line',
              smooth: true,
              data: orderValueArr
            },
            {
              name: '销售目标',
              type: 'line',
              smooth: true,
              data: orderTargetArr
            },
            {
              name: '差额',
              type: 'line',
              smooth: true,
              data: orderDistanceArr
            },
            {
              name: '线下销售',
              type: 'line',
              smooth: true,
              data: orderOfflineArr
            },
            {
              name: '微信销售',
              type: 'line',
              smooth: true,
              data: orderWechatArr
            },
            {
              name: '小程序销售',
              type: 'line',
              smooth: true,
              data: orderAppArr
            }
          ]
        }
        orderChart.setOption(orderChartOption)
        const pieChartSale = echarts.init(this.$refs.pieChartSale)
        var pieChartSaleOption = {
          toolbox: {
            show: true,
            feature: {
              saveAsImage: { show: true }
            }
          },
          title: {
            text: '销售种类占比',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: [
                { value: this.totalData.totalOfflineSales, name: '线下销售' },
                { value: this.totalData.totalWechatSales, name: '微信销售' },
                { value: this.totalData.totalAppSales, name: '小程序销售' },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        pieChartSale.setOption(pieChartSaleOption)
        const barChartSale = echarts.init(this.$refs.barChartSale)
        var barChartSaleOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['总额', '线下销售', '微信销售', '小程序销售']
          },
          toolbox: {
            show: true,
            feature: {
              magicType: { show: true, type: ['stack', 'tiled'] },
              saveAsImage: { show: true }
            }
          },
          xAxis: [
            {
              type: 'category',
              axisTick: { show: false },
              data: orderDateArr
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '总额',
              type: 'bar',
              barGap: 0,
              emphasis: {
                focus: 'series'
              },
              data: orderValueArr
            },
            {
              name: '线下销售',
              type: 'bar',
              emphasis: {
                focus: 'series'
              },
              data: orderOfflineArr
            },
            {
              name: '微信销售',
              type: 'bar',
              emphasis: {
                focus: 'series'
              },
              data: orderWechatArr
            },
            {
              name: '小程序销售',
              type: 'bar',
              emphasis: {
                focus: 'series'
              },
              data: orderAppArr
            }
          ]
        }
        barChartSale.setOption(barChartSaleOption)
        const pieChartCustomer = echarts.init(this.$refs.pieChartCustomer)
        var pieChartCustomerOption = {
          toolbox: {
            show: true,
            feature: {
              saveAsImage: { show: true }
            }
          },
          title: {
            text: '顾客种类占比',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: [
                { value: this.totalData.totalOfflineDealNumber, name: '线下顾客' },
                { value: this.totalData.totalOldCustomerDealNumber, name: '老顾客' },
                { value: this.totalData.totalBirthCustomerDealNumber, name: '生日顾客' },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        pieChartCustomer.setOption(pieChartCustomerOption)
      })
    },
    tableLook() {
      this.getData()
    },
    chartLook() {
      this.getData()
    }
    
  },
  mounted () {
    this.initForm()
    this.getData()
  }
}
</script>
<style lang="less" scoped>
.container{
  .chartHeader{
    margin-top: 25px;
    margin-left: 10px;
  }
  .graph{
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    .chart1 {
      width: 59%;
      height: 340px;
    }
    .chart2 {
      width: 39%;
      height: 340px
    }
  }
}
</style>