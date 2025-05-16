import Mock from 'mockjs'

let List = []
export default {
  getStatisticalData: () => {
    for (let i=0; i < 7; i++){
      List.push(
        Mock.mock({
          苹果: Mock.Random.float(100,8000,0,0),
          vivo: Mock.Random.float(100,8000,0,0),
          oppo: Mock.Random.float(100,8000,0,0),
          魅族: Mock.Random.float(100,8000,0,0),
          三星: Mock.Random.float(100,8000,0,0),
          小米: Mock.Random.float(100,8000,0,0),
        })
      )
    }
    return {
      code: 20000,
      data: {
        tableData: [
          {
            name: '友阿奥特莱斯',
            target: 6000,
            sell: 6916,
            distance: 1194
          },
          {
            name: '百联奥特莱斯',
            target: 3600,
            sell: 4743,
            distance: 1143
          },
          {
            name: '砂之船奥特莱斯',
            target: 6000,
            sell: 5660,
            distance: -340
          },
          {
            name: '友阿奥莱喜乐地',
            target: 2095.98,
            sell: 5772,
            distance: -1323.98
          },
          {
            name: '阿波罗八一路店',
            target: 3000,
            sell: 8075,
            distance: 5075
          },
          {
            name: '王府井河西店',
            target: 3200,
            sell: 4743.6,
            distance: 1543.6
          },
          {
            name: '友谊 袁家岭店',
            target: 1600,
            sell: 1457,
            distance: -143
          },
          {
            name: '王府井五一广场店',
            target: 3400,
            sell: 3748,
            distance: 348
          },
          {
            name: '平和堂五一广场店',
            target: 3400,
            sell: 3851,
            distance: 451
          },
          {
            name: '国金街五一广场店',
            target: 3600,
            sell: 6668.26,
            distance: 3068.26
          },
          {
            name: '龙湖长沙洋湖天街',
            target: 628.8,
            sell: 80,
            distance: -548.8
          },
          {
            name: '北辰三角洲大悦城',
            target: 1600,
            sell: 3679.2,
            distance: 2079.2
          },
          {
            name: '星城步步高',
            target: 2400,
            sell: 2498.18,
            distance: 98.18
          },
          {
            name: '万象汇星沙店',
            target: 1886.38,
            sell: 544,
            distance: -1342.38
          },
          {
            name: '浏阳天虹店',
            target: 3143.97,
            sell: 2343.2,
            distance: -800.77
          },
          {
            name: '娄底天虹店',
            target: 0,
            sell: 0,
            distance: 0
          }
        ],
        countData:[
          {
            name: "今日总目标",
            value: 45555.13,
            icon: "s-flag",
            color: "#5ab1ef"
          },
          {
            name: "今日总销售额",
            value: 56056,
            icon: "success",
            color: "#2ec7c9"
          },
          {
            name: "今日差额",
            value: 10501.31,
            icon: "remove",
            color: "#ffb980"
          }
        ],
        orderData:[
          {
            date: '7月1日',
            value: 47702
          },
          {
            date: '7月2日',
            value: 87756 
          },
          {
            date: '7月3日',
            value: 105016 
          },
          {
            date: '7月4日',
            value: 45228  
          },
          {
            date: '7月5日',
            value: 56056 
          },
          {
            date: '7月6日',
            value: 47702
          },
          {
            date: '7月7日',
            value: 38401 
          }
        ]
      }
    } 
  }
}