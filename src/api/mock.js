import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permission from './mockServeData/permission'
import mall from './mockServeData/mall'
import sell from './mockServeData/sell'
import branch from './mockServeData/branch'
import branchSell from './mockServeData/branchSell'
import branchSelect from './mockServeData/branchSelect'
import notice from './mockServeData/notice'
import response from './mockServeData/response'


//Mock.mock('/api/home/getData', homeApi.getStatisticalData)

Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/edit', 'post', user.updateUser)
Mock.mock('/api/user/del', 'post', user.deleteUser)
Mock.mock(/api\/user\/getUser/, user.getUserList)

Mock.mock(/api\/permission\/getAdmin/, 'post', permission.getAdmin)

Mock.mock(/api\/mall\/getMall/, mall.getGoodList)
Mock.mock('/api/mall/add', 'post', mall.createGood)
Mock.mock('/api/mall/edit', 'post', mall.updateUser)
Mock.mock('/api/mall/del', 'post', mall.deleteGood)

Mock.mock(/api\/sell\/get/, sell.getSellData)

Mock.mock(/api\/branch\/get/, branch.getBranchData)

Mock.mock(/api\/branchsell\/get/, branchSell.getSellData)

Mock.mock(/api\/branchselect\/get/, branchSelect.selectBranch)

Mock.mock(/api\/notice\/get/,notice.getNotice)

Mock.mock(/api\/response\/get/, response.getResponse)