import axios from '../axios'

/* 
 * 报关单证
 */

// 报关单证查询功能
export const GetCDocumentQuery = (data) => {
    return axios({
        url: '/CDocument/GetCDocumentQuery',
        method: 'post',
        data
    })
}

// 客户查询功能
export const CustomerInfoQuery = (data) => {
    return axios({
        url: '/CDocument/CustomerInfoQuery',
        method: 'post',
        data
    })
}

// 运输查询功能
export const PortInfoQuery = (data) => {
    return axios({
        url: '/CDocument/PortInfoQuery',
        method: 'post',
        data
    })
}

//港口信息列表
export const TransportListQuery = (data) => {
    return axios({
        url: '/CDocument/TransportListQuery',
        method: 'post',
        data
    })
}

//收汇方式列表
export const CollectionListQuery = (data) => {
    return axios({
        url: '/CDocument/CollectionListQuery',
        method: 'post',
        data
    })
}
// 报关单证新增/修改功能
export const CDocumentOperation = (data) => {
    return axios({
        url: '/CDocument/CDocumentOperation',
        method: 'post',
        data
    })
}

// 报关单证删除功能
export const CDocumentDel = (data) => {
    return axios({
        url: '/CDocument/CDocumentDel',
        method: 'post',
        data
    })
}

// // 报关单证报关确认
// export const CDocumentChargeback = (data) => {
//     return axios({
//         url: '/CDocument/CDocumentChargeback',
//         method: 'post',
//         data
//     })
// }

//报关单证通过装箱号获取发货信息并统计
export const GetStatisticsListQuery = (data) => {
    return axios({
        url: '/CDocument/GetStatisticsListQuery',
        method: 'post',
        data
    })
}
//报关单证修改数据获取
export const CDocumentEditInfoQuery = (data) => {
    return axios({
        url: '/CDocument/CDocumentEditInfoQuery',
        method: 'post',
        data
    })
}

//报关单证确认
export const CDocumentAffirm = (data) => {
    return axios({
        url: '/CDocument/CDocumentChargeback',
        method: 'post',
        data
    })
}
// \CDocument\CDocumentChargeback

//获取发货公司数据
export const getDeliverGoods = (data) => {
    return axios({
        url: '/Code/GetCompanyListQuery',
        method: 'post',
        data
    })
}

//获取价格条款Code/GetPriceTermListByInvoice
export const GetPriceTermList = (data) => {
    return axios({
        url: '/Code/GetPriceTermListByInvoice',
        method: 'post',
        data
    })
}
