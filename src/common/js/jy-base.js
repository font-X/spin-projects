import Vue from 'vue'
import XEUtils from 'xe-utils'
import moment from "moment"
function resizeHandler(store) {
    window.onresize = function () {
        var isFull = !!(document.webkitIsFullScreen || document.mozFullScreen ||
            document.msFullscreenElement || document.fullscreenElement
        );
        if (store) {
            store.commit("modifyScreenState", isFull);
        }
    }

}

function hasClass(elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

function addClass(elem, cls) {
    if (!hasClass(elem, cls)) {
        elem.className += ' ' + cls;
    }
}

function removeClass(elem, cls) {
    if (hasClass(elem, cls)) {
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

function getUrlHashMap(str) {
    let map = {},
        arr = [];
    if (str) {
        str.split('&').forEach(item => {
            arr = item && item.split('=');
            arr && arr.length > 1 && (
                map[arr[0]] = arr[1]
            )
        })
    }
    return map;
}

function isNU(value) {
    return value === undefined || value === null;
}

function replaceNU(value) {
    return isNU(value) ? "" : value;
}
//日期格式
function DateFormat(value) {
    if (value) {
        let dateMat = new Date(value);
        const year = dateMat.getFullYear();
        const month = dateMat.getMonth() + 1;
        const day = dateMat.getDate();
        return year + '-' + (month > 9 ? '' : '0') + month + '-' + (day > 9 ? '' : '0') + day;
    }
    return ''
}
export default function (Vue) {
    //添加全局API
    Vue.prototype.$jybase = {
        resizeHandler,
        hasClass,
        addClass,
        removeClass,
        getUrlHashMap,
        isNU,
        replaceNU,
        DateFormat
    }

    Vue.prototype.$XEUtils = XEUtils
    Vue.prototype.$moment = moment
}