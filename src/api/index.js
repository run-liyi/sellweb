import http from "../utils/request";


const qs = require('qs');
export const getData = () => {
  return http.get('/sales/home_sales_info')
}

export const getUser = (data) => {
  return http.post('/user/select_all', data.params)
}

export const resetUser = (data) => {
  return http.post('/user/reset_password', data)
}

export const searchUser = (data) => {
  return http.post('/user/search_user', data)
}

export const addUser = (data) => {
  return http.post('/user/insert', data)
}

export const editUser = (data) => {
  return http.post('/user/update', data)
}

export const delUser = (data) => {
  return http.delete('/user/delete_by_uid', {data:data})
}

export const getAdmin = (data) => {
  // return http.post('/user/login?username='+data.username+'&pwd='+data.pwd, data)
  return http.post('/user/login', qs.stringify(data))
}

export const getGood = (data) => {
  return http.post('/goods/select_all', data)
}

export const addGood = (data) => {
  return http.post('/goods/insert', data)
}

export const editGood = (data) => {
  return http.post('/goods/update', data)
}

export const searchGood = (data) => {
  return http.post('/goods/search_goods', data)
}

export const delGood = (data) => {
  return http.delete('/goods/delete', {data:data})
}

export const getSellData = (data) => {
  return http.post('/sales/get_total_sales', data)
}

export const getBranch = () => {
  return http.get('/branch/get_all_branches')
}

export const getBranchData = (data) => {
  return http.post('/sales/get_branch_total', data)
}

export const getBranchSelect = (data) => {
  return http.post('/branch/get_all_branches_into_pages', data)
}

export const addBranch = (data) => {
  return http.post('/branch/insert',data)
}

export const editBranch = (data) => {
  return http.post('/branch/update_by_branch_id',data)
}

export const deleteBranch = (data) => {
  return http.delete('/branch/delete_branch_by_id', {data:data})
}

export const searchBranch = (data) => {
  return http.post('/branch/search_branch', data)
}

export const getNoticeList = (data) => {
  return http.post('/notice/select_all', data)
}

export const getResponseList = (data) => {
  return http.post('/feedback/select_all', data)
}

export const test = (data) => {
  return http.get('/sales/get_total_sales', data)
}

export const addNotice = (data) => {
  return http.post('/notice/insert', data)
}

export const searchNotice = (data) => {
  return http.post('/notice/select_by_day', data)
}

export const logout = () => {
  return http.post('/user/logout')
}

export const updateFeedBack = (data) => {
  return http.put('/feedback/update',data)
}

export const downloadExcel = (data) => {
  return http.post('/excel/get_excel',data)
}

export const setTarget = (data) => {
  return http.post('/target/set_mon_target', data)
}

export const getLoginList = (data) => {
  return http.post('/user/select_all_login_log', data)
}

export const setPassword = (data) => {
  return http.post('/user/change_password', data)
}