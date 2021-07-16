import axios from '../axios'
//获取修改字段
export const getModeiFieldList = (data) => {
    return axios({
        url: '/Product/GetModeiFieldList',
        method: 'post',
        data
    })
}
//获取修改字段
export const GetModeiValueList = (data) => {
    return axios({
        url: '/Product/GetModeiValueList',
        method: 'post',
        data
    })
}
export const GetProductStyleListByClass = (data) => {
    return axios({
        url: '/Product/GetProductStyleListByClass',
        method: 'post',
        data
    })
}
//批量修改产品信息单项属性
export const ProductModiField = (data) => {
    return axios({
        url: '/Product/ProductModiField',
        method: 'post',
        data
    })
}
//获取产品辅料
export const GetProductFLDtoList = (data) => {
    return axios({
        url: '/Product/GetProductFLDtoList',
        method: 'post',
        data
    })
}

//获取产品辅料
export const GetProductFLPageList = (data) => {
    return axios({
        url: '/ProductFL/GetProductFLPageList',
        method: 'post',
        data
    })
}

//添加辅料
export const AddProductFL = (data) => {
    return axios({
        url: '/Product/AddProductFL',
        method: 'post',
        data
    })
}