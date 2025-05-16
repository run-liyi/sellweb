import Mock from 'mockjs'
Mock.Random.extend({
  shopName: function() {
    var shopName = ['友阿奥特莱斯','百联奥特莱斯','砂之船奥特莱斯','友阿奥莱喜乐地','阿波罗八一路店','王府井河西店','友谊 袁家岭店','王府井五一广场店','平和堂五一广场店','国金街五一广场店','龙湖长沙洋湖天街','北辰三角洲大悦城','星城步步高','万象汇星沙店','浏阳天虹店','娄底天虹店']
    return this.pick(shopName)
  }
})
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

let List = []
const count = 200

for(let i =0; i<count; i++){
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      shop: Mock.Random.shopName(),
      name: Mock.Random.cname(),
      sex: Mock.Random.integer(0,1),
      phone: Mock.Random.phone(),
      email: Mock.Random.email(),
      account: Mock.Random.string(6,10),
      password: '123456'
    })
  )
}

export default {
  getUserList: config => {
    const {name, page=1, limit= 20} = param20bj(config.url)
    const mockList = List.filter(user => {
      if(name && user.name.indexOf(name) === -1) return false
      return true
    })
    const pageList =mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: mockList.length,
      list: pageList
    }
  },
  createUser: config => {
    const { shop, name, sex, phone, email, account, password } = JSON.parse(config.body)
    List.unshift({
      id: Mock.Random.guid(),
      shop: shop,
      name: name,
      sex: sex,
      phone: phone,
      email: email,
      account: account,
      password: password
    })
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }
  },
  deleteUser: config => {
    console.log(config)
    const { id } = JSON.parse(config.body)
    if(!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  },
  batchremove: config => {
    let { ids } = param20bj(config.url)
    ids = ids.spilt(',')
    List = List.filter( u => !ids.includes(u.id))
    return {
      code: 20000,
      data: {
        message: '批量删除成功'
      }
    }
  },
  updateUser: config => {
    const { id, shop, name, sex, phone, email, account} = JSON.parse(config.body)
    const sex_num = parseInt(sex)
    List.some(u => {
      if(u.id === id) {
        u.shop = shop,
        u.name = name,
        u.sex = sex_num,
        u.phone = phone,
        u.email = email,
        u.account = account
        return true
      }
    })
    return {
      code: 20000,
      data: {
        message: '编辑成功'
      }
    }
  }
}