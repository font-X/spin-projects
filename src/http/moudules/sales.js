import axios from '../axios'

/* 
 * 销售分析表数据
 */

// 销售分析表
export const SalesList = (data) => {
    return axios({
        url: 'SalesAnalysis/GetSalesAnalysisInfo',
        method: 'post',
        data
    })
}
/* 
 * 备注查询
 */
export const RemarksQuery = (data) => {
    return axios({
        url: 'SalesAnalysis/GetRightClickInfo',
        method: 'post',
        data
    })
}
/* 
 * 备注保存
 */
export const SaveRemarks = (data) => {
    return axios({
        url: 'SalesAnalysis/PreservationRemarks',
        method: 'post',
        data
    })
}
/* 
 * 备注删除
 */
export const DelRemarks = (data) => {
    return axios({
        url: 'SalesAnalysis/DelRemarks',
        method: 'post',
        data
    })
}
/* 
 * 销售分析表 获取颜色尺寸
 */
export const GetColorSpecInfo = (data) => {
    return axios({
        url: 'SalesAnalysis/GetColorSpecInfo',
        method: 'post',
        data
    })
}
/* 
 * 销售分析表 调价
 */
export const GetModifyPriceQuery = (data) => {
    return axios({
        url: 'SalesAnalysis/GetModifyPriceQuery',
        method: 'post',
        data
    })
}

export const getDailySalesInfo = (data) =>{
    return axios({
        url: 'SalesAnalysis/GetDailySalesInfo',
        method: 'post',
        data
    })
}

export const getSalePriceHisQuery= (data) =>{
    return axios({
        url: 'SalesAnalysis/GetSalePriceHisQuery',
        method: 'post',
        data
    })
}
export const getSalePriceByShopQuery= (data) =>{
    return axios({
        url: 'SalesAnalysis/GetSalePriceByShopQuery',
        method: 'post',
        data
    })
}

// 数据生成
export const GetSalesReportAmzfxAddByShopQuery= (data) =>{
    return axios({
        url: 'SalesAnalysis/GetSalesReportAmzfxAddByShopQuery',
        method: 'post',
        data
    })
}