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

let noticeList = [
  {
    nid: 1,
    noticeHead: '30日继续发布寒潮橙色预警',
    noticeContent: '今明两天,江淮、江汉、江南、华南等地将降温12~16℃。'
  },
  {
    nid: 2,
    noticeHead: '时政新闻',
    noticeContent: '教育部明确学校、教师可以在学生存在不服从、扰乱秩序等情形时实施教育惩戒。'
  },
  {
    nid: 3,
    noticeHead: '时政新闻',
    noticeContent: '七部门发文便利老年人日常出行，低风险区，除客运车站、机场等特殊场所外，一般不查验“健康码”。'
  },
  {
    nid: 4,
    noticeHead: '福建',
    noticeContent: '明年起，婚姻登记机关不再受理因胁迫结婚请求撤销业务，离婚登记将增加“冷静期”程序。'
  },
  {
    nid: 5,
    noticeHead: '江西南昌',
    noticeContent: '“城市大脑”智慧系统赋能，南昌正式取消机动车尾号限行措施。'
  },
  {
    nid: 6,
    noticeHead: '河北、辽宁、福建、湖南、广东等八省市公布新高考方案',
    noticeContent: '3+1+2模式,语数外使用全国卷。'
  },
  {
    nid: 7,
    noticeHead: '热点新闻大事',
    noticeContent: '荆州“关公雕像搬移工程”公示:拆后异地组装,总投资4000万。'
  },
  {
    nid: 8,
    noticeHead: '印媒',
    noticeContent: '禁用中国APP后,中国手机在印销量不降反升,比去年同期多卖170万部。'
  },
  {
    nid: 9,
    noticeHead: '春运',
    noticeContent: '春运火车票今日开售,12306售票时间提前至早5点。'
  },
  {
    nid: 10,
    noticeHead: '截止到29日全国共有23个中风险地区',
    noticeContent: '北京4个、黑龙江1个、辽宁17个、四川1个。'
  },
]
const count = 10

export default {
  getNotice: config => {
    const {page = 1, limit =10} = param20bj(config.url)
    const pageList = noticeList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      data:{
        count: count,
        noticeList: pageList
      }
    }
  }
}