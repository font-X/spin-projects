import axios from '../axios'

/* 
 * 电商催单模块
 */

// 催单查询
export const searchReminder = (data) => {
    return axios({
        url: '/ECTdContract/ECTdContractDetailQuery',
        method: 'post',
        data
    })
}

// 电商催单管理 点击催单表获取下方数据
export const clickSearch = (data) => {
    return axios({
        url: '/ECTdContract/QueryReminder',
        method: 'post',
        data
    })
}

// 电商催单管理 一键清零
export const ECTdContractReset = (data) => {
    return axios({
        url: '/ECTdContract/ECTdContractReset',
        method: 'post',
        data
    })
}

// 电商催单管理 一键分配
export const ECTdContractAllTo = (data) => {
    return axios({
        url: '/ECTdContract/ECTdContractAllTo',
        method: 'post',
        data
    })
}

// 电商催单管理 保存
export const ECTdContractAllEdie = (data) => {
    return axios({
        url: '/ECTdContract/ECTdContractAllEdie',
        method: 'post',
        data
    })
}

// 电商催单管理 催单单条关闭
export const ECTdContractClose = (data) => {
    return axios({
        url: '/ECTdContract/ECTdContractClose',
        method: 'post',
        data
    })
}

