import Mock from 'mockjs'
Mock.Random.extend({
  goodChooseName: function() {
    var goodChooseName = ['乐事薯片','可口可乐','椅子','桌子','门','跑步机','米饭','面条','苹果','栗子','香蕉','巧克力']
    return this.pick(goodChooseName)
  }
})
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

let goodList = []
const count = 200

for(let i=0; i<count; i++){
  goodList.push(
    Mock.mock({
      goodId:Mock.Random.guid(),
      goodName: Mock.Random.goodChooseName(),
      goodDescribe: Mock.Random.string(6,10),
      goodPrice: Mock.Random.integer(0,100),
      goodNum: Mock.Random.integer(100,1000),
      goodSell: Mock.Random.integer(0,1000)
    })
  )
}

export default {
  getGoodList: config => {
    const {goodName, page=1, limit =20 } = param20bj(config.url)
    const mockList = goodList.filter(good => {
      if(goodName && good.goodName.indexOf(goodName) === -1) return false
      return true
    })
    const pageList =mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      count: mockList.length,
      list: pageList
    }
  },
  createGood: config => {
    const { goodName, goodDescribe, goodPrice, goodNum } = JSON.parse(config.body)
    goodList.unshift({
      goodId: Mock.Random.guid(),
      goodName: goodName,
      goodDescribe: goodDescribe,
      goodPrice: goodPrice,
      goodNum: goodNum,
      goodSell: 0
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  },
  deleteGood: config => {
    console.log(config)
    const { goodId } = JSON.parse(config.body)
    if(!goodId) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      goodList = goodList.filter(u => u.goodId !== goodId)
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },
  updateUser: config => {
    const { goodId, goodName,goodDescribe, goodPrice, goodNum} = JSON.parse(config.body)
    goodList.some(good => {
      if(good.goodId === goodId){
        good.goodName = goodName,
        good.goodDescribe = goodDescribe,
        good.goodPrice = goodPrice
        good.goodNum = goodNum
      }
    })
    return {
      code: 200,
      data: {
        message: '编辑成功'
      }
    }
  }
}