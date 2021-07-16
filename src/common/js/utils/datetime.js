/**
 * 时间日期相关操作
 */


/**
 * 时间格式化
 * 将 2018-09-23T11:54:16.000+0000 格式化成 2018/09/23 11:54:16
 * @param datetime 国际化日期格式
 * @param type 需要转化类型  date 日期 , time 时间
 * @param dateseparation  日期分隔符
 * @param timeseparation  时间分隔符
 */
export function format (datetime, type , dateseparation = "-", timeseparation = ":") {
  return formatWithSeperator(datetime, type , dateseparation, timeseparation);
}

/**
 * 时间格式化
 * 将 2018-09-23T11:54:16.000+0000 格式化成类似 2018/09/23 11:54:16
 * 可以指定日期和时间分隔符
 * @param datetime 国际化日期格式
 */
export function formatWithSeperator (datetime, type = "date", dateSeprator = "-", timeSeprator = ":") {
  if (datetime != null) {
    const dateMat = new Date(datetime);
    const year = dateMat.getFullYear();
    const month = dateMat.getMonth() + 1;
    const day = dateMat.getDate();
    const hh = dateMat.getHours();
    const mm = dateMat.getMinutes();
    const ss = dateMat.getSeconds();
    let timeFormat = year + dateSeprator + month + dateSeprator + day;
    if((type && timeFormat.toLowerCase()) === "time"){
       timeFormat += " " + hh + timeSeprator + mm + timeSeprator + ss;
    }
    return timeFormat;
  }
}
