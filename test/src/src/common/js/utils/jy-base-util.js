import { isNull } from "xe-utils/methods";

/**
 * 序列化提交的数据，将 undifined,null 转化为 "",
 * 将日期转化为字符串
 * @param {*} value 
 */
import {format} from './datetime'
function stringifyData(value){
    if(isNull(value)) return "";
    if(value instanceof Date){
        return format(value);
    }
    return value;
}

function isNU(value){
    return  value === undefined || value === null;
}

function replaceNU(value){
    return isNU(value) ? "" : value;
}


export {stringifyData, isNU, replaceNU}