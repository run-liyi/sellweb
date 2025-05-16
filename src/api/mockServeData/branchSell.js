import Mock from 'mockjs'
function param20bj (url) {
  const search = url.split('?')[1]
  if(!search) {
    return {}
  }
  return JSON.parse(
    '{"'+
    decodeURIComponent(search)
    .replace(/"/g,'\\"')
    .replace(/&/g,'","')
    .replace(/=/g,'":"')+
    '"}'
  )
}

const totalData = {
  totalOfflineSales: 21780.28,
  totalWechatSales: 8447.92,
  totalAppSales: 7489.2,
  totalSales: 45528,
  totalNumberOfSales: 49,
  totalNumberOfPiecesSold: 104,
  totalRateOfPieces: 2.12,
  totalNumberOfMainPushItems: 6,
  totalMainPushSale: 2764.6,
  totalRegularPriceSales: 7266,
  totalOfflineNumber: 18,
  totalOfflineDealNumber: 13,
  totalOfflineDealSales: 11782.6,
  totalOldCustomerNumber: 95,
  totalOldCustomerDealNumber: 35,
  totalOldCustomerDealSales: 20035.19,
  totalBirthCustomerNumber: 20,
  totalBirthCustomerDealNumber: 5,
  totalBirthCustomerDealSales: 8661.29,
  totalDailySalesTarget: 42411.16,
  totalAchievementRate: 1.07,
  totalTurnoverRate: 0.2,
  totalYearOnYearRise: -0.52,
  totalSalesDistance: 2817
}
let everyData = []
for( let i =0; i<7; i++){
  var num = i+1
  everyData.push(
    Mock.mock({
      date: "2022-11-"+ num.toString(),
      offlineSales: Mock.Random.float(2000,3000,0,2),
      wechatSales: Mock.Random.float(1000,2000,0,2),
      appSales: Mock.Random.float(1000,2000,0,2),
      sales: Mock.Random.float(6500,7000,0,2),
      numberOfSales: Mock.Random.integer(3,11),
      numberOfPiecesSold: Mock.Random.integer(84,122),
      rateOfPieces: Mock.Random.float(1,3,0,2),
      numberOfMainPushItems: Mock.Random.integer(3,9),
      mainPushSale: Mock.Random.float(400,500,0,2),
      regularPriceSales: Mock.Random.float(900,1100,0,2),
      offlineNumber: Mock.Random.integer(0,5),
      offlineDealNumber: Mock.Random.integer(0,5),
      offlineDealSales: Mock.Random.float(1000,2000,0,2),
      oldCustomerNumber: Mock.Random.integer(10,15),
      oldCustomerDealNumber: Mock.Random.integer(0,5),
      oldCustomerDealSales: Mock.Random.float(1000,2000,0,2),
      birthCustomerNumber: Mock.Random.integer(10,15),
      birthCustomerDealNumber: Mock.Random.integer(0,5),
      birthCustomerDealSales: Mock.Random.float(900,1100,0,2),
      dailySalesTarget: Mock.Random.float(5000,6000,0,2),
      achievementRate: Mock.Random.float(0.8,1.2,0,2),
      turnoverRate: Mock.Random.float(0,1,1,2),
      yearOnYearRise: Mock.Random.float(-1,2,0,2),
      salesDistance: Mock.Random.float(-500,500,0,2)
    })
  )
}
export default {
  getSellData: config => {
    const {startTime, endTime, branchId} = param20bj(config.url)
    console.log(startTime, endTime, branchId)
    return {
      code: 200,
      msg: "返回成功",
      data: {
        totalData : totalData,
        everyData : everyData
      }
    }
  }
}