import axios from '../axios'

/* 
 * 电商零单下单管理模块
 */

// 获取电商零单下单查询
export const zeroQuery = (data) => {
    return axios({
        url: '/EZeroOrders/GetEZeroOrdersQuery',
        method: 'post',
        data
    })
}
// 删除
export const del = (data) => {
    return axios({
        url: '/EZeroOrders/EZeroOrdersDel',
        method: 'post',
        data
    })
}
// 获取工厂弹窗信息
export const getFactory = (data) => {
    return axios({
        url: '/EZeroOrders/GetCustomerInfoQuery',
        method: 'post',
        data
    })
}
// 是否关闭
export const getIsclose = (data) => {
    return axios({
        url: '/EZeroOrders/EZeroOrdersIsClose',
        method: 'post',
        data
    })
}
// 产品类型
export const productType = (data) => {
    return axios({
        url: '/EZeroOrders/GetChooseXcCodeQuery',
        method: 'post',
        data
    })
}

// 颜色
export const getColor = (data) => {
    return axios({
        url: '/EZeroOrders/GetColorQuery',
        method: 'post',
        data
    })
}
// 图片
export const getImg = (data) => {
    return axios({
        url: '/EZeroOrders/GetImageListQuery',
        method: 'post',
        data
    })
}

// 客户
export const getCustomer = (data) => {
    return axios({
        url: '/EZeroOrders/GetCustomerInfoQuery',
        method: 'post',
        data
    })
}

// 物流
export const getLogistics = (data) => {
    return axios({
        url: '/EZeroOrders/GetChooseXcCodeQuery',
        method: 'post',
        data
    })
}


// 新增或修改
export const getAdd = (data) => {
    return axios({
        url: '/EZeroOrders/EZeroOrdersOperation',
        method: 'post',
        data
    })
}

// 修改查询数据
export const geteditQuery = (data) => {
    return axios({
        url: '/EZeroOrders/GetEZeroOrdersEditQuery',
        method: 'post',
        data
    })
}

// 修改查询form数据
export const geteditQueryForm = (data) => {
    return axios({
        url: '/EZeroOrders/GetEZeroOrdersEditInfo',
        method: 'post',
        data
    })
}

// 获取单位
export const getCompany = (data) => {
    return axios({
        url: '/Code/Getxc_Unit',
        method: 'post',
        data
    })
}


// 获取计算
export const ComputerFreight = (data) => {
    return axios({
        url: '/EZeroOrders/EZeroOrdersFreightCharge',
        method: 'post',
        data
    })
}

// 获取国家
export const getCountry = (data) => {
    return axios({
        url: '/Code/GetState',
        method: 'post',
        data
    })
}

