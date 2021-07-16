import axios from '../axios'

/* 
 * 获取装箱单管理模块数据
 */

// 获取装箱单查询
export const getQuery = (data) => {
    return axios({
        url: '/PackingList/PackingListQuery',
        method: 'post',
        data
    })
}
/**
 * 删除
 * @param {id} data 
 * @returns 
 */
export const Delete = (data) => {
    return axios({
        url: 'PackingList/PackingListDel',
        method: 'post',
        data
    })
}

/**
 * 新增和修改
 * @param {} data 
 * @returns 
 */
 export const EditProduction = (data) => {
    return axios({
        url: 'PackingList/PackingListOperation',
        method: 'post',
        data
    })
}
// 修改查询获得表单数据
export const EditQuery = (data) => {
    return axios({
        url: 'PackingList/PackingListEditQuery',
        method: 'post',
        data
    })
}

// 查询待选择的装箱单管理数据
export const queryPacking = (data) => {
    return axios({
        url: 'PackingList/ChooseDeliveryQuery',
        method: 'post',
        data
    })
}
//装箱单复核状态

export const isCheck = (data) => {
    return axios({
        url: 'PackingList/EditReviewStaus',
        method: 'post',
        data
    })
}