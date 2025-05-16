import Mock from 'mockjs'
export default {
  getAdmin: config => {
    const { username, pwd} =JSON.parse(config.body)
    if(username === 'admin' && pwd === '123456'){
      return {
        code: 20000,
        token: Mock.Random.guid(),
        message: '获取成功'
      } 
    } else {
      return {
        code: -999,
        data: {
          message: '账号或者密码错误'
        }
      }
    }
  }
}