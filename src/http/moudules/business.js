import axios from '../axios'

/* 
 * 业务管理模块
 */

// 电商运营平台主表数据
export const Operate = (data) => {
    return axios({
        url: '/EOperateWorkbench/GetEOperateWorkbenchInfo',
        method: 'post',
        data
    })
}
// 电商运营平台 明细查询
export const Details = (data) => {
    return axios({
        url: '/EOperateWorkbench/DetailsQuery',
        method: 'post',
        data
    })
}
// 电商运营工作台左侧列表查询
export const GetEOperateWorkbenchLeft = (data) => {
    return axios({
        url: '/EOperateWorkbench/GetEOperateWorkbenchLeftQuery',
        method: 'post',
        data
    })
}
// 电商运营工作台下单查询
export const GetEOperateWorkbenchOrder = (data) => {
    return axios({
        url: '/EOperateWorkbench/GetEOperateWorkbenchOrderQuery',
        method: 'post',
        data
    })
}
// 电商运营工作台获取设计编号列表
export const DesignCode = (data) => {
    return axios({
        url: '/EOperateWorkbench/DesignCodeQuery',
        method: 'post',
        data
    })
}
// 电商运营工作台销售趋势查询
export const GetEOperateWorkbenchEcharts = (data) => {
    return axios({
        url: '/EOperateWorkbench/GetEOperateWorkbenchEchartsQuery',
        method: 'post',
        data
    })
}
// 电商运营工作台批量修改保存
export const EditProductDaialog = (data) => {
    return axios({
        url: '/EOperateWorkbench/EditProductDaialog',
        method: 'post',
        data
    })
}
// 运营设置 产品信息批量修改 弹窗
export const BatchEditProduct = (data) => {
    return axios({
        url: '/EOperateWorkbench/BatchEditProductInfo',
        method: 'post',
        data
    })
}
// 调价单数据表格
export const Adjustment = (data) => {
    return axios({
        url: '/ProductPriceChang/GetproductpricechangeInfo',
        method: 'post',
        data
    })
}
// 调价单选择产品列表
export const ChooseProduct = (data) => {
    return axios({
        url: '/ProductPriceChang/GetChooseProductInfo',
        method: 'post',
        data
    })
}
// 调价单获取调整前价格
export const getaAjustPrice = (data) => {
    return axios({
        url: '/ProductPriceChang/GetOldPriceList',
        method: 'post',
        data
    })
}
// 调价保存产品
export const saveProduct = (data) => {
    return axios({
        url: '/ProductPriceChang/ProductPriceChangeEdit',
        method: 'post',
        data
    })
}
// 调价单删除
export const delProduct = (data) => {
    return axios({
        url: '/ProductPriceChang/ProductPriceChangeDel',
        method: 'post',
        data
    })
}
// 获取调价表明细1
export const GetProductPriceChang = (data) => {
    return axios({
        url: '/ProductPriceChang/GetProductPriceChang',
        method: 'post',
        data
    })
}
// 获取调价表明细2
export const GetProductDaialogList = (data) => {
    return axios({
        url: '/ProductPriceChang/GetProductDaialogList',
        method: 'post',
        data
    })
}

// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/dept/delete',
        method: 'post',
        data
    })
}
// 产品总结
export const ProductSummary = (data) => {
    return axios({
        url: '/ProductSummary/GetProductSummaryQuery',
        method: 'post',
        data
    })
}
