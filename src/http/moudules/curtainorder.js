import axios from '../axios'

/* 
 * 窗帘订单总结模块
 */

// 获取订单数据查询
export const getCurtainData = (data) => {
    return axios({
        url: '/OrderSummary/GetOrderSummaryQuery',
        method: 'post',
        data
    })
}
