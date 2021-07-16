import axios from '../axios'

/* 
 * 订单管理模块
 */
// 获取订单进度查询初始化数据
export const orderScheduleInit = (data) => {
    return axios({
        url: '/OrderSchedule/OrderScheduleInit',
        method: 'post',
        data
    })
}
// 订单进度查询
export const orderScheduleList = (data) => {
    return axios({
        url: '/OrderSchedule/OrderScheduleList',
        method: 'post',
        data
    })
}
// 订单详情
export const OrderScheduleInfo = (data) => {
    return axios({
        url: '/OrderSchedule/OrderScheduleInfo',
        method: 'get',
        data
    })
}
// 订单总体情况
export const OrderInfo = (data) => {
    return axios({
        url: '/OrderSchedule/OrderInfo?PlanNo='+data,
        method: 'get',
    })
}
// 分色明细
export const PlanDayReport = (data) => {
    return axios({
        url: '/OrderSchedule/PlanDayReport?PlanNo='+data.PlanNo+'&BeginDate='+data.BeginDate+'&EndDate='+data.EndDate,
        method: 'get',
    })
}// 获取订单管理列表
export const Order = (data) => {
    return axios({
        url: '/CommerceOrders/GetTdContractQuery',
        method: 'post',
        data
    })
}

// 获取电商订单管理 产品弹窗列表
export const ProductInfo = (data) => {
    return axios({
        url: '/CommerceOrders/GetEChooseProductInfo',
        method: 'post',
        data
    })
}
// 电商订单管理 获取订单管理保存(新增/修改)
export const saveOrder = (data) => {
    return axios({
        url: '/CommerceOrders/GetTdContractAdd',
        method: 'post',
        data
    })
}
// 电商订单管理 订单关闭
export const orderClose = (data) => {
    return axios({
        url: '/CommerceOrders/TdContractClose',
        method: 'post',
        data
    })
}
// 电商订单，双击展示
export const reminderSearch = (data) => {
    return axios({
        url: '/CommerceOrders/TdContractDoubleClick',
        method: 'post',
        data
    })
}
// 电商订单，双击获取左侧催单表
export const reminderLeftSearch = (data) => {
    return axios({
        url: '/CommerceOrders/GetTdContractDetailQuery',
        method: 'post',
        data
    })
}
// 电商订单管理 获取弹窗主表信息
export const getMainList = (data) => {
    return axios({
        url: '/CommerceOrders/GetTdContractDetailQuery',
        method: 'post',
        data
    })
}
// 电商订单管理 获取弹窗主表信息
export const getMainInfo = (data) => {
    return axios({
        url: '/CommerceOrders/GetDaialogDetailQuery',
        method: 'post',
        data
    })
}
// 电商订单管理 下方催单表保存
export const iconSave = (data) => {
    return axios({
        url: '/ECTdContract/ECTdContractDetailUpdate',
        method: 'post',
        data
    })
}
// 电商订单管理 点击催单表获取下方数据
export const clickSearch = (data) => {
    return axios({
        url: '/CommerceOrders/GetClickCTdContractQuery',
        method: 'post',
        data
    })
}

// 电商订单管理 删除
export const delOrder = (data) => {
    return axios({
        url: '/CommerceOrders/TdContractDel',
        method: 'post',
        data
    })
}

// 电商订单管理 同步订单数据
export const TdContractSynchro = (data) => {
    return axios({
        url: '/CommerceOrders/TdContractSynchro',
        method: 'post',
        data
    })
}

