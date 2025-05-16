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

let feedbackList = [
  {
    fid: 1,
    branchName: '友阿奥特莱斯',
    feedbackTime: '20feedbackStatus22-11-10',
    feedbackStatus: '已反馈',
    feedbackContent: '今明两天,江淮、江汉、江南、华南等地将降温12~16℃。'
  },
  {
    fid: 2,
    branchName: '百联奥特莱斯',
    feedbackTime: '2022-11-9',
    feedbackStatus: '处理中',
    feedbackContent: '教育部明确学校、教师可以在学生存在不服从、扰乱秩序等情形时实施教育惩戒。'
  },
  {
    fid: 3,
    branchName: '友阿奥特莱斯',
    feedbackTime: '2022-11-8',
    feedbackStatus: '已完成',
    feedbackContent: '七部门发文便利老年人日常出行，低风险区，除客运车站、机场等特殊场所外，一般不查验“健康码”。'
  },
  {
    fid: 4,
    branchName: '友阿奥特莱斯',
    feedbackTime: '2022-11-7',
    feedbackStatus: '已反馈',
    feedbackContent: '明年起，婚姻登记机关不再受理因胁迫结婚请求撤销业务，离婚登记将增加“冷静期”程序。'
  },
  {
    fid: 5,
    branchName: '友阿奥特莱斯',
    feedbackTime: '2022-11-6',
    feedbackStatus: '已完成',
    feedbackContent: '“城市大脑”智慧系统赋能，南昌正式取消机动车尾号限行措施。'
  },
  {
    fid: 6,
    branchName: '友阿奥特莱斯',
    feedbackTime: '2022-11-6',
    feedbackStatus: '已反馈',
    feedbackContent: '3+1+2模式,语数外使用全国卷。'
  },
  {
    fid: 7,
    branchName: '友阿奥特莱斯',
    feedbackTime: '2022-11-5',
    feedbackStatus: '处理中',
    feedbackContent: '荆州“关公雕像搬移工程”公示:拆后异地组装,总投资4000万。'
  },
  {
    fid: 8,
    branchName: '友阿奥特莱斯',
    feedbackTime: '2022-11-4',
    feedbackStatus: '已完成',
    feedbackContent: '禁用中国APP后,中国手机在印销量不降反升,比去年同期多卖170万部。'
  },
  {
    fid: 9,
    branchName: '友阿奥特莱斯',
    feedbackTime: '2022-11-3',
    feedbackStatus: '已反馈',
    feedbackContent: '春运火车票今日开售,12306售票时间提前至早5点。'
  },
  {
    fid: 10,
    branchName: '友阿奥特莱斯',
    feedbackTime: '2022-11-2',
    feedbackStatus: '处理中',
    feedbackContent: '北京4个、黑龙江1个、辽宁17个、四川1个。'
  },
]
const count = 10

export default {
  getResponse: config => {
    const {page = 1, limit =10} = param20bj(config.url)
    const pageList = feedbackList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      data:{
        count: count,
        responseList: pageList
      }
    }
  }
}