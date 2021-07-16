import axios from '../axios'

/* 
 * 信息维护管理模块
 */

// 获取主页面查询
export const getMainQuery = (data) => {
    return axios({
        url: '/DInfoMaintain/GetDInfoMaintainQuery',
        method: 'post',
        data
    })
}

// 申报要素查询 
export const DialogQuery = (data) => {
    return axios({
        url: '/DInfoMaintain/GetDCruxMaintainQuery',
        method: 'post',
        data
    })
}


// 申报要素新增修改
export const editMain = (data) => {
    return axios({
        url: '/DInfoMaintain/GetDCruxMaintainEdit',
        method: 'post',
        data
    })
}

// 申报要素删除
export const delData = (data) => {
    return axios({
        url: '/DInfoMaintain/GetDCruxMaintainDel',
        method: 'post',
        data
    })
}


// 复核查询
export const ReviewQuery = (data) => {
    return axios({
        url: '/DInfoMaintain/DInfoMaintainCheck',
        method: 'post',
        data
    })
}

// 获取报关商品名称下拉选择框数据
export const selectData = (data) => {
    return axios({
        url: '/DInfoMaintain/GetDCruxMaintainListQuery',
        method: 'post',
        data
    })
}

// 批量复核
export const ManyReview = (data) => {
    return axios({
        url: '/DInfoMaintain/DInfoMaintainBatchCheck',
        method: 'post',
        data
    })
}
// 左侧tree获取数据
export const getTree = (data) => {
    return axios({
        url: '/Product/GetSelectProductTreeList',
        method: 'post',
        data
    })
}

// 申报要素条件查询 
export const DialogConditionQuery = (data) => {
    return axios({
        url: '/DInfoMaintain/GetConditionQuery',
        method: 'post',
        data
    })
}

// 申报要素条件删除 
export const delCondition = (data) => {
    return axios({
        url: '/DInfoMaintain/GetConditionDel',
        method: 'post',
        data
    })
}

// 申报要素条件修改/新增 
export const EditCondition = (data) => {
    return axios({
        url: '/DInfoMaintain/GetConditionEdit',
        method: 'post',
        data
    })
}

// 修改排序接口 
export const getSort = (data) => {
    return axios({
        url: '/DInfoMaintain/UpdateHsCodeRuleSort',
        method: 'post',
        data
    })
}