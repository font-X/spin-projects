import axios from '../axios'
/* 
 * 页面设计模块
 */

//列表
export const getList = (data) => {
  return axios({
    url: '/code/list',
    method: 'post',
    data
  })
}

//单个明细
export const getDetail = (params) => {
  return axios({
    url: '/code/xs_FunModule',
    method: 'get',
    params
  })
}

// 组件类型
export const getDesignType = () => {
return axios({
  url: '/Code/GetCodeList',
    method: 'post',
    data: {
    "model":{
      "type": "code",
      "query": {
        flag: "designTagType"
      }
      }
    }
  })
}
// 组件明细
export const getDesignDetail = (data) => {
    return Promise.all([getList(data), getDesignType()])
}

 // 保存
export const save = (data) => {
    return axios({
        url: '/Code/Save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/code/delete',
        method: 'post',
        data
    })
}

