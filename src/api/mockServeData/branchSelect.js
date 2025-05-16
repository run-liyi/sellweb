import Mock from 'mockjs'
Mock.Random.extend({
  phone: function () {
    var phonePrefixs = ['132', '135', '189', '183', '138', '189', '139', '137', '151', '155'] 
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) 
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
const count = 16
let branchList = [
  {
    branchName: '友阿奥特莱斯',
    branchId: 1,
    parentId: null,
    respName: Mock.Random.cname(),
    respMobile: Mock.Random.phone(),
    branchStatus: 'CLOSE',
    createTime: '2022-11-10',
    updateTime: '2022-11-10'
  },
  {
    branchName: '百联奥特莱斯',
    branchId: 2,
    parentId: null,
    respName: Mock.Random.cname(),
    respMobile: Mock.Random.phone(),
    branchStatus: 'CLOSE',
    createTime: '2022-11-10',
    updateTime: '2022-11-10'
  },
  {
    branchName: '砂之船奥特莱斯',
    branchId: 3,
    parentId: null,
    respName: Mock.Random.cname(),
    respMobile: Mock.Random.phone(),
    branchStatus: 'CLOSE',
    createTime: '2022-11-10',
    updateTime: '2022-11-10'
  },
  {
    branchName: '友阿奥莱喜乐地',
    branchId: 4,
    parentId: null,
    respName: Mock.Random.cname(),
    respMobile: Mock.Random.phone(),
    branchStatus: 'CLOSE',
    createTime: '2022-11-10',
    updateTime: '2022-11-10'
  },
  {
    branchName: '阿波罗八一路店',
    branchId: 5,
    parentId: null,
    respName: Mock.Random.cname(),
    respMobile: Mock.Random.phone(),
    branchStatus: 'CLOSE',
    createTime: '2022-11-10',
    updateTime: '2022-11-10'
  },
  {
    branchName: '王府井河西店',
    branchId: 6,
    parentId: null,
    respName: Mock.Random.cname(),
    respMobile: Mock.Random.phone(),
    branchStatus: 'CLOSE',
    createTime: '2022-11-10',
    updateTime: '2022-11-10'
  },
  {
    branchName: '友谊 袁家岭店',
    branchId: 7,
    parentId: null,
    respName: Mock.Random.cname(),
    respMobile: Mock.Random.phone(),
    branchStatus: 'CLOSE',
    createTime: '2022-11-10',
    updateTime: '2022-11-10'
  },
  {
    branchName: '王府井五一广场店',
    branchId: 8,
    parentId: null,
    respName: Mock.Random.cname(),
    respMobile: Mock.Random.phone(),
    branchStatus: 'CLOSE',
    createTime: '2022-11-10',
    updateTime: '2022-11-10'
  },
  {
    branchName: '平和堂五一广场店',
    branchId: 9,
    parentId: null,
    respName: Mock.Random.cname(),
    respMobile: Mock.Random.phone(),
    branchStatus: 'CLOSE',
    createTime: '2022-11-10',
    updateTime: '2022-11-10'
  },
  {
    branchName: '国金街五一广场店',
    branchId: 10,
    parentId: null,
    respName: Mock.Random.cname(),
    respMobile: Mock.Random.phone(),
    branchStatus: 'CLOSE',
    createTime: '2022-11-10',
    updateTime: '2022-11-10'
  },
  {
    branchName: '龙湖长沙洋湖天街',
    branchId: 11,
    parentId: null,
    respName: Mock.Random.cname(),
    respMobile: Mock.Random.phone(),
    branchStatus: 'CLOSE',
    createTime: '2022-11-10',
    updateTime: '2022-11-10'
  },
  {
    branchName: '北辰三角洲大悦城',
    branchId: 12,
    parentId: null,
    respName: Mock.Random.cname(),
    respMobile: Mock.Random.phone(),
    branchStatus: 'CLOSE',
    createTime: '2022-11-10',
    updateTime: '2022-11-10'
  },
  {
    branchName: '星城步步高',
    branchId: 13,
    parentId: null,
    respName: Mock.Random.cname(),
    respMobile: Mock.Random.phone(),
    branchStatus: 'CLOSE',
    createTime: '2022-11-10',
    updateTime: '2022-11-10'
  },
  {
    branchName: '万象汇星沙店',
    branchId: 14,
    parentId: null,
    respName: Mock.Random.cname(),
    respMobile: Mock.Random.phone(),
    branchStatus: 'CLOSE',
    createTime: '2022-11-10',
    updateTime: '2022-11-10'
  },
  {
    branchName: '浏阳天虹店',
    branchId: 15,
    parentId: null,
    respName: Mock.Random.cname(),
    respMobile: Mock.Random.phone(),
    branchStatus: 'CLOSE',
    createTime: '2022-11-10',
    updateTime: '2022-11-10'
  },
  {
    branchName: '娄底天虹店',
    branchId: 16,
    parentId: null,
    respName: Mock.Random.cname(),
    respMobile: Mock.Random.phone(),
    branchStatus: 'CLOSE',
    createTime: '2022-11-10',
    updateTime: '2022-11-10'
  }
]
export default {
  selectBranch: config => {
    const {branchName, page = 1, limit =20 } = param20bj(config.url)
    const mockList = branchList.filter(branch => {
      if(branchName && branch.branchName.indexOf(branchName) === -1) return false
      return true
    })
    const pageList =mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      data: {
        branchList: pageList,
        count: count
      }
    }
  }
}