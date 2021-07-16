var getools = {}
//查询参数拼接
getools.getParam = function (data){
    let result = ""
    for(var key in data){
        if(data[key]){
            if(result=="") result="?"+key+"="+data[key];
            else result+="&"+key+"="+data[key];
        }
    }
    return result
}
//删除数组指定的元素  
getools.removeByValue=function(arr, val){  
    for(var i=0; i<arr.length; i++) {  
        if(arr[i] == val) {  
            arr.splice(i, 1);  
            break;  
        }  
    }
}
//数组中查找
getools.FindArray=function(arr,key,resultkey,val){
    for(var i=0; i<arr.length; i++) {  
        if(arr[i][key] == val) return arr[i][resultkey];
    }
    return '';
}
getools.install = function (Vue, options) {
    Vue.prototype.$getools = getools
    Vue.getools = getools
}
export default getools

