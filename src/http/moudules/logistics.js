import axios from '../axios'

/* 
 * 物流渠道维护
 */

// 获取物流等级数据
export const getLogisticsLevel = (data) => {
    return axios({
        url: '/Code/GetLogisticsList',
        method: 'post',
        data
    })
}

// 查询物流主表数据
export const QueryLogistics = (data) => {
    return axios({
        url: '/Logistics/GetLogisticsQuery',
        method: 'post',
        data
    })
}
// 物流主表删除
export const DelLogistics = (data) => {
    return axios({
        url: '/Logistics/GetLogisticsDel',
        method: 'post',
        data
    })
}

// 新增物流 
export const AddLogistics = (data) => {
    return axios({
        url: '/Logistics/GetLogisticsAdd',
        method: 'post',
        data
    })
}

// 修改物流 查询
export const EditQuery = (data) => {
    return axios({
        url: '/Logistics/GetLogisticsInfoQuery',
        method: 'post',
        data
    })
}

