import axios from '../axios'

/* 
 * 亚马逊数据导入模块
 */

// 获取亚马逊数据查询
export const getAmazonList = (data) => {
    return axios({
        url: '/AmazonDataImport/AmazonDataQuery',
        method: 'post',
        data
    })
}


// 删除亚马逊数据
export const delAmazonData = (data) => {
    return axios({
        url: '/AmazonDataImport/DelAmazonData',
        method: 'post',
        data
    })
}

// // 导入销售数据
// export const importSales = (data) => {
//     return axios({
//         url: '/AmazonDataImport/ImportSalesReport',
//         method: 'post',
//         headers:{
//         'Content-type':'application/json',"charset":'UTF-8'},
//         data
//     })
// }