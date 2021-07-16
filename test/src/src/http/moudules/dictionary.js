import axios from '../axios'

/* 
 * 字典管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: 'api/Dictionary/Edit',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: 'api/Dictionary/Delete',
        method: 'post',
        data
    })
}
// 分页查询
export const GetList = (data) => {
    return axios({
        url: 'api/Dictionary/GetList',
        method: 'post',
        data
    })
}
// 获取字段
export const GetDetail = (data) => {
    return axios({
        url: 'api/Dictionary/GetDetail?Id='+data,
        method: 'get',
        data
    })
}
// Dict主表字段名
export const GetTableItem = (data) => {
    return axios({
        url: 'api/Dictionary/GetTableItem',
        method: 'get',
        data
    })
}
// 生成脚本
export const CreateCode = (data) => {
    return axios({
        //url: 'api/Dictionary/CreateCode?Id='+data.Id+"&CodeType="+data.CodeType,
        url: 'api/Dictionary/CreateCode',
        method: 'post',
        data
    })
}
// 取产品分类
export const GetProductSort = (data) => {
    return axios({
        url: 'api/Dictionary/GetProductSort',
        method: 'get',
        data
    })
}
// 取产品分类
export const GetModule = (data) => {
    return axios({
        url: 'api/Dictionary/GetModule',
        method: 'get',
        data
    })
}
// 取数据类型
export const GetDateType = (data) => {
    return axios({
        url: 'api/Dictionary/GetCodeList?CodeType=DataType',
        method: 'get',
        data
    })
}
// 取表权限
export const GetDtUserList = (data) => {
    return axios({
        url: 'api/Dictionary/GetDtUserList?Id='+data,
        method: 'get',
        data
    })
}
// 取修改记录
export const GetModiLog = (data) => {
    return axios({
        url: 'api/Dictionary/GetModiLog?tabId='+data,
        method: 'get',
        data
    })
}// 保存表权限
export const SaveDtUser = (data) => {
    return axios({
        url: 'api/Dictionary/SaveDtUser',
        method: 'post',
        data
    })
}
// 字典下载
export const ExportToExcel = (data) => {
    return axios({
        url: 'api/Dictionary/ExportToExcel',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        responseType: 'arraybuffer',
        //responseType: 'blob',
        data
    },'header') //header:返回值不预处理
}
// 包sql下载
export const PackDown = (data) => {
    return axios({
        url: 'api/Dictionary/PackDown',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        responseType: 'arraybuffer',
        //responseType: 'blob',
        data
    },'header') //header:返回值不预处理
}

// 常用字段
export const GetCostFields = (data) => {
    return axios({
        url: 'api/Dictionary/GetCostFields',
        method: 'get',
        data
    }) 
}
// 取编码xs_code
export const GetCodeList = (data) => {
    return axios({
        url: 'api/Dictionary/GetCodeList?CodeType='+data,
        method: 'get',
        data
    })
}
// 包列表
export const xs_Pack = (data) => {
    return axios({
        url: 'api/PackManage/GetList',
        method: 'post',
        data
    }) 
}