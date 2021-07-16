import axios from '../axios'
/**
 * 运费管理模块
 * @param {} data 
 * @returns 
 */
//获取运费数据
export const getFreightList = (data) => {
    return axios({
        url: '/ShipFreight/GetShipFreightList',
        method: 'post',
        data
    })
}
//添加或修改运费登记单：/api/ShipFreight/Save
export const AddFreight = (data) => {
    return axios({
        url: '/ShipFreight/Save',
        method: 'post',
        data
    })
}
// 编辑获得数据// ShipFreight/GetShipFreight
export const editFreight = (data) => {
    return axios({
        url: '/ShipFreight/GetShipFreight',
        method: 'post',
        data
    })
}
//删除运费登记单：/api/ShipFreight/DeleteShipFreight
export const DelFreight = (data) => {
    return axios({
        url: '/ShipFreight/DeleteShipFreight',
        method: 'post',
        data
    })
}
//获取发货申请单列表：/api/PackingList/ChooseDeliveryQuery
export const GetPackingList = (data)=>{
    return axios({
        url:'/PackingList/ChooseDeliveryQuery',
        method:'post',
        data
    })
}
//获取货代列表：/api/ShipFreight/GetForwarderList
export const GetForwarderList = (data)=>{
    return axios({
        url:'/ShipFreight/GetForwarderList',
        method:'post',
        data
    })
}
//运输类型 ShipFreight/GetTransportTypeList
export const GetTransportType = (data)=>{
    return axios({
        url:'/Code/GetTransportTypeList',
        method:'post',
        data
    })
}

//获取出货信息ShipFreight/GetShipmentInformation
export const GetShipment = (data)=>{
    return axios({
        url:'/ShipFreight/GetShipmentInformation',
        method:'post',
        data
    })
}

//获取出口公司列表信息ShipFreight/GetExportCompanyList
export const GetExportCompany = (data)=>{
    return axios({
        url:'/ShipFreight/GetExportCompanyList',
        method:'post',
        data
    })
}

// 根据币种获取汇率api/ShipFreight/GetExchangeRate
export const getExchangeRate = (data)=>{
    return axios({
        url:'/ShipFreight/GetExchangeRate',
        method:'post',
        data
    })
}