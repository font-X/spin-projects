import axios from '../axios'
/* 
 * 页面设计模块
 */

//动态url请求
export const dynamicurl = (url, data) => {
  return axios({
    url,
    method: 'post',
    data
  })
}
//自定义代码列表
export const XcCode = () => {
  return axios({
    url: '/public/xc_Code',
    method: 'get',
  })
}
//计量单位列表
export const XcUnit = () => {
  return axios({
    url: '/Code/Getxc_Unit',
    method: 'get',
  })
}
//国家代码列表
export const bcState = () => {
  return axios({
    url: '/Code/GetState',
    method: 'get',
  })
}
//币种列表
export const bcCurrency = () => {
  return axios({
    url: '/Code/GetCurrency',
    method: 'get',
  })
}
//联动站点列表
export const LinkShop = (data) => {
  return axios({
    url: '/Code/GetCountryByShop',
    method: 'post',
    data
  })
}
//站点列表
export const basShop = () => {
  return axios({
    url: '/Code/GetShop',
    method: 'get',
  })
}
//无权限站点列表
export const allShop = () => {
  return axios({
    url: '/Code/GetAllShop',
    method: 'get',
  })
}
//获取配送地址代码
export const address = (data) => {
  return axios({
    url: '/Code/GetCodeList',
    method: 'post',
    data
  })
}
//获取仓库列表
export const wareHouse = (data) => {
  return axios({
    url: '/Depot/GetUserDepotList',
    method: 'post',
    data
  })
}
//获取分类编码
export const GetSelectProductTreeList = (data) => {
  return axios({
    url: '/Product/GetSelectProductTreeList',
    method: 'post',
    data
  })
}
// 获取状态
export const getStatus = (data) => {
  return axios({
    url: '/Code/GetCodeList',
    method: 'post',
    data
  })
}
// 获取公司
export const GetCompany = (data) => {
  return axios({
    url: '/Code/GetCompanyList',
    method: 'post',
    data
  })
}
//获取备注人
export const PersonList = (data) => {
  return axios({
    url: '/Code/GetRemarkPersonList',
    method: 'post',
    data
  })
}

// 获取集装箱分堆颜色
export const GetContainerColorTagList = (data) => {
  return axios({
    url: '/Code/GetContainerColorTagList',
    method: 'post',
    data
  })
}
// 获取获取集装箱柜型
export const GetContainerList = (data) => {
  return axios({
    url: '/Code/GetContainerList',
    method: 'post',
    data
  })
}
// 获取部门列表
export const GetDepartList = (data) => {
  return axios({
    url: '/Code/GetDepartList',
    method: 'post',
    data
  })
}
// 公共请求接口
export const GetProcedureDataSet = (data) => {
  return axios({
    url: '/Public/GetProcedureDataSet',
    method: 'post',
    data
  })
}